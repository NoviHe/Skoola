<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Article>
 */
class ArticleFactory extends Factory
{
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $judul = fake()->sentence(6);

        return [
            'user_id' => User::factory(),
            'kategori' => fake()->randomElement(['Berita', 'Artikel', 'Opini', 'Tutorial']),
            'judul' => $judul,
            'slug' => Str::slug($judul).'-'.fake()->unique()->numerify('####'),
            'ringkasan' => fake()->paragraph(2),
            'konten' => fake()->paragraphs(4, true),
            'thumbnail' => null,
            'status' => 'published',
            'published_at' => now()->subDays(fake()->numberBetween(1, 30)),
            'views' => fake()->numberBetween(10, 500),
        ];
    }
}
