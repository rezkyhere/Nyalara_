import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Plus,
  MessageCircleHeart,
  Sparkles,
  Heart,
  Share2,
  Filter,
  Check,
} from 'lucide-react';
import { AnonymousStory } from '../types';
import { INITIAL_STORIES } from '../data/initialData';
import { soundEngine } from '../utils/audio';

const ALIAS_PRESETS = [
  { name: 'Awan Teduh', avatar: '☁️' },
  { name: 'Bintang Senja', avatar: '⭐' },
  { name: 'Kucing Pustaka', avatar: '🐱' },
  { name: 'Daun Hujan', avatar: '🍃' },
  { name: 'Cahaya Lilin', avatar: '🕯️' },
  { name: 'Bunga Kaktus', avatar: '🌵' },
  { name: 'Kopi Hangat', avatar: '☕' },
];

export const TemanDengar: React.FC = () => {
  const [stories, setStories] = useState<AnonymousStory[]>(() => {
    const saved = localStorage.getItem('nyalara_community_stories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_STORIES;
  });

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<AnonymousStory['category']>('sekolah');
  const [selectedAlias, setSelectedAlias] = useState(ALIAS_PRESETS[0]);
  const [reactionToast, setReactionToast] = useState<string | null>(null);

  const handleReact = (storyId: string, reactionType: 'hug' | 'notAlone' | 'strength') => {
    soundEngine.playChime(659.25); // E5 chime

    const updated = stories.map((s) => {
      if (s.id !== storyId) return s;

      const userReacted = s.userReacted || [];
      const hasReacted = userReacted.includes(reactionType);

      const newReactions = { ...s.reactions };
      if (hasReacted) {
        newReactions[reactionType] = Math.max(0, newReactions[reactionType] - 1);
        return {
          ...s,
          reactions: newReactions,
          userReacted: userReacted.filter((r) => r !== reactionType),
        };
      } else {
        newReactions[reactionType] = newReactions[reactionType] + 1;
        return {
          ...s,
          reactions: newReactions,
          userReacted: [...userReacted, reactionType],
        };
      }
    });

    setStories(updated);
    localStorage.setItem('nyalara_community_stories', JSON.stringify(updated));

    const labels = {
      hug: 'Pelukan hangat terkirim! 🤗',
      notAlone: 'Kamu mengirim pesan: Kamu Tidak Sendirian 🤍',
      strength: 'Energi positif terkirim! ✨',
    };
    setReactionToast(labels[reactionType]);
    setTimeout(() => setReactionToast(null), 2500);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    soundEngine.playChime(523.25); // C5 chime

    const newStory: AnonymousStory = {
      id: 'story-' + Date.now(),
      authorAlias: selectedAlias.name,
      authorAvatar: selectedAlias.avatar,
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      timeAgo: 'Baru saja',
      reactions: {
        hug: 1,
        notAlone: 1,
        strength: 1,
      },
      userReacted: ['hug'],
    };

    const updated = [newStory, ...stories];
    setStories(updated);
    localStorage.setItem('nyalara_community_stories', JSON.stringify(updated));

    setNewTitle('');
    setNewContent('');
    setIsPostingModalOpen(false);
  };

  const filtered = stories.filter((s) => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {reactionToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>{reactionToast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50/40 to-white p-6 rounded-3xl border border-indigo-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-indigo-500 text-white font-bold text-xs flex items-center justify-center">
              3
            </span>
            <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
              Ideasi Crazy 8 • Teman Dengar
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Ruang Berbagi Cerita Anonim
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Saling menguatkan tanpa identitas asli. Tempat aman untuk didengar tanpa takut dihakimi.
          </p>
        </div>

        <button
          onClick={() => setIsPostingModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm shadow-indigo-600/20 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Bagikan Cerita Anonim</span>
        </button>
      </div>

      {/* Safety Pledge Banner */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-slate-900">
            Janji Ruang Aman Komunitas:
          </span>
          <p className="text-slate-600 leading-relaxed">
            Tidak ada komentar menghakimi atau meremehkan. Semua nama disamarkan secara otomatis demi menjaga privasi dan ketenangan bersama.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Semua Cerita' },
          { id: 'sekolah', label: 'Sekolah & Tekanan' },
          { id: 'pertemanan', label: 'Pertemanan' },
          { id: 'keluarga', label: 'Keluarga' },
          { id: 'diri-sendiri', label: 'Diri Sendiri' },
          { id: 'kemenangan-kecil', label: 'Kemenangan Kecil 🎉' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterCategory === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Story Cards Feed */}
      <div className="space-y-4">
        {filtered.map((story) => (
          <div
            key={story.id}
            className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3.5"
          >
            {/* Author lockup */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl p-1 bg-slate-50 rounded-xl border border-slate-100">
                  {story.authorAvatar}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">
                      {story.authorAlias}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      (Anonim)
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {story.timeAgo}
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-medium bg-slate-50 border border-slate-200/80 text-slate-600 px-2 py-0.5 rounded-lg capitalize">
                {story.category.replace('-', ' ')}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                {story.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {story.content}
              </p>
            </div>

            {/* Supportive Reaction Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleReact(story.id, 'hug')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  story.userReacted?.includes('hug')
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <span>🤗</span>
                <span>Peluk Hangat</span>
                <span className="font-mono text-[11px] opacity-80">
                  ({story.reactions.hug})
                </span>
              </button>

              <button
                onClick={() => handleReact(story.id, 'notAlone')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  story.userReacted?.includes('notAlone')
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <span>🤍</span>
                <span>Kamu Gak Sendirian</span>
                <span className="font-mono text-[11px] opacity-80">
                  ({story.reactions.notAlone})
                </span>
              </button>

              <button
                onClick={() => handleReact(story.id, 'strength')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  story.userReacted?.includes('strength')
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <span>✨</span>
                <span>Kirim Energi</span>
                <span className="font-mono text-[11px] opacity-80">
                  ({story.reactions.strength})
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Write Anonymous Story */}
      {isPostingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-indigo-100 flex flex-col">
            <div className="p-6 bg-indigo-50/50 border-b border-indigo-100">
              <h3 className="font-bold text-base text-slate-900">
                Tulis Ceritamu Secara Anonim
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Pilih nama samaran lucu dan tuangkan perasaanmu dengan aman.
              </p>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              {/* Alias Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Pilih Nama Samaranmu:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALIAS_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setSelectedAlias(preset)}
                      className={`px-2.5 py-1 text-xs rounded-xl border flex items-center gap-1.5 transition-all ${
                        selectedAlias.name === preset.name
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{preset.avatar}</span>
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Kategori Cerita:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as AnonymousStory['category'])
                  }
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none"
                >
                  <option value="sekolah">Sekolah & Tekanan Akademik</option>
                  <option value="pertemanan">Pertemanan & Circle</option>
                  <option value="keluarga">Keluarga & Rumah</option>
                  <option value="diri-sendiri">Diri Sendiri & Overthinking</option>
                  <option value="kemenangan-kecil">Kemenangan Kecil & Harapan</option>
                </select>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Judul Cerita:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Rasanya mau istirahat sebentar dari ekspektasi..."
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold"
                  required
                />
              </div>

              {/* Body */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Cerita Lengkap:
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Ketik apa yang sedang kamu rasakan. Ceritamu akan dibaca oleh teman-teman sesama remaja yang suportif..."
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[140px] leading-relaxed"
                  required
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                🛡️ Cerita tidak menampilkan data pribadi, nomor HP, ataupun akun media sosial demi keamananmu.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPostingModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-transform active:scale-95"
                >
                  Kirim Cerita Anonim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
