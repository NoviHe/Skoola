<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Attendance;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $year = AcademicYear::active()->first() ?? AcademicYear::first();
        $students = Student::with('classroom')->get();

        if (! $year || $students->isEmpty()) {
            return;
        }

        $dates = [
            Carbon::yesterday()->toDateString(),
            Carbon::today()->toDateString(),
        ];

        foreach ($students as $student) {
            if (! $student->kelas_id) {
                continue;
            }

            foreach ($dates as $date) {
                Attendance::firstOrCreate(
                    [
                        'kelas_id' => $student->kelas_id,
                        'siswa_id' => $student->id,
                        'tanggal' => $date,
                    ],
                    [
                        'tahun_ajaran_id' => $year->id,
                        'status' => 'hadir',
                        'catatan' => 'Hadir tepat waktu',
                    ]
                );
            }
        }
    }
}
