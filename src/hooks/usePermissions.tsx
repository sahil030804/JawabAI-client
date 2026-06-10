'use client';

import { useAppState } from './useAppState';

export type FeatureName = 'autoReply' | 'uploadDocuments' | 'connectWhatsApp' | 'bulkMessaging' | 'analytics';

export const usePermissions = () => {
  const { appState, usage } = useAppState();

  const canUseFeature = (feature: FeatureName): { allowed: boolean; reason?: string } => {
    // Paid users have access to everything
    if (appState === 'paidUser') {
      return { allowed: true };
    }

    // Trial users have limited access
    if (appState === 'trialActive') {
      switch (feature) {
        case 'autoReply':
          return { allowed: true };
        case 'uploadDocuments':
          return { allowed: usage.documentsUploaded < usage.documentsLimit };
        case 'connectWhatsApp':
          return { allowed: true };
        case 'bulkMessaging':
          return { allowed: false, reason: 'Bulk messaging is available in paid plans only' };
        case 'analytics':
          return { allowed: true };
        default:
          return { allowed: false, reason: 'Feature not available in trial' };
      }
    }

    // Free mode users
    if (appState === 'freeMode') {
      switch (feature) {
        case 'autoReply':
          return { allowed: false, reason: 'Auto-reply is available in paid plans only' };
        case 'uploadDocuments':
          return { 
            allowed: usage.documentsUploaded < usage.documentsLimit,
            reason: usage.documentsUploaded >= usage.documentsLimit 
              ? `Document limit reached (${usage.documentsLimit}/${usage.documentsLimit})` 
              : undefined 
          };
        case 'connectWhatsApp':
          return { allowed: false, reason: 'Connect WhatsApp is available in paid plans only' };
        case 'bulkMessaging':
          return { allowed: false, reason: 'Bulk messaging is available in paid plans only' };
        case 'analytics':
          return { allowed: true };
        default:
          return { allowed: false, reason: 'Feature not available in free mode' };
      }
    }

    // Limit reached state
    if (appState === 'limitReached') {
      return { 
        allowed: false, 
        reason: 'You have reached your free limit. Upgrade to continue.' 
      };
    }

    return { allowed: false, reason: 'Upgrade required to access this feature' };
  };

  return { canUseFeature };
};
