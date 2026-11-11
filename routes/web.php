<?php

declare(strict_types=1);

use App\Http\Controllers\PublicPortalController;
use Illuminate\Support\Facades\Route;

// Public School Portal routes
Route::get('/', [PublicPortalController::class, 'home'])->name('home');
Route::get('/profil', [PublicPortalController::class, 'profile'])->name('public.profile');
Route::get('/berita', [PublicPortalController::class, 'articles'])->name('public.articles');
Route::get('/berita/{slug}', [PublicPortalController::class, 'articleDetail'])->name('public.article.detail');
Route::get('/pengumuman', [PublicPortalController::class, 'announcements'])->name('public.announcements');
Route::get('/galeri', [PublicPortalController::class, 'gallery'])->name('public.gallery');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
