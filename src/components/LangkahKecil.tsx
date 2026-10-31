import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Award,
  Sparkles,
  Sprout,
  Heart,
  X,
  Trash2,
} from 'lucide-react';
import { MicroHabit } from '../types';
import { INITIAL_HABITS } from '../data/initialData';
import { soundEngine } from '../utils/audio';

export const LangkahKecil: React.FC = () => {
  const [habits, setHabits] = useState<MicroHabit[]>(() => {
    const saved = localStorage.getItem('nyalara_micro_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<MicroHabit['category']>('pikiran');
  const [celebrationToast, setCelebrationToast] = useState<string | null>(null);

  const completedCount = habits.filter((h) => h.completed).length;
  const progressPercent = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  const handleToggleHabit = (id: string) => {
    const updated = habits.map((h) => {
      if (h.id !== id) return h;
      const nextCompleted = !h.completed;

      if (nextCompleted) {
        soundEngine.playChime(660); // E5 chime
        setCelebrationToast(`Bagus sekali! Satu langkah kecil selesai: "${h.title}" 🎉`);
        setTimeout(() => setCelebrationToast(null), 3000);
      }

      return {
        ...h,
        completed: nextCompleted,
        streak: nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1),
      };
    });

    setHabits(updated);
    localStorage.setItem('nyalara_micro_habits', JSON.stringify(updated));
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    soundEngine.playChime(520);
    const newH: MicroHabit = {
      id: 'habit-' + Date.now(),
      title: newTitle.trim(),
      description: newDesc.trim() || 'Langkah kecil untuk merawat dirimu hari ini.',
      category: newCategory,
      completed: false,
      streak: 0,
    };

    const updated = [...habits, newH];
    setHabits(updated);
    localStorage.setItem('nyalara_micro_habits', JSON.stringify(updated));

    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  const handleDeleteHabit = (id: string) => {
    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
    localStorage.setItem('nyalara_micro_habits', JSON.stringify(updated));
  };

  const getTreeStage = () => {
    if (completedCount === 0) return { emoji: '🌱', label: 'Tunas Baru', desc: 'Setiap langkah besar berawal dari satu keputusan kecil.' };
    if (completedCount <= 2) return { emoji: '🌿', label: 'Tumbuh Segar', desc: 'Akar ketenanganmu mulai terbentuk perlahan.' };
    if (completedCount <= 4) return { emoji: '🪴', label: 'Rimbun Bertunas', desc: 'Kamu telah merawat dirimu dengan penuh kasih hari ini!' };
    return { emoji: '🌸', label: 'Mekar Berbunga', desc: 'Luar biasa! Hatimu pantas mendapatkan apresiasi tertinggi.' };
  };

  const treeStage = getTreeStage();

  return (
    <div className="space-y-6">
      {/* Celebration Toast */}
      {celebrationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{celebrationToast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-br from-sky-50 via-teal-50/40 to-white p-6 rounded-3xl border border-sky-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
              8
            </span>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              Ideasi Crazy 8 • Langkah Kecil
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Tujuan Sederhana & Perkembangan Diri
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tidak perlu terburu-buru. Melangkah perlahan tapi pasti tetap membawamu ke depan.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm shadow-sky-600/20 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Langkah Baru</span>
        </button>
      </div>

      {/* Growth Garden Progress Card */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-6 rounded-3xl border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-4xl shadow-xs shrink-0">
            {treeStage.emoji}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Pohon Perkembangan Dirimu
              </span>
              <span className="text-xs font-bold text-slate-800">
                {treeStage.label}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {treeStage.desc}
            </p>
            <div className="text-[11px] font-semibold text-emerald-900 pt-0.5">
              {completedCount} dari {habits.length} langkah tercapai ({progressPercent}%)
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full sm:w-48 space-y-1.5 shrink-0">
          <div className="w-full h-3 bg-emerald-200/50 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-medium">
            <span>Awal Hari</span>
            <span>Semua Selesai</span>
          </div>
        </div>
      </div>

      {/* Modal Add Habit */}
      {isAdding && (
        <div className="bg-white p-6 rounded-3xl border border-sky-200 shadow-md space-y-4 animate-in fade-in">
          <h3 className="font-bold text-sm text-slate-900">
            Tetapkan Langkah Kecil yang Nyaman untukmu
          </h3>
          <p className="text-xs text-slate-500">
            Pilihlah hal yang mudah dilakukan dalam 1-5 menit agar tidak membebani mental.
          </p>

          <form onSubmit={handleAddHabit} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Langkah / Kebiasaan:
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Misal: Jalan santai 5 menit tanpa pegang HP"
                className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Keterangan Singkat:
              </label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Misal: Biar mata istirahat dari layar laptop"
                className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Fokus:</span>
              <select
                value={newCategory}
                onChange={(e) =>
                  setNewCategory(e.target.value as MicroHabit['category'])
                }
                className="p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800"
              >
                <option value="tubuh">Kesehatan Tubuh</option>
                <option value="pikiran">Ketenangan Pikiran</option>
                <option value="istirahat">Istirahat & Tidur</option>
                <option value="sosial">Koneksi Sosial</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl shadow-sm"
              >
                Simpan Langkah
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Habits List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          Daftar Langkah Hari Ini
        </h3>

        <div className="space-y-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              onClick={() => handleToggleHabit(habit.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                habit.completed
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                >
                  {habit.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300" />
                  )}
                </button>

                <div className="space-y-0.5">
                  <h4
                    className={`text-xs sm:text-sm font-bold transition-all ${
                      habit.completed
                        ? 'line-through text-slate-400 font-medium'
                        : 'text-slate-900'
                    }`}
                  >
                    {habit.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {habit.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {habit.streak > 0 && (
                  <span className="text-[11px] font-semibold text-orange-700 bg-orange-50 border border-orange-200/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                    <span>{habit.streak} hari</span>
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteHabit(habit.id);
                  }}
                  title="Hapus"
                  className="text-slate-300 hover:text-rose-500 p-1 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
