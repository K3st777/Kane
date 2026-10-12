import React from 'react';
import { X, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { EQ_LABELS } from '../engine/audioEngine';
import { THEME_ACCENTS } from '../utils/theme';

interface EqualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EqualizerModal: React.FC<EqualizerModalProps> = ({ isOpen, onClose }) => {
  const {
    presets,
    activePreset,
    customBands,
    accentColor,
    setEqualizerBand,
    applyEqualizerPreset,
  } = usePlayer();

  if (!isOpen) return null;

  const theme = THEME_ACCENTS[accentColor];
  const bandDescriptions = ['Sub-Graves', 'Graves', 'Médios', 'Presença', 'Agudos / Brilho'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-3xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-zinc-950/90 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-black shadow-md`}
            >
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Equalizador Paramétrico</h3>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                <Sparkles className={`w-3 h-3 ${theme.text}`} /> 5 Bandas Sonoras de Precisão
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Bar */}
        <div className="py-3">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
            Predefinições Sonoras
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => {
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyEqualizerPreset(preset.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${theme.gradient} text-black border-transparent shadow-sm scale-105`
                      : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Graphic Equalizer Bands Faders */}
        <div className="bg-[#050608] border border-white/[0.08] rounded-2xl p-4 my-2">
          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mb-2">
            <span>+12 dB</span>
            <span className={theme.text}>0 dB</span>
            <span>-12 dB</span>
          </div>

          <div className="grid grid-cols-5 gap-2 items-center h-44 py-1">
            {customBands.map((gain, idx) => (
              <div key={idx} className="flex flex-col items-center h-full justify-between">
                <span className={`text-[11px] font-mono ${theme.text} font-bold`}>
                  {gain > 0 ? `+${gain}` : gain}
                </span>

                <div className="relative flex items-center justify-center h-28 w-8">
                  <div className="absolute w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 pointer-events-none" />

                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="1"
                    value={gain}
                    onChange={(e) => setEqualizerBand(idx, parseInt(e.target.value, 10))}
                    className="w-24 -rotate-90 accent-white bg-transparent cursor-pointer"
                  />
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-white block">{EQ_LABELS[idx]}</span>
                  <span className="text-[9px] text-zinc-500 block leading-tight">
                    {bandDescriptions[idx]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
          <button
            onClick={() => applyEqualizerPreset('flat')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Plano
          </button>

          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-xl bg-gradient-to-r ${theme.gradient} text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all`}
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
};
