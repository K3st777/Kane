import { Track, LyricLine, Playlist } from '../types';

export const FEATURED_TRACKS: Track[] = [
  {
    id: 'kane-track-1',
    title: 'Neon Horizon (Slowed & Reverb)',
    artist: 'Night City Syndicate',
    album: 'Cyber Dreams Vol. 1',
    duration: 184,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    source: 'stream',
    lyrics: `[00:00.00]Neon lights reflected in the dark
[00:08.50]Driving through the empty city boulevard
[00:16.00]Shadows in the rear view, memories behind
[00:25.00]Searching for a signal that we cannot find
[00:34.00]Electric pulse, moving with the beat
[00:43.00]Running through the wires under cold concrete
[00:52.00]Take my hand, let the sound take over
[01:02.00]Until the night is done, until we're older`,
  },
  {
    id: 'kane-track-2',
    title: 'Midnight Echoes',
    artist: 'Aether Wave',
    album: 'Deep Reverie',
    duration: 142,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-abstract-intention-12099.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    source: 'stream',
    lyrics: `[00:00.00]Echoes in the quiet room
[00:12.00]Drifting beneath the silver moon
[00:24.00]Time slows down when the rhythm begins
[00:36.00]Wash away the noise, wash away the winds`,
  },
  {
    id: 'kane-track-3',
    title: 'Sunset Boulevard (Speed Up)',
    artist: 'Retrograde Pulse',
    album: 'Analog Memories',
    duration: 165,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=electronic-future-beats-117997.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    source: 'stream',
    lyrics: `[00:00.00]Speeding on the highway lane
[00:10.00]Clear skies after the rain
[00:20.00]Keep the rhythm on repeat
[00:30.00]Nothing can stop our feet`,
  },
  {
    id: 'kane-track-4',
    title: 'Obsidian Velvet',
    artist: 'Vespera',
    album: 'Nocturne Essence',
    duration: 198,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_c9769dae85.mp3?filename=smoke-143172.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    source: 'stream',
    lyrics: `[00:00.00]Soft velvet in the gloom
[00:15.00]Bass resonates in the room
[00:30.00]Close your eyes and breathe it in
[00:45.00]Where the dark and sound begin`,
  },
  {
    id: 'kane-track-5',
    title: 'Solar Flare',
    artist: 'Nova Drift',
    album: 'Stellar Synthesis',
    duration: 172,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=glossy-168156.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    source: 'stream',
    lyrics: `[00:00.00]Blinding light across the sky
[00:12.00]Watch the stars as they fly by
[00:24.00]Solar heat and endless sound
[00:36.00]Lift our feet right off the ground`,
  }
];

export class CatalogService {
  public static getFeaturedTracks(): Track[] {
    return FEATURED_TRACKS;
  }

  public static search(query: string, localTracks: Track[] = []): Track[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const all = [...localTracks, ...FEATURED_TRACKS];
    const seen = new Set<string>();

    return all.filter(t => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return (
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        (t.album && t.album.toLowerCase().includes(q))
      );
    });
  }

  public static parseLrc(lrcText?: string): LyricLine[] {
    if (!lrcText) return [];
    const lines = lrcText.split('\n');
    const result: LyricLine[] = [];
    const timeRegex = /\[(\d{2}):(\d{2}(?:\.\d{2,3})?)\]/g;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      let match;
      const timestamps: number[] = [];

      while ((match = timeRegex.exec(line)) !== null) {
        const min = parseInt(match[1], 10);
        const sec = parseFloat(match[2]);
        timestamps.push(Math.round((min * 60 + sec) * 1000));
      }

      const text = line.replace(/\[\d{2}:\d{2}(?:\.\d{2,3})?\]/g, '').trim();
      if (text) {
        for (const t of timestamps) {
          result.push({ timeMs: t, text });
        }
      }
    }

    return result.sort((a, b) => a.timeMs - b.timeMs);
  }

  public static parseM3U(content: string): Track[] {
    const lines = content.split('\n');
    const tracks: Track[] = [];
    let currentTitle = 'Faixa Importada';
    let currentArtist = 'Artista Desconhecido';

    for (const raw of lines) {
      const line = raw.trim();
      if (!line) continue;

      if (line.startsWith('#EXTINF:')) {
        const parts = line.substring(8).split(',');
        if (parts.length > 1) {
          const info = parts.slice(1).join(',').split(' - ');
          if (info.length > 1) {
            currentArtist = info[0].trim();
            currentTitle = info.slice(1).join(' - ').trim();
          } else {
            currentTitle = parts[1].trim();
          }
        }
      } else if (!line.startsWith('#')) {
        tracks.push({
          id: `imported-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          title: currentTitle,
          artist: currentArtist,
          duration: 180,
          audioUrl: line,
          coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
          source: 'imported',
        });
        currentTitle = 'Faixa Importada';
        currentArtist = 'Artista Desconhecido';
      }
    }
    return tracks;
  }

  public static parseJsonPlaylist(jsonContent: string): Playlist | null {
    try {
      const data = JSON.parse(jsonContent);
      if (data && data.title && Array.isArray(data.tracks)) {
        return {
          id: data.id || `pl-${Date.now()}`,
          title: data.title,
          description: data.description || 'Importada via arquivo JSON',
          coverUrl: data.coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
          tracks: data.tracks,
          createdAt: data.createdAt || Date.now(),
          updatedAt: Date.now(),
        };
      }
    } catch {
      return null;
    }
    return null;
  }
}
