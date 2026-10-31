import React from 'react';
import {
  Heart,
  Volume2,
  VolumeX,
  PhoneCall,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenResearchGuide: () => void;
  onOpenEmergency: () => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenResearchGuide,
  onOpenEmergency,
  isAudioPlaying,
  setIsAudioPlaying,
}) => {
  const toggleSound = () => {
    if (isAudioPlaying) {
      soundEngine.stopAmbient();
      setIsAudioPlaying(false);
    } else {
      soundEngine.startAmbient('rain', 0.15);
      setIsAudioPlaying(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Wordmark */}
          <button
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-400 to-rose-400 flex items-center justify-center text-white shadow-sm shadow-amber-500/20 group-hover:shadow-md transition-shadow">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900">
                  Nyalara
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/60">
                  Prototipe
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Ruang Aman Digital Remaja
              </p>
            </div>
          </button>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isAudioPlaying ? 'Matikan Suara Hujan' : 'Putar Suara Hujan Menenangkan'}
              className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isAudioPlaying
                  ? 'bg-amber-100/70 border-amber-300 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span className="hidden md:inline text-xs">Suara Alam Aktif</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="hidden md:inline text-xs">Suara Alam</span>
                </>
              )}
            </button>

            {/* Research & Guidance Guide */}
            <button
              onClick={onOpenResearchGuide}
              className="px-3 py-2 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Panduan Riset & Validasi Ideasi Crazy 8"
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span className="hidden sm:inline">Panduan Riset</span>
            </button>

            {/* Crisis / Emergency Quick Access */}
            <button
              onClick={onOpenEmergency}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-rose-500/20 active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Butuh Bantuan?</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
