import React, { useState } from 'react';
import {
  Bell,
  Heart,
  Volume2,
  Copy,
  Check,
  Sparkles,
  Shuffle,
  BookmarkCheck,
  Bookmark,
  Sun,
  Moon,
  Clock,
} from 'lucide-react';
import { DailyAffirmation } from '../types';
import { INITIAL_AFFIRMATIONS } from '../data/initialData';
import { soundEngine } from '../utils/audio';

export const DailyReminder: React.FC = () => {
  const [affirmations] = useState<DailyAffirmation[]>(INITIAL_AFFIRMATIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedFavorites, setSavedFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('nyalara_favorite_affirmations');
    return saved ? JSON.parse(saved) : ['aff-1', 'aff-2'];
  });
  const [copied, setCopied] = useState(false);
  const [reminderActive, setReminderActive] = useState(true);

  const current = affirmations[currentIndex];
  const isFavorited = savedFavorites.includes(current.id);

  const handleNext = () => {
    soundEngine.playChime(600);
    setCurrentIndex((prev) => (prev + 1) % affirmations.length);
  };

  const handleToggleFavorite = () => {
    soundEngine.playChime(750);
    let updated: string[];
    if (isFavorited) {
      updated = savedFavorites.filter((id) => id !== current.id);
    } else {
      updated = [...savedFavorites, current.id];
    }
    setSavedFavorites(updated);
    localStorage.setItem('nyalara_favorite_affirmations', JSON.stringify(updated));
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`"${current.quote}" — Pengingat Nyalara 💛`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayTone = () => {
    soundEngine.playChime(440);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white p-6 rounded-3xl border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              4
            </span>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Ideasi Crazy 8 • Daily Reminder
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Afirmasi & Pengingat Lembut
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Kata-kata hangat untuk membasuh pikiran yang lelah, mengingatkan bahwa kamu berharga.
          </p>
        </div>

        {/* Schedule notification simulation */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-emerald-200 text-xs shadow-2xs">
          <Bell className="w-4 h-4 text-emerald-600" />
          <span className="text-slate-700 font-medium">Pengingat Harian:</span>
          <button
            onClick={() => setReminderActive(!reminderActive)}
            className={`px-2 py-0.5 rounded-md font-semibold text-[11px] transition-colors ${
              reminderActive
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {reminderActive ? 'Aktif (08:00 WIB)' : 'Nonaktif'}
          </button>
        </div>
      </div>

      {/* Main Affirmation Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-amber-50 via-orange-50/60 to-rose-50 p-7 sm:p-9 rounded-3xl border border-amber-200/90 shadow-sm space-y-6 text-center relative overflow-hidden">
          {/* Top icon & category */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-300/50">
              {current.category}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePlayTone}
                title="Dengarkan Nada Ketenangan"
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-600 hover:text-amber-700 transition-colors shadow-2xs"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleToggleFavorite}
                title={isFavorited ? 'Tersimpan di Kantong' : 'Simpan ke Kantong Penguat'}
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-600 hover:text-rose-600 transition-colors shadow-2xs"
              >
                {isFavorited ? (
                  <BookmarkCheck className="w-4 h-4 text-rose-600" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Quote Body */}
          <div className="py-4 space-y-4">
            <p className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
              "{current.quote}"
            </p>
            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed italic">
              {current.reflection}
            </p>
          </div>

          {/* Bottom Card Controls */}
          <div className="pt-4 border-t border-amber-200/70 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleCopyQuote}
              className="px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-white border border-amber-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Salin Kutipan</span>
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 ml-auto"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Ganti Afirmasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kantong Penguat (Saved Favorites) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <h3 className="text-sm font-bold text-slate-900">
            Kantong Penguat Hatimu ({savedFavorites.length} tersimpan)
          </h3>
        </div>

        {savedFavorites.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-3 text-center">
            Belum ada afirmasi yang disimpan ke kantong. Klik ikon bookmark pada kartu afirmasi di atas untuk menyimpannya.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {affirmations
              .filter((a) => savedFavorites.includes(a.id))
              .map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    {item.category}
                  </span>
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    "{item.quote}"
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.reflection}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
