import React, { useState, useEffect } from 'react';
import { Search, X, Play, Plus, Heart, Music2, ExternalLink, Loader2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';
import { YouTubeMusicService, YTMUSIC_FEATURED_TRACKS } from '../services/youtubeMusicService';
import { Track } from '../types';
import { THEME_ACCENTS } from '../utils/theme';

export const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>(YTMUSIC_FEATURED_TRACKS);
  const [isLoading, setIsLoading] = useState(false);
  const { playTrack, addToQueue, currentTrack, accentColor } = usePlayer();
  const { isFavorite, toggleFavorite } = useLibrary();
  const theme = THEME_ACCENTS[accentColor];

  // Search debouncing
  useEffect(() => {
    if (!query.trim()) {
      setResults(YTMUSIC_FEATURED_TRACKS);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const found = await YouTubeMusicService.search(query);
        setResults(found);
      } catch {
        // fallback
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const QUICK_TAGS = [
    'The Weeknd',
    'Billie Eilish',
    'Matuê',
    'Lady Gaga',
    'Travis Scott',
    'Lo-Fi Beats',
  ];

  return (
    <div className="space-y-6 pb-36 animate-in fade-in duration-300">
      {/* Search Header */}
      <div>
        <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight mb-1">
          Explorar YouTube Music
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Pesquise por milhões de músicas, artistas, álbuns ou cole um link do YouTube
        </p>
      </div>

      {/* Search Input (Native Mobile Pill) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
          {isLoading ? (
            <Loader2 className={`w-5 h-5 animate-spin ${theme.text}`} />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar no YouTube Music ou colar URL / Video ID..."
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-zinc-950/70 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm backdrop-blur-xl focus:outline-none focus:border-white/30 transition-all shadow-inner"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Suggestion Tags */}
      <div className="flex flex-wrap gap-2">
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setQuery(tag)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-900/60 border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/20 active:scale-95 transition-all shadow-sm"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[11px] text-zinc-400 font-bold uppercase tracking-wider">
          <span>{query.trim() ? `Resultados (${results.length})` : 'Destaques Sugeridos'}</span>
        </div>

        {results.length > 0 ? (
          <div className="space-y-2">
            {results.map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              const isFav = isFavorite(track.id);
              const isYt = track.source === 'youtube' || Boolean(track.youtubeId);

              return (
                <div
                  key={track.id}
                  className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? `${theme.border} bg-white/[0.08] shadow-md`
                      : 'bg-zinc-950/60 border-white/[0.06] hover:border-white/20 hover:bg-zinc-900/60'
                  }`}
                >
                  <div
                    onClick={() => playTrack(track, results)}
                    className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer group select-none"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
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

                  <div className="flex items-center gap-1 pl-2">
                    {isYt && (
                      <button
                        onClick={() => YouTubeMusicService.openInOfficialApp(track)}
                        className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Abrir no YouTube Music Oficial"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => toggleFavorite(track)}
                      className={`p-2 rounded-xl hover:bg-white/5 transition-colors ${
                        isFav ? theme.text : 'text-zinc-400 hover:text-white'
                      }`}
                      title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => addToQueue(track)}
                      className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
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
          <div className="text-center py-12 text-zinc-400">
            <Music2 className="w-10 h-10 stroke-1 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-white">Nenhum resultado encontrado</p>
            <p className="text-xs text-zinc-500 mt-1">
              Tente buscar por outro artista ou cole um link direto do YouTube Music.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
