export type TabId = 'learn' | 'quiz' | 'chat';

export interface LessonStep {
  id: string;
  title: string;
  description: string;
}

export type LessonIcon = 'choking' | 'bleeding';

export interface Lesson {
  id: string;
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
