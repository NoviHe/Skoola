<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $articles = [
            [
                'judul' => 'Pelepasan Kontingen Siswa Lomba Kompetensi Siswa (LKS) Tingkat Nasional',
                'kategori' => 'Berita',
                'ringkasan' => 'Sekolah secara resmi melepas para kontingen siswa berprestasi yang akan bertanding membawa nama baik daerah dalam ajang LKS Nasional.',
                'konten' => 'Kepala Sekolah bersama jajaran dewan guru menggelar upacara pelepasan kontingen peserta Lomba Kompetensi Siswa (LKS) tingkat nasional tahun 2026. Sebanyak 6 delegasi siswa dari program keahlian Rekayasa Perangkat Lunak, Teknik Komputer dan Jaringan, serta Desain Komunikasi Visual diberangkatkan untuk bertanding di ibukota provinsi. Semoga para peserta didik mampu mempersembahkan hasil gemilang dan membanggakan almamater.',
                'thumbnail' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60',
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'views' => 125,
            ],
            [
                'judul' => 'Implementasi Kurikulum Merdeka Berbasis Proyek Industri Terpadu',
                'kategori' => 'Artikel',
                'ringkasan' => 'Penerapan pembelajaran berbasis Teaching Factory (TeFa) menghadirkan pengalaman belajar riil bersama praktisi industri teknologi terkemuka.',
                'konten' => 'Menghadapi era transformasi digital dan revolusi kecerdasan buatan, kurikulum sekolah mengadopsi pembelajaran berbasis proyek industri (Project-Based Learning). Kolaborasi bersama mitra industri teknologi memungkinkan para peserta didik tidak hanya menguasai teori akademis, tetapi juga terbiasa dengan standard code review, agile methodology, dan kerja tim skala produksi.',
                'thumbnail' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60',
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'views' => 98,
            ],
            [
                'judul' => 'Kunjungan Edukasi Guru dan Siswa ke Pusat Sains dan Teknologi Komputasi',
                'kategori' => 'Berita',
                'ringkasan' => 'Peserta didik memperluas wawasan infrastruktur komputasi awan dan keamanan siber melalui kunjungan industri langsung.',
                'konten' => 'Rombongan belajar tingkat X dan XI melaksanakan kunjungan industri edukatif ke Data Center dan Research Lab terpadu. Para siswa berkesempatan melihat arsitektur server berkapasitas tinggi, sistem keamanan siber terenkripsi, serta berdiskusi dengan para engineer terkemuka.',
                'thumbnail' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60',
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'views' => 210,
            ],
        ];

        foreach ($articles as $art) {
            Article::firstOrCreate(
                ['slug' => Str::slug($art['judul'])],
                array_merge($art, ['user_id' => $user?->id])
            );
        }
    }
}
