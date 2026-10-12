import React from 'react';
import { X, Smartphone, Download, CheckCircle2, ShieldCheck, Terminal, ExternalLink } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { THEME_ACCENTS } from '../utils/theme';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({ isOpen, onClose }) => {
  const { accentColor } = usePlayer();
  const theme = THEME_ACCENTS[accentColor];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-3xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-lg w-full bg-zinc-950/90 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-black shadow-md`}
            >
              <Smartphone className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Instalar APK no Android</h3>
              <p className="text-xs text-zinc-400">Aplicativo nativo para seu celular</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Card */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-2">
          <div className={`flex items-center gap-2 text-xs font-bold ${theme.text}`}>
            <CheckCircle2 className="w-4 h-4" /> 100% Livre & Gratuito
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            O APK do Kane inclui o lançador do YouTube Music, equalizador paramétrico de 5 bandas, ajuste de velocidade (*Slowed & Speed Up*), letras sincronizadas e reprodução offline sem anúncios.
          </p>
        </div>

        {/* Download Options */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
            Opções de Download e Instalação
          </span>

          <a
            href="https://github.com/K3st777/Kane/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/25 hover:bg-zinc-800/60 transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl bg-white/10 border ${theme.border} flex items-center justify-center ${theme.text} flex-shrink-0`}
              >
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-zinc-200 transition-colors flex items-center gap-1.5">
                  Baixar APK Compilado (GitHub Releases)
                  <ExternalLink className="w-3.5 h-3.5" />
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Baixe o arquivo <code className={`${theme.text} font-mono`}>kane-v1.0.0.apk</code>
                </p>
              </div>
            </div>
          </a>

          <div className="p-3.5 rounded-2xl bg-[#050608] border border-white/[0.06] space-y-1.5">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-zinc-400" />
              Compilar o APK Localmente com Gradle
            </h4>
            <div className={`bg-zinc-950 border border-white/5 rounded-xl p-2 font-mono text-[11px] ${theme.text} overflow-x-auto`}>
              cd android &amp;&amp; gradlew.bat assembleDebug
            </div>
            <p className="text-[10px] text-zinc-500">
              O APK fica pronto em <code className="text-zinc-400">android/app/build/outputs/apk/debug/app-debug.apk</code>.
            </p>
          </div>
        </div>

        {/* How to install notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>
            Ao baixar o APK no celular, permita a instalação de &quot;Fontes desconhecidas&quot; nas configurações do Android para instalar o pacote com sucesso.
          </span>
        </div>
      </div>
    </div>
  );
};
