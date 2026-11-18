import React from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  Palette, 
  PenTool, 
  Heart,
  Grid2X2,
  Wheat,
  Bookmark
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function LKPD() {
  const handlePrintLKPD = () => {
    sound.playSuccess();
    // Add print class to body for strict CSS isolation
    document.body.classList.add('printing-lkpd');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-lkpd');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header & Print Button (No-print) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-100/80 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-teal-100 text-teal-700 rounded-xl">
                <FileSpreadsheet className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Lembar Kerja Peserta Didik (LKPD - Pola 4x4)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dirancang khusus untuk pembelajaran aktif siswa Kelas 1 - 6 SD (Fase A, B & C). Siap cetak langsung di Halaman 1 tanpa jeda halaman kosong!
            </p>
          </div>

          <button
            onClick={handlePrintLKPD}
            className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-lg shadow-teal-300/40 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4 text-white" />
            Cetak Lembar Kerja (A4 Portrait)
          </button>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-800 flex items-start gap-2.5">
          <Bookmark className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Petunjuk Guru:</strong> Lembar kerja ini mencakup 3 aktivitas komprehensif: (1) Menghubungkan bagian anatomi Tipat Sirikan 4x4 yang benar, (2) Lembar mewarnai pola anyaman Sasak 4x4 (16 kotak), dan (3) Refleksi nilai kerukunan gotong royong.
          </p>
        </div>
      </div>

      {/* PRINTABLE LKPD CONTAINER (A4 PORTRAIT) */}
      <div className="flex justify-center overflow-x-auto pb-6">
        <div
          id="printable-lkpd"
          className="w-[794px] min-h-[1123px] bg-white rounded-3xl shadow-2xl p-10 border border-slate-200 text-slate-900 flex flex-col justify-between flex-shrink-0"
        >
          {/* LKPD Header */}
          <div className="border-b-2 border-slate-800 pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black tracking-widest uppercase text-emerald-700">
                  PROGRAM GENBI MENGAJAR • BANK INDONESIA
                </h3>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  LEMBAR KERJA PESERTA DIDIK (LKPD)
                </h2>
                <p className="text-xs font-bold text-slate-600">
                  Materi: Seni Menganyam Tipat Sirikan 4x4 Tradisi Bali (16 Kotak)
                </p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 font-black text-xs rounded-full border border-amber-300">
                  Kelas 1 - 6 SD
                </span>
                <p className="text-[10px] text-slate-400 mt-1">Fase A, B & C</p>
              </div>
            </div>

            {/* Student ID Fill-in Table */}
            <div className="grid grid-cols-3 gap-3 pt-3 text-xs">
              <div className="p-2 border border-slate-300 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Nama Lengkap Siswa:</span>
                <span className="font-bold text-slate-700">...................................................</span>
              </div>
              <div className="p-2 border border-slate-300 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Kelas / No. Absen:</span>
                <span className="font-bold text-slate-700">................... / ...........</span>
              </div>
              <div className="p-2 border border-slate-300 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Hari & Tanggal:</span>
                <span className="font-bold text-slate-700">...................................................</span>
              </div>
            </div>
          </div>

          {/* LKPD Activity 1: Anatomy Matching (4x4) */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide">
                Aktivitas 1: Hubungkan Garis ke Bagian yang Tepat!
              </h4>
            </div>
            <p className="text-xs text-slate-600">
              Tariklah garis dari kotak nama di sebelah kiri ke titik lingkaran bagian Tipat Sirikan yang sesuai:
            </p>

            <div className="grid grid-cols-12 gap-6 items-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              {/* Left Column: Labels */}
              <div className="col-span-6 space-y-4">
                <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-sm text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>A. Celah Pengisian Beras (Pojok Kiri Atas)</span>
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-sm text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>B. Sisa Janur Pendek (Pojok Kanan Bawah)</span>
                  <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" />
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-sm text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>C. Anyaman Sasak 4x4 (16 Kotak Badan Tipat)</span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                </div>
              </div>

              {/* Right Column: Accurate 4x4 SVG Illustration */}
              <div className="col-span-6 flex justify-center">
                <div className="w-48 h-48 relative">
                  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow">
                    {/* Sisa Janur Panjang at POJOK KIRI ATAS */}
                    <path d="M 42 42 C 26 22, 16 12, 8 6" fill="none" stroke="#65a30d" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 45 39 C 26 32, 14 29, 4 28" fill="none" stroke="#84cc16" strokeWidth="4" strokeLinecap="round" />
                    
                    {/* Sisa Janur Pendek at POJOK KANAN BAWAH */}
                    <path d="M 118 118 C 132 132, 144 144, 154 154" fill="none" stroke="#65a30d" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 115 121 C 125 137, 134 148, 146 156" fill="none" stroke="#84cc16" strokeWidth="3" strokeLinecap="round" />

                    {/* 4x4 Weave Body (Total 80px) */}
                    <rect x="38" y="38" width="84" height="84" rx="6" fill="#ecfccb" stroke="#365314" strokeWidth="2.5" />
                    <line x1="59" y1="38" x2="59" y2="122" stroke="#365314" strokeWidth="1.5" strokeDasharray="3,2" />
                    <line x1="80" y1="38" x2="80" y2="122" stroke="#365314" strokeWidth="1.5" strokeDasharray="3,2" />
                    <line x1="101" y1="38" x2="101" y2="122" stroke="#365314" strokeWidth="1.5" strokeDasharray="3,2" />
                    <line x1="38" y1="59" x2="122" y2="59" stroke="#365314" strokeWidth="1.5" strokeDasharray="3,2" />
                    <line x1="38" y1="80" x2="122" y2="80" stroke="#365314" strokeWidth="1.5" strokeDasharray="3,2" />
                    <line x1="38" y1="101" x2="122" y2="101" stroke="#365314" strokeWidth="1.5" strokeDasharray="3,2" />

                    {/* Interactive Dot Anchors */}
                    {/* Dot A: Pojok Kiri Atas */}
                    <circle cx="42" cy="42" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                    {/* Dot B: Pojok Kanan Bawah */}
                    <circle cx="118" cy="118" r="5" fill="#14b8a6" stroke="#ffffff" strokeWidth="2" />
                    {/* Dot C: Center Body */}
                    <circle cx="80" cy="80" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* LKPD Activity 2: Coloring 4x4 with Correct Corner Tails */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide">
                Aktivitas 2: Lembar Mewarnai Tipat Sirikan (Pola 4x4)
              </h4>
            </div>
            <p className="text-xs text-slate-600">
              Warnailah 16 kotak anyaman di bawah ini dengan warna hijau muda (busung) atau kuning keemasan. Beri warna putih/kuning cerah pada celah beras di pojok kiri atas!
            </p>

            <div className="flex justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="w-56 h-56">
                <svg viewBox="0 0 160 160" className="w-full h-full">
                  {/* Outlines of Sisa Janur Panjang at POJOK KIRI ATAS */}
                  <path d="M 42 42 C 26 22, 16 12, 8 6" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeDasharray="4,2" />
                  <path d="M 45 39 C 26 32, 14 29, 4 28" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeDasharray="4,2" />
                  
                  {/* Outlines of Sisa Janur Pendek at POJOK KANAN BAWAH */}
                  <path d="M 118 118 C 132 132, 144 144, 154 154" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeDasharray="4,2" />
                  <path d="M 115 121 C 125 137, 134 148, 146 156" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeDasharray="4,2" />

                  {/* 4x4 Weave Squares */}
                  <rect x="38" y="38" width="84" height="84" rx="4" fill="none" stroke="#0f172a" strokeWidth="2" />
                  <line x1="59" y1="38" x2="59" y2="122" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="80" y1="38" x2="80" y2="122" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="101" y1="38" x2="101" y2="122" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="38" y1="59" x2="122" y2="59" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="38" y1="80" x2="122" y2="80" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="38" y1="101" x2="122" y2="101" stroke="#0f172a" strokeWidth="1.5" />

                  {/* Celah Beras Outline at Pojok Kiri Atas */}
                  <circle cx="45" cy="45" r="6" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="2,2" />
                </svg>
              </div>
            </div>
          </div>

          {/* LKPD Activity 3: Reflection & Moral Values */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide">
                Aktivitas 3: Refleksi Budi Pekerti Anak Hebat
              </h4>
            </div>
            <p className="text-xs text-slate-600">
              Jawablah pertanyaan di bawah ini dengan kata-katamu sendiri:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="font-bold text-slate-800">
                  1. Mengapa Tipat Sirikan hanya dibuat dari 1 helai janur utuh yang menyatu?
                </span>
                <p className="text-slate-400 italic">
                  Jawaban: ........................................................................................................................................................
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="font-bold text-slate-800">
                  2. Tuliskan 1 contoh perbuatan rukun dan gotong royong yang pernah kamu lakukan bersama teman di sekolah!
                </span>
                <p className="text-slate-400 italic">
                  Jawaban: ........................................................................................................................................................
                </p>
              </div>
            </div>
          </div>

          {/* LKPD Teacher Grading & Aesthetic Footer */}
          <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px]">Paraf Guru / Nilai:</span>
              <div className="w-24 h-12 border border-dashed border-slate-400 rounded-lg mt-1" />
            </div>

            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                made with love starlightdev
              </span>
            </div>

            <div className="text-xs text-right">
              <span className="text-slate-400 block text-[10px]">Catatan Motivasi:</span>
              <p className="font-semibold text-emerald-800 text-[11px] mt-1">"Tetap Semangat & Terus Berkarya!"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
