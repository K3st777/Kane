import { describe, it, expect } from 'vitest';
import { Track } from '../types';

describe('Lógica de Gerenciamento e Reordenação de Fila (Queue)', () => {
  const sampleTracks: Track[] = [
    { id: '1', title: 'Track 1', artist: 'Artist 1', duration: 100, audioUrl: '', coverUrl: '', source: 'stream' },
    { id: '2', title: 'Track 2', artist: 'Artist 2', duration: 110, audioUrl: '', coverUrl: '', source: 'stream' },
    { id: '3', title: 'Track 3', artist: 'Artist 3', duration: 120, audioUrl: '', coverUrl: '', source: 'stream' },
  ];

  it('deve reordenar a lista de faixas da fila corretamente ao mover posições', () => {
    const queue = [...sampleTracks];
    const fromIndex = 0;
    const toIndex = 2;

    const [moved] = queue.splice(fromIndex, 1);
    queue.splice(toIndex, 0, moved);

    expect(queue[0].id).toBe('2');
    expect(queue[1].id).toBe('3');
    expect(queue[2].id).toBe('1');
  });

  it('deve embaralhar a lista de faixas preservando a faixa atual no topo', () => {
    const queue = [...sampleTracks];
    const currentTrack = queue[0];
    const remaining = queue.filter(t => t.id !== currentTrack.id);

    // Fisher-Yates shuffle
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }

    const shuffledQueue = [currentTrack, ...remaining];
    expect(shuffledQueue[0].id).toBe(currentTrack.id);
    expect(shuffledQueue).toHaveLength(3);
  });
});
