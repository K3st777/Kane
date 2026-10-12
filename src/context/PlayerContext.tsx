import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Track, RepeatMode, EqualizerPreset } from '../types';
import { globalAudioEngine } from '../engine/audioEngine';
import { StorageService, DEFAULT_PRESETS } from '../services/storage';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  speed: number;
  preservePitch: boolean;
  repeatMode: RepeatMode;
  isShuffle: boolean;
  queue: Track[];
  queueIndex: number;
  presets: EqualizerPreset[];
  activePreset: string;
  customBands: [number, number, number, number, number];
  errorMessage: string | null;

  playTrack: (track: Track, newQueue?: Track[]) => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  setVolume: (vol: number) => void;
  setSpeed: (speed: number) => void;
  togglePreservePitch: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  reorderQueue: (fromIndex: number, toIndex: number) => void;
  clearQueue: () => void;
  setEqualizerBand: (bandIndex: number, gainDb: number) => void;
  applyEqualizerPreset: (presetId: string) => void;
  clearError: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialSettings = StorageService.getSettings();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(initialSettings.volume);
  const [speed, setSpeedState] = useState<number>(initialSettings.speed);
  const [preservePitch, setPreservePitchState] = useState<boolean>(initialSettings.preservePitch);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('OFF');
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState<number>(-1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [activePreset, setActivePreset] = useState<string>(StorageService.getActivePreset());
  const [customBands, setCustomBands] = useState<[number, number, number, number, number]>(
    StorageService.getCustomEqBands()
  );

  const presets = DEFAULT_PRESETS;

  // Setup audio engine callbacks
  useEffect(() => {
    globalAudioEngine.onTimeUpdate((time, dur) => {
      setProgress(time);
      if (dur > 0) setDuration(dur);
    });

    globalAudioEngine.onStateChange((playing) => {
      setIsPlaying(playing);
    });

    globalAudioEngine.onError((err) => {
      setErrorMessage(err);
      setIsPlaying(false);
    });

    // Apply saved EQ
    const savedPreset = presets.find(p => p.id === activePreset);
    if (savedPreset) {
      globalAudioEngine.setAllEqualizerBands(savedPreset.gains);
    } else {
      globalAudioEngine.setAllEqualizerBands(customBands);
    }

    globalAudioEngine.setVolume(volume);
    globalAudioEngine.setSpeed(speed, preservePitch);
  }, []);

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return;

    if (repeatMode === 'ONE') {
      globalAudioEngine.seek(0);
      globalAudioEngine.play();
      return;
    }

    let nextIdx = queueIndex + 1;
    if (nextIdx >= queue.length) {
      if (repeatMode === 'ALL') {
        nextIdx = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }

    setQueueIndex(nextIdx);
    const nextTrk = queue[nextIdx];
    setCurrentTrack(nextTrk);
    setProgress(0);
    StorageService.addToHistory(nextTrk);
    globalAudioEngine.load(nextTrk.audioUrl, true);
  }, [queue, queueIndex, repeatMode]);

  const prevTrack = useCallback(() => {
    if (queue.length === 0) return;

    // If more than 3 seconds in, restart track
    if (progress > 3) {
      globalAudioEngine.seek(0);
      return;
    }

    let prevIdx = queueIndex - 1;
    if (prevIdx < 0) {
      prevIdx = repeatMode === 'ALL' ? queue.length - 1 : 0;
    }

    setQueueIndex(prevIdx);
    const prevTrk = queue[prevIdx];
    setCurrentTrack(prevTrk);
    setProgress(0);
    StorageService.addToHistory(prevTrk);
    globalAudioEngine.load(prevTrk.audioUrl, true);
  }, [queue, queueIndex, progress, repeatMode]);

  // Hook onEnded
  useEffect(() => {
    globalAudioEngine.onEnded(() => {
      nextTrack();
    });
  }, [nextTrack]);

  const playTrack = useCallback((track: Track, newQueue?: Track[]) => {
    let targetQueue = newQueue ? [...newQueue] : queue;
    if (newQueue) {
      if (isShuffle) {
        // Keep current track first, shuffle rest
        const otherTracks = targetQueue.filter(t => t.id !== track.id);
        for (let i = otherTracks.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [otherTracks[i], otherTracks[j]] = [otherTracks[j], otherTracks[i]];
        }
        targetQueue = [track, ...otherTracks];
      }
      setQueue(targetQueue);
    } else if (!queue.some(t => t.id === track.id)) {
      targetQueue = [...queue, track];
      setQueue(targetQueue);
    }

    const idx = targetQueue.findIndex(t => t.id === track.id);
    setQueueIndex(idx !== -1 ? idx : 0);
    setCurrentTrack(track);
    setProgress(0);
    setDuration(track.duration || 0);
    setErrorMessage(null);

    StorageService.addToHistory(track);
    globalAudioEngine.load(track.audioUrl, true);
  }, [queue, isShuffle]);

  const togglePlay = useCallback(() => {
    if (!currentTrack) {
      if (queue.length > 0) {
        playTrack(queue[0]);
      }
      return;
    }
    if (isPlaying) {
      globalAudioEngine.pause();
    } else {
      globalAudioEngine.play();
    }
  }, [currentTrack, isPlaying, queue, playTrack]);

  const seek = useCallback((seconds: number) => {
    globalAudioEngine.seek(seconds);
    setProgress(seconds);
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    globalAudioEngine.setVolume(clamped);
    StorageService.saveSettings({ ...StorageService.getSettings(), volume: clamped });
  }, []);

  const setSpeed = useCallback((s: number) => {
    const clamped = Math.max(0.5, Math.min(2.0, s));
    setSpeedState(clamped);
    globalAudioEngine.setSpeed(clamped, preservePitch);
    StorageService.saveSettings({ ...StorageService.getSettings(), speed: clamped });
  }, [preservePitch]);

  const togglePreservePitch = useCallback(() => {
    const newVal = !preservePitch;
    setPreservePitchState(newVal);
    globalAudioEngine.setSpeed(speed, newVal);
    StorageService.saveSettings({ ...StorageService.getSettings(), preservePitch: newVal });
  }, [preservePitch, speed]);

  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      if (prev === 'OFF') return 'ALL';
      if (prev === 'ALL') return 'ONE';
      return 'OFF';
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => {
      const nextShuffle = !prev;
      if (nextShuffle && queue.length > 1 && currentTrack) {
        const remaining = queue.filter(t => t.id !== currentTrack.id);
        for (let i = remaining.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
        }
        setQueue([currentTrack, ...remaining]);
        setQueueIndex(0);
      }
      return nextShuffle;
    });
  }, [queue, currentTrack]);

  const addToQueue = useCallback((track: Track) => {
    setQueue(prev => [...prev, track]);
  }, []);

  const removeFromQueue = useCallback((index: number) => {
    setQueue(prev => {
      const updated = prev.filter((_, i) => i !== index);
      if (index === queueIndex) {
        // If current track removed, play next if available
        if (updated.length > 0) {
          const nextIdx = Math.min(index, updated.length - 1);
          setQueueIndex(nextIdx);
          setCurrentTrack(updated[nextIdx]);
          globalAudioEngine.load(updated[nextIdx].audioUrl, isPlaying);
        } else {
          setCurrentTrack(null);
          globalAudioEngine.pause();
        }
      } else if (index < queueIndex) {
        setQueueIndex(prevIdx => prevIdx - 1);
      }
      return updated;
    });
  }, [queueIndex, isPlaying]);

  const reorderQueue = useCallback((fromIndex: number, toIndex: number) => {
    setQueue(prev => {
      if (fromIndex < 0 || fromIndex >= prev.length || toIndex < 0 || toIndex >= prev.length) {
        return prev;
      }
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);

      // Adjust queueIndex if needed
      if (queueIndex === fromIndex) {
        setQueueIndex(toIndex);
      } else if (queueIndex > fromIndex && queueIndex <= toIndex) {
        setQueueIndex(queueIndex - 1);
      } else if (queueIndex < fromIndex && queueIndex >= toIndex) {
        setQueueIndex(queueIndex + 1);
      }

      return updated;
    });
  }, [queueIndex]);

  const clearQueue = useCallback(() => {
    setQueue(currentTrack ? [currentTrack] : []);
    setQueueIndex(currentTrack ? 0 : -1);
  }, [currentTrack]);

  const setEqualizerBand = useCallback((bandIndex: number, gainDb: number) => {
    globalAudioEngine.setEqualizerBand(bandIndex, gainDb);
    setCustomBands(prev => {
      const next = [...prev] as [number, number, number, number, number];
      next[bandIndex] = gainDb;
      StorageService.saveCustomEqBands(next);
      return next;
    });
    setActivePreset('custom');
    StorageService.saveActivePreset('custom');
  }, []);

  const applyEqualizerPreset = useCallback((presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      setActivePreset(preset.id);
      StorageService.saveActivePreset(preset.id);
      setCustomBands(preset.gains);
      globalAudioEngine.setAllEqualizerBands(preset.gains);
    }
  }, [presets]);

  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        speed,
        preservePitch,
        repeatMode,
        isShuffle,
        queue,
        queueIndex,
        presets,
        activePreset,
        customBands,
        errorMessage,
        playTrack,
        togglePlay,
        seek,
        setVolume,
        setSpeed,
        togglePreservePitch,
        toggleRepeat,
        toggleShuffle,
        nextTrack,
        prevTrack,
        addToQueue,
        removeFromQueue,
        reorderQueue,
        clearQueue,
        setEqualizerBand,
        applyEqualizerPreset,
        clearError,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer deve ser utilizado dentro de um PlayerProvider');
  }
  return context;
};
