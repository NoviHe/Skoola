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
        Schema::create('ppdb_waves', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tahun_ajaran_id')->nullable()->constrained('academic_years')->nullOnDelete();
            $table->string('nama_gelombang');
            $table->string('kode_gelombang', 50)->nullable()->unique();
            $table->date('tanggal_buka');
            $table->date('tanggal_tutup');
            $table->unsignedInteger('kuota')->nullable();
            $table->text('deskripsi')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppdb_waves');
    }
};
