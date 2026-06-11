import type { LessonIcon } from '../types';
import { AirwayIcon, DropletIcon } from './icons';
import type { IconType } from './icons.types';

export const LESSON_ICONS: Record<LessonIcon, IconType> = {
  choking: AirwayIcon,
  bleeding: DropletIcon,
};
