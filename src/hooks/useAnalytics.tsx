'use client';

type AnalyticsEvent =
  | 'onboarding_completed'
  | 'upgrade_clicked'
  | 'limit_reached'
  | 'whatsapp_setup_started'
  | 'ai_test_used'
  | 'document_uploaded'
  | 'conversation_viewed';

interface AnalyticsData {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean | undefined>;
  timestamp: number;
}

class AnalyticsQueue {
  private queue: AnalyticsData[] = [];
  private isProcessing = false;

  add(event: AnalyticsEvent, properties?: Record<string, string | number | boolean | undefined>) {
    const data: AnalyticsData = {
      event,
      properties,
      timestamp: Date.now(),
    };
    
    this.queue.push(data);
    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const data = this.queue.shift();
      if (data) {
        try {
          // Send to analytics backend
          await this.sendToBackend(data);
        } catch (error) {
          console.error('Analytics error:', error);
          // Re-queue on failure
          this.queue.unshift(data);
          break;
        }
      }
    }

    this.isProcessing = false;
  }

  private async sendToBackend(data: AnalyticsData) {
    // In production, this would send to your analytics endpoint
    // For now, we'll just log to console
    console.log('[Analytics]', data);
    
    // Example API call:
    // await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
  }
}

const analyticsQueue = new AnalyticsQueue();

export const useAnalytics = () => {
  const track = (event: AnalyticsEvent, properties?: Record<string, string | number | boolean | undefined>) => {
    analyticsQueue.add(event, properties);
  };

  return {
    track,
    // Convenience methods
    onboardingCompleted: () => track('onboarding_completed'),
    upgradeClicked: (plan?: string) => track('upgrade_clicked', plan ? { plan } : undefined),
    limitReached: (limitType: string) => track('limit_reached', { limitType }),
    whatsappSetupStarted: () => track('whatsapp_setup_started'),
    aiTestUsed: () => track('ai_test_used'),
    documentUploaded: (fileType: string) => track('document_uploaded', { fileType }),
    conversationViewed: (conversationId: string) => track('conversation_viewed', { conversationId }),
  };
};
