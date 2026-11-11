<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Major;
use Illuminate\Database\Seeder;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $majors = [
            [
                'kode_jurusan' => 'RPL',
                'nama_jurusan' => 'Rekayasa Perangkat Lunak',
                'singkatan' => 'RPL',
                'deskripsi' => 'Kompetensi keahlian yang mempelajari pembuatan dan pengembangan piranti lunak, web, mobile, dan basis data.',
                'visi_misi' => 'Mencetak software engineer andal, berakhlak mulia, dan siap bersaing di kancah global.',
                'prospek_kerja' => 'Web Developer, Mobile App Developer, Software QA, Database Administrator.',
                'is_active' => true,
            ],
            [
                'kode_jurusan' => 'TKJ',
                'nama_jurusan' => 'Teknik Komputer & Jaringan',
                'singkatan' => 'TKJ',
                'deskripsi' => 'Mempelajari arsitektur jaringan komputer, server, cloud computing, dan keamanan siber.',
                'visi_misi' => 'Menghasilkan network administrator profesional dan tersertifikasi industri.',
                'prospek_kerja' => 'Network Engineer, System Administrator, Cloud Engineer, IT Support.',
                'is_active' => true,
            ],
            [
                'kode_jurusan' => 'DKV',
                'nama_jurusan' => 'Desain Komunikasi Visual',
                'singkatan' => 'DKV',
                'deskripsi' => 'Mempelajari grafis digital, animasi, ilustrasi, videografi, dan branding industri kreatif.',
                'visi_misi' => 'Melahirkan desainer visual kreatif dan inovatif di era digital.',
                'prospek_kerja' => 'Graphic Designer, UI/UX Designer, Motion Graphic Designer, Video Editor.',
                'is_active' => true,
            ],
            [
                'kode_jurusan' => 'AKL',
                'nama_jurusan' => 'Akuntansi & Keuangan Lembaga',
                'singkatan' => 'AKL',
                'deskripsi' => 'Mempelajari akuntansi keuangan digital, perpajakan, dan perbankan syariah/konvensional.',
                'visi_misi' => 'Menciptakan tenaga akuntan yang teliti, jujur, dan kompeten.',
                'prospek_kerja' => 'Staff Akuntansi, Payroll Officer, Auditor Junior, Teller Bank.',
                'is_active' => true,
            ],
        ];

        foreach ($majors as $data) {
            Major::updateOrCreate(['kode_jurusan' => $data['kode_jurusan']], $data);
        }
    }
}
