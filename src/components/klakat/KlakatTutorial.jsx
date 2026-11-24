import React, { useState } from 'react';
import { 
  Scissors, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Lightbulb, 
  RotateCcw,
  Trees
} from 'lucide-react';
import { sound, speakText, stopSpeech } from '../../utils/sound';

export default function KlakatTutorial({ setActiveTab }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const steps = [
    {
      step: 1,
      title: 'Pilih & Serut Bilah Bambu (Nyebit & Nyisip)',
      subtitle: 'Persiapan Bilah Bambu yang Halus dan Sukla',
      desc: 'Pilih bambu yang masih bersih dan baru (sukla). Potong dengan panjang satu jengkal orang dewasa (±15-18 cm). Belah bambu menjadi bilah-bilah tipis dengan lebar sekitar 1 cm dan serut kedua sisinya hingga halus agar aman dipegang.',
      teacherTip: 'Untuk siswa kelas 1-3 SD, kakak fasilitator GenBI menyiapkan bilah bambu yang sudah diserut halus terlebih dahulu agar jari-jari anak tidak tertusuk serat bambu.',
      audioText: 'Langkah pertama: Siapkan bilah-bilah bambu yang sudah dipotong rapi dan diserut halus. Pastikan bilah bambu bersih dan lentur ya adik-adik.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Potongan bambu utuh */}
          <rect x="25" y="70" width="40" height="70" rx="4" fill="#a3e635" stroke="#4d7c0f" strokeWidth="2.5" />
          <line x1="25" y1="95" x2="65" y2="95" stroke="#3f6212" strokeWidth="2" />
          {/* Panah panah bilah diserut */}
          <path d="M 75 105 L 95 105" stroke="#d97706" strokeWidth="3" markerEnd="url(#arrow)" />
          {/* Bilah-bilah bambu tipis terserut */}
          <rect x="110" y="55" width="65" height="10" rx="2" fill="#fde68a" stroke="#ca8a04" strokeWidth="1.5" />
          <rect x="110" y="75" width="65" height="10" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <rect x="110" y="95" width="65" height="10" rx="2" fill="#fde68a" stroke="#ca8a04" strokeWidth="1.5" />
          <rect x="110" y="115" width="65" height="10" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="100" y="180" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">Bilah Bambu Diserut Halus</text>
        </svg>
      )
    },
    {
      step: 2,
      title: 'Susun Bingkai Bujur Sangkar Luar',
      subtitle: 'Membentuk Fondasi 4 Sisi Persegi',
      desc: 'Susun 4 bilah bambu membentuk bingkai persegi bujur sangkar (2 bilah horizontal di atas-bawah dan 2 bilah vertikal di kiri-kanan). Sisakan sedikit ujung bilah di tiap sudut sekitar 1.5 cm sebagai ciri khas kriya Bali.',
      teacherTip: 'Bimbing siswa menggunakan penggaris atau pola siku agar keempat sudut bingkai membentuk sudut siku 90 derajat yang rapi dan simetris.',
      audioText: 'Langkah kedua: Susun empat bilah bambu membentuk bingkai kotak bujur sangkar. Jangan lupa sisakan sedikit ujung bilah di tiap sudutnya.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Bingkai Luar dengan taji ujung */}
          <line x1="25" y1="50" x2="175" y2="50" stroke="#d4b483" strokeWidth="9" strokeLinecap="square" />
          <line x1="25" y1="150" x2="175" y2="150" stroke="#d4b483" strokeWidth="9" strokeLinecap="square" />
          <line x1="50" y1="25" x2="50" y2="175" stroke="#b08d57" strokeWidth="9" strokeLinecap="square" />
          <line x1="150" y1="25" x2="150" y2="175" stroke="#b08d57" strokeWidth="9" strokeLinecap="square" />
          <text x="100" y="190" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">Bingkai Bujur Sangkar Dasar</text>
        </svg>
      )
    },
    {
      step: 3,
      title: 'Pasang Kisi-kisi Vertikal & Horisontal',
      subtitle: 'Membagi Ruang Menjadi Kotak Kisi-Kisi',
      desc: 'Selipkan 2 bilah bambu vertikal dan 2 bilah horizontal di bagian dalam secara bersilangan (atas-bawah). Sisakan area tengah yang cukup longgar untuk nantinya dibuat lubang segi delapan.',
      teacherTip: 'Ingatkan rumus anyaman dasar: "Atas - Bawah - Atas" saat menyelipkan bilah bambu horizontal ke bilah vertikal.',
      audioText: 'Langkah ketiga: Selipkan bilah kisi-kisi mendatar dan tegak secara selang-seling di bagian dalam bingkai.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Bingkai Luar */}
          <rect x="45" y="45" width="110" height="110" fill="none" stroke="#d4b483" strokeWidth="8" />
          {/* 2 Vertikal dalam */}
          <line x1="80" y1="35" x2="80" y2="165" stroke="#b08d57" strokeWidth="6" />
          <line x1="120" y1="35" x2="120" y2="165" stroke="#b08d57" strokeWidth="6" />
          {/* 2 Horisontal dalam */}
          <line x1="35" y1="80" x2="165" y2="80" stroke="#d4b483" strokeWidth="6" />
          <line x1="35" y1="120" x2="165" y2="120" stroke="#d4b483" strokeWidth="6" />
          <text x="100" y="190" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">Kisi-Kisi Silang Terpasang</text>
        </svg>
      )
    },
    {
      step: 4,
      title: 'Pasang 4 Bilah Diagonal (Mata Sudamala)',
      subtitle: 'Membentuk Lubang Segi Delapan di Tengah',
      desc: 'Inilah langkah kunci Klakat Sudamala Wadon! Pasang 4 bilah serong (diagonal) di keempat kuadran sudut. Keempat bilah serong ini memotong sudut dalam dan secara ajaib membentuk lubang segi delapan terbuka di tengah!',
      teacherTip: 'Ajak siswa menghitung 8 sisi pada lubang tengah: 1, 2, 3, 4, 5, 6, 7, 8! Inilah simbol Asta Aiswarya dan Dewata Nawa Sanga.',
      audioText: 'Langkah keempat: Pasang empat bilah diagonal di tiap sudut. Lihat adik-adik, di tengahnya langsung terbentuk lubang segi delapan yang cantik!',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Bingkai Luar */}
          <rect x="40" y="40" width="120" height="120" fill="none" stroke="#d4b483" strokeWidth="7" />
          {/* Kisi-kisi */}
          <line x1="75" y1="35" x2="75" y2="165" stroke="#b08d57" strokeWidth="5" />
          <line x1="125" y1="35" x2="125" y2="165" stroke="#b08d57" strokeWidth="5" />
          <line x1="35" y1="75" x2="165" y2="75" stroke="#b08d57" strokeWidth="5" />
          <line x1="35" y1="125" x2="165" y2="125" stroke="#b08d57" strokeWidth="5" />
          {/* 4 Bilah Diagonal Sudamala Wadon */}
          <line x1="45" y1="75" x2="75" y2="45" stroke="#f59e0b" strokeWidth="6" />
          <line x1="125" y1="45" x2="155" y2="75" stroke="#f59e0b" strokeWidth="6" />
          <line x1="45" y1="125" x2="75" y2="155" stroke="#f59e0b" strokeWidth="6" />
          <line x1="125" y1="155" x2="155" y2="125" stroke="#f59e0b" strokeWidth="6" />
          {/* Highlight Segi Delapan di tengah */}
          <polygon points="85,75 115,75 125,85 125,115 115,125 85,125 75,115 75,85" fill="#fef08a" stroke="#d97706" strokeWidth="2" opacity="0.6" />
          <text x="100" y="190" fill="#d97706" fontSize="11" fontWeight="bold" textAnchor="middle">Mata Sudamala Segi Delapan</text>
        </svg>
      )
    },
    {
      step: 5,
      title: 'Kunci & Rapatkan Titik Persilangan',
      subtitle: 'Mengapit dengan Bilah Pengunci Ganda',
      desc: 'Pasang bilah pengapit pada bingkai luar dan kencangkan persilangan kisi-kisi. Rapatkan celah anyaman agar bilah tidak mudah terlepas dan bentuk bujur sangkar tetap kokoh saat diangkat.',
      teacherTip: 'Bantu siswa menekan perlahan titik persilangan bambu agar bilah terkunci rapat tanpa membuat bambu patah.',
      audioText: 'Langkah kelima: Kunci dan rapatkan seluruh titik persilangan bilah bambu agar anyaman klakat menjadi kuat dan kokoh.',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Rangka kokoh terkunci */}
          <rect x="40" y="40" width="120" height="120" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
          {/* Garis pengunci */}
          <line x1="25" y1="40" x2="175" y2="40" stroke="#92400e" strokeWidth="6" />
          <line x1="25" y1="160" x2="175" y2="160" stroke="#92400e" strokeWidth="6" />
          <line x1="40" y1="25" x2="40" y2="175" stroke="#92400e" strokeWidth="6" />
          <line x1="160" y1="25" x2="160" y2="175" stroke="#92400e" strokeWidth="6" />
          {/* Panah rapat */}
          <path d="M 20 100 L 35 100" stroke="#059669" strokeWidth="4" />
          <path d="M 180 100 L 165 100" stroke="#059669" strokeWidth="4" />
          <text x="100" y="190" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">Kunci & Rapatkan Bingkai</text>
        </svg>
      )
    },
    {
      step: 6,
      title: 'Pasang Tali Tengah & Rapikan Ujung',
      subtitle: 'Sentuhan Akhir Klakat Sudamala Wadon',
      desc: 'Pasang tali penyeimbang kecil di tengah lubang segi delapan menggunakan serat bambu atau benang tebusan. Potong rapi kelebihan bilah dengan menyisakan taji sudut yang manis. Klakat Sudamala Wadon siap digunakan!',
      teacherTip: 'Berikan apresiasi bintang prestasi kepada setiap siswa yang berhasil menyelesaikan karya kriya bambu perdananya!',
      audioText: 'Langkah keenam: Pasang tali di tengah dan rapikan ujung-ujung bambu. Hore! Klakat Sudamala Wadon buatanmu sudah selesai dan sangat indah!',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {/* Klakat Selesai Lengkap */}
          <line x1="20" y1="35" x2="180" y2="35" stroke="#d4b483" strokeWidth="7" />
          <line x1="20" y1="165" x2="180" y2="165" stroke="#d4b483" strokeWidth="7" />
          <line x1="35" y1="20" x2="35" y2="180" stroke="#b08d57" strokeWidth="7" />
          <line x1="165" y1="20" x2="165" y2="180" stroke="#b08d57" strokeWidth="7" />
          {/* Inner Grid */}
          <line x1="75" y1="28" x2="75" y2="172" stroke="#b08d57" strokeWidth="5" />
          <line x1="125" y1="28" x2="125" y2="172" stroke="#b08d57" strokeWidth="5" />
          <line x1="28" y1="75" x2="172" y2="75" stroke="#d4b483" strokeWidth="5" />
          <line x1="28" y1="125" x2="172" y2="125" stroke="#d4b483" strokeWidth="5" />
          {/* Diagonals */}
          <line x1="40" y1="75" x2="75" y2="40" stroke="#eab308" strokeWidth="5" />
          <line x1="125" y1="40" x2="160" y2="75" stroke="#eab308" strokeWidth="5" />
          <line x1="40" y1="125" x2="75" y2="160" stroke="#eab308" strokeWidth="5" />
          <line x1="125" y1="160" x2="160" y2="125" stroke="#eab308" strokeWidth="5" />
          {/* Central Tie */}
          <line x1="100" y1="75" x2="100" y2="125" stroke="#78350f" strokeWidth="3" />
          <circle cx="100" cy="115" r="3.5" fill="#78350f" />
          <text x="100" y="195" fill="#b45309" fontSize="11" fontWeight="bold" textAnchor="middle">Klakat Sudamala Wadon Selesai</text>
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100/80 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <Scissors className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Tutorial Menganyam Klakat Sudamala Wadon
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Panduan 6 langkah praktis kriya anyaman bambu Bali untuk siswa Kelas 1 - 6 SD.
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
                  ? 'bg-amber-700 text-white shadow-md scale-105'
                  : currentStep > idx
                  ? 'bg-amber-100 text-amber-800'
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
            Ilustrasi Langkah Ke-{stepData.step} dari 6 (Klakat Sudamala)
          </span>
        </div>

        {/* Right: Step Description & Teacher Tips */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 text-xs font-black rounded-full bg-amber-100 text-amber-800">
              Langkah {stepData.step} dari 6
            </span>

            <button
              onClick={handleSpeakCurrentStep}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
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
            <p className="text-xs font-bold text-amber-700 mt-0.5">
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
              <h5 className="font-bold text-xs text-amber-900">Tips untuk Guru & Fasilitator GenBI:</h5>
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
                className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all"
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
