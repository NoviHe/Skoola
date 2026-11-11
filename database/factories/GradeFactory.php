<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Grade>
 */
class GradeFactory extends Factory
{
    protected $model = Grade::class;

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
            'mata_pelajaran_id' => Subject::factory(),
            'jenis_asesmen' => fake()->randomElement([
                'Formatif',
                'Sumatif Lingkup Materi',
                'Sumatif Akhir Semester',
                'Tugas Harian',
            ]),
            'nilai' => fake()->randomFloat(2, 60, 100),
            'capaian_kompetensi' => 'Menunjukkan pemahaman yang sangat baik dalam materi pembelajaran terkait.',
            'catatan' => fake()->optional()->sentence(),
        ];
    }
}
