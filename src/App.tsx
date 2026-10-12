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

  const { errorMessage, clearError } = usePlayer();

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    setSelectedPlaylist(null);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col font-sans selection:bg-[#FF8284] selection:text-black">
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:px-8">
        {selectedPlaylist ? (
          <PlaylistDetailView
            playlist={selectedPlaylist}
            onBack={() => setSelectedPlaylist(null)}
          />
        ) : currentTab === 'home' ? (
          <HomeView
            onOpenPlaylist={setSelectedPlaylist as any}
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
