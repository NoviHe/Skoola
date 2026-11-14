import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Check,
    CheckCircle2,
    Copy,
    FileText,
    Home,
    Printer,
    Search,
    ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';

interface SuccessProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
    };
    applicant: {
        nomor_pendaftaran: string;
        nama_calon_siswa: string;
        nisn: string;
        asal_sekolah: string;
        jalur_pendaftaran: string;
        created_at: string;
        wave?: {
            nama_gelombang: string;
        };
        first_major_choice?: {
            nama_jurusan: string;
        };
    };
}

export default function Success({ institution, applicant }: SuccessProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(applicant.nomor_pendaftaran);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <PublicLayout>
            <Head
                title={`Pendaftaran Berhasil - ${applicant.nomor_pendaftaran}`}
            />

            <div className="bg-slate-50 py-12 dark:bg-slate-950 sm:py-16">
                <div className="mx-auto max-w-2xl px-4 sm:px-6">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
                        {/* Success Icon */}
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm dark:bg-emerald-950 dark:text-emerald-400">
                            <CheckCircle2 className="h-9 w-9" />
                        </div>

                        <span className="mt-5 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                            Pendaftaran Berhasil Terkirim
                        </span>

                        <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                            Selamat, Data Pendaftaran Anda Diterima!
                        </h1>

                        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                            Formulir pendaftaran calon peserta didik baru{' '}
                            <strong>{institution.nama_institusi}</strong> telah
                            berhasil masuk ke sistem database.
                        </p>

                        {/* Registration Number Highlight Card */}
                        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 dark:border-blue-900/60 dark:bg-blue-950/40">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                                Nomor Registrasi Pendaftaran Anda
                            </div>
                            <div className="mt-1 flex items-center justify-center gap-3">
                                <span className="font-mono text-2xl font-extrabold tracking-wider text-slate-900 sm:text-3xl dark:text-white">
                                    {applicant.nomor_pendaftaran}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="inline-flex items-center gap-1 rounded-lg border border-blue-300 bg-white px-2.5 py-1.5 text-xs font-bold text-blue-700 shadow-sm hover:bg-blue-50 dark:border-blue-800 dark:bg-slate-800 dark:text-blue-300"
                                    title="Salin Nomor Pendaftaran"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                                            <span>Tersalin</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3.5 w-3.5" />
                                            <span>Salin</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="mt-2 text-[11px] text-blue-600 dark:text-blue-400">
                                Harap simpan dan catat nomor ini untuk mengecek
                                status verifikasi berkas dan pengumuman seleksi.
                            </p>
                        </div>

                        {/* Identity Summary Box */}
                        <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50 p-4 text-left text-xs dark:border-slate-800 dark:bg-slate-950">
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                <div>
                                    <span className="text-slate-500">
                                        Nama Calon Siswa:
                                    </span>
                                    <div className="font-bold text-slate-800 dark:text-slate-200">
                                        {applicant.nama_calon_siswa}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-slate-500">
                                        NISN:
                                    </span>
                                    <div className="font-bold text-slate-800 dark:text-slate-200">
                                        {applicant.nisn}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-slate-500">
                                        Asal Sekolah:
                                    </span>
                                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                                        {applicant.asal_sekolah}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-slate-500">
                                        Jalur / Gelombang:
                                    </span>
                                    <div className="font-semibold capitalize text-blue-600 dark:text-blue-400">
                                        {applicant.jalur_pendaftaran} (
                                        {applicant.wave?.nama_gelombang ||
                                            'Reguler'}
                                        )
                                    </div>
                                </div>
                                {applicant.first_major_choice && (
                                    <div className="sm:col-span-2">
                                        <span className="text-slate-500">
                                            Pilihan Jurusan:
                                        </span>
                                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                                            {
                                                applicant.first_major_choice
                                                    .nama_jurusan
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action CTA Buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <a
                                href={`/ppdb/cetak/${applicant.nomor_pendaftaran}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700"
                            >
                                <Printer className="h-4 w-4" />
                                <span>Cetak Bukti Pendaftaran</span>
                            </a>

                            <Link
                                href={`/ppdb/cek-status?search=${applicant.nomor_pendaftaran}`}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                            >
                                <Search className="h-4 w-4 text-slate-500" />
                                <span>Cek Status Seleksi</span>
                            </Link>
                        </div>

                        <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                            >
                                <Home className="h-3.5 w-3.5" />
                                <span>Kembali ke Beranda Utama</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
