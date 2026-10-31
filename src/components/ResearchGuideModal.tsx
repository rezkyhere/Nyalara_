import React, { useState } from 'react';
import {
  X,
  Compass,
  Users,
  Target,
  Sparkles,
  ClipboardList,
  CheckCircle2,
  HelpCircle,
  FileText,
  Save,
} from 'lucide-react';
import { RESEARCH_BACKGROUND } from '../data/initialData';

interface ResearchGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeature: (tabId: string) => void;
}

export const ResearchGuideModal: React.FC<ResearchGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectFeature,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'arahan' | 'crazy8' | 'persona' | 'testing'>('arahan');
  const [testNotes, setTestNotes] = useState(() => {
    return localStorage.getItem('nyalara_testing_notes') || '';
  });
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSaveNotes = () => {
    localStorage.setItem('nyalara_testing_notes', testNotes);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const crazy8Mapping = [
    {
      num: 1,
      name: 'Mood Check-In',
      tab: 'mood',
      desc: 'Catat suasana hati harian melalui pilihan emoji dan catatan singkat.',
      rationale: 'Memberi ruang sadar emosi awal tanpa tekanan, membantu remaja menamai apa yang dirasakan (AW & NA).',
    },
    {
      num: 2,
      name: 'Ruang Cerita',
      tab: 'cerita',
      desc: 'Jurnal digital pribadi untuk menuliskan pengalaman, pikiran, dan perasaan.',
      rationale: 'Validasi kebutuhan narasumber NA yang terbiasa menulis saat sedih tanpa khawatir ceritanya dibaca orang lain.',
    },
    {
      num: 3,
      name: 'Teman Dengar',
      tab: 'teman',
      desc: 'Ruang berbagi cerita secara anonim dengan komunitas yang suportif.',
      rationale: 'Menjawab kebutuhan RA yang butuh interaksi anonim dan suportif sebelum siap berbicara tatap muka.',
    },
    {
      num: 4,
      name: 'Daily Reminder',
      tab: 'reminder',
      desc: 'Pengingat berisi afirmasi positif dan pesan penyemangat.',
      rationale: 'Mendukung koping AW yang mengandalkan self-talk positif dan penguatan emosional harian.',
    },
    {
      num: 5,
      name: 'Ruang Tenang',
      tab: 'tenang',
      desc: 'Panduan aktivitas sederhana seperti latihan pernapasan dan relaksasi.',
      rationale: 'Pertolongan pertama ketika pikiran terasa penuh, overthinking, atau detak jantung cepat.',
    },
    {
      num: 6,
      name: 'Kenali Dirimu',
      tab: 'edukasi',
      desc: 'Konten edukasi interaktif tentang emosi, penerimaan diri, dan cara menghadapi masalah.',
      rationale: 'Psikoedukasi agar remaja memahami bahwa emosi negatif itu wajar dan bisa dikelola dengan sehat.',
    },
    {
      num: 7,
      name: 'Support Circle',
      tab: 'support',
      desc: 'Temukan orang-orang terpercaya seperti keluarga, teman, atau profesional.',
      rationale: 'Menghubungkan ke jejaring sosial nyata & hotline resmi jika membutuhkan intervensi mendesak.',
    },
    {
      num: 8,
      name: 'Langkah Kecil',
      tab: 'langkah',
      desc: 'Tetapkan tujuan sederhana, catat pencapaian, dan lihat perkembangan diri.',
      rationale: 'Membangun rasa berdaya (agency) melalui micro-habits tanpa membebani mental remaja.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-sky-100 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-sky-50 via-indigo-50/40 to-white border-b border-sky-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-600/20">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Panduan Pengarah & Riset Nyalara
                </h3>
                <span className="text-[10px] font-semibold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                  SIAP IMPACT 2026
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Peta arah pengembangan prototipe dari Misi 1 Empathize & Define ke Pengujian Lapangan.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-100 bg-slate-50/50 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('arahan')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
              activeSubTab === 'arahan'
                ? 'border-sky-600 text-sky-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Arah Solusi & HMW
          </button>
          <button
            onClick={() => setActiveSubTab('crazy8')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
              activeSubTab === 'crazy8'
                ? 'border-sky-600 text-sky-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Matriks Crazy 8
          </button>
          <button
            onClick={() => setActiveSubTab('persona')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
              activeSubTab === 'persona'
                ? 'border-sky-600 text-sky-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Profil Narasumber (NA, AW, RA)
          </button>
          <button
            onClick={() => setActiveSubTab('testing')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
              activeSubTab === 'testing'
                ? 'border-sky-600 text-sky-900 bg-white shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Panduan Uji & Validasi
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          {/* TAB 1: ARAHAN SOLUSI */}
          {activeSubTab === 'arahan' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                  How Might We (HMW) — Rumusan Masalah
                </span>
                <p className="text-amber-950 font-medium text-sm leading-relaxed">
                  "{RESEARCH_BACKGROUND.hmw}"
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-sky-600" />
                  4 Prinsip Kunci Perancangan Nyalara
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {RESEARCH_BACKGROUND.principles.map((prinsip, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60"
                    >
                      <span className="font-bold text-xs text-slate-900 block mb-1">
                        {i + 1}. {prinsip.title}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {prinsip.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 mb-2">
                  Bagaimana Mengarahkan Pengembangan Prototipe Ini:
                </h4>
                <ol className="list-decimal list-inside text-xs space-y-2 text-slate-600 leading-relaxed">
                  <li>
                    <strong>Uji Langsung 8 Modul:</strong> Gunakan tab navigasi di bawah untuk mencoba setiap fitur Crazy 8 seolah-olah kamu adalah remaja yang sedang mencari ruang tenang.
                  </li>
                  <li>
                    <strong>Validasi Kebutuhan Privasi:</strong> Pastikan remaja merasa aman (jurnal bersifat lokal di perangkat, cerita komunitas anonim tanpa nama asli).
                  </li>
                  <li>
                    <strong>Uji Bahasa & Tone of Voice:</strong> Bahasa yang digunakan harus hangat, santai, tidak kaku, dan tidak terkesan menceramahi atau menggurui.
                  </li>
                  <li>
                    <strong>Akses Bantuan Cepat:</strong> Tombol darurat di pojok kanan atas selalu siap menghubungkan ke hotline resmi jika krisis terjadi.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 2: CRAZY 8 MATRIX */}
          {activeSubTab === 'crazy8' && (
            <div className="space-y-4 animate-in fade-in">
              <p className="text-xs text-slate-600">
                Berikut adalah 8 ideasi solusi dari sketsa <strong>Crazy 8 Nyalara</strong> yang telah diwujudkan menjadi komponen interaktif:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {crazy8Mapping.map((item) => (
                  <div
                    key={item.num}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-sky-300 transition-colors bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-[11px] font-bold">
                            {item.num}
                          </span>
                          {item.name}
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectFeature(item.tab);
                          }}
                          className="text-[11px] text-sky-600 hover:text-sky-800 font-semibold"
                        >
                          Buka Fitur →
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 mb-2 font-medium">
                        {item.desc}
                      </p>
                    </div>
                    <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="font-semibold text-slate-700">Rasional Riset: </span>
                      {item.rationale}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PERSONA DARI WAWANCARA */}
          {activeSubTab === 'persona' && (
            <div className="space-y-4 animate-in fade-in">
              <p className="text-xs text-slate-600">
                Berdasarkan sintesis transkrip wawancara di Misi 1, terdapat 3 profil narasumber yang menjadi acuan kebutuhan:
              </p>
              <div className="space-y-3">
                {RESEARCH_BACKGROUND.personas.map((persona) => (
                  <div
                    key={persona.code}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-900 font-bold text-xs flex items-center justify-center">
                        {persona.code}
                      </span>
                      <span className="font-bold text-xs text-slate-900">
                        Narasumber {persona.code}
                      </span>
                    </div>
                    <div className="text-xs space-y-1.5">
                      <p className="text-slate-600">
                        <strong className="text-slate-800">Pola Pengalaman: </strong>
                        {persona.profile}
                      </p>
                      <p className="text-indigo-900 bg-indigo-50/80 p-2 rounded-xl border border-indigo-100">
                        <strong>Kebutuhan Utama (Needs): </strong>
                        {persona.needs}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PANDUAN UJI & CATATAN VALIDASI */}
          {activeSubTab === 'testing' && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-emerald-600" />
                  Daftar Pertanyaan Uji Pengguna (User Testing Guide)
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-950">
                    <strong>1. Uji Rasa Aman & Privasi:</strong> "Saat pertama kali melihat ruang cerita dan teman dengar, apakah kamu merasa aman dan tidak khawatir ceritamu dihakimi atau bocor?"
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-950">
                    <strong>2. Kemudahan Ekspresi (Mood & Jurnal):</strong> "Apakah pilihan emoji dan panduan menulis membantumu memahami apa yang sebenarnya sedang kamu rasakan hari ini?"
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-950">
                    <strong>3. Fitur Paling Membantu:</strong> "Dari 8 menu yang ada, fitur mana yang paling ingin kamu gunakan ketika kamu sedang merasa tertekan atau capek?"
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-950">
                    <strong>4. Hambatan/Keraguan (Pain Points):</strong> "Apakah ada bagian yang membuatmu bingung, ragu, atau justru merasa tidak nyaman?"
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-950">
                    <strong>5. Harapan Tambahan:</strong> "Dukungan seperti apa lagi yang paling kamu harapkan dari sebuah ruang digital saat kamu menghadapi masalah sulit?"
                  </div>
                </div>
              </div>

              {/* Interactive Notebook for testing */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-600" />
                    Lembar Catatan Uji Pengguna (Tersimpan Otomatis):
                  </label>
                  {isSaved && (
                    <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan!
                    </span>
                  )}
                </div>
                <textarea
                  value={testNotes}
                  onChange={(e) => setTestNotes(e.target.value)}
                  placeholder="Ketik catatan hasil uji dengan responden remaja di sini (misal: 'Responden 1 sangat menyukai pernapasan 4-7-8 karena langsung bikin rileks...')"
                  className="w-full h-32 p-3 text-xs bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 leading-relaxed"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Simpan Catatan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            Nyalara Prototype • Siap digunakan untuk pengujian lapangan Misi 2
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
