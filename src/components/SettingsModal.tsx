import React from 'react';
import { X, Settings, ShieldCheck, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';
import { StorageService } from '../services/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleReset = () => {
    if (confirm('Atenção: Isso redefinirá suas preferências locais e histórico. Deseja continuar?')) {
      StorageService.clearHistory();
      location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-[#141414] border border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FF8284]/15 border border-[#FF8284]/30 flex items-center justify-center text-[#FF8284]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Configurações do Kane</h3>
              <p className="text-xs text-[#8A8A8A]">Preferências e informações do aplicativo</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Open Source Freedom Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1C1C1C] to-[#121212] border border-[#2A2A2A] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF8284]">
            <Sparkles className="w-4 h-4" /> 100% Livre & Gratuito
          </div>
          <p className="text-xs text-[#8A8A8A] leading-relaxed">
            Ao contrário do Lane oficial (que cobra \$3.49/mês para desbloquear downloads offline e qualidade original), o Kane é mantido sob licença MIT, sem anúncios e sem qualquer limitação comercial artificial.
          </p>
        </div>

        {/* Audio Quality & Playback Preferences */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider block">
            Qualidade de Áudio
          </span>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#1C1C1C] border border-[#282828]">
              <div>
                <h4 className="text-xs font-bold text-white">Qualidade Original / Máxima</h4>
                <p className="text-[11px] text-[#8A8A8A]">Reproduz no bitrate nativo sem compressão forçada</p>
              </div>
              <span className="text-xs text-[#FF8284] font-semibold">Ativo</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#1C1C1C] border border-[#282828]">
              <div>
                <h4 className="text-xs font-bold text-white">Motor Web Audio API</h4>
                <p className="text-[11px] text-[#8A8A8A]">Processamento sonoro de alta fidelidade a 48kHz</p>
              </div>
              <span className="text-xs text-green-400 font-semibold">Ativo</span>
            </div>
          </div>
        </div>

        {/* Storage & Privacy */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider block">
            Privacidade e Armazenamento
          </span>

          <div className="p-3.5 rounded-xl bg-[#1C1C1C] border border-[#282828] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              Armazenamento Local & Zero Telemetria
            </div>
            <p className="text-[11px] text-[#8A8A8A]">
              Suas playlists, curtidas e preferências são guardadas estritamente no seu navegador via LocalStorage e IndexedDB. Nenhum dado é enviado a servidores de terceiros.
            </p>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold pt-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Limpar histórico e preferências
            </button>
          </div>
        </div>

        {/* About & License */}
        <div className="pt-2 border-t border-[#242424] flex items-center justify-between text-xs text-[#666]">
          <span>Kane v1.0.0 (Licença MIT)</span>
          <a
            href="https://github.com/K3st777/Kane"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#FF8284] hover:underline"
          >
            GitHub <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
