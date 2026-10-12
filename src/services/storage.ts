import { Playlist, Track, EqualizerPreset, PlayerSettings } from '../types';

const STORAGE_KEYS = {
  PLAYLISTS: 'kane_playlists',
  FAVORITES: 'kane_favorites',
  HISTORY: 'kane_history',
  SETTINGS: 'kane_settings',
  EQ_PRESET: 'kane_eq_preset',
  EQ_CUSTOM: 'kane_eq_custom',
};

export const DEFAULT_PRESETS: EqualizerPreset[] = [
  { id: 'flat', name: 'Plano (Flat)', gains: [0, 0, 0, 0, 0] },
  { id: 'bass_boost', name: 'Bass Boost 🔊', gains: [7, 4, 0, -1, -2] },
  { id: 'vocal', name: 'Realce Vocal 🎤', gains: [-2, 1, 6, 3, -1] },
  { id: 'electronic', name: 'Eletrônica / Dance ⚡', gains: [5, 3, -2, 2, 4] },
  { id: 'rock', name: 'Rock / Metal 🎸', gains: [4, 2, -1, 3, 5] },
  { id: 'acoustic', name: 'Acústico 🎻', gains: [3, 2, 1, 2, 3] },
];

export const DEFAULT_SETTINGS: PlayerSettings = {
  volume: 0.8,
  speed: 1.0,
  preservePitch: true,
  normalizeAudio: false,
  audioQuality: 'high',
  theme: 'dark',
};

export class StorageService {
  public static getPlaylists(): Playlist[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLAYLISTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static savePlaylists(playlists: Playlist[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists));
    } catch (e) {
      console.error('Falha ao salvar playlists', e);
    }
  }

  public static getFavorites(): Track[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveFavorites(favorites: Track[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error('Falha ao salvar favoritos', e);
    }
  }

  public static getHistory(): Track[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static addToHistory(track: Track) {
    try {
      const history = this.getHistory().filter(t => t.id !== track.id);
      history.unshift(track);
      // Keep last 50 tracks
      const bounded = history.slice(0, 50);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(bounded));
    } catch (e) {
      console.error('Falha ao atualizar histórico', e);
    }
  }

  public static clearHistory() {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  }

  public static getSettings(): PlayerSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public static saveSettings(settings: PlayerSettings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Falha ao salvar configurações', e);
    }
  }

  public static getActivePreset(): string {
    return localStorage.getItem(STORAGE_KEYS.EQ_PRESET) || 'flat';
  }

  public static saveActivePreset(presetId: string) {
    localStorage.setItem(STORAGE_KEYS.EQ_PRESET, presetId);
  }

  public static getCustomEqBands(): [number, number, number, number, number] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EQ_CUSTOM);
      return data ? JSON.parse(data) : [0, 0, 0, 0, 0];
    } catch {
      return [0, 0, 0, 0, 0];
    }
  }

  public static saveCustomEqBands(gains: [number, number, number, number, number]) {
    localStorage.setItem(STORAGE_KEYS.EQ_CUSTOM, JSON.stringify(gains));
  }
}
