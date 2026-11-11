<?php

declare(strict_types=1);

use App\Models\AcademicYear;
use App\Models\InstitutionSetting;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'institution' => InstitutionSetting::current(),
            'activeAcademicYear' => AcademicYear::current(),
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
