<?php

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
        Schema::create('institution_settings', function (Blueprint $table) {
            $table->id();
            $table->string('nama_institusi')->default('SMK Negeri 1 Padaherang');
            $table->string('jenjang')->default('SMK'); // 'SD', 'MI', 'SMP', 'MTs', 'SMA', 'MA', 'SMK', 'MAK'
            $table->string('npsn')->nullable();
            $table->string('nsm')->nullable();
            $table->string('kurikulum_aktif')->default('merdeka'); // 'merdeka', 'k13', 'kombinasi'
            $table->boolean('has_jurusan')->default(true);
            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();
            $table->text('alamat')->nullable();
            $table->string('telepon')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('kepala_sekolah')->nullable();
            $table->string('nip_kepala_sekolah')->nullable();
            $table->boolean('fitur_ppdb')->default(true);
            $table->boolean('fitur_pkl')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institution_settings');
    }
};
