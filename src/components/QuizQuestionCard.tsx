import type { QuizQuestion } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface QuizQuestionCardProps {
  question: QuizQuestion;
  index: number;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
}

export default function QuizQuestionCard({ question, index, selectedOptionId, onSelect }: QuizQuestionCardProps) {
  const isAnswered = !!selectedOptionId;
  const isCorrect = selectedOptionId === question.correctOptionId;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-black/10">
      <div className="mb-3 flex items-start gap-2.5">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-extrabold text-emerald-400 ring-1 ring-emerald-500/30">
          {index}
        </span>
        <h3 className="text-sm font-bold leading-relaxed text-slate-100">{question.question}</h3>
      </div>

      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrectOption = option.id === question.correctOptionId;

          let stateClasses = 'border-slate-800 bg-slate-950/40 text-slate-200 active:bg-slate-800/60';
          if (isAnswered) {
            if (isSelected && isCorrectOption) {
              stateClasses = 'border-emerald-500 bg-emerald-500/10 text-emerald-300';
            } else if (isSelected && !isCorrectOption) {
              stateClasses = 'border-red-500 bg-red-500/10 text-red-300';
            } else if (isCorrectOption) {
              stateClasses = 'border-emerald-500/40 bg-emerald-500/5 text-emerald-400';
            } else {
              stateClasses = 'border-slate-800 bg-slate-950/20 text-slate-500';
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isAnswered}
              onClick={() => onSelect(option.id)}
              className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-right text-sm font-medium transition-colors duration-150 ${stateClasses}`}
            >
              <span>{option.text}</span>
              {isAnswered && isSelected && (
                <span className="shrink-0">
                  {isCorrectOption ? (
                    <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-400" />
                  )}
                </span>
              )}
              {isAnswered && !isSelected && isCorrectOption && (
                <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-500/60" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`mt-3 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-xs leading-relaxed animate-fade-in-up ${
            isCorrect ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300' : 'border-red-500/30 bg-red-500/5 text-red-300'
          }`}
        >
          {isCorrect ? (
            <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <XCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <p>{isCorrect ? question.explanationCorrect : question.explanationIncorrect}</p>
        </div>
      )}
    </div>
  );
}
