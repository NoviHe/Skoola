<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\AcademicYear;
use App\Models\InstitutionSetting;
use App\Models\Major;
use App\Models\PpdbApplicant;
use App\Models\PpdbWave;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PpdbTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_filament_ppdb_resources(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/admin/ppdb-waves')->assertSuccessful();
        $this->actingAs($user)->get('/admin/ppdb-applicants')->assertSuccessful();
    }

    public function test_public_user_can_access_ppdb_landing_page(): void
    {
        InstitutionSetting::create([
            'nama_institusi' => 'SMK Negeri 1 Testing',
            'jenjang' => 'SMK',
            'has_jurusan' => true,
        ]);

        $academicYear = AcademicYear::create([
            'tahun' => '2026/2027',
            'semester' => 'Ganjil',
            'is_active' => true,
        ]);

        PpdbWave::create([
            'tahun_ajaran_id' => $academicYear->id,
            'nama_gelombang' => 'Gelombang 1 - Jalur Prestasi',
            'kode_gelombang' => 'GEL-1',
            'tanggal_buka' => now()->subDay()->toDateString(),
            'tanggal_tutup' => now()->addDays(20)->toDateString(),
            'kuota' => 100,
            'is_active' => true,
        ]);

        $response = $this->get('/ppdb');
        $response->assertSuccessful();
    }

    public function test_public_user_can_access_ppdb_registration_form(): void
    {
        InstitutionSetting::create([
            'nama_institusi' => 'SMK Negeri 1 Testing',
            'jenjang' => 'SMK',
            'has_jurusan' => true,
        ]);

        $academicYear = AcademicYear::create([
            'tahun' => '2026/2027',
            'semester' => 'Ganjil',
            'is_active' => true,
        ]);

        $wave = PpdbWave::create([
            'tahun_ajaran_id' => $academicYear->id,
            'nama_gelombang' => 'Gelombang 1 - Jalur Prestasi',
            'kode_gelombang' => 'GEL-1',
            'tanggal_buka' => now()->subDay()->toDateString(),
            'tanggal_tutup' => now()->addDays(20)->toDateString(),
            'is_active' => true,
        ]);

        $this->get('/ppdb/daftar?gelombang='.$wave->id)->assertSuccessful();
    }

    public function test_public_applicant_can_submit_registration_successfully(): void
    {
        Storage::fake('public');

        InstitutionSetting::create([
            'nama_institusi' => 'SMK Negeri 1 Testing',
            'jenjang' => 'SMK',
            'has_jurusan' => true,
        ]);

        $academicYear = AcademicYear::create([
            'tahun' => '2026/2027',
            'semester' => 'Ganjil',
            'is_active' => true,
        ]);

        $wave = PpdbWave::create([
            'tahun_ajaran_id' => $academicYear->id,
            'nama_gelombang' => 'Gelombang 1 - Jalur Prestasi',
            'kode_gelombang' => 'GEL-1',
            'tanggal_buka' => now()->subDay()->toDateString(),
            'tanggal_tutup' => now()->addDays(20)->toDateString(),
            'is_active' => true,
        ]);

        $major = Major::create([
            'nama_jurusan' => 'Teknik Komputer dan Jaringan',
            'kode_jurusan' => 'TKJ',
            'singkatan' => 'TKJ',
            'is_active' => true,
        ]);

        $dummyKk = UploadedFile::fake()->create('kartu_keluarga.pdf', 500, 'application/pdf');

        $payload = [
            'ppdb_wave_id' => $wave->id,
            'jalur_pendaftaran' => 'prestasi',
            'jurusan_pilihan_1' => $major->id,
            'nisn' => '0091234567',
            'nik' => '3218012304090001',
            'nama_calon_siswa' => 'Bintang Pratama',
            'jenis_kelamin' => 'L',
            'tempat_lahir' => 'Pangandaran',
            'tanggal_lahir' => '2009-05-15',
            'agama' => 'Islam',
            'asal_sekolah' => 'SMP Negeri 1 Pangandaran',
            'nama_wali' => 'Subagyo',
            'hubungan_wali' => 'Ayah Kandung',
            'pekerjaan_wali' => 'Wiraswasta',
            'nomor_whatsapp_wali' => '081234567890',
            'alamat' => 'Jl. Pantai Barat No. 10',
            'berkas_kartu_keluarga' => $dummyKk,
        ];

        $response = $this->post('/ppdb/daftar', $payload);

        $this->assertDatabaseHas('ppdb_applicants', [
            'nisn' => '0091234567',
            'nik' => '3218012304090001',
            'nama_calon_siswa' => 'Bintang Pratama',
            'status_seleksi' => 'menunggu_verifikasi',
        ]);

        $applicant = PpdbApplicant::where('nisn', '0091234567')->firstOrFail();
        $this->assertNotNull($applicant->nomor_pendaftaran);
        $this->assertNotNull($applicant->berkas_kartu_keluarga);

        $response->assertRedirect('/ppdb/sukses/'.$applicant->nomor_pendaftaran);
    }

    public function test_public_user_can_check_registration_status(): void
    {
        InstitutionSetting::create([
            'nama_institusi' => 'SMK Negeri 1 Testing',
            'jenjang' => 'SMK',
        ]);

        $academicYear = AcademicYear::create([
            'tahun' => '2026/2027',
            'semester' => 'Ganjil',
            'is_active' => true,
        ]);

        $wave = PpdbWave::create([
            'tahun_ajaran_id' => $academicYear->id,
            'nama_gelombang' => 'Gelombang 1',
            'kode_gelombang' => 'GEL-1',
            'tanggal_buka' => now()->subDay()->toDateString(),
            'tanggal_tutup' => now()->addDays(20)->toDateString(),
            'is_active' => true,
        ]);

        $applicant = PpdbApplicant::create([
            'ppdb_wave_id' => $wave->id,
            'nomor_pendaftaran' => 'PPDB-2026-9999',
            'nisn' => '0098765432',
            'nik' => '3218012304090002',
            'nama_calon_siswa' => 'Aulia Zahra',
            'jenis_kelamin' => 'P',
            'tempat_lahir' => 'Ciamis',
            'tanggal_lahir' => '2009-08-20',
            'agama' => 'Islam',
            'asal_sekolah' => 'MTs Negeri 1',
            'jalur_pendaftaran' => 'reguler',
            'nama_wali' => 'Mulyadi',
            'hubungan_wali' => 'Ayah Kandung',
            'nomor_whatsapp_wali' => '081233445566',
            'alamat' => 'Dusun Desa RT 01/RW 02',
            'status_seleksi' => 'diterima',
            'catatan_panitia' => 'Selamat Anda Lulus Seleksi!',
        ]);

        // Access check-status page without query
        $this->get('/ppdb/cek-status')->assertSuccessful();

        // Search by registration number
        $response = $this->get('/ppdb/cek-status?search=PPDB-2026-9999');
        $response->assertSuccessful();

        // Search by non-existent number
        $notFoundResponse = $this->get('/ppdb/cek-status?search=PPDB-UNKNOWN-999');
        $notFoundResponse->assertSuccessful();
    }

    public function test_public_user_can_access_print_registration_card(): void
    {
        InstitutionSetting::create([
            'nama_institusi' => 'SMK Negeri 1 Testing',
            'jenjang' => 'SMK',
        ]);

        $academicYear = AcademicYear::create([
            'tahun' => '2026/2027',
            'semester' => 'Ganjil',
            'is_active' => true,
        ]);

        $wave = PpdbWave::create([
            'tahun_ajaran_id' => $academicYear->id,
            'nama_gelombang' => 'Gelombang 1',
            'kode_gelombang' => 'GEL-1',
            'tanggal_buka' => now()->subDay()->toDateString(),
            'tanggal_tutup' => now()->addDays(20)->toDateString(),
            'is_active' => true,
        ]);

        $applicant = PpdbApplicant::create([
            'ppdb_wave_id' => $wave->id,
            'nomor_pendaftaran' => 'PPDB-2026-8888',
            'nisn' => '0098765433',
            'nik' => '3218012304090003',
            'nama_calon_siswa' => 'Rizki Ramadhan',
            'jenis_kelamin' => 'L',
            'tempat_lahir' => 'Banjar',
            'tanggal_lahir' => '2009-03-10',
            'agama' => 'Islam',
            'asal_sekolah' => 'SMP Negeri 2 Banjar',
            'jalur_pendaftaran' => 'zonasi',
            'nama_wali' => 'Hasan',
            'hubungan_wali' => 'Ayah Kandung',
            'nomor_whatsapp_wali' => '081233445577',
            'alamat' => 'Jl. Tentara Pelajar No 5',
            'status_seleksi' => 'menunggu_verifikasi',
        ]);

        $this->get('/ppdb/cetak/'.$applicant->nomor_pendaftaran)->assertSuccessful();
    }
}
