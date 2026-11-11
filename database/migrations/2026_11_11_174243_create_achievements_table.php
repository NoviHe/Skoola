<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('judul_prestasi');
            $table->string('nama_peraih');
            $table->string('tingkat', 50)->default('Kabupaten/Kota'); // Kecamatan, Kabupaten/Kota, Provinsi, Nasional, Internasional
            $table->string('peringkat', 50)->default('Juara 1'); // Juara 1, Juara 2, Juara 3, Harapan 1, dsb
            $table->string('penyelenggara')->nullable();
            $table->string('tahun', 10);
            $table->string('foto')->nullable();
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('achievements');
    }
};
