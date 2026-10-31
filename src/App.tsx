/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Heart,
  Smile,
  BookOpen,
  MessageCircleHeart,
  Bell,
  Wind,
  Brain,
  Users,
  CheckCircle2,
  Compass,
  ArrowRight,
  Shield,
  Sparkles,
  PhoneCall,
  Calendar,
  Layers,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { MoodCheckIn } from './components/MoodCheckIn';
import { RuangCerita } from './components/RuangCerita';
import { TemanDengar } from './components/TemanDengar';
import { DailyReminder } from './components/DailyReminder';
import { RuangTenang } from './components/RuangTenang';
import { KenaliDirimu } from './components/KenaliDirimu';
import { SupportCircle } from './components/SupportCircle';
import { LangkahKecil } from './components/LangkahKecil';
import { ResearchGuideModal } from './components/ResearchGuideModal';
import { QuickHelpModal } from './components/QuickHelpModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const crazy8Items = [
    {
      id: 'mood',
      num: '1',
      title: 'Mood Check-In',
      tagline: 'Catat suasana hati harian dengan emoji dan catatan singkat',
      icon: Smile,
      color: 'bg-amber-500 text-white',
      border: 'hover:border-amber-400',
      badge: 'Sadar Emosi',
    },
    {
      id: 'cerita',
      num: '2',
      title: 'Ruang Cerita',
      tagline: 'Jurnal digital pribadi untuk menuangkan pengalaman & perasaan',
      icon: BookOpen,
      color: 'bg-orange-500 text-white',
      border: 'hover:border-orange-400',
      badge: '100% Privat',
    },
    {
      id: 'teman',
      num: '3',
      title: 'Teman Dengar',
      tagline: 'Berbagi cerita anonim dengan komunitas yang suportif',
      icon: MessageCircleHeart,
      color: 'bg-indigo-500 text-white',
      border: 'hover:border-indigo-400',
      badge: 'Pelukan Hangat',
    },
    {
      id: 'reminder',
      num: '4',
      title: 'Daily Reminder',
      tagline: 'Afirmasi positif dan pesan penyemangat setiap hari',
      icon: Bell,
      color: 'bg-emerald-500 text-white',
      border: 'hover:border-emerald-400',
      badge: 'Pengingat Harapan',
    },
    {
      id: 'tenang',
      num: '5',
      title: 'Ruang Tenang',
      tagline: 'Panduan latihan pernapasan 4-7-8, grounding & suara alam',
      icon: Wind,
      color: 'bg-teal-500 text-white',
      border: 'hover:border-teal-400',
      badge: 'Redakan Cemas',
    },
    {
      id: 'edukasi',
      num: '6',
      title: 'Kenali Dirimu',
      tagline: 'Edukasi emosi, penerimaan diri & kuis gaya koping',
      icon: Brain,
      color: 'bg-purple-500 text-white',
      border: 'hover:border-purple-400',
      badge: 'Psikoedukasi',
    },
    {
      id: 'support',
      num: '7',
      title: 'Support Circle',
      tagline: 'Lingkaran kontak terpercaya & direktori krisis terverifikasi',
      icon: Users,
      color: 'bg-rose-500 text-white',
      border: 'hover:border-rose-400',
      badge: 'Bantuan Nyata',
    },
    {
      id: 'langkah',
      num: '8',
      title: 'Langkah Kecil',
      tagline: 'Target mikro harian, perkembangan diri tanpa rasa terbebani',
      icon: CheckCircle2,
      color: 'bg-sky-500 text-white',
      border: 'hover:border-sky-400',
      badge: 'Pohon Tumbuh',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenResearchGuide={() => setIsResearchModalOpen(true)}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Navigation Breadcrumb / Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('beranda')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'beranda'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Beranda Ideasi</span>
          </button>

          {crazy8Items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                  {item.num}
                </span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: BERANDA / OVERVIEW */}
        {activeTab === 'beranda' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-amber-500 via-orange-400 to-rose-400 rounded-3xl p-6 sm:p-10 text-white shadow-lg shadow-orange-500/10 relative overflow-hidden">
              {/* Decorative background shapes */}
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute right-20 top-4 w-32 h-32 bg-amber-300/20 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white border border-white/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Prototipe SIAP IMPACT 2026 • Ideasi Crazy 8</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Nyalara: Ruang Aman Digital bagi Remaja
                </h1>

                <p className="text-sm sm:text-base text-amber-50 font-normal leading-relaxed">
                  "Karena kamu pantas didengar, dan selalu ada tempat untuk pulih 💛"
                </p>

                <p className="text-xs sm:text-sm text-white/90 leading-relaxed pt-1">
                  Menjawab hasil riset <strong>Misi 1 Empathize & Define</strong>: Remaja yang menghadapi tekanan emosional membutuhkan ruang yang nyaman untuk memahami perasaan secara mandiri, didengar tanpa dihakimi, serta mendapatkan dukungan yang terpercaya.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() => setIsResearchModalOpen(true)}
                    className="px-4 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-2xl shadow-sm hover:bg-amber-50 transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-orange-600" />
                    <span>Panduan Arahan & Uji Pengguna</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('mood')}
                    className="px-4 py-2.5 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 text-white font-semibold text-xs rounded-2xl border border-white/30 transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <span>Mulai dari Mood Check-In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Guiding Callout Box */}
            <div className="p-4 sm:p-5 bg-white rounded-3xl border border-amber-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-900">
                    Bantuan Mengarahkan Prototipe Ini
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Setiap modul di bawah adalah wujud nyata dari 8 kotak sketsa Crazy 8. Kamu bisa mengujinya satu per satu dan mengumpulkan umpan balik dari remaja calon pengguna.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsResearchModalOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-200/80 whitespace-nowrap transition-colors shrink-0"
              >
                Buka Panduan Wawancara →
              </button>
            </div>

            {/* 8 Crazy 8 Features Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    8 Modul Solusi Digital Nyalara (Crazy 8)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pilih salah satu menu untuk mencoba pengalaman interaktifnya:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {crazy8Items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`p-5 bg-white rounded-3xl border border-slate-200/90 ${item.border} hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-2xl ${item.color} flex items-center justify-center shadow-xs`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-bold bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full">
                            #{item.num}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                            {item.badge}
                          </span>
                          <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed">
                          {item.tagline}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">
                        <span>Coba Modul Ini</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Research & Personas Recap Box */}
            <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Sintesis Wawancara Narasumber
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Menjawab Kebutuhan Tiga Karakter Remaja
                  </h3>
                </div>
                <button
                  onClick={() => setIsResearchModalOpen(true)}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors shrink-0"
                >
                  Lihat Lembar Wawancara
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="font-bold text-amber-300">
                    Narasumber NA (Refleksi Mandiri)
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    Suka menulis saat sedih, mendekat ke Tuhan, menghindari jadi beban orang lain. Dijawab dengan <strong>Ruang Cerita</strong> dan <strong>Mood Check-In</strong>.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="font-bold text-teal-300">
                    Narasumber AW (Afirmasi & Makna)
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    Mencari pembelajaran, self-talk positif, dan deep talk. Dijawab dengan <strong>Daily Reminder</strong> dan <strong>Ruang Tenang</strong>.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="font-bold text-rose-300">
                    Narasumber RA (Privasi & Chat Aman)
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    Takut dihakimi, lebih nyaman chat sebelum bicara langsung. Dijawab dengan <strong>Teman Dengar</strong> dan <strong>Support Circle</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MOOD CHECK-IN */}
        {activeTab === 'mood' && (
          <MoodCheckIn
            onNavigateToRuangTenang={() => setActiveTab('tenang')}
            onNavigateToRuangCerita={() => setActiveTab('cerita')}
          />
        )}

        {/* TAB 3: RUANG CERITA */}
        {activeTab === 'cerita' && <RuangCerita />}

        {/* TAB 4: TEMAN DENGAR */}
        {activeTab === 'teman' && <TemanDengar />}

        {/* TAB 5: DAILY REMINDER */}
        {activeTab === 'reminder' && <DailyReminder />}

        {/* TAB 6: RUANG TENANG */}
        {activeTab === 'tenang' && <RuangTenang />}

        {/* TAB 7: KENALI DIRIMU */}
        {activeTab === 'edukasi' && <KenaliDirimu />}

        {/* TAB 8: SUPPORT CIRCLE */}
        {activeTab === 'support' && <SupportCircle />}

        {/* TAB 9: LANGKAH KECIL */}
        {activeTab === 'langkah' && <LangkahKecil />}
      </main>

      {/* Floating Bottom Quick Tab Bar on Mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('beranda')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === 'beranda' ? 'text-amber-600' : 'text-slate-400'
          }`}
        >
          <Heart className="w-4 h-4 mb-0.5" />
          <span>Beranda</span>
        </button>

        <button
          onClick={() => setActiveTab('mood')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === 'mood' ? 'text-amber-600' : 'text-slate-400'
          }`}
        >
          <Smile className="w-4 h-4 mb-0.5" />
          <span>Mood</span>
        </button>

        <button
          onClick={() => setActiveTab('cerita')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === 'cerita' ? 'text-orange-600' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Cerita</span>
        </button>

        <button
          onClick={() => setActiveTab('teman')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === 'teman' ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          <MessageCircleHeart className="w-4 h-4 mb-0.5" />
          <span>Dengar</span>
        </button>

        <button
          onClick={() => setActiveTab('tenang')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === 'tenang' ? 'text-teal-600' : 'text-slate-400'
          }`}
        >
          <Wind className="w-4 h-4 mb-0.5" />
          <span>Tenang</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 pb-20 sm:pb-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Nyalara</span>
            <span>·</span>
            <span>Ruang Aman Digital bagi Remaja (SIAP IMPACT 2026)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsResearchModalOpen(true)}
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              Panduan Riset & Validasi
            </button>
            <span>·</span>
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              Hotline 119 ext 8
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ResearchGuideModal
        isOpen={isResearchModalOpen}
        onClose={() => setIsResearchModalOpen(false)}
        onSelectFeature={(tabId) => setActiveTab(tabId)}
      />

      <QuickHelpModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onGoToRuangTenang={() => setActiveTab('tenang')}
      />
    </div>
  );
}
