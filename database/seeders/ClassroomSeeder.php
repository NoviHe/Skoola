<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Major;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class ClassroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $year = AcademicYear::where('is_active', true)->first() ?? AcademicYear::first();
        if (! $year) {
            return;
        }

        $rpl = Major::where('kode_jurusan', 'RPL')->first();
        $tkj = Major::where('kode_jurusan', 'TKJ')->first();
        $dkv = Major::where('kode_jurusan', 'DKV')->first();
        $akl = Major::where('kode_jurusan', 'AKL')->first();

        $teachers = Teacher::all();

        $classes = [
            [
                'tahun_ajaran_id' => $year->id,
                'jurusan_id' => $rpl?->id,
                'guru_id' => $teachers->first()?->id,
                'tingkat' => 10,
                'nama_kelas' => 'X RPL 1',
                'kapasitas' => 36,
            ],
            [
                'tahun_ajaran_id' => $year->id,
                'jurusan_id' => $tkj?->id,
                'guru_id' => $teachers->skip(1)->first()?->id,
                'tingkat' => 10,
                'nama_kelas' => 'X TKJ 1',
                'kapasitas' => 36,
            ],
            [
                'tahun_ajaran_id' => $year->id,
                'jurusan_id' => $dkv?->id,
                'guru_id' => $teachers->skip(2)->first()?->id,
                'tingkat' => 10,
                'nama_kelas' => 'X DKV 1',
                'kapasitas' => 36,
            ],
            [
                'tahun_ajaran_id' => $year->id,
                'jurusan_id' => $akl?->id,
                'guru_id' => $teachers->skip(3)->first()?->id,
                'tingkat' => 10,
                'nama_kelas' => 'X AKL 1',
                'kapasitas' => 36,
            ],
        ];

        foreach ($classes as $data) {
            Classroom::updateOrCreate(
                [
                    'tahun_ajaran_id' => $data['tahun_ajaran_id'],
                    'nama_kelas' => $data['nama_kelas'],
                ],
                $data
            );
        }
    }
}
