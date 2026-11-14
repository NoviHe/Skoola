<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\PpdbWave;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PpdbWave>
 */
class PpdbWaveFactory extends Factory
{
    protected $model = PpdbWave::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tahun_ajaran_id' => AcademicYear::factory(),
            'nama_gelombang' => 'Gelombang 1 - Jalur Reguler & Prestasi',
            'kode_gelombang' => 'GEL-'.fake()->unique()->numerify('###'),
            'tanggal_buka' => now()->subDays(5)->toDateString(),
            'tanggal_tutup' => now()->addDays(25)->toDateString(),
            'kuota' => 200,
            'deskripsi' => 'Pendaftaran penerimaan peserta didik baru gelombang reguler tahun ajaran berjalan.',
            'is_active' => true,
        ];
    }
}
