'use client';

import { useState, useEffect } from 'react';

export type AppState = 'freeMode' | 'trialActive' | 'limitReached' | 'paidUser' | 'upgradeRequired';

interface UsageData {
  aiRepliesUsed: number;
  aiRepliesLimit: number;
  documentsUploaded: number;
  documentsLimit: number;
}

export const useAppState = () => {
  const [appState, setAppState] = useState<AppState>('freeMode');
  const [usage, setUsage] = useState<UsageData>({
    aiRepliesUsed: 0,
    aiRepliesLimit: 20,
    documentsUploaded: 0,
    documentsLimit: 2,
  });

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('jawabai_app_state');
    const savedUsage = localStorage.getItem('jawabai_usage');
    
    if (savedState || savedUsage) {
      requestAnimationFrame(() => {
        if (savedState) {
          setAppState(savedState as AppState);
        }
        if (savedUsage) {
          setUsage(JSON.parse(savedUsage));
        }
      });
    }
  }, []);

  // Persist state to localStorage
  const updateAppState = (newState: AppState) => {
    setAppState(newState);
    localStorage.setItem('jawabai_app_state', newState);
  };

  const updateUsage = (newUsage: Partial<UsageData>) => {
    const updatedUsage = { ...usage, ...newUsage };
    setUsage(updatedUsage);
    localStorage.setItem('jawabai_usage', JSON.stringify(updatedUsage));

    // Check if limit reached
    if (updatedUsage.aiRepliesUsed >= updatedUsage.aiRepliesLimit && appState === 'freeMode') {
      updateAppState('limitReached');
    }
  };

  const incrementAiReplies = () => {
    updateUsage({ aiRepliesUsed: usage.aiRepliesUsed + 1 });
  };

  const incrementDocuments = () => {
    updateUsage({ documentsUploaded: usage.documentsUploaded + 1 });
  };

  const canUploadDocument = () => {
    return usage.documentsUploaded < usage.documentsLimit || appState === 'paidUser';
  };

  const canUseAiReply = () => {
    return usage.aiRepliesUsed < usage.aiRepliesLimit || appState === 'paidUser';
  };

  const resetUsage = () => {
    const initialUsage = {
      aiRepliesUsed: 0,
      aiRepliesLimit: 20,
      documentsUploaded: 0,
      documentsLimit: 2,
    };
    setUsage(initialUsage);
    localStorage.setItem('jawabai_usage', JSON.stringify(initialUsage));
  };

  return {
    appState,
    usage,
    updateAppState,
    updateUsage,
    incrementAiReplies,
    incrementDocuments,
    canUploadDocument,
    canUseAiReply,
    resetUsage,
  };
};
