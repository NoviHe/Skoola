import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    Bell,
    BookOpen,
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    ExternalLink,
    FileCheck,
    FileText,
    GraduationCap,
    HeartHandshake,
    Laptop,
    Mail,
    MapPin,
    Megaphone,
    Phone,
    Quote,
    Search,
    ShieldCheck,
    Sparkles,
    Trophy,
    UserCheck,
    Users,
} from 'lucide-react';

interface HomeProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
        npsn?: string;
        alamat?: string;
        kota?: string;
        provinsi?: string;
        telepon?: string;
        email?: string;
        website?: string;
        kepala_sekolah?: string;
        nip_kepala_sekolah?: string;
        has_jurusan?: boolean;
        fitur_ppdb?: boolean;
    };
    hasMajors: boolean;
    majors: Array<{
        id: number;
        kode_jurusan: string;
        nama_jurusan: string;
        singkatan?: string;
        deskripsi?: string;
        prospek_kerja?: string;
    }>;
    articles: Array<{
        id: number;
        judul: string;
        slug: string;
        kategori: string;
        ringkasan?: string;
        thumbnail?: string;
        published_at: string;
        views?: number;
    }>;
    announcements: Array<{
        id: number;
        judul: string;
        slug: string;
        konten: string;
        urgensi: string;
        target_audiens: string;
        published_at: string;
    }>;
    galleries: Array<{
        id: number;
        judul: string;
        kategori: string;
        foto: string;
    }>;
    achievements: Array<{
        id: number;
        judul_prestasi: string;
        nama_peraih: string;
        peringkat: string;
        tingkat: string;
        tahun: string;
    }>;
    openPpdbWave?: {
        id: number;
        nama_gelombang: string;
        kode_gelombang: string;
        tanggal_buka: string;
        tanggal_tutup: string;
        kuota: number | null;
        is_active: boolean;
    } | null;
    stats: {
        total_students: number;
        total_teachers: number;
        total_classrooms: number;
        total_majors: number;
    };
}

export default function Home({
    institution,
    hasMajors,
    majors,
    articles,
    announcements,
    galleries,
    achievements,
    openPpdbWave,
    stats,
}: HomeProps) {
    const latestAnnouncement = announcements[0] ?? null;

    return (
        <PublicLayout>
            <Head
                title={`Website Resmi - ${institution.nama_institusi}`}
            />

            {/* 1. TOP ANNOUNCEMENT TICKER (Maklumat Berjalan / Banner Pengumuman Penting Terkini) */}
            <div className="border-b border-amber-200/90 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 px-4 py-2 text-white shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs">
                    <div className="flex flex-1 items-center gap-2 overflow-hidden">
                        <span className="flex items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider backdrop-blur">
                            <Megaphone className="h-3.5 w-3.5 text-white" />
                            <span>Warta Terkini</span>
                        </span>
                        <div className="truncate font-medium text-white/95">
                            {latestAnnouncement ? (
                                <span>
                                    <strong>[{latestAnnouncement.urgensi}]</strong>{' '}
                                    {latestAnnouncement.judul}
                                </span>
                            ) : (
                                <span>
                                    Penerimaan Peserta Didik Baru (PPDB) Daring Tahun
                                    Ajaran 2026/2027 telah resmi dibuka.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="hidden shrink-0 items-center gap-3 sm:flex">
                        <Link
                            href="/pengumuman"
                            className="inline-flex items-center gap-1 rounded bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-white/30"
                        >
                            <span>Semua Pengumuman</span>
                            <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. PROMINENT SCHOOL HERO SECTION (Gambar Gedung Sekolah Megah & Identitas Resmi) */}
            <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-slate-900 text-white">
                {/* Background Image Gedung Sekolah dengan Overlay Elegan */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1920&auto=format&fit=crop"
                        alt={`Gedung Kampus ${institution.nama_institusi}`}
                        className="h-full w-full object-cover object-center brightness-75 scale-105 transform transition duration-1000 ease-out"
                    />
                    {/* Multi-layered Vignette & Brand Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
                    <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        {/* Kolom Kiri: Sambutan Utama, Akreditasi & Tombol Aksi */}
                        <div className="space-y-6 lg:col-span-8">
                            {/* Institutional Badge */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/40 bg-blue-500/20 px-3.5 py-1 text-xs font-bold text-blue-200 backdrop-blur-md">
                                    <Sparkles className="h-3.5 w-3.5 text-blue-300" />
                                    <span>Website Resmi Satuan Pendidikan</span>
                                </span>

                                {institution.npsn && (
                                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur-md">
                                        NPSN: {institution.npsn}
                                    </span>
                                )}

                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 backdrop-blur-md">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    <span>Akreditasi A Unggul</span>
                                </span>
                            </div>

                            {/* Headline Nama Sekolah */}
                            <div className="space-y-2">
                                <p className="text-sm font-extrabold tracking-widest text-blue-400 uppercase">
                                    Selamat Datang di Portal Resmi
                                </p>
                                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
                                    {institution.nama_institusi}
                                </h1>
                            </div>

                            {/* Moto / Visi Sekolah */}
                            <p className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                                Mewujudkan generasi beriman, berakhlak mulia,
                                menguasai sains dan teknologi, serta berdaya
                                saing mandiri untuk kemajuan bangsa Indonesia.
                            </p>

                            {/* Tombol Aksi Cepat Portal */}
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <Link
                                    href="/ppdb"
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-blue-600/40 transition hover:bg-blue-500 hover:scale-105 active:scale-95"
                                >
                                    <GraduationCap className="h-5 w-5" />
                                    <span>Pendaftaran PPDB Daring</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/profil"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white shadow-sm backdrop-blur-md transition hover:bg-white/20"
                                >
                                    <span>Profil Sekolah &amp; Visi</span>
                                </Link>

                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-sm font-bold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                                >
                                    <span>Portal Siswa &amp; Guru</span>
                                </Link>
                            </div>

                            {/* Pilar Standar Mutu Pendidikan */}
                            <div className="grid grid-cols-2 gap-3 border-t border-white/15 pt-5 text-xs text-slate-300 sm:grid-cols-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                                    <span>Kurikulum Merdeka</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                                    <span>Digital Smart School</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                                    <span>Pendidikan Karakter</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                                    <span>Rekanan Industri TeFa</span>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan: Card Status PPDB & Kontak Langsung */}
                        <div className="lg:col-span-4">
                            <div className="rounded-2xl border border-white/20 bg-slate-900/85 p-6 shadow-2xl backdrop-blur-xl">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                                            {institution.jenjang}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm text-white">
                                                PPDB 2026/2027
                                            </h3>
                                            <p className="text-[11px] text-slate-400">
                                                Penerimaan Siswa Baru
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Dibuka
                                    </span>
                                </div>

                                <div className="mt-4 space-y-3 text-xs">
                                    <p className="text-slate-300 leading-relaxed">
                                        Pendaftaran siswa baru dilaksanakan
                                        secara daring terpadu. Siapkan NISN,
                                        NIK, dan berkas Kartu Keluarga.
                                    </p>

                                    {openPpdbWave && (
                                        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-blue-200">
                                            <div className="font-bold">
                                                {openPpdbWave.nama_gelombang}
                                            </div>
                                            <div className="mt-1 text-[11px] text-blue-300">
                                                Kode: {openPpdbWave.kode_gelombang} • Kuota:{' '}
                                                {openPpdbWave.kuota
                                                    ? `${openPpdbWave.kuota} Siswa`
                                                    : 'Reguler'}
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2 pt-2">
                                        <Link
                                            href="/ppdb/daftar"
                                            className="block w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-center text-xs font-bold text-white shadow-md transition hover:from-blue-500 hover:to-indigo-500"
                                        >
                                            Isi Formulir Pendaftaran Sekarang
                                        </Link>

                                        <Link
                                            href="/ppdb/cek-status"
                                            className="block w-full rounded-xl border border-slate-700 bg-slate-800 py-2 text-center text-xs font-semibold text-slate-200 hover:bg-slate-700"
                                        >
                                            Cek Status Seleksi Calon Siswa
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. BANNER-BANNER PENGUMUMAN PENTING (FEATURED BANNER CARDS) */}
            <section className="relative z-20 -mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {/* Banner 1: PPDB Online */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-6 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                        <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-white/10 blur-xl transition group-hover:scale-125" />
                        <div className="flex items-center justify-between">
                            <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-100 backdrop-blur">
                                Penerimaan Siswa Baru
                            </span>
                            <GraduationCap className="h-6 w-6 text-blue-300" />
                        </div>
                        <h3 className="mt-4 text-xl font-black text-white">
                            PPDB Online 2026/2027
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-blue-100">
                            Pendaftaran online jalur Prestasi, Afirmasi, Zonasi,
                            dan Reguler. Unggah dokumen dan pantau kelulusan
                            secara mandiri.
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                            <Link
                                href="/ppdb"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-blue-900 shadow transition hover:bg-blue-50"
                            >
                                <span>Info &amp; Daftar</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                            <Link
                                href="/ppdb/cek-status"
                                className="text-xs font-semibold text-blue-200 underline underline-offset-4 hover:text-white"
                            >
                                Cek Status
                            </Link>
                        </div>
                    </div>

                    {/* Banner 2: Agenda Ujian / Asesmen Sumatif CBT */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-950 p-6 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                        <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-white/10 blur-xl transition group-hover:scale-125" />
                        <div className="flex items-center justify-between">
                            <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-100 backdrop-blur">
                                Agenda Akademik
                            </span>
                            <Calendar className="h-6 w-6 text-emerald-300" />
                        </div>
                        <h3 className="mt-4 text-xl font-black text-white">
                            Asesmen Sumatif (ASAS/CBT)
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-emerald-100">
                            Jadwal pelaksanaan ujian semester ganjil berbasis
                            komputer (CBT). Unduh tata tertib dan kartu peserta
                            ujian.
                        </p>
                        <div className="mt-5">
                            <Link
                                href="/pengumuman"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-emerald-900 shadow transition hover:bg-emerald-50"
                            >
                                <span>Lihat Jadwal Ujian</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Banner 3: Pusat Layanan & Informasi Sekolah */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-800 via-indigo-900 to-slate-900 p-6 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                        <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-white/10 blur-xl transition group-hover:scale-125" />
                        <div className="flex items-center justify-between">
                            <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-200 backdrop-blur">
                                Layanan Terpadu
                            </span>
                            <HeartHandshake className="h-6 w-6 text-purple-300" />
                        </div>
                        <h3 className="mt-4 text-xl font-black text-white">
                            Pusat Bantuan &amp; Konseling
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-purple-100">
                            Layanan administrasi legalisir, informasi beasiswa
                            KIP, konseling siswa, dan saluran pengaduan resmi
                            sekolah.
                        </p>
                        <div className="mt-5">
                            <Link
                                href="/profil"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-purple-950 shadow transition hover:bg-purple-50"
                            >
                                <span>Kontak &amp; Informasi</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SAMBUTAN KEPALA SEKOLAH (PRINCIPAL'S OFFICIAL WELCOME MESSAGE) */}
            <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-12">
                        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                            {/* Foto Pimpinan / Kepala Sekolah */}
                            <div className="lg:col-span-4 flex flex-col items-center text-center">
                                <div className="relative">
                                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-30 blur-lg" />
                                    <img
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=450&auto=format&fit=crop&q=80"
                                        alt={`Kepala Sekolah ${institution.nama_institusi}`}
                                        className="relative h-72 w-60 rounded-2xl object-cover object-top shadow-md border-4 border-white dark:border-slate-800"
                                    />
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                                        {institution.kepala_sekolah ||
                                            'Drs. H. Ahmad Fauzi, M.Pd.'}
                                    </h4>
                                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                        Kepala {institution.nama_institusi}
                                    </p>
                                    {institution.nip_kepala_sekolah && (
                                        <p className="text-[11px] text-slate-400 mt-0.5">
                                            NIP. {institution.nip_kepala_sekolah}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Isi Sambutan Resmi */}
                            <div className="lg:col-span-8 space-y-4">
                                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                                    <Quote className="h-4 w-4" />
                                    <span>Prakata Pimpinan Lembaga</span>
                                </div>
                                <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                                    Sambutan Kepala Sekolah
                                </h2>
                                <div className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                    <p>
                                        <em>
                                            Assalamu&apos;alaikum Warahmatullahi
                                            Wabarakatuh, Salam Sejahtera bagi Kita
                                            Semua.
                                        </em>
                                    </p>
                                    <p>
                                        Puji dan syukur senantiasa kita panjatkan
                                        ke hadirat Tuhan Yang Maha Esa atas limpahan
                                        rahmat dan hidayah-Nya. Selamat datang di
                                        portal resmi <strong>{institution.nama_institusi}</strong>, media informasi
                                        dan komunikasi digital terbuka bagi seluruh
                                        warga sekolah, orang tua, alumni, serta
                                        masyarakat luas.
                                    </p>
                                    <p>
                                        Di era disrupsi teknologi saat ini, kami
                                        berkomitmen mewujudkan ekosistem
                                        pembelajaran yang adaptif, berpusat pada
                                        potensi peserta didik, dan selaras dengan
                                        kebutuhan industri serta perguruan tinggi.
                                        Melalui Kurikulum Merdeka dan sistem
                                        manajemen digital terpadu, kami mendidik
                                        generasi yang tidak hanya cerdas
                                        intelektual, tetapi juga berintegritas dan
                                        berkarakter Pancasila.
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <Link
                                        href="/profil"
                                        className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                    >
                                        <span>Baca Visi &amp; Misi Lengkap</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. LAYANAN DIGITAL & AKSES CEPAT (QUICK ACCESS PORTAL) */}
            <section className="py-14 border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
                            Sistem Manajemen Sekolah
                        </span>
                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                            Layanan Akademik &amp; Informasi Cepat
                        </h2>
                        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
                            Akses langsung fitur utama sistem informasi sekolah
                            dalam satu pintu.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {/* PPDB */}
                        <Link
                            href="/ppdb"
                            className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-center transition hover:-translate-y-1 hover:border-blue-500 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-blue-500"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950 dark:text-blue-400">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <h4 className="mt-3 text-xs font-bold text-slate-800 group-hover:text-blue-600 dark:text-slate-200">
                                PPDB Online
                            </h4>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                                Pendaftaran Siswa
                            </p>
                        </Link>

                        {/* E-Rapor / Nilai */}
                        <Link
                            href="/login"
                            className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-center transition hover:-translate-y-1 hover:border-emerald-500 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-emerald-500"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950 dark:text-emerald-400">
                                <FileCheck className="h-6 w-6" />
                            </div>
                            <h4 className="mt-3 text-xs font-bold text-slate-800 group-hover:text-emerald-600 dark:text-slate-200">
                                E-Raport Siswa
                            </h4>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                                Nilai &amp; Hasil Belajar
                            </p>
                        </Link>

                        {/* Presensi */}
                        <Link
                            href="/login"
                            className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-center transition hover:-translate-y-1 hover:border-indigo-500 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-indigo-500"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-950 dark:text-indigo-400">
                                <UserCheck className="h-6 w-6" />
                            </div>
                            <h4 className="mt-3 text-xs font-bold text-slate-800 group-hover:text-indigo-600 dark:text-slate-200">
                                Presensi Kelas
                            </h4>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                                Kehadiran Harian
                            </p>
                        </Link>

                        {/* Warta Berita */}
                        <Link
                            href="/berita"
                            className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-center transition hover:-translate-y-1 hover:border-amber-500 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-amber-500"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition group-hover:bg-amber-600 group-hover:text-white dark:bg-amber-950 dark:text-amber-400">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <h4 className="mt-3 text-xs font-bold text-slate-800 group-hover:text-amber-600 dark:text-slate-200">
                                Warta Berita
                            </h4>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                                Rilis &amp; Artikel
                            </p>
                        </Link>

                        {/* Pengumuman */}
                        <Link
                            href="/pengumuman"
                            className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-center transition hover:-translate-y-1 hover:border-rose-500 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-rose-500"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 transition group-hover:bg-rose-600 group-hover:text-white dark:bg-rose-950 dark:text-rose-400">
                                <Megaphone className="h-6 w-6" />
                            </div>
                            <h4 className="mt-3 text-xs font-bold text-slate-800 group-hover:text-rose-600 dark:text-slate-200">
                                Pengumuman
                            </h4>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                                Edaran Dinas &amp; KBM
                            </p>
                        </Link>

                        {/* Galeri & Prestasi */}
                        <Link
                            href="/galeri"
                            className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-center transition hover:-translate-y-1 hover:border-cyan-500 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-cyan-500"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 transition group-hover:bg-cyan-600 group-hover:text-white dark:bg-cyan-950 dark:text-cyan-400">
                                <Trophy className="h-6 w-6" />
                            </div>
                            <h4 className="mt-3 text-xs font-bold text-slate-800 group-hover:text-cyan-600 dark:text-slate-200">
                                Galeri &amp; Prestasi
                            </h4>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                                Dokumentasi Juara
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 6. PROGRAM JURUSAN / KONSENTRASI KEAHLIAN (JIKA ADA JURUSAN) */}
            {hasMajors && majors.length > 0 && (
                <section className="py-16 bg-slate-50 dark:bg-slate-950">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
                                    Peminatan &amp; Vokasi
                                </span>
                                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                                    Program Keahlian Unggulan
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Kurikulum berbasis industri dengan fasilitas laboratorium terpadu.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {majors.map((m) => (
                                <div
                                    key={m.id}
                                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-extrabold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                                {m.singkatan || m.kode_jurusan}
                                            </span>
                                            <Laptop className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                                            {m.nama_jurusan}
                                        </h3>
                                        <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                                            {m.deskripsi ||
                                                'Kompetensi keahlian terpadu membekali siswa dengan keahlian praktis sesuai standar industri kerja.'}
                                        </p>
                                    </div>

                                    {m.prospek_kerja && (
                                        <div className="mt-4 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800">
                                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                Prospek Karir:
                                            </span>{' '}
                                            {m.prospek_kerja}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7. WARTA BERITA & ARTIKEL KEGIATAN TERKINI */}
            <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
                                Publikasi Sekolah
                            </span>
                            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                                Warta &amp; Berita Terkini
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Kabar kegiatan, prestasi siswa, dan artikel edukatif sekolah.
                            </p>
                        </div>
                        <Link
                            href="/berita"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                            <span>Lihat Semua Berita</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {articles.map((art) => (
                            <Link
                                key={art.id}
                                href={`/berita/${art.slug}`}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950/50 dark:hover:bg-slate-900"
                            >
                                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={
                                            art.thumbnail ||
                                            'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60'
                                        }
                                        alt={art.judul}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col justify-between p-5">
                                    <div>
                                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                            <span className="rounded bg-blue-100 px-2 py-0.5 font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                                {art.kategori}
                                            </span>
                                            <span>&bull;</span>
                                            <span>
                                                {new Date(
                                                    art.published_at
                                                ).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 line-clamp-2">
                                            {art.judul}
                                        </h3>
                                        {art.ringkasan && (
                                            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
                                                {art.ringkasan}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                                        <span>Baca Selengkapnya</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. PRESTASI & STATISTIK INSTITUSI */}
            <section className="py-14 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
                        <div>
                            <div className="text-3xl font-black sm:text-4xl text-blue-300">
                                {stats.total_students}+
                            </div>
                            <div className="mt-1 text-xs font-medium text-slate-300">
                                Peserta Didik Aktif
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-black sm:text-4xl text-emerald-300">
                                {stats.total_teachers}+
                            </div>
                            <div className="mt-1 text-xs font-medium text-slate-300">
                                Guru &amp; Tenaga Pendidik
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-black sm:text-4xl text-amber-300">
                                {stats.total_classrooms}
                            </div>
                            <div className="mt-1 text-xs font-medium text-slate-300">
                                Rombongan Belajar (Kelas)
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-black sm:text-4xl text-purple-300">
                                100%
                            </div>
                            <div className="mt-1 text-xs font-medium text-slate-300">
                                Kelulusan &amp; Terserap
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. LOKASI KAMPUS & KONTAK RESMI */}
            <section className="py-14 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div>
                                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
                                    Lokasi Kampus
                                </span>
                                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                                    Kunjungi Sekolah Kami
                                </h3>
                                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                                    {institution.alamat ||
                                        'Jl. Babakan No. 125, Padaherang, Pangandaran, Jawa Barat'}
                                </p>

                                <div className="mt-6 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                                    {institution.telepon && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                                            <span>{institution.telepon}</span>
                                        </div>
                                    )}
                                    {institution.email && (
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                                            <span>{institution.email}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                                        <span>Jam KBM: Senin - Jumat (07.00 - 15.30 WIB)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Peta Lokasi / Map Placeholder */}
                            <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800 h-56 flex items-center justify-center relative">
                                <div className="text-center p-6">
                                    <MapPin className="mx-auto h-8 w-8 text-blue-600 animate-bounce mb-2" />
                                    <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                                        Kampus {institution.nama_institusi}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {institution.alamat}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
