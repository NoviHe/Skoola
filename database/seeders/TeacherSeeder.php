<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            [
                'nip' => '198001012005011003',
                'nuptk' => '1234567890123456',
                'npk' => null,
                'nama_lengkap' => 'Budi Santoso',
                'gelar_depan' => null,
                'gelar_belakang' => 'S.Kom., M.T.',
                'jenis_kelamin' => 'L',
                'bidang_studi_utama' => 'Pemrograman Web & Mobile',
                'telepon' => '081234567891',
                'alamat' => 'Padaherang, Pangandaran',
                'status_kepegawaian' => 'PNS',
            ],
            [
                'nip' => '198505122010012015',
                'nuptk' => '2345678901234567',
                'npk' => null,
                'nama_lengkap' => 'Siti Rahmawati',
                'gelar_depan' => 'Dra.',
                'gelar_belakang' => 'M.Pd.',
                'jenis_kelamin' => 'P',
                'bidang_studi_utama' => 'Bahasa Indonesia & Literasi',
                'telepon' => '081234567892',
                'alamat' => 'Banjar, Jawa Barat',
                'status_kepegawaian' => 'PNS',
            ],
            [
                'nip' => '199008232019031008',
                'nuptk' => '3456789012345678',
                'npk' => null,
                'nama_lengkap' => 'Ahmad Hidayat',
                'gelar_depan' => null,
                'gelar_belakang' => 'S.Pd.',
                'jenis_kelamin' => 'L',
                'bidang_studi_utama' => 'Administrasi Jaringan Komputer',
                'telepon' => '081234567893',
                'alamat' => 'Kalipucang, Pangandaran',
                'status_kepegawaian' => 'PPPK',
            ],
            [
                'nip' => null,
                'nuptk' => '4567890123456789',
                'npk' => null,
                'nama_lengkap' => 'Dewi Anggraeni',
                'gelar_depan' => null,
                'gelar_belakang' => 'S.Sn.',
                'jenis_kelamin' => 'P',
                'bidang_studi_utama' => 'Desain Grafis & Fotografi',
                'telepon' => '081234567894',
                'alamat' => 'Pangandaran',
                'status_kepegawaian' => 'GTY',
            ],
        ];

        foreach ($teachers as $data) {
            Teacher::updateOrCreate(['telepon' => $data['telepon']], $data);
        }
    }
}
