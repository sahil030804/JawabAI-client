'use client';

import { useState, useCallback } from 'react';
import { ToastContainer, type ToastVariant } from '@/components/ui/Toast';

interface Toast {
  id: string;
  variant: ToastVariant;
  message: string;
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((variant: ToastVariant, message: string, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, variant, message, duration };
    
    setToasts((prev) => [...prev, newToast]);
    
    return id;
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    return toast('success', message, duration);
  }, [toast]);

  const error = useCallback((message: string, duration?: number) => {
    return toast('error', message, duration);
  }, [toast]);

  const warning = useCallback((message: string, duration?: number) => {
    return toast('warning', message, duration);
  }, [toast]);

  const info = useCallback((message: string, duration?: number) => {
    return toast('info', message, duration);
  }, [toast]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const ToastProvider = () => (
    <ToastContainer toasts={toasts} onDismiss={dismiss} />
  );

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
    ToastProvider,
  };
};
