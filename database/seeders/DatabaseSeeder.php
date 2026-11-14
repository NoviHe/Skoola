<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@akademi.test'],
            [
                'name' => 'Super Administrator',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            InstitutionSettingSeeder::class,
            AcademicYearSeeder::class,
            MajorSeeder::class,
            TeacherSeeder::class,
            ClassroomSeeder::class,
            StudentSeeder::class,
            SubjectSeeder::class,
            ScheduleSeeder::class,
            AttendanceSeeder::class,
            GradeSeeder::class,
            ArticleSeeder::class,
            AnnouncementSeeder::class,
            GallerySeeder::class,
            AchievementSeeder::class,
            PpdbSeeder::class,
        ]);
    }
}
