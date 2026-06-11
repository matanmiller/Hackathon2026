import type { AccentColor, Lesson } from '../types';
import { ACCENT_STYLES } from './accentStyles';
import { LESSON_ICONS } from './lessonIcons';

interface LessonSquareCardProps {
  lesson: Lesson;
  accent: AccentColor;
  completedCount: number;
  onSelect: () => void;
}

export default function LessonSquareCard({ lesson, accent: accentColor, completedCount, onSelect }: LessonSquareCardProps) {
  const Icon = LESSON_ICONS[lesson.icon];
  const accent = ACCENT_STYLES[accentColor];
  const totalSteps = lesson.steps.length;
  const isComplete = completedCount === totalSteps;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex aspect-square flex-col items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm shadow-slate-200/60 transition-transform active:scale-[0.97]"
    >
      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${accent.tile} ${accent.ring}`}>
        <Icon className={`h-7 w-7 ${accent.icon}`} />
      </span>
      <span className="text-sm font-bold leading-tight text-slate-900">{lesson.title}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${isComplete ? accent.badge : 'bg-slate-100 text-slate-400'}`}
      >
        {completedCount}/{totalSteps}
      </span>
    </button>
  );
}
