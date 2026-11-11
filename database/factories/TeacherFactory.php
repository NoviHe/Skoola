<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Teacher>
 */
class TeacherFactory extends Factory
{
    protected $model = Teacher::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => null,
            'nip' => '19'.fake()->numerify('######').'1'.fake()->numerify('####'),
            'nuptk' => fake()->numerify('################'),
            'npk' => null,
            'nama_lengkap' => fake()->name(),
            'gelar_depan' => fake()->optional(0.3)->randomElement(['Dr.', 'Drs.', 'Dra.']),
            'gelar_belakang' => fake()->randomElement(['S.Pd.', 'M.Kom.', 'S.Kom.', 'M.Pd.']),
            'jenis_kelamin' => fake()->randomElement(['L', 'P']),
            'bidang_studi_utama' => fake()->randomElement(['Matematika', 'Informatika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Pemrograman Web']),
            'telepon' => '08'.fake()->numerify('##########'),
            'alamat' => fake()->address(),
            'status_kepegawaian' => fake()->randomElement(['PNS', 'PPPK', 'GTY', 'GTT', 'Honorer']),
        ];
    }
}
