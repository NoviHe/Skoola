<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Subject>
 */
class SubjectFactory extends Factory
{
    protected $model = Subject::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $code = strtoupper(fake()->unique()->bothify('MP-###'));

        return [
            'kode_mapel' => $code,
            'nama_mapel' => fake()->randomElement([
                'Pendidikan Agama dan Budi Pekerti',
                'Pendidikan Pancasila',
                'Bahasa Indonesia',
                'Matematika',
                'Bahasa Inggris',
                'Pemrograman Berorientasi Objek',
                'Basis Data',
                'Dasar-dasar Kejuruan RPL',
            ]),
            'kelompok' => fake()->randomElement(['Nasional', 'Kemenag', 'Peminatan', 'Kejuruan', 'Muatan Lokal']),
            'jurusan_id' => null,
            'kkm' => fake()->numberBetween(70, 80),
            'is_active' => true,
        ];
    }
}
