<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PpdbRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'ppdb_wave_id' => ['required', 'exists:ppdb_waves,id'],
            'jalur_pendaftaran' => ['required', 'string', 'in:reguler,prestasi,afirmasi,zonasi,perpindahan_ortu,tes'],
            'jurusan_pilihan_1' => ['nullable', 'exists:majors,id'],
            'jurusan_pilihan_2' => ['nullable', 'different:jurusan_pilihan_1', 'exists:majors,id'],
            'nisn' => ['required', 'digits:10'],
            'nik' => ['required', 'digits:16'],
            'nama_calon_siswa' => ['required', 'string', 'max:255'],
            'jenis_kelamin' => ['required', 'in:L,P'],
            'tempat_lahir' => ['required', 'string', 'max:100'],
            'tanggal_lahir' => ['required', 'date', 'before:today'],
            'agama' => ['required', 'string', 'max:50'],
            'asal_sekolah' => ['required', 'string', 'max:255'],
            'nama_wali' => ['required', 'string', 'max:255'],
            'hubungan_wali' => ['required', 'string', 'max:50'],
            'pekerjaan_wali' => ['nullable', 'string', 'max:100'],
            'nomor_whatsapp_wali' => ['required', 'string', 'max:30'],
            'alamat' => ['required', 'string', 'max:1000'],
            'berkas_kartu_keluarga' => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp,pdf', 'max:3072'],
            'berkas_akta_kelahiran' => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp,pdf', 'max:3072'],
            'berkas_ijazah_skl' => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp,pdf', 'max:3072'],
            'berkas_rapor_prestasi' => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp,pdf', 'max:3072'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'ppdb_wave_id.required' => 'Pilih gelombang pendaftaran terlebih dahulu.',
            'nisn.digits' => 'NISN harus tepat 10 digit angka.',
            'nik.digits' => 'NIK Kependudukan harus tepat 16 digit angka.',
            'nama_calon_siswa.required' => 'Nama lengkap calon siswa wajib diisi.',
            'asal_sekolah.required' => 'Nama asal sekolah SMP/MTs wajib diisi.',
            'nomor_whatsapp_wali.required' => 'Nomor WhatsApp wali wajib diisi untuk konfirmasi info seleksi.',
            'jurusan_pilihan_2.different' => 'Jurusan pilihan kedua harus berbeda dari pilihan pertama.',
        ];
    }
}
