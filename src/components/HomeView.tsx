import React, { useState } from 'react';
import { Play, Sparkles, Flame, Clock, Music, ExternalLink, Radio, Shuffle } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { CatalogService } from '../services/catalogService';
import { YouTubeMusicService } from '../services/youtubeMusicService';
import { THEME_ACCENTS } from '../utils/theme';
import { Playlist } from '../types';

interface HomeViewProps {
  onOpenPlaylist: (playlist: Playlist) => void;
  onOpenImport: () => void;
  onOpenApkModal?: () => void;
}

const CATEGORIES = ['Tudo', 'YouTube Music', 'Trap & Rap', 'Pop Global', 'Lo-Fi Chill'] as const;

export const HomeView: React.FC<HomeViewProps> = ({ onOpenImport }) => {
  const { playTrack, currentTrack, accentColor } = usePlayer();
  const theme = THEME_ACCENTS[accentColor];
  const allTracks = CatalogService.getFeaturedTracks();
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('Tudo');

  const filteredTracks = allTracks.filter((track) => {
    if (activeCategory === 'Tudo') return true;
    if (activeCategory === 'YouTube Music') return track.source === 'youtube' || Boolean(track.youtubeId);
    if (activeCategory === 'Trap & Rap')
      return (
        track.artist.toLowerCase().includes('mat') ||
        track.artist.toLowerCase().includes('travis') ||
        track.artist.toLowerCase().includes('kendrick')
      );
    if (activeCategory === 'Pop Global')
      return (
        track.artist.toLowerCase().includes('weeknd') ||
        track.artist.toLowerCase().includes('billie') ||
        track.artist.toLowerCase().includes('sabrina') ||
        track.artist.toLowerCase().includes('gaga')
      );
    if (activeCategory === 'Lo-Fi Chill')
      return track.title.toLowerCase().includes('lofi') || track.title.toLowerCase().includes('synthwave');
    return true;
  });

  const handlePlayAll = () => {
    if (filteredTracks.length > 0) {
      playTrack(filteredTracks[0], filteredTracks);
    }
  };

  const handleShufflePlay = () => {
    if (filteredTracks.length > 0) {
      const randomIdx = Math.floor(Math.random() * filteredTracks.length);
      playTrack(filteredTracks[randomIdx], filteredTracks);
    }
  };

  return (
    <div className="space-y-8 pb-36 animate-in fade-in duration-300">
      {/* Category Filter Pills (Mobile Native Style) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-1">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isSelected
                  ? `bg-white text-black shadow-md scale-105`
                  : 'bg-zinc-900/70 border border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Hero Launcher Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-zinc-950/80 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl">
        <div
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40 transition-all"
          style={{ backgroundColor: theme.primaryHex }}
        />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-[11px] font-extrabold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Lançador YouTube Music Oficial
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
            Seu Som no Estilo Máximo.
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
            Catálogo completo com streaming do YouTube Music, motor sonoro com equalizador de estúdio,
            efeito *Slowed & Speed Up* em tempo real e interface fluida AMOLED.
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePlayAll}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r ${theme.gradient} text-black font-extrabold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg`}
              style={{ boxShadow: `0 0 20px ${theme.glow}` }}
            >
              <Play className="w-4 h-4 fill-current" />
              Tocar Tudo
            </button>

            <button
              onClick={handleShufflePlay}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-zinc-900/80 border border-white/10 text-white text-xs sm:text-sm font-semibold hover:border-white/25 active:scale-95 transition-all"
            >
              <Shuffle className="w-4 h-4" />
              Aleatório
            </button>

            <button
              onClick={onOpenImport}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-zinc-900/80 border border-white/10 text-zinc-300 text-xs sm:text-sm font-semibold hover:text-white hover:border-white/25 active:scale-95 transition-all"
            >
              Importar Áudio
            </button>
          </div>
        </div>
      </div>

      {/* Catálogo em Alta */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Hits do YouTube Music
            </h2>
          </div>
          <span className="text-[11px] text-zinc-400 font-semibold">Streaming Direto</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTracks.map((track) => {
            const isCurrent = currentTrack?.id === track.id;
            const isYt = track.source === 'youtube' || Boolean(track.youtubeId);

            return (
              <div
                key={track.id}
                onClick={() => playTrack(track, filteredTracks)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                  isCurrent
                    ? `${theme.border} bg-white/[0.08] shadow-lg`
                    : 'bg-zinc-950/60 border-white/[0.06] hover:border-white/20 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                        isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Play className="w-5 h-5 text-white fill-current" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3
                        className={`text-xs sm:text-sm font-bold truncate ${
                          isCurrent ? theme.text : 'text-white'
                        }`}
                      >
                        {track.title}
                      </h3>
                      {isYt && (
                        <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-red-600/30 text-red-400 border border-red-500/30">
                          YT
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">{track.artist}</p>
                    <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
                      {Math.floor(track.duration / 60)}:
                      {track.duration % 60 < 10 ? '0' : ''}
                      {track.duration % 60}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pl-2">
                  {isYt && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        YouTubeMusicService.openInOfficialApp(track);
                      }}
                      className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                      title="Abrir no YouTube Music Oficial"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}

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
              </div>
            );
          })}
        </div>
      </div>

      {/* Recursos de Estúdio Kane */}
      <div className="rounded-3xl border border-white/[0.08] bg-zinc-950/60 backdrop-blur-2xl p-5 sm:p-7">
        <h3 className="text-sm sm:text-base font-extrabold text-white mb-4 flex items-center gap-2">
          <Radio className={`w-4 h-4 ${theme.text}`} /> Recursos de Estúdio Kane
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5">
            <div className={`w-7 h-7 rounded-xl ${theme.bg}/20 border ${theme.border} flex items-center justify-center ${theme.text} mb-2.5`}>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Equalizador Paramétrico</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              5 bandas de frequência (60Hz a 12kHz) com predefinições acústicas e Bass Boost.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5">
            <div className={`w-7 h-7 rounded-xl ${theme.bg}/20 border ${theme.border} flex items-center justify-center ${theme.text} mb-2.5`}>
              <Clock className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Slowed & Speed Up</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Acelere ou desacelere qualquer música em tempo real com preservação de tom vocal.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5">
            <div className={`w-7 h-7 rounded-xl ${theme.bg}/20 border ${theme.border} flex items-center justify-center ${theme.text} mb-2.5`}>
              <Music className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Letras Sincronizadas</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Rolagem milissegundo a milissegundo com salto instantâneo na música ao tocar na estrofe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
