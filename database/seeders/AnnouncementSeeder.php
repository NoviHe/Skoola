<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $announcements = [
            [
                'judul' => 'Jadwal Asesmen Sumatif Akhir Semester (ASAS) Ganjil Tahun Ajaran 2026/2027',
                'konten' => 'Diberitahukan kepada seluruh peserta didik kelas X, XI, dan XII bahwa pelaksanaan Asesmen Sumatif Akhir Semester akan diselenggarakan secara luring berbasis Computer-Based Test (CBT) mulai tanggal 1 s.d. 12 Desember 2026. Mohon mempersiapkan perangkat dan kartu ujian tepat waktu.',
                'target_audiens' => 'Siswa',
                'urgensi' => 'Penting',
                'is_active' => true,
                'published_at' => now()->subDay(),
            ],
            [
                'judul' => 'Undangan Rapat Pleno Komite Sekolah & Orang Tua / Wali Siswa',
                'konten' => 'Bapak/Ibu Orang Tua dan Wali Murid dimohon kehadirannya pada agenda Rapat Koordinasi Komite Sekolah perihal pemaparan program kerja institusi dan evaluasi capaian semester ganjil yang akan digelar pada hari Sabtu pukul 08:30 WIB di Aula Utama.',
                'target_audiens' => 'Wali Murid',
                'urgensi' => 'Biasa',
                'is_active' => true,
                'published_at' => now()->subDays(3),
            ],
            [
                'judul' => 'Pemberitahuan Pembayaran Iuran Praktik dan Registrasi Kegiatan Ekstrakurikuler',
                'konten' => 'Batas akhir konfirmasi keikutsertaan program keahlian tambahan dan ekstrakurikuler semester ini ditutup pada akhir bulan ini. Silakan hubungi pembina masing-masing melalui sekretariat OSIS.',
                'target_audiens' => 'Semua',
                'urgensi' => 'Biasa',
                'is_active' => true,
                'published_at' => now()->subDays(6),
            ],
        ];

        foreach ($announcements as $anc) {
            Announcement::firstOrCreate(
                ['slug' => Str::slug($anc['judul'])],
                array_merge($anc, ['user_id' => $user?->id])
            );
        }
    }
}
