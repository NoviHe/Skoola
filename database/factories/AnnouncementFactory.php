<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Announcement>
 */
class AnnouncementFactory extends Factory
{
    protected $model = Announcement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $judul = fake()->sentence(5);

        return [
            'user_id' => User::factory(),
            'judul' => $judul,
            'slug' => Str::slug($judul).'-'.fake()->unique()->numerify('####'),
            'konten' => fake()->paragraphs(2, true),
            'target_audiens' => fake()->randomElement(['Semua', 'Siswa', 'Guru', 'Wali Murid']),
            'urgensi' => fake()->randomElement(['Biasa', 'Penting', 'Mendesak']),
            'is_active' => true,
            'published_at' => now(),
        ];
    }
}
