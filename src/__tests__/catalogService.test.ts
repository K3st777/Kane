import { describe, it, expect } from 'vitest';
import { CatalogService } from '../services/catalogService';

describe('CatalogService - Parser de Letras LRC e M3U', () => {
  it('deve decodificar letras sincronizadas no formato LRC com precisão de milissegundos', () => {
    const lrc = `
[00:05.50]Primeira linha da letra
[00:12.00]Segunda linha da letra
[01:05.25]Refrão emocionante
    `.trim();

    const result = CatalogService.parseLrc(lrc);
    expect(result).toHaveLength(3);
    expect(result[0].timeMs).toBe(5500);
    expect(result[0].text).toBe('Primeira linha da letra');
    expect(result[1].timeMs).toBe(12000);
    expect(result[1].text).toBe('Segunda linha da letra');
    expect(result[2].timeMs).toBe(65250);
    expect(result[2].text).toBe('Refrão emocionante');
  });

  it('deve retornar array vazio para texto de letras ausente ou vazio', () => {
    expect(CatalogService.parseLrc('')).toEqual([]);
    expect(CatalogService.parseLrc(undefined)).toEqual([]);
  });

  it('deve parsear listas de reprodução M3U com metadados e URLs', () => {
    const m3u = `
#EXTM3U
#EXTINF:210,Daft Punk - Around The World
https://example.com/audio1.mp3
#EXTINF:180,Nightcall - Kavinsky
https://example.com/audio2.mp3
    `.trim();

    const tracks = CatalogService.parseM3U(m3u);
    expect(tracks).toHaveLength(2);
    expect(tracks[0].title).toBe('Around The World');
    expect(tracks[0].artist).toBe('Daft Punk');
    expect(tracks[0].audioUrl).toBe('https://example.com/audio1.mp3');

    expect(tracks[1].title).toBe('Kavinsky');
    expect(tracks[1].artist).toBe('Nightcall');
    expect(tracks[1].audioUrl).toBe('https://example.com/audio2.mp3');
  });

  it('deve parsear listas de reprodução em formato JSON', () => {
    const json = JSON.stringify({
      title: 'Minha Playlist Synth',
      description: 'Lofi & Synthwave',
      tracks: [
        {
          id: 'test-1',
          title: 'Resonance',
          artist: 'HOME',
          duration: 212,
          audioUrl: 'https://example.com/resonance.mp3',
          coverUrl: 'https://example.com/cover.jpg',
          source: 'imported',
        },
      ],
    });

    const playlist = CatalogService.parseJsonPlaylist(json);
    expect(playlist).not.toBeNull();
    expect(playlist?.title).toBe('Minha Playlist Synth');
    expect(playlist?.tracks).toHaveLength(1);
    expect(playlist?.tracks[0].title).toBe('Resonance');
  });

  it('deve realizar busca unificada com filtragem insensível a maiúsculas/minúsculas', () => {
    const results = CatalogService.search('Horizon');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toContain('Neon Horizon');
  });
});
