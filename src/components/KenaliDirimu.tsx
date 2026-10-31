import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  HelpCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  ChevronRight,
  Brain,
} from 'lucide-react';
import { EducationArticle } from '../types';
import { EDUCATION_ARTICLES } from '../data/initialData';
import { soundEngine } from '../utils/audio';

const QUIZ_QUESTIONS = [
  {
    question: 'Ketika kamu tiba-tiba dihadapkan pada situasi yang sangat berat atau mengecewakan, apa reaksi pertamamu?',
    options: [
      { text: 'Menulis jurnal, menyendiri sejenak, atau berdoa untuk mencari ketenangan batin.', type: 'reflektif' },
      { text: 'Mencoba memahami pelajaran dari kejadian itu dan menyemangati diri dengan afirmasi.', type: 'adaptif' },
      { text: 'Mencari teman terpercaya atau curhat lewat chat sebelum siap bicara langsung.', type: 'relasional' },
      { text: 'Menarik diri total dan memendamnya sendiri karena takut merepotkan orang lain.', type: 'waspada' },
    ],
  },
  {
    question: 'Saat kepalamu dipenuhi overthinking di malam hari, hal apa yang biasanya paling menolongmu?',
    options: [
      { text: 'Mencatat pikiran-pikiran itu di secarik kertas agar keluar dari kepala.', type: 'reflektif' },
      { text: 'Mengingatkan diri pada hal-hal yang masih berada di bawah kendaliku.', type: 'adaptif' },
      { text: 'Membaca cerita orang lain atau berbagi secara anonim di ruang yang suportif.', type: 'relasional' },
      { text: 'Mengalihkan perhatian dengan musik atau tidur meski perasaan masih mengganjal.', type: 'waspada' },
    ],
  },
  {
    question: 'Bagi dirimu, apa arti sebuah "ruang aman" yang ideal?',
    options: [
      { text: 'Tempat tanpa gangguan di mana aku bisa jujur pada diriku sendiri 100%.', type: 'reflektif' },
      { text: 'Tempat yang memberiku sudut pandang baru yang positif dan harapan untuk pulih.', type: 'adaptif' },
      { text: 'Tempat di mana ada orang yang mendengarkan tanpa menghakimi atau menceramahiku.', type: 'relasional' },
      { text: 'Tempat yang benar-benar menjaga kerahasiaan dan privasiku tanpa jejak.', type: 'waspada' },
    ],
  },
];

export const KenaliDirimu: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<EducationArticle | null>(null);

  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const handleSelectQuizOption = (type: string) => {
    soundEngine.playChime(620);
    const updated = [...selectedAnswers, type];
    setSelectedAnswers(updated);

    if (quizStep + 1 < QUIZ_QUESTIONS.length) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate majority archetype
      const counts: Record<string, number> = {};
      updated.forEach((t) => (counts[t] = (counts[t] || 0) + 1));
      let topType = 'reflektif';
      let maxCount = 0;
      Object.entries(counts).forEach(([k, v]) => {
        if (v > maxCount) {
          maxCount = v;
          topType = k;
        }
      });
      setQuizResult(topType);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setSelectedAnswers([]);
    setQuizResult(null);
  };

  const getQuizResultDetails = (type: string) => {
    switch (type) {
      case 'reflektif':
        return {
          title: 'Tipe Reflektif (Mirip Karakter NA)',
          badge: 'Pendengar Hati & Pemikir Dalam',
          desc: 'Kamu memiliki kecerdasan intrapersonal yang kuat. Kamu terbiasa memproses emosi lewat tulisan, doa, dan kontemplasi mandiri. Ruang Cerita dan Jurnal Privat adalah sekutu terbaikmu.',
          advice: 'Jangan ragu untuk sesekali membagi sedikit bebanmu ke sahabat atau orang tua; kamu tidak selalu harus memikul semuanya sendirian.',
        };
      case 'adaptif':
        return {
          title: 'Tipe Adaptif (Mirip Karakter AW)',
          badge: 'Pencari Makna & Resilien',
          desc: 'Kamu selalu berusaha menemukan makna dari setiap kesulitan. Afirmasi positif, istirahat cukup, dan pemikiran rasional membantumu bangkit kembali.',
          advice: 'Izinkan dirimu untuk merasa sedih tanpa terburu-buru "harus positif". Emosi sedih juga butuh ruang untuk diakui.',
        };
      case 'relasional':
        return {
          title: 'Tipe Relasional (Koneksi Suportif)',
          badge: 'Pencari Dukungan Empatik',
          desc: 'Kehadiran seorang pendengar yang hangat sangat berharga bagimu. Kamu merasa lebih ringan saat tahu ada orang lain yang memahami perjuanganmu tanpa menghakimi.',
          advice: 'Teman Dengar dan Support Circle adalah ruang yang sangat cocok untukmu agar tidak merasa terisolasi.',
        };
      default:
        return {
          title: 'Tipe Penjaga Privasi (Mirip Karakter RA)',
          badge: 'Hati-Hati & Menjaga Batasan Diri',
          desc: 'Keamanan, privasi, dan kendali atas cerita sangat penting bagimu sebelum membuka diri. Kamu lebih nyaman mengekspresikan diri secara anonim atau lewat teks.',
          advice: 'Apresiasi kebutuhan privasimu. Mode anonim di Nyalara dirancang khusus untuk memberimu rasa aman penuh.',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50/40 to-white p-6 rounded-3xl border border-purple-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
              6
            </span>
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">
              Ideasi Crazy 8 • Kenali Dirimu
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Pojok Psikoedukasi & Refleksi Diri
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pahami cara kerja emosi, bangun belas kasih pada diri sendiri, dan temukan kekuatanmu.
          </p>
        </div>
      </div>

      {/* Interactive Mini-Quiz Section */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Kuis Kilat: Kenali Cara Koping Emosimu (1 Menit)
          </h3>
        </div>

        {!quizResult ? (
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-purple-800">
                Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}
              </span>
              <span>Pilih yang paling mewakili dirimu</span>
            </div>

            <p className="font-bold text-sm text-slate-900 leading-snug">
              {QUIZ_QUESTIONS[quizStep].question}
            </p>

            <div className="space-y-2">
              {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectQuizOption(opt.type)}
                  className="w-full p-3.5 text-left text-xs bg-white rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 transition-all text-slate-700 font-medium flex items-center justify-between group"
                >
                  <span>{opt.text}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-purple-50/80 border border-purple-200 p-6 rounded-2xl space-y-3 animate-in fade-in">
            {(() => {
              const res = getQuizResultDetails(quizResult);
              return (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-300">
                      {res.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {res.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {res.desc}
                  </p>
                  <div className="p-3 bg-white/90 rounded-xl border border-purple-100 text-xs text-purple-950">
                    <strong className="text-purple-900">Saran Pemulihanmu: </strong>
                    {res.advice}
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={resetQuiz}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl transition-colors"
                    >
                      Ulangi Kuis
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Bite-Sized Psychoeducation Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-purple-600" />
          Bacaan Refleksi & Wawasan Emosi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EDUCATION_ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="p-5 bg-white rounded-3xl border border-slate-200/80 hover:border-purple-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                  {article.title}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-purple-100 flex flex-col">
            <div className="p-6 bg-purple-50/60 border-b border-purple-100 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block mb-1">
                  {activeArticle.category} • {activeArticle.readTime}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Key Takeaway Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium leading-relaxed">
                <span className="font-bold block mb-1 text-amber-900">
                  ✨ Inti Pembelajaran:
                </span>
                "{activeArticle.keyTakeaway}"
              </div>

              {/* Sections */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeArticle.contentSections.map((sec, i) => (
                  <div key={i} className="space-y-1">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {sec.heading}
                    </h5>
                    <p className="text-slate-600">{sec.body}</p>
                  </div>
                ))}
              </div>

              {/* Action Prompt */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1">
                <span className="font-bold text-slate-900 block">
                  🎯 Ajakan Refleksi Sederhana:
                </span>
                <p>{activeArticle.actionPrompt}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800"
              >
                Tutup Bacaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
