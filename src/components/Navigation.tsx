import React from 'react';
import { Home, Search, Library, Settings, Music, Upload } from 'lucide-react';

export type TabType = 'home' | 'search' | 'library';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSettings: () => void;
  onOpenImport: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenSettings,
  onOpenImport,
}) => {
  return (
    <>
      {/* Top Header for Desktop & Tablet */}
      <header className="sticky top-0 z-30 w-full border-b border-[#242424] bg-[#0D0D0D]/90 backdrop-blur-md px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8284] to-[#ff5256] flex items-center justify-center shadow-[0_0_15px_rgba(255,130,132,0.4)] group-hover:scale-105 transition-transform">
              <Music className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-wider text-white">KANE</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FF8284]/15 text-[#FF8284] border border-[#FF8284]/30">
                LIVRE & OPEN SOURCE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-2xl border border-[#242424] bg-[#161616]/60 p-1 backdrop-blur-sm">
            <button
              onClick={() => onSelectTab('home')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'home'
                  ? 'bg-[#FF8284] text-black shadow-[0_0_15px_rgba(255,130,132,0.4)]'
                  : 'text-[#8A8A8A] hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4" />
              Início
            </button>
            <button
              onClick={() => onSelectTab('search')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'search'
                  ? 'bg-[#FF8284] text-black shadow-[0_0_15px_rgba(255,130,132,0.4)]'
                  : 'text-[#8A8A8A] hover:text-white hover:bg-white/5'
              }`}
            >
              <Search className="w-4 h-4" />
              Buscar
            </button>
            <button
              onClick={() => onSelectTab('library')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'library'
                  ? 'bg-[#FF8284] text-black shadow-[0_0_15px_rgba(255,130,132,0.4)]'
                  : 'text-[#8A8A8A] hover:text-white hover:bg-white/5'
              }`}
            >
              <Library className="w-4 h-4" />
              Biblioteca
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenImport}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#2A2A2A] bg-[#161616] text-xs md:text-sm font-medium text-white hover:border-[#FF8284] hover:bg-[#FF8284]/10 transition-all shadow-sm"
              title="Importar Músicas e Playlists"
            >
              <Upload className="w-4 h-4 text-[#FF8284]" />
              <span className="hidden sm:inline">Importar</span>
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-xl border border-[#2A2A2A] bg-[#161616] text-[#8A8A8A] hover:text-white hover:border-white/20 transition-all"
              title="Configurações"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0D0D0D]/95 border-t border-[#242424] px-4 py-2 flex items-center justify-around backdrop-blur-lg">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-xs font-medium transition-colors ${
            currentTab === 'home' ? 'text-[#FF8284]' : 'text-[#8A8A8A]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Início</span>
        </button>
        <button
          onClick={() => onSelectTab('search')}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-xs font-medium transition-colors ${
            currentTab === 'search' ? 'text-[#FF8284]' : 'text-[#8A8A8A]'
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Buscar</span>
        </button>
        <button
          onClick={() => onSelectTab('library')}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-xs font-medium transition-colors ${
            currentTab === 'library' ? 'text-[#FF8284]' : 'text-[#8A8A8A]'
          }`}
        >
          <Library className="w-5 h-5" />
          <span>Biblioteca</span>
        </button>
      </nav>
    </>
  );
};
