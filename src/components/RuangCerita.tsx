import React, { useState } from 'react';
import {
  BookOpen,
  Lock,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Search,
  CheckCircle2,
  Heart,
  ChevronRight,
  Eye,
  X,
} from 'lucide-react';
import { JournalEntry, MoodType } from '../types';
import { soundEngine } from '../utils/audio';

const GUIDED_PROMPTS = [
  'Apa hal paling mengganjal di pikiranmu saat ini yang belum sempat kamu ceritakan?',
  'Jika perasaan lelahmu hari ini bisa bicara, apa yang ingin dia sampaikan?',
  'Tuliskan satu hal kecil yang membuatmu tersenyum atau merasa hangat hari ini.',
  'Apa kalimat penyemangat yang paling ingin kamu dengar dari seseorang sekarang?',
  'Bebas bercerita tanpa filter tentang harimu...',
];

export const RuangCerita: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('nyalara_journal_entries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'journal-1',
        title: 'Hari yang terasa cukup berat di sekolah',
        content:
          'Hari ini waktu ulangan matematika rasanya kepalaku blank total. Padahal malamnya udah belajar sampai jam 12 malam. Sempat ngerasa kecewa banget sama diri sendiri. Tapi waktu pulang, aku beli es teh dan duduk di taman sebentar. Mencoba meyakinkan diri kalau nilai ujian nggak mendefinisikan seluruh nilaiku sebagai manusia.',
        moodTag: 'lelah-cemas',
        promptUsed: 'Apa hal paling mengganjal di pikiranmu saat ini yang belum sempat kamu ceritakan?',
        isFavorite: true,
        createdAt: Date.now() - 86400000,
        dateStr: new Date(Date.now() - 86400000).toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      },
    ];
  });

  const [isWriting, setIsWriting] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string>(GUIDED_PROMPTS[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moodTag, setMoodTag] = useState<MoodType>('tenang');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReadingEntry, setActiveReadingEntry] = useState<JournalEntry | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    soundEngine.playChime(587.33); // D5 chime

    const newEntry: JournalEntry = {
      id: 'entry-' + Date.now(),
      title: title.trim(),
      content: content.trim(),
      moodTag,
      promptUsed: selectedPrompt,
      createdAt: Date.now(),
      dateStr: new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('nyalara_journal_entries', JSON.stringify(updated));

    // Reset form
    setTitle('');
    setContent('');
    setIsWriting(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus cerita ini dari jurnal pribadimu?')) {
      const updated = entries.filter((e) => e.id !== id);
      setEntries(updated);
      localStorage.setItem('nyalara_journal_entries', JSON.stringify(updated));
      if (activeReadingEntry?.id === id) {
        setActiveReadingEntry(null);
      }
    }
  };

  const filteredEntries = entries.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      (item.promptUsed && item.promptUsed.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-white p-6 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
              2
            </span>
            <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">
              Ideasi Crazy 8 • Ruang Cerita
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Jurnal Privat & Refleksi Hati
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            100% tersimpan aman di perangkatmu — tidak ada orang lain yang bisa membaca.
          </p>
        </div>

        {!isWriting && (
          <button
            onClick={() => setIsWriting(true)}
            className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm shadow-orange-600/20 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Cerita Baru</span>
          </button>
        )}
      </div>

      {/* Writing Form */}
      {isWriting && (
        <div className="bg-white p-6 rounded-3xl border border-orange-200 shadow-md space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Menulis Tanpa Tekanan
            </h3>
            <button
              onClick={() => setIsWriting(false)}
              className="text-xs text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Guided Prompt Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Pilih Pemicu Refleksi (Prompt):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {GUIDED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPrompt(prompt)}
                  className={`px-3 py-1.5 text-xs text-left rounded-xl border transition-all ${
                    selectedPrompt === prompt
                      ? 'bg-orange-100/70 border-orange-300 text-orange-950 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Judul Cerita:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Melepaskan beban hari ini..."
                className="w-full p-3 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-semibold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Isi Cerita / Pengalamanmu:
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tuliskan apapun yang kamu rasakan, tanpa perlu khawatir tata bahasa atau penilaian orang lain..."
                className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 min-h-[160px] leading-relaxed"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold">Suasana:</span>
                <select
                  value={moodTag}
                  onChange={(e) => setMoodTag(e.target.value as MoodType)}
                  className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none"
                >
                  <option value="tenang">😌 Tenang & Bersyukur</option>
                  <option value="sangat-baik">🥰 Sangat Baik</option>
                  <option value="biasa">😐 Biasa Saja</option>
                  <option value="lelah-cemas">😮‍💨 Cemas / Lelah</option>
                  <option value="tertekan">🥺 Sedih / Tertekan</option>
                </select>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsWriting(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-sm transition-transform active:scale-95"
                >
                  Simpan ke Jurnal Pribadi
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Entry List with Search */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Koleksi Ceritamu ({filteredEntries.length})
            </h3>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari dalam cerita..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <p className="text-xs text-slate-500">
              {searchQuery
                ? 'Tidak ada cerita yang cocok dengan kata kunci tersebut.'
                : 'Belum ada cerita yang tersimpan. Klik "Tulis Cerita Baru" untuk menuangkan pikiranmu.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => setActiveReadingEntry(entry)}
                className="p-5 rounded-2xl border border-slate-200/80 hover:border-orange-300 hover:shadow-xs transition-all bg-slate-50/40 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {entry.dateStr}
                    </span>
                    <span className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 capitalize">
                      {entry.moodTag?.replace('-', ' ')}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                    {entry.title}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {entry.content}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-orange-600 font-semibold">
                  <span className="text-[11px] text-slate-400 font-normal">
                    Klik untuk membaca utuh
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reading Entry Modal */}
      {activeReadingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            <div className="p-6 bg-amber-50/50 border-b border-amber-100 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activeReadingEntry.dateStr}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeReadingEntry.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveReadingEntry(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {activeReadingEntry.promptUsed && (
                <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-xs text-orange-900">
                  <span className="font-semibold block mb-0.5">Pemicu Refleksi:</span>
                  "{activeReadingEntry.promptUsed}"
                </div>
              )}

              <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-normal">
                {activeReadingEntry.content}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleDelete(activeReadingEntry.id)}
                className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Cerita</span>
              </button>
              <button
                onClick={() => setActiveReadingEntry(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800"
              >
                Selesai Membaca
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
