import React from 'react';
import {
  ChevronDown,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  Sliders,
  FileText,
  ListMusic,
  Download,
  Gauge,
  Sparkles,
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';

interface FullScreenPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEqualizer: () => void;
  onOpenLyrics: () => void;
  onOpenQueue: () => void;
}

const SPEED_PRESETS = [0.75, 1.0, 1.25, 1.5];

export const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({
  isOpen,
  onClose,
  onOpenEqualizer,
  onOpenLyrics,
  onOpenQueue,
}) => {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    speed,
    preservePitch,
    repeatMode,
    isShuffle,
    togglePlay,
    seek,
    setSpeed,
    togglePreservePitch,
    toggleRepeat,
    toggleShuffle,
    nextTrack,
    prevTrack,
  } = usePlayer();

  const { isFavorite, toggleFavorite } = useLibrary();

  if (!isOpen || !currentTrack) return null;

  const isFav = isFavorite(currentTrack.id);

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = currentTrack.audioUrl;
    a.download = `${currentTrack.artist} - ${currentTrack.title}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-10 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between max-w-xl w-full mx-auto pb-4">
        <button
          onClick={onClose}
          className="p-3 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] text-white hover:border-white/20 transition-all hover:scale-105"
          title="Minimizar Player"
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[#8A8A8A] font-semibold">
            Tocando Agora
          </span>
          <p className="text-xs text-[#FF8284] font-medium flex items-center justify-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3" /> Kane Livre & Sem Anúncios
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenEqualizer}
            className="p-3 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] text-white hover:text-[#FF8284] hover:border-[#FF8284]/50 transition-all"
            title="Equalizador"
          >
            <Sliders className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenLyrics}
            className="p-3 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] text-white hover:text-[#FF8284] hover:border-[#FF8284]/50 transition-all"
            title="Letras Sincronizadas"
          >
            <FileText className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenQueue}
            className="p-3 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] text-white hover:text-[#FF8284] hover:border-[#FF8284]/50 transition-all"
            title="Fila de Reprodução"
          >
            <ListMusic className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-xl w-full mx-auto flex flex-col items-center my-auto py-4">
        {/* Album Artwork */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(255,130,132,0.15)] border-2 border-white/10 group mb-8">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Title, Artist and Actions */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="min-w-0 pr-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white truncate tracking-tight">
              {currentTrack.title}
            </h2>
            <p className="text-base text-[#8A8A8A] truncate mt-1">
              {currentTrack.artist} {currentTrack.album ? `• ${currentTrack.album}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="p-3 rounded-2xl bg-[#161616] border border-[#2A2A2A] text-[#8A8A8A] hover:text-white hover:border-white/20 transition-all"
              title="Download Offline (Gratuito)"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => toggleFavorite(currentTrack)}
              className={`p-3 rounded-2xl bg-[#161616] border border-[#2A2A2A] transition-all ${
                isFav
                  ? 'text-[#FF8284] border-[#FF8284]/40 shadow-[0_0_15px_rgba(255,130,132,0.3)]'
                  : 'text-[#8A8A8A] hover:text-white hover:border-white/20'
              }`}
              title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Scrubber / Progress Bar */}
        <div className="w-full mb-6">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={progress}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="w-full accent-[#FF8284] h-1.5 bg-[#2A2A2A] rounded-lg cursor-pointer transition-all"
          />
          <div className="flex justify-between text-xs text-[#8A8A8A] mt-2 font-mono">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Transport Controls */}
        <div className="w-full flex items-center justify-between px-2 mb-8">
          <button
            onClick={toggleShuffle}
            className={`p-3 rounded-2xl transition-all ${
              isShuffle ? 'text-[#FF8284] bg-[#FF8284]/15' : 'text-[#8A8A8A] hover:text-white'
            }`}
            title={`Modo Aleatório: ${isShuffle ? 'Ativado' : 'Desativado'}`}
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <button
            onClick={prevTrack}
            className="p-3 rounded-2xl text-white hover:text-[#FF8284] hover:bg-white/5 transition-all hover:scale-110 active:scale-95"
            title="Faixa anterior"
          >
            <SkipBack className="w-7 h-7 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF8284] to-[#ff999b] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,130,132,0.4)] hover:scale-105 active:scale-95 transition-all"
            title={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-3 rounded-2xl text-white hover:text-[#FF8284] hover:bg-white/5 transition-all hover:scale-110 active:scale-95"
            title="Próxima faixa"
          >
            <SkipForward className="w-7 h-7 fill-current" />
          </button>

          <button
            onClick={toggleRepeat}
            className={`p-3 rounded-2xl transition-all ${
              repeatMode !== 'OFF' ? 'text-[#FF8284] bg-[#FF8284]/15' : 'text-[#8A8A8A] hover:text-white'
            }`}
            title={`Repetição: ${repeatMode}`}
          >
            {repeatMode === 'ONE' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
          </button>
        </div>

        {/* Speed Adjustment (Lane Feature: Slowed & Speed Up) */}
        <div className="w-full rounded-2xl border border-[#242424] bg-[#141414]/80 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-[#FF8284]" />
              Velocidade (Slowed & Speed Up)
            </span>
            <button
              onClick={togglePreservePitch}
              className={`text-[11px] px-2 py-0.5 rounded-lg border font-medium transition-colors ${
                preservePitch
                  ? 'border-[#2A2A2A] text-[#8A8A8A] hover:text-white'
                  : 'border-[#FF8284] bg-[#FF8284]/10 text-[#FF8284]'
              }`}
              title="Alternar entre preservar tom ou efeito chipmunk/slowed pitch"
            >
              {preservePitch ? 'Tom Original' : 'Tom Dinâmico (Nightcore)'}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {SPEED_PRESETS.map((presetSpeed) => {
              const isActive = speed === presetSpeed;
              const label =
                presetSpeed === 0.75
                  ? '0.75x Slowed'
                  : presetSpeed === 1.0
                  ? '1.0x Normal'
                  : presetSpeed === 1.25
                  ? '1.25x Speed'
                  : '1.5x Fast';
              return (
                <button
                  key={presetSpeed}
                  onClick={() => setSpeed(presetSpeed)}
                  className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all ${
                    isActive
                      ? 'bg-[#FF8284] text-black border-[#FF8284] shadow-[0_0_15px_rgba(255,130,132,0.3)]'
                      : 'bg-[#1C1C1C] border-[#2A2A2A] text-[#8A8A8A] hover:text-white hover:border-white/20'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
