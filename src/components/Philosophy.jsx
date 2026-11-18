import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Grid2X2, 
  Wheat, 
  BookOpen, 
  Users, 
  Trees, 
  Sun,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function Philosophy({ setActiveTab }) {
  const pillars = [
    {
      title: '1 Helai Janur yang Utuh',
      subtitle: 'Simbol Kerukunan & Gotong Royong',
      icon: HeartHandshake,
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
      iconBg: 'bg-rose-50 text-rose-600',
      description: 'Meskipun janur disilangkan rumit ke kanan dan kiri, helaian daunnya tetap satu kesatuan utuh tanpa terputus. Ini mengajarkan anak-anak sekolah dasar bahwa walau kita berbeda suku, agama, atau hobi, kita tetap satu keluarga Indonesia yang rukun.',
      moral: 'Nilai Profil Pelajar Pancasila: Gotong Royong & Berkebinekaan Global'
    },
    {
      title: 'Bentuk Bujur Sangkar 4x4',
      subtitle: '16 Kotak Keseimbangan Hidup',
      icon: Grid2X2,
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-600',
      description: 'Bentuk kotak bantal simetris dengan 16 kotak anyaman Sasak (4 baris x 4 kolom) mencerminkan keseimbangan hidup dan harmoni 4 penjuru. Nilai Tri Hita Karana terjalin erat: hubungan damai dengan Tuhan (Parahyangan), sesama teman (Pawongan), dan alam sekitar (Palemahan).',
      moral: 'Keseimbangan Ciptaan: Berbakti, Bersahabat & Menjaga Lingkungan'
    },
    {
      title: 'Celah Beras di Pojok Kiri Atas',
      subtitle: 'Kemakmuran & Pengisian Diri',
      icon: Wheat,
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
      iconBg: 'bg-amber-50 text-amber-600',
      description: 'Celah anyaman di pojok kiri atas berfungsi untuk memasukkan butiran beras putih. Saat direbus, beras akan mengembang padat dan gurih. Ini melambangkan pikiran adik-adik yang terus diisi oleh ilmu pengetahuan yang berguna.',
      moral: 'Filosofi Belajar: Terus Mengisi Diri dengan Kebaikan & Budi Pekerti'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          Kearifan Lokal Nusantara
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Filosofi & Kisah Budaya Tipat Sirikan
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          Di balik anyaman 4x4 yang indah, Tipat Sirikan menyimpan nilai luhur kehidupan yang sangat penting untuk dipelajari oleh siswa-siswi SD.
        </p>
      </div>

      {/* 3 Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 text-[11px] font-black rounded-lg border ${item.badgeColor}`}>
                    Pilar Ke-{idx + 1}
                  </span>
                  <div className={`p-2.5 rounded-xl ${item.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-800">{item.title}</h3>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">{item.subtitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] font-bold text-emerald-800">
                    {item.moral}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upacara Mejauman / Mepamit Story Box */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold text-amber-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            Tradisi Upacara Adat Bali
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            Kisah Tipat Sirikan dalam Upacara Mejauman
          </h3>

          <p className="text-xs sm:text-sm text-amber-50 leading-relaxed">
            Dalam adat tradisi perkawinan masyarakat Hindu di Bali, terdapat upacara bernama <strong>Mejauman</strong> atau <strong>Mepamit</strong>. Keluarga pengantin perempuan akan dikunjungi oleh keluarga pengantin pria dengan membawa persembahan berupa aneka jajanan dan Tipat Sirikan.
          </p>

          <p className="text-xs sm:text-sm text-amber-50 leading-relaxed">
            Tipat Sirikan dengan 16 kotak anyaman rapat menjadi simbol bahwa kedua keluarga besar kini telah diikat menjadi satu kesatuan yang kokoh, manis, dan harmonis. Tak ada lagi perselisihan, melainkan saling mendukung dalam kebaikan.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => { sound.playPop(); setActiveTab('tutorial'); }}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-amber-100 font-extrabold text-xs shadow flex items-center gap-2 transition-all"
            >
              Coba Praktikkan Langkahnya <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
