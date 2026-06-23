'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { api, ConversationListItem, ConversationMessage } from '@/lib/api';

function initials(name: string | null, phone: string): string {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  }
  return phone.slice(-2);
}

function relativeTime(dateStr: string | null): string {
  if (!dateStr) return '';
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

function formatClock(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ConversationsPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationListItem[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  const fetchConversations = useCallback(async () => {
    try {
      const res = await api.getConversations();
      if (res.success) {
        setConversations(res.conversations);
        setListError(null);
      } else {
        setListError(res.message || 'Failed to load conversations');
      }
    } catch (err: any) {
      setListError(err?.message || 'Failed to load conversations');
    } finally {
      setListLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async (id: number, showSpinner = true) => {
    if (showSpinner) setMessagesLoading(true);
    try {
      const res = await api.getConversationMessages(id);
      if (res.success) {
        setMessages(res.messages);
        // Reflect the read state locally.
        setConversations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, unread_count: 0 } : c))
        );
      }
    } catch {
      // Keep whatever is on screen; transient errors are non-fatal here.
    } finally {
      if (showSpinner) setMessagesLoading(false);
    }
  }, []);

  // Initial load + poll the list so new conversations appear.
  useEffect(() => {
    if (!user) return;
    fetchConversations();
    const interval = setInterval(fetchConversations, 15000);
    return () => clearInterval(interval);
  }, [user, fetchConversations]);

  // Load + poll the open thread for new AI/customer messages.
  useEffect(() => {
    if (selectedId == null) return;
    fetchMessages(selectedId, true);
    const interval = setInterval(() => fetchMessages(selectedId, false), 8000);
    return () => clearInterval(interval);
  }, [selectedId, fetchMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredConversations = conversations.filter((c) => {
    const name = (c.customer_name || '').toLowerCase();
    return (
      name.includes(searchQuery.toLowerCase()) ||
      c.customer_phone.includes(searchQuery)
    );
  });

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
            Conversations
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            View and manage all customer conversations. Your AI assistant handles replies automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Conversation List */}
          <Card className={`lg:col-span-1 ${selectedId ? 'hidden lg:block' : ''}`}>
            <div className="flex flex-col h-[calc(100vh-16rem)] sm:h-[calc(100vh-14rem)]">
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {listLoading ? (
                  <div className="p-6 text-center text-sm text-gray-400">Loading…</div>
                ) : listError ? (
                  <div className="p-4">
                    <ErrorState message={listError} onRetry={fetchConversations} />
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-500">
                    {searchQuery
                      ? 'No conversations match your search'
                      : 'No conversations yet. They appear here once customers message your number.'}
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedId(conv.id)}
                      className={`w-full text-left p-3 sm:p-4 hover:bg-gray-50 transition-colors ${
                        selectedId === conv.id ? 'bg-[#25D366]/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                          style={{ backgroundColor: selectedId === conv.id ? '#25D366' : '#0F172A' }}
                        >
                          {initials(conv.customer_name, conv.customer_phone)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-[#0F172A] text-sm truncate">
                              {conv.customer_name || conv.customer_phone}
                            </p>
                            <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                              {relativeTime(conv.last_message_at)}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
                            {conv.last_message || 'No messages yet'}
                          </p>
                        </div>
                        {conv.unread_count > 0 && (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#25D366] rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            {conv.unread_count}
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </Card>

          {/* Chat View */}
          <Card className={`lg:col-span-2 ${!selectedId ? 'hidden lg:block' : ''}`}>
            {selectedConversation ? (
              <div className="flex flex-col h-[calc(100vh-16rem)] sm:h-[calc(100vh-14rem)]">
                {/* Chat Header */}
                <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-xl">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedId(null)}
                      className="lg:hidden p-1 -ml-1 hover:bg-gray-100 rounded-lg"
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0F172A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {initials(selectedConversation.customer_name, selectedConversation.customer_phone)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm sm:text-base">
                        {selectedConversation.customer_name || selectedConversation.customer_phone}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedConversation.customer_phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[#25D366] rounded-full" />
                    <span className="text-xs text-gray-500 ml-1">AI Active</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[#F8FAFC]">
                  {messagesLoading ? (
                    <div className="text-center text-sm text-gray-400 py-6">Loading messages…</div>
                  ) : messages.length === 0 ? (
                    <div className="text-center text-sm text-gray-400 py-6">No messages in this conversation yet.</div>
                  ) : (
                    messages.map((msg) => {
                      const isCustomer = msg.role === 'user';
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 ${
                              isCustomer
                                ? 'bg-white text-[#0F172A] border border-gray-100 shadow-sm'
                                : 'bg-[#25D366] text-white shadow-sm'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{msg.content}</p>
                            <p
                              className={`text-[10px] mt-1.5 ${
                                isCustomer ? 'text-gray-400' : 'text-white/70'
                              }`}
                            >
                              {formatClock(msg.created_at)}
                              {!isCustomer && (
                                <span className="ml-2 inline-flex items-center">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="ml-1">AI</span>
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Message Input (manual replies are a premium feature) */}
                <div className="p-3 sm:p-4 border-t border-gray-100 bg-white rounded-b-xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Reply as business..."
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm bg-gray-50 pr-10"
                        disabled
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                    <button
                      className="p-2.5 bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed"
                      disabled
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                    Replies are handled automatically by AI. Upgrade to send manual replies.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[calc(100vh-16rem)] sm:h-[calc(100vh-14rem)] flex items-center justify-center">
                <EmptyState
                  icon={
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                  title="Select a conversation"
                  description="Choose a conversation from the list to view messages"
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
