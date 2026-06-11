import { useState } from 'react';
import type { AccentColor, LessonPage } from '../types';
import { ACCENT_STYLES } from './accentStyles';
import { ArrowIcon, CheckIcon } from './icons';

interface LessonPagerProps {
  pages: LessonPage[];
  accent: AccentColor;
  onBack: () => void;
  onComplete: () => void;
}

export default function LessonPager({ pages, accent: accentColor, onBack, onComplete }: LessonPagerProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const accent = ACCENT_STYLES[accentColor];
  const totalPages = pages.length;
  const page = pages[pageIndex];
  const isLastPage = pageIndex === totalPages - 1;
  const progressPercent = ((pageIndex + 1) / totalPages) * 100;

  const handleNext = () => {
    if (isLastPage) {
      onComplete();
    } else {
      setPageIndex((index) => index + 1);
    }
  };

  const handleBack = () => {
    if (pageIndex === 0) {
      onBack();
    } else {
      setPageIndex((index) => index - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-2 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 active:bg-slate-100"
        >
          <ArrowIcon className="h-5 w-5" />
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-300 ease-out ${accent.progress}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-bold text-slate-400">
          {pageIndex + 1}/{totalPages}
        </span>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900">{page.header}</h2>

        {page.items.map((item, index) => (
          <div
            key={index}
            className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60"
          >
            {item.image && <img src={item.image} alt="" className="mx-auto h-40 w-full object-contain" />}
            <p className="text-sm leading-relaxed text-slate-700">
              {item.label && <span className={`font-extrabold ${accent.icon}`}>{item.label}: </span>}
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold text-white shadow-sm active:scale-[0.99] ${accent.button}`}
      >
        {isLastPage ? (
          <>
            <CheckIcon className="h-5 w-5" strokeWidth={3} />
            סיום השיעור
          </>
        ) : (
          <>
            הבא
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </>
        )}
      </button>
    </div>
  );
}
