'use client';

import { useState, useCallback } from 'react';

export type FileProcessingState = 'idle' | 'uploading' | 'parsing' | 'embedding' | 'ready' | 'failed';

interface FileProcessingHookReturn {
  state: FileProcessingState;
  progress: number;
  error: string | null;
  uploadFile: (file: File) => Promise<void>;
  reset: () => void;
}

export const useFileProcessing = (): FileProcessingHookReturn => {
  const [state, setState] = useState<FileProcessingState>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File) => {
    setState('uploading');
    setProgress(0);
    setError(null);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 30; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(i);
      }

      // Simulate parsing
      setState('parsing');
      for (let i = 30; i <= 60; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setProgress(i);
      }

      // Simulate embedding
      setState('embedding');
      for (let i = 60; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }

      // In production, this would call your file upload API
      // const result = await api.uploadFile(file);
      console.log('Uploading file:', file.name, file.size);

      setState('ready');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      setState('failed');
    }
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setProgress(0);
    setError(null);
  }, []);

  return {
    state,
    progress,
    error,
    uploadFile,
    reset,
  };
};
