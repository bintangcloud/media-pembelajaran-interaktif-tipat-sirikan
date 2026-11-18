# 🌴 Tipat Sirikan Cilik • Media Pembelajaran Interaktif Budaya Bali

[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38b2ac.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_Viewer-black.svg?style=flat-square&logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646cff.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![GenBI Mengajar](https://img.shields.io/badge/GenBI_Mengajar-Undiksha-059669.svg?style=flat-square)](https://github.com/bintangcloud/media-pembelajaran-interaktif-tipat-sirikan)

Media pembelajaran berbasis web interaktif 3D yang dirancang khusus untuk siswa Sekolah Dasar (**Kelas 1 - 6 SD / Fase A, B, & C**) dalam mengenal kearifan lokal Bali, melatih motorik halus, dan mempelajari seni menganyam **Tipat Sirikan** beserta nilai luhur filosofinya.

Dikembangkan sebagai bagian dari program kerja **GenBI Mengajar** oleh **GenBI Komisariat Universitas Pendidikan Ganesha (Undiksha)**.

---

## ✨ Fitur-Fitur Utama

### 1. 🧊 Laboratorium 3D Interaktif (Three.js)
- **Model Prosedural Akurat:** Bantal bujur sangkar dengan anyaman Sasak $4 \times 4$ (16 kotak rapi).
- **Anatomi Sudut Sesuai Tradisi:**
  - **Pojok Kiri Atas:** 2 helai sisa janur panjang dan **Celah Pengisian Beras** yang dilengkapi butiran beras 3D putih di dalam rongga.
  - **Pojok Kanan Bawah:** 2 helai sisa janur pendek (ujung pengunci anyaman).
  - **Pojok Kanan Atas & Kiri Bawah:** Sudut siku $90^\circ$ yang rapi.
- **Fitur Kontrol:**
  - Pilihan material: *Busung Muda*, *Slepan Tua*, dan *Janur Kuning*.
  - Mode tampilan: *Realistis*, *X-Ray* (melihat butiran beras di dalam), *Merekah* (exploded view), dan *Jala* (wireframe).
  - Rotasi 360°, zoom, pan, fokus kamera instan, dan putar otomatis.

### 2. 🏛️ Filosofi & Kisah Budaya (Fase A, B & C)
- **Pilar 1: 1 Helai Janur Utuh:** Mengajarkan kerukunan, persatuan, gotong royong, dan toleransi (Profil Pelajar Pancasila).
- **Pilar 2: Bujur Sangkar $4 \times 4$:** Keseimbangan ajaran Tri Hita Karana (Tuhan, sesama manusia, dan alam) tercermin dalam 16 kotak anyaman yang harmonis.
- **Pilar 3: Celah Beras Kiri Atas:** Lambang kemakmuran dan pengisian diri dengan ilmu budi pekerti.
- **Kisah Upacara Mejauman / Mepamit:** Mengenalkan peran sakral Tipat Sirikan dalam tradisi pernikahan adat Bali sebagai simbol pengikat persaudaraan yang erat.

### 3. ✂️ Tutorial Langkah Demi Langkah (Langkah 1 - 6)
- Panduan 6 langkah menganyam dengan ilustrasi vektor SVG yang presisi.
- Dilengkapi **fitur narasi suara interaktif** (*Web Speech API*) dan efek suara audio synthesizer (*Web Audio API*).
- Dilengkapi catatan panduan khusus bagi **Guru & Pendamping SD**.

### 4. 🎮 Mini Games & Kuis Interaktif
- **Tantangan 1 (Puzzle Urutan):** Menyusun 4 kartu tahapan pembuatan tipat dari awal hingga akhir.
- **Tantangan 2 (Kuis Budaya 5 Soal):** Kuis pilihan ganda edukatif dengan skor instan dan selebrasi *confetti*.

### 5. 📜 Sertifikat Kelulusan Digital (A4 Landscape)
- Tampilan sertifikat berornamen khas Bali dengan segel resmi.
- Data yang dapat disesuaikan secara dinamis:
  - Nama Lengkap Siswa, Nama Sekolah, dan Tingkat Kelas.
  - Nama & Jabatan Pendidik Relawan GenBI.
  - Nama & Jabatan Mentor Budaya / Pengrajin.
  - Kota Pengesahan serta Tanggal, Bulan, dan Tahun (dilengkapi tombol *"Pakai Tanggal Hari Ini"*).
- Fitur cetak rapi yang **hanya mencetak lembar sertifikat** pada 1 halaman penuh.

### 6. 📝 Lembar Kerja Peserta Didik (LKPD - A4 Portrait)
- 3 aktivitas terpadu: Menjodohkan anatomi tipat, lembar mewarnai anyaman $4 \times 4$ (16 kotak), dan refleksi budi pekerti.
- Diformat khusus agar siap dicetak langsung di **Halaman 1** tanpa jeda halaman kosong sebelumnya.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend:** React 19, JSX
- **Styling:** Tailwind CSS v4, Glassmorphism, Print Media Queries
- **3D Graphics:** Three.js (Procedural geometries, custom leaf textures, OrbitControls)
- **Icons:** `lucide-react` (vektor SVG ramah anak)
- **Audio:** Web Audio API Synthesizer (Chime, Pop, Wrong buzz) & Web Speech API (Narasi suara Bli Janur)
- **Effects:** `canvas-confetti`
- **Build Tool:** Vite 8

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
Buka browser di alamat: `http://localhost:3000`

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
