import type { CategoryId } from '../types';
import { CarIcon, MedicalKitIcon, ShieldIcon, StormIcon } from './icons';
import type { IconType } from './icons.types';

export const CATEGORY_ICONS: Record<CategoryId, IconType> = {
  medical: MedicalKitIcon,
  nature: StormIcon,
  accidents: CarIcon,
  war: ShieldIcon,
};
