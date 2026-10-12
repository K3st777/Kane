import { Play, Sparkles, Flame, Clock, Radio, Music, Smartphone } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { CatalogService } from '../services/catalogService';

interface HomeViewProps {
  onOpenPlaylist: (playlistId: string) => void;
  onOpenImport: () => void;
  onOpenApkModal?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenImport, onOpenApkModal }) => {
  const { playTrack, currentTrack } = usePlayer();
  const tracks = CatalogService.getFeaturedTracks();

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  return (
    <div className="space-y-10 pb-36 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#242424] bg-gradient-to-br from-[#1A1A1A] via-[#121212] to-[#0D0D0D] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8284]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8284]/15 border border-[#FF8284]/30 text-[#FF8284] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Alternativa Aberta ao Lane (100% Livre)
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Sua música. Seu som.{' '}
            <span className="text-[#FF8284] drop-shadow-[0_0_20px_rgba(255,130,132,0.4)]">
              Seu KANE.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#8A8A8A] leading-relaxed mb-6 max-w-xl">
            Reprodutor pessoal para organizar suas faixas, ajustar velocidade de reprodução em tempo real (*Slowed & Speed Up*), equalizar frequências e ouvir offline sem nenhum plano pago.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePlayAll}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF8284] to-[#ff6b6e] text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,130,132,0.35)]"
            >
              <Play className="w-4 h-4 fill-current" />
              Tocar Destaques
            </button>

            <button
              onClick={onOpenImport}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-[#2A2A2A] bg-[#161616] text-white text-sm font-semibold hover:border-white/20 hover:bg-[#222] transition-all"
            >
              Importar Músicas
            </button>

            {onOpenApkModal && (
              <button
                onClick={onOpenApkModal}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-[#FF8284]/40 bg-[#FF8284]/15 text-[#FF8284] text-sm font-bold hover:bg-[#FF8284]/25 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,130,132,0.2)]"
              >
                <Smartphone className="w-4 h-4 stroke-[2.5]" />
                Baixar APK Android
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Destaques / Em Alta Section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#FF8284]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Em Alta no Catálogo Livre
            </h2>
          </div>
          <span className="text-xs text-[#8A8A8A] font-medium">Áudio em alta fidelidade</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((track) => {
            const isCurrent = currentTrack?.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => playTrack(track, tracks)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                  isCurrent
                    ? 'bg-[#FF8284]/15 border-[#FF8284]/40 shadow-[0_0_15px_rgba(255,130,132,0.15)]'
                    : 'bg-[#141414] border-[#222] hover:border-white/20 hover:bg-[#181818]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                        isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Play className="w-5 h-5 text-[#FF8284] fill-current" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-sm font-bold truncate ${
                        isCurrent ? 'text-[#FF8284]' : 'text-white group-hover:text-[#FF8284]'
                      } transition-colors`}
                    >
                      {track.title}
                    </h3>
                    <p className="text-xs text-[#8A8A8A] truncate mt-0.5">{track.artist}</p>
                    <span className="text-[10px] text-[#666] font-mono block mt-1">
                      {Math.floor(track.duration / 60)}:
                      {track.duration % 60 < 10 ? '0' : ''}
                      {track.duration % 60}
                    </span>
                  </div>
                </div>

                <div className="pl-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#FF8284] group-hover:text-black group-hover:border-[#FF8284] transition-all">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Diferenciais Kane vs Lane */}
      <div className="rounded-3xl border border-[#242424] bg-[#121212] p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Radio className="w-5 h-5 text-[#FF8284]" /> Por que o Kane é uma alternativa superior?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#181818] border border-[#282828]">
            <div className="w-8 h-8 rounded-xl bg-[#FF8284]/15 border border-[#FF8284]/30 flex items-center justify-center text-[#FF8284] mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Sem Restrições de \$3.49/mês</h4>
            <p className="text-xs text-[#8A8A8A] leading-relaxed">
              O Lane cobra assinatura para downloads offline e equalizador avançado. No Kane, tudo é 100% gratuito e livre.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#181818] border border-[#282828]">
            <div className="w-8 h-8 rounded-xl bg-[#FF8284]/15 border border-[#FF8284]/30 flex items-center justify-center text-[#FF8284] mb-3">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Slowed & Speed Up Nativo</h4>
            <p className="text-xs text-[#8A8A8A] leading-relaxed">
              Ajuste de velocidade em tempo real diretamente via Web Audio API, com controle preciso de pitch (Nightcore e Slowed).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#181818] border border-[#282828]">
            <div className="w-8 h-8 rounded-xl bg-[#FF8284]/15 border border-[#FF8284]/30 flex items-center justify-center text-[#FF8284] mb-3">
              <Music className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Letras Sincronizadas (LRC)</h4>
            <p className="text-xs text-[#8A8A8A] leading-relaxed">
              Rolagem automática e salto para a música tocando com um único toque na estrofe desejada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
