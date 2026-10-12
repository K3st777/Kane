import React, { useEffect, useRef } from 'react';
import { X, FileText, Music2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { CatalogService } from '../services/catalogService';

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({ isOpen, onClose }) => {
  const { currentTrack, progress, seek } = usePlayer();
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-lg w-full h-[80vh] bg-[#141414] border border-[#2A2A2A] rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#242424] bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF8284]/15 border border-[#FF8284]/30 flex items-center justify-center text-[#FF8284]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base truncate max-w-[240px]">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-[#8A8A8A] truncate">{currentTrack.artist}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lyrics Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-center select-none">
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
                      ? 'text-white text-xl sm:text-2xl font-bold scale-105 bg-white/5 drop-shadow-[0_0_15px_rgba(255,130,132,0.5)] text-[#FF8284]'
                      : 'text-[#666] text-base hover:text-white/80 hover:scale-102'
                  }`}
                >
                  {line.text}
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#8A8A8A]">
              <Music2 className="w-12 h-12 stroke-1 text-[#444] mb-3" />
              <p className="text-base font-semibold text-white">Nenhuma letra sincronizada</p>
              <p className="text-xs text-[#666] mt-1 max-w-xs">
                Esta faixa não possui arquivo LRC sincronizado anexado. Você pode importar arquivos LRC na biblioteca.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 text-center border-t border-[#242424] bg-[#0D0D0D] text-[11px] text-[#666]">
          Clique em qualquer linha da letra para saltar a reprodução para aquele instante
        </div>
      </div>
    </div>
  );
};
