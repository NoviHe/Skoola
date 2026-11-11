import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BookOpen,
    Building2,
    CheckCircle2,
    ChevronRight,
    GraduationCap,
    Megaphone,
    Sparkles,
    Trophy,
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
        has_jurusan?: boolean;
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
    }>;
    announcements: Array<{
        id: number;
        judul: string;
        slug: string;
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
    stats,
}: HomeProps) {
    return (
        <PublicLayout>
            <Head title={`Beranda - ${institution.nama_institusi}`} />

            {/* Hero Section */}
            <section className="relative border-b border-slate-200 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-16 text-white sm:py-24 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        {/* Left Column: Headlines & CTAs */}
                        <div className="space-y-6 lg:col-span-7">
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300">
                                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                                <span>
                                    Portal Resmi Jenjang {institution.jenjang}{' '}
                                    &bull; Terakreditasi
                                </span>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm font-bold tracking-widest text-blue-400 uppercase">
                                    Selamat Datang di
                                </p>
                                <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    {institution.nama_institusi}
                                </h1>
                            </div>

                            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                                Membina generasi beriman, berakhlak mulia,
                                menguasai ilmu pengetahuan, serta memiliki
                                keahlian praktis yang siap bersaing di kancah
                                nasional dan global.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <Link
                                    href="/profil"
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 active:scale-95"
                                >
                                    <span>Profil &amp; Visi Misi</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/berita"
                                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:bg-slate-700 hover:text-white"
                                >
                                    <span>Warta &amp; Agenda</span>
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 text-xs text-slate-400 sm:grid-cols-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                                    <span>Kurikulum Merdeka</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                                    <span>Akreditasi Unggul</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                                    <span>Berbasis Digital</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Institutional Identity Card */}
                        <div className="lg:col-span-5">
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-extrabold text-white">
                                            {institution.jenjang}
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-white">
                                                Informasi Instansi
                                            </h2>
                                            <p className="text-xs text-slate-400">
                                                Data Pokok Pendidikan
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                                        Aktif
                                    </span>
                                </div>

                                <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
                                        <dt className="text-slate-400">NPSN</dt>
                                        <dd className="mt-1 text-sm font-bold text-white">
                                            {institution.npsn ?? '-'}
                                        </dd>
                                    </div>
                                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
                                        <dt className="text-slate-400">
                                            Jenjang
                                        </dt>
                                        <dd className="mt-1 text-sm font-bold text-white">
                                            {institution.jenjang}
                                        </dd>
                                    </div>
                                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
                                        <dt className="text-slate-400">
                                            Kabupaten/Kota
                                        </dt>
                                        <dd className="mt-1 text-sm font-bold text-white">
                                            {institution.kota ?? '-'}
                                        </dd>
                                    </div>
                                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
                                        <dt className="text-slate-400">
                                            Provinsi
                                        </dt>
                                        <dd className="mt-1 text-sm font-bold text-white">
                                            {institution.provinsi ?? '-'}
                                        </dd>
                                    </div>
                                </dl>

                                <div className="mt-6 space-y-2 border-t border-slate-800 pt-4">
                                    <Link
                                        href="/login"
                                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-center text-xs font-bold text-white transition hover:bg-blue-500"
                                    >
                                        <span>
                                            Masuk Portal Siswa &amp; Guru
                                        </span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                    <a
                                        href="/admin"
                                        className="block rounded-xl border border-slate-700 bg-slate-800/60 py-2.5 text-center text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                                    >
                                        Akses Pengelola Sekolah (Filament Admin)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics Bar */}
            <section className="border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                                    {stats.total_students}
                                </p>
                                <p className="text-xs font-medium text-slate-500">
                                    Siswa Terdaftar
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                                    {stats.total_teachers}
                                </p>
                                <p className="text-xs font-medium text-slate-500">
                                    Pendidik &amp; Tendik
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                                    {stats.total_classrooms}
                                </p>
                                <p className="text-xs font-medium text-slate-500">
                                    Rombongan Belajar
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                                    {hasMajors ? stats.total_majors : '1'}
                                </p>
                                <p className="text-xs font-medium text-slate-500">
                                    {hasMajors
                                        ? 'Program Keahlian'
                                        : 'Kurikulum Terpadu'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Adaptive Majors Section (Only if hasMajors) */}
            {hasMajors && majors.length > 0 && (
                <section className="bg-slate-50 py-16 dark:bg-slate-950">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                                Pilihan Masa Depan
                            </span>
                            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                                Kompetensi &amp; Program Keahlian
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                Kurikulum diselaraskan langsung dengan kebutuhan
                                dunia usaha dan dunia industri (DUDI) untuk
                                memastikan lulusan siap kerja dan kompetitif.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {majors.map((m) => (
                                <div
                                    key={m.id}
                                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div>
                                        <div className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                            {m.kode_jurusan}
                                        </div>
                                        <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                                            {m.nama_jurusan}
                                        </h3>
                                        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                            {m.deskripsi ??
                                                'Pengembangan keahlian kejuruan komprehensif.'}
                                        </p>
                                    </div>
                                    {m.prospek_kerja && (
                                        <div className="mt-5 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800">
                                            <strong className="text-slate-700 dark:text-slate-300">
                                                Peluang Karir:
                                            </strong>{' '}
                                            {m.prospek_kerja}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Articles & News Section */}
            <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                                Kabar Terkini
                            </span>
                            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                Warta &amp; Publikasi Sekolah
                            </h2>
                        </div>
                        <Link
                            href="/berita"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                            <span>Lihat Semua Berita</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {articles.map((art) => (
                            <article
                                key={art.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                            >
                                {art.thumbnail && (
                                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <img
                                            src={art.thumbnail}
                                            alt={art.judul}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center gap-2">
                                        <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                            {art.kategori}
                                        </span>
                                        <span className="text-[11px] text-slate-400">
                                            {new Date(
                                                art.published_at,
                                            ).toLocaleDateString('id-ID', {
                                                dateStyle: 'medium',
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="mt-3 line-clamp-2 text-base font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                        <Link href={`/berita/${art.slug}`}>
                                            {art.judul}
                                        </Link>
                                    </h3>
                                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                        {art.ringkasan}
                                    </p>
                                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
                                        <Link
                                            href={`/berita/${art.slug}`}
                                            className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            <span>Baca Naskah</span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Split Section: Official Announcements & Achievements */}
            <section className="bg-slate-50 py-16 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Announcements Column */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
                                <div className="flex items-center gap-2.5">
                                    <Megaphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        Pengumuman Resmi
                                    </h3>
                                </div>
                                <Link
                                    href="/pengumuman"
                                    className="text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    Semua Maklumat &rarr;
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {announcements.map((anc) => (
                                    <div
                                        key={anc.id}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                                                    anc.urgensi === 'Mendesak'
                                                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                                        : anc.urgensi ===
                                                            'Penting'
                                                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                                                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                                }`}
                                            >
                                                {anc.urgensi}
                                            </span>
                                            <span className="text-[11px] text-slate-400">
                                                {new Date(
                                                    anc.published_at,
                                                ).toLocaleDateString('id-ID', {
                                                    dateStyle: 'medium',
                                                })}
                                            </span>
                                            <span className="text-[11px] text-slate-400">
                                                &bull; Target:{' '}
                                                {anc.target_audiens}
                                            </span>
                                        </div>
                                        <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                            {anc.judul}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements Column */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
                                <div className="flex items-center gap-2.5">
                                    <Trophy className="h-5 w-5 text-amber-500" />
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                        Prestasi Siswa &amp; Lembaga
                                    </h3>
                                </div>
                                <Link
                                    href="/galeri"
                                    className="text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    Seluruh Prestasi &rarr;
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {achievements.map((ach) => (
                                    <div
                                        key={ach.id}
                                        className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                                            <Award className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                                    {ach.peringkat}
                                                </span>
                                                <span className="text-[11px] font-medium text-slate-500">
                                                    Tingkat {ach.tingkat} (
                                                    {ach.tahun})
                                                </span>
                                            </div>
                                            <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                                                {ach.judul_prestasi}
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                                                Oleh:{' '}
                                                <strong className="text-slate-800 dark:text-slate-200">
                                                    {ach.nama_peraih}
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* School Gallery Preview */}
            {galleries.length > 0 && (
                <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <span className="text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                                    Dokumentasi Kegiatan
                                </span>
                                <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Galeri Foto &amp; Aktivitas
                                </h2>
                            </div>
                            <Link
                                href="/galeri"
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                            >
                                <span>Lihat Semua Dokumentasi</span>
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {galleries.slice(0, 3).map((item) => (
                                <div
                                    key={item.id}
                                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <img
                                            src={item.foto}
                                            alt={item.judul}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                            {item.kategori}
                                        </span>
                                        <h3 className="mt-1.5 truncate text-xs font-bold text-slate-900 dark:text-white">
                                            {item.judul}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
