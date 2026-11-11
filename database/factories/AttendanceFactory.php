<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\Attendance;
use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Attendance>
 */
class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tahun_ajaran_id' => AcademicYear::factory(),
            'kelas_id' => Classroom::factory(),
            'siswa_id' => Student::factory(),
            'tanggal' => fake()->date(),
            'status' => fake()->randomElement(['hadir', 'sakit', 'izin', 'alpa']),
            'catatan' => fake()->optional()->sentence(),
        ];
    }
}
