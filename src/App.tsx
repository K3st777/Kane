import React, { useState } from 'react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { LibraryProvider } from './context/LibraryContext';
import { Navigation, TabType } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { LibraryView } from './components/LibraryView';
import { PlaylistDetailView } from './components/PlaylistDetailView';
import { MiniPlayer } from './components/MiniPlayer';
import { FullScreenPlayer } from './components/FullScreenPlayer';
import { EqualizerModal } from './components/EqualizerModal';
import { LyricsModal } from './components/LyricsModal';
import { QueueModal } from './components/QueueModal';
import { SettingsModal } from './components/SettingsModal';
import { ImportModal } from './components/ImportModal';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { Playlist } from './types';
import { THEME_ACCENTS } from './utils/theme';
import { AlertCircle, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  // Modals state
  const [isFullScreenPlayer, setIsFullScreenPlayer] = useState(false);
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);

  const { errorMessage, clearError, accentColor, ambientGlow } = usePlayer();
  const theme = THEME_ACCENTS[accentColor];

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    setSelectedPlaylist(null);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-white selection:text-black">
      {/* Dynamic Background Ambient Light */}
      {ambientGlow && (
        <div
          className="fixed -top-40 -left-40 w-96 h-96 rounded-full blur-[130px] pointer-events-none opacity-20 z-0 transition-all duration-700"
          style={{ backgroundColor: theme.primaryHex }}
        />
      )}

      {/* Top Header Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenImport={() => setIsImportOpen(true)}
        onOpenApkModal={() => setIsApkModalOpen(true)}
      />

      {/* Error Toast Notification if any */}
      {errorMessage && (
        <div className="fixed top-16 left-4 right-4 md:left-auto md:right-8 z-50 max-w-md bg-red-950/90 border border-red-500/50 rounded-2xl p-4 shadow-2xl flex items-start justify-between gap-3 backdrop-blur-md animate-in slide-in-from-top-4">
          <div className="flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={clearError} className="text-red-300 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container Views */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 md:px-8 relative z-10">
        {selectedPlaylist ? (
          <PlaylistDetailView
            playlist={selectedPlaylist}
            onBack={() => setSelectedPlaylist(null)}
          />
        ) : currentTab === 'home' ? (
          <HomeView
            onOpenPlaylist={setSelectedPlaylist as (playlist: Playlist) => void}
            onOpenImport={() => setIsImportOpen(true)}
            onOpenApkModal={() => setIsApkModalOpen(true)}
          />
        ) : currentTab === 'search' ? (
          <SearchView />
        ) : (
          <LibraryView
            onSelectPlaylist={(pl) => setSelectedPlaylist(pl)}
            onOpenImport={() => setIsImportOpen(true)}
          />
        )}
      </main>

      {/* Bottom Floating Mini Player */}
      <MiniPlayer onExpand={() => setIsFullScreenPlayer(true)} />

      {/* Full Screen Player Modal */}
      <FullScreenPlayer
        isOpen={isFullScreenPlayer}
        onClose={() => setIsFullScreenPlayer(false)}
        onOpenEqualizer={() => setIsEqualizerOpen(true)}
        onOpenLyrics={() => setIsLyricsOpen(true)}
        onOpenQueue={() => setIsQueueOpen(true)}
      />

      {/* Ancillary Modals */}
      <EqualizerModal
        isOpen={isEqualizerOpen}
        onClose={() => setIsEqualizerOpen(false)}
      />

      <LyricsModal
        isOpen={isLyricsOpen}
        onClose={() => setIsLyricsOpen(false)}
      />

      <QueueModal
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />

      <ApkDownloadModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LibraryProvider>
      <PlayerProvider>
        <MainLayout />
      </PlayerProvider>
    </LibraryProvider>
  );
};

export default App;
