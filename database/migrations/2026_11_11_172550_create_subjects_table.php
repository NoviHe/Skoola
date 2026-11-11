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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('kode_mapel', 30)->unique();
            $table->string('nama_mapel');
            $table->string('kelompok')->default('Nasional'); // Nasional, Kemenag, Peminatan, Kejuruan, Muatan Lokal
            $table->foreignId('jurusan_id')->nullable()->constrained('majors')->nullOnDelete();
            $table->unsignedTinyInteger('kkm')->default(75);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
