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
        Schema::create('ppdb_applicants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ppdb_wave_id')->constrained('ppdb_waves')->cascadeOnDelete();
            $table->string('nomor_pendaftaran', 50)->unique()->index();
            $table->string('nisn', 10)->index();
            $table->string('nik', 16)->index();
            $table->string('nama_calon_siswa');
            $table->enum('jenis_kelamin', ['L', 'P'])->default('L');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('agama', 30)->default('Islam');
            $table->string('asal_sekolah');
            $table->foreignId('jurusan_pilihan_1')->nullable()->constrained('majors')->nullOnDelete();
            $table->foreignId('jurusan_pilihan_2')->nullable()->constrained('majors')->nullOnDelete();
            $table->string('jalur_pendaftaran', 30)->default('reguler'); // 'zonasi', 'afirmasi', 'prestasi', 'perpindahan_ortu', 'reguler', 'tes'
            $table->string('nama_wali');
            $table->string('hubungan_wali', 50)->default('Orang Tua');
            $table->string('pekerjaan_wali')->nullable();
            $table->string('nomor_whatsapp_wali', 30);
            $table->text('alamat');
            $table->string('berkas_kartu_keluarga')->nullable();
            $table->string('berkas_akta_kelahiran')->nullable();
            $table->string('berkas_ijazah_skl')->nullable();
            $table->string('berkas_rapor_prestasi')->nullable();
            $table->string('status_seleksi', 30)->default('menunggu_verifikasi'); // 'menunggu_verifikasi', 'berkas_sesuai', 'perlu_perbaikan', 'diterima', 'tidak_diterima'
            $table->text('catatan_panitia')->nullable();
            $table->foreignId('diverifikasi_oleh')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('diverifikasi_pada')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppdb_applicants');
    }
};
