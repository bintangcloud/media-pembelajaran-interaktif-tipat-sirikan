import React, { useState } from 'react';
import { 
  Sparkles, 
  Box, 
  Scissors, 
  Award, 
  Heart, 
  Grid, 
  Volume2, 
  Trees, 
  ChevronRight, 
  BookOpen, 
  Printer 
} from 'lucide-react';
import { sound, speakText, stopSpeech } from '../../utils/sound';

export default function KlakatHero({ setActiveTab }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const greeting = "Halo adik-adik hebat kelas 1 sampai 6 SD! Kenalkan, ini media ajar Klakat Sudamala Wadon khas Bali. Klakat ini dibuat dari bilah-bilah bambu yang disusun rapi dan memiliki lubang segi delapan di bagian tengahnya. Sudamala bermakna menyucikan diri dan melatih budi pekerti kita. Yuk, kita pelajari bersama!";

  const handleSpeak = () => {
    sound.playPop();
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(greeting, () => setIsSpeaking(false));
    }
  };

  const highlights = [
    {
      icon: Trees,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Bilah Bambu Alami (Tiing)',
      desc: 'Bahan bambu yang lentur, kokoh, dan hidup berumpun lambang kerukunan.',
    },
    {
      icon: Grid,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Lubang Segi Delapan',
      desc: 'Mata Sudamala Wadon lambang Asta Aiswarya dan kesuburan alam.',
    },
    {
      icon: Heart,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      title: 'Filosofi Sudamala',
      desc: 'Penyucian segala kekotoran hati agar menjadi anak yang jujur dan santun.',
    },
    {
      icon: Award,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      title: 'Sertifikat Pengrajin Cilik',
      desc: 'Selesaikan kuis kearifan lokal bambu dan dapatkan sertifikat resmi kamu!',
    },
  ];

  return (
    <section className="pt-6 pb-12">
      {/* Hero Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white p-6 sm:p-10 shadow-2xl shadow-amber-950/20 border border-amber-500/30">
        {/* Decorative Background */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-extrabold text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Program GenBI Mengajar • Kriya Anyaman Bambu Bali (Kelas 1 - 6 SD)
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Belajar Menganyam <br className="hidden sm:inline" />
              <span className="text-amber-300 drop-shadow-sm">Klakat Sudamala Wadon</span>!
            </h1>

            <p className="text-sm sm:text-base text-amber-100 leading-relaxed font-medium max-w-2xl">
              Media pembelajaran interaktif kriya bambu khas Bali berbasis 3D. Kenali tradisi upakara yadnya, latih ketelitian dan motorik halus tangan, serta pahami makna luhur penyucian diri (*Sudamala*)!
            </p>

            {/* Mascot Greeting Box */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-900 flex-shrink-0 flex items-center justify-center font-black text-xl shadow-md">
                🎋
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-amber-200 flex items-center gap-1.5">
                    Ni Wayan Tiing (Pemandu Kriya Bambu)
                  </h4>
                  <button
                    onClick={handleSpeak}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {isSpeaking ? 'Berhenti Bicara' : 'Dengar Suara Narasi'}
                  </button>
                </div>
                <p className="text-xs text-amber-100 mt-1 leading-snug">
                  "Kenalkan, aku Ni Wayan Tiing! Yuk kita amati anyaman bambu dengan lubang segi delapan di model 3D bawah ini, atau ikuti 6 langkah serunya!"
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => { sound.playSuccess(); setActiveTab('tutorial'); }}
                className="px-5 py-3 rounded-2xl bg-amber-400 text-slate-900 hover:bg-amber-300 font-black text-sm shadow-lg shadow-amber-950/20 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <Scissors className="w-4 h-4 text-slate-900" />
                Mulai Belajar Menganyam
              </button>

              <button
                onClick={() => { sound.playPop(); setActiveTab('3d'); }}
                className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-md border border-white/20 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <Box className="w-4 h-4 text-amber-200" />
                Putar Model 3D Klakat
              </button>

              <button
                onClick={() => { sound.playPop(); setActiveTab('lkpd'); }}
                className="px-4 py-3 rounded-2xl bg-amber-950/80 hover:bg-amber-950 text-amber-100 font-bold text-sm border border-amber-700/60 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                Lembar Kerja (LKPD)
              </button>
            </div>
          </div>

          {/* Right Visual Badge / Klakat Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-white/10 backdrop-blur-md p-5 border border-white/20 shadow-2xl flex flex-col items-center justify-center text-center group cursor-pointer"
              onClick={() => { sound.playPop(); setActiveTab('3d'); }}
            >
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-amber-400/20 to-yellow-300/20 animate-spin-slow blur-xl -z-10" />

              {/* Graphic Icon Representation of Klakat Sudamala Wadon */}
              <div className="w-44 h-44 relative flex items-center justify-center">
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xl animate-float">
                  {/* Extended Corner Tips (Taji) */}
                  <line x1="20" y1="30" x2="140" y2="30" stroke="#d4b483" strokeWidth="5" strokeLinecap="square" />
                  <line x1="20" y1="130" x2="140" y2="130" stroke="#d4b483" strokeWidth="5" strokeLinecap="square" />
                  <line x1="30" y1="20" x2="30" y2="140" stroke="#d4b483" strokeWidth="5" strokeLinecap="square" />
                  <line x1="130" y1="20" x2="130" y2="140" stroke="#d4b483" strokeWidth="5" strokeLinecap="square" />

                  {/* Inner grid slats */}
                  <line x1="58" y1="25" x2="58" y2="135" stroke="#b08d57" strokeWidth="4" />
                  <line x1="102" y1="25" x2="102" y2="135" stroke="#b08d57" strokeWidth="4" />
                  <line x1="25" y1="58" x2="135" y2="58" stroke="#b08d57" strokeWidth="4" />
                  <line x1="25" y1="102" x2="135" y2="102" stroke="#b08d57" strokeWidth="4" />

                  {/* 4 Diagonal Slats forming the Octagon */}
                  <line x1="30" y1="58" x2="58" y2="30" stroke="#e6cc99" strokeWidth="4.5" />
                  <line x1="102" y1="30" x2="130" y2="58" stroke="#e6cc99" strokeWidth="4.5" />
                  <line x1="30" y1="102" x2="58" y2="130" stroke="#e6cc99" strokeWidth="4.5" />
                  <line x1="102" y1="130" x2="130" y2="102" stroke="#e6cc99" strokeWidth="4.5" />

                  {/* Central Octagon Aperture (Mata Sudamala) */}
                  <polygon points="58,58 102,58 102,102 58,102" fill="rgba(0,0,0,0.15)" />
                  <polygon points="70,58 90,58 102,70 102,90 90,102 70,102 58,90 58,70" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="3,2" />

                  {/* Center hanging strand */}
                  <line x1="80" y1="58" x2="80" y2="102" stroke="#78350f" strokeWidth="2" />
                </svg>
              </div>

              <span className="mt-2 text-xs font-black tracking-wider uppercase text-amber-200 bg-black/30 px-3 py-1 rounded-full border border-white/10">
                Pola Mata Segi Delapan
              </span>
              <p className="text-[11px] text-amber-200 font-bold mt-1 group-hover:text-white transition-colors">
                Klik untuk eksplorasi 3D →
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
