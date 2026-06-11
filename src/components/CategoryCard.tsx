import type { Category } from '../types';
import { ACCENT_STYLES } from './accentStyles';
import { CATEGORY_ICONS } from './categoryIcons';

interface CategoryCardProps {
  category: Category;
  lessonCount: number;
  onSelect: () => void;
}

export default function CategoryCard({ category, lessonCount, onSelect }: CategoryCardProps) {
  const Icon = CATEGORY_ICONS[category.id];
  const accent = ACCENT_STYLES[category.accent];

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex aspect-square flex-col items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm shadow-slate-200/60 transition-transform active:scale-[0.97]"
    >
      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${accent.tile} ${accent.ring}`}>
        <Icon className={`h-7 w-7 ${accent.icon}`} />
      </span>
      <span className="text-sm font-bold leading-tight text-slate-900">{category.title}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
          lessonCount > 0 ? accent.badge : 'bg-slate-100 text-slate-400'
        }`}
      >
        {lessonCount > 0 ? `${lessonCount} שיעורים` : 'בקרוב'}
      </span>
    </button>
  );
}
