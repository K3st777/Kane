import React from 'react';
import { Play, Pause, SkipForward, Heart, Volume2, VolumeX, Gauge } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';

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
    togglePlay,
    nextTrack,
    setVolume,
  } = usePlayer();

  const { isFavorite, toggleFavorite } = useLibrary();

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  const isFav = isFavorite(currentTrack.id);

  return (
    <div className="fixed bottom-16 md:bottom-4 left-2 right-2 md:left-6 md:right-6 z-40">
      <div className="max-w-7xl mx-auto relative rounded-2xl border border-[#2A2A2A] bg-[#161616]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-white/20">
        {/* Top Slim Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#242424]">
          <div
            className="h-full bg-gradient-to-r from-[#FF8284] to-[#ff5256] transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between p-3 md:px-5 md:py-3.5 gap-3">
          {/* Track Info (Click to Expand) */}
          <div
            onClick={onExpand}
            className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0 select-none group"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 bg-[#FF8284] animate-pulse h-full rounded-full" />
                    <span className="w-1 bg-[#FF8284] animate-pulse h-2 rounded-full" />
                    <span className="w-1 bg-[#FF8284] animate-pulse h-3 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#FF8284] transition-colors">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-[#8A8A8A] truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Quick Speed Indicator Badge */}
          {speed !== 1.0 && (
            <div
              onClick={onExpand}
              className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF8284]/15 border border-[#FF8284]/30 text-[#FF8284] text-xs font-semibold cursor-pointer"
              title="Velocidade ativa"
            >
              <Gauge className="w-3 h-3" />
              <span>{speed}x</span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(currentTrack)}
            className={`p-2 rounded-xl hover:bg-white/5 transition-colors ${
              isFav ? 'text-[#FF8284]' : 'text-[#8A8A8A] hover:text-white'
            }`}
            title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
          </button>

          {/* Volume Slider (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-[#2A2A2A]">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
              className="text-[#8A8A8A] hover:text-white p-1"
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
              className="w-20 accent-[#FF8284] h-1 bg-[#333] rounded-lg cursor-pointer"
            />
          </div>

          {/* Play / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
              title={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={nextTrack}
              className="p-2.5 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors"
              title="Próxima faixa"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
