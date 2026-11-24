import React, { useState } from 'react';
import { 
  Award, 
  Printer, 
  Sparkles, 
  User, 
  School, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Trees, 
  UserCheck, 
  MapPin, 
  PenTool, 
  Clock 
} from 'lucide-react';
import { sound } from '../../utils/sound';

export default function KlakatCertificate({ quizScore }) {
  // Student Data State
  const [studentName, setStudentName] = useState('Ni Luh Putu Ayu Saraswati');
  const [schoolName, setSchoolName] = useState('SD Negeri 2 Singaraja');
  const [gradeLevel, setGradeLevel] = useState('Kelas 5 SD (Fase C)');

  // Signatories & Date State
  const [educatorName, setEducatorName] = useState('Kadek Dwi Permana, S.Pd.');
  const [educatorRole, setEducatorRole] = useState('Koordinator GenBI Mengajar');
  const [mentorName, setMentorName] = useState('I Wayan Sukadana');
  const [mentorRole, setMentorRole] = useState('Pengrajin Bambu & Kriya Upakara');

  const [cityLocation, setCityLocation] = useState('Singaraja');
  const [certDay, setCertDay] = useState('24');
  const [certMonth, setCertMonth] = useState('November');
  const [certYear, setCertYear] = useState('2026');

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const handlePrintCertificate = () => {
    sound.playSuccess();
    document.body.classList.add('printing-cert');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-cert');
    }, 1000);
  };

  const handleSetCurrentDate = () => {
    sound.playPop();
    const now = new Date();
    setCertDay(now.getDate().toString());
    setCertMonth(months[now.getMonth()]);
    setCertYear(now.getFullYear().toString());
  };

  return (
    <div className="space-y-8">
      {/* Controls & Input Card (Hidden during print) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100/80 no-print space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <Award className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Sertifikat Kelulusan Kriya Klakat Sudamala
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sesuaikan nama siswa, pendidik relawan, mentor budaya bambu, serta tanggal pengesahan sebelum mencetak.
            </p>
          </div>

          <button
            onClick={handlePrintCertificate}
            className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4 text-white" />
            Cetak Sertifikat Sekarang (A4 Landscape)
          </button>
        </div>

        {/* Section 1: Data Penerima Sertifikat (Siswa) */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-3">
            <User className="w-4 h-4 text-amber-600" />
            1. Data Siswa Penerima Sertifikat
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap Siswa:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Contoh: Ni Luh Putu Ayu Saraswati"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Sekolah / Gugus:
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Contoh: SD Negeri 2 Singaraja"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tingkat Kelas:
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              >
                <option value="Kelas 1 SD (Fase A)">Kelas 1 SD (Fase A)</option>
                <option value="Kelas 2 SD (Fase A)">Kelas 2 SD (Fase A)</option>
                <option value="Kelas 3 SD (Fase B)">Kelas 3 SD (Fase B)</option>
                <option value="Kelas 4 SD (Fase B)">Kelas 4 SD (Fase B)</option>
                <option value="Kelas 5 SD (Fase C)">Kelas 5 SD (Fase C)</option>
                <option value="Kelas 6 SD (Fase C)">Kelas 6 SD (Fase C)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Penandatangan & Tanggal */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <PenTool className="w-4 h-4 text-amber-700" />
              2. Data Penandatangan & Tanggal Sertifikat
            </h4>
            <button
              onClick={handleSetCurrentDate}
              className="text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1 transition-colors"
            >
              <Clock className="w-3 h-3" />
              Pakai Tanggal Hari Ini
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pendidik Relawan GenBI:
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={educatorName}
                  onChange={(e) => setEducatorName(e.target.value)}
                  placeholder="Nama Pendidik Relawan"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <input
                type="text"
                value={educatorRole}
                onChange={(e) => setEducatorRole(e.target.value)}
                placeholder="Jabatan Pendidik"
                className="w-full mt-1.5 px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50 text-[11px] font-medium text-slate-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mentor Budaya & Kriya Bambu:
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                  placeholder="Nama Pengrajin Bambu"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <input
                type="text"
                value={mentorRole}
                onChange={(e) => setMentorRole(e.target.value)}
                placeholder="Jabatan Mentor"
                className="w-full mt-1.5 px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50 text-[11px] font-medium text-slate-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kota Pengesahan:
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={cityLocation}
                  onChange={(e) => setCityLocation(e.target.value)}
                  placeholder="Contoh: Singaraja / Denpasar"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tanggal, Bulan & Tahun:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={certDay}
                  onChange={(e) => setCertDay(e.target.value)}
                  placeholder="Tgl"
                  className="px-2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <select
                  value={certMonth}
                  onChange={(e) => setCertMonth(e.target.value)}
                  className="px-1.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min="2020"
                  max="2035"
                  value={certYear}
                  onChange={(e) => setCertYear(e.target.value)}
                  placeholder="Thn"
                  className="px-2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRINTABLE CERTIFICATE CONTAINER (A4 LANDSCAPE) */}
      <div className="flex justify-center overflow-x-auto pb-4">
        <div
          id="printable-certificate"
          className="w-[920px] h-[640px] bg-white rounded-3xl shadow-2xl p-8 relative border-8 border-amber-500 text-slate-800 flex flex-col justify-between overflow-hidden flex-shrink-0"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #ffffff 60%, #fffbeb 100%)'
          }}
        >
          {/* Ornate Inner Border Line */}
          <div className="absolute inset-3 border-2 border-dashed border-amber-600/60 rounded-2xl pointer-events-none" />

          {/* Top Header Badge */}
          <div className="relative z-10 text-center space-y-2 pt-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shadow-md">
                <Trees className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black tracking-widest uppercase text-amber-900">
                  GenBI Mengajar • Bank Indonesia
                </h4>
                <p className="text-[10px] font-bold text-slate-400">
                  Penguatan Karakter & Kriya Anyaman Bambu Tradisi Bali
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-black tracking-widest uppercase text-amber-700 bg-amber-100 px-4 py-1 rounded-full border border-amber-300">
                SERTIFIKAT PENGHARGAAN
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2 font-serif">
                JUARA KELULUSAN KRIYA KLAKAT SUDAMALA
              </h2>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Nomor: GB-MGJ/KS-SD/{certYear || new Date().getFullYear()}/112
              </p>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="relative z-10 text-center my-auto space-y-3 px-12">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Diberikan dengan penuh kebanggaan dan apresiasi kepada siswa berprestasi:
            </p>

            <div className="py-2 border-b-2 border-amber-500 max-w-lg mx-auto">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-amber-900 tracking-tight font-serif">
                {studentName || 'Nama Siswa'}
              </h3>
            </div>

            <p className="text-xs font-bold text-slate-600">
              {schoolName} • {gradeLevel}
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl mx-auto font-medium">
              Telah menunjukkan ketekunan, ketelitian kriya motorik halus, dan keberhasilan dalam memahami filosofi penyucian diri Sudamala serta menguasai teknik menganyam bilah bambu Klakat Sudamala Wadon (Mata Segi Delapan).
            </p>
          </div>

          {/* Certificate Footer Signatures & Official Stamp */}
          <div className="relative z-10 pt-4 flex items-end justify-between px-10 pb-2">
            {/* Signature 1 */}
            <div className="text-center w-52">
              <p className="text-[11px] text-slate-500 font-semibold mb-9">
                {cityLocation || 'Singaraja'}, {certDay} {certMonth} {certYear} <br />
                <strong>Pendidik Relawan GenBI</strong>
              </p>
              <div className="w-40 border-b border-slate-700 mx-auto" />
              <p className="text-xs font-black text-slate-800 mt-1">
                {educatorName || 'Nama Pendidik Relawan'}
              </p>
              <p className="text-[10px] text-slate-400">
                {educatorRole || 'Koordinator GenBI Mengajar'}
              </p>
            </div>

            {/* Golden Ribbon Medal */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 border-4 border-white shadow-xl flex items-center justify-center text-white">
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto text-amber-950" />
                  <span className="text-[8px] font-black uppercase text-amber-950 tracking-tighter">
                    LULUS KRIYA
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-bold text-amber-800 mt-1">
                Kriya Bambu SD
              </span>
            </div>

            {/* Signature 2 */}
            <div className="text-center w-52">
              <p className="text-[11px] text-slate-500 font-semibold mb-9">
                Mengetahui, <br />
                <strong>Mentor Budaya & Kriya Bambu</strong>
              </p>
              <div className="w-40 border-b border-slate-700 mx-auto" />
              <p className="text-xs font-black text-slate-800 mt-1">
                {mentorName || 'Nama Pengrajin Bambu'}
              </p>
              <p className="text-[10px] text-slate-400">
                {mentorRole || 'Pengrajin Bambu Tradisi'}
              </p>
            </div>
          </div>

          {/* Aesthetic Watermark Attribution at very bottom */}
          <div className="text-center pt-2">
            <span className="text-[9px] font-bold text-slate-400/80 tracking-widest uppercase">
              made with love starlightdev
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
