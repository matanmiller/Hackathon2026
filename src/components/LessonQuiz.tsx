import { useState } from 'react';
import type { QuizQuestion } from '../types';
import QuizQuestionCard from './QuizQuestionCard';
import { ArrowIcon, CheckCircleIcon } from './icons';

interface LessonQuizProps {
  questions: QuizQuestion[];
  onBack: () => void;
}

export default function LessonQuiz({ questions, onBack }: LessonQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === totalQuestions;
  const score = questions.filter((question) => answers[question.id] === question.correctOptionId).length;

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => (prev[questionId] ? prev : { ...prev, [questionId]: optionId }));
  };

  const handleRestart = () => setAnswers({});

  return (
    <div className="flex flex-col gap-4 pb-2 animate-fade-in-up">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 text-xs font-bold text-emerald-600 active:opacity-70"
      >
        <ArrowIcon className="h-4 w-4" />
        חזרה לשיעור
      </button>

      {questions.map((question, index) => (
        <QuizQuestionCard
          key={question.id}
          question={question}
          index={index + 1}
          selectedOptionId={answers[question.id]}
          onSelect={(optionId) => handleSelect(question.id, optionId)}
        />
      ))}

      {isComplete && (
        <div className="animate-fade-in-up rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200">
            <CheckCircleIcon className="h-7 w-7" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">סיימתם את הבוחן!</h3>
          <p className="mt-1 text-sm font-bold text-emerald-600">
            הציון שלכם: {score} מתוך {totalQuestions}
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className="mt-3 rounded-xl bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200 active:bg-emerald-200"
          >
            נסו שוב
          </button>
        </div>
      )}
    </div>
  );
}
