<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Major;
use App\Models\PpdbApplicant;
use App\Models\PpdbWave;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PpdbApplicant>
 */
class PpdbApplicantFactory extends Factory
{
    protected $model = PpdbApplicant::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ppdb_wave_id' => PpdbWave::factory(),
            'nomor_pendaftaran' => PpdbApplicant::generateNomorPendaftaran(),
            'nisn' => fake()->unique()->numerify('00########'),
            'nik' => fake()->unique()->numerify('320#############'),
            'nama_calon_siswa' => fake()->name(),
            'jenis_kelamin' => fake()->randomElement(['L', 'P']),
            'tempat_lahir' => fake()->city(),
            'tanggal_lahir' => fake()->dateTimeBetween('-16 years', '-14 years')->format('Y-m-d'),
            'agama' => 'Islam',
            'asal_sekolah' => 'SMP Negeri 1 '.fake()->city(),
            'jurusan_pilihan_1' => Major::factory(),
            'jurusan_pilihan_2' => null,
            'jalur_pendaftaran' => fake()->randomElement(['reguler', 'prestasi', 'afirmasi', 'zonasi']),
            'nama_wali' => fake()->name(),
            'hubungan_wali' => 'Ayah Kandung',
            'pekerjaan_wali' => fake()->jobTitle(),
            'nomor_whatsapp_wali' => '08'.fake()->numerify('##########'),
            'alamat' => fake()->address(),
            'berkas_kartu_keluarga' => 'ppdb-documents/dummy-kk.pdf',
            'berkas_akta_kelahiran' => 'ppdb-documents/dummy-akta.pdf',
            'berkas_ijazah_skl' => 'ppdb-documents/dummy-ijazah.pdf',
            'berkas_rapor_prestasi' => null,
            'status_seleksi' => 'menunggu_verifikasi',
            'catatan_panitia' => null,
            'diverifikasi_oleh' => null,
            'diverifikasi_pada' => null,
        ];
    }
}
