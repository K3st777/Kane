import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Playlist, Track } from '../types';
import { StorageService } from '../services/storage';
import { CatalogService } from '../services/catalogService';

interface LibraryContextType {
  playlists: Playlist[];
  favorites: Track[];
  history: Track[];
  createPlaylist: (title: string, description?: string) => Playlist;
  deletePlaylist: (playlistId: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  reorderPlaylistTracks: (playlistId: string, fromIndex: number, toIndex: number) => void;
  toggleFavorite: (track: Track) => void;
  isFavorite: (trackId: string) => boolean;
  clearHistory: () => void;
  refreshHistory: () => void;
  importLocalFiles: (files: FileList | File[]) => Promise<Track[]>;
  importM3u: (m3uContent: string, playlistTitle: string) => Playlist;
  importJson: (jsonContent: string) => Playlist | null;
}

const LibraryContext = createContext<LibraryContextType | null>(null);

export const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>(() => StorageService.getPlaylists());
  const [favorites, setFavorites] = useState<Track[]>(() => StorageService.getFavorites());
  const [history, setHistory] = useState<Track[]>(() => StorageService.getHistory());

  // Save changes
  useEffect(() => {
    StorageService.savePlaylists(playlists);
  }, [playlists]);

  useEffect(() => {
    StorageService.saveFavorites(favorites);
  }, [favorites]);

  const refreshHistory = useCallback(() => {
    setHistory(StorageService.getHistory());
  }, []);

  const createPlaylist = useCallback((title: string, description?: string): Playlist => {
    const newPlaylist: Playlist = {
      id: `pl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim() || 'Nova Playlist',
      description: description || 'Playlist criada pelo usuário',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      tracks: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setPlaylists(prev => [newPlaylist, ...prev]);
    return newPlaylist;
  }, []);

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
  }, []);

  const addTrackToPlaylist = useCallback((playlistId: string, track: Track) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id === playlistId) {
          if (p.tracks.some(t => t.id === track.id)) return p;
          return {
            ...p,
            tracks: [...p.tracks, track],
            updatedAt: Date.now(),
          };
        }
        return p;
      })
    );
  }, []);

  const removeTrackFromPlaylist = useCallback((playlistId: string, trackId: string) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id === playlistId) {
          return {
            ...p,
            tracks: p.tracks.filter(t => t.id !== trackId),
            updatedAt: Date.now(),
          };
        }
        return p;
      })
    );
  }, []);

  const reorderPlaylistTracks = useCallback((playlistId: string, fromIndex: number, toIndex: number) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id === playlistId) {
          const updated = [...p.tracks];
          const [moved] = updated.splice(fromIndex, 1);
          updated.splice(toIndex, 0, moved);
          return {
            ...p,
            tracks: updated,
            updatedAt: Date.now(),
          };
        }
        return p;
      })
    );
  }, []);

  const toggleFavorite = useCallback((track: Track) => {
    setFavorites(prev => {
      const exists = prev.some(t => t.id === track.id);
      if (exists) {
        return prev.filter(t => t.id !== track.id);
      } else {
        return [{ ...track, dateAdded: Date.now() }, ...prev];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (trackId: string) => {
      return favorites.some(t => t.id === trackId);
    },
    [favorites]
  );

  const clearHistory = useCallback(() => {
    StorageService.clearHistory();
    setHistory([]);
  }, []);

  const importLocalFiles = useCallback(async (files: FileList | File[]): Promise<Track[]> => {
    const imported: Track[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|flac|m4a|aac)$/i)) {
        const objectUrl = URL.createObjectURL(file);
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        const parts = nameWithoutExt.split(' - ');
        const artist = parts.length > 1 ? parts[0].trim() : 'Arquivo Local';
        const title = parts.length > 1 ? parts.slice(1).join(' - ').trim() : nameWithoutExt;

        const newTrack: Track = {
          id: `local-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
          title,
          artist,
          duration: 180,
          audioUrl: objectUrl,
          coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
          source: 'local',
          dateAdded: Date.now(),
        };
        imported.push(newTrack);
      }
    }

    if (imported.length > 0) {
      // Create or add to a "Faixas Locais" playlist
      setPlaylists(prev => {
        const localPl = prev.find(p => p.title === 'Músicas Locais');
        if (localPl) {
          return prev.map(p => p.id === localPl.id ? { ...p, tracks: [...p.tracks, ...imported] } : p);
        } else {
          const created: Playlist = {
            id: `pl-local-${Date.now()}`,
            title: 'Músicas Locais',
            description: 'Arquivos de áudio importados do seu dispositivo',
            coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
            tracks: imported,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          return [created, ...prev];
        }
      });
    }

    return imported;
  }, []);

  const importM3u = useCallback((m3uContent: string, playlistTitle: string): Playlist => {
    const tracks = CatalogService.parseM3U(m3uContent);
    const pl: Playlist = {
      id: `pl-m3u-${Date.now()}`,
      title: playlistTitle || 'Playlist M3U Importada',
      description: `Importada com ${tracks.length} faixa(s)`,
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      tracks,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setPlaylists(prev => [pl, ...prev]);
    return pl;
  }, []);

  const importJson = useCallback((jsonContent: string): Playlist | null => {
    const pl = CatalogService.parseJsonPlaylist(jsonContent);
    if (pl) {
      setPlaylists(prev => [pl, ...prev]);
      return pl;
    }
    return null;
  }, []);

  return (
    <LibraryContext.Provider
      value={{
        playlists,
        favorites,
        history,
        createPlaylist,
        deletePlaylist,
        addTrackToPlaylist,
        removeTrackFromPlaylist,
        reorderPlaylistTracks,
        toggleFavorite,
        isFavorite,
        clearHistory,
        refreshHistory,
        importLocalFiles,
        importM3u,
        importJson,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary deve ser utilizado dentro de um LibraryProvider');
  }
  return context;
};
