'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { StatusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/hooks/useToast';
import { useAppState } from '@/hooks/useAppState';
import { api, KnowledgeDocument } from '@/lib/api';

type PageState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'data'; documents: KnowledgeDocument[] };

export default function KnowledgeBasePage() {
  const { user } = useAuth();
  const { success, error: toastError, ToastProvider } = useToast();
  const { usage, updateUsage } = useAppState();

  const [pageState, setPageState] = useState<PageState>({ status: 'loading' });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<KnowledgeDocument | null>(null);
  const [pollingIds, setPollingIds] = useState<Set<number>>(new Set());
  const pollRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const limitReached = usage.documentsUploaded >= usage.documentsLimit;

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await api.listDocuments();
      if (response.success) {
        const docs = response.documents;
        if (docs.length === 0) {
          setPageState({ status: 'empty' });
        } else {
          setPageState({ status: 'data', documents: docs });
          // Check if any docs need polling
          const pending = docs.filter(
            d => d.status === 'pending' || d.status === 'processing'
          );
          if (pending.length > 0) {
            startPolling(pending.map(d => d.id));
          }
        }
      } else {
        setPageState({ status: 'error', message: response.message || 'Failed to load documents' });
      }
    } catch (err: any) {
      setPageState({
        status: 'error',
        message: err?.message || 'Failed to load documents. Please try again.',
      });
    }
  }, []);

  useEffect(() => {
    if (user) fetchDocuments();
  }, [user, fetchDocuments]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      pollRef.current.forEach(timer => clearTimeout(timer));
      pollRef.current.clear();
    };
  }, []);

  const startPolling = (ids: number[]) => {
    const newPolling = new Set(pollingIds);
    ids.forEach(id => newPolling.add(id));
    setPollingIds(newPolling);

    ids.forEach(id => {
      // Clear existing timer for this id
      const existing = pollRef.current.get(id);
      if (existing) clearTimeout(existing);

      const poll = async () => {
        try {
          const response = await api.getDocument(id);
          if (response.success) {
            setPageState(prev => {
              if (prev.status !== 'data') return prev;
              const updated = prev.documents.map(d =>
                d.id === id ? response.document : d
              );
              return { status: 'data', documents: updated };
            });

            const doc = response.document;
            if (doc.status === 'pending' || doc.status === 'processing') {
              // Continue polling
              const timer = setTimeout(poll, 5000);
              pollRef.current.set(id, timer);
            } else {
              // Done polling - remove from set
              setPollingIds(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
              });
              pollRef.current.delete(id);

              if (doc.status === 'ready') {
                success(`"${doc.original_name}" processed successfully`);
                updateUsage({ documentsUploaded: usage.documentsUploaded + 1 });
              } else if (doc.status === 'failed') {
                toastError(`"${doc.original_name}" processing failed: ${doc.error_message || 'Unknown error'}`);
              }
            }
          }
        } catch {
          // Retry on error
          const timer = setTimeout(poll, 5000);
          pollRef.current.set(id, timer);
        }
      };

      const timer = setTimeout(poll, 5000);
      pollRef.current.set(id, timer);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    if (limitReached) {
      toastError('Document limit reached. Upgrade to upload more files.');
      return;
    }

    setUploading(true);

    for (const file of files) {
      try {
        setUploadProgress(`Uploading "${file.name}"...`);
        const response = await api.uploadDocument(file);

        if (response.success) {
          const doc = response.document;

          if (doc.status === 'pending' || doc.status === 'processing') {
            startPolling([doc.id]);
          }

          // Add to existing list optimistically
          setPageState(prev => {
            if (prev.status === 'empty') {
              return {
                status: 'data',
                documents: [{
                  id: doc.id,
                  original_name: doc.originalName,
                  mime_type: file.type || 'application/octet-stream',
                  file_size: doc.fileSize,
                  status: doc.status,
                  chunk_count: 0,
                  error_message: null,
                  created_at: doc.createdAt,
                  updated_at: doc.createdAt,
                }],
              };
            }
            if (prev.status === 'data') {
              return {
                status: 'data',
                documents: [{
                  id: doc.id,
                  original_name: doc.originalName,
                  mime_type: file.type || 'application/octet-stream',
                  file_size: doc.fileSize,
                  status: doc.status,
                  chunk_count: 0,
                  error_message: null,
                  created_at: doc.createdAt,
                  updated_at: doc.createdAt,
                }, ...prev.documents],
              };
            }
            return prev;
          });

          if (doc.status === 'ready') {
            success(`"${doc.originalName}" uploaded and processed successfully`);
            updateUsage({ documentsUploaded: usage.documentsUploaded + 1 });
          } else {
            success(`"${doc.originalName}" uploaded — processing in background`);
          }
        } else {
          toastError(response.message || 'Upload failed');
        }
      } catch (err: any) {
        toastError(err?.message || `Failed to upload "${file.name}"`);
      }
    }

    setUploading(false);
    setUploadProgress(null);
    // Reset file input
    e.target.value = '';
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;
    if (limitReached) {
      toastError('Document limit reached. Upgrade to upload more files.');
      return;
    }

    setUploading(true);

    for (const file of files) {
      try {
        setUploadProgress(`Uploading "${file.name}"...`);
        const response = await api.uploadDocument(file);

        if (response.success) {
          const doc = response.document;
          if (doc.status === 'pending' || doc.status === 'processing') {
            startPolling([doc.id]);
          }

          setPageState(prev => {
            if (prev.status === 'empty') {
              return {
                status: 'data',
                documents: [{
                  id: doc.id,
                  original_name: doc.originalName,
                  mime_type: file.type || 'application/octet-stream',
                  file_size: doc.fileSize,
                  status: doc.status,
                  chunk_count: 0,
                  error_message: null,
                  created_at: doc.createdAt,
                  updated_at: doc.createdAt,
                }],
              };
            }
            if (prev.status === 'data') {
              return {
                status: 'data',
                documents: [{
                  id: doc.id,
                  original_name: doc.originalName,
                  mime_type: file.type || 'application/octet-stream',
                  file_size: doc.fileSize,
                  status: doc.status,
                  chunk_count: 0,
                  error_message: null,
                  created_at: doc.createdAt,
                  updated_at: doc.createdAt,
                }, ...prev.documents],
              };
            }
            return prev;
          });

          if (doc.status === 'ready') {
            success(`"${doc.originalName}" uploaded and processed successfully`);
          }
        }
      } catch (err: any) {
        toastError(err?.message || `Failed to upload "${file.name}"`);
      }
    }

    setUploading(false);
    setUploadProgress(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const response = await api.deleteDocument(deleteTarget.id);
      if (response.success) {
        success(`"${deleteTarget.original_name}" deleted successfully`);
        setPageState(prev => {
          if (prev.status !== 'data') return prev;
          const remaining = prev.documents.filter(d => d.id !== deleteTarget.id);
          if (remaining.length === 0) return { status: 'empty' };
          return { status: 'data', documents: remaining };
        });
        updateUsage({ documentsUploaded: Math.max(0, usage.documentsUploaded - 1) });
      } else {
        toastError(response.message || 'Delete failed');
      }
    } catch (err: any) {
      toastError(err?.message || 'Failed to delete document');
    }
    setDeleteTarget(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return '📕';
    if (mimeType.includes('word') || mimeType.includes('docx')) return '📘';
    if (mimeType.includes('csv')) return '📊';
    if (mimeType.includes('json')) return '📋';
    if (mimeType.includes('markdown') || mimeType.includes('md')) return '📝';
    return '📄';
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <ToastProvider />
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
            Knowledge Base
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Upload your business documents (PDF, DOCX, TXT, CSV, JSON, Markdown) to train your AI assistant
          </p>
        </div>

        {/* Storage Usage */}
        <Card className="mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-[#0F172A] text-sm sm:text-base">
                  Storage Usage
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {usage.documentsUploaded} of {usage.documentsLimit} documents uploaded
                </p>
              </div>
              <span className="text-lg sm:text-xl font-bold text-[#25D366]">
                {usage.documentsLimit > 0
                  ? Math.round((usage.documentsUploaded / usage.documentsLimit) * 100)
                  : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#25D366] h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${usage.documentsLimit > 0
                    ? Math.min((usage.documentsUploaded / usage.documentsLimit) * 100, 100)
                    : 0}%`,
                }}
              />
            </div>
            {limitReached && (
              <p className="text-xs sm:text-sm text-orange-600 mt-3 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <span>Document limit reached. Upgrade to upload more files.</span>
              </p>
            )}
          </div>
        </Card>

        {/* Upload Drop Zone */}
        <Card className="mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 lg:p-8">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`border-2 border-dashed rounded-xl p-6 sm:p-8 lg:p-12 text-center transition-all ${
                limitReached || uploading
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                  : 'border-gray-300 hover:border-[#25D366] hover:bg-[#25D366]/5 cursor-pointer'
              }`}
            >
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.doc,.txt,.csv,.json,.md"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={limitReached || uploading}
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer ${limitReached || uploading ? 'cursor-not-allowed' : ''}`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 mb-4 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin" />
                    <p className="text-lg font-semibold text-[#0F172A] mb-1">
                      Uploading...
                    </p>
                    <p className="text-sm text-gray-500">
                      {uploadProgress || 'Processing your files'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-4xl sm:text-5xl mb-4">
                      <svg
                        className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <p className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">
                      {limitReached
                        ? 'Document limit reached'
                        : 'Drag and drop files here'}
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 mb-3">
                      {limitReached
                        ? 'Upgrade your plan to upload more documents'
                        : 'or click to browse your files'}
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, DOCX, TXT, CSV, JSON, Markdown &mdash; up to 50MB each
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>
        </Card>

        {/* Document List */}
        <Card>
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                Uploaded Documents
              </h2>
              {pageState.status === 'data' && (
                <span className="text-xs sm:text-sm text-gray-500">
                  {pageState.documents.length} file{pageState.documents.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* Loading State */}
            {pageState.status === 'loading' && (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-4 animate-pulse"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded-full w-20" />
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {pageState.status === 'error' && (
              <ErrorState
                message={pageState.message}
                onRetry={fetchDocuments}
              />
            )}

            {/* Empty State */}
            {pageState.status === 'empty' && (
              <EmptyState
                icon={
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
                title="No documents uploaded yet"
                description="Upload your first document to train your AI assistant. It will be processed and made searchable automatically."
              />
            )}

            {/* Data State */}
            {pageState.status === 'data' && (
              <div className="space-y-2">
                {pageState.documents.map(doc => (
                  <div
                    key={doc.id}
                    className="group flex items-center justify-between bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="text-2xl flex-shrink-0">
                        {getFileIcon(doc.mime_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#0F172A] text-sm sm:text-base truncate">
                          {doc.original_name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {formatFileSize(doc.file_size)}
                          {doc.chunk_count > 0 && (
                            <> &middot; {doc.chunk_count} chunk{doc.chunk_count !== 1 ? 's' : ''}</>
                          )}
                          {doc.status === 'ready' && (
                            <> &middot; {new Date(doc.created_at).toLocaleDateString()}</>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 ml-2">
                      <StatusBadge status={doc.status} />
                      <button
                        onClick={() => setDeleteTarget(doc)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete document"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Processing indicator */}
            {pollingIds.size > 0 && (
              <div className="mt-4 flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-500">
                <div className="w-3 h-3 border-2 border-[#25D366] border-t-transparent rounded-full animate-spin" />
                <span>
                  {pollingIds.size} file{pollingIds.size !== 1 ? 's' : ''} processing...
                </span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Document"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="!bg-red-500 hover:!bg-red-600 !shadow-none"
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to delete{' '}
          <span className="font-medium text-[#0F172A]">
            &ldquo;{deleteTarget?.original_name}&rdquo;
          </span>
          ? This will remove all chunks from the knowledge base and the AI will no longer have access to this information.
        </p>
      </Modal>
    </DashboardLayout>
  );
}
