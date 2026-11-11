<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Schedule;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Schedule>
 */
class ScheduleFactory extends Factory
{
    protected $model = Schedule::class;

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
            'mata_pelajaran_id' => Subject::factory(),
            'guru_id' => Teacher::factory(),
            'hari' => fake()->randomElement(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']),
            'jam_mulai' => '07:30:00',
            'jam_selesai' => '09:00:00',
            'ruangan' => 'R.'.fake()->numberBetween(101, 305),
        ];
    }
}
