import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    Calendar,
    CheckCircle2,
    FileCheck,
    FileText,
    HelpCircle,
    Info,
    Search,
    ShieldAlert,
    Sparkles,
    UserCheck,
    Users,
} from 'lucide-react';

interface Wave {
    id: number;
    nama_gelombang: string;
    kode_gelombang: string;
    tanggal_buka: string;
    tanggal_tutup: string;
    kuota: number | null;
    deskripsi: string | null;
    is_active: boolean;
    applicants_count: number;
    academic_year?: {
        tahun: string;
        semester: string;
    };
}

interface Major {
    id: number;
    nama_jurusan: string;
    singkatan: string;
    deskripsi?: string;
}

interface PpdbIndexProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
        telepon?: string;
        email?: string;
        alamat?: string;
    };
    waves: Wave[];
    openWave: Wave | null;
    majors: Major[];
    stats: {
        total_applicants: number;
        total_verified: number;
        total_waves: number;
    };
}

export default function PpdbIndex({
    institution,
    waves,
    openWave,
    majors,
    stats,
}: PpdbIndexProps) {
    const isWaveOpen = (w: Wave) => {
        if (!w.is_active) return false;
        const now = new Date();
        const start = new Date(w.tanggal_buka);
        const end = new Date(w.tanggal_tutup);
        end.setHours(23, 59, 59);
        return now >= start && now <= end;
    };

    const isUpcoming = (w: Wave) => {
        if (!w.is_active) return false;
        const now = new Date();
        const start = new Date(w.tanggal_buka);
        return now < start;
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <PublicLayout>
            <Head title={`PPDB Daring - ${institution.nama_institusi}`} />

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50/60 via-white to-white py-16 dark:border-slate-800 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-950 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/80 px-3.5 py-1 text-xs font-bold text-blue-800 shadow-sm dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Penerimaan Peserta Didik Baru Daring</span>
                        </div>

                        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                            Selamat Datang di Portal PPDB{' '}
                            <span className="text-blue-600 dark:text-blue-400">
                                {institution.nama_institusi}
                            </span>
                        </h1>

                        <p className="mt-4 text-base text-slate-600 sm:text-lg dark:text-slate-400">
                            Pendaftaran siswa baru kini lebih mudah, transparan,
                            dan terintegrasi secara daring dari mana saja tanpa
                            perlu antre manual.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/ppdb/daftar"
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 active:scale-95"
                            >
                                <span>Isi Formulir Pendaftaran</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/ppdb/cek-status"
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                            >
                                <Search className="h-4 w-4 text-slate-500" />
                                <span>Cek Status Pendaftaran</span>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                    {stats.total_applicants}
                                </div>
                                <div className="text-xs font-semibold text-slate-500">
                                    Total Calon Siswa Terdaftar
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                <UserCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                    {stats.total_verified}
                                </div>
                                <div className="text-xs font-semibold text-slate-500">
                                    Berkas Lolos Verifikasi
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                    {stats.total_waves}
                                </div>
                                <div className="text-xs font-semibold text-slate-500">
                                    Gelombang Seleksi Dibuka
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Jadwal Gelombang Pendaftaran */}
            <section className="py-14">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                Agenda Seleksi
                            </span>
                            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Gelombang &amp; Jadwal Pendaftaran
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                Pastikan Anda mendaftar pada rentang tanggal
                                jadwal yang aktif.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {waves.length > 0 ? (
                            waves.map((wave) => {
                                const open = isWaveOpen(wave);
                                const upcoming = isUpcoming(wave);

                                return (
                                    <div
                                        key={wave.id}
                                        className={`relative flex flex-col justify-between rounded-2xl border p-6 transition ${
                                            open
                                                ? 'border-blue-500 bg-blue-50/20 shadow-md ring-1 ring-blue-500 dark:bg-blue-950/20'
                                                : 'border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                    {wave.kode_gelombang ||
                                                        'GELOMBANG'}
                                                </span>

                                                {open ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        Pendaftaran Dibuka
                                                    </span>
                                                ) : upcoming ? (
                                                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                                        Segera Dibuka
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-slate-800">
                                                        Ditutup
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                                                {wave.nama_gelombang}
                                            </h3>

                                            {wave.academic_year && (
                                                <div className="mt-1 text-xs text-slate-500">
                                                    Tahun Ajaran{' '}
                                                    {wave.academic_year.tahun} (
                                                    {
                                                        wave.academic_year
                                                            .semester
                                                    }
                                                    )
                                                </div>
                                            )}

                                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                                                {wave.deskripsi ||
                                                    'Pendaftaran dibuka untuk calon siswa yang memenuhi syarat kriteria penerimaan.'}
                                            </p>

                                            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-950">
                                                <div>
                                                    <span className="text-slate-500">
                                                        Mulai Pendaftaran:
                                                    </span>
                                                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                        {formatDate(
                                                            wave.tanggal_buka
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500">
                                                        Batas Penutupan:
                                                    </span>
                                                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                        {formatDate(
                                                            wave.tanggal_tutup
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                                            <div className="text-xs text-slate-500">
                                                Daya tampung:{' '}
                                                <strong className="text-slate-800 dark:text-slate-200">
                                                    {wave.kuota
                                                        ? `${wave.kuota} Siswa`
                                                        : 'Sesuai Kuota Rombel'}
                                                </strong>
                                            </div>

                                            {open ? (
                                                <Link
                                                    href={`/ppdb/daftar?gelombang=${wave.id}`}
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                                                >
                                                    <span>Daftar Sekarang</span>
                                                    <ArrowRight className="h-3.5 w-3.5" />
                                                </Link>
                                            ) : (
                                                <span className="text-xs font-semibold text-slate-400">
                                                    Pendaftaran Belum Aktif
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-2 rounded-2xl border border-slate-200 p-8 text-center text-slate-500 dark:border-slate-800">
                                Belum ada gelombang pendaftaran yang
                                ditambahkan.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Jalur Pendaftaran & Persyaratan */}
            <section className="border-y border-slate-200 bg-slate-50 py-14 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Kategori Seleksi
                        </span>
                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Pilihan Jalur Masuk Pendaftaran
                        </h2>
                        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                            Calon peserta didik dapat memilih jalur pendaftaran
                            sesuai kondisi dan pencapaian masing-masing.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                <Award className="h-5 w-5" />
                            </div>
                            <h3 className="mt-3 font-bold text-slate-900 dark:text-white">
                                Jalur Prestasi
                            </h3>
                            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                                Diperuntukkan bagi siswa berprestasi akademik
                                (nilai rapor) maupun non-akademik (olahraga,
                                seni, sains, keagamaan).
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <h3 className="mt-3 font-bold text-slate-900 dark:text-white">
                                Jalur Afirmasi
                            </h3>
                            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                                Kesempatan khusus bagi calon peserta didik dari
                                keluarga ekonomi prasejahtera pemegang KIP / PKH
                                / KPS.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                <Users className="h-5 w-5" />
                            </div>
                            <h3 className="mt-3 font-bold text-slate-900 dark:text-white">
                                Jalur Zonasi
                            </h3>
                            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                                Mengutamakan kedekatan domisili alamat calon
                                siswa dengan lokasi satuan pendidikan sesuai
                                data Kartu Keluarga.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                                <FileText className="h-5 w-5" />
                            </div>
                            <h3 className="mt-3 font-bold text-slate-900 dark:text-white">
                                Jalur Reguler &amp; Tes
                            </h3>
                            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                                Terbuka untuk seluruh calon siswa dengan seleksi
                                tes bakat minat, skolastik, dan wawancara calon
                                peserta didik.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dokumen & Alur Pendaftaran */}
            <section className="py-14">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Dokumen Berkas */}
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                Syarat Administrasi
                            </span>
                            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Dokumen yang Perlu Disiapkan
                            </h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Siapkan foto atau pindaian (scan) berkas dalam
                                format JPG/PNG atau PDF (maksimal 3MB per file):
                            </p>

                            <div className="mt-6 space-y-3.5">
                                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                        <FileCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            1. Kartu Keluarga (KK)
                                        </h4>
                                        <p className="text-xs text-slate-500">
                                            Kartu keluarga asli atau legalisir
                                            yang masih berlaku untuk verifikasi
                                            data NIK dan domisili.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                        <FileCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            2. Akta Kelahiran
                                        </h4>
                                        <p className="text-xs text-slate-500">
                                            Akta kelahiran resmi calon siswa
                                            untuk pencocokan tanggal dan tempat
                                            lahir.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                        <FileCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            3. Ijazah / SKL (Surat Keterangan
                                            Lulus)
                                        </h4>
                                        <p className="text-xs text-slate-500">
                                            Ijazah jenjang sebelumnya atau Surat
                                            Keterangan Lulus resmi bercap dari
                                            sekolah asal.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                        <FileCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            4. Sertifikat Prestasi / Rapor
                                            (Opsional)
                                        </h4>
                                        <p className="text-xs text-slate-500">
                                            Khusus jalur prestasi, lampirkan
                                            sertifikat juara atau transkrip
                                            nilai rapor semester 1-5.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Alur Tahapan */}
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                Panduan Pendaftar
                            </span>
                            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                4 Langkah Mudah Mendaftar
                            </h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Ikuti prosedur alur penerimaan daring berikut
                                hingga pengumuman kelulusan:
                            </p>

                            <div className="mt-6 space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            Pengisian Formulir Daring
                                        </h4>
                                        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                                            Lengkapi biodata calon siswa, NISN,
                                            NIK, data orang tua/wali, serta
                                            unggah berkas scan pendukung secara
                                            lengkap.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            Verifikasi Berkas oleh Panitia
                                        </h4>
                                        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                                            Panitia PPDB memeriksa kelayakan dan
                                            keabsahan dokumen yang diunggah.
                                            Status verifikasi dapat dipantau
                                            secara mandiri.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            Pengumuman Hasil Seleksi
                                        </h4>
                                        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                                            Hasil seleksi diumumkan secara resmi
                                            melalui portal PPDB. Calon siswa
                                            dapat mengunduh bukti pendaftaran.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
                                        4
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            Daftar Ulang &amp; Registrasi Akhir
                                        </h4>
                                        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                                            Calon siswa yang dinyatakan diterima
                                            melakukan konfirmasi daftar ulang
                                            dan penyerahan berkas fisik asli ke
                                            sekolah.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-md">
                                <h4 className="font-bold text-base">
                                    Butuh Bantuan Pendaftaran?
                                </h4>
                                <p className="mt-1 text-xs text-blue-100">
                                    Tim panitia sekretariat PPDB siap membantu
                                    kendala teknis Anda.
                                </p>
                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    {institution.telepon && (
                                        <span className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                                            Telp: {institution.telepon}
                                        </span>
                                    )}
                                    {institution.email && (
                                        <span className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                                            Email: {institution.email}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
