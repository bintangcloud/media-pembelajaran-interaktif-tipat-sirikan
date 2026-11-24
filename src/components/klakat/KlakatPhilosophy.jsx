import React from 'react';
import { 
  Sparkles, 
  HeartHandshake, 
  Grid, 
  Trees, 
  ShieldCheck, 
  BookOpen, 
  Compass, 
  ChevronRight 
} from 'lucide-react';
import { sound } from '../../utils/sound';

export default function KlakatPhilosophy({ setActiveTab }) {
  const pillars = [
    {
      title: 'Makna Kata "Sudamala"',
      subtitle: 'Pembersihan Segala Noda & Kekotoran',
      icon: HeartHandshake,
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      iconBg: 'bg-rose-50 text-rose-600',
      description: 'Berasal dari kata "Suda" (suci/bersih) dan "Mala" (kotoran/noda pikiran). Klakat Sudamala adalah sarana penyucian diri lahir dan batin, mengajarkan anak-anak sekolah dasar untuk selalu menjaga kejujuran, menjauhi sifat iri dengki, serta rukun dengan teman.',
      moral: 'Nilai Karakter: Kebersihan Hati, Kejujuran & Budi Pekerti Luhur'
    },
    {
      title: 'Lubang Segi Delapan (Mata Sudamala)',
      subtitle: 'Simbol Asta Aiswarya & Kasih Pradana',
      icon: Grid,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-50 text-amber-600',
      description: 'Lubang segi delapan di bagian tengah mencerminkan delapan sifat kemahakuasaan Hyang Widhi (Asta Aiswarya) dan 8 penjuru mata angin pelindung alam semesta. Dinamai "Wadon" (Pradana) sebagai simbol rahim kehidupan, kesuburan, dan cinta kasih ibu pertiwi.',
      moral: 'Harmoni Semesta: Menjaga Keseimbangan Alam & Menghormati Ibu Pertiwi'
    },
    {
      title: 'Kearifan Pohon Bambu (Tiing)',
      subtitle: 'Kelenturan, Keteguhan & Hidup Berumpun',
      icon: Trees,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-600',
      description: 'Bambu mengajarkan kita untuk hidup berumpun (gotong royong), memiliki akar yang kuat menahan tanah dari longsor, serta lentur mengikuti hembusan angin tanpa mudah patah. Ini melatih siswa menjadi pribadi yang ulet, tabah, dan rendah hati.',
      moral: 'Profil Pelajar Pancasila: Gotong Royong, Ketabahan & Kerendahan Hati'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          Kearifan Lokal Anyaman Bambu Bali
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Filosofi & Nilai Luhur Klakat Sudamala Wadon
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          Di balik susunan bilah bambu yang sederhana, tersimpan simbol kosmis dan pedoman hidup bagi pembentukan karakter anak Indonesia.
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

      {/* Upakara Yadnya & Ceremony Story Box */}
      <div className="bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Fungsi Upakara & Tradisi Sakral
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            Peran Klakat Sudamala dalam Kehidupan Masyarakat Bali
          </h3>

          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Dalam tradisi keagamaan Hindu di Bali, klakat bambu berfungsi sebagai <strong>tataan atau wadah suci</strong>. Klakat Sudamala Wadon secara khusus digunakan sebagai alas dalam upacara <em>Panglukatan</em> (pembersihan spiritual), upacara <em>Mecaru</em> (menyeimbangkan energi alam lingkungan), serta kelengkapan upacara pernikahan adat.
          </p>

          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Lubang segi delapan di bagian tengahnya menjadi simbol pintu masuknya anugerah kedamaian dari para Dewata Nawa Sanga yang menjaga delapan penjuru mata angin, sehingga keluarga dan alam senantiasa damai dan harmonis.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => { sound.playPop(); setActiveTab('tutorial'); }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-900 hover:bg-amber-300 font-extrabold text-xs shadow flex items-center gap-2 transition-all"
            >
              Pelajari Langkah Menganyamnya <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
