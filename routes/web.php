<?php

declare(strict_types=1);

use App\Http\Controllers\PpdbController;
use App\Http\Controllers\PublicPortalController;
use Illuminate\Support\Facades\Route;

// Public School Portal routes
Route::get('/', [PublicPortalController::class, 'home'])->name('home');
Route::get('/profil', [PublicPortalController::class, 'profile'])->name('public.profile');
Route::get('/berita', [PublicPortalController::class, 'articles'])->name('public.articles');
Route::get('/berita/{slug}', [PublicPortalController::class, 'articleDetail'])->name('public.article.detail');
Route::get('/pengumuman', [PublicPortalController::class, 'announcements'])->name('public.announcements');
Route::get('/galeri', [PublicPortalController::class, 'gallery'])->name('public.gallery');

// PPDB Daring Multi-Jalur routes
Route::prefix('ppdb')->name('ppdb.')->group(function () {
    Route::get('/', [PpdbController::class, 'index'])->name('index');
    Route::get('/daftar', [PpdbController::class, 'create'])->name('register');
    Route::post('/daftar', [PpdbController::class, 'register'])->name('register.store');
    Route::get('/sukses/{nomor}', [PpdbController::class, 'success'])->name('success');
    Route::match(['get', 'post'], '/cek-status', [PpdbController::class, 'checkStatus'])->name('check-status');
    Route::get('/cetak/{nomor}', [PpdbController::class, 'print'])->name('print');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
