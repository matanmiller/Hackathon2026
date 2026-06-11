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

export interface LessonPageItem {
  /** Optional bold inline label, e.g. "חסימה חלקית" */
  label?: string;
  text: string;
  image?: string;
}

export interface LessonPage {
  header: string;
  items: LessonPageItem[];
}

export interface ScenarioOption {
  id: string;
  text: string;
  correct?: boolean;
}

export interface ScenarioPage {
  /** Image showing the current state of the emergency */
  image: string;
  /** Three possible actions, exactly one of which is correct */
  options: ScenarioOption[];
}

export interface Lesson {
  id: string;
  category: CategoryId;
  title: string;
  subtitle: string;
  icon: LessonIcon;
  steps: LessonStep[];
  /** Optional Duolingo-style paginated walkthrough */
  pages?: LessonPage[];
  /** Optional timed, image-driven emergency scenario quiz */
  scenario?: ScenarioPage[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  /** Lesson this question belongs to, used for the per-lesson quiz */
  lessonId: string;
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
