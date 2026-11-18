import React, { useState } from 'react';
import { 
  Sparkles, 
  Box, 
  Scissors, 
  Award, 
  Heart, 
  Grid3X3, 
  Wheat, 
  Volume2, 
  ChevronRight,
  BookOpen,
  Printer
} from 'lucide-react';
import { sound, speakText, stopSpeech } from '../utils/sound';

export default function Hero({ setActiveTab }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const bliGreeting = "Halo adik-adik hebat kelas 1 sampai 6 SD! Kenalkan, aku Bli Janur! Mari bersama-sama kita belajar menganyam Tipat Sirikan khas Bali. Tipat ini unik karena hanya dibuat dari satu helai janur utuh, dan berasnya dimasukkan lewat celah di pojok kiri atas. Yuk, kita mulai petualangan seru ini!";

  const handleSpeak = () => {
    sound.playPop();
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(bliGreeting, () => setIsSpeaking(false));
    }
  };

  const highlights = [
    {
      icon: Heart,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      title: '1 Helai Janur Utuh',
      desc: 'Simbol kerukunan, toleransi, dan persatuan yang tak terputus.',
    },
    {
      icon: Grid3X3,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      title: 'Anyaman Sasak 3x3',
      desc: 'Bujur sangkar bantal dengan 9 kotak anyaman yang kokoh dan rapi.',
    },
    {
      icon: Wheat,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      title: 'Celah Beras Kiri Atas',
      desc: 'Celah khusus di pojok kiri atas untuk mengisi beras berkah Mejauman.',
    },
    {
      icon: Award,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      title: 'Sertifikat Digital Juara',
      desc: 'Selesaikan kuis interaktif dan dapatkan sertifikat resmi bernama kamu!',
    },
  ];

  return (
    <section className="pt-6 pb-12">
      {/* Hero Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 sm:p-10 shadow-2xl shadow-emerald-900/20 border border-emerald-400/30">
        {/* Decorative Background Circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-extrabold text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Program GenBI Mengajar • Kurikulum Merdeka (Kelas 1 - 6 SD)
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Belajar Menganyam <br className="hidden sm:inline" />
              <span className="text-amber-300 drop-shadow-sm">Tipat Sirikan</span> Khas Bali!
            </h1>

            <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-medium max-w-2xl">
              Media pembelajaran interaktif berbasis 3D, kuis seru, dan tutorial langkah demi langkah. Kenali kearifan lokal Bali, latih motorik halus tangan, dan pahami filosofi persatuan Tri Hita Karana!
            </p>

            {/* Mascot Greeting Box */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-900 flex-shrink-0 flex items-center justify-center font-black text-xl shadow-md">
                🌴
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-amber-200 flex items-center gap-1.5">
                    Bli Janur (Pemandu Budaya)
                  </h4>
                  <button
                    onClick={handleSpeak}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {isSpeaking ? 'Berhenti Bicara' : 'Dengar Suara Bli'}
                  </button>
                </div>
                <p className="text-xs text-emerald-100 mt-1 leading-snug">
                  "Kenalkan, aku Bli Janur! Yuk kita putar ketupat 3D di bawah ini, atau ikuti 6 langkah mudah membuat Tipat Sirikan!"
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => { sound.playSuccess(); setActiveTab('tutorial'); }}
                className="px-5 py-3 rounded-2xl bg-amber-400 text-slate-900 hover:bg-amber-300 font-black text-sm shadow-lg shadow-amber-900/20 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <Scissors className="w-4 h-4 text-slate-900" />
                Mulai Belajar Menganyam
              </button>

              <button
                onClick={() => { sound.playPop(); setActiveTab('3d'); }}
                className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-md border border-white/20 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <Box className="w-4 h-4 text-emerald-200" />
                Putar Model 3D
              </button>

              <button
                onClick={() => { sound.playPop(); setActiveTab('lkpd'); }}
                className="px-4 py-3 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 font-bold text-sm border border-emerald-600/60 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <Printer className="w-4 h-4 text-emerald-300" />
                Lembar Kerja (LKPD)
              </button>
            </div>
          </div>

          {/* Right Visual Badge / Tipat Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-white/10 backdrop-blur-md p-5 border border-white/20 shadow-2xl flex flex-col items-center justify-center text-center group cursor-pointer"
                 onClick={() => { sound.playPop(); setActiveTab('3d'); }}>
              {/* Rotating glowing halo */}
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-amber-400/20 to-emerald-300/20 animate-spin-slow blur-xl -z-10" />

              {/* Graphic Icon Representation of 3x3 Tipat */}
              <div className="w-40 h-40 relative flex items-center justify-center">
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xl animate-float">
                  {/* Sisa Janur Panjang at Pojok Kiri Atas */}
                  <path d="M 45 45 C 30 25, 20 15, 12 8" fill="none" stroke="#dcfce7" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 48 42 C 28 35, 15 32, 5 30" fill="none" stroke="#bbf7d0" strokeWidth="5" strokeLinecap="round" />
                  
                  {/* Sisa Janur Pendek at Pojok Kanan Bawah */}
                  <path d="M 115 115 C 130 130, 142 142, 152 152" fill="none" stroke="#86efac" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 112 118 C 122 135, 132 146, 144 154" fill="none" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />

                  {/* 3x3 Grid Woven Quad Body */}
                  <rect x="42" y="42" width="76" height="76" rx="8" fill="#a3e635" stroke="#4d7c0f" strokeWidth="3" />
                  {/* Grid Lines */}
                  <line x1="67" y1="42" x2="67" y2="118" stroke="#3f6212" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="93" y1="42" x2="93" y2="118" stroke="#3f6212" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="42" y1="67" x2="118" y2="67" stroke="#3f6212" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="42" y1="93" x2="118" y2="93" stroke="#3f6212" strokeWidth="2" strokeDasharray="3,3" />

                  {/* Celah Pengisian Beras at Pojok Kiri Atas with Rice Grains */}
                  <circle cx="48" cy="48" r="7" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                  <ellipse cx="46" cy="46" rx="2" ry="4" fill="#ffffff" transform="rotate(-30 46 46)" />
                  <ellipse cx="50" cy="49" rx="2" ry="4" fill="#ffffff" transform="rotate(45 50 49)" />
                </svg>
              </div>

              <span className="mt-3 text-xs font-black tracking-wider uppercase text-amber-200 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                Pojok Kiri Atas = Celah Beras
              </span>
              <p className="text-[11px] text-emerald-100 font-bold mt-1 group-hover:text-white transition-colors">
                Klik untuk buka Laboratorium 3D →
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-100 flex items-start gap-3.5 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div className={`p-3 rounded-xl border ${item.color} flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
