import React, { useState } from 'react';
import {
  Smile,
  Meh,
  Frown,
  Heart,
  Sparkles,
  Calendar,
  Clock,
  Send,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { MoodEntry, MoodType } from '../types';
import { soundEngine } from '../utils/audio';

interface MoodCheckInProps {
  onNavigateToRuangTenang: () => void;
  onNavigateToRuangCerita: () => void;
}

const MOOD_OPTIONS: {
  type: MoodType;
  emoji: string;
  label: string;
  score: number;
  color: string;
  activeColor: string;
}[] = [
  {
    type: 'sangat-baik',
    emoji: '🥰',
    label: 'Sangat Baik',
    score: 5,
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    activeColor: 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20',
  },
  {
    type: 'tenang',
    emoji: '😌',
    label: 'Tenang & Bersyukur',
    score: 4,
    color: 'bg-teal-50 text-teal-800 border-teal-200',
    activeColor: 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20',
  },
  {
    type: 'biasa',
    emoji: '😐',
    label: 'Biasa Saja',
    score: 3,
    color: 'bg-amber-50 text-amber-800 border-amber-200',
    activeColor: 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20',
  },
  {
    type: 'lelah-cemas',
    emoji: '😮‍💨',
    label: 'Cemas / Lelah',
    score: 2,
    color: 'bg-orange-50 text-orange-800 border-orange-200',
    activeColor: 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20',
  },
  {
    type: 'tertekan',
    emoji: '🥺',
    label: 'Sedih / Tertekan',
    score: 1,
    color: 'bg-rose-50 text-rose-800 border-rose-200',
    activeColor: 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20',
  },
];

const AVAILABLE_TAGS = [
  'Overthinking',
  'Tugas Sekolah',
  'Kewalahan',
  'Butuh Teman',
  'Bersyukur',
  'Merasa Kosong',
  'Bingung',
  'Keluarga',
  'Capek Fisik',
  'Bersemangat',
  'Bangga',
  'Insecure',
];

export const MoodCheckIn: React.FC<MoodCheckInProps> = ({
  onNavigateToRuangTenang,
  onNavigateToRuangCerita,
}) => {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('nyalara_mood_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Default initial mock history
    return [
      {
        id: 'init-1',
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('id-ID', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }),
        mood: 'biasa',
        moodScore: 3,
        tags: ['Tugas Sekolah', 'Capek Fisik'],
        note: 'Banyak tugas kelompok, rasanya lumayan nguras tenaga tapi bisa kelar.',
        createdAt: Date.now() - 86400000 * 2,
      },
      {
        id: 'init-2',
        date: new Date(Date.now() - 86400000).toLocaleDateString('id-ID', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }),
        mood: 'tenang',
        moodScore: 4,
        tags: ['Bersyukur', 'Butuh Teman'],
        note: 'Sore tadi ngobrol santai sama teman sambil jajan es krim.',
        createdAt: Date.now() - 86400000,
      },
    ];
  });

  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [submittedToday, setSubmittedToday] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    soundEngine.playChime(520);
    const chosen = MOOD_OPTIONS.find((m) => m.type === selectedMood)!;
    const newEntry: MoodEntry = {
      id: 'mood-' + Date.now(),
      date: new Date().toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
      mood: selectedMood,
      moodScore: chosen.score,
      tags: selectedTags,
      note: note.trim() || undefined,
      createdAt: Date.now(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('nyalara_mood_history', JSON.stringify(updated));
    setSubmittedToday(true);

    // Warm, validating tone of voice
    if (selectedMood === 'tertekan' || selectedMood === 'lelah-cemas') {
      setFeedbackMessage(
        'Terima kasih sudah jujur dengan perasaanmu hari ini. Perasaan berat ini nyata dan kamu tidak salah untuk merasa lelah. Tarik napas pelan-pelan ya, kamu aman di sini 💛'
      );
    } else if (selectedMood === 'biasa') {
      setFeedbackMessage(
        'Hari biasa yang tenang juga adalah sebuah anugerah. Nikmati momen santai ini tanpa terburu-buru 🌱'
      );
    } else {
      setFeedbackMessage(
        'Senang sekali melihatmu merasa baik hari ini! Simpan energi positif ini di dalam hatimu ya ✨'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-white p-6 rounded-3xl border border-amber-200/80 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
              1
            </span>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Ideasi Crazy 8 • Mood Check-In
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Bagaimana suasana hatimu saat ini?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Tidak ada jawaban benar atau salah. Apapun yang sedang kamu rasakan hari ini, semuanya diterima apa adanya.
          </p>
        </div>
      </div>

      {/* Main Check-In Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        {feedbackMessage ? (
          <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-4 animate-in fade-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900">
                  Respons Hangat dari Nyalara
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {feedbackMessage}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-200/60">
              {(selectedMood === 'tertekan' || selectedMood === 'lelah-cemas') && (
                <button
                  onClick={onNavigateToRuangTenang}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Mampir ke Ruang Tenang (Latihan Napas)
                </button>
              )}
              <button
                onClick={onNavigateToRuangCerita}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-transform active:scale-95"
              >
                Tulis Lebih Lanjut di Ruang Cerita
              </button>
              <button
                onClick={() => {
                  setFeedbackMessage(null);
                  setSelectedMood(null);
                  setSelectedTags([]);
                  setNote('');
                }}
                className="px-4 py-2 bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
              >
                Catat Mood Baru
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Emoji Mood Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Pilih Emoji yang Paling Mendekati Hatimu:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {MOOD_OPTIONS.map((item) => {
                  const isSelected = selectedMood === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setSelectedMood(item.type)}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 min-h-[90px] ${
                        isSelected ? item.activeColor : `${item.color} hover:shadow-xs hover:border-slate-300`
                      }`}
                    >
                      <span className="text-3xl filter drop-shadow-xs">{item.emoji}</span>
                      <span className="text-xs font-semibold leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Nuanced Tag Selector */}
            {selectedMood && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Apa yang paling memicu perasaanmu? (Boleh pilih lebih dari satu)
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TAGS.map((tag) => {
                    const isTagActive = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                          isTagActive
                            ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Reflection Note */}
            {selectedMood && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Ada cerita kecil yang ingin kamu tuliskan? (Opsional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Misalnya: 'Tadi sempat overthinking soal tugas kelompok, tapi untung ada sahabat yang nemenin...'"
                  className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 leading-relaxed placeholder:text-slate-400 min-h-[80px]"
                />
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!selectedMood}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  selectedMood
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm shadow-amber-600/20 active:scale-95 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simpan Perasaan Hari Ini</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Mood History & Reflection Insights */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Riwayat Suasana Hatimu
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {entries.length} catatan tersimpan di HP-mu
          </span>
        </div>

        {entries.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-4 text-center">
            Belum ada catatan mood. Mulai catat suasana hatimu hari ini!
          </p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => {
              const moodInfo = MOOD_OPTIONS.find((m) => m.type === entry.mood);
              return (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-1 bg-white rounded-xl border border-slate-200/70 shadow-2xs">
                      {moodInfo?.emoji || '😐'}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">
                          {moodInfo?.label || 'Biasa'}
                        </span>
                        <span className="text-[11px] text-slate-400">·</span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {entry.date}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          "{entry.note}"
                        </p>
                      )}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {entry.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
