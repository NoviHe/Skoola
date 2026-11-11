<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Filament\Resources\Majors\MajorResource;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\InstitutionSetting;
use App\Models\Major;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AcademicMasterTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_all_academic_master_filament_resources(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/admin/majors')->assertSuccessful();
        $this->actingAs($user)->get('/admin/teachers')->assertSuccessful();
        $this->actingAs($user)->get('/admin/classrooms')->assertSuccessful();
        $this->actingAs($user)->get('/admin/students')->assertSuccessful();
    }

    public function test_major_relationships_and_activation(): void
    {
        $major = Major::factory()->create([
            'kode_jurusan' => 'RPL',
            'nama_jurusan' => 'Rekayasa Perangkat Lunak',
            'is_active' => true,
        ]);

        $classroom = Classroom::factory()->create([
            'jurusan_id' => $major->id,
            'nama_kelas' => 'X RPL 1',
        ]);

        $this->assertCount(1, $major->classrooms);
        $this->assertSame($classroom->id, $major->classrooms->first()?->id);
    }

    public function test_teacher_nama_gelar_accessor_and_homeroom_relationship(): void
    {
        $teacher = Teacher::factory()->create([
            'nama_lengkap' => 'Budi Santoso',
            'gelar_depan' => 'Dr.',
            'gelar_belakang' => 'M.Kom.',
        ]);

        $this->assertSame('Dr. Budi Santoso, M.Kom.', $teacher->nama_gelar);

        $classroom = Classroom::factory()->create([
            'guru_id' => $teacher->id,
            'nama_kelas' => 'X TKJ 1',
        ]);

        $this->assertNotNull($teacher->homeroomClass);
        $this->assertSame($classroom->id, $teacher->homeroomClass?->id);
    }

    public function test_classroom_belongs_to_academic_year_major_and_teacher(): void
    {
        $year = AcademicYear::factory()->create(['is_active' => true]);
        $major = Major::factory()->create();
        $teacher = Teacher::factory()->create();

        $classroom = Classroom::factory()->create([
            'tahun_ajaran_id' => $year->id,
            'jurusan_id' => $major->id,
            'guru_id' => $teacher->id,
            'nama_kelas' => 'XI RPL 2',
            'kapasitas' => 36,
        ]);

        $this->assertSame($year->id, $classroom->academicYear->id);
        $this->assertSame($major->id, $classroom->major?->id);
        $this->assertSame($teacher->id, $classroom->homeroomTeacher?->id);
    }

    public function test_student_relationships_and_active_scope(): void
    {
        $classroom = Classroom::factory()->create();

        $activeStudent = Student::factory()->create([
            'kelas_id' => $classroom->id,
            'status' => 'aktif',
        ]);

        $graduatedStudent = Student::factory()->create([
            'kelas_id' => $classroom->id,
            'status' => 'lulus',
        ]);

        $this->assertSame($classroom->id, $activeStudent->classroom?->id);
        $this->assertCount(2, $classroom->students);

        $activeStudents = Student::query()->active()->get();
        $this->assertTrue($activeStudents->contains($activeStudent));
        $this->assertFalse($activeStudents->contains($graduatedStudent));
    }

    public function test_major_resource_visibility_adapts_to_institution_tier(): void
    {
        // Default SMK (has majors)
        InstitutionSetting::query()->delete();
        InstitutionSetting::create([
            'nama_institusi' => 'SMK Negeri 1',
            'jenjang' => 'SMK',
            'has_jurusan' => true,
        ]);
        $this->assertTrue(MajorResource::canViewAny());

        // SD (never has majors)
        InstitutionSetting::query()->delete();
        InstitutionSetting::create([
            'nama_institusi' => 'SD Negeri 1',
            'jenjang' => 'SD',
            'has_jurusan' => false,
        ]);
        $this->assertFalse(MajorResource::canViewAny());
    }
}
