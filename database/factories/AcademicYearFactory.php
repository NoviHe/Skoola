<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\AcademicYear;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AcademicYear>
 */
class AcademicYearFactory extends Factory
{
    protected $model = AcademicYear::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = fake()->numberBetween(2020, 2030);

        return [
            'tahun' => "{$start}/".($start + 1),
            'semester' => fake()->randomElement(['Ganjil', 'Genap']),
            'is_active' => true,
        ];
    }
}
