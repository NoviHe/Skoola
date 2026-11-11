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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('nip', 30)->nullable()->index();
            $table->string('nuptk', 30)->nullable()->index();
            $table->string('npk', 30)->nullable()->index();
            $table->string('nama_lengkap');
            $table->string('gelar_depan', 20)->nullable();
            $table->string('gelar_belakang', 30)->nullable();
            $table->enum('jenis_kelamin', ['L', 'P'])->default('L');
            $table->string('bidang_studi_utama')->nullable();
            $table->string('telepon', 30)->nullable();
            $table->text('alamat')->nullable();
            $table->string('foto')->nullable();
            $table->string('status_kepegawaian', 30)->default('PNS'); // PNS, PPPK, GTT, GTY, Honorer
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
