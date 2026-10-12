import React from 'react';
import { X, Smartphone, Download, CheckCircle2, ShieldCheck, Terminal, ExternalLink } from 'lucide-react';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-lg w-full bg-[#141414] border border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF8284] to-[#ff5256] flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,130,132,0.4)]">
              <Smartphone className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Baixar APK para Android</h3>
              <p className="text-xs text-[#8A8A8A]">Instalação nativa no seu celular</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1C1C1C] to-[#121212] border border-[#2A2A2A] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF8284]">
            <CheckCircle2 className="w-4 h-4" /> 100% Gratuito & Sem Assinatura
          </div>
          <p className="text-xs text-[#8A8A8A] leading-relaxed">
            O APK do Kane inclui o player completo, equalizador paramétrico de 5 bandas, ajuste de velocidade (*Slowed & Speed Up*), letras sincronizadas e reprodução offline sem anúncios.
          </p>
        </div>

        {/* Download Options */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider block">
            Opções de Download e Instalação
          </span>

          {/* Option 1: Direct GitHub Release APK */}
          <a
            href="https://github.com/K3st777/Kane/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-[#1C1C1C] border border-[#2A2A2A] hover:border-[#FF8284] hover:bg-[#202020] transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#FF8284]/15 border border-[#FF8284]/30 flex items-center justify-center text-[#FF8284] flex-shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#FF8284] transition-colors flex items-center gap-1.5">
                  Baixar APK Compilado (GitHub Releases)
                  <ExternalLink className="w-3.5 h-3.5" />
                </h4>
                <p className="text-xs text-[#8A8A8A]">
                  Baixe o arquivo <code className="text-[#FF8284] font-mono text-[11px]">kane.apk</code> gerado pelo GitHub Actions
                </p>
              </div>
            </div>
          </a>

          {/* Option 2: Build locally with Gradle */}
          <div className="p-4 rounded-2xl bg-[#101010] border border-[#242424] space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#8A8A8A]" />
              Compilar o APK Localmente com Gradle
            </h4>
            <p className="text-xs text-[#8A8A8A]">
              Se você possui o Android Studio ou SDK instalado, execute no terminal:
            </p>
            <div className="bg-[#080808] border border-[#202020] rounded-xl p-2.5 font-mono text-[11px] text-[#FF8284] overflow-x-auto">
              cd android &amp;&amp; gradlew.bat assembleDebug
            </div>
            <p className="text-[11px] text-[#666]">
              O APK será gerado em <code className="text-[#888]">android/app/build/outputs/apk/debug/app-debug.apk</code>.
            </p>
          </div>
        </div>

        {/* How to install notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#8A8A8A]">
          <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
          <span>
            Ao baixar o APK no celular, permita a instalação de &quot;Fontes desconhecidas&quot; nas configurações do Android para instalar o pacote com sucesso.
          </span>
        </div>
      </div>
    </div>
  );
};
