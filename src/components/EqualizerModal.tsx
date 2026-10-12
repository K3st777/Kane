import React from 'react';
import { X, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { EQ_LABELS } from '../engine/audioEngine';

interface EqualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EqualizerModal: React.FC<EqualizerModalProps> = ({ isOpen, onClose }) => {
  const {
    presets,
    activePreset,
    customBands,
    setEqualizerBand,
    applyEqualizerPreset,
  } = usePlayer();

  if (!isOpen) return null;

  const bandDescriptions = ['Sub-Graves', 'Graves', 'Médios', 'Presença', 'Agudos / Brilho'];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-[#141414] border border-[#2A2A2A] rounded-3xl p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#242424]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF8284]/15 border border-[#FF8284]/30 flex items-center justify-center text-[#FF8284]">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Equalizador Gráfico</h3>
              <p className="text-xs text-[#8A8A8A] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FF8284]" /> 5 Bandas Paramétricas (Livre)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Bar */}
        <div className="py-4">
          <span className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider block mb-2.5">
            Predefinições
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyEqualizerPreset(preset.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  activePreset === preset.id
                    ? 'bg-[#FF8284] text-black border-[#FF8284] shadow-[0_0_12px_rgba(255,130,132,0.3)]'
                    : 'bg-[#1C1C1C] border-[#2A2A2A] text-[#8A8A8A] hover:text-white hover:border-white/20'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Graphic Equalizer Bands Faders */}
        <div className="bg-[#0D0D0D] border border-[#242424] rounded-2xl p-5 my-2">
          <div className="flex justify-between items-center text-[10px] text-[#666] font-mono mb-2">
            <span>+12 dB</span>
            <span className="text-[#FF8284]">0 dB</span>
            <span>-12 dB</span>
          </div>

          <div className="grid grid-cols-5 gap-2 items-center h-48 py-2">
            {customBands.map((gain, idx) => (
              <div key={idx} className="flex flex-col items-center h-full justify-between">
                <span className="text-[11px] font-mono text-[#FF8284] font-semibold">
                  {gain > 0 ? `+${gain}` : gain}
                </span>

                <div className="relative flex items-center justify-center h-32 w-8">
                  {/* Zero reference line */}
                  <div className="absolute w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 pointer-events-none" />

                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="1"
                    value={gain}
                    onChange={(e) => setEqualizerBand(idx, parseInt(e.target.value, 10))}
                    className="w-28 -rotate-90 accent-[#FF8284] bg-transparent cursor-pointer"
                  />
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-white block">{EQ_LABELS[idx]}</span>
                  <span className="text-[9px] text-[#666] block leading-tight">
                    {bandDescriptions[idx]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#242424]">
          <button
            onClick={() => applyEqualizerPreset('flat')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Plano
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#FF8284] text-black font-semibold text-xs hover:bg-[#ff9496] transition-colors shadow-[0_0_15px_rgba(255,130,132,0.3)]"
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
};
