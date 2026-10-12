import React from 'react';
import {
  ArrowLeft,
  Play,
  Shuffle,
  Trash2,
  X,
  ChevronUp,
  ChevronDown,
  Music2,
  Clock,
} from 'lucide-react';
import { Playlist } from '../types';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';
import { THEME_ACCENTS } from '../utils/theme';

interface PlaylistDetailViewProps {
  playlist: Playlist;
  onBack: () => void;
}

export const PlaylistDetailView: React.FC<PlaylistDetailViewProps> = ({
  playlist,
  onBack,
}) => {
  const { playTrack, currentTrack, accentColor } = usePlayer();
  const { removeTrackFromPlaylist, reorderPlaylistTracks, deletePlaylist, playlists } = useLibrary();
  const theme = THEME_ACCENTS[accentColor];

  // Find updated playlist instance
  const currentPl = playlists.find((p) => p.id === playlist.id) || playlist;

  const handlePlayAll = () => {
    if (currentPl.tracks.length > 0) {
      playTrack(currentPl.tracks[0], currentPl.tracks);
    }
  };

  const handleShuffleAll = () => {
    if (currentPl.tracks.length > 0) {
      const shuffled = [...currentPl.tracks].sort(() => Math.random() - 0.5);
      playTrack(shuffled[0], shuffled);
    }
  };

  const handleDelete = () => {
    if (confirm(`Deseja realmente excluir a playlist "${currentPl.title}"?`)) {
      deletePlaylist(currentPl.id);
      onBack();
    }
  };

  const totalDuration = currentPl.tracks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const totalMinutes = Math.floor(totalDuration / 60);

  return (
    <div className="space-y-6 pb-36 animate-in fade-in duration-300">
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para a Biblioteca
      </button>

      {/* Playlist Hero Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 p-5 sm:p-6 rounded-3xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-2xl">
        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl border border-white/10">
          <img
            src={currentPl.coverUrl}
            alt={currentPl.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center sm:text-left min-w-0">
          <span className={`text-[11px] uppercase tracking-widest ${theme.text} font-bold`}>
            Playlist Pessoal
          </span>
          <h1 className="text-xl sm:text-3xl font-black text-white truncate tracking-tight mt-0.5 mb-1.5">
            {currentPl.title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 mb-3">
            {currentPl.description || 'Sem descrição'}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-zinc-400 font-semibold">
            <span>{currentPl.tracks.length} faixa(s)</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {totalMinutes} min
            </span>
          </div>
        </div>
      </div>

      {/* Control Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <button
            disabled={currentPl.tracks.length === 0}
            onClick={handlePlayAll}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r ${theme.gradient} text-black font-extrabold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-30`}
          >
            <Play className="w-4 h-4 fill-current" />
            Tocar
          </button>

          <button
            disabled={currentPl.tracks.length === 0}
            onClick={handleShuffleAll}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-white/10 bg-zinc-900/60 text-white font-semibold text-xs sm:text-sm hover:border-white/20 transition-all disabled:opacity-30"
          >
            <Shuffle className="w-4 h-4" />
            Aleatório
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title="Excluir Playlist"
        >
          <Trash2 className="w-4 h-4" />
          Excluir Playlist
        </button>
      </div>

      {/* Track List */}
      <div className="space-y-2">
        {currentPl.tracks.length > 0 ? (
          currentPl.tracks.map((track, idx) => {
            const isCurrent = currentTrack?.id === track.id;
            const isYt = track.source === 'youtube' || Boolean(track.youtubeId);

            return (
              <div
                key={`${track.id}-${idx}`}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all ${
                  isCurrent
                    ? `${theme.border} bg-white/[0.08] shadow-sm`
                    : 'bg-zinc-950/60 border-white/[0.06] hover:border-white/20 hover:bg-zinc-900/60'
                }`}
              >
                <div
                  onClick={() => playTrack(track, currentPl.tracks)}
                  className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer select-none group"
                >
                  <span className="w-5 text-center text-xs font-mono text-zinc-500 group-hover:text-white">
                    {idx + 1}
                  </span>

                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover flex-shrink-0 border border-white/10"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4
                        className={`text-xs sm:text-sm font-bold truncate ${
                          isCurrent ? theme.text : 'text-white'
                        }`}
                      >
                        {track.title}
                      </h4>
                      {isYt && (
                        <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-red-600/30 text-red-400 border border-red-500/30">
                          YT
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">{track.artist}</p>
                  </div>
                </div>

                {/* Track Actions */}
                <div className="flex items-center gap-1 pl-2">
                  <span className="text-xs text-zinc-500 font-mono mr-2 hidden sm:inline">
                    {Math.floor(track.duration / 60)}:
                    {track.duration % 60 < 10 ? '0' : ''}
                    {track.duration % 60}
                  </span>

                  <button
                    disabled={idx === 0}
                    onClick={() => reorderPlaylistTracks(currentPl.id, idx, idx - 1)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
                    title="Mover para cima"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>

                  <button
                    disabled={idx === currentPl.tracks.length - 1}
                    onClick={() => reorderPlaylistTracks(currentPl.id, idx, idx + 1)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
                    title="Mover para baixo"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => removeTrackFromPlaylist(currentPl.id, track.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                    title="Remover da playlist"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 text-zinc-400">
            <Music2 className="w-10 h-10 stroke-1 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-white">Esta playlist está vazia</p>
            <p className="text-xs text-zinc-500 mt-1">
              Adicione faixas buscando no catálogo ou importando músicas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
