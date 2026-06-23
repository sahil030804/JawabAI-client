'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { ConnectionHealth } from '@/components/ConnectionHealth';
import { TestAssistantPanel } from '@/components/TestAssistantPanel';
import { useAppState } from '@/hooks/useAppState';
import { api, KnowledgeDocument, WhatsAppAccount } from '@/lib/api';

interface DashboardData {
  documents: KnowledgeDocument[];
  accounts: WhatsAppAccount[];
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { usage } = useAppState();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [docsRes, accountsRes] = await Promise.all([
        api.listDocuments(),
        api.getAccounts(),
      ]);

      setData({
        documents: docsRes.success ? docsRes.documents : [],
        accounts: accountsRes.success ? accountsRes.accounts : [],
      });
    } catch (err: any) {
      setError(err?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  const freeMode = usage.aiRepliesUsed < usage.aiRepliesLimit;
  const isLimitReached = usage.aiRepliesUsed >= usage.aiRepliesLimit;
  const readyDocuments = data?.documents.filter(d => d.status === 'ready').length || 0;
  const connectedAccounts = data?.accounts.filter(a => a.is_active).length || 0;

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Here&apos;s what&apos;s happening with your WhatsApp assistant today.
          </p>
        </div>

        {/* Connection health — driven by live webhook activity */}
        <ConnectionHealth />

        {/* Free mode banner */}
        {!connectedAccounts && (
          <div className="bg-gradient-to-r from-[#25D366]/10 to-emerald-500/10 border border-[#25D366]/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
                <div>
                  <p className="font-semibold text-[#0F172A] text-sm sm:text-base">
                    Get started — connect your WhatsApp
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Link your WhatsApp Business account to start auto-replying
                  </p>
                </div>
              </div>
              <Link href="/dashboard/whatsapp-setup">
                <Button className="w-full sm:w-auto text-sm">
                  Connect WhatsApp
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {[1, 2, 3, 4].map(i => (
              <Card key={i}>
                <div className="p-4 sm:p-6">
                  <LoadingSkeleton className="h-4 w-24 mb-2" />
                  <LoadingSkeleton className="h-8 w-16 mb-2" />
                  <LoadingSkeleton className="h-3 w-20" />
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={fetchData} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <div className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Documents Uploaded</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
                  {readyDocuments}
                  <span className="text-base sm:text-lg text-gray-400 font-normal">
                    /{usage.documentsLimit}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {data?.documents.filter(d => d.status !== 'ready').length || 0} processing
                </p>
              </div>
            </Card>
            <Card>
              <div className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">WhatsApp Accounts</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
                  {connectedAccounts}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {connectedAccounts > 0 ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </Card>
            <Card>
              <div className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">AI Replies Used</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
                  {usage.aiRepliesUsed}
                  <span className="text-base sm:text-lg text-gray-400 font-normal">
                    /{usage.aiRepliesLimit}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {isLimitReached ? 'Limit reached — upgrade' : `${usage.aiRepliesLimit - usage.aiRepliesUsed} remaining`}
                </p>
              </div>
            </Card>
            <Card>
              <div className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Knowledge Chunks</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
                  {data?.documents.reduce((sum, d) => sum + d.chunk_count, 0) || 0}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Searchable content pieces
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Link href="/dashboard/knowledge-base">
            <Card className="group cursor-pointer hover:shadow-md transition-all h-full">
              <div className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#0F172A] text-sm sm:text-base mb-1">
                  Knowledge Base
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {readyDocuments > 0
                    ? `${readyDocuments} document${readyDocuments !== 1 ? 's' : ''} uploaded`
                    : 'Upload documents to train your AI'}
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/whatsapp-setup">
            <Card className="group cursor-pointer hover:shadow-md transition-all h-full">
              <div className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#128C7E] rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#0F172A] text-sm sm:text-base mb-1">
                  WhatsApp Setup
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {connectedAccounts > 0
                    ? `${connectedAccounts} account${connectedAccounts !== 1 ? 's' : ''} connected`
                    : 'Connect your WhatsApp Business'}
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/conversations">
            <Card className="group cursor-pointer hover:shadow-md transition-all h-full">
              <div className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0F172A] rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#0F172A] text-sm sm:text-base mb-1">
                  Conversations
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  View and manage customer interactions
                </p>
              </div>
            </Card>
          </Link>
        </div>

        {/* Test your assistant */}
        <div className="mb-6 sm:mb-8">
          <TestAssistantPanel />
        </div>

        {/* Recent Activity */}
        <Card>
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-4">
              Recent Activity
            </h2>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center space-x-4">
                    <LoadingSkeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <LoadingSkeleton className="h-4 w-3/4" />
                      <LoadingSkeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : data && (data.documents.length > 0 || data.accounts.length > 0) ? (
              <div className="space-y-4">
                {data.accounts.filter(a => a.is_active).map(account => (
                  <div key={account.id} className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#0F172A] text-sm sm:text-base truncate">
                        WhatsApp connected successfully
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Auto-reply is active
                      </p>
                    </div>
                  </div>
                ))}
                {data.documents.slice(0, 3).map(doc => (
                  <div key={doc.id} className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#128C7E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#128C7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#0F172A] text-sm sm:text-base truncate">
                        {doc.status === 'ready' ? 'Processed: ' : 'Uploaded: '}
                        {doc.original_name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {doc.status === 'ready'
                          ? `${doc.chunk_count} chunks generated`
                          : doc.status === 'failed'
                            ? 'Processing failed'
                            : 'Processing...'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-3xl mb-3">👋</div>
                <p className="text-sm sm:text-base text-gray-600 mb-1">
                  No activity yet
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Upload a document or connect WhatsApp to get started
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
