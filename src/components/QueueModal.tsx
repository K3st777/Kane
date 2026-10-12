import React from 'react';
import { X, ListMusic, Trash2, ChevronUp, ChevronDown, Play, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { THEME_ACCENTS } from '../utils/theme';

interface QueueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QueueModal: React.FC<QueueModalProps> = ({ isOpen, onClose }) => {
  const {
    queue,
    queueIndex,
    accentColor,
    playTrack,
    removeFromQueue,
    reorderQueue,
    clearQueue,
  } = usePlayer();

  if (!isOpen) return null;

  const theme = THEME_ACCENTS[accentColor];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-3xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-lg w-full h-[80vh] bg-zinc-950/90 border border-white/10 rounded-3xl flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08] bg-zinc-900/40">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-black shadow-md`}
            >
              <ListMusic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Fila de Reprodução</h3>
              <p className="text-[11px] text-zinc-400">{queue.length} faixa(s) na fila</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {queue.length > 1 && (
              <button
                onClick={clearQueue}
                className="p-2 rounded-2xl text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                title="Limpar Fila"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {queue.length > 0 ? (
            queue.map((track, idx) => {
              const isCurrent = idx === queueIndex;
              const isYt = track.source === 'youtube' || Boolean(track.youtubeId);

              return (
                <div
                  key={`${track.id}-${idx}`}
                  className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? `${theme.border} bg-white/[0.08] shadow-sm`
                      : 'bg-zinc-900/40 border-white/5 hover:border-white/15'
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
                          <Play className={`w-4 h-4 ${theme.text} fill-current`} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4
                          className={`text-xs sm:text-sm font-bold truncate ${
                            isCurrent ? theme.text : 'text-white'
                          }`}
                        >
                          {track.title}
                        </h4>
                        {isYt && (
                          <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-red-600/30 text-red-400 border border-red-500/30">
                            YT
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">{track.artist}</p>
                    </div>
                  </div>

                  {/* Actions: Reorder up/down & remove */}
                  <div className="flex items-center gap-1 pl-2">
                    <button
                      disabled={idx === 0}
                      onClick={() => reorderQueue(idx, idx - 1)}
                      className="p-1 rounded-lg text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
                      title="Mover para cima"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === queue.length - 1}
                      onClick={() => reorderQueue(idx, idx + 1)}
                      className="p-1 rounded-lg text-zinc-400 hover:text-white disabled:opacity-20 transition-colors"
                      title="Mover para baixo"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromQueue(idx)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                      title="Remover da fila"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-400">
              <Music className="w-10 h-10 stroke-1 text-zinc-600 mb-2" />
              <p className="text-sm font-bold text-white">Fila vazia</p>
              <p className="text-xs text-zinc-500 mt-1">
                Selecione uma faixa para começar a reproduzir.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
