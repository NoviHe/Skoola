<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $achievements = [
            [
                'judul_prestasi' => 'Juara 1 LKS Web Technologies Tingkat Provinsi',
                'nama_peraih' => 'Ahmad Fadhilah & Tim RPL',
                'tingkat' => 'Provinsi',
                'peringkat' => 'Juara 1',
                'penyelenggara' => 'Dinas Pendidikan Provinsi Jawa Barat',
                'tahun' => '2026',
                'foto' => 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800&auto=format&fit=crop&q=60',
                'deskripsi' => 'Meraih medali emas dalam kompetisi pengembangan web full-stack berskala nasional.',
            ],
            [
                'judul_prestasi' => 'Medali Perak Olimpiade Sains Nasional (OSN) Informatika',
                'nama_peraih' => 'Siti Nurhaliza',
                'tingkat' => 'Nasional',
                'peringkat' => 'Juara 2',
                'penyelenggara' => 'Pusat Prestasi Nasional Kemdikbudristek',
                'tahun' => '2025',
                'foto' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=60',
                'deskripsi' => 'Berhasil menembus babak final OSN dengan skor algoritma komputasional luar biasa.',
            ],
            [
                'judul_prestasi' => 'Juara Umum Festival Lomba Seni Siswa Nasional (FLS2N)',
                'nama_peraih' => 'Paduan Suara & Teater Akademi',
                'tingkat' => 'Kabupaten/Kota',
                'peringkat' => 'Juara 1',
                'penyelenggara' => 'Kantor Cabang Dinas Pendidikan',
                'tahun' => '2026',
                'foto' => 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60',
                'deskripsi' => 'Menampilkan harmoni vokal dan pertunjukan musikal orisinal bertema kearifan lokal.',
            ],
        ];

        foreach ($achievements as $ach) {
            Achievement::firstOrCreate(
                ['judul_prestasi' => $ach['judul_prestasi']],
                $ach
            );
        }
    }
}
