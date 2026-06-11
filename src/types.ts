export type TabId = 'learn' | 'quiz' | 'chat';

export type CategoryId = 'medical' | 'nature' | 'accidents' | 'war';

export type AccentColor = 'red' | 'sky' | 'amber' | 'violet';

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
  accent: AccentColor;
}

export interface LessonStep {
  id: string;
  title: string;
  description: string;
}

export type LessonIcon = 'choking' | 'bleeding';

export interface Lesson {
  id: string;
  category: CategoryId;
  title: string;
  subtitle: string;
  icon: LessonIcon;
  steps: LessonStep[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanationCorrect: string;
  explanationIncorrect: string;
}

export type ChatRole = 'user' | 'agent';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}
