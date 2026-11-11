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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tahun_ajaran_id')->constrained('academic_years')->cascadeOnDelete();
            $table->foreignId('kelas_id')->constrained('classrooms')->cascadeOnDelete();
            $table->foreignId('siswa_id')->constrained('students')->cascadeOnDelete();
            $table->date('tanggal');
            $table->string('status', 20)->default('hadir'); // hadir, sakit, izin, alpa
            $table->string('catatan')->nullable();
            $table->timestamps();

            $table->unique(['kelas_id', 'siswa_id', 'tanggal']);
            $table->index(['tanggal', 'kelas_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
