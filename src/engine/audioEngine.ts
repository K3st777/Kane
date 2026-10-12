import { EqualizerBand } from '../types';

export const EQ_FREQUENCIES = [60, 250, 1000, 4000, 12000] as const;
export const EQ_LABELS = ['60Hz', '250Hz', '1kHz', '4kHz', '12kHz'] as const;

export class AudioEngine {
  private audio: HTMLAudioElement;
  private audioContext: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private eqFilters: BiquadFilterNode[] = [];
  private isInitialized = false;

  private onTimeUpdateCallback: ((currentTime: number, duration: number) => void) | null = null;
  private onStateChangeCallback: ((isPlaying: boolean) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;

  constructor() {
    if (typeof Audio !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'metadata';
      this.audio.crossOrigin = 'anonymous';
      this.setupListeners();
    } else {
      this.audio = {} as HTMLAudioElement;
    }
  }

  private setupListeners() {
    this.audio.addEventListener('timeupdate', () => {
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.audio.currentTime, this.audio.duration || 0);
      }
    });

    this.audio.addEventListener('play', () => {
      this.onStateChangeCallback?.(true);
    });

    this.audio.addEventListener('pause', () => {
      this.onStateChangeCallback?.(false);
    });

    this.audio.addEventListener('ended', () => {
      this.onEndedCallback?.();
    });

    this.audio.addEventListener('error', () => {
      const err = this.audio.error;
      const message = err ? `Erro de áudio: Código ${err.code} - ${err.message}` : 'Erro desconhecido ao carregar áudio';
      this.onErrorCallback?.(message);
    });
  }

  public initAudioContext(): boolean {
    if (this.isInitialized) return true;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;

      this.audioContext = new AudioCtx();
      this.sourceNode = this.audioContext.createMediaElementSource(this.audio);

      // Create 5-band EQ
      this.eqFilters = EQ_FREQUENCIES.map((freq, idx) => {
        const filter = this.audioContext!.createBiquadFilter();
        filter.frequency.value = freq;
        if (idx === 0) {
          filter.type = 'lowshelf';
        } else if (idx === EQ_FREQUENCIES.length - 1) {
          filter.type = 'highshelf';
        } else {
          filter.type = 'peaking';
          filter.Q.value = 1.0;
        }
        filter.gain.value = 0;
        return filter;
      });

      this.gainNode = this.audioContext.createGain();

      // Connect graph: source -> filter0 -> filter1 -> ... -> filter4 -> gain -> destination
      let lastNode: AudioNode = this.sourceNode;
      for (const filter of this.eqFilters) {
        lastNode.connect(filter);
        lastNode = filter;
      }
      lastNode.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);

      this.isInitialized = true;
      return true;
    } catch {
      // Fallback gracefully to standard HTML5 Audio without Web Audio FX if blocked
      return false;
    }
  }

  public async resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  public async load(url: string, autoPlay = true) {
    this.initAudioContext();
    await this.resumeContext();

    this.audio.src = url;
    this.audio.load();

    if (autoPlay) {
      try {
        await this.audio.play();
      } catch (err) {
        // Autoplay may be deferred until user interaction
        this.onStateChangeCallback?.(false);
      }
    }
  }

  public async play() {
    this.initAudioContext();
    await this.resumeContext();
    try {
      await this.audio.play();
    } catch (err) {
      this.onErrorCallback?.('Reprodução bloqueada pelo navegador. Toque no player para iniciar.');
    }
  }

  public pause() {
    this.audio.pause();
  }

  public seek(timeInSeconds: number) {
    if (isFinite(timeInSeconds) && timeInSeconds >= 0) {
      this.audio.currentTime = timeInSeconds;
    }
  }

  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.audio.volume = clamped;
  }

  public setSpeed(speed: number, preservePitch = true) {
    const clamped = Math.max(0.25, Math.min(3.0, speed));
    this.audio.playbackRate = clamped;
    // Toggle whether pitch is preserved (Nightcore vs tempo adjustment)
    if ('preservesPitch' in this.audio) {
      (this.audio as HTMLAudioElement & { preservesPitch: boolean }).preservesPitch = preservePitch;
    }
  }

  public setEqualizerBand(bandIndex: number, gainDb: number) {
    if (this.eqFilters[bandIndex]) {
      const clampedGain = Math.max(-12, Math.min(12, gainDb));
      this.eqFilters[bandIndex].gain.value = clampedGain;
    }
  }

  public setAllEqualizerBands(gains: [number, number, number, number, number]) {
    gains.forEach((gain, idx) => {
      this.setEqualizerBand(idx, gain);
    });
  }

  public getBands(): EqualizerBand[] {
    return EQ_FREQUENCIES.map((freq, idx) => ({
      frequency: freq,
      label: EQ_LABELS[idx],
      gain: this.eqFilters[idx] ? this.eqFilters[idx].gain.value : 0,
    }));
  }

  public get currentTime(): number {
    return this.audio.currentTime;
  }

  public get duration(): number {
    return this.audio.duration || 0;
  }

  public get isPaused(): boolean {
    return this.audio.paused;
  }

  public onTimeUpdate(cb: (currentTime: number, duration: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public onStateChange(cb: (isPlaying: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public onEnded(cb: () => void) {
    this.onEndedCallback = cb;
  }

  public onError(cb: (error: string) => void) {
    this.onErrorCallback = cb;
  }
}

export const globalAudioEngine = new AudioEngine();
