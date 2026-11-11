<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classrooms = Classroom::all();
        if ($classrooms->isEmpty()) {
            return;
        }

        $rplClass = $classrooms->firstWhere('nama_kelas', 'X RPL 1') ?? $classrooms->first();
        $tkjClass = $classrooms->firstWhere('nama_kelas', 'X TKJ 1') ?? $classrooms->first();

        $students = [
            [
                'kelas_id' => $rplClass->id,
                'nis' => '20261001',
                'nisn' => '0081234567',
                'nik' => '3218012304080001',
                'nama_lengkap' => 'Muhammad Rizky Pratama',
                'nama_panggilan' => 'Rizky',
                'jenis_kelamin' => 'L',
                'tempat_lahir' => 'Pangandaran',
                'tanggal_lahir' => '2008-04-15',
                'agama' => 'Islam',
                'alamat_lengkap' => 'Dusun Padaherang RT 02 RW 05, Padaherang',
                'desa_kelurahan' => 'Padaherang',
                'kecamatan' => 'Padaherang',
                'kabupaten_kota' => 'Pangandaran',
                'provinsi' => 'Jawa Barat',
                'kode_pos' => '46384',
                'nomor_telepon' => '082112345678',
                'email' => 'rizky@example.test',
                'nama_ayah' => 'Bambang Pratama',
                'pekerjaan_ayah' => 'Wiraswasta',
                'nama_ibu' => 'Sri Wahyuni',
                'pekerjaan_ibu' => 'Ibu Rumah Tangga',
                'status' => 'aktif',
            ],
            [
                'kelas_id' => $rplClass->id,
                'nis' => '20261002',
                'nisn' => '0082345678',
                'nik' => '3218016408080002',
                'nama_lengkap' => 'Anisa Nur Aini',
                'nama_panggilan' => 'Anisa',
                'jenis_kelamin' => 'P',
                'tempat_lahir' => 'Ciamis',
                'tanggal_lahir' => '2008-08-24',
                'agama' => 'Islam',
                'alamat_lengkap' => 'Dusun Karanganyar RT 01 RW 02, Padaherang',
                'desa_kelurahan' => 'Karanganyar',
                'kecamatan' => 'Padaherang',
                'kabupaten_kota' => 'Pangandaran',
                'provinsi' => 'Jawa Barat',
                'kode_pos' => '46384',
                'nomor_telepon' => '082123456789',
                'email' => 'anisa@example.test',
                'nama_ayah' => 'Dedi Supriadi',
                'pekerjaan_ayah' => 'PNS',
                'nama_ibu' => 'Neneng Maryati',
                'pekerjaan_ibu' => 'Guru',
                'status' => 'aktif',
            ],
            [
                'kelas_id' => $tkjClass->id,
                'nis' => '20261003',
                'nisn' => '0083456789',
                'nik' => '3218011210080003',
                'nama_lengkap' => 'Fajar Nugraha',
                'nama_panggilan' => 'Fajar',
                'jenis_kelamin' => 'L',
                'tempat_lahir' => 'Banjar',
                'tanggal_lahir' => '2008-10-12',
                'agama' => 'Islam',
                'alamat_lengkap' => 'Dusun Babakan RT 03 RW 01, Padaherang',
                'desa_kelurahan' => 'Babakan',
                'kecamatan' => 'Padaherang',
                'kabupaten_kota' => 'Pangandaran',
                'provinsi' => 'Jawa Barat',
                'kode_pos' => '46384',
                'nomor_telepon' => '082134567890',
                'email' => 'fajar@example.test',
                'nama_ayah' => 'Agus Nugraha',
                'pekerjaan_ayah' => 'Karyawan Swasta',
                'nama_ibu' => 'Yanti Susanti',
                'pekerjaan_ibu' => 'Pedagang',
                'status' => 'aktif',
            ],
        ];

        foreach ($students as $data) {
            Student::updateOrCreate(['nisn' => $data['nisn']], $data);
        }
    }
}
