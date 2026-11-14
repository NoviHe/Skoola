<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\PpdbRegisterRequest;
use App\Models\InstitutionSetting;
use App\Models\Major;
use App\Models\PpdbApplicant;
use App\Models\PpdbWave;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PpdbController extends Controller
{
    /**
     * Beranda informasi PPDB Daring (jadwal gelombang, syarat, alur).
     */
    public function index(): Response
    {
        $setting = InstitutionSetting::current();

        $waves = PpdbWave::query()
            ->with('academicYear')
            ->withCount('applicants')
            ->where('is_active', true)
            ->orderBy('tanggal_buka')
            ->get();

        $openWave = $waves->first(fn (PpdbWave $w) => $w->isOpen());

        $majors = $setting->hasMajors()
            ? Major::query()->where('is_active', true)->get()
            : [];

        $stats = [
            'total_applicants' => PpdbApplicant::query()->count(),
            'total_verified' => PpdbApplicant::query()->whereIn('status_seleksi', ['berkas_sesuai', 'diterima'])->count(),
            'total_waves' => $waves->count(),
        ];

        return Inertia::render('public/ppdb/index', [
            'institution' => $setting,
            'waves' => $waves,
            'openWave' => $openWave,
            'majors' => $majors,
            'stats' => $stats,
        ]);
    }

    /**
     * Formulir pendaftaran multi-step PPDB Daring.
     */
    public function create(Request $request): Response|RedirectResponse
    {
        $setting = InstitutionSetting::current();

        $waves = PpdbWave::query()
            ->with('academicYear')
            ->where('is_active', true)
            ->orderBy('tanggal_buka')
            ->get();

        $selectedWaveId = (int) $request->query('gelombang', 0);

        if ($selectedWaveId === 0) {
            $openWave = $waves->first(fn (PpdbWave $w) => $w->isOpen());
            $selectedWaveId = $openWave?->id ?? $waves->first()?->id ?? 0;
        }

        $majors = $setting->hasMajors()
            ? Major::query()->where('is_active', true)->get()
            : [];

        return Inertia::render('public/ppdb/register', [
            'institution' => $setting,
            'waves' => $waves,
            'selectedWaveId' => $selectedWaveId,
            'majors' => $majors,
            'hasMajors' => $setting->hasMajors(),
        ]);
    }

    /**
     * Proses penyimpanan pendaftaran calon siswa baru.
     */
    public function register(PpdbRegisterRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $documentFields = [
            'berkas_kartu_keluarga',
            'berkas_akta_kelahiran',
            'berkas_ijazah_skl',
            'berkas_rapor_prestasi',
        ];

        $uploadedPaths = [];

        foreach ($documentFields as $field) {
            if ($request->hasFile($field)) {
                $path = $request->file($field)->store('ppdb-documents', 'public');
                $uploadedPaths[$field] = $path;
            } else {
                $uploadedPaths[$field] = null;
            }
        }

        $nomorPendaftaran = PpdbApplicant::generateNomorPendaftaran();

        $applicant = PpdbApplicant::create([
            'ppdb_wave_id' => $validated['ppdb_wave_id'],
            'nomor_pendaftaran' => $nomorPendaftaran,
            'nisn' => $validated['nisn'],
            'nik' => $validated['nik'],
            'nama_calon_siswa' => $validated['nama_calon_siswa'],
            'jenis_kelamin' => $validated['jenis_kelamin'],
            'tempat_lahir' => $validated['tempat_lahir'],
            'tanggal_lahir' => $validated['tanggal_lahir'],
            'agama' => $validated['agama'],
            'asal_sekolah' => $validated['asal_sekolah'],
            'jurusan_pilihan_1' => $validated['jurusan_pilihan_1'] ?? null,
            'jurusan_pilihan_2' => $validated['jurusan_pilihan_2'] ?? null,
            'jalur_pendaftaran' => $validated['jalur_pendaftaran'],
            'nama_wali' => $validated['nama_wali'],
            'hubungan_wali' => $validated['hubungan_wali'],
            'pekerjaan_wali' => $validated['pekerjaan_wali'] ?? null,
            'nomor_whatsapp_wali' => $validated['nomor_whatsapp_wali'],
            'alamat' => $validated['alamat'],
            'berkas_kartu_keluarga' => $uploadedPaths['berkas_kartu_keluarga'],
            'berkas_akta_kelahiran' => $uploadedPaths['berkas_akta_kelahiran'],
            'berkas_ijazah_skl' => $uploadedPaths['berkas_ijazah_skl'],
            'berkas_rapor_prestasi' => $uploadedPaths['berkas_rapor_prestasi'],
            'status_seleksi' => 'menunggu_verifikasi',
        ]);

        return redirect()->route('ppdb.success', ['nomor' => $applicant->nomor_pendaftaran])
            ->with('success', 'Pendaftaran berhasil dikirim. Simpan Nomor Registrasi Anda!');
    }

    /**
     * Halaman bukti konfirmasi berhasil daftar.
     */
    public function success(string $nomor): Response
    {
        $setting = InstitutionSetting::current();

        $applicant = PpdbApplicant::query()
            ->with(['wave', 'firstMajorChoice', 'secondMajorChoice'])
            ->where('nomor_pendaftaran', $nomor)
            ->firstOrFail();

        return Inertia::render('public/ppdb/success', [
            'institution' => $setting,
            'applicant' => $applicant,
        ]);
    }

    /**
     * Halaman cek status verifikasi & seleksi mandiri.
     */
    public function checkStatus(Request $request): Response
    {
        $setting = InstitutionSetting::current();
        $query = trim((string) $request->input('search', ''));
        $applicant = null;
        $error = null;

        if ($query !== '') {
            $applicant = PpdbApplicant::query()
                ->with(['wave', 'firstMajorChoice', 'secondMajorChoice', 'verifiedBy'])
                ->where('nomor_pendaftaran', $query)
                ->orWhere('nisn', $query)
                ->orWhere('nik', $query)
                ->first();

            if (! $applicant) {
                $error = 'Data pendaftaran dengan Nomor Registrasi / NISN / NIK "'.$query.'" tidak ditemukan. Pastikan nomor yang dimasukkan tepat.';
            }
        }

        return Inertia::render('public/ppdb/check-status', [
            'institution' => $setting,
            'applicant' => $applicant,
            'search' => $query,
            'error' => $error,
        ]);
    }

    /**
     * Kartu tanda bukti pendaftaran resmi siap cetak (PDF / Print View).
     */
    public function print(string $nomor): Response
    {
        $setting = InstitutionSetting::current();

        $applicant = PpdbApplicant::query()
            ->with(['wave.academicYear', 'firstMajorChoice', 'secondMajorChoice'])
            ->where('nomor_pendaftaran', $nomor)
            ->firstOrFail();

        return Inertia::render('public/ppdb/print', [
            'institution' => $setting,
            'applicant' => $applicant,
        ]);
    }
}
