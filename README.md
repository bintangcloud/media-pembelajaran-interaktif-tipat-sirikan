# 🌴 Media Pembelajaran Interaktif Budaya Bali • GenBI Mengajar

[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38b2ac.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_Viewer-black.svg?style=flat-square&logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646cff.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![GenBI Mengajar](https://img.shields.io/badge/GenBI_Mengajar-Undiksha-059669.svg?style=flat-square)](https://github.com/bintangcloud/media-pembelajaran-interaktif-tipat-sirikan)

Media pembelajaran berbasis web interaktif 3D yang dirancang khusus untuk siswa Sekolah Dasar (**Kelas 1 - 6 SD / Fase A, B, & C**) dalam mengenal kearifan lokal Bali, melatih keterampilan motorik halus, dan mempelajari seni menganyam tradisional beserta filosofi luhurnya.

Dikembangkan sebagai bagian dari program kerja **GenBI Mengajar** oleh **Generasi Baru Indonesia (GenBI) Komisariat Universitas Pendidikan Ganesha (Undiksha)**.

---

## 📚 Dua Modul Pembelajaran Interaktif

Aplikasi ini kini memiliki **2 modul lengkap** yang dapat diakses secara fleksibel:

### 1. 🌴 Modul Tipat Sirikan (Anyaman Janur Sasak $4 \times 4$)
- **Laboratorium 3D:** Model bantal bujur sangkar dengan anyaman Sasak $4 \times 4$ (16 kotak). Pojok Kiri Atas dilengkapi **Celah Pengisian Beras** (dengan butiran beras 3D) dan 2 helai sisa janur panjang; Pojok Kanan Bawah dengan 2 sisa janur pendek pengunci.
- **Filosofi Luhur:** Nilai persatuan 1 helai janur yang menyatu (kerukunan dan toleransi) serta kisah tradisi Upacara Mejauman / Mepamit.
- **Tutorial 6 Langkah:** Panduan menganyam dari membelah janur hingga pengisian beras dan penguncian rapat.
- **Fitur Lengkap:** Puzzle urutan, kuis 5 soal dengan selebrasi *confetti*, sertifikat kelulusan digital, dan LKPD A4 Portrait siap cetak langsung di Halaman 1.

### 2. 🎋 Modul Klakat Sudamala Wadon (Kriya Anyaman Bambu)
- **Akses Langsung:** Tersedia tombol *switcher* pada navigasi dan berkas tersendiri di `klakat.html`.
- **Laboratorium 3D:** Model 3D anyaman bilah bambu (*tiing*) dengan **Lubang Segi Delapan (Mata Sudamala Wadon)** di bagian tengah, 4 bilah diagonal di kuadran sudut, serta bingkai luar berujung taji khas Bali.
- **Filosofi Luhur:** Makna *Sudamala* (penyucian kekotoran hati dan pikiran), simbol *Asta Aiswarya* & *Asta Dala* pada 8 sisi lubang tengah, serta keteladanan pohon bambu (hidup berumpun, lentur, dan rendah hati).
- **Tutorial 6 Langkah:** Dari *nyebit* dan *nyisip tiing*, membuat bingkai bujur sangkar, kisi-kisi, pemasangan 4 bilah diagonal, hingga memasang tali tengah.
- **Fitur Lengkap:** Puzzle tahapan bambu, kuis interaktif, sertifikat pengrajin cilik A4 Landscape, dan LKPD A4 Portrait yang siap cetak langsung di Halaman 1.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework:** React 19, JSX
- **Styling:** Tailwind CSS v4, Glassmorphism, Print Media Queries (Isolasi Sertifikat & LKPD Halaman 1)
- **3D Engine:** Three.js (Procedural geometries, custom organic textures, OrbitControls)
- **Icons:** `lucide-react` (Ikon vektor SVG cerah ramah anak pengganti emoji keyboard)
- **Audio & Narasi:** Web Audio API Synthesizer (Chime, Pop, Wrong buzz) & Web Speech API (Narasi suara ramah anak)
- **Effects:** `canvas-confetti`
- **Build Tool:** Vite 8 (Multi-page configuration: `index.html` & `klakat.html`)

---

## 🚀 Panduan Menjalankan Proyek

### 1. Clone Repositori
```bash
git clone https://github.com/bintangcloud/media-pembelajaran-interaktif-tipat-sirikan.git
cd media-pembelajaran-interaktif-tipat-sirikan
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser:
- Modul Tipat Sirikan: `http://localhost:3000/`
- Modul Klakat Sudamala: `http://localhost:3000/klakat.html` (atau klik tombol **"Modul Klakat"** di navbar!)

### 4. Build untuk Produksi
```bash
npm run build
```

---

## 👩‍💻 Pengembang & Kontributor

Aplikasi ini dirancang dan dikembangkan dengan penuh dedikasi oleh:

**Ni Putu Bintang Permatasari**  
*(starlightdev / bintangcloud)*  

Dibuat khusus untuk menyukseskan program kerja **GenBI Mengajar** oleh **Generasi Baru Indonesia (GenBI) Komisariat Universitas Pendidikan Ganesha (Undiksha)**.

> **Tentang GenBI:**  
> **Generasi Baru Indonesia (GenBI)** adalah komunitas mahasiswa penerima beasiswa Bank Indonesia yang berperan sebagai *front runners*, *agent of change*, dan *future leaders* dalam mengabdi kepada masyarakat, mendukung kemajuan pendidikan anak bangsa, serta melestarikan warisan budaya luhur Nusantara.

---

<p align="center">
  <sub>made with ❤️ <b>starlightdev</b></sub>
</p>
