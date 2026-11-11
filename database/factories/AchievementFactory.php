<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Achievement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Achievement>
 */
class AchievementFactory extends Factory
{
    protected $model = Achievement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul_prestasi' => fake()->randomElement([
                'Juara 1 LKS Web Technologies Tingkat Provinsi',
                'Medali Emas Olimpiade Sains Nasional (OSN) Matematika',
                'Juara 2 Lomba Debat Bahasa Inggris Tingkat Nasional',
                'Juara 1 FLS2N Bidang Cipta Lagu & Musik',
            ]),
            'nama_peraih' => fake()->name(),
            'tingkat' => fake()->randomElement(['Kabupaten/Kota', 'Provinsi', 'Nasional', 'Internasional']),
            'peringkat' => fake()->randomElement(['Juara 1', 'Juara 2', 'Juara 3', 'Medali Emas']),
            'penyelenggara' => 'Kementerian Pendidikan dan Kebudayaan RI',
            'tahun' => (string) fake()->numberBetween(2023, 2026),
            'foto' => null,
            'deskripsi' => fake()->sentence(),
        ];
    }
}
