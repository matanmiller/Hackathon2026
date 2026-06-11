import type { TabId } from '../types';
import { BookIcon, ClipboardCheckIcon, ChatBubbleIcon } from './icons';
import type { IconType } from './icons.types';

interface NavItem {
  id: TabId;
  label: string;
  icon: IconType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'learn', label: 'למידה', icon: BookIcon },
  { id: 'quiz', label: 'בוחן מהיר', icon: ClipboardCheckIcon },
  { id: 'chat', label: 'סוכן חירום', icon: ChatBubbleIcon },
];

interface BottomNavProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export default function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <nav className="z-10 flex shrink-0 items-stretch gap-1 border-t border-slate-800/80 bg-slate-900/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 transition-colors duration-150 ${
              isActive ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-500 active:bg-slate-800/60'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.4]' : ''}`} />
            <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
