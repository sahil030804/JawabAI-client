'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { api, WebhookEventItem } from '@/lib/api';

// Maps a backend processing_status to a label + colour. "enqueued" is the only
// fully-healthy outcome; drops/signature problems are the actionable ones.
const STATUS_META: Record<string, { label: string; cls: string }> = {
  enqueued: { label: 'Enqueued', cls: 'bg-[#25D366]/10 text-[#0a8c43]' },
  status_update: { label: 'Status update', cls: 'bg-gray-100 text-gray-500' },
  dropped_no_account: { label: 'Dropped · no matching account', cls: 'bg-red-50 text-red-600' },
  no_phone_number_id: { label: 'No phone_number_id', cls: 'bg-red-50 text-red-600' },
  signature_invalid: { label: 'Invalid signature', cls: 'bg-red-50 text-red-600' },
  signature_missing: { label: 'Unsigned (rejected)', cls: 'bg-red-50 text-red-600' },
  empty_body: { label: 'Empty body', cls: 'bg-amber-50 text-amber-600' },
  ignored_unsupported_type: { label: 'Unsupported type', cls: 'bg-amber-50 text-amber-600' },
  ignored_non_message_field: { label: 'Non-message field', cls: 'bg-gray-100 text-gray-500' },
  no_entries: { label: 'No entries', cls: 'bg-gray-100 text-gray-500' },
  error: { label: 'Error', cls: 'bg-red-50 text-red-600' },
};

function statusMeta(status: string) {
  return STATUS_META[status] || { label: status, cls: 'bg-gray-100 text-gray-500' };
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function WebhookActivityPanel() {
  const [events, setEvents] = useState<WebhookEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await api.getWebhookEvents(50);
      if (res.success) {
        setEvents(res.events);
        setError(null);
      } else {
        setError(res.message || 'Failed to load webhook events');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load webhook events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchEvents, 5000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh, fetchEvents]);

  const droppedCount = events.filter(
    (e) => e.processing_status === 'dropped_no_account'
  ).length;

  return (
    <Card className="mt-6">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">Webhook activity</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Live inbound events Meta delivered to <code>/meta/webhook</code>. Use this to confirm delivery and spot drops.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="accent-[#25D366]"
              />
              Auto-refresh
            </label>
            <Button variant="outline" size="sm" onClick={fetchEvents}>
              Refresh
            </Button>
          </div>
        </div>

        {droppedCount > 0 && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-100 p-3 text-xs text-red-700">
            <strong>{droppedCount}</strong> event{droppedCount !== 1 ? 's were' : ' was'} dropped because the inbound
            {' '}<code>phone_number_id</code> didn&apos;t match any active connected account. Connect that exact number,
            or check that its <code>phone_number_id</code> is stored and active.
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-400 py-6 text-center">Loading…</p>
        ) : error ? (
          <p className="text-sm text-red-500 py-6 text-center">{error}</p>
        ) : events.length === 0 ? (
          <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 text-xs text-gray-500 leading-relaxed">
            <p className="font-medium text-gray-700 mb-1">No webhook events received yet.</p>
            <p>
              If you sent a WhatsApp message and nothing appears here, Meta is not delivering events. Check:
            </p>
            <ul className="list-disc ml-4 mt-1 space-y-0.5">
              <li>App Dashboard → Webhooks → WhatsApp Business Account → the <strong>messages</strong> field is subscribed.</li>
              <li>The Callback URL points at this backend&apos;s <code>/meta/webhook</code> (not the frontend).</li>
              <li>For a number on the WhatsApp Business mobile app, Coexistence must be set up via Embedded Signup.</li>
            </ul>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="py-2 pr-3 font-medium">Time</th>
                  <th className="py-2 pr-3 font-medium">Status</th>
                  <th className="py-2 pr-3 font-medium">phone_number_id</th>
                  <th className="py-2 pr-3 font-medium">From</th>
                  <th className="py-2 pr-3 font-medium">Type</th>
                  <th className="py-2 font-medium">Sig</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => {
                  const meta = statusMeta(ev.processing_status);
                  return (
                    <tr key={ev.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 pr-3 text-gray-500 whitespace-nowrap">{formatTime(ev.created_at)}</td>
                      <td className="py-2 pr-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-medium ${meta.cls}`}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="py-2 pr-3 font-mono text-gray-600">{ev.phone_number_id || '—'}</td>
                      <td className="py-2 pr-3 font-mono text-gray-600">{ev.from_number || '—'}</td>
                      <td className="py-2 pr-3 text-gray-600">{ev.message_type || ev.field || '—'}</td>
                      <td className="py-2 text-gray-600">
                        {ev.signature_valid === true ? '✓' : ev.signature_valid === false ? '✗' : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}
