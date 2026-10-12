import React, { useState } from 'react';
import {
  Plus,
  Heart,
  Clock,
  ListMusic,
  Play,
  Trash2,
  FolderOpen,
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { usePlayer } from '../context/PlayerContext';
import { Playlist } from '../types';
import { THEME_ACCENTS } from '../utils/theme';

interface LibraryViewProps {
  onSelectPlaylist: (playlist: Playlist) => void;
  onOpenImport: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  onSelectPlaylist,
  onOpenImport,
}) => {
  const { playlists, favorites, history, createPlaylist, clearHistory } = useLibrary();
  const { playTrack, currentTrack, accentColor } = usePlayer();
  const theme = THEME_ACCENTS[accentColor];

  const [activeTab, setActiveTab] = useState<'playlists' | 'favorites' | 'history'>('playlists');
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      const pl = createPlaylist(newTitle.trim(), newDesc.trim());
      setNewTitle('');
      setNewDesc('');
      setIsCreating(false);
      onSelectPlaylist(pl);
    }
  };

  return (
    <div className="space-y-6 pb-36 animate-in fade-in duration-300">
      {/* Header & Subtabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            Sua Biblioteca
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Gerencie suas playlists, favoritas e histórico de faixas
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreating(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r ${theme.gradient} text-black font-extrabold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-md`}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Nova Playlist
          </button>

          <button
            onClick={onOpenImport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-white/10 bg-zinc-900/60 text-white text-xs sm:text-sm font-semibold hover:border-white/20 active:scale-95 transition-all"
          >
            <FolderOpen className="w-4 h-4" />
            Importar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2">
        <button
          onClick={() => setActiveTab('playlists')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'playlists'
              ? 'bg-white/10 text-white border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ListMusic className={`w-4 h-4 ${theme.text}`} />
          Playlists ({playlists.length})
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'favorites'
              ? 'bg-white/10 text-white border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${theme.text} fill-current`} />
          Curtidas ({favorites.length})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'history'
              ? 'bg-white/10 text-white border border-white/15'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Clock className={`w-4 h-4 ${theme.text}`} />
          Histórico ({history.length})
        </button>
      </div>

      {/* Create Playlist Modal Form */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-3xl flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="max-w-md w-full bg-zinc-950/90 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4"
          >
            <h3 className="font-extrabold text-white text-base">Criar Nova Playlist</h3>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1.5 uppercase">
                Título da Playlist
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ex: Hits do Momento, Treino, Viagem"
                className="w-full px-4 py-3 rounded-2xl bg-[#050608] border border-white/10 text-white text-sm focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1.5 uppercase">
                Descrição (Opcional)
              </label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Uma breve descrição sobre a seleção de faixas..."
                className="w-full px-4 py-2.5 rounded-2xl bg-[#050608] border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 h-20 resize-none"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-2xl text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`px-5 py-2.5 rounded-2xl bg-gradient-to-r ${theme.gradient} text-black text-xs font-extrabold hover:scale-105 active:scale-95 transition-all shadow-md`}
              >
                Criar Playlist
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Playlists */}
      {activeTab === 'playlists' && (
        <div>
          {playlists.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {playlists.map((pl) => (
                <div
                  key={pl.id}
                  onClick={() => onSelectPlaylist(pl)}
                  className="p-3 rounded-2xl bg-zinc-950/60 border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer group hover:bg-zinc-900/60"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 border border-white/10 group-hover:scale-102 transition-transform">
                    <img
                      src={pl.coverUrl}
                      alt={pl.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${theme.gradient} text-black flex items-center justify-center shadow-lg`}>
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <h4 className={`text-xs sm:text-sm font-bold text-white truncate group-hover:${theme.text} transition-colors`}>
                    {pl.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    {pl.tracks.length} faixa(s)
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-zinc-400">
              <ListMusic className="w-12 h-12 stroke-1 text-zinc-600 mx-auto mb-3" />
              <p className="text-base font-bold text-white">Nenhuma playlist criada</p>
              <p className="text-xs text-zinc-500 mt-1 mb-4">
                Crie sua primeira playlist para organizar suas faixas favoritas.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className={`px-5 py-2.5 rounded-2xl bg-gradient-to-r ${theme.gradient} text-black font-extrabold text-xs hover:scale-105 active:scale-95 transition-all shadow-md`}
              >
                Criar Playlist
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-3">
          {favorites.length > 0 ? (
            <>
              <div className="flex items-center justify-between pb-2">
                <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">
                  {favorites.length} Músicas Curtidas
                </span>
                <button
                  onClick={() => playTrack(favorites[0], favorites)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r ${theme.gradient} text-black font-extrabold text-xs hover:scale-105 active:scale-95 transition-all shadow-md`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Tocar Todas
                </button>
              </div>

              <div className="space-y-2">
                {favorites.map((track) => {
                  const isCurrent = currentTrack?.id === track.id;
                  const isYt = track.source === 'youtube' || Boolean(track.youtubeId);
                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track, favorites)}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer group ${
                        isCurrent
                          ? `${theme.border} bg-white/[0.08]`
                          : 'bg-zinc-950/60 border-white/[0.06] hover:border-white/20 hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1 select-none">
                        <img
                          src={track.coverUrl}
                          alt={track.title}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0 border border-white/10"
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
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            {track.artist}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                          isCurrent
                            ? `bg-gradient-to-tr ${theme.gradient} text-black border-transparent shadow-md`
                            : 'bg-white/5 border-white/10 text-white group-hover:bg-white group-hover:text-black'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-zinc-400">
              <Heart className="w-12 h-12 stroke-1 text-zinc-600 mx-auto mb-3" />
              <p className="text-base font-bold text-white">Nenhuma música curtida ainda</p>
              <p className="text-xs text-zinc-500 mt-1">
                Toque no ícone de coração em qualquer música para salvá-la aqui.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab: History */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {history.length > 0 ? (
            <>
              <div className="flex items-center justify-between pb-2">
                <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">
                  Tocadas Recentemente ({history.length})
                </span>
                <button
                  onClick={clearHistory}
                  className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpar Histórico
                </button>
              </div>

              <div className="space-y-2">
                {history.map((track, idx) => {
                  const isCurrent = currentTrack?.id === track.id;
                  const isYt = track.source === 'youtube' || Boolean(track.youtubeId);
                  return (
                    <div
                      key={`${track.id}-${idx}`}
                      onClick={() => playTrack(track, history)}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer group ${
                        isCurrent
                          ? `${theme.border} bg-white/[0.08]`
                          : 'bg-zinc-950/60 border-white/[0.06] hover:border-white/20 hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1 select-none">
                        <img
                          src={track.coverUrl}
                          alt={track.title}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0 border border-white/10"
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
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            {track.artist}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                          isCurrent
                            ? `bg-gradient-to-tr ${theme.gradient} text-black border-transparent shadow-md`
                            : 'bg-white/5 border-white/10 text-white group-hover:bg-white group-hover:text-black'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-zinc-400">
              <Clock className="w-12 h-12 stroke-1 text-zinc-600 mx-auto mb-3" />
              <p className="text-base font-bold text-white">Histórico vazio</p>
              <p className="text-xs text-zinc-500 mt-1">
                As músicas que você ouvir aparecerão aqui para acesso rápido.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
