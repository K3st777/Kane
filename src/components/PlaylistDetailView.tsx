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

interface PlaylistDetailViewProps {
  playlist: Playlist;
  onBack: () => void;
}

export const PlaylistDetailView: React.FC<PlaylistDetailViewProps> = ({
  playlist,
  onBack,
}) => {
  const { playTrack, currentTrack } = usePlayer();
  const { removeTrackFromPlaylist, reorderPlaylistTracks, deletePlaylist, playlists } = useLibrary();

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
        className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8A8A8A] hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para a Biblioteca
      </button>

      {/* Playlist Hero Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 p-6 rounded-3xl bg-gradient-to-b from-[#1C1C1C] to-[#121212] border border-[#2A2A2A]">
        <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl border-2 border-white/10">
          <img
            src={currentPl.coverUrl}
            alt={currentPl.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center sm:text-left min-w-0">
          <span className="text-xs uppercase tracking-widest text-[#FF8284] font-bold">
            Playlist Pessoal
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white truncate tracking-tight mt-1 mb-2">
            {currentPl.title}
          </h1>
          <p className="text-sm text-[#8A8A8A] line-clamp-2 mb-4">
            {currentPl.description || 'Sem descrição'}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-[#8A8A8A] font-medium">
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
      <div className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-[#242424]">
        <div className="flex items-center gap-3">
          <button
            disabled={currentPl.tracks.length === 0}
            onClick={handlePlayAll}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF8284] text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,130,132,0.3)] disabled:opacity-40"
          >
            <Play className="w-4 h-4 fill-current" />
            Tocar
          </button>

          <button
            disabled={currentPl.tracks.length === 0}
            onClick={handleShuffleAll}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-[#2A2A2A] bg-[#161616] text-white font-semibold text-sm hover:border-white/20 transition-all disabled:opacity-40"
          >
            <Shuffle className="w-4 h-4" />
            Aleatório
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#8A8A8A] hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
            return (
              <div
                key={`${track.id}-${idx}`}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-[#FF8284]/15 border-[#FF8284]/40'
                    : 'bg-[#141414] border-[#222] hover:border-white/20'
                }`}
              >
                <div
                  onClick={() => playTrack(track, currentPl.tracks)}
                  className="flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer select-none group"
                >
                  <span className="w-6 text-center text-xs font-mono text-[#666] group-hover:text-white">
                    {idx + 1}
                  </span>

                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-11 h-11 rounded-xl object-cover flex-shrink-0 border border-white/10"
                  />

                  <div className="min-w-0 flex-1">
                    <h4
                      className={`text-sm font-semibold truncate ${
                        isCurrent ? 'text-[#FF8284]' : 'text-white group-hover:text-[#FF8284]'
                      }`}
                    >
                      {track.title}
                    </h4>
                    <p className="text-xs text-[#8A8A8A] truncate">{track.artist}</p>
                  </div>
                </div>

                {/* Track Actions */}
                <div className="flex items-center gap-1 pl-2">
                  <span className="text-xs text-[#666] font-mono mr-2 hidden sm:inline">
                    {Math.floor(track.duration / 60)}:
                    {track.duration % 60 < 10 ? '0' : ''}
                    {track.duration % 60}
                  </span>

                  <button
                    disabled={idx === 0}
                    onClick={() => reorderPlaylistTracks(currentPl.id, idx, idx - 1)}
                    className="p-1 rounded-lg text-[#8A8A8A] hover:text-white disabled:opacity-20 transition-colors"
                    title="Mover para cima"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>

                  <button
                    disabled={idx === currentPl.tracks.length - 1}
                    onClick={() => reorderPlaylistTracks(currentPl.id, idx, idx + 1)}
                    className="p-1 rounded-lg text-[#8A8A8A] hover:text-white disabled:opacity-20 transition-colors"
                    title="Mover para baixo"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => removeTrackFromPlaylist(currentPl.id, track.id)}
                    className="p-1.5 rounded-lg text-[#8A8A8A] hover:text-red-400 transition-colors"
                    title="Remover da playlist"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 text-[#8A8A8A]">
            <Music2 className="w-12 h-12 stroke-1 text-[#444] mx-auto mb-3" />
            <p className="text-base font-semibold text-white">Esta playlist está vazia</p>
            <p className="text-xs text-[#666] mt-1">
              Adicione faixas buscando no catálogo ou importando músicas do seu computador.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
