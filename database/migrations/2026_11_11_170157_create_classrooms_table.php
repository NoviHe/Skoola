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
        Schema::create('classrooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tahun_ajaran_id')->constrained('academic_years')->cascadeOnDelete();
            $table->foreignId('jurusan_id')->nullable()->constrained('majors')->nullOnDelete();
            $table->foreignId('guru_id')->nullable()->constrained('teachers')->nullOnDelete();
            $table->unsignedTinyInteger('tingkat')->default(10); // 1-6 (SD/MI), 7-9 (SMP/MTs), 10-12 (SMA/SMK)
            $table->string('nama_kelas');
            $table->unsignedSmallInteger('kapasitas')->default(36);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classrooms');
    }
};
