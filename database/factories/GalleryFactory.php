<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Gallery;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Gallery>
 */
class GalleryFactory extends Factory
{
    protected $model = Gallery::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => fake()->sentence(4),
            'kategori' => fake()->randomElement(['Kegiatan', 'Fasilitas', 'Prestasi', 'Ekstrakurikuler']),
            'foto' => 'https://picsum.photos/seed/'.fake()->unique()->word().'/800/600',
            'deskripsi' => fake()->sentence(),
            'tanggal_kegiatan' => fake()->date(),
        ];
    }
}
