<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Grade;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $year = AcademicYear::active()->first() ?? AcademicYear::first();
        $students = Student::with('classroom')->get();
        $subjects = Subject::take(3)->get();

        if (! $year || $students->isEmpty() || $subjects->isEmpty()) {
            return;
        }

        foreach ($students as $student) {
            if (! $student->kelas_id) {
                continue;
            }

            foreach ($subjects as $subject) {
                Grade::firstOrCreate(
                    [
                        'tahun_ajaran_id' => $year->id,
                        'kelas_id' => $student->kelas_id,
                        'siswa_id' => $student->id,
                        'mata_pelajaran_id' => $subject->id,
                        'jenis_asesmen' => 'Sumatif Lingkup Materi',
                    ],
                    [
                        'nilai' => 88.50,
                        'capaian_kompetensi' => 'Menunjukkan pemahaman sangat memuaskan terhadap materi.',
                        'catatan' => 'Pertahankan prestasi belajar.',
                    ]
                );

                Grade::firstOrCreate(
                    [
                        'tahun_ajaran_id' => $year->id,
                        'kelas_id' => $student->kelas_id,
                        'siswa_id' => $student->id,
                        'mata_pelajaran_id' => $subject->id,
                        'jenis_asesmen' => 'Sumatif Akhir Semester',
                    ],
                    [
                        'nilai' => 92.00,
                        'capaian_kompetensi' => 'Sangat kompeten dalam seluruh tujuan pembelajaran semester.',
                        'catatan' => 'Lulus dengan predikat istimewa.',
                    ]
                );
            }
        }
    }
}
