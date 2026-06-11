import { useState } from 'react';
import type { Lesson } from '../types';
import { AirwayIcon, CheckIcon, ChevronDownIcon, DropletIcon } from './icons';
import type { IconType } from './icons.types';

const LESSON_ICONS: Record<Lesson['icon'], IconType> = {
  choking: AirwayIcon,
  bleeding: DropletIcon,
};

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const Icon = LESSON_ICONS[lesson.icon];
  const completedCount = lesson.steps.filter((step) => completedSteps[step.id]).length;
  const totalSteps = lesson.steps.length;
  const progressPercent = (completedCount / totalSteps) * 100;
  const isComplete = completedCount === totalSteps;

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm shadow-black/10">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 px-4 py-4 text-right active:bg-slate-800/40"
      >
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${
            isComplete
              ? 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/30'
              : 'bg-slate-800 text-slate-300 ring-slate-700'
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-slate-100">{lesson.title}</h3>
          <p className="truncate text-xs text-slate-400">{lesson.subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
              isComplete ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {completedCount}/{totalSteps}
          </span>
          <ChevronDownIcon
            className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <div className="h-1 w-full bg-slate-800">
        <div
          className="h-full bg-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {isOpen && (
        <div className="space-y-2 border-t border-slate-800/80 px-3 py-3">
          {lesson.steps.map((step) => {
            const isDone = !!completedSteps[step.id];
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => toggleStep(step.id)}
                className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-right transition-colors ${
                  isDone ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 bg-slate-950/40'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isDone ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'
                  }`}
                >
                  {isDone && <CheckIcon className="h-3 w-3 text-slate-950" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-semibold ${isDone ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {step.title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-400">{step.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
