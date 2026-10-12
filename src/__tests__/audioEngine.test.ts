import { describe, it, expect } from 'vitest';
import { EQ_FREQUENCIES, EQ_LABELS } from '../engine/audioEngine';
import { DEFAULT_PRESETS } from '../services/storage';

describe('AudioEngine e Configurações de Frequência do Equalizador', () => {
  it('deve possuir exatamente 5 bandas de equalização paramétrica cobrindo o espectro audível', () => {
    expect(EQ_FREQUENCIES).toEqual([60, 250, 1000, 4000, 12000]);
    expect(EQ_LABELS).toEqual(['60Hz', '250Hz', '1kHz', '4kHz', '12kHz']);
  });

  it('deve conter predefinições de equalizador bem configuradas com 5 ganhos numéricos', () => {
    expect(DEFAULT_PRESETS.length).toBeGreaterThanOrEqual(5);

    for (const preset of DEFAULT_PRESETS) {
      expect(preset.gains).toHaveLength(5);
      preset.gains.forEach((gain) => {
        expect(gain).toBeGreaterThanOrEqual(-12);
        expect(gain).toBeLessThanOrEqual(12);
      });
    }

    const flat = DEFAULT_PRESETS.find(p => p.id === 'flat');
    expect(flat?.gains).toEqual([0, 0, 0, 0, 0]);

    const bassBoost = DEFAULT_PRESETS.find(p => p.id === 'bass_boost');
    expect(bassBoost?.gains[0]).toBeGreaterThan(0); // Sub-bass amplificado
  });
});
