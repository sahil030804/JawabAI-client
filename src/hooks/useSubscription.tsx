'use client';

import { useState, useCallback } from 'react';
import { useToast } from './useToast';

export type SubscriptionStatus = 'free' | 'trial' | 'active' | 'past_due' | 'cancelled';
export type PlanTier = 'starter' | 'pro' | 'enterprise';

interface SubscriptionHookReturn {
  status: SubscriptionStatus;
  plan: PlanTier | null;
  trialEndsAt: Date | null;
  upgrade: (plan: PlanTier) => Promise<void>;
  downgrade: (plan: PlanTier) => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

export const useSubscription = (): SubscriptionHookReturn => {
  const [status, setStatus] = useState<SubscriptionStatus>('free');
  const [plan, setPlan] = useState<PlanTier | null>(null);
  const [trialEndsAt, setTrialEndsAt] = useState<Date | null>(null);
  const { success, error } = useToast();

  const upgrade = useCallback(async (newPlan: PlanTier) => {
    try {
      // In production, this would call your subscription API
      // await api.upgradeSubscription(newPlan);
      
      setPlan(newPlan);
      setStatus('active');
      success(`Successfully upgraded to ${newPlan} plan`);
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to upgrade subscription');
    }
  }, [success, error]);

  const downgrade = useCallback(async (newPlan: PlanTier) => {
    try {
      // In production, this would call your subscription API
      // await api.downgradeSubscription(newPlan);
      
      setPlan(newPlan);
      success(`Downgraded to ${newPlan} plan`);
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to downgrade subscription');
    }
  }, [success, error]);

  const cancelSubscription = useCallback(async () => {
    try {
      // In production, this would call your subscription API
      // await api.cancelSubscription();
      
      setStatus('cancelled');
      setPlan(null);
      success('Subscription cancelled successfully');
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to cancel subscription');
    }
  }, [success, error]);

  return {
    status,
    plan,
    trialEndsAt,
    upgrade,
    downgrade,
    cancelSubscription,
  };
};
