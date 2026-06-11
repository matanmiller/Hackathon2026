import type { AccentColor } from '../types';

interface AccentStyle {
  /** Soft tinted background for the icon "image" tile */
  tile: string;
  /** Icon color on top of the tile */
  icon: string;
  /** Ring color around the tile */
  ring: string;
  /** Soft badge background + text, used when active/complete */
  badge: string;
  /** Progress bar fill */
  progress: string;
  /** Border + soft background for a "done" step row */
  border: string;
  bgSoft: string;
  /** Solid border + background for a checked checkbox */
  solid: string;
  /** Solid colored CTA button background + active state */
  button: string;
}

export const ACCENT_STYLES: Record<AccentColor, AccentStyle> = {
  red: {
    tile: 'bg-gradient-to-br from-red-500/15 via-red-500/5 to-transparent',
    icon: 'text-red-500',
    ring: 'ring-red-500/20',
    badge: 'bg-red-50 text-red-600',
    progress: 'bg-red-500',
    border: 'border-red-300',
    bgSoft: 'bg-red-50',
    solid: 'border-red-500 bg-red-500',
    button: 'bg-red-500 active:bg-red-600',
  },
  sky: {
    tile: 'bg-gradient-to-br from-sky-500/15 via-sky-500/5 to-transparent',
    icon: 'text-sky-500',
    ring: 'ring-sky-500/20',
    badge: 'bg-sky-50 text-sky-600',
    progress: 'bg-sky-500',
    border: 'border-sky-300',
    bgSoft: 'bg-sky-50',
    solid: 'border-sky-500 bg-sky-500',
    button: 'bg-sky-500 active:bg-sky-600',
  },
  amber: {
    tile: 'bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent',
    icon: 'text-amber-500',
    ring: 'ring-amber-500/20',
    badge: 'bg-amber-50 text-amber-600',
    progress: 'bg-amber-500',
    border: 'border-amber-300',
    bgSoft: 'bg-amber-50',
    solid: 'border-amber-500 bg-amber-500',
    button: 'bg-amber-500 active:bg-amber-600',
  },
  violet: {
    tile: 'bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-transparent',
    icon: 'text-violet-500',
    ring: 'ring-violet-500/20',
    badge: 'bg-violet-50 text-violet-600',
    progress: 'bg-violet-500',
    border: 'border-violet-300',
    bgSoft: 'bg-violet-50',
    solid: 'border-violet-500 bg-violet-500',
    button: 'bg-violet-500 active:bg-violet-600',
  },
};
