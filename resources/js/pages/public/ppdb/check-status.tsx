import PublicLayout from '@/layouts/public-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Clock,
    FileCheck,
    FileText,
    HelpCircle,
    Info,
    Printer,
    Search,
    ShieldAlert,
    UserCheck,
    XCircle,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';

interface Applicant {
    id: number;
    nomor_pendaftaran: string;
    nisn: string;
    nik: string;
    nama_calon_siswa: string;
    jenis_kelamin: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    asal_sekolah: string;
    jalur_pendaftaran: string;
    nama_wali: string;
    nomor_whatsapp_wali: string;
    status_seleksi: string;
    catatan_panitia: string | null;
    created_at: string;
    wave?: {
        nama_gelombang: string;
        kode_gelombang: string;
    };
    first_major_choice?: {
        nama_jurusan: string;
    };
    second_major_choice?: {
        nama_jurusan: string;
    };
    verified_by?: {
        name: string;
    };
}

interface CheckStatusProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
        telepon?: string;
    };
    applicant: Applicant | null;
    search: string;
    error: string | null;
}

export default function CheckStatus({
    institution,
    applicant,
    search,
    error,
}: CheckStatusProps) {
    const [keyword, setKeyword] = useState(search || '');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (!keyword.trim()) return;

        router.get('/ppdb/cek-status', {
            search: keyword.trim(),
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'diterima':
                return {
                    label: 'Diterima (Lulus Seleksi)',
                    color: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
                    icon: CheckCircle2,
                };
            case 'berkas_sesuai':
                return {
                    label: 'Berkas Sesuai (Lolos Verifikasi)',
                    color: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300',
                    icon: FileCheck,
                };
            case 'perlu_perbaikan':
                return {
                    label: 'Perlu Perbaikan Dokumen',
                    color: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300',
                    icon: AlertCircle,
                };
            case 'tidak_diterima':
                return {
                    label: 'Tidak Diterima',
                    color: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300',
                    icon: XCircle,
                };
            default:
                return {
                    label: 'Menunggu Verifikasi Berkas',
                    color: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300',
                    icon: Clock,
                };
        }
    };

    return (
        <PublicLayout>
            <Head title={`Cek Status Pendaftaran - ${institution.nama_institusi}`} />

            <div className="bg-slate-50 py-10 dark:bg-slate-950 sm:py-14">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    {/* Header */}
                    <div className="text-center">
                        <Link
                            href="/ppdb"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Kembali ke Informasi PPDB</span>
                        </Link>
                        <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                            Cek Status Seleksi PPDB Daring
                        </h1>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Masukkan Nomor Registrasi (PPDB-YYYY-XXXX), NISN, atau NIK calon siswa.
                        </p>
                    </div>

                    {/* Search Form Box */}
                    <div className="mt-8 mx-auto max-w-xl">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Contoh: PPDB-2026-0001 atau NISN"
                                    className="block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 active:scale-95"
                            >
                                <span>Cari Data</span>
                            </button>
                        </form>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-center text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
                            <AlertCircle className="mx-auto h-6 w-6 text-rose-600 mb-2" />
                            <p className="font-semibold text-sm">{error}</p>
                            <p className="mt-1 text-slate-500 dark:text-slate-400">
                                Pastikan format nomor tidak ada kesalahan ketik atau spasi ekstra.
                            </p>
                        </div>
                    )}

                    {/* Result Content */}
                    {applicant && (
                        <div className="mt-8 space-y-6">
                            {/* Card Status Utama */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6 dark:border-slate-800">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-sm font-extrabold text-blue-600 dark:text-blue-400">
                                                {applicant.nomor_pendaftaran}
                                            </span>
                                            <span className="text-slate-300 dark:text-slate-700">•</span>
                                            <span className="text-xs text-slate-500">
                                                {applicant.wave?.nama_gelombang || 'Gelombang Seleksi'}
                                            </span>
                                        </div>
                                        <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                                            {applicant.nama_calon_siswa}
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Asal Sekolah: <strong>{applicant.asal_sekolah}</strong>
                                        </p>
                                    </div>

                                    <div>
                                        {(() => {
                                            const badge = getStatusBadge(applicant.status_seleksi);
                                            const Icon = badge.icon;
                                            return (
                                                <div
                                                    className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold ${badge.color}`}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                    <span>{badge.label}</span>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>

                                {/* Banner Keterangan Status */}
                                <div className="mt-6">
                                    {applicant.status_seleksi === 'diterima' && (
                                        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
                                            <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                                                Alhamdulillah, Selamat Anda Dinyatakan LULUS Seleksi!
                                            </h4>
                                            <p className="mt-1 text-emerald-700 dark:text-emerald-300">
                                                Silakan cetak Kartu Bukti Pendaftaran di bawah ini dan bawa saat proses daftar ulang administrasi di kampus {institution.nama_institusi}.
                                            </p>
                                        </div>
                                    )}

                                    {applicant.status_seleksi === 'berkas_sesuai' && (
                                        <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200">
                                            <h4 className="font-bold text-sm text-blue-800 dark:text-blue-300">
                                                Dokumen Telah Terverifikasi Valid
                                            </h4>
                                            <p className="mt-1 text-blue-700 dark:text-blue-300">
                                                Seluruh berkas administrasi telah sesuai kriteria. Silakan menunggu sidang pleno pengumuman peringkat kelulusan akhir.
                                            </p>
                                        </div>
                                    )}

                                    {applicant.status_seleksi === 'perlu_perbaikan' && (
                                        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
                                            <h4 className="font-bold text-sm text-amber-800 dark:text-amber-300">
                                                Perhatian: Berkas Memerlukan Perbaikan
                                            </h4>
                                            <p className="mt-1 text-amber-700 dark:text-amber-300">
                                                Mohon lengkapi atau serahkan revisi dokumen sesuai arahan catatan panitia ke sekretariat PPDB.
                                            </p>
                                        </div>
                                    )}

                                    {applicant.status_seleksi === 'menunggu_verifikasi' && (
                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                                                Dalam Proses Pemeriksaan Panitia
                                            </h4>
                                            <p className="mt-1 text-slate-500">
                                                Berkas pendaftaran Anda berada dalam antrean peninjauan oleh petugas verifikator. Cek kembali secara berkala.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Catatan Panitia */}
                                {applicant.catatan_panitia && (
                                    <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-3.5 text-xs dark:border-slate-700 dark:bg-slate-900">
                                        <span className="font-bold text-slate-700 dark:text-slate-300">
                                            Catatan dari Panitia Verifikator:
                                        </span>
                                        <p className="mt-0.5 text-slate-600 italic dark:text-slate-400">
                                            &ldquo;{applicant.catatan_panitia}&rdquo;
                                        </p>
                                    </div>
                                )}

                                {/* Rincian Data Biodata */}
                                <div className="mt-6">
                                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                                        Rincian Data Pendaftar
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-950">
                                        <div>
                                            <span className="text-slate-500">NISN / NIK:</span>
                                            <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                {applicant.nisn} / {applicant.nik}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-slate-500">Jalur Pendaftaran:</span>
                                            <div className="font-semibold capitalize text-blue-600 dark:text-blue-400">
                                                {applicant.jalur_pendaftaran}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-slate-500">Tempat, Tanggal Lahir:</span>
                                            <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                {applicant.tempat_lahir}, {new Date(applicant.tanggal_lahir).toLocaleDateString('id-ID')}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-slate-500">Jenis Kelamin:</span>
                                            <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                {applicant.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                                            </div>
                                        </div>

                                        {applicant.first_major_choice && (
                                            <div>
                                                <span className="text-slate-500">Jurusan Pilihan 1:</span>
                                                <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                    {applicant.first_major_choice.nama_jurusan}
                                                </div>
                                            </div>
                                        )}

                                        {applicant.second_major_choice && (
                                            <div>
                                                <span className="text-slate-500">Jurusan Pilihan 2:</span>
                                                <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                    {applicant.second_major_choice.nama_jurusan}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <span className="text-slate-500">Wali &amp; No. WhatsApp:</span>
                                            <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                {applicant.nama_wali} ({applicant.nomor_whatsapp_wali})
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-slate-500">Tanggal Mendaftar:</span>
                                            <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                {new Date(applicant.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                                    <a
                                        href={`/ppdb/cetak/${applicant.nomor_pendaftaran}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow transition hover:bg-blue-700"
                                    >
                                        <Printer className="h-4 w-4" />
                                        <span>Cetak Kartu Bukti Pendaftaran</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
