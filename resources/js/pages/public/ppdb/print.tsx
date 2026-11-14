import { Head } from '@inertiajs/react';
import { ArrowLeft, CheckSquare, Printer, Square } from 'lucide-react';
import { useEffect } from 'react';

interface PrintProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
        npsn?: string;
        nsm?: string;
        alamat?: string;
        telepon?: string;
        email?: string;
        website?: string;
        kepala_sekolah?: string;
    };
    applicant: {
        nomor_pendaftaran: string;
        nisn: string;
        nik: string;
        nama_calon_siswa: string;
        jenis_kelamin: string;
        tempat_lahir: string;
        tanggal_lahir: string;
        agama: string;
        asal_sekolah: string;
        jalur_pendaftaran: string;
        nama_wali: string;
        hubungan_wali: string;
        nomor_whatsapp_wali: string;
        alamat: string;
        status_seleksi: string;
        created_at: string;
        berkas_kartu_keluarga: string | null;
        berkas_akta_kelahiran: string | null;
        berkas_ijazah_skl: string | null;
        berkas_rapor_prestasi: string | null;
        wave?: {
            nama_gelombang: string;
            kode_gelombang: string;
            academic_year?: {
                tahun: string;
            };
        };
        first_major_choice?: {
            nama_jurusan: string;
        };
        second_major_choice?: {
            nama_jurusan: string;
        };
    };
}

export default function PrintPpdb({ institution, applicant }: PrintProps) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-900 antialiased print:bg-white print:text-black">
            <Head
                title={`Cetak Bukti Pendaftaran - ${applicant.nomor_pendaftaran}`}
            />

            {/* Non-printable Action Bar */}
            <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur print:hidden">
                <div className="mx-auto flex max-w-4xl items-center justify-between">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Kembali</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 hidden sm:inline">
                            Gunakan ukuran kertas A4, margin default/standard.
                        </span>
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-blue-700"
                        >
                            <Printer className="h-4 w-4" />
                            <span>Cetak Sekarang (Print / PDF)</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* A4 Document Wrapper */}
            <main className="mx-auto max-w-4xl p-4 sm:p-8 print:p-0">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12 print:border-none print:p-0 print:shadow-none">
                    {/* Kop Surat Resmi */}
                    <div className="border-b-4 border-double border-slate-900 pb-4 text-center">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                            Pemerintah Daerah Provinsi Jawa Barat / Dinas
                            Pendidikan
                        </div>
                        <h1 className="text-xl font-extrabold tracking-tight uppercase sm:text-2xl text-slate-900">
                            {institution.nama_institusi}
                        </h1>
                        <p className="mt-1 text-xs text-slate-600">
                            {institution.alamat || 'Alamat Lembaga Pendidikan'}
                            {institution.telepon &&
                                ` • Telp: ${institution.telepon}`}
                            {institution.email && ` • Email: ${institution.email}`}
                        </p>
                        <div className="mt-1 flex justify-center gap-4 text-[11px] font-semibold text-slate-500">
                            {institution.npsn && (
                                <span>NPSN: {institution.npsn}</span>
                            )}
                            {institution.nsm && (
                                <span>NSM: {institution.nsm}</span>
                            )}
                            <span>
                                Akreditasi A • Sistem PPDB Daring Terpadu
                            </span>
                        </div>
                    </div>

                    {/* Judul Dokumen */}
                    <div className="mt-6 text-center">
                        <h2 className="text-base font-extrabold uppercase tracking-wide underline underline-offset-4 sm:text-lg">
                            KARTU TANDA BUKTI PENDAFTARAN PPDB DARING
                        </h2>
                        <div className="mt-1 text-xs font-bold text-slate-600">
                            TAHUN AJARAN{' '}
                            {applicant.wave?.academic_year?.tahun || '2026/2027'}
                        </div>
                    </div>

                    {/* Barcode & Nomor Registrasi Box */}
                    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border-2 border-slate-900 p-4 sm:flex-row print:border-black">
                        <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                Nomor Pendaftaran Resmi
                            </div>
                            <div className="font-mono text-2xl font-black tracking-wider text-slate-900">
                                {applicant.nomor_pendaftaran}
                            </div>
                            <div className="text-[11px] text-slate-600">
                                Gelombang:{' '}
                                <strong>
                                    {applicant.wave?.nama_gelombang}
                                </strong>
                            </div>
                        </div>

                        {/* Visual Barcode Representation */}
                        <div className="text-center sm:text-right">
                            <div className="inline-block rounded border border-slate-300 bg-slate-50 px-4 py-2 font-mono text-[10px] tracking-[0.25em] text-slate-800">
                                ||| | |||| || ||| ||||| ||| | |||
                            </div>
                            <div className="mt-0.5 text-[9px] text-slate-400">
                                TERVERIFIKASI SISTEM DIGITAL
                            </div>
                        </div>
                    </div>

                    {/* Rincian Identitas Calon Siswa */}
                    <div className="mt-6 space-y-3">
                        <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-700">
                            A. Identitas Calon Peserta Didik
                        </h3>

                        <table className="w-full text-xs">
                            <tbody>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="w-48 py-1.5 font-semibold text-slate-600">
                                        Nama Lengkap
                                    </td>
                                    <td className="w-4">:</td>
                                    <td className="py-1.5 font-bold text-slate-900">
                                        {applicant.nama_calon_siswa}
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="py-1.5 font-semibold text-slate-600">
                                        NISN (Nomor Induk Siswa Nasional)
                                    </td>
                                    <td>:</td>
                                    <td className="py-1.5 font-bold font-mono">
                                        {applicant.nisn}
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="py-1.5 font-semibold text-slate-600">
                                        NIK Kependudukan
                                    </td>
                                    <td>:</td>
                                    <td className="py-1.5 font-mono">
                                        {applicant.nik}
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="py-1.5 font-semibold text-slate-600">
                                        Jenis Kelamin
                                    </td>
                                    <td>:</td>
                                    <td className="py-1.5">
                                        {applicant.jenis_kelamin === 'L'
                                            ? 'Laki-laki'
                                            : 'Perempuan'}
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="py-1.5 font-semibold text-slate-600">
                                        Tempat, Tanggal Lahir
                                    </td>
                                    <td>:</td>
                                    <td className="py-1.5">
                                        {applicant.tempat_lahir},{' '}
                                        {new Date(
                                            applicant.tanggal_lahir
                                        ).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="py-1.5 font-semibold text-slate-600">
                                        Agama
                                    </td>
                                    <td>:</td>
                                    <td className="py-1.5">{applicant.agama}</td>
                                </tr>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="py-1.5 font-semibold text-slate-600">
                                        Asal Sekolah (SMP / MTs)
                                    </td>
                                    <td>:</td>
                                    <td className="py-1.5 font-semibold">
                                        {applicant.asal_sekolah}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Rincian Pilihan & Jalur */}
                    <div className="mt-6 space-y-3">
                        <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-700">
                            B. Jalur Pendaftaran &amp; Pilihan Jurusan
                        </h3>

                        <table className="w-full text-xs">
                            <tbody>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="w-48 py-1.5 font-semibold text-slate-600">
                                        Jalur Penerimaan
                                    </td>
                                    <td className="w-4">:</td>
                                    <td className="py-1.5 font-bold uppercase text-blue-800 print:text-black">
                                        JALUR {applicant.jalur_pendaftaran}
                                    </td>
                                </tr>
                                {applicant.first_major_choice && (
                                    <tr className="border-b border-slate-100 py-1.5">
                                        <td className="py-1.5 font-semibold text-slate-600">
                                            Pilihan Kompetensi Keahlian 1
                                        </td>
                                        <td>:</td>
                                        <td className="py-1.5 font-bold">
                                            {
                                                applicant.first_major_choice
                                                    .nama_jurusan
                                            }
                                        </td>
                                    </tr>
                                )}
                                {applicant.second_major_choice && (
                                    <tr className="border-b border-slate-100 py-1.5">
                                        <td className="py-1.5 font-semibold text-slate-600">
                                            Pilihan Kompetensi Keahlian 2
                                        </td>
                                        <td>:</td>
                                        <td className="py-1.5">
                                            {
                                                applicant.second_major_choice
                                                    .nama_jurusan
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Rincian Orang Tua / Wali */}
                    <div className="mt-6 space-y-3">
                        <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-700">
                            C. Data Orang Tua / Wali
                        </h3>

                        <table className="w-full text-xs">
                            <tbody>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="w-48 py-1.5 font-semibold text-slate-600">
                                        Nama Orang Tua / Wali
                                    </td>
                                    <td className="w-4">:</td>
                                    <td className="py-1.5 font-semibold">
                                        {applicant.nama_wali} (
                                        {applicant.hubungan_wali})
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="py-1.5 font-semibold text-slate-600">
                                        Nomor WhatsApp Aktif
                                    </td>
                                    <td>:</td>
                                    <td className="py-1.5 font-mono">
                                        {applicant.nomor_whatsapp_wali}
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 py-1.5">
                                    <td className="py-1.5 font-semibold text-slate-600">
                                        Alamat Tempat Tinggal
                                    </td>
                                    <td>:</td>
                                    <td className="py-1.5">{applicant.alamat}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Checklist Berkas */}
                    <div className="mt-6 space-y-2">
                        <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-700">
                            D. Ceklis Lampiran Berkas Daring
                        </h3>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-2">
                                {applicant.berkas_kartu_keluarga ? (
                                    <CheckSquare className="h-4 w-4 text-emerald-600 print:text-black" />
                                ) : (
                                    <Square className="h-4 w-4 text-slate-400" />
                                )}
                                <span>Kartu Keluarga (KK)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {applicant.berkas_akta_kelahiran ? (
                                    <CheckSquare className="h-4 w-4 text-emerald-600 print:text-black" />
                                ) : (
                                    <Square className="h-4 w-4 text-slate-400" />
                                )}
                                <span>Akta Kelahiran</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {applicant.berkas_ijazah_skl ? (
                                    <CheckSquare className="h-4 w-4 text-emerald-600 print:text-black" />
                                ) : (
                                    <Square className="h-4 w-4 text-slate-400" />
                                )}
                                <span>Ijazah / SKL Sementara</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {applicant.berkas_rapor_prestasi ? (
                                    <CheckSquare className="h-4 w-4 text-emerald-600 print:text-black" />
                                ) : (
                                    <Square className="h-4 w-4 text-slate-400" />
                                )}
                                <span>Rapor / Sertifikat Prestasi</span>
                            </div>
                        </div>
                    </div>

                    {/* Catatan & Instruksi Verifikasi Fisik */}
                    <div className="mt-6 rounded-lg border border-slate-300 bg-slate-50 p-3 text-[11px] text-slate-700 print:border-black print:bg-transparent">
                        <div className="font-bold">Ketentuan Penting:</div>
                        <ul className="mt-1 list-inside list-disc space-y-0.5">
                            <li>
                                Bawa bukti cetak kartu pendaftaran ini beserta berkas dokumen ASLI saat jadwal verifikasi fisik/daftar ulang.
                            </li>
                            <li>
                                Pantau perkembangan status pendaftaran secara mandiri melalui menu <strong>Cek Status</strong> pada portal resmi.
                            </li>
                        </ul>
                    </div>

                    {/* Tanda Tangan */}
                    <div className="mt-10 grid grid-cols-2 gap-8 text-center text-xs">
                        <div>
                            <div>Calon Peserta Didik,</div>
                            <div className="mt-16 border-b border-dotted border-slate-400 pb-1 font-bold">
                                {applicant.nama_calon_siswa}
                            </div>
                            <div className="text-[10px] text-slate-500">
                                NISN: {applicant.nisn}
                            </div>
                        </div>

                        <div>
                            <div>Panitia PPDB {institution.nama_institusi},</div>
                            <div className="mt-16 border-b border-dotted border-slate-400 pb-1 font-bold">
                                Panitia Penerimaan Peserta Didik Baru
                            </div>
                            <div className="text-[10px] text-slate-500">
                                Tanda Tangan &amp; Cap Stempel Resmi
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
