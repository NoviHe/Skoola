<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Announcement;
use App\Models\Article;
use App\Models\Classroom;
use App\Models\Gallery;
use App\Models\InstitutionSetting;
use App\Models\Major;
use App\Models\PpdbWave;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicPortalController extends Controller
{
    /**
     * Beranda portal publik sekolah / madrasah.
     */
    public function home(): Response
    {
        $setting = InstitutionSetting::current();

        $stats = [
            'total_students' => Student::query()->active()->count(),
            'total_teachers' => Teacher::query()->count(),
            'total_classrooms' => Classroom::query()->count(),
            'total_majors' => $setting->hasMajors() ? Major::query()->where('is_active', true)->count() : 0,
        ];

        return Inertia::render('public/home', [
            'institution' => $setting,
            'hasMajors' => $setting->hasMajors(),
            'majors' => $setting->hasMajors() ? Major::query()->where('is_active', true)->get() : [],
            'articles' => Article::query()->published()->latest('published_at')->take(3)->get(),
            'announcements' => Announcement::query()->active()->latest('published_at')->take(4)->get(),
            'galleries' => Gallery::query()->latest()->take(6)->get(),
            'achievements' => Achievement::query()->latest()->take(3)->get(),
            'openPpdbWave' => PpdbWave::query()
                ->where('is_active', true)
                ->whereDate('tanggal_buka', '<=', now()->toDateString())
                ->whereDate('tanggal_tutup', '>=', now()->toDateString())
                ->first() ?? PpdbWave::query()->where('is_active', true)->first(),
            'stats' => $stats,
        ]);
    }

    /**
     * Halaman profil lembaga (sejarah, visi-misi, pimpinan, kontak).
     */
    public function profile(): Response
    {
        $setting = InstitutionSetting::current();

        $stats = [
            'total_students' => Student::query()->active()->count(),
            'total_teachers' => Teacher::query()->count(),
            'total_classrooms' => Classroom::query()->count(),
        ];

        return Inertia::render('public/profile', [
            'institution' => $setting,
            'teachers' => Teacher::query()->take(8)->get(),
            'stats' => $stats,
        ]);
    }

    /**
     * Indeks berita & warta edukasi.
     */
    public function articles(Request $request): Response
    {
        $setting = InstitutionSetting::current();
        $selectedCategory = $request->query('kategori');

        $articles = Article::query()
            ->published()
            ->when($selectedCategory, fn ($query) => $query->where('kategori', $selectedCategory))
            ->latest('published_at')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('public/articles', [
            'institution' => $setting,
            'articles' => $articles,
            'selectedCategory' => $selectedCategory,
            'categories' => ['Berita', 'Artikel', 'Opini', 'Tutorial'],
        ]);
    }

    /**
     * Halaman detail artikel / warta.
     */
    public function articleDetail(string $slug): Response
    {
        $setting = InstitutionSetting::current();

        $article = Article::query()
            ->where('slug', $slug)
            ->firstOrFail();

        $article->increment('views');

        $relatedArticles = Article::query()
            ->published()
            ->where('id', '!=', $article->id)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('public/article-detail', [
            'institution' => $setting,
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }

    /**
     * Halaman daftar pengumuman resmi.
     */
    public function announcements(): Response
    {
        $setting = InstitutionSetting::current();

        $announcements = Announcement::query()
            ->active()
            ->latest('published_at')
            ->paginate(10);

        return Inertia::render('public/announcements', [
            'institution' => $setting,
            'announcements' => $announcements,
        ]);
    }

    /**
     * Halaman galeri dokumentasi & prestasi.
     */
    public function gallery(): Response
    {
        $setting = InstitutionSetting::current();

        return Inertia::render('public/gallery', [
            'institution' => $setting,
            'galleries' => Gallery::query()->latest()->paginate(12),
            'achievements' => Achievement::query()->latest()->get(),
        ]);
    }
}
