<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Major;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Classroom>
 */
class ClassroomFactory extends Factory
{
    protected $model = Classroom::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tingkat = fake()->randomElement([10, 11, 12]);
        $identifier = fake()->randomElement(['RPL 1', 'TKJ 1', 'DKV 1', 'AKL 1']);

        return [
            'tahun_ajaran_id' => AcademicYear::factory(),
            'jurusan_id' => Major::factory(),
            'guru_id' => Teacher::factory(),
            'tingkat' => $tingkat,
            'nama_kelas' => "X {$identifier}",
            'kapasitas' => 36,
        ];
    }
}
