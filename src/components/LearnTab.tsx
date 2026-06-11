import { LESSONS } from '../data/content';
import LessonCard from './LessonCard';
import { ArrowIcon, SirenIcon } from './icons';

interface LearnTabProps {
  onLaunchAgent: () => void;
}

export default function LearnTab({ onLaunchAgent }: LearnTabProps) {
  return (
    <div className="flex flex-col gap-5 pb-2 animate-fade-in-up">
      <button
        type="button"
        onClick={onLaunchAgent}
        className="relative flex w-full animate-pulse-strong items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-l from-red-600 via-red-500 to-red-600 px-4 py-4 text-right ring-1 ring-red-400/40 active:scale-[0.99]"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
          <SirenIcon className="h-7 w-7 text-white" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-extrabold leading-tight text-white">הפעל סוכן חירום AI</span>
          <span className="mt-0.5 block text-xs font-medium text-red-100">
            לחצו כאן לקבלת הנחיות מיידיות בזמן אמת
          </span>
        </span>
        <ArrowIcon className="h-6 w-6 shrink-0 rotate-180 text-white/80" />
      </button>

      <div className="space-y-1">
        <h2 className="text-sm font-bold text-slate-200">שיעורים אינטראקטיביים</h2>
        <p className="text-xs leading-relaxed text-slate-400">
          לחצו על כל שיעור כדי לפתוח את שלבי הטיפול, לעקוב אחריהם ולסמן את ההתקדמות שלכם.
        </p>
      </div>

      <div className="space-y-3">
        {LESSONS.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      <p className="pb-2 text-center text-[11px] leading-relaxed text-slate-600">
        התוכן מיועד להדרכה ואימון בלבד ואינו מהווה תחליף לטיפול רפואי מקצועי. במקרה חירום אמיתי חייגו 101.
      </p>
    </div>
  );
}
