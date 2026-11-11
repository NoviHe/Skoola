<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => null,
            'kelas_id' => Classroom::factory(),
            'nis' => fake()->unique()->numerify('2026####'),
            'nisn' => fake()->unique()->numerify('00########'),
            'nik' => fake()->numerify('3208############'),
            'nama_lengkap' => fake()->name(),
            'nama_panggilan' => fake()->firstName(),
            'jenis_kelamin' => fake()->randomElement(['L', 'P']),
            'tempat_lahir' => fake()->city(),
            'tanggal_lahir' => fake()->dateTimeBetween('-18 years', '-15 years'),
            'agama' => 'Islam',
            'alamat_lengkap' => fake()->address(),
            'desa_kelurahan' => fake()->streetName(),
            'kecamatan' => fake()->citySuffix(),
            'kabupaten_kota' => fake()->city(),
            'provinsi' => 'Jawa Barat',
            'kode_pos' => fake()->postcode(),
            'nomor_telepon' => '08'.fake()->numerify('##########'),
            'email' => fake()->unique()->safeEmail(),
            'nama_ayah' => fake()->name('male'),
            'pekerjaan_ayah' => fake()->jobTitle(),
            'nama_ibu' => fake()->name('female'),
            'pekerjaan_ibu' => fake()->jobTitle(),
            'nama_wali' => null,
            'telepon_wali' => null,
            'avatar' => null,
            'status' => 'aktif',
        ];
    }
}
