import React, { useState } from 'react';
import { Search, X, Play, Plus, Heart, Music2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';
import { CatalogService } from '../services/catalogService';

export const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const { playTrack, addToQueue, currentTrack } = usePlayer();
  const { favorites, isFavorite, toggleFavorite, playlists } = useLibrary();

  // Combine all local playlist tracks + favorites
  const localTracks = [
    ...favorites,
    ...playlists.flatMap((p) => p.tracks),
  ];

  const results = CatalogService.search(query, localTracks);

  const GENRE_TAGS = ['Lofi', 'Synthwave', 'Chill', 'Electronic', 'Cyberpunk', 'Ambient'];

  return (
    <div className="space-y-6 pb-36 animate-in fade-in duration-300">
      {/* Search Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Buscar Faixas e Artistas
        </h2>
        <p className="text-sm text-[#8A8A8A]">
          Pesquise no catálogo aberto e em suas faixas locais importadas
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8A8A8A]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="O que você quer ouvir? (Título, artista ou álbum)"
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-[#161616] border border-[#2A2A2A] text-white placeholder-[#666] text-sm sm:text-base focus:outline-none focus:border-[#FF8284] focus:ring-1 focus:ring-[#FF8284] transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#8A8A8A] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Genre Filter Tags */}
      <div className="flex flex-wrap gap-2">
        {GENRE_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setQuery(tag)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#161616] border border-[#262626] text-[#8A8A8A] hover:text-white hover:border-[#FF8284] transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results List */}
      {query.trim() ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#8A8A8A] font-semibold uppercase tracking-wider">
            <span>Resultados ({results.length})</span>
          </div>

          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map((track) => {
                const isCurrent = currentTrack?.id === track.id;
                const isFav = isFavorite(track.id);
                return (
                  <div
                    key={track.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-[#FF8284]/15 border-[#FF8284]/40'
                        : 'bg-[#141414] border-[#222] hover:border-white/20'
                    }`}
                  >
                    <div
                      onClick={() => playTrack(track, results)}
                      className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer group select-none"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                        <img
                          src={track.coverUrl}
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>

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

                    <div className="flex items-center gap-2 pl-3">
                      <button
                        onClick={() => toggleFavorite(track)}
                        className={`p-2 rounded-xl hover:bg-white/5 transition-colors ${
                          isFav ? 'text-[#FF8284]' : 'text-[#8A8A8A] hover:text-white'
                        }`}
                        title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => addToQueue(track)}
                        className="p-2 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors"
                        title="Adicionar à fila"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-[#8A8A8A]">
              <Music2 className="w-12 h-12 stroke-1 text-[#444] mx-auto mb-3" />
              <p className="text-base font-semibold text-white">Nenhum resultado encontrado</p>
              <p className="text-xs text-[#666] mt-1">
                Tente buscar com outros termos ou importe novas faixas locais.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 text-[#8A8A8A]">
          <Search className="w-12 h-12 stroke-1 text-[#444] mx-auto mb-3" />
          <p className="text-base font-semibold text-white">Descubra novas faixas</p>
          <p className="text-xs text-[#666] mt-1 max-w-sm mx-auto">
            Digite o nome de uma música, artista ou selecione uma das categorias acima para começar.
          </p>
        </div>
      )}
    </div>
  );
};
