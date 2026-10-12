import React, { useState, useRef } from 'react';
import { X, Upload, FileAudio, CheckCircle2 } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose }) => {
  const { importLocalFiles, importM3u, importJson } = useLibrary();
  const [activeTab, setActiveTab] = useState<'files' | 'm3u' | 'json'>('files');
  const [pastedContent, setPastedContent] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imported = await importLocalFiles(e.target.files);
      setStatusMessage(`${imported.length} arquivo(s) de áudio importados com sucesso!`);
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
      }, 1500);
    }
  };

  const handleM3uImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedContent.trim()) {
      const pl = importM3u(pastedContent, playlistTitle || 'Minha Playlist M3U');
      setStatusMessage(`Playlist "${pl.title}" importada com ${pl.tracks.length} faixa(s)!`);
      setPastedContent('');
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
      }, 1500);
    }
  };

  const handleJsonImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedContent.trim()) {
      const pl = importJson(pastedContent);
      if (pl) {
        setStatusMessage(`Playlist "${pl.title}" importada com sucesso!`);
        setPastedContent('');
        setTimeout(() => {
          onClose();
          setStatusMessage(null);
        }, 1500);
      } else {
        alert('Formato JSON inválido. Certifique-se de que contenha "title" e "tracks".');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-[#141414] border border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FF8284]/15 border border-[#FF8284]/30 flex items-center justify-center text-[#FF8284]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Importar Músicas</h3>
              <p className="text-xs text-[#8A8A8A]">Arquivos locais, M3U e listas JSON</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8A8A8A] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#1C1C1C] p-1 rounded-2xl border border-[#262626]">
          <button
            onClick={() => setActiveTab('files')}
            className={`py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'files' ? 'bg-[#FF8284] text-black shadow-sm' : 'text-[#8A8A8A] hover:text-white'
            }`}
          >
            Arquivos
          </button>
          <button
            onClick={() => setActiveTab('m3u')}
            className={`py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'm3u' ? 'bg-[#FF8284] text-black shadow-sm' : 'text-[#8A8A8A] hover:text-white'
            }`}
          >
            Lista M3U
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'json' ? 'bg-[#FF8284] text-black shadow-sm' : 'text-[#8A8A8A] hover:text-white'
            }`}
          >
            JSON
          </button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            {statusMessage}
          </div>
        )}

        {/* Tab 1: Audio Files */}
        {activeTab === 'files' && (
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#333] hover:border-[#FF8284] rounded-2xl p-8 text-center cursor-pointer transition-colors bg-[#0D0D0D]/50 group"
            >
              <FileAudio className="w-12 h-12 stroke-1 text-[#666] group-hover:text-[#FF8284] mx-auto mb-3 transition-colors" />
              <p className="text-sm font-semibold text-white">Clique para selecionar arquivos</p>
              <p className="text-xs text-[#666] mt-1">
                Suporte para MP3, WAV, FLAC, OGG, M4A e AAC
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Tab 2: M3U Playlist */}
        {activeTab === 'm3u' && (
          <form onSubmit={handleM3uImport} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#8A8A8A] mb-1">
                Nome da Playlist
              </label>
              <input
                type="text"
                value={playlistTitle}
                onChange={(e) => setPlaylistTitle(e.target.value)}
                placeholder="Ex: Minha Lista M3U"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] text-white text-xs focus:outline-none focus:border-[#FF8284]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8A8A8A] mb-1">
                Conteúdo M3U (Cole o texto ou links)
              </label>
              <textarea
                required
                rows={5}
                value={pastedContent}
                onChange={(e) => setPastedContent(e.target.value)}
                placeholder="#EXTM3U&#10;#EXTINF:180,Artista - Música&#10;https://exemplo.com/audio.mp3"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] text-white text-xs font-mono focus:outline-none focus:border-[#FF8284] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#FF8284] text-black font-bold text-xs hover:scale-102 transition-all shadow-[0_0_15px_rgba(255,130,132,0.3)]"
            >
              Importar M3U
            </button>
          </form>
        )}

        {/* Tab 3: JSON Playlist */}
        {activeTab === 'json' && (
          <form onSubmit={handleJsonImport} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#8A8A8A] mb-1">
                Estrutura JSON da Playlist
              </label>
              <textarea
                required
                rows={6}
                value={pastedContent}
                onChange={(e) => setPastedContent(e.target.value)}
                placeholder='{"title": "Exemplo", "tracks": [{"id": "1", "title": "Faixa", "artist": "Artista", "audioUrl": "https://..."}]}'
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] text-white text-xs font-mono focus:outline-none focus:border-[#FF8284] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#FF8284] text-black font-bold text-xs hover:scale-102 transition-all shadow-[0_0_15px_rgba(255,130,132,0.3)]"
            >
              Importar JSON
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
