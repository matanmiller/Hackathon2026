import { useEffect, useState } from 'react';
import type { AccentColor, ScenarioPage } from '../types';
import { ACCENT_STYLES } from './accentStyles';
import { ArrowIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from './icons';

interface LessonScenarioProps {
  pages: ScenarioPage[];
  accent: AccentColor;
  onBack: () => void;
}

const REVEAL_DELAY_MS = 4000;
const CHOICE_SECONDS = 6;

type Phase = 'image' | 'choice';

export default function LessonScenario({ pages, accent: accentColor, onBack }: LessonScenarioProps) {
  const accent = ACCENT_STYLES[accentColor];
  const totalPages = pages.length;

  const [pageIndex, setPageIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('image');
  const [secondsLeft, setSecondsLeft] = useState(CHOICE_SECONDS);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [result, setResult] = useState<'pass' | 'fail' | null>(null);

  const page = pages[pageIndex];

  // Reset per-page state whenever we move to a new page.
  useEffect(() => {
    setPhase('image');
    setSecondsLeft(CHOICE_SECONDS);
    setSelectedOptionId(null);
  }, [pageIndex]);

  // After the reveal delay, show the answer options.
  useEffect(() => {
    if (result || phase !== 'image') return;
    const timer = setTimeout(() => setPhase('choice'), REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [phase, result]);

  // Countdown while the options are visible and unanswered.
  useEffect(() => {
    if (result || phase !== 'choice' || selectedOptionId) return;
    if (secondsLeft <= 0) {
      setResult('fail');
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, secondsLeft, selectedOptionId, result]);

  // After an answer is picked, advance (or end the scenario).
  useEffect(() => {
    if (!selectedOptionId) return;
    const option = page.options.find((o) => o.id === selectedOptionId);
    const isCorrect = !!option?.correct;
    const timer = setTimeout(() => {
      if (!isCorrect) {
        setResult('fail');
      } else if (pageIndex === totalPages - 1) {
        setResult('pass');
      } else {
        setPageIndex((index) => index + 1);
      }
    }, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionId]);

  const handleSelect = (optionId: string) => {
    if (selectedOptionId || result) return;
    setSelectedOptionId(optionId);
  };

  const handleRestart = () => {
    setResult(null);
    setPhase('image');
    setSecondsLeft(CHOICE_SECONDS);
    setSelectedOptionId(null);
    setPageIndex(0);
  };

  if (result) {
    const isPass = result === 'pass';
    return (
      <div className="flex h-full flex-col gap-4 pb-2 animate-fade-in-up">
        <button
          type="button"
          onClick={onBack}
          className="flex w-fit items-center gap-1.5 text-xs font-bold text-emerald-600 active:opacity-70"
        >
          <ArrowIcon className="h-4 w-4" />
          חזרה לשיעור
        </button>

        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full ring-1 ${
              isPass ? 'bg-emerald-50 text-emerald-600 ring-emerald-200' : 'bg-red-50 text-red-600 ring-red-200'
            }`}
          >
            {isPass ? <CheckCircleIcon className="h-9 w-9" /> : <XCircleIcon className="h-9 w-9" />}
          </div>
          <h2 className="text-lg font-extrabold text-slate-900">{isPass ? 'עברתם בהצלחה!' : 'לא הפעם'}</h2>
          <p className="max-w-xs text-sm leading-relaxed text-slate-500">
            {isPass
              ? 'בחרתם נכון בכל שלב ובזמן - כך מצילים חיים בתרחיש דימום מאסיבי.'
              : 'אחת התגובות לא הייתה נכונה או לא נבחרה בזמן. כדאי לחזור על השיעור ולנסות שוב.'}
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className={`mt-1 rounded-xl px-5 py-2.5 text-sm font-extrabold text-white shadow-sm active:scale-[0.99] ${accent.button}`}
          >
            לנסות שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4 pb-2 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 active:bg-slate-100"
        >
          <ArrowIcon className="h-5 w-5" />
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-300 ease-out ${accent.progress}`}
            style={{ width: `${((pageIndex + 1) / totalPages) * 100}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-bold text-slate-400">
          {pageIndex + 1}/{totalPages}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
        <img src={page.image} alt="" className="h-48 w-full object-cover" />
      </div>

      {phase === 'image' ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-bold text-slate-700">מה הפעולה הבאה שיש לבצע?</p>
          <p className="text-xs text-slate-400">האפשרויות יופיעו עוד רגע...</p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400">
              <ClockIcon className="h-4 w-4" />
              <span>{secondsLeft} שניות לבחירה</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-red-500 transition-[width] duration-1000 ease-linear"
                style={{ width: `${(secondsLeft / CHOICE_SECONDS) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {page.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const showFeedback = !!selectedOptionId;

              let stateClasses = 'border-slate-200 bg-white text-slate-700 active:bg-slate-50';
              if (showFeedback) {
                if (isSelected && option.correct) {
                  stateClasses = 'border-emerald-500 bg-emerald-50 text-emerald-700';
                } else if (isSelected && !option.correct) {
                  stateClasses = 'border-red-500 bg-red-50 text-red-700';
                } else {
                  stateClasses = 'border-slate-200 bg-slate-50/60 text-slate-400';
                }
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={showFeedback}
                  onClick={() => handleSelect(option.id)}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-right text-sm font-medium shadow-sm shadow-slate-200/40 transition-colors duration-150 ${stateClasses}`}
                >
                  <span>{option.text}</span>
                  {isSelected && (
                    <span className="shrink-0">
                      {option.correct ? (
                        <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
