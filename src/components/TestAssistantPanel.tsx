'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';

interface ThreadItem {
  role: 'user' | 'assistant';
  content: string;
}

export function TestAssistantPanel() {
  const [input, setInput] = useState('');
  const [thread, setThread] = useState<ThreadItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread, loading]);

  const send = async () => {
    const message = input.trim();
    if (!message || loading) return;
    setInput('');
    setHint(null);
    setThread((prev) => [...prev, { role: 'user', content: message }]);
    setLoading(true);
    try {
      const res = await api.testAI(message);
      if (res.success) {
        setThread((prev) => [...prev, { role: 'assistant', content: res.reply }]);
        if (!res.hasAccount) {
          setHint('Tip: connect a WhatsApp number so the assistant can use that account’s knowledge base.');
        } else if (!res.usedKnowledge) {
          setHint('No matching knowledge was found — upload documents so answers are grounded in your business info.');
        }
      } else {
        setThread((prev) => [
          ...prev,
          { role: 'assistant', content: 'Sorry, I could not generate a reply.' },
        ]);
      }
    } catch (err: any) {
      setThread((prev) => [
        ...prev,
        { role: 'assistant', content: err?.message || 'Something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-[#0F172A]">Try your assistant</h2>
          {thread.length > 0 && (
            <button
              onClick={() => {
                setThread([]);
                setHint(null);
              }}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Ask a question the way a customer would. This runs the same AI + knowledge pipeline as live replies.
        </p>

        <div className="bg-[#F8FAFC] rounded-xl border border-gray-100 p-3 h-64 overflow-y-auto space-y-3 mb-3">
          {thread.length === 0 && !loading ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-400 text-center px-4">
              e.g. &ldquo;What are your delivery charges?&rdquo;
            </div>
          ) : (
            thread.map((item, i) => (
              <div
                key={i}
                className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-line ${
                    item.role === 'user'
                      ? 'bg-[#25D366] text-white'
                      : 'bg-white text-[#0F172A] border border-gray-100'
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-400 border border-gray-100 rounded-2xl px-3.5 py-2 text-sm">
                Thinking…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {hint && <p className="text-xs text-amber-600 mb-2">{hint}</p>}

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask your assistant a question…"
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm bg-gray-50"
          />
          <Button size="sm" onClick={send} disabled={loading || !input.trim()}>
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
}
