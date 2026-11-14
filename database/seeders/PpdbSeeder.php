<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Major;
use App\Models\PpdbApplicant;
use App\Models\PpdbWave;
use App\Models\User;
use Illuminate\Database\Seeder;

class PpdbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $academicYear = AcademicYear::query()->where('is_active', true)->first()
            ?? AcademicYear::firstOrCreate([
                'tahun' => '2026/2027',
                'semester' => 'Ganjil',
                'is_active' => true,
            ]);

        $majors = Major::query()->where('is_active', true)->get();
        $major1 = $majors->first();
        $major2 = $majors->count() > 1 ? $majors->skip(1)->first() : null;
        $admin = User::first();

        // 1. Gelombang 1 - Jalur Afirmasi & Prestasi (Aktif / Berjalan)
        $wave1 = PpdbWave::firstOrCreate(
            ['kode_gelombang' => 'GEL-1-2026'],
            [
                'tahun_ajaran_id' => $academicYear->id,
                'nama_gelombang' => 'Gelombang 1 - Jalur Prestasi & Afirmasi',
                'tanggal_buka' => now()->subDays(10)->toDateString(),
                'tanggal_tutup' => now()->addDays(20)->toDateString(),
                'kuota' => 150,
                'deskripsi' => 'Pendaftaran jalur seleksi nilai rapor/prestasi kejuaraan serta afirmasi bagi keluarga prasejahtera.',
                'is_active' => true,
            ]
        );

        // 2. Gelombang 2 - Jalur Reguler & Zonasi (Mendatang)
        PpdbWave::firstOrCreate(
            ['kode_gelombang' => 'GEL-2-2026'],
            [
                'tahun_ajaran_id' => $academicYear->id,
                'nama_gelombang' => 'Gelombang 2 - Jalur Reguler & Tes Bakat Skolastik',
                'tanggal_buka' => now()->addDays(25)->toDateString(),
                'tanggal_tutup' => now()->addDays(50)->toDateString(),
                'kuota' => 200,
                'deskripsi' => 'Pendaftaran jalur umum terbuka bagi seluruh lulusan SMP/MTs sederajat dengan tes bakat dan minat.',
                'is_active' => true,
            ]
        );

        // Sample applicants for testing & demonstration
        $applicants = [
            [
                'ppdb_wave_id' => $wave1->id,
                'nomor_pendaftaran' => 'PPDB-2026-0001',
                'nisn' => '0081234501',
                'nik' => '3218012304080001',
                'nama_calon_siswa' => 'Ahmad Fauzi Rahman',
                'jenis_kelamin' => 'L',
                'tempat_lahir' => 'Ciamis',
                'tanggal_lahir' => '2009-04-12',
                'agama' => 'Islam',
                'asal_sekolah' => 'SMP Negeri 1 Padaherang',
                'jurusan_pilihan_1' => $major1?->id,
                'jurusan_pilihan_2' => $major2?->id,
                'jalur_pendaftaran' => 'prestasi',
                'nama_wali' => 'Drs. H. Rahman Hidayat',
                'hubungan_wali' => 'Ayah Kandung',
                'pekerjaan_wali' => 'PNS / Guru',
                'nomor_whatsapp_wali' => '081223344551',
                'alamat' => 'Jl. Merdeka No. 45 RT 02/RW 03, Padaherang',
                'berkas_kartu_keluarga' => 'ppdb-documents/sample-kk.jpg',
                'berkas_akta_kelahiran' => 'ppdb-documents/sample-akta.jpg',
                'berkas_ijazah_skl' => 'ppdb-documents/sample-ijazah.jpg',
                'berkas_rapor_prestasi' => 'ppdb-documents/sample-rapor.jpg',
                'status_seleksi' => 'diterima',
                'catatan_panitia' => 'Selamat! Berkas dan sertifikat kejuaraan sains tingkat kabupaten telah diverifikasi valid.',
                'diverifikasi_oleh' => $admin?->id,
                'diverifikasi_pada' => now()->subDay(),
            ],
            [
                'ppdb_wave_id' => $wave1->id,
                'nomor_pendaftaran' => 'PPDB-2026-0002',
                'nisn' => '0081234502',
                'nik' => '3218015509080002',
                'nama_calon_siswa' => 'Siti Nurhaliza Putri',
                'jenis_kelamin' => 'P',
                'tempat_lahir' => 'Pangandaran',
                'tanggal_lahir' => '2009-09-15',
                'agama' => 'Islam',
                'asal_sekolah' => 'MTs Negeri 2 Pangandaran',
                'jurusan_pilihan_1' => $major2?->id ?? $major1?->id,
                'jurusan_pilihan_2' => $major1?->id,
                'jalur_pendaftaran' => 'reguler',
                'nama_wali' => 'Bambang Sudarmono',
                'hubungan_wali' => 'Ayah Kandung',
                'pekerjaan_wali' => 'Wiraswasta',
                'nomor_whatsapp_wali' => '081399887766',
                'alamat' => 'Dusun Karangsari RT 05/RW 02, Pangandaran',
                'berkas_kartu_keluarga' => 'ppdb-documents/sample-kk.jpg',
                'berkas_akta_kelahiran' => 'ppdb-documents/sample-akta.jpg',
                'berkas_ijazah_skl' => 'ppdb-documents/sample-ijazah.jpg',
                'berkas_rapor_prestasi' => null,
                'status_seleksi' => 'berkas_sesuai',
                'catatan_panitia' => 'Seluruh dokumen administrasi lengkap dan valid. Menunggu pengumuman sidang kelulusan pleno.',
                'diverifikasi_oleh' => $admin?->id,
                'diverifikasi_pada' => now()->subHours(6),
            ],
            [
                'ppdb_wave_id' => $wave1->id,
                'nomor_pendaftaran' => 'PPDB-2026-0003',
                'nisn' => '0081234503',
                'nik' => '3218011211080003',
                'nama_calon_siswa' => 'Budi Santoso',
                'jenis_kelamin' => 'L',
                'tempat_lahir' => 'Banjar',
                'tanggal_lahir' => '2009-11-20',
                'agama' => 'Islam',
                'asal_sekolah' => 'SMP Pasundan 1 Banjar',
                'jurusan_pilihan_1' => $major1?->id,
                'jurusan_pilihan_2' => null,
                'jalur_pendaftaran' => 'afirmasi',
                'nama_wali' => 'Sumarni',
                'hubungan_wali' => 'Ibu Kandung',
                'pekerjaan_wali' => 'Pedagang',
                'nomor_whatsapp_wali' => '082155443322',
                'alamat' => 'Jl. Raya Pangandaran KM 12',
                'berkas_kartu_keluarga' => 'ppdb-documents/sample-kk.jpg',
                'berkas_akta_kelahiran' => null,
                'berkas_ijazah_skl' => 'ppdb-documents/sample-ijazah.jpg',
                'berkas_rapor_prestasi' => null,
                'status_seleksi' => 'perlu_perbaikan',
                'catatan_panitia' => 'Mohon unggah ulang Akta Kelahiran yang jelas terbaca tidak blur.',
                'diverifikasi_oleh' => $admin?->id,
                'diverifikasi_pada' => now()->subHours(3),
            ],
            [
                'ppdb_wave_id' => $wave1->id,
                'nomor_pendaftaran' => 'PPDB-2026-0004',
                'nisn' => '0081234504',
                'nik' => '3218012201090004',
                'nama_calon_siswa' => 'Rina Melati Astuti',
                'jenis_kelamin' => 'P',
                'tempat_lahir' => 'Ciamis',
                'tanggal_lahir' => '2009-01-22',
                'agama' => 'Islam',
                'asal_sekolah' => 'SMP IT Al-Hikmah',
                'jurusan_pilihan_1' => $major1?->id,
                'jurusan_pilihan_2' => $major2?->id,
                'jalur_pendaftaran' => 'zonasi',
                'nama_wali' => 'Hendro Pratomo',
                'hubungan_wali' => 'Ayah Kandung',
                'pekerjaan_wali' => 'Karyawan Swasta',
                'nomor_whatsapp_wali' => '085233669988',
                'alamat' => 'Perum Griya Indah Blok C No 14',
                'berkas_kartu_keluarga' => 'ppdb-documents/sample-kk.jpg',
                'berkas_akta_kelahiran' => 'ppdb-documents/sample-akta.jpg',
                'berkas_ijazah_skl' => 'ppdb-documents/sample-ijazah.jpg',
                'berkas_rapor_prestasi' => null,
                'status_seleksi' => 'menunggu_verifikasi',
                'catatan_panitia' => null,
                'diverifikasi_oleh' => null,
                'diverifikasi_pada' => null,
            ],
        ];

        foreach ($applicants as $appData) {
            PpdbApplicant::updateOrCreate(
                ['nomor_pendaftaran' => $appData['nomor_pendaftaran']],
                $appData
            );
        }
    }
}
