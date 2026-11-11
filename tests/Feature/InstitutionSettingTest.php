<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\AcademicYear;
use App\Models\InstitutionSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InstitutionSettingTest extends TestCase
{
    use RefreshDatabase;

    public function test_institution_setting_singleton_returns_default(): void
    {
        $setting = InstitutionSetting::current();

        $this->assertNotNull($setting);
        $this->assertSame('SMK Negeri 1 Padaherang', $setting->nama_institusi);
        $this->assertSame('SMK', $setting->jenjang);
        $this->assertTrue($setting->has_jurusan);
    }

    public function test_grade_levels_adapt_to_educational_tier(): void
    {
        $sd = new InstitutionSetting(['jenjang' => 'SD']);
        $this->assertArrayHasKey(1, $sd->gradeLevels());
        $this->assertArrayHasKey(6, $sd->gradeLevels());
        $this->assertArrayNotHasKey(7, $sd->gradeLevels());

        $smp = new InstitutionSetting(['jenjang' => 'SMP']);
        $this->assertArrayHasKey(7, $smp->gradeLevels());
        $this->assertArrayHasKey(9, $smp->gradeLevels());
        $this->assertArrayNotHasKey(10, $smp->gradeLevels());

        $smk = new InstitutionSetting(['jenjang' => 'SMK']);
        $this->assertArrayHasKey(10, $smk->gradeLevels());
        $this->assertArrayHasKey(12, $smk->gradeLevels());
        $this->assertArrayNotHasKey(1, $smk->gradeLevels());
    }

    public function test_has_majors_is_false_for_elementary_and_junior_high(): void
    {
        $sd = new InstitutionSetting(['jenjang' => 'SD', 'has_jurusan' => true]);
        $this->assertFalse($sd->hasMajors());

        $smp = new InstitutionSetting(['jenjang' => 'SMP', 'has_jurusan' => true]);
        $this->assertFalse($smp->hasMajors());

        $smk = new InstitutionSetting(['jenjang' => 'SMK', 'has_jurusan' => true]);
        $this->assertTrue($smk->hasMajors());
    }

    public function test_academic_year_returns_active_year(): void
    {
        AcademicYear::create(['tahun' => '2025/2026', 'semester' => 'Genap', 'is_active' => false]);
        AcademicYear::create(['tahun' => '2026/2027', 'semester' => 'Ganjil', 'is_active' => true]);

        $active = AcademicYear::current();

        $this->assertNotNull($active);
        $this->assertSame('2026/2027', $active->tahun);
        $this->assertSame('Ganjil', $active->semester);
    }

    public function test_authenticated_admin_can_access_filament_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin');

        $response->assertSuccessful();
    }
}
