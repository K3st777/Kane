declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

export interface YTPlayerInstance {
  loadVideoById: (options: { videoId: string; startSeconds?: number } | string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  setPlaybackRate: (suggestedRate: number) => void;
  getPlaybackRate: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

export class YouTubeEngine {
  private static instance: YouTubeEngine;
  private player: YTPlayerInstance | null = null;
  private isReady = false;
  private currentVideoId: string | null = null;
  private progressTimer: number | null = null;
  private containerId = 'kane-youtube-hidden-player';

  private onTimeUpdateCallback: ((currentTime: number, duration: number) => void) | null = null;
  private onStateChangeCallback: ((isPlaying: boolean) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;

  public static getInstance(): YouTubeEngine {
    if (!YouTubeEngine.instance) {
      YouTubeEngine.instance = new YouTubeEngine();
    }
    return YouTubeEngine.instance;
  }

  private constructor() {
    this.init();
  }

  public init() {
    if (typeof window === 'undefined') return;

    // Create container if it doesn't exist
    if (!document.getElementById(this.containerId)) {
      const div = document.createElement('div');
      div.id = this.containerId;
      div.style.position = 'fixed';
      div.style.top = '-9999px';
      div.style.left = '-9999px';
      div.style.width = '200px';
      div.style.height = '200px';
      div.style.opacity = '0.001';
      div.style.pointerEvents = 'none';
      document.body.appendChild(div);
    }

    if (window.YT && window.YT.Player) {
      this.createPlayer();
    } else {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        this.createPlayer();
      };
    }
  }

  private createPlayer() {
    if (this.player || !window.YT) return;

    try {
      this.player = new window.YT.Player(this.containerId, {
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            this.isReady = true;
            if (this.currentVideoId) {
              this.loadTrack(this.currentVideoId);
            }
          },
          onStateChange: (event) => {
            if (!window.YT) return;
            const state = event.data;
            if (state === window.YT.PlayerState.PLAYING) {
              this.startProgressTimer();
              this.onStateChangeCallback?.(true);
            } else if (state === window.YT.PlayerState.PAUSED) {
              this.stopProgressTimer();
              this.onStateChangeCallback?.(false);
            } else if (state === window.YT.PlayerState.ENDED) {
              this.stopProgressTimer();
              this.onStateChangeCallback?.(false);
              this.onEndedCallback?.();
            }
          },
          onError: (event) => {
            this.stopProgressTimer();
            this.onErrorCallback?.(`Erro de reprodução YouTube (Código ${event.data})`);
          },
        },
      });
    } catch (e) {
      console.warn('Erro ao inicializar YouTube Iframe Player:', e);
    }
  }

  private startProgressTimer() {
    this.stopProgressTimer();
    this.progressTimer = window.setInterval(() => {
      if (this.player && this.isReady) {
        try {
          const current = this.player.getCurrentTime() || 0;
          const duration = this.player.getDuration() || 0;
          if (this.onTimeUpdateCallback) {
            this.onTimeUpdateCallback(current, duration);
          }
        } catch {
          // ignore
        }
      }
    }, 250);
  }

  private stopProgressTimer() {
    if (this.progressTimer !== null) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  public loadTrack(videoId: string, startSeconds = 0) {
    this.currentVideoId = videoId;
    if (!this.player || !this.isReady) {
      return;
    }
    try {
      this.player.loadVideoById({
        videoId,
        startSeconds,
      });
    } catch {
      // fallback
    }
  }

  public play() {
    if (this.player && this.isReady) {
      try {
        this.player.playVideo();
      } catch (e) {
        console.warn('Play error:', e);
      }
    }
  }

  public pause() {
    if (this.player && this.isReady) {
      try {
        this.player.pauseVideo();
      } catch (e) {
        console.warn('Pause error:', e);
      }
    }
  }

  public seek(seconds: number) {
    if (this.player && this.isReady) {
      try {
        this.player.seekTo(seconds, true);
        if (this.onTimeUpdateCallback) {
          const dur = this.player.getDuration() || 0;
          this.onTimeUpdateCallback(seconds, dur);
        }
      } catch {
        // ignore
      }
    }
  }

  public setVolume(volume0to1: number) {
    if (this.player && this.isReady) {
      try {
        this.player.setVolume(Math.round(volume0to1 * 100));
      } catch {
        // ignore
      }
    }
  }

  public setPlaybackRate(rate: number) {
    if (this.player && this.isReady) {
      try {
        this.player.setPlaybackRate(rate);
      } catch {
        // ignore
      }
    }
  }

  public setOnTimeUpdate(cb: (currentTime: number, duration: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public setOnStateChange(cb: (isPlaying: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public setOnEnded(cb: () => void) {
    this.onEndedCallback = cb;
  }

  public setOnError(cb: (error: string) => void) {
    this.onErrorCallback = cb;
  }

  public getCurrentVideoId(): string | null {
    return this.currentVideoId;
  }
}
