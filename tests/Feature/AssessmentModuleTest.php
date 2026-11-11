<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\AcademicYear;
use App\Models\Attendance;
use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Major;
use App\Models\Schedule;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AssessmentModuleTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_all_assessment_filament_resources(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/admin/subjects')->assertSuccessful();
        $this->actingAs($user)->get('/admin/schedules')->assertSuccessful();
        $this->actingAs($user)->get('/admin/attendances')->assertSuccessful();
        $this->actingAs($user)->get('/admin/grades')->assertSuccessful();
    }

    public function test_subject_relationships_and_active_scope(): void
    {
        $major = Major::factory()->create(['kode_jurusan' => 'RPL']);

        $activeSubject = Subject::factory()->create([
            'kode_mapel' => 'PWPB-01',
            'nama_mapel' => 'Pemrograman Web',
            'jurusan_id' => $major->id,
            'is_active' => true,
        ]);

        $inactiveSubject = Subject::factory()->create([
            'kode_mapel' => 'OLD-01',
            'is_active' => false,
        ]);

        $this->assertSame($major->id, $activeSubject->major?->id);
        $this->assertTrue(Subject::query()->active()->get()->contains($activeSubject));
        $this->assertFalse(Subject::query()->active()->get()->contains($inactiveSubject));
    }

    public function test_schedule_relationships_and_attributes(): void
    {
        $year = AcademicYear::factory()->create();
        $classroom = Classroom::factory()->create();
        $subject = Subject::factory()->create();
        $teacher = Teacher::factory()->create();

        $schedule = Schedule::factory()->create([
            'tahun_ajaran_id' => $year->id,
            'kelas_id' => $classroom->id,
            'mata_pelajaran_id' => $subject->id,
            'guru_id' => $teacher->id,
            'hari' => 'Senin',
            'jam_mulai' => '08:00:00',
            'jam_selesai' => '09:30:00',
            'ruangan' => 'Lab Komputer 1',
        ]);

        $this->assertSame($year->id, $schedule->academicYear->id);
        $this->assertSame($classroom->id, $schedule->classroom->id);
        $this->assertSame($subject->id, $schedule->subject->id);
        $this->assertSame($teacher->id, $schedule->teacher->id);
        $this->assertSame('Senin', $schedule->hari);
    }

    public function test_attendance_records_student_presence(): void
    {
        $classroom = Classroom::factory()->create();
        $student = Student::factory()->create(['kelas_id' => $classroom->id]);

        $attendance = Attendance::factory()->create([
            'kelas_id' => $classroom->id,
            'siswa_id' => $student->id,
            'tanggal' => now()->toDateString(),
            'status' => 'hadir',
        ]);

        $this->assertSame($classroom->id, $attendance->classroom->id);
        $this->assertSame($student->id, $attendance->student->id);
        $this->assertSame('hadir', $attendance->status);
    }

    public function test_grade_records_assessment_scores_and_competencies(): void
    {
        $student = Student::factory()->create();
        $subject = Subject::factory()->create(['kkm' => 75]);

        $grade = Grade::factory()->create([
            'siswa_id' => $student->id,
            'mata_pelajaran_id' => $subject->id,
            'jenis_asesmen' => 'Sumatif Lingkup Materi',
            'nilai' => 87.50,
            'capaian_kompetensi' => 'Sangat kompeten pada algoritma pemrograman.',
        ]);

        $this->assertSame($student->id, $grade->student->id);
        $this->assertSame($subject->id, $grade->subject->id);
        $this->assertSame(87.50, (float) $grade->nilai);
    }
}
