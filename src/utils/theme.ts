import { AccentColor, BlurIntensity } from '../types';

export const THEME_ACCENTS: Record<
  AccentColor,
  {
    name: string;
    primaryHex: string;
    text: string;
    bg: string;
    border: string;
    gradient: string;
    glow: string;
  }
> = {
  emerald: {
    name: 'Esmeralda',
    primaryHex: '#10b981',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500',
    border: 'border-emerald-500/40',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.35)',
  },
  violet: {
    name: 'Violeta Neon',
    primaryHex: '#a855f7',
    text: 'text-purple-400',
    bg: 'bg-purple-500',
    border: 'border-purple-500/40',
    gradient: 'from-purple-500 to-indigo-500',
    glow: 'rgba(168, 85, 247, 0.35)',
  },
  cyan: {
    name: 'Ciano Elétrico',
    primaryHex: '#06b6d4',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500',
    border: 'border-cyan-500/40',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'rgba(6, 182, 212, 0.35)',
  },
  amber: {
    name: 'Pôr do Sol Âmbar',
    primaryHex: '#f59e0b',
    text: 'text-amber-400',
    bg: 'bg-amber-500',
    border: 'border-amber-500/40',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.35)',
  },
  rose: {
    name: 'Rosa Magenta',
    primaryHex: '#f43f5e',
    text: 'text-rose-400',
    bg: 'bg-rose-500',
    border: 'border-rose-500/40',
    gradient: 'from-rose-500 to-pink-500',
    glow: 'rgba(244, 63, 94, 0.35)',
  },
  monochrome: {
    name: 'Minimalista Pure',
    primaryHex: '#ffffff',
    text: 'text-white',
    bg: 'bg-white text-black',
    border: 'border-white/40',
    gradient: 'from-zinc-100 to-zinc-400',
    glow: 'rgba(255, 255, 255, 0.25)',
  },
};

export const BLUR_LEVELS: Record<BlurIntensity, string> = {
  high: 'backdrop-blur-3xl bg-black/60',
  medium: 'backdrop-blur-xl bg-black/75',
  low: 'backdrop-blur-md bg-black/85',
  none: 'bg-zinc-950',
};
