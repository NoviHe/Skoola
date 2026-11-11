<div align="center">

# 🎓 SKOOLA
### Sistem Informasi Manajemen Sekolah & Madrasah Terpadu
**Platform Tata Kelola Pendidikan Universal, Modern, dan Modular**

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![Filament](https://img.shields.io/badge/Filament-v5.x-FFA000?style=for-the-badge&logo=livewire&logoColor=white)](https://filamentphp.com)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-v3.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## 📌 Tentang Skoola

**Skoola** adalah platform sistem informasi manajemen sekolah dan madrasah terintegrasi (*Integrated School & Madrasah Management System*) yang dirancang fleksibel untuk mendukung seluruh tingkatan satuan pendidikan di Indonesia di bawah naungan **Kemendikbudristek** maupun **Kemenag**:
- **Pendidikan Dasar**: SD (Sekolah Dasar) & MI (Madrasah Ibtidaiyah)
- **Pendidikan Menengah Pertama**: SMP (Sekolah Menengah Pertama) & MTs (Madrasah Tsanawiyah)
- **Pendidikan Menengah Atas & Kejuruan**: SMA (Sekolah Menengah Atas), MA (Madrasah Aliyah), SMK (Sekolah Menengah Kejuruan), & MAK (Madrasah Aliyah Kejuruan)

---

## 🚀 Arsitektur Dual-Engine

Skoola dibangun dengan pendekatan modern yang memisahkan panel administrasi dan portal publik untuk performa dan pengalaman pengguna optimal:

1. **Backoffice Admin & Manajemen (`/admin`)**
   - Didukung oleh **Filament PHP**
   - Operasi CRUD super cepat, filtering data tabular mendalam, validasi modal dialog, manajemen izin akses (RBAC), serta dashboard metrik statistik institusi.
2. **Portal Publik & Siswa Hub (`/`, `/ppdb`, `/portal`)**
   - Didukung oleh **React 19 + Inertia.js v3 + Tailwind CSS**
   - Antarmuka SPA (Single Page Application) responsif, ramah mobile, formulir pendaftaran interaktif, dan pencarian status pendaftar instan.

---

## 🧩 Fitur Utama

### 1. ⚙️ Konfigurasi Multi-Jenjang Dinamis
- **Adaptabilitas Tingkat Kelas**: Otomatis menyesuaikan rentang kelas (1-6 SD/MI, 7-9 SMP/MTs, 10-12 SMA/SMK/MA).
- **Toggle Modul Jurusan / Peminatan**: Otomatis nonaktif pada jenjang dasar/menengah pertama dan aktif sebagai kejuruan/peminatan pada jenjang atas.
- **Dukungan Identitas Lembaga**: NPSN, NSM (Madrasah), kurikulum aktif (Kurikulum Merdeka / K13), dan kontak sekolah.

### 2. 🏛️ Master Data Akademik
- **Tahun Ajaran & Semester**: Pengelolaan tahun ajaran berjalan (Ganjil/Genap) beserta status aktif.
- **Kompetensi / Peminatan**: Master jurusan, visi-misi, prospek kerja, dan ikon kompetensi keahlian.
- **Rombongan Belajar (Kelas)**: Penetapan wali kelas, daya tampung siswa, dan filter per tingkat.
- **Direktori Guru & Pendidik**: Pendataan NIP, NUPTK, NPK (Kemenag), gelar, bidang studi, dan status kepegawaian.
- **Basis Data Siswa**: Biodata lengkap siswa, NISN, NIS/NISM, NIK, identitas orang tua/wali, dan riwayat status (Aktif, Lulus, Pindah).

### 3. 📝 Modul Pembelajaran & Asesmen
- **Mata Pelajaran**: Pengelompokan fleksibel (Nasional/Umum, Muatan PAI Kemenag, Peminatan, Vokasi/Produktif, dan Muatan Lokal).
- **Jadwal KBM**: Penjadwalan mata pelajaran per kelas dan guru pengampu.
- **Presensi Siswa**: Pencatatan presensi kelas harian dengan status Hadir, Sakit, Izin, dan Alpa.
- **e-Raport & Nilai**: Input asesmen formatif, STS, SAS, perhitungan nilai akhir berbobot, dan cetak lembar raport.

### 4. 📰 CMS Portal Informasi Sekolah
- Warta berita dan artikel edukasi dengan editor rich-text.
- Papan pengumuman resmi dan berkas lampiran unduhan.
- Galeri dokumentasi kegiatan sekolah & direktori prestasi siswa/guru.

### 5. 🎯 Modul PPDB Daring (Penerimaan Peserta Didik Baru)
- Pengaturan gelombang pendaftaran (Zonasi, Afirmasi, Prestasi, Reguler, Tes).
- Formulir pendaftaran calon siswa mandiri daring dengan verifikasi NISN.
- Unggah dokumen persyaratan (Ijazah/SKL, Kartu Keluarga, Akta Kelahiran).
- Fitur cek status seleksi mandiri berbasis nomor registrasi dan cetak bukti pendaftaran resmi.
- Panel verifikasi dokumen satu klik di Filament Admin dengan fungsi ekspor data.

---

## 🛠️ Stack Teknologi

| Komponen | Teknologi |
| :--- | :--- |
| **Backend Framework** | Laravel 12 (PHP 8.2+) |
| **Admin Panel** | Filament PHP v5 (TALL Stack) |
| **Frontend Framework** | React 19 + TypeScript |
| **Bridge SPA** | Inertia.js v3 |
| **CSS Framework** | Tailwind CSS v4 |
| **Icons & Komponen** | Lucide Icons & Heroicons |
| **Database** | MySQL 8.0+ / MariaDB / SQLite |
| **Code Formatting** | Laravel Pint |
| **Testing** | PHPUnit Feature & Unit Test Suite |

---

## 📦 Panduan Instalasi Lokal

### Prasyarat Sistem
- **PHP** >= 8.2 (ekstensi: `pdo_mysql` / `pdo_sqlite`, `zip`, `intl`, `fileinfo`, `mbstring`, `curl`)
- **Composer** >= 2.4
- **Node.js** >= 18.x & **npm**
- **MySQL** / MariaDB Server

### Langkah Pemasangan

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/NoviHe/Skoola.git
   cd Skoola
   ```

2. **Pasang Dependensi PHP & JavaScript**:
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Konfigurasi Database** di berkas `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=skoola_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Jalankan Migrasi & Seeding Data Awal**:
   ```bash
   php artisan migrate --seed
   ```

6. **Kompilasi Aset Frontend**:
   ```bash
   npm run build
   ```

7. **Jalankan Development Server**:
   ```bash
   composer run dev
   ```

Aplikasi dapat diakses melalui peramban:
- **Portal Publik**: [http://localhost:8000](http://localhost:8000)
- **Panel Admin Filament**: [http://localhost:8000/admin](http://localhost:8000/admin)

### Akun Administrator Default
- **Email**: `admin@akademi.test`
- **Kata Sandi**: `password`

---

## 🧪 Menjalankan Pengujian (Testing)

Jalankan test suite menggunakan PHPUnit bawaan Laravel:

```bash
php artisan test
```

---

## 🗺️ Roadmap Pengembangan

Rencana teknis dan cetak biru arsitektur lengkap didokumentasikan di berkas [**BLUEPRINT.md**](./BLUEPRINT.md):
- [x] **Sprint 1**: Setup Filament Admin Panel, Model Institusi & Konfigurasi Multi-Jenjang.
- [ ] **Sprint 2**: Master Akademik via Filament (Jurusan, Kelas, Guru, Siswa).
- [ ] **Sprint 3**: Modul Asesmen Pembelajaran (Presensi & e-Raport).
- [ ] **Sprint 4**: Portal Publik CMS & Direktori Sekolah Adaptif.
- [ ] **Sprint 5**: Modul PPDB Daring Multi-Jalur & Verifikasi Dokumen.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi terbuka [MIT License](LICENSE).
