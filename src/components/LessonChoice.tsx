import type { AccentColor, Lesson } from '../types';
import { ACCENT_STYLES } from './accentStyles';
import { ArrowIcon, BookIcon, ClipboardCheckIcon } from './icons';
import { LESSON_ICONS } from './lessonIcons';

interface LessonChoiceProps {
  lesson: Lesson;
  accent: AccentColor;
  completedCount: number;
  hasQuiz: boolean;
  onSelectLesson: () => void;
  onSelectQuiz: () => void;
  onBack: () => void;
}

export default function LessonChoice({
  lesson,
  accent: accentColor,
  completedCount,
  hasQuiz,
  onSelectLesson,
  onSelectQuiz,
  onBack,
}: LessonChoiceProps) {
  const Icon = LESSON_ICONS[lesson.icon];
  const accent = ACCENT_STYLES[accentColor];
  const totalSteps = lesson.steps.length;
  const isComplete = completedCount === totalSteps;

  return (
    <div className="flex h-full flex-col gap-4 pb-2 animate-fade-in-up">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 text-xs font-bold text-emerald-600 active:opacity-70"
      >
        <ArrowIcon className="h-4 w-4" />
        חזרה לשיעורים
      </button>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${accent.tile} ${accent.ring}`}>
          <Icon className={`h-6 w-6 ${accent.icon}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-extrabold text-slate-900">{lesson.title}</h2>
          <p className="truncate text-xs text-slate-500">{lesson.subtitle}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${isComplete ? accent.badge : 'bg-slate-100 text-slate-400'}`}
        >
          {completedCount}/{totalSteps}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <button
          type="button"
          onClick={onSelectLesson}
          className="flex flex-1 flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm shadow-slate-200/60 active:scale-[0.99]"
        >
          <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ring-1 ${accent.tile} ${accent.ring}`}>
            <BookIcon className={`h-8 w-8 ${accent.icon}`} />
          </span>
          <span className="text-lg font-extrabold text-slate-900">למידת השיעור</span>
          <span className="max-w-[220px] text-sm leading-relaxed text-slate-500">
            עברו על השיעור שלב אחר שלב, עם הסברים ותמונות
          </span>
        </button>

        {hasQuiz && (
          <button
            type="button"
            onClick={onSelectQuiz}
            className="flex flex-1 flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm shadow-slate-200/60 active:scale-[0.99]"
          >
            <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ring-1 ${accent.tile} ${accent.ring}`}>
              <ClipboardCheckIcon className={`h-8 w-8 ${accent.icon}`} />
            </span>
            <span className="text-lg font-extrabold text-slate-900">בוחן ידע</span>
            <span className="max-w-[220px] text-sm leading-relaxed text-slate-500">בדקו את עצמכם על תוכן השיעור</span>
          </button>
        )}
      </div>
    </div>
  );
}
