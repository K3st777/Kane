import { Track } from '../types';

export interface YTSearchItem {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  coverUrl: string;
  youtubeId: string;
}

export const YTMUSIC_FEATURED_TRACKS: Track[] = [
  {
    id: 'yt-die-with-a-smile',
    youtubeId: 'kPa7bsKwL-8',
    title: 'Die With A Smile',
    artist: 'Lady Gaga & Bruno Mars',
    album: 'Die With A Smile - Single',
    duration: 251,
    audioUrl: '',
    coverUrl: 'https://img.youtube.com/vi/kPa7bsKwL-8/hqdefault.jpg',
    source: 'youtube',
    quality: 'yt-stream',
    lyrics: `[00:00.00]Die With A Smile - Lady Gaga & Bruno Mars
[00:09.12]I, I just woke up from a dream
[00:15.54]Where you and I had to say goodbye
[00:23.01]And I don't know what it all means
[00:29.84]But since I survived, I realized
[00:36.50]Wherever you go, that's where I'll follow
[00:43.20]Nobody's promised tomorrow
[00:49.95]So I'mma love you every night like it's the last night
[00:54.12]Like it's the last night
[00:56.88]If the world was ending, I'd wanna be next to you
[01:03.54]If the party was over and our time on Earth was through
[01:10.85]I'd wanna hold you just for a while
[01:14.92]And die with a smile
[01:17.85]If the world was ending, I'd wanna be next to you`,
  },
  {
    id: 'yt-birds-of-a-feather',
    youtubeId: 'V9PVRfjEBTI',
    title: 'BIRDS OF A FEATHER',
    artist: 'Billie Eilish',
    album: 'HIT ME HARD AND SOFT',
    duration: 196,
    audioUrl: '',
    coverUrl: 'https://img.youtube.com/vi/V9PVRfjEBTI/hqdefault.jpg',
    source: 'youtube',
    quality: 'yt-stream',
    lyrics: `[00:00.00]BIRDS OF A FEATHER - Billie Eilish
[00:07.45]I want you to stay 'til I'm in the grave
[00:12.60]'Til I rot away, dead and buried
[00:16.80]'Til I'm in the casket you carry
[00:21.15]If you go, I'm going too, uh
[00:25.80]'Cause it was always you, alright
[00:30.12]And if I'm turning blue, please don't save me
[00:34.90]Nothing in this world to persuade me
[00:39.10]Birds of a feather, we should stick together, I know
[00:43.50]I said I'd never think I wasn't better alone
[00:48.20]Can't change the weather, might not be forever
[00:52.50]But if it's forever, it's even better`,
  },
  {
    id: 'yt-blinding-lights',
    youtubeId: '4NRXx6U8ABQ',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    audioUrl: '',
    coverUrl: 'https://img.youtube.com/vi/4NRXx6U8ABQ/hqdefault.jpg',
    source: 'youtube',
    quality: 'yt-stream',
    lyrics: `[00:00.00]Blinding Lights - The Weeknd
[00:27.10]Yeah, I've been trying to call
[00:31.50]I've been on my own for long enough
[00:36.40]Maybe you can show me how to love, maybe
[00:44.20]I'm going through withdrawals
[00:48.80]You don't even have to do too much
[00:53.60]You can turn me on with just a touch, baby
[01:01.20]I look around and Sin City's cold and empty
[01:05.80]No one's around to judge me
[01:09.90]I can't see clearly when you're gone
[01:14.60]I said, ooh, I'm blinded by the lights
[01:21.80]No, I can't sleep until I feel your touch`,
  },
  {
    id: 'yt-espresso',
    youtubeId: 'eVli-tstM5E',
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    album: 'Short n Sweet',
    duration: 175,
    audioUrl: '',
    coverUrl: 'https://img.youtube.com/vi/eVli-tstM5E/hqdefault.jpg',
    source: 'youtube',
    quality: 'yt-stream',
    lyrics: `[00:00.00]Espresso - Sabrina Carpenter
[00:09.12]Now he's thinkin' 'bout me every night, oh
[00:13.50]Is it that sweet? I guess so
[00:17.80]Say you can't sleep, baby, I know
[00:22.10]That's that me, espresso
[00:26.50]Move it up, down, left, right, oh
[00:30.80]Switch it up like Nintendo
[00:35.10]Say you can't sleep, baby, I know
[00:39.40]That's that me, espresso`,
  },
  {
    id: 'yt-not-like-us',
    youtubeId: 'H58vbez_m4E',
    title: 'Not Like Us',
    artist: 'Kendrick Lamar',
    album: 'Not Like Us',
    duration: 274,
    audioUrl: '',
    coverUrl: 'https://img.youtube.com/vi/H58vbez_m4E/hqdefault.jpg',
    source: 'youtube',
    quality: 'yt-stream',
    lyrics: `[00:00.00]Not Like Us - Kendrick Lamar
[00:15.20]Psst, I see dead people
[00:20.10]Mustard on the beat, ho
[00:22.50]Ayy, Mustard on the beat, ho
[00:25.40]De-de-de-de, yeah, they not like us
[00:28.10]They not like us, they not like us
[00:31.20]They not like us, they not like us`,
  },
  {
    id: 'yt-fein',
    youtubeId: 'B9synWjqBn8',
    title: 'FE!N (feat. Playboi Carti)',
    artist: 'Travis Scott',
    album: 'UTOPIA',
    duration: 191,
    audioUrl: '',
    coverUrl: 'https://img.youtube.com/vi/B9synWjqBn8/hqdefault.jpg',
    source: 'youtube',
    quality: 'yt-stream',
    lyrics: `[00:00.00]FE!N - Travis Scott ft. Playboi Carti
[00:14.30]Just come outside, for the night
[00:19.40]Take your time, get your light
[00:24.50]Johnny Dang, yeah
[00:27.20]FE!N, FE!N, FE!N, FE!N, FE!N
[00:30.80]FE!N, FE!N, FE!N, FE!N, FE!N
[00:34.20]FE!N, FE!N, FE!N, FE!N, FE!N`,
  },
  {
    id: 'yt-matue-filho-da-noite',
    youtubeId: '6sD-T61b62M',
    title: 'Filho da Noite',
    artist: 'Matuê (part. Veigh)',
    album: '333',
    duration: 185,
    audioUrl: '',
    coverUrl: 'https://img.youtube.com/vi/6sD-T61b62M/hqdefault.jpg',
    source: 'youtube',
    quality: 'yt-stream',
    lyrics: `[00:00.00]Filho da Noite - Matuê ft. Veigh
[00:08.50]333, você sabe o caminho
[00:14.20]Filho da noite não anda sozinho
[00:20.50]Brilha na sombra, diamante no dente
[00:26.80]Fazendo grana pra toda minha gente`,
  },
  {
    id: 'yt-lofi-beats',
    youtubeId: '4xDzrJKXOOY',
    title: 'Synthwave Radio - Chill / Synth Beats',
    artist: 'Lofi Girl',
    album: 'Synthwave Beats 24/7',
    duration: 360,
    audioUrl: '',
    coverUrl: 'https://img.youtube.com/vi/4xDzrJKXOOY/hqdefault.jpg',
    source: 'youtube',
    quality: 'yt-stream',
    lyrics: `[00:00.00]Instrumental Lo-Fi Chill Beats
[00:30.00]♪ Relaxando na batida do sintetizador ♪
[01:30.00]♪ Foco, tranquilidade e som imersivo ♪`,
  },
];

export class YouTubeMusicService {
  /**
   * Extrai o ID do vídeo a partir de uma URL ou texto do YouTube / YouTube Music
   */
  public static extractVideoId(input: string): string | null {
    if (!input) return null;
    const clean = input.trim();

    // ID direto de 11 caracteres
    if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
      return clean;
    }

    // URL do YouTube Music ou YouTube
    const ytMatch = clean.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|music\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch && ytMatch[1]) {
      return ytMatch[1];
    }

    return null;
  }

  /**
   * Busca no catálogo do YouTube Music e iTunes
   */
  public static async search(query: string): Promise<Track[]> {
    if (!query || query.trim().length === 0) {
      return YTMUSIC_FEATURED_TRACKS;
    }

    const trimmed = query.trim();

    // 1. Verificar se é uma URL direta ou Video ID
    const directId = this.extractVideoId(trimmed);
    if (directId) {
      return [
        {
          id: `yt-${directId}`,
          youtubeId: directId,
          title: `Vídeo ${directId}`,
          artist: 'YouTube Music',
          album: 'Single / Stream',
          duration: 210,
          audioUrl: '',
          coverUrl: `https://img.youtube.com/vi/${directId}/hqdefault.jpg`,
          source: 'youtube',
          quality: 'yt-stream',
        },
      ];
    }

    // 2. Busca no catálogo local do Kane
    const localMatches = YTMUSIC_FEATURED_TRACKS.filter(
      (t) =>
        t.title.toLowerCase().includes(trimmed.toLowerCase()) ||
        t.artist.toLowerCase().includes(trimmed.toLowerCase())
    );

    // 3. Busca dinâmica via iTunes Search API para metadados ricos de alta definição
    try {
      const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(
        trimmed
      )}&entity=song&limit=12`;
      const response = await fetch(itunesUrl);
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const apiTracks: Track[] = data.results.map((item: {
            trackId: number;
            trackName: string;
            artistName: string;
            collectionName?: string;
            trackTimeMillis: number;
            artworkUrl100: string;
            previewUrl?: string;
          }) => {
            const highResArt = item.artworkUrl100
              ? item.artworkUrl100.replace('100x100bb', '600x600bb')
              : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80';

            return {
              id: `online-${item.trackId}`,
              title: item.trackName,
              artist: item.artistName,
              album: item.collectionName || 'Single',
              duration: Math.round((item.trackTimeMillis || 180000) / 1000),
              audioUrl: item.previewUrl || '',
              coverUrl: highResArt,
              source: 'stream',
              quality: '256k',
            };
          });

          // Combinar resultados locais e da busca
          const combined = [...localMatches];
          for (const t of apiTracks) {
            if (!combined.some((c) => c.title.toLowerCase() === t.title.toLowerCase())) {
              combined.push(t);
            }
          }
          return combined;
        }
      }
    } catch {
      // Retorna catálogo local em caso de offline
    }

    return localMatches.length > 0 ? localMatches : YTMUSIC_FEATURED_TRACKS;
  }

  /**
   * Abre a música no aplicativo oficial ou web do YouTube Music
   */
  public static openInOfficialApp(track: Track) {
    if (track.youtubeId) {
      const url = `https://music.youtube.com/watch?v=${track.youtubeId}`;
      window.open(url, '_blank');
    } else {
      const searchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(
        `${track.title} ${track.artist}`
      )}`;
      window.open(searchUrl, '_blank');
    }
  }
}
