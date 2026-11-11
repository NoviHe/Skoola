<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\InstitutionSetting;
use Illuminate\Database\Seeder;

class InstitutionSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InstitutionSetting::updateOrCreate(
            ['id' => 1],
            [
                'nama_institusi' => 'SMK Negeri 1 Padaherang',
                'jenjang' => 'SMK',
                'npsn' => '20253456',
                'nsm' => null,
                'kurikulum_aktif' => 'merdeka',
                'has_jurusan' => true,
                'alamat' => 'Jl. Babakan No. 125, Padaherang, Pangandaran, Jawa Barat',
                'telepon' => '(0265) 655123',
                'email' => 'info@smkn1padaherang.sch.id',
                'website' => 'https://smkn1padaherang.sch.id',
                'kepala_sekolah' => 'Drs. H. Ahmad Fauzi, M.Pd.',
                'nip_kepala_sekolah' => '196805121994031005',
                'fitur_ppdb' => true,
                'fitur_pkl' => true,
            ]
        );
    }
}
