import React from 'react';
import { X, SlidersHorizontal, ShieldCheck, RefreshCw, Palette, Sparkles, ExternalLink, SunMedium } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { StorageService } from '../services/storage';
import { THEME_ACCENTS } from '../utils/theme';
import { AccentColor, BlurIntensity } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    accentColor,
    blurIntensity,
    ambientGlow,
    enableVisualizer,
    setAccentColor,
    setBlurIntensity,
    setAmbientGlow,
    setEnableVisualizer,
  } = usePlayer();

  if (!isOpen) return null;

  const currentTheme = THEME_ACCENTS[accentColor];

  const handleReset = () => {
    if (confirm('Atenção: Isso redefinirá suas preferências locais e histórico. Deseja continuar?')) {
      StorageService.clearHistory();
      location.reload();
    }
  };

  const ACCENTS: { key: AccentColor; label: string; color: string }[] = [
    { key: 'emerald', label: 'Esmeralda', color: '#10b981' },
    { key: 'violet', label: 'Violeta Neon', color: '#a855f7' },
    { key: 'cyan', label: 'Ciano Elétrico', color: '#06b6d4' },
    { key: 'amber', label: 'Pôr do Sol', color: '#f59e0b' },
    { key: 'rose', label: 'Rosa Magenta', color: '#f43f5e' },
    { key: 'monochrome', label: 'Pure White', color: '#ffffff' },
  ];

  const BLURS: { key: BlurIntensity; label: string }[] = [
    { key: 'high', label: 'Alto (Vidro Fosco)' },
    { key: 'medium', label: 'Médio' },
    { key: 'low', label: 'Suave' },
    { key: 'none', label: 'Desativado' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-3xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-zinc-950/90 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${currentTheme.gradient} flex items-center justify-center text-black shadow-md`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Ajustes & Estilo</h3>
              <p className="text-xs text-zinc-400">Personalize a aparência e recursos do app</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cores de Destaque (Accent Palette) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <Palette className={`w-4 h-4 ${currentTheme.text}`} /> Cor de Destaque
          </div>

          <div className="grid grid-cols-3 gap-2">
            {ACCENTS.map((item) => {
              const isSelected = accentColor === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setAccentColor(item.key)}
                  className={`flex items-center gap-2 p-2.5 rounded-2xl border text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-white/15 border-white text-white shadow-md'
                      : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Efeito Vidro Fosco & Blur */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <Sparkles className={`w-4 h-4 ${currentTheme.text}`} /> Intensidade do Blur (Vidro)
          </div>

          <div className="grid grid-cols-2 gap-2">
            {BLURS.map((item) => {
              const isSelected = blurIntensity === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setBlurIntensity(item.key)}
                  className={`p-2.5 rounded-2xl border text-xs font-semibold transition-all ${
                    isSelected
                      ? `${currentTheme.border} bg-white/10 ${currentTheme.text} shadow-sm`
                      : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Efeitos Visuais (Luz Ambiente e Visualizador) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-2">
            <SunMedium className={`w-4 h-4 ${currentTheme.text}`} /> Efeitos Visuais
          </div>

          {/* Ambient Glow */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/50 border border-white/5">
            <div>
              <h4 className="text-xs font-bold text-white">Luz Ambiente Dinâmica</h4>
              <p className="text-[11px] text-zinc-400">Brilho suave com blur atrás da arte do álbum</p>
            </div>
            <button
              onClick={() => setAmbientGlow(!ambientGlow)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                ambientGlow ? currentTheme.bg : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  ambientGlow ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Visualizador Sonoro */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/50 border border-white/5">
            <div>
              <h4 className="text-xs font-bold text-white">Visualizador Sonoro</h4>
              <p className="text-[11px] text-zinc-400">Barras acústicas animadas durante a reprodução</p>
            </div>
            <button
              onClick={() => setEnableVisualizer(!enableVisualizer)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                enableVisualizer ? currentTheme.bg : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  enableVisualizer ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Armazenamento & Privacidade */}
        <div className="space-y-2 pt-2 border-t border-white/[0.08]">
          <div className="p-3 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Local & Sem Rastreamento
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Suas preferências e listas ficam apenas no seu dispositivo.
            </p>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold pt-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Redefinir configurações
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-500">
          <span>Kane v1.0.0 (YouTube Music Edition)</span>
          <a
            href="https://github.com/K3st777/Kane"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 ${currentTheme.text} hover:underline font-semibold`}
          >
            GitHub <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
