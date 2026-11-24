import React from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  Palette, 
  PenTool, 
  Heart, 
  Grid, 
  Trees, 
  Bookmark 
} from 'lucide-react';
import { sound } from '../../utils/sound';

export default function KlakatLKPD() {
  const handlePrintLKPD = () => {
    sound.playSuccess();
    document.body.classList.add('printing-lkpd');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-lkpd');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header & Print Button (No-print) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100/80 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <FileSpreadsheet className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Lembar Kerja Peserta Didik (LKPD Klakat Sudamala)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dirancang khusus untuk pembelajaran aktif siswa Kelas 1 - 6 SD (Fase A, B & C). Siap cetak langsung di Halaman 1 tanpa jeda halaman kosong!
            </p>
          </div>

          <button
            onClick={handlePrintLKPD}
            className="px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-black text-xs shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4 text-white" />
            Cetak Lembar Kerja (A4 Portrait)
          </button>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <Bookmark className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Petunjuk Guru:</strong> Lembar kerja ini memuat 3 aktivitas terintegrasi: (1) Menjodohkan anatomi Klakat Sudamala Wadon, (2) Lembar mewarnai bilah bambu dan lubang segi delapan, serta (3) Refleksi budi pekerti mengenai nilai luhur Sudamala dan keteladanan pohon bambu.
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
                <h3 className="text-xs font-black tracking-widest uppercase text-amber-800">
                  PROGRAM GENBI MENGAJAR • BANK INDONESIA
                </h3>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  LEMBAR KERJA PESERTA DIDIK (LKPD)
                </h2>
                <p className="text-xs font-bold text-slate-600">
                  Materi: Kriya Anyaman Bambu Bali - Klakat Sudamala Wadon
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

          {/* Activity 1: Anatomy Matching */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-700 text-white font-black text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide">
                Aktivitas 1: Hubungkan Garis ke Bagian yang Tepat!
              </h4>
            </div>
            <p className="text-xs text-slate-600">
              Tariklah garis lurus dari kotak nama di sebelah kiri ke titik lingkaran bagian Klakat Sudamala yang sesuai:
            </p>

            <div className="grid grid-cols-12 gap-6 items-center p-4 bg-amber-50/40 border border-amber-200 rounded-2xl">
              <div className="col-span-6 space-y-4">
                <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-sm text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>A. Mata Sudamala (Lubang Segi Delapan di Tengah)</span>
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-sm text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>B. Bilah Serong Diagonal Pengunci Sudut</span>
                  <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-sm text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>C. Ujung Bilah Berlebih di Sudut (Taji)</span>
                  <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
                </div>
              </div>

              {/* Right: Accurate SVG Diagram */}
              <div className="col-span-6 flex justify-center">
                <div className="w-48 h-48 relative">
                  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow">
                    {/* Frame */}
                    <line x1="20" y1="35" x2="140" y2="35" stroke="#d4b483" strokeWidth="6" strokeLinecap="square" />
                    <line x1="20" y1="125" x2="140" y2="125" stroke="#d4b483" strokeWidth="6" strokeLinecap="square" />
                    <line x1="35" y1="20" x2="35" y2="140" stroke="#b08d57" strokeWidth="6" strokeLinecap="square" />
                    <line x1="125" y1="20" x2="125" y2="140" stroke="#b08d57" strokeWidth="6" strokeLinecap="square" />

                    {/* Inner grid */}
                    <line x1="65" y1="25" x2="65" y2="135" stroke="#b08d57" strokeWidth="4" />
                    <line x1="95" y1="25" x2="95" y2="135" stroke="#b08d57" strokeWidth="4" />
                    <line x1="25" y1="65" x2="135" y2="65" stroke="#d4b483" strokeWidth="4" />
                    <line x1="25" y1="95" x2="135" y2="95" stroke="#d4b483" strokeWidth="4" />

                    {/* Diagonals */}
                    <line x1="35" y1="65" x2="65" y2="35" stroke="#eab308" strokeWidth="4" />
                    <line x1="95" y1="35" x2="125" y2="65" stroke="#eab308" strokeWidth="4" />
                    <line x1="35" y1="95" x2="65" y2="125" stroke="#eab308" strokeWidth="4" />
                    <line x1="95" y1="125" x2="125" y2="95" stroke="#eab308" strokeWidth="4" />

                    {/* Anchors */}
                    {/* Dot A: Center Octagon */}
                    <circle cx="80" cy="80" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                    {/* Dot B: Diagonal Slat */}
                    <circle cx="110" cy="50" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                    {/* Dot C: Extended Tip */}
                    <circle cx="132" cy="28" r="5" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Activity 2: Coloring */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-700 text-white font-black text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide">
                Aktivitas 2: Lembar Mewarnai Klakat Sudamala Wadon
              </h4>
            </div>
            <p className="text-xs text-slate-600">
              Warnailah bilah bambu dengan warna krem atau kuning bambu alami. Beri warna cerah pada lubang segi delapan di bagian tengah!
            </p>

            <div className="flex justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="w-56 h-56">
                <svg viewBox="0 0 160 160" className="w-full h-full">
                  {/* Outline Frame with tips */}
                  <line x1="20" y1="35" x2="140" y2="35" stroke="#0f172a" strokeWidth="2" strokeDasharray="4,2" />
                  <line x1="20" y1="125" x2="140" y2="125" stroke="#0f172a" strokeWidth="2" strokeDasharray="4,2" />
                  <line x1="35" y1="20" x2="35" y2="140" stroke="#0f172a" strokeWidth="2" strokeDasharray="4,2" />
                  <line x1="125" y1="20" x2="125" y2="140" stroke="#0f172a" strokeWidth="2" strokeDasharray="4,2" />

                  {/* Inner grid */}
                  <line x1="65" y1="25" x2="65" y2="135" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="95" y1="25" x2="95" y2="135" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="25" y1="65" x2="135" y2="65" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="25" y1="95" x2="135" y2="95" stroke="#0f172a" strokeWidth="1.5" />

                  {/* Diagonals */}
                  <line x1="35" y1="65" x2="65" y2="35" stroke="#0f172a" strokeWidth="1.8" />
                  <line x1="95" y1="35" x2="125" y2="65" stroke="#0f172a" strokeWidth="1.8" />
                  <line x1="35" y1="95" x2="65" y2="125" stroke="#0f172a" strokeWidth="1.8" />
                  <line x1="95" y1="125" x2="125" y2="95" stroke="#0f172a" strokeWidth="1.8" />

                  {/* Octagonal Hole in Center */}
                  <polygon points="73,65 87,65 95,73 95,87 87,95 73,95 65,87 65,73" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="3,2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Activity 3: Moral Reflection */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-700 text-white font-black text-xs flex items-center justify-center">
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
                  1. Mengapa sarana ini dinamakan "Sudamala" dan apa maknanya bagi kebersihan hati kita?
                </span>
                <p className="text-slate-400 italic">
                  Jawaban: ........................................................................................................................................................
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="font-bold text-slate-800">
                  2. Pohon bambu selalu hidup berumpun dan tidak mudah patah saat ditiup angin. Pelajaran baik apa yang bisa kamu terapkan saat bekerja kelompok bersama teman di kelas?
                </span>
                <p className="text-slate-400 italic">
                  Jawaban: ........................................................................................................................................................
                </p>
              </div>
            </div>
          </div>

          {/* Teacher Grading & Footer */}
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
              <p className="font-semibold text-amber-900 text-[11px] mt-1">"Bambu Lentur Menopang Budaya Luhur!"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
