import type { AccentColor, Lesson } from '../types';
import { ACCENT_STYLES } from './accentStyles';
import { ArrowIcon, CheckIcon } from './icons';
import { LESSON_ICONS } from './lessonIcons';

interface LessonDetailProps {
  lesson: Lesson;
  accent: AccentColor;
  completedSteps: Record<string, boolean>;
  onToggleStep: (stepId: string) => void;
  onBack: () => void;
}

export default function LessonDetail({ lesson, accent: accentColor, completedSteps, onToggleStep, onBack }: LessonDetailProps) {
  const Icon = LESSON_ICONS[lesson.icon];
  const accent = ACCENT_STYLES[accentColor];
  const totalSteps = lesson.steps.length;
  const completedCount = lesson.steps.filter((step) => completedSteps[step.id]).length;
  const progressPercent = (completedCount / totalSteps) * 100;
  const isComplete = completedCount === totalSteps;

  return (
    <div className="flex flex-col gap-4 pb-2 animate-fade-in-up">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 text-xs font-bold text-emerald-400 active:opacity-70"
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

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full transition-all duration-300 ease-out ${accent.progress}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-2">
        {lesson.steps.map((step) => {
          const isDone = !!completedSteps[step.id];
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onToggleStep(step.id)}
              className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-right transition-colors ${
                isDone ? `${accent.border} ${accent.bgSoft}` : 'border-slate-200 bg-white'
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isDone ? accent.solid : 'border-slate-300'
                }`}
              >
                {isDone && <CheckIcon className="h-3 w-3 text-white" strokeWidth={3} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-sm font-semibold ${isDone ? accent.icon : 'text-slate-700'}`}>
                  {step.title}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500">{step.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
