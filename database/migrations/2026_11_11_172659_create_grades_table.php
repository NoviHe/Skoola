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
        Schema::create('grades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tahun_ajaran_id')->constrained('academic_years')->cascadeOnDelete();
            $table->foreignId('kelas_id')->constrained('classrooms')->cascadeOnDelete();
            $table->foreignId('siswa_id')->constrained('students')->cascadeOnDelete();
            $table->foreignId('mata_pelajaran_id')->constrained('subjects')->cascadeOnDelete();
            $table->string('jenis_asesmen'); // Formatif, Sumatif Lingkup Materi, Sumatif Akhir Semester
            $table->decimal('nilai', 5, 2);
            $table->text('capaian_kompetensi')->nullable();
            $table->string('catatan')->nullable();
            $table->timestamps();

            $table->index(['kelas_id', 'mata_pelajaran_id']);
            $table->index(['siswa_id', 'mata_pelajaran_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
