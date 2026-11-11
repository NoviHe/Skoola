<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Achievement;
use App\Models\Announcement;
use App\Models\Article;
use App\Models\Gallery;
use App\Models\InstitutionSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CmsAndPublicPortalTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_all_cms_filament_resources(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/admin/articles')->assertSuccessful();
        $this->actingAs($user)->get('/admin/announcements')->assertSuccessful();
        $this->actingAs($user)->get('/admin/galleries')->assertSuccessful();
        $this->actingAs($user)->get('/admin/achievements')->assertSuccessful();
    }

    public function test_public_user_can_access_home_portal(): void
    {
        InstitutionSetting::create([
            'nama_institusi' => 'SMK Negeri 1 Testing',
            'jenjang' => 'SMK',
            'has_jurusan' => true,
        ]);

        Article::factory()->create(['status' => 'published', 'published_at' => now()->subDay()]);
        Announcement::factory()->create(['is_active' => true]);
        Gallery::factory()->create();
        Achievement::factory()->create();

        $response = $this->get('/');
        $response->assertSuccessful();
    }

    public function test_public_user_can_access_profile_page(): void
    {
        InstitutionSetting::create([
            'nama_institusi' => 'SMK Negeri 1 Testing',
            'jenjang' => 'SMK',
        ]);

        $this->get('/profil')->assertSuccessful();
    }

    public function test_public_user_can_access_articles_and_detail_view_increments(): void
    {
        $article = Article::factory()->create([
            'judul' => 'Prestasi Membanggakan Siswa',
            'slug' => 'prestasi-membanggakan-siswa',
            'status' => 'published',
            'published_at' => now()->subDay(),
            'views' => 10,
        ]);

        $this->get('/berita')->assertSuccessful();

        $detailResponse = $this->get('/berita/'.$article->slug);
        $detailResponse->assertSuccessful();

        $this->assertSame(11, $article->fresh()->views);
    }

    public function test_public_user_can_access_announcements_and_gallery(): void
    {
        Announcement::factory()->create(['is_active' => true]);
        Gallery::factory()->create();
        Achievement::factory()->create();

        $this->get('/pengumuman')->assertSuccessful();
        $this->get('/galeri')->assertSuccessful();
    }
}
