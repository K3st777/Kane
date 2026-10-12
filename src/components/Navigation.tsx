import React from 'react';
import { Home, Compass, Library, SlidersHorizontal, Upload } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { THEME_ACCENTS } from '../utils/theme';

export type TabType = 'home' | 'search' | 'library';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSettings: () => void;
  onOpenImport: () => void;
  onOpenApkModal?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenSettings,
  onOpenImport,
}) => {
  const { accentColor } = usePlayer();
  const theme = THEME_ACCENTS[accentColor];

  return (
    <>
      {/* Top App Bar Header */}
      <header className="sticky top-0 z-30 w-full px-4 pt-3 pb-3 md:px-8 bg-black/40 backdrop-blur-2xl border-b border-white/[0.06] transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & App Title */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div
              className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 active:scale-95`}
              style={{ boxShadow: `0 0 20px ${theme.glow}` }}
            >
              <div className="w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base md:text-lg tracking-wider text-white">
                  KANE
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  YT MUSIC
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Tab Selector */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-full bg-zinc-900/60 p-1.5 border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => onSelectTab('home')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                currentTab === 'home'
                  ? `bg-gradient-to-r ${theme.gradient} text-black font-bold shadow-md`
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4" />
              Início
            </button>
            <button
              onClick={() => onSelectTab('search')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                currentTab === 'search'
                  ? `bg-gradient-to-r ${theme.gradient} text-black font-bold shadow-md`
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4" />
              Explorar YT Music
            </button>
            <button
              onClick={() => onSelectTab('library')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                currentTab === 'library'
                  ? `bg-gradient-to-r ${theme.gradient} text-black font-bold shadow-md`
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Library className="w-4 h-4" />
              Biblioteca
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenImport}
              className="p-2.5 rounded-2xl bg-zinc-900/60 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 hover:bg-zinc-800/80 active:scale-95 transition-all shadow-sm"
              title="Importar Áudio / Playlists"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-2xl bg-zinc-900/60 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 hover:bg-zinc-800/80 active:scale-95 transition-all shadow-sm"
              title="Personalização & Ajustes"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Frosted Glass Bottom Navigation Bar (Mobile Native App Look) */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto rounded-full bg-zinc-950/80 border border-white/[0.12] backdrop-blur-3xl px-3 py-2 flex items-center justify-around shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-full transition-all ${
            currentTab === 'home'
              ? `${theme.text} scale-105 font-bold`
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] tracking-tight">Início</span>
        </button>

        <button
          onClick={() => onSelectTab('search')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-full transition-all ${
            currentTab === 'search'
              ? `${theme.text} scale-105 font-bold`
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Compass className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] tracking-tight">Explorar</span>
        </button>

        <button
          onClick={() => onSelectTab('library')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-full transition-all ${
            currentTab === 'library'
              ? `${theme.text} scale-105 font-bold`
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Library className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] tracking-tight">Biblioteca</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center gap-1 py-1 px-4 rounded-full text-zinc-400 hover:text-zinc-200 transition-all active:scale-95"
        >
          <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] tracking-tight">Ajustes</span>
        </button>
      </nav>
    </>
  );
};
