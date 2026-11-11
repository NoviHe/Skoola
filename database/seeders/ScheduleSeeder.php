<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Schedule;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $year = AcademicYear::active()->first() ?? AcademicYear::first();
        $classrooms = Classroom::all();
        $teachers = Teacher::all();
        $subjects = Subject::all();

        if (! $year || $classrooms->isEmpty() || $teachers->isEmpty() || $subjects->isEmpty()) {
            return;
        }

        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

        foreach ($classrooms as $index => $classroom) {
            $subject = $subjects->get($index % $subjects->count());
            $teacher = $teachers->get($index % $teachers->count());

            Schedule::firstOrCreate(
                [
                    'tahun_ajaran_id' => $year->id,
                    'kelas_id' => $classroom->id,
                    'hari' => $days[$index % count($days)],
                    'jam_mulai' => '07:30:00',
                ],
                [
                    'mata_pelajaran_id' => $subject->id,
                    'guru_id' => $teacher->id,
                    'jam_selesai' => '09:00:00',
                    'ruangan' => 'R. Lab '.$classroom->nama_kelas,
                ]
            );
        }
    }
}
