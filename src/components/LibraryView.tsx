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

interface LibraryViewProps {
  onSelectPlaylist: (playlist: Playlist) => void;
  onOpenImport: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  onSelectPlaylist,
  onOpenImport,
}) => {
  const { playlists, favorites, history, createPlaylist, clearHistory } = useLibrary();
  const { playTrack, currentTrack } = usePlayer();
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#242424]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Sua Biblioteca
          </h2>
          <p className="text-sm text-[#8A8A8A]">
            Gerencie suas playlists, favoritas e faixas offline
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF8284] text-black font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,130,132,0.3)]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Nova Playlist
          </button>

          <button
            onClick={onOpenImport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2A2A2A] bg-[#161616] text-white text-xs sm:text-sm font-semibold hover:border-white/20 transition-all"
          >
            <FolderOpen className="w-4 h-4" />
            Importar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#242424] pb-2">
        <button
          onClick={() => setActiveTab('playlists')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'playlists'
              ? 'bg-[#1C1C1C] text-white border border-[#333]'
              : 'text-[#8A8A8A] hover:text-white'
          }`}
        >
          <ListMusic className="w-4 h-4 text-[#FF8284]" />
          Playlists ({playlists.length})
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'favorites'
              ? 'bg-[#1C1C1C] text-white border border-[#333]'
              : 'text-[#8A8A8A] hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4 text-[#FF8284] fill-current" />
          Curtidas ({favorites.length})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'history'
              ? 'bg-[#1C1C1C] text-white border border-[#333]'
              : 'text-[#8A8A8A] hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 text-[#FF8284]" />
          Histórico ({history.length})
        </button>
      </div>

      {/* Create Playlist Modal Form */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="max-w-md w-full bg-[#161616] border border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4"
          >
            <h3 className="font-bold text-white text-lg">Criar Nova Playlist</h3>
            <div>
              <label className="block text-xs font-semibold text-[#8A8A8A] mb-1.5 uppercase">
                Título da Playlist
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ex: Minhas Favoritas, Treino, Viagem"
                className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-[#FF8284]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8A8A8A] mb-1.5 uppercase">
                Descrição (Opcional)
              </label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Uma breve descrição sobre a seleção de faixas..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] text-white text-sm focus:outline-none focus:border-[#FF8284] h-20 resize-none"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#8A8A8A] hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#FF8284] text-black text-xs font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,130,132,0.3)]"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {playlists.map((pl) => (
                <div
                  key={pl.id}
                  onClick={() => onSelectPlaylist(pl)}
                  className="p-3.5 rounded-2xl bg-[#141414] border border-[#242424] hover:border-white/20 transition-all cursor-pointer group hover:bg-[#181818]"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 border border-white/10 group-hover:scale-102 transition-transform">
                    <img
                      src={pl.coverUrl}
                      alt={pl.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-[#FF8284] text-black flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-[#FF8284] transition-colors">
                    {pl.title}
                  </h4>
                  <p className="text-xs text-[#8A8A8A] truncate mt-0.5">
                    {pl.tracks.length} faixa(s)
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#8A8A8A]">
              <ListMusic className="w-12 h-12 stroke-1 text-[#444] mx-auto mb-3" />
              <p className="text-base font-semibold text-white">Nenhuma playlist criada</p>
              <p className="text-xs text-[#666] mt-1 mb-4">
                Crie sua primeira playlist para organizar suas faixas favoritas.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="px-5 py-2.5 rounded-xl bg-[#FF8284] text-black font-bold text-xs hover:scale-105 transition-all"
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
                <span className="text-xs text-[#8A8A8A] font-semibold uppercase">
                  {favorites.length} Músicas Curtidas
                </span>
                <button
                  onClick={() => playTrack(favorites[0], favorites)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF8284] text-black font-bold text-xs hover:scale-105 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Tocar Todas
                </button>
              </div>

              <div className="space-y-2">
                {favorites.map((track) => {
                  const isCurrent = currentTrack?.id === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track, favorites)}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                        isCurrent
                          ? 'bg-[#FF8284]/15 border-[#FF8284]/40'
                          : 'bg-[#141414] border-[#222] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1 select-none">
                        <img
                          src={track.coverUrl}
                          alt={track.title}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-white/10"
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

                      <div className="text-xs text-[#8A8A8A] font-mono pl-3">
                        {Math.floor(track.duration / 60)}:
                        {track.duration % 60 < 10 ? '0' : ''}
                        {track.duration % 60}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-[#8A8A8A]">
              <Heart className="w-12 h-12 stroke-1 text-[#444] mx-auto mb-3" />
              <p className="text-base font-semibold text-white">Nenhuma música curtida ainda</p>
              <p className="text-xs text-[#666] mt-1">
                Toque no ícone de coração em qualquer música para adicioná-la aqui.
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
                <span className="text-xs text-[#8A8A8A] font-semibold uppercase">
                  Ouvidas Recentemente ({history.length})
                </span>
                <button
                  onClick={clearHistory}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#2A2A2A] text-xs font-semibold text-[#8A8A8A] hover:text-[#FF8284] hover:border-[#FF8284]/40 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpar Histórico
                </button>
              </div>

              <div className="space-y-2">
                {history.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track, history)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#141414] border border-[#222] hover:border-white/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1 select-none">
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-white/10"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#FF8284] truncate">
                          {track.title}
                        </h4>
                        <p className="text-xs text-[#8A8A8A] truncate">{track.artist}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-[#8A8A8A]">
              <Clock className="w-12 h-12 stroke-1 text-[#444] mx-auto mb-3" />
              <p className="text-base font-semibold text-white">Histórico vazio</p>
              <p className="text-xs text-[#666] mt-1">
                As faixas que você escutar aparecerão automaticamente aqui.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
