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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tahun_ajaran_id')->constrained('academic_years')->cascadeOnDelete();
            $table->foreignId('kelas_id')->constrained('classrooms')->cascadeOnDelete();
            $table->foreignId('mata_pelajaran_id')->constrained('subjects')->cascadeOnDelete();
            $table->foreignId('guru_id')->constrained('teachers')->cascadeOnDelete();
            $table->string('hari'); // Senin, Selasa, Rabu, Kamis, Jumat, Sabtu
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->string('ruangan')->nullable();
            $table->timestamps();

            $table->index(['kelas_id', 'hari']);
            $table->index(['guru_id', 'hari']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
