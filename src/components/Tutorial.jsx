import React, { useState } from 'react';
import { 
  Scissors, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Lightbulb,
  Boxes,
  RotateCcw
} from 'lucide-react';
import { sound, speakText, stopSpeech } from '../utils/sound';

export default function Tutorial({ setActiveTab }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const steps = [
    {
      step: 1,
      title: 'Belah Janur & Hilangkan Lidi',
      subtitle: 'Persiapan 1 Helai Daun Janur Lentur',
      desc: 'Ambil 1 pelepah daun kelapa muda (busung). Belah daun dari lidinya dengan hati-hati. Kita hanya memerlukan 1 helai daun janur panjang yang utuh dan lentur tanpa lidi.',
      teacherTip: 'Untuk anak kelas 1-3 SD, guru/pendamping disarankan membantu membuang lidi terlebih dahulu agar aman dan janur tidak mudah sobek.',
      audioText: 'Langkah pertama: Belah daun janur dari lidinya dengan hati-hati. Pastikan kamu memiliki satu helai daun kelapa yang lentur dan utuh.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Lidi di tengah */}
          <line x1="20" y1="180" x2="180" y2="20" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
          {/* Daun Janur hijau lentur */}
          <path d="M 30 170 Q 90 90 170 30 Q 150 70 80 150 Z" fill="#bef264" stroke="#65a30d" strokeWidth="2.5" />
          {/* Label */}
          <text x="100" y="180" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">Janur Dipisahkan dari Lidi</text>
        </svg>
      )
    },
    {
      step: 2,
      title: 'Gulungan 4 Kolom di Tangan Kiri',
      subtitle: 'Membuat Fondasi 4 Garis Vertikal',
      desc: 'Lilitkan daun janur pada telapak tangan kiri sebanyak 4 putaran tegak (vertikal). Arahkan pangkal janur ke arah atas. Keempat lilitan ini menjadi 4 kolom anyaman dasar untuk membentuk pola 4x4.',
      teacherTip: 'Bimbing siswa agar 4 gulungan janur di jari-jari tangan kiri tidak terlalu kencang supaya jari tidak terjepit dan janur mudah disisipkan.',
      audioText: 'Langkah kedua: Lilitkan daun janur pada jari tangan kirimu sebanyak empat putaran tegak. Jangan terlalu kencang ya adik-adik.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Tangan ilustrasi */}
          <rect x="40" y="135" width="120" height="40" rx="15" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />
          {/* 4 Gulungan Kolom */}
          <rect x="52" y="38" width="16" height="110" rx="5" fill="#a3e635" stroke="#4d7c0f" strokeWidth="2" />
          <rect x="74" y="38" width="16" height="110" rx="5" fill="#84cc16" stroke="#4d7c0f" strokeWidth="2" />
          <rect x="96" y="38" width="16" height="110" rx="5" fill="#a3e635" stroke="#4d7c0f" strokeWidth="2" />
          <rect x="118" y="38" width="16" height="110" rx="5" fill="#84cc16" stroke="#4d7c0f" strokeWidth="2" />
          <text x="100" y="188" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">4 Kolom Tegak di Tangan Kiri</text>
        </svg>
      )
    },
    {
      step: 3,
      title: 'Anyam Baris Pertama (Atas - Bawah - Atas - Bawah)',
      subtitle: 'Mulai Menyelipkan Baris Horizontal Melintasi 4 Kolom',
      desc: 'Ambil bagian janur satu lagi dengan tangan kanan. Selipkan secara mendatar melewati 4 kolom: masuk ke ATAS kolom ke-1, di BAWAH kolom ke-2, ke ATAS kolom ke-3, dan di BAWAH kolom ke-4.',
      teacherTip: 'Ajak siswa menyanyikan rima: "Atas - Bawah - Atas - Bawah" secara berulang-ulang agar mudah dihafal oleh siswa Fase A dan B.',
      audioText: 'Langkah ketiga: Selipkan janur mendatar melintasi empat kolom dengan rumus selang-seling: atas, bawah, atas, bawah.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* 4 Kolom */}
          <rect x="50" y="30" width="18" height="140" rx="4" fill="#bef264" opacity="0.8" />
          <rect x="74" y="30" width="18" height="140" rx="4" fill="#a3e635" opacity="0.8" />
          <rect x="98" y="30" width="18" height="140" rx="4" fill="#bef264" opacity="0.8" />
          <rect x="122" y="30" width="18" height="140" rx="4" fill="#a3e635" opacity="0.8" />
          {/* Baris mendatar selang seling melintasi 4 kolom */}
          <path d="M 25 70 L 50 70 M 68 70 L 74 70 M 92 70 L 98 70 M 116 70 L 175 70" stroke="#ca8a04" strokeWidth="12" strokeLinecap="round" />
          <text x="100" y="188" fill="#475569" fontSize="10.5" fontWeight="bold" textAnchor="middle">Pola: Atas - Bawah - Atas - Bawah</text>
        </svg>
      )
    },
    {
      step: 4,
      title: 'Selesaikan 4 Baris (Bujur Sangkar 4x4)',
      subtitle: 'Membentuk Bantal 16 Kotak Anyaman Sasak',
      desc: 'Lanjutkan menganyam baris ke-2 (Bawah - Atas - Bawah - Atas), baris ke-3, dan baris ke-4. Kini pola bujur sangkar 16 kotak (4 baris x 4 kolom) telah terbentuk rapi dan presisi!',
      teacherTip: 'Perhatikan bahwa dua sudut siku 90 derajat yang rapi tampak jelas di pojok kanan atas dan pojok kiri bawah.',
      audioText: 'Langkah keempat: Anyam hingga baris keempat sehingga terbentuk pola enam belas kotak bujur sangkar anyaman Sasak empat kali empat yang rapi.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Badan Tipat 4x4 (16 kotak) */}
          <rect x="40" y="40" width="120" height="120" rx="8" fill="#a3e635" stroke="#4d7c0f" strokeWidth="3" />
          {/* 3 Garis Vertikal */}
          <line x1="70" y1="40" x2="70" y2="160" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="100" y1="40" x2="100" y2="160" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="130" y1="40" x2="130" y2="160" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          {/* 3 Garis Horizontal */}
          <line x1="40" y1="70" x2="160" y2="70" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="40" y1="100" x2="160" y2="100" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="40" y1="130" x2="160" y2="130" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <text x="100" y="185" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">16 Kotak Anyaman Sasak 4x4</text>
        </svg>
      )
    },
    {
      step: 5,
      title: 'Rapatkan & Kencangkan Anyaman 4x4',
      subtitle: 'Kunci Seluruh 16 Kotak agar Tidak Bocor',
      desc: 'Tarik helai janur secara bertahap dari satu sudut ke sudut lainnya. Pastikan seluruh 16 kotak anyaman menjadi rapat, kuat, dan tidak ada rongga yang membuat beras tumpah.',
      teacherTip: 'Ingatkan siswa untuk menarik janur secara perlahan dan sabar agar daun tidak robek di bagian pinggir.',
      audioText: 'Langkah kelima: Tarik perlahan helai janur dari sudut ke sudut agar anyaman enam belas kotak menjadi kencang, padat, dan rapi.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Anyaman Rapat 4x4 */}
          <rect x="45" y="45" width="110" height="110" rx="8" fill="#84cc16" stroke="#3f6212" strokeWidth="3" />
          <line x1="72" y1="45" x2="72" y2="155" stroke="#365314" strokeWidth="1.5" />
          <line x1="100" y1="45" x2="100" y2="155" stroke="#365314" strokeWidth="1.5" />
          <line x1="128" y1="45" x2="128" y2="155" stroke="#365314" strokeWidth="1.5" />
          <line x1="45" y1="72" x2="155" y2="72" stroke="#365314" strokeWidth="1.5" />
          <line x1="45" y1="100" x2="155" y2="100" stroke="#365314" strokeWidth="1.5" />
          <line x1="45" y1="128" x2="155" y2="128" stroke="#365314" strokeWidth="1.5" />
          {/* Panah tarik merapatkan */}
          <path d="M 25 100 L 40 100" stroke="#059669" strokeWidth="4" />
          <path d="M 175 100 L 160 100" stroke="#059669" strokeWidth="4" />
          <text x="100" y="185" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">Tarik Perlahan & Rapatkan</text>
        </svg>
      )
    },
    {
      step: 6,
      title: 'Isi Beras lewat Celah Kiri Atas & Kunci!',
      subtitle: 'Sentuhan Terakhir Sebelum Dimasak',
      desc: 'Buka sedikit celah anyaman di POJOK KIRI ATAS. Masukkan beras yang sudah dicuci sebanyak 1/2 atau 2/3 bagian. Tarik kencang sisa janur hingga lubang tertutup rapat, lalu kunci rapi di Pojok Kanan Bawah!',
      teacherTip: 'Jangan mengisi beras melebihi 2/3 isi ketupat, karena beras akan mengembang saat direbus dalam air mendidih.',
      audioText: 'Langkah keenam: Isi beras lewat celah di pojok kiri atas sebanyak setengah atau dua pertiga penuh, lalu tarik kencang sisa janur untuk menguncinya!',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Tipat 4x4 lengkap dengan sisa janur di pojok yang benar */}
          {/* Sisa Janur Panjang di POJOK KIRI ATAS */}
          <path d="M 50 50 C 32 28, 18 18, 8 10" fill="none" stroke="#65a30d" strokeWidth="6" strokeLinecap="round" />
          <path d="M 53 47 C 30 36, 14 30, 4 28" fill="none" stroke="#84cc16" strokeWidth="5" strokeLinecap="round" />
          
          {/* Sisa Janur Pendek di POJOK KANAN BAWAH */}
          <path d="M 150 150 C 168 168, 180 180, 192 192" fill="none" stroke="#65a30d" strokeWidth="5" strokeLinecap="round" />
          <path d="M 147 153 C 160 172, 170 182, 182 190" fill="none" stroke="#84cc16" strokeWidth="4" strokeLinecap="round" />

          {/* Kotak Tipat 4x4 (100x100, 4 quads of 25) */}
          <rect x="48" y="48" width="104" height="104" rx="8" fill="#a3e635" stroke="#3f6212" strokeWidth="3" />
          {/* Vertical dividers */}
          <line x1="74" y1="48" x2="74" y2="152" stroke="#365314" strokeWidth="1.8" strokeDasharray="3,3" />
          <line x1="100" y1="48" x2="100" y2="152" stroke="#365314" strokeWidth="1.8" strokeDasharray="3,3" />
          <line x1="126" y1="48" x2="126" y2="152" stroke="#365314" strokeWidth="1.8" strokeDasharray="3,3" />
          {/* Horizontal dividers */}
          <line x1="48" y1="74" x2="152" y2="74" stroke="#365314" strokeWidth="1.8" strokeDasharray="3,3" />
          <line x1="48" y1="100" x2="152" y2="100" stroke="#365314" strokeWidth="1.8" strokeDasharray="3,3" />
          <line x1="48" y1="126" x2="152" y2="126" stroke="#365314" strokeWidth="1.8" strokeDasharray="3,3" />

          {/* Celah Pengisian Beras di Pojok Kiri Atas */}
          <circle cx="56" cy="56" r="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <ellipse cx="54" cy="54" rx="2" ry="3.5" fill="#ffffff" transform="rotate(-30 54 54)" />
          <ellipse cx="58" cy="58" rx="2" ry="3.5" fill="#ffffff" transform="rotate(45 58 58)" />

          <text x="100" y="180" fill="#ca8a04" fontSize="11" fontWeight="bold" textAnchor="middle">
            Celah Beras (Pojok Kiri Atas)
          </text>
        </svg>
      )
    }
  ];

  const handleNext = () => {
    sound.playPop();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    sound.playPop();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepSelect = (idx) => {
    sound.playPop();
    setCurrentStep(idx);
  };

  const handleSpeakCurrentStep = () => {
    sound.playPop();
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(steps[currentStep].audioText, () => setIsSpeaking(false));
    }
  };

  const stepData = steps[currentStep];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/80 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Scissors className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Tutorial Langkah Demi Langkah (Pola 4x4)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Panduan 6 langkah praktis menganyam Tipat Sirikan 16 kotak untuk siswa Kelas 1 - 6 SD.
          </p>
        </div>

        {/* Step Indicator Circles */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleStepSelect(idx)}
              className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                currentStep === idx
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : currentStep > idx
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white text-slate-500 hover:text-slate-800'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Step Display Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/70 p-6 rounded-3xl border border-slate-100">
        {/* Left: SVG Diagram */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-3xl p-5 shadow-inner border border-slate-200 flex items-center justify-center relative overflow-hidden">
            {stepData.svg}
          </div>
          <span className="mt-3 text-xs font-bold text-slate-400">
            Ilustrasi Langkah Ke-{stepData.step} dari 6 (Anyaman 4x4)
          </span>
        </div>

        {/* Right: Step Description & Teacher Tips */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 text-xs font-black rounded-full bg-indigo-100 text-indigo-700">
              Langkah {stepData.step} dari 6
            </span>

            <button
              onClick={handleSpeakCurrentStep}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              {isSpeaking ? 'Hentikan Suara' : 'Dengarkan Narasi'}
            </button>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              {stepData.title}
            </h3>
            <p className="text-xs font-bold text-indigo-600 mt-0.5">
              {stepData.subtitle}
            </p>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {stepData.desc}
          </p>

          {/* Teacher's Tips Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-xs text-amber-900">Tips untuk Guru & Pendamping SD:</h5>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                {stepData.teacherTip}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                currentStep === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all"
              >
                Langkah Berikutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => { sound.playSuccess(); setActiveTab('games'); }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all"
              >
                Ayo Main Kuis & Puzzle!
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
