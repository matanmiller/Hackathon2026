import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { ChatMessage } from '../types';
import { sendMessageToAgent } from '../services/geminiService';
import ChatBubble from './ChatBubble';
import { BotIcon, LoaderIcon, SendIcon } from './icons';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'agent-welcome',
  role: 'agent',
  text: 'שלום, אני סוכן החירום שלך. תאר לי את המצב בקצר ובצורה ברורה. מה קורה כעת?',
};

let messageIdCounter = 0;
const createMessageId = () => `msg-${Date.now()}-${messageIdCounter++}`;

export default function ChatTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { id: createMessageId(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToAgent(trimmed);

    setMessages((prev) => [...prev, { id: createMessageId(), role: 'agent', text: responseText }]);
    setIsLoading(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void handleSend();
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div ref={scrollRef} className="no-scrollbar flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-end gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                <BotIcon className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl rounded-br-md bg-slate-100 px-4 py-3">
                <LoaderIcon className="h-4 w-4 animate-spin text-emerald-500" />
                <span className="text-xs text-slate-500">הסוכן מקליד...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t border-slate-200 bg-white/95 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="הקלד הודעת חירום כאן..."
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white transition-opacity disabled:opacity-40"
            aria-label="שלח הודעה"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
