<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\AcademicYear;
use Illuminate\Database\Seeder;

class AcademicYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AcademicYear::updateOrCreate(
            ['tahun' => '2026/2027', 'semester' => 'Ganjil'],
            ['is_active' => true]
        );

        AcademicYear::updateOrCreate(
            ['tahun' => '2026/2027', 'semester' => 'Genap'],
            ['is_active' => false]
        );
    }
}
