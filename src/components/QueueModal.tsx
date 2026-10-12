import React from 'react';
import { X, ListMusic, Trash2, ChevronUp, ChevronDown, Play, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface QueueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QueueModal: React.FC<QueueModalProps> = ({ isOpen, onClose }) => {
  const {
    queue,
    queueIndex,
    playTrack,
    removeFromQueue,
    reorderQueue,
    clearQueue,
  } = usePlayer();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-lg w-full h-[80vh] bg-[#141414] border border-[#2A2A2A] rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#242424] bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF8284]/15 border border-[#FF8284]/30 flex items-center justify-center text-[#FF8284]">
              <ListMusic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Fila de Reprodução</h3>
              <p className="text-xs text-[#8A8A8A]">{queue.length} faixa(s) na lista</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {queue.length > 1 && (
              <button
                onClick={clearQueue}
                className="p-2 rounded-xl text-[#8A8A8A] hover:text-[#FF8284] hover:bg-white/5 transition-colors"
                title="Limpar Fila"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {queue.length > 0 ? (
            queue.map((track, idx) => {
              const isCurrent = idx === queueIndex;
              return (
                <div
                  key={`${track.id}-${idx}`}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-[#FF8284]/15 border-[#FF8284]/40 shadow-sm'
                      : 'bg-[#181818] border-[#242424] hover:border-white/20'
                  }`}
                >
                  <div
                    onClick={() => playTrack(track)}
                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer select-none group"
                  >
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-4 h-4 text-[#FF8284] fill-current" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4
                        className={`text-sm font-semibold truncate ${
                          isCurrent ? 'text-[#FF8284]' : 'text-white group-hover:text-[#FF8284]'
                        }`}
                      >
                        {track.title}
                      </h4>
                      <p className="text-xs text-[#8A8A8A] truncate">{track.artist}</p>
                    </div>
                  </div>

                  {/* Actions: Reorder up/down & remove */}
                  <div className="flex items-center gap-1 pl-2">
                    <button
                      disabled={idx === 0}
                      onClick={() => reorderQueue(idx, idx - 1)}
                      className="p-1 rounded-lg text-[#8A8A8A] hover:text-white disabled:opacity-20 transition-colors"
                      title="Mover para cima"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === queue.length - 1}
                      onClick={() => reorderQueue(idx, idx + 1)}
                      className="p-1 rounded-lg text-[#8A8A8A] hover:text-white disabled:opacity-20 transition-colors"
                      title="Mover para baixo"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromQueue(idx)}
                      className="p-1.5 rounded-lg text-[#8A8A8A] hover:text-[#FF8284] transition-colors"
                      title="Remover da fila"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#8A8A8A]">
              <Music className="w-12 h-12 stroke-1 text-[#444] mb-3" />
              <p className="text-base font-semibold text-white">Fila vazia</p>
              <p className="text-xs text-[#666] mt-1">
                Escolha uma música na tela inicial ou na sua biblioteca para reproduzir.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
