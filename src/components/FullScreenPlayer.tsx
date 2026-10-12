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
  ExternalLink,
  Download,
  Gauge,
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';
import { THEME_ACCENTS } from '../utils/theme';
import { YouTubeMusicService } from '../services/youtubeMusicService';

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
    accentColor,
    ambientGlow,
    enableVisualizer,
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
  const theme = THEME_ACCENTS[accentColor];

  if (!isOpen || !currentTrack) return null;

  const isFav = isFavorite(currentTrack.id);
  const isYouTube = currentTrack.source === 'youtube' || Boolean(currentTrack.youtubeId);

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleDownload = () => {
    if (!currentTrack.audioUrl) {
      YouTubeMusicService.openInOfficialApp(currentTrack);
      return;
    }
    const a = document.createElement('a');
    a.href = currentTrack.audioUrl;
    a.download = `${currentTrack.artist} - ${currentTrack.title}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050608]/95 backdrop-blur-3xl flex flex-col justify-between p-5 md:p-8 overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between max-w-lg w-full mx-auto pb-2 pt-2">
        <button
          onClick={onClose}
          className="p-3 rounded-2xl bg-zinc-900/60 border border-white/10 text-white hover:border-white/25 active:scale-95 transition-all shadow-sm"
          title="Fechar Player"
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
            TOCANDO AGORA
          </span>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            {isYouTube ? (
              <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> YouTube Music
              </span>
            ) : (
              <span className={`text-xs font-semibold ${theme.text}`}>
                Áudio de Alta Fidelidade
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenEqualizer}
            className="p-3 rounded-2xl bg-zinc-900/60 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 active:scale-95 transition-all"
            title="Equalizador de Estúdio"
          >
            <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={onOpenLyrics}
            className="p-3 rounded-2xl bg-zinc-900/60 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 active:scale-95 transition-all"
            title="Letras Sincronizadas"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={onOpenQueue}
            className="p-3 rounded-2xl bg-zinc-900/60 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 active:scale-95 transition-all"
            title="Fila de Reprodução"
          >
            <ListMusic className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-lg w-full mx-auto flex flex-col items-center my-auto py-2">
        {/* Dynamic Ambient Blur Glow (Aesthetic Signature) */}
        <div className="relative mb-6">
          {ambientGlow && (
            <div
              className="ambient-glow w-64 h-64 sm:w-72 sm:h-72 rounded-full"
              style={{
                backgroundImage: `radial-gradient(circle, ${theme.glow} 0%, rgba(0,0,0,0) 70%)`,
                top: '-10px',
                left: '-10px',
              }}
            />
          )}

          {/* Album Artwork */}
          <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/[0.15] group">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Visualizer overlay if enabled */}
            {enableVisualizer && isPlaying && (
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-center gap-1 h-6">
                <span className={`w-1 ${theme.bg} eq-bar-1 rounded-full shadow-md`} />
                <span className={`w-1 ${theme.bg} eq-bar-2 rounded-full shadow-md`} />
                <span className={`w-1 ${theme.bg} eq-bar-3 rounded-full shadow-md`} />
                <span className={`w-1 ${theme.bg} eq-bar-4 rounded-full shadow-md`} />
                <span className={`w-1 ${theme.bg} eq-bar-2 rounded-full shadow-md`} />
                <span className={`w-1 ${theme.bg} eq-bar-1 rounded-full shadow-md`} />
              </div>
            )}
          </div>
        </div>

        {/* Title, Artist and Actions */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="min-w-0 pr-3">
            <h2 className="text-xl sm:text-2xl font-black text-white truncate tracking-tight">
              {currentTrack.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 truncate mt-0.5">
              {currentTrack.artist} {currentTrack.album ? `• ${currentTrack.album}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Open in YouTube Music Button */}
            <button
              onClick={() => YouTubeMusicService.openInOfficialApp(currentTrack)}
              className="p-2.5 rounded-2xl bg-zinc-900/60 border border-white/10 text-zinc-300 hover:text-red-400 hover:border-red-500/40 active:scale-95 transition-all shadow-sm"
              title="Abrir no YouTube Music Oficial"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className="p-2.5 rounded-2xl bg-zinc-900/60 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 active:scale-95 transition-all shadow-sm"
              title="Download Direto"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleFavorite(currentTrack)}
              className={`p-2.5 rounded-2xl bg-zinc-900/60 border transition-all active:scale-95 shadow-sm ${
                isFav
                  ? `${theme.text} ${theme.border} shadow-md`
                  : 'text-zinc-400 border-white/10 hover:text-white'
              }`}
              title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Scrubber / Progress Bar */}
        <div className="w-full mb-5">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={progress}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg cursor-pointer transition-all"
          />
          <div className="flex justify-between text-[11px] text-zinc-400 mt-1.5 font-mono">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Transport Controls */}
        <div className="w-full flex items-center justify-between px-2 mb-6">
          <button
            onClick={toggleShuffle}
            className={`p-2.5 rounded-2xl transition-all ${
              isShuffle ? `${theme.text} bg-white/10` : 'text-zinc-400 hover:text-white'
            }`}
            title={`Modo Aleatório: ${isShuffle ? 'Ativado' : 'Desativado'}`}
          >
            <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={prevTrack}
            className="p-3 rounded-2xl text-white hover:text-zinc-300 active:scale-90 transition-transform"
            title="Faixa anterior"
          >
            <SkipBack className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr ${theme.gradient} text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
            style={{ boxShadow: `0 0 25px ${theme.glow}` }}
            title={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
            ) : (
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-3 rounded-2xl text-white hover:text-zinc-300 active:scale-90 transition-transform"
            title="Próxima faixa"
          >
            <SkipForward className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          </button>

          <button
            onClick={toggleRepeat}
            className={`p-2.5 rounded-2xl transition-all ${
              repeatMode !== 'OFF' ? `${theme.text} bg-white/10` : 'text-zinc-400 hover:text-white'
            }`}
            title={`Repetição: ${repeatMode}`}
          >
            {repeatMode === 'ONE' ? (
              <Repeat1 className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        {/* Speed Adjustment (Slowed & Speed Up) */}
        <div className="w-full rounded-2xl border border-white/[0.08] bg-zinc-950/60 backdrop-blur-xl p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Gauge className={`w-3.5 h-3.5 ${theme.text}`} />
              Velocidade / Slowed & Speed Up
            </span>
            <button
              onClick={togglePreservePitch}
              className={`text-[10px] px-2 py-0.5 rounded-md border font-bold transition-colors ${
                preservePitch
                  ? 'border-white/10 text-zinc-400 hover:text-white'
                  : `${theme.border} bg-white/10 ${theme.text}`
              }`}
            >
              {preservePitch ? 'Tom Original' : 'Tom Dinâmico (Nightcore)'}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {SPEED_PRESETS.map((presetSpeed) => {
              const isActive = speed === presetSpeed;
              const label =
                presetSpeed === 0.75
                  ? '0.75x Slow'
                  : presetSpeed === 1.0
                  ? '1.0x Normal'
                  : presetSpeed === 1.25
                  ? '1.25x Up'
                  : '1.5x Fast';
              return (
                <button
                  key={presetSpeed}
                  onClick={() => setSpeed(presetSpeed)}
                  className={`py-1.5 px-1 text-[11px] font-bold rounded-xl border transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${theme.gradient} text-black border-transparent shadow-sm`
                      : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
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
