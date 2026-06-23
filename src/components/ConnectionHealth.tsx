'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { api } from '@/lib/api';

type Health =
  | { level: 'gray'; title: string; detail: string }
  | { level: 'green'; title: string; detail: string }
  | { level: 'amber'; title: string; detail: string }
  | { level: 'red'; title: string; detail: string };

const DOT: Record<Health['level'], string> = {
  gray: 'bg-gray-400',
  green: 'bg-[#25D366]',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

export function ConnectionHealth() {
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [accountsRes, eventsRes] = await Promise.all([
          api.getAccounts(),
          api.getWebhookEvents(20),
        ]);
        if (cancelled) return;

        const activeAccounts = accountsRes.success
          ? accountsRes.accounts.filter((a) => a.is_active)
          : [];
        const events = eventsRes.success ? eventsRes.events : [];

        if (activeAccounts.length === 0) {
          setHealth({
            level: 'gray',
            title: 'No WhatsApp number connected',
            detail: 'Connect your WhatsApp Business account to start receiving messages.',
          });
          return;
        }

        const hasEnqueued = events.some((e) => e.processing_status === 'enqueued');
        const hasDropped = events.some((e) => e.processing_status === 'dropped_no_account');

        if (hasEnqueued) {
          setHealth({
            level: 'green',
            title: 'Live — receiving messages',
            detail: 'Inbound messages are being delivered and answered by your assistant.',
          });
        } else if (hasDropped) {
          setHealth({
            level: 'red',
            title: 'Events arriving but not matching your number',
            detail: 'Meta is delivering events whose phone_number_id doesn’t match a connected account. Open WhatsApp Setup → Webhook activity.',
          });
        } else {
          setHealth({
            level: 'amber',
            title: 'Connected — waiting for first message',
            detail: 'No inbound messages yet. Send a test message to your number to confirm the webhook fires.',
          });
        }
      } catch {
        if (!cancelled) setHealth(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!health) return null;

  return (
    <Card className="mb-6 sm:mb-8">
      <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${DOT[health.level]} ${health.level === 'green' ? 'animate-pulse' : ''}`} />
          <div>
            <p className="font-semibold text-[#0F172A] text-sm sm:text-base">{health.title}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{health.detail}</p>
          </div>
        </div>
        <Link
          href="/dashboard/whatsapp-setup"
          className="text-xs font-medium text-[#25D366] hover:underline whitespace-nowrap mt-1"
        >
          WhatsApp Setup →
        </Link>
      </div>
    </Card>
  );
}
