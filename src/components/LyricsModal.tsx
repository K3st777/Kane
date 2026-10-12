import React, { useEffect, useRef } from 'react';
import { X, FileText, Music2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { CatalogService } from '../services/catalogService';
import { THEME_ACCENTS } from '../utils/theme';

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({ isOpen, onClose }) => {
  const { currentTrack, progress, seek, accentColor } = usePlayer();
  const theme = THEME_ACCENTS[accentColor];
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen || !currentTrack) return null;

  const parsedLyrics = CatalogService.parseLrc(currentTrack.lyrics);
  const currentMs = progress * 1000;

  // Find active line index
  let activeIndex = -1;
  for (let i = 0; i < parsedLyrics.length; i++) {
    if (currentMs >= parsedLyrics[i].timeMs) {
      activeIndex = i;
    } else {
      break;
    }
  }

  // Smooth scroll to active line
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-3xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-lg w-full h-[80vh] bg-zinc-950/90 border border-white/10 rounded-3xl flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08] bg-zinc-900/40">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-black shadow-md`}
            >
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base truncate max-w-[220px]">
                {currentTrack.title}
              </h3>
              <p className="text-[11px] text-zinc-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lyrics Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-center select-none no-scrollbar">
          {parsedLyrics.length > 0 ? (
            parsedLyrics.map((line, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={idx}
                  ref={isActive ? activeLineRef : null}
                  onClick={() => seek(line.timeMs / 1000)}
                  className={`py-2 px-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isActive
                      ? `text-white text-xl sm:text-2xl font-black scale-105 bg-white/10 ${theme.text} shadow-sm`
                      : 'text-zinc-500 text-sm sm:text-base hover:text-zinc-300 hover:scale-102'
                  }`}
                >
                  {line.text}
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-400">
              <Music2 className="w-10 h-10 stroke-1 text-zinc-600 mb-2" />
              <p className="text-sm font-bold text-white">Nenhuma letra sincronizada</p>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Toque na música ou importe faixas com arquivo LRC para sincronia instantânea.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 text-center border-t border-white/[0.08] bg-[#050608] text-[10px] text-zinc-500 font-medium">
          Toque em qualquer estrofe para saltar a reprodução imediatamente para aquele trecho
        </div>
      </div>
    </div>
  );
};
