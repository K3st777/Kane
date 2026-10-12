export type AccentColor = 'emerald' | 'violet' | 'cyan' | 'amber' | 'rose' | 'monochrome';
export type BlurIntensity = 'none' | 'low' | 'medium' | 'high';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  audioUrl: string;
  coverUrl: string;
  source: 'local' | 'stream' | 'youtube' | 'jamendo' | 'fma' | 'imported';
  youtubeId?: string;
  lyrics?: string; // synced LRC text or plain text
  dateAdded?: number;
  quality?: '128k' | '256k' | '320k' | 'lossless' | 'yt-stream';
}

export interface LyricLine {
  timeMs: number;
  text: string;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  coverUrl?: string;
  tracks: Track[];
  createdAt: number;
  updatedAt: number;
  isFavoriteList?: boolean;
}

export interface EqualizerBand {
  frequency: number; // in Hz: 60, 250, 1000, 4000, 12000
  gain: number; // in dB: -12 to +12
  label: string;
}

export interface EqualizerPreset {
  id: string;
  name: string;
  gains: [number, number, number, number, number]; // 60, 250, 1k, 4k, 12k
}

export type RepeatMode = 'OFF' | 'ALL' | 'ONE';

export interface PlayerSettings {
  volume: number; // 0 to 1
  speed: number; // 0.5 to 2.0
  preservePitch: boolean;
  normalizeAudio: boolean;
  audioQuality: 'auto' | 'high' | 'lossless';
  theme: 'dark' | 'obsidian' | 'light';
  accentColor: AccentColor;
  blurIntensity: BlurIntensity;
  ambientGlow: boolean;
  enableVisualizer: boolean;
  autoPlayNext: boolean;
}
