import type { ChatMessage } from '../types';
import { BotIcon, UserCircleIcon } from './icons';

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isAgent = message.role === 'agent';
  const lines = message.text.split('\n').filter((line) => line.trim().length > 0);

  return (
    <div className={`flex items-end gap-2 ${isAgent ? '' : 'flex-row-reverse'}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ${
          isAgent
            ? 'bg-emerald-50 text-emerald-600 ring-emerald-200'
            : 'bg-slate-100 text-slate-500 ring-slate-200'
        }`}
      >
        {isAgent ? <BotIcon className="h-4 w-4" /> : <UserCircleIcon className="h-4 w-4" />}
      </div>

      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm shadow-slate-200/60 ${
          isAgent ? 'rounded-br-md bg-slate-100 text-slate-900' : 'rounded-bl-md bg-emerald-600 text-white'
        }`}
      >
        {lines.map((line, idx) => {
          const isBullet = line.trim().startsWith('•');
          return (
            <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
              {isBullet ? (
                <span className="flex items-start gap-1.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{line.replace('•', '').trim()}</span>
                </span>
              ) : (
                line
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}
