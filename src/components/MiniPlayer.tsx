import React from 'react';
import { Play, Pause, SkipForward, Heart, Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';
import { THEME_ACCENTS } from '../utils/theme';

interface MiniPlayerProps {
  onExpand: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({ onExpand }) => {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    speed,
    accentColor,
    togglePlay,
    nextTrack,
    setVolume,
  } = usePlayer();

  const { isFavorite, toggleFavorite } = useLibrary();
  const theme = THEME_ACCENTS[accentColor];

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  const isFav = isFavorite(currentTrack.id);
  const isYouTube = currentTrack.source === 'youtube' || Boolean(currentTrack.youtubeId);

  return (
    <div className="fixed bottom-20 md:bottom-6 left-3 right-3 md:left-8 md:right-8 z-40 max-w-2xl mx-auto">
      <div className="relative rounded-2xl border border-white/[0.12] bg-zinc-950/85 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 hover:border-white/20">
        {/* Dynamic Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/[0.08]">
          <div
            className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-150`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between p-2.5 sm:px-4 sm:py-3 gap-3">
          {/* Track Info (Tap to Expand Sheet) */}
          <div
            onClick={onExpand}
            className="flex items-center gap-3 cursor-pointer flex-1 min-w-0 select-none group"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-md group-hover:scale-105 transition-transform">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-3.5">
                    <span className={`w-0.5 ${theme.bg} eq-bar-1 rounded-full`} />
                    <span className={`w-0.5 ${theme.bg} eq-bar-2 rounded-full`} />
                    <span className={`w-0.5 ${theme.bg} eq-bar-3 rounded-full`} />
                    <span className={`w-0.5 ${theme.bg} eq-bar-4 rounded-full`} />
                  </div>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-zinc-200 transition-colors">
                  {currentTrack.title}
                </h4>
                {isYouTube && (
                  <span className="flex-shrink-0 text-[9px] font-black px-1.5 py-0.2 rounded bg-red-600/30 text-red-400 border border-red-500/30">
                    YT
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 truncate mt-0.5">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Quick Speed Badge */}
          {speed !== 1.0 && (
            <div
              onClick={onExpand}
              className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full ${theme.bg}/15 border ${theme.border} ${theme.text} text-[10px] font-bold cursor-pointer`}
            >
              <span>{speed}x</span>
            </div>
          )}

          {/* Favorite Toggle */}
          <button
            onClick={() => toggleFavorite(currentTrack)}
            className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
              isFav ? theme.text : 'text-zinc-400 hover:text-white'
            }`}
            title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFav ? 'fill-current' : ''}`} />
          </button>

          {/* Desktop Volume */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-white/10">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
              className="text-zinc-400 hover:text-white p-1"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 accent-white h-1 bg-zinc-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Play / Next Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={togglePlay}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg`}
              title={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-2 sm:p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Próxima"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
