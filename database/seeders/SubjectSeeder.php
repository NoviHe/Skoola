<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Major;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rpl = Major::where('kode_jurusan', 'RPL')->first();
        $tkj = Major::where('kode_jurusan', 'TKJ')->first();

        $subjects = [
            [
                'kode_mapel' => 'PAI',
                'nama_mapel' => 'Pendidikan Agama Islam dan Budi Pekerti',
                'kelompok' => 'Nasional',
                'jurusan_id' => null,
                'kkm' => 75,
                'is_active' => true,
            ],
            [
                'kode_mapel' => 'PPKN',
                'nama_mapel' => 'Pendidikan Pancasila',
                'kelompok' => 'Nasional',
                'jurusan_id' => null,
                'kkm' => 75,
                'is_active' => true,
            ],
            [
                'kode_mapel' => 'BINDO',
                'nama_mapel' => 'Bahasa Indonesia',
                'kelompok' => 'Nasional',
                'jurusan_id' => null,
                'kkm' => 75,
                'is_active' => true,
            ],
            [
                'kode_mapel' => 'MTK',
                'nama_mapel' => 'Matematika Umum',
                'kelompok' => 'Nasional',
                'jurusan_id' => null,
                'kkm' => 70,
                'is_active' => true,
            ],
            [
                'kode_mapel' => 'BING',
                'nama_mapel' => 'Bahasa Inggris',
                'kelompok' => 'Nasional',
                'jurusan_id' => null,
                'kkm' => 70,
                'is_active' => true,
            ],
            [
                'kode_mapel' => 'PWPB',
                'nama_mapel' => 'Pemrograman Web dan Perangkat Bergerak',
                'kelompok' => 'Kejuruan',
                'jurusan_id' => $rpl?->id,
                'kkm' => 78,
                'is_active' => true,
            ],
            [
                'kode_mapel' => 'BD',
                'nama_mapel' => 'Basis Data & SQL',
                'kelompok' => 'Kejuruan',
                'jurusan_id' => $rpl?->id,
                'kkm' => 78,
                'is_active' => true,
            ],
            [
                'kode_mapel' => 'AIJ',
                'nama_mapel' => 'Administrasi Infrastruktur Jaringan',
                'kelompok' => 'Kejuruan',
                'jurusan_id' => $tkj?->id,
                'kkm' => 78,
                'is_active' => true,
            ],
            [
                'kode_mapel' => 'MULOK-SND',
                'nama_mapel' => 'Bahasa & Sastra Sunda',
                'kelompok' => 'Muatan Lokal',
                'jurusan_id' => null,
                'kkm' => 75,
                'is_active' => true,
            ],
        ];

        foreach ($subjects as $subject) {
            Subject::firstOrCreate(
                ['kode_mapel' => $subject['kode_mapel']],
                $subject
            );
        }
    }
}
