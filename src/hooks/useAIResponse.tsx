'use client';

import { useState, useCallback } from 'react';

export type AIResponseState = 'idle' | 'processing' | 'retrievingKnowledge' | 'generatingResponse' | 'completed' | 'error';

interface AIResponseHookReturn {
  state: AIResponseState;
  response: string | null;
  error: string | null;
  generateResponse: (query: string, knowledgeBaseId?: string) => Promise<void>;
  reset: () => void;
}

export const useAIResponse = (): AIResponseHookReturn => {
  const [state, setState] = useState<AIResponseState>('idle');
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = useCallback(async (query: string, knowledgeBaseId?: string) => {
    setState('processing');
    setResponse(null);
    setError(null);

    try {
      // Simulate retrieving knowledge
      setState('retrievingKnowledge');
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simulate generating response
      setState('generatingResponse');
      await new Promise(resolve => setTimeout(resolve, 1200));

      // In production, this would call your AI API
      // const result = await api.generateAIResponse(query, knowledgeBaseId);
      console.log('Query:', query, 'Knowledge Base ID:', knowledgeBaseId);
      
      // Mock response for now
      setResponse('Based on your knowledge base, here is the response to your query. In production, this will be a real AI-generated response from your uploaded documents.');
      setState('completed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate response');
      setState('error');
    }
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setResponse(null);
    setError(null);
  }, []);

  return {
    state,
    response,
    error,
    generateResponse,
    reset,
  };
};
