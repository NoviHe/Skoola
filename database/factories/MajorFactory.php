<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Major;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Major>
 */
class MajorFactory extends Factory
{
    protected $model = Major::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $code = strtoupper(fake()->unique()->lexify('???'));

        return [
            'kode_jurusan' => $code,
            'nama_jurusan' => 'Jurusan '.$code,
            'singkatan' => $code,
            'deskripsi' => fake()->sentence(),
            'visi_misi' => fake()->paragraph(),
            'prospek_kerja' => fake()->sentence(),
            'is_active' => true,
        ];
    }
}
