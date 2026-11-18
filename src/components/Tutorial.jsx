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
      title: 'Gulungan 3 Kolom di Tangan Kiri',
      subtitle: 'Membuat Fondasi 3 Garis Vertikal',
      desc: 'Lilitkan daun janur pada telapak tangan kiri sebanyak 3 putaran tegak (vertikal). Arahkan pangkal janur ke arah atas. Ketiga lilitan ini menjadi 3 kolom anyaman dasar.',
      teacherTip: 'Bimbing siswa agar gulungan janur di jari-jari tangan kiri tidak terlalu kencang supaya jari tidak terjepit dan janur mudah disisipkan.',
      audioText: 'Langkah kedua: Lilitkan daun janur pada jari tangan kirimu sebanyak tiga putaran tegak. Jangan terlalu kencang ya adik-adik.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Tangan ilustrasi */}
          <rect x="50" y="130" width="100" height="40" rx="15" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />
          {/* 3 Gulungan Kolom */}
          <rect x="65" y="40" width="18" height="110" rx="6" fill="#a3e635" stroke="#4d7c0f" strokeWidth="2" />
          <rect x="91" y="40" width="18" height="110" rx="6" fill="#84cc16" stroke="#4d7c0f" strokeWidth="2" />
          <rect x="117" y="40" width="18" height="110" rx="6" fill="#a3e635" stroke="#4d7c0f" strokeWidth="2" />
          <text x="100" y="185" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">3 Kolom Tegak di Tangan Kiri</text>
        </svg>
      )
    },
    {
      step: 3,
      title: 'Anyam Baris Pertama (Atas - Bawah - Atas)',
      subtitle: 'Mulai Menyelipkan Baris Horizontal',
      desc: 'Ambil bagian janur satu lagi dengan tangan kanan. Selipkan secara mendatar: masukkan ke ATAS kolom ke-1, di BAWAH kolom ke-2, lalu ke ATAS kolom ke-3.',
      teacherTip: 'Ajak siswa menyanyikan rima: "Atas - Bawah - Atas" secara berulang-ulang agar mudah dihafal oleh siswa Fase A dan B.',
      audioText: 'Langkah ketiga: Selipkan janur mendatar dengan rumus selang-seling: atas, bawah, lalu atas. Sangat mudah kan?',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* 3 Kolom */}
          <rect x="60" y="30" width="22" height="140" rx="5" fill="#bef264" opacity="0.8" />
          <rect x="89" y="30" width="22" height="140" rx="5" fill="#a3e635" opacity="0.8" />
          <rect x="118" y="30" width="22" height="140" rx="5" fill="#bef264" opacity="0.8" />
          {/* Baris mendatar selang seling */}
          <path d="M 30 70 L 60 70 M 82 70 L 89 70 M 111 70 L 170 70" stroke="#ca8a04" strokeWidth="12" strokeLinecap="round" />
          <text x="100" y="188" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">Pola: Atas - Bawah - Atas</text>
        </svg>
      )
    },
    {
      step: 4,
      title: 'Selesaikan Baris 2 & 3 (Kotak 3x3)',
      subtitle: 'Membentuk Bantal Bujur Sangkar Sempurna',
      desc: 'Anyamkan baris ke-2 dengan pola kebalikan ("Bawah - Atas - Bawah"), dan baris ke-3 dengan pola semula ("Atas - Bawah - Atas"). Kini pola bujur sangkar 9 kotak (3x3) telah terbentuk sempurna!',
      teacherTip: 'Perhatikan bahwa dua sudut siku 90 derajat yang rapi kini mulai tampak di pojok kanan atas dan pojok kiri bawah.',
      audioText: 'Langkah keempat: Anyam baris kedua dan ketiga hingga terbentuk pola sembilan kotak bujur sangkar anyaman Sasak yang rapi.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Badan Tipat 3x3 */}
          <rect x="45" y="45" width="110" height="110" rx="8" fill="#a3e635" stroke="#4d7c0f" strokeWidth="3" />
          <line x1="81" y1="45" x2="81" y2="155" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="118" y1="45" x2="118" y2="155" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="45" y1="81" x2="155" y2="81" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="45" y1="118" x2="155" y2="118" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <text x="100" y="185" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">Anyaman Sasak 3x3 Terbentuk</text>
        </svg>
      )
    },
    {
      step: 5,
      title: 'Rapatkan & Kencangkan Anyaman',
      subtitle: 'Kunci Anyaman agar Tidak Bocor',
      desc: 'Tarik helai janur secara bertahap dari satu sudut ke sudut lainnya. Pastikan anyaman menjadi rapat, kuat, dan tidak ada rongga yang membuat beras tumpah.',
      teacherTip: 'Ingatkan siswa untuk menarik janur secara perlahan dan sabar agar daun tidak robek di bagian pinggir.',
      audioText: 'Langkah kelima: Tarik perlahan helai janur dari sudut ke sudut agar anyaman menjadi kencang, padat, dan rapi.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Anyaman Rapat */}
          <rect x="50" y="50" width="100" height="100" rx="8" fill="#84cc16" stroke="#3f6212" strokeWidth="3" />
          {/* Panah tarik merapatkan */}
          <path d="M 30 100 L 45 100" stroke="#059669" strokeWidth="4" markerEnd="url(#arrow)" />
          <path d="M 170 100 L 155 100" stroke="#059669" strokeWidth="4" />
          <text x="100" y="185" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">Tarik Perlahan & Rapatkan</text>
        </svg>
      )
    },
    {
      step: 6,
      title: 'Isi Beras lewat Celah Kiri Atas & Kunci!',
      subtitle: 'Sentuhan Terakhir Sebelum Dimasak',
      desc: 'Buka sedikit celah anyaman di POJOK KIRI ATAS. Masukkan beras yang sudah dicuci sebanyak 1/2 atau 2/3 bagian. Tarik kencang sisa janur hingga lubang tertutup rapat, lalu ikat ujungnya!',
      teacherTip: 'Jangan mengisi beras melebihi 2/3 isi ketupat, karena beras akan mengembang saat direbus dalam air mendidih.',
      audioText: 'Langkah keenam: Isi beras lewat celah di pojok kiri atas sebanyak setengah atau dua pertiga penuh, lalu tarik kencang sisa janur untuk menguncinya!',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Tipat lengkap dengan sisa janur di pojok yang benar */}
          {/* Sisa Janur Panjang di POJOK KIRI ATAS */}
          <path d="M 55 55 C 35 30, 20 20, 10 10" fill="none" stroke="#65a30d" strokeWidth="6" strokeLinecap="round" />
          <path d="M 58 52 C 32 40, 15 35, 5 30" fill="none" stroke="#84cc16" strokeWidth="5" strokeLinecap="round" />
          
          {/* Sisa Janur Pendek di POJOK KANAN BAWAH */}
          <path d="M 145 145 C 165 165, 178 178, 190 190" fill="none" stroke="#65a30d" strokeWidth="5" strokeLinecap="round" />
          <path d="M 142 148 C 158 170, 168 180, 180 188" fill="none" stroke="#84cc16" strokeWidth="4" strokeLinecap="round" />

          {/* Kotak Tipat 3x3 */}
          <rect x="52" y="52" width="96" height="96" rx="8" fill="#a3e635" stroke="#3f6212" strokeWidth="3" />
          <line x1="84" y1="52" x2="84" y2="148" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="116" y1="52" x2="116" y2="148" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="52" y1="84" x2="148" y2="84" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="52" y1="116" x2="148" y2="116" stroke="#365314" strokeWidth="2" strokeDasharray="3,3" />

          {/* Celah Pengisian Beras di Pojok Kiri Atas */}
          <circle cx="58" cy="58" r="9" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <ellipse cx="56" cy="56" rx="2.5" ry="4" fill="#ffffff" transform="rotate(-30 56 56)" />
          <ellipse cx="61" cy="60" rx="2.5" ry="4" fill="#ffffff" transform="rotate(45 61 60)" />

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
              Tutorial Langkah Demi Langkah
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Panduan 6 langkah praktis menganyam Tipat Sirikan untuk siswa Kelas 1 - 6 SD.
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
            Ilustrasi Langkah Ke-{stepData.step} dari 6
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
