<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $galleries = [
            [
                'judul' => 'Gedung Laboratorium Komputer dan Cloud Computing Terpadu',
                'kategori' => 'Fasilitas',
                'foto' => 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60',
                'deskripsi' => 'Fasilitas laboratorium modern berstandar industri dengan konektivitas gigabit fiber optic.',
                'tanggal_kegiatan' => now()->subMonths(2)->toDateString(),
            ],
            [
                'judul' => 'Kegiatan Apel Pagi dan Pelantikan Pengurus OSIS & MPK',
                'kategori' => 'Kegiatan',
                'foto' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=60',
                'deskripsi' => 'Penanaman jiwa kepemimpinan, integritas, dan disiplin bagi seluruh pengurus organisasi siswa.',
                'tanggal_kegiatan' => now()->subMonth()->toDateString(),
            ],
            [
                'judul' => 'Pameran Karya Inovasi Digital dan Produk Kreatif Siswa',
                'kategori' => 'Ekstrakurikuler',
                'foto' => 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60',
                'deskripsi' => 'Showcase hasil riset prototipe Internet of Things (IoT), UI/UX design, dan aplikasi mobile siswa.',
                'tanggal_kegiatan' => now()->subWeeks(3)->toDateString(),
            ],
        ];

        foreach ($galleries as $gal) {
            Gallery::firstOrCreate(
                ['judul' => $gal['judul']],
                $gal
            );
        }
    }
}
