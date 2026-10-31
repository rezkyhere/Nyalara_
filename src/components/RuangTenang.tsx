import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Eye,
  CheckCircle2,
  Wind,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

type BreathMode = '4-7-8' | 'box' | 'calm';

export const RuangTenang: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pernapasan' | 'grounding' | 'suara'>('pernapasan');

  // Breathing state
  const [breathMode, setBreathMode] = useState<BreathMode>('4-7-8');
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Tarik Napas' | 'Tahan Napas' | 'Hembuskan'>('Tarik Napas');
  const [countdown, setCountdown] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  // Grounding state
  const [groundingStep, setGroundingStep] = useState(0);
  const [groundingAnswers, setGroundingAnswers] = useState<string[]>(['', '', '', '', '']);

  // Ambient sound state
  const [ambientMode, setAmbientMode] = useState<'rain' | 'waves' | 'stream' | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Breathing phase manager
  useEffect(() => {
    if (!isBreathingActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // Config per mode
    let inhaleTime = 4;
    let holdTime = 7;
    let exhaleTime = 8;
    let postHoldTime = 0;

    if (breathMode === 'box') {
      inhaleTime = 4;
      holdTime = 4;
      exhaleTime = 4;
      postHoldTime = 4;
    } else if (breathMode === 'calm') {
      inhaleTime = 3;
      holdTime = 1;
      exhaleTime = 6;
      postHoldTime = 0;
    }

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase transitions
        if (breathPhase === 'Tarik Napas') {
          soundEngine.playChime(520);
          setBreathPhase('Tahan Napas');
          return holdTime;
        } else if (breathPhase === 'Tahan Napas') {
          soundEngine.playChime(392);
          setBreathPhase('Hembuskan');
          return exhaleTime;
        } else {
          // Finished cycle
          soundEngine.playChime(440);
          setCompletedCycles((c) => c + 1);
          setBreathPhase('Tarik Napas');
          return inhaleTime;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isBreathingActive, breathPhase, breathMode]);

  const handleStartBreathing = () => {
    soundEngine.playChime(520);
    setBreathPhase('Tarik Napas');
    setCountdown(breathMode === 'calm' ? 3 : 4);
    setIsBreathingActive(true);
  };

  const handleStopBreathing = () => {
    setIsBreathingActive(false);
    setCountdown(4);
    setBreathPhase('Tarik Napas');
  };

  const handleToggleAmbient = (type: 'rain' | 'waves' | 'stream') => {
    if (ambientMode === type) {
      soundEngine.stopAmbient();
      setAmbientMode(null);
    } else {
      soundEngine.startAmbient(type, 0.2);
      setAmbientMode(type);
    }
  };

  // Visual scaling calculation for circle animation
  const getCircleScale = () => {
    if (!isBreathingActive) return 'scale-100';
    if (breathPhase === 'Tarik Napas') return 'scale-125 transition-transform duration-[4000ms] ease-out';
    if (breathPhase === 'Tahan Napas') return 'scale-125';
    return 'scale-90 transition-transform duration-[7000ms] ease-in';
  };

  const GROUNDING_PROMPTS = [
    {
      count: '5',
      title: 'Hal yang bisa kamu LIHAT di sekitarmu',
      helper: 'Perhatikan detail kecil: warna dinding, pola lantai, bayangan cahaya, atau benda di dekatmu.',
    },
    {
      count: '4',
      title: 'Hal yang bisa kamu SENTUH / RABA',
      helper: 'Rasakan tekstur bajumu, dinginnya meja, telapak kakimu yang menyentuh lantai.',
    },
    {
      count: '3',
      title: 'Hal yang bisa kamu DENGAR',
      helper: 'Suara pendingin ruangan, kendaraan jauh, derau napasmu sendiri, atau kicau burung.',
    },
    {
      count: '2',
      title: 'Hal yang bisa kamu CIUM / AROMA',
      helper: 'Aroma kopi, sabun, wangi ruangan, atau hembusan udara segar.',
    },
    {
      count: '1',
      title: 'Hal baik yang kamu RASAKAN atau SYUKURI',
      helper: 'Rasa air yang baru kamu minum, atau rasa terima kasih pada tubuhmu yang masih bernapas.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-teal-50 via-sky-50/40 to-white p-6 rounded-3xl border border-teal-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
              5
            </span>
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              Ideasi Crazy 8 • Ruang Tenang
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Istirahat & Kendalikan Ritme Napas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Saat detak jantung berdebar atau pikiran kalut, beri jeda untuk kembali ke saat ini.
          </p>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('pernapasan')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'pernapasan'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wind className="w-3.5 h-3.5" />
          <span>Latihan Napas</span>
        </button>

        <button
          onClick={() => setActiveTab('grounding')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'grounding'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Grounding 5-4-3-2-1</span>
        </button>

        <button
          onClick={() => setActiveTab('suara')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'suara'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Suara Alam</span>
        </button>
      </div>

      {/* 1. INTERACTIVE BREATHING */}
      {activeTab === 'pernapasan' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-8 animate-in fade-in">
          {/* Technique Selector */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: '4-7-8', label: 'Metode 4-7-8 (Menenangkan Cemas)', detail: 'Tarik 4s • Tahan 7s • Hembus 8s' },
              { id: 'box', label: 'Box Breathing 4-4-4-4', detail: 'Tarik 4s • Tahan 4s • Hembus 4s' },
              { id: 'calm', label: 'Napas Lepas Cepat', detail: 'Tarik 3s • Hembus Panjang 6s' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  if (!isBreathingActive) setBreathMode(m.id as BreathMode);
                }}
                disabled={isBreathingActive}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                  breathMode === m.id
                    ? 'bg-teal-50 border-teal-300 text-teal-900 font-bold shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                } ${isBreathingActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div>{m.label}</div>
                <div className="text-[10px] text-slate-400 font-normal">{m.detail}</div>
              </button>
            ))}
          </div>

          {/* Interactive Breathing Bubble */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Soft background aura */}
              <div
                className={`absolute inset-0 rounded-full bg-teal-100/50 blur-xl transition-all duration-1000 ${
                  isBreathingActive ? 'scale-110 opacity-70' : 'scale-90 opacity-30'
                }`}
              />

              {/* Main Breathing Circle */}
              <div
                className={`w-52 h-52 rounded-full flex flex-col items-center justify-center text-center shadow-lg border-4 ${
                  breathPhase === 'Tarik Napas'
                    ? 'bg-gradient-to-tr from-teal-400 to-emerald-300 border-teal-200 text-white shadow-teal-500/20'
                    : breathPhase === 'Tahan Napas'
                    ? 'bg-gradient-to-tr from-amber-400 to-orange-300 border-amber-200 text-white shadow-amber-500/20'
                    : 'bg-gradient-to-tr from-sky-400 to-indigo-300 border-sky-200 text-white shadow-sky-500/20'
                } ${getCircleScale()}`}
              >
                <span className="text-xs uppercase tracking-widest font-bold opacity-90">
                  {isBreathingActive ? breathPhase : 'Siap Mulai'}
                </span>
                <span className="text-5xl font-mono font-bold mt-1 tabular-nums">
                  {isBreathingActive ? countdown : '🌿'}
                </span>
                <span className="text-[11px] opacity-80 mt-1">
                  {isBreathingActive ? 'Ikuti irama lembut ini' : 'Klik Mulai di Bawah'}
                </span>
              </div>
            </div>

            {/* Completed cycles count */}
            {completedCycles > 0 && (
              <p className="text-xs font-semibold text-teal-800 mt-4 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                ✨ Kamu sudah menyelesaikan {completedCycles} putaran napas penuh
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            {!isBreathingActive ? (
              <button
                onClick={handleStartBreathing}
                className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-teal-600/20 transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Mulai Latihan Pernapasan</span>
              </button>
            ) : (
              <button
                onClick={handleStopBreathing}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <Pause className="w-4 h-4" />
                <span>Hentikan Sejenak</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. GROUNDING 5-4-3-2-1 */}
      {activeTab === 'grounding' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
          <div className="max-w-xl mx-auto text-center space-y-2">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Teknik Grounding 5-4-3-2-1
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Kembalikan Kesadaran ke Masa Kini
            </h3>
            <p className="text-xs text-slate-600">
              Saat overthinking menarikmu ke masa lalu atau masa depan yang belum tentu terjadi, panca inderamu adalah jangkar terbaik.
            </p>
          </div>

          {/* Current Grounding Step */}
          <div className="max-w-lg mx-auto bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-2xl flex items-center justify-center shadow-sm">
                {GROUNDING_PROMPTS[groundingStep].count}
              </span>
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  Langkah {groundingStep + 1} dari 5
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {GROUNDING_PROMPTS[groundingStep].title}
                </h4>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200/60 leading-relaxed">
              💡 {GROUNDING_PROMPTS[groundingStep].helper}
            </p>

            <textarea
              value={groundingAnswers[groundingStep]}
              onChange={(e) => {
                const updated = [...groundingAnswers];
                updated[groundingStep] = e.target.value;
                setGroundingAnswers(updated);
              }}
              placeholder="Ketik apa yang kamu amati di sekitarmu sekarang..."
              className="w-full p-3 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[90px]"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                disabled={groundingStep === 0}
                onClick={() => setGroundingStep((s) => Math.max(0, s - 1))}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 disabled:opacity-40 transition-colors"
              >
                Sebelumnya
              </button>

              {groundingStep < 4 ? (
                <button
                  onClick={() => {
                    soundEngine.playChime(600);
                    setGroundingStep((s) => s + 1);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-transform active:scale-95"
                >
                  Lanjut ke Langkah Berikutnya →
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundEngine.playChime(659);
                    alert('Luar biasa! Kamu telah mengaitkan kembali pikiranmu ke saat ini. Beri pelukan hangat untuk dirimu sendiri 💛');
                    setGroundingStep(0);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-transform active:scale-95"
                >
                  Selesai Grounding ✨
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. SUARA ALAM PENENANG */}
      {activeTab === 'suara' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 animate-in fade-in">
          <div className="max-w-xl mx-auto text-center space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Pilihan Suara Alam Menenangkan
            </h3>
            <p className="text-xs text-slate-500">
              Disintesis langsung di perambanmu tanpa kuota streaming tambahan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { id: 'rain', name: 'Hujan di Jendela', icon: '🌧️', desc: 'Rintik hujan lembut menenangkan overthinking' },
              { id: 'waves', name: 'Debur Ombak Pantai', icon: '🌊', desc: 'Irama laut pelan membantu rileksasi napas' },
              { id: 'stream', name: 'Gemericik Air Sungai', icon: '🌿', desc: 'Aliran sungai teduh di tengah hutan' },
            ].map((sound) => {
              const isCurrent = ambientMode === sound.id;
              return (
                <div
                  key={sound.id}
                  className={`p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-teal-50 border-teal-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-3xl">{sound.icon}</span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{sound.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {sound.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleAmbient(sound.id as any)}
                    className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      isCurrent
                        ? 'bg-teal-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Hentikan Suara</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Putar Suara</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
