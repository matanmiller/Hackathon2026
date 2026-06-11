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
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60">
      <div className="mb-3 flex items-start gap-2.5">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-extrabold text-emerald-600 ring-1 ring-emerald-200">
          {index}
        </span>
        <h3 className="text-sm font-bold leading-relaxed text-slate-900">{question.question}</h3>
      </div>

      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrectOption = option.id === question.correctOptionId;

          let stateClasses = 'border-slate-200 bg-slate-50 text-slate-700 active:bg-slate-100';
          if (isAnswered) {
            if (isSelected && isCorrectOption) {
              stateClasses = 'border-emerald-500 bg-emerald-50 text-emerald-700';
            } else if (isSelected && !isCorrectOption) {
              stateClasses = 'border-red-500 bg-red-50 text-red-700';
            } else if (isCorrectOption) {
              stateClasses = 'border-emerald-300 bg-emerald-50/60 text-emerald-600';
            } else {
              stateClasses = 'border-slate-200 bg-slate-50/60 text-slate-400';
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
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                </span>
              )}
              {isAnswered && !isSelected && isCorrectOption && (
                <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-400" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`mt-3 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-xs leading-relaxed animate-fade-in-up ${
            isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'
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
