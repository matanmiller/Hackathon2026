import { useState } from 'react';
import { CATEGORIES, LESSONS, QUIZ_QUESTIONS } from '../data/content';
import CategoryCard from './CategoryCard';
import LessonChoice from './LessonChoice';
import LessonDetail from './LessonDetail';
import LessonPager from './LessonPager';
import LessonQuiz from './LessonQuiz';
import LessonScenario from './LessonScenario';
import LessonSquareCard from './LessonSquareCard';
import RotatingQuote from './RotatingQuote';
import { ArrowIcon, ClockIcon, SirenIcon } from './icons';
import type { CategoryId } from '../types';

type LessonView = 'choice' | 'lesson' | 'quiz';

interface LearnTabProps {
  onLaunchAgent: () => void;
}

export default function LearnTab({ onLaunchAgent }: LearnTabProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [lessonView, setLessonView] = useState<LessonView>('choice');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const selectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setLessonView('choice');
  };

  const selectedLesson = LESSONS.find((lesson) => lesson.id === selectedLessonId);
  if (selectedLesson) {
    const lessonCategory = CATEGORIES.find((category) => category.id === selectedLesson.category);
    const accent = lessonCategory?.accent ?? 'red';
    const lessonQuizQuestions = QUIZ_QUESTIONS.filter((question) => question.lessonId === selectedLesson.id);
    const completedCount = selectedLesson.steps.filter((step) => completedSteps[step.id]).length;

    if (lessonView === 'quiz') {
      if (selectedLesson.scenario) {
        return <LessonScenario pages={selectedLesson.scenario} accent={accent} onBack={() => setLessonView('choice')} />;
      }
      return <LessonQuiz questions={lessonQuizQuestions} onBack={() => setLessonView('choice')} />;
    }

    if (lessonView === 'lesson') {
      if (selectedLesson.pages) {
        return (
          <LessonPager
            pages={selectedLesson.pages}
            accent={accent}
            onBack={() => setLessonView('choice')}
            onComplete={() => {
              setCompletedSteps((prev) => {
                const next = { ...prev };
                for (const step of selectedLesson.steps) {
                  next[step.id] = true;
                }
                return next;
              });
              setLessonView('choice');
            }}
          />
        );
      }

      return (
        <LessonDetail
          lesson={selectedLesson}
          accent={accent}
          completedSteps={completedSteps}
          onToggleStep={toggleStep}
          onBack={() => setLessonView('choice')}
        />
      );
    }

    return (
      <LessonChoice
        lesson={selectedLesson}
        accent={accent}
        completedCount={completedCount}
        hasQuiz={lessonQuizQuestions.length > 0 || !!selectedLesson.scenario}
        onSelectLesson={() => setLessonView('lesson')}
        onSelectQuiz={() => setLessonView('quiz')}
        onBack={() => setSelectedLessonId(null)}
      />
    );
  }

  const selectedCategory = CATEGORIES.find((category) => category.id === selectedCategoryId);
  if (selectedCategory) {
    const categoryLessons = LESSONS.filter((lesson) => lesson.category === selectedCategory.id);

    return (
      <div className="flex flex-col gap-4 pb-2 animate-fade-in-up">
        <button
          type="button"
          onClick={() => setSelectedCategoryId(null)}
          className="flex w-fit items-center gap-1.5 text-xs font-bold text-emerald-600 active:opacity-70"
        >
          <ArrowIcon className="h-4 w-4" />
          חזרה לקטגוריות
        </button>

        <div className="space-y-1">
          <h2 className="text-base font-extrabold text-slate-900">{selectedCategory.title}</h2>
          <p className="text-xs leading-relaxed text-slate-500">{selectedCategory.description}</p>
        </div>

        {categoryLessons.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {categoryLessons.map((lesson) => {
              const completedCount = lesson.steps.filter((step) => completedSteps[step.id]).length;
              return (
                <LessonSquareCard
                  key={lesson.id}
                  lesson={lesson}
                  accent={selectedCategory.accent}
                  completedCount={completedCount}
                  onSelect={() => selectLesson(lesson.id)}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 ring-1 ring-slate-200">
              <ClockIcon className="h-6 w-6" />
            </span>
            <p className="text-sm font-bold text-slate-700">השיעורים בקטגוריה זו יתווספו בקרוב</p>
            <p className="text-xs leading-relaxed text-slate-500">בינתיים תוכלו להתנסות בשיעורי החירום הרפואי</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-2 animate-fade-in-up">
      <button
        type="button"
        onClick={onLaunchAgent}
        className="relative flex w-full animate-pulse-strong items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-l from-red-600 via-red-500 to-red-600 px-4 py-4 text-right ring-1 ring-red-400/40 active:scale-[0.99]"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
          <SirenIcon className="h-7 w-7 text-white" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-extrabold leading-tight text-white">הפעל סוכן חירום AI</span>
          <span className="mt-0.5 block text-xs font-medium text-red-100">
            לחצו כאן לקבלת הנחיות מיידיות בזמן אמת
          </span>
        </span>
        <ArrowIcon className="h-6 w-6 shrink-0 rotate-180 text-white/80" />
      </button>

      <div className="space-y-1">
        <h2 className="text-center text-xl font-extrabold text-slate-900">שיעורים</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            lessonCount={LESSONS.filter((lesson) => lesson.category === category.id).length}
            onSelect={() => setSelectedCategoryId(category.id)}
          />
        ))}
      </div>

      <p className="text-center text-[11px] leading-relaxed text-slate-400">
        התוכן מיועד להדרכה ואימון בלבד ואינו מהווה תחליף לטיפול רפואי מקצועי. במקרה חירום אמיתי חייגו 101.
      </p>

      <RotatingQuote />
    </div>
  );
}
