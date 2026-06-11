import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/content';
import QuizQuestionCard from './QuizQuestionCard';
import { CheckCircleIcon, ClipboardCheckIcon } from './icons';

export default function QuizTab() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === totalQuestions;
  const score = QUIZ_QUESTIONS.filter((question) => answers[question.id] === question.correctOptionId).length;

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => (prev[questionId] ? prev : { ...prev, [questionId]: optionId }));
  };

  const handleRestart = () => setAnswers({});

  return (
    <div className="flex flex-col gap-4 pb-2 animate-fade-in-up">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
            <ClipboardCheckIcon className="h-5 w-5" />
          </div>
          <h2 className="text-base font-extrabold text-slate-100">בוחן מהיר</h2>
        </div>
        <p className="text-xs leading-relaxed text-slate-400">
          בדקו את הידע שלכם בנושאי החנק והדימום שנלמדו בלשונית "למידה". בחרו תשובה לכל שאלה כדי לקבל משוב מיידי.
        </p>
      </div>

      {QUIZ_QUESTIONS.map((question, index) => (
        <QuizQuestionCard
          key={question.id}
          question={question}
          index={index + 1}
          selectedOptionId={answers[question.id]}
          onSelect={(optionId) => handleSelect(question.id, optionId)}
        />
      ))}

      {isComplete && (
        <div className="animate-fade-in-up rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
            <CheckCircleIcon className="h-7 w-7" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-100">סיימתם את הבוחן!</h3>
          <p className="mt-1 text-sm font-bold text-emerald-400">
            הציון שלכם: {score} מתוך {totalQuestions}
          </p>
          <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-slate-400">
            {score === totalQuestions
              ? 'כל הכבוד! שליטה מצוינת בעקרונות הבסיסיים של מתן עזרה ראשונה.'
              : 'כדאי לחזור על השיעורים הרלוונטיים בלשונית "למידה" כדי לחזק את הנושאים שטעיתם בהם.'}
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className="mt-3 rounded-xl bg-emerald-500/15 px-4 py-2 text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/30 active:bg-emerald-500/25"
          >
            נסו שוב
          </button>
        </div>
      )}
    </div>
  );
}
