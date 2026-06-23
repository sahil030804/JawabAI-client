'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { StatusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { WebhookActivityPanel } from '@/components/WebhookActivityPanel';
import { EmbeddedSignupButton } from '@/components/EmbeddedSignupButton';
import { useToast } from '@/hooks/useToast';
import { api, WhatsAppAccount } from '@/lib/api';

type ConnectionState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'connected'; accounts: WhatsAppAccount[] };

export default function WhatsAppSetupPage() {
  const { user } = useAuth();
  const { success, error: toastError, ToastProvider } = useToast();

  const [state, setState] = useState<ConnectionState>({ status: 'loading' });
  const [connecting, setConnecting] = useState(false);
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [disconnectTarget, setDisconnectTarget] = useState<WhatsAppAccount | null>(null);

  const fetchAccounts = useCallback(async () => {
    try {
      const response = await api.getAccounts();
      if (response.success) {
        if (response.accounts.length > 0) {
          setState({ status: 'connected', accounts: response.accounts });
        } else {
          setState({ status: 'idle' });
        }
      } else {
        setState({ status: 'error', message: response.message || 'Failed to fetch accounts' });
      }
    } catch (err: any) {
      setState({ status: 'error', message: err?.message || 'Failed to load accounts' });
    }
  }, []);

  const handleOAuthCallback = useCallback(async (code: string, stateParam: string) => {
    setConnecting(true);
    try {
      const response = await api.exchangeToken({ code, state: stateParam });
      if (response.success) {
        success('WhatsApp account connected successfully!');
        // Clean URL params
        window.history.replaceState({}, '', '/dashboard/whatsapp-setup');
        await fetchAccounts();
      } else {
        toastError(response.message || 'Failed to connect WhatsApp account');
        setState({ status: 'idle' });
      }
    } catch (err: any) {
      toastError(err?.message || 'Failed to exchange authorization code');
      setState({ status: 'idle' });
    }
    setConnecting(false);
  }, [fetchAccounts, success, toastError]);

  useEffect(() => {
    if (!user) return;

    // Check URL for OAuth callback params
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const stateParam = params.get('state');

    // Surface Meta OAuth errors (denials/cancellations) instead of failing silently.
    const errorParam = params.get('error') || params.get('error_code');
    const errorDesc =
      params.get('error_description') ||
      params.get('error_reason') ||
      params.get('error_message');

    if (errorParam) {
      toastError(
        `WhatsApp connection failed: ${errorDesc || errorParam}`,
      );
      window.history.replaceState({}, '', '/dashboard/whatsapp-setup');
      fetchAccounts();
      return;
    }

    if (code) {
      handleOAuthCallback(code, stateParam || '');
    } else {
      fetchAccounts();
    }
  }, [user, fetchAccounts, handleOAuthCallback, toastError]);

  const handleConnect = async () => {
    try {
      setConnecting(true);
      const response = await api.getAuthUrl();
      if (response.success) {
        setAuthUrl(response.url);
        // Redirect to Meta OAuth
        window.location.href = response.url;
      } else {
        toastError(response.message || 'Failed to get authorization URL');
        setConnecting(false);
      }
    } catch (err: any) {
      toastError(err?.message || 'Failed to initiate connection');
      setConnecting(false);
    }
  };

  const handleDisconnectConfirm = async () => {
    if (!disconnectTarget) return;
    try {
      const response = await api.disconnectAccount(disconnectTarget.id);
      if (response.success) {
        success('WhatsApp account disconnected successfully');
        setState(prev => {
          if (prev.status !== 'connected') return prev;
          const remaining = prev.accounts.filter(a => a.id !== disconnectTarget.id);
          if (remaining.length === 0) return { status: 'idle' };
          return { status: 'connected', accounts: remaining };
        });
      } else {
        toastError(response.message || 'Failed to disconnect account');
      }
    } catch (err: any) {
      toastError(err?.message || 'Failed to disconnect account');
    }
    setDisconnectTarget(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPhoneNumber = (id: string) => {
    // phone_number_id is a numeric string from Meta
    if (id.length >= 10) {
      return `+${id.slice(0, 1)} ${id.slice(1, 4)} ${id.slice(4, 7)} ${id.slice(7)}`;
    }
    return id;
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <ToastProvider />
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
            WhatsApp Setup
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Connect your WhatsApp Business Account to enable AI-powered automated replies
          </p>
        </div>

        {/* Loading State */}
        {state.status === 'loading' && (
          <div className="space-y-4">
            <Card>
              <div className="p-6">
                <LoadingSkeleton className="h-6 w-48 mb-4" />
                <LoadingSkeleton className="h-4 w-72 mb-6" />
                <LoadingSkeleton className="h-10 w-40" />
              </div>
            </Card>
          </div>
        )}

        {/* Error State */}
        {state.status === 'error' && (
          <ErrorState
            message={state.message}
            onRetry={fetchAccounts}
          />
        )}

        {/* Connected Accounts */}
        {state.status === 'connected' && (
          <div className="space-y-6">
            <Card>
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                    Connected Accounts
                  </h2>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {state.accounts.length} account{state.accounts.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-3">
                  {state.accounts.map(account => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-[#0F172A] text-sm sm:text-base">
                            {formatPhoneNumber(account.phone_number_id)}
                          </p>
                          <div className="flex items-center space-x-3 mt-1">
                            <StatusBadge status={account.is_active ? 'active' : 'inactive'} />
                            <span className="text-xs text-gray-500">
                              Expires {formatDate(account.token_expires_at)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">
                            WABA: {account.waba_id} &middot; Business: {account.business_id}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDisconnectTarget(account)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Disconnect account"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Connection Status */}
            <Card>
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-bold text-[#0F172A] mb-4">
                  Connection Status
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {state.accounts.map(account => (
                    <div key={account.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">
                          {formatPhoneNumber(account.phone_number_id)}
                        </span>
                        <div className="flex items-center space-x-1.5">
                          <span className={`w-2 h-2 rounded-full ${account.is_active ? 'bg-[#25D366]' : 'bg-gray-400'}`} />
                          <span className="text-xs text-gray-500">
                            {account.is_active ? 'Live' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-xs text-gray-500">
                        <div className="flex justify-between">
                          <span>Token expires</span>
                          <span className="font-medium text-[#0F172A]">
                            {formatDate(account.token_expires_at)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Webhook</span>
                          <span className="font-medium text-[#0F172A]">
                            {account.webhook_id ? 'Configured' : '—'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Idle State — No Accounts Connected */}
        {state.status === 'idle' && (
          <Card>
            <div className="p-6 sm:p-8">
              <div className="text-center max-w-lg mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3">
                  Connect Your WhatsApp Business Account
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                  Connect in one click with Meta Embedded Signup. With Coexistence you keep using the WhatsApp Business app on your phone while JawabAI replies on your behalf.
                </p>
                <EmbeddedSignupButton
                  onSuccess={success}
                  onError={toastError}
                  onConnected={fetchAccounts}
                />
                <button
                  type="button"
                  onClick={handleConnect}
                  disabled={connecting}
                  className="block mx-auto mt-4 text-xs text-gray-500 hover:text-[#25D366] underline disabled:opacity-50"
                >
                  {connecting ? 'Connecting…' : 'Or connect manually (classic OAuth)'}
                </button>
                {authUrl && (
                  <p className="text-xs text-gray-500 mt-4">
                    If you are not redirected automatically,{' '}
                    <a
                      href={authUrl}
                      className="text-[#25D366] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      click here
                    </a>
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Connecting State */}
        {connecting && state.status !== 'connected' && (
          <Card className="mt-6">
            <div className="p-6 text-center">
              <div className="w-12 h-12 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Waiting for Meta authorization...</p>
            </div>
          </Card>
        )}

        {/* How it works */}
        {state.status === 'idle' && (
          <Card className="mt-6">
            <div className="p-4 sm:p-6">
              <h3 className="font-semibold text-[#0F172A] mb-4 text-sm sm:text-base">
                How it works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] text-sm">Authorize</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Click connect and log in with your Meta account
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] text-sm">Grant Permissions</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Allow JawabAI to manage your WhatsApp messages
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] text-sm">Go Live</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Your AI assistant starts replying automatically
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Webhook activity — live diagnostics for inbound message delivery */}
        {state.status !== 'loading' && <WebhookActivityPanel />}
      </div>

      {/* Disconnect Confirmation Modal */}
      <Modal
        isOpen={!!disconnectTarget}
        onClose={() => setDisconnectTarget(null)}
        title="Disconnect Account"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setDisconnectTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleDisconnectConfirm}
              className="!bg-red-500 hover:!bg-red-600 !shadow-none"
            >
              Disconnect
            </Button>
          </>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to disconnect{' '}
          <span className="font-medium text-[#0F172A]">
            {disconnectTarget ? formatPhoneNumber(disconnectTarget.phone_number_id) : 'this account'}
          </span>
          ? Your AI assistant will stop responding to new messages.
        </p>
      </Modal>
    </DashboardLayout>
  );
}
