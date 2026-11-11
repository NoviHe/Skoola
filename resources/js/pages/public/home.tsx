import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';

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
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-zinc-50 pt-16 pb-20 dark:from-zinc-900/50 dark:via-zinc-950 dark:to-zinc-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/60 dark:text-indigo-300">
                                <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                                Sistem Terpadu Jenjang {institution.jenjang}
                            </div>
                            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
                                {institution.nama_institusi}
                            </h1>
                            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
                                Mewujudkan ekosistem pendidikan berstandar
                                tinggi yang menumbuhkan karakter mulia,
                                kompetensi abad 21, dan inovasi teknologi bagi
                                kemajuan masa depan bangsa.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Link
                                    href="/profil"
                                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    Profil &amp; Visi Misi
                                </Link>
                                <Link
                                    href="/berita"
                                    className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                >
                                    Warta Terbaru
                                </Link>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="relative rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-md">
                                            {institution.jenjang}
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                                                Ringkasan Data Instansi
                                            </h2>
                                            <p className="text-xs text-zinc-500">
                                                Akreditasi &amp; Legalitas
                                                Sekolah
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                                        Aktif
                                    </span>
                                </div>
                                <dl className="mt-4 grid grid-cols-2 gap-4 text-xs">
                                    <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                                        <dt className="text-zinc-500">NPSN</dt>
                                        <dd className="mt-1 font-bold text-zinc-900 dark:text-white">
                                            {institution.npsn ?? '-'}
                                        </dd>
                                    </div>
                                    <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                                        <dt className="text-zinc-500">
                                            Jenjang
                                        </dt>
                                        <dd className="mt-1 font-bold text-zinc-900 dark:text-white">
                                            {institution.jenjang}
                                        </dd>
                                    </div>
                                    <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                                        <dt className="text-zinc-500">
                                            Kota / Kab
                                        </dt>
                                        <dd className="mt-1 font-bold text-zinc-900 dark:text-white">
                                            {institution.kota ?? '-'}
                                        </dd>
                                    </div>
                                    <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                                        <dt className="text-zinc-500">
                                            Provinsi
                                        </dt>
                                        <dd className="mt-1 font-bold text-zinc-900 dark:text-white">
                                            {institution.provinsi ?? '-'}
                                        </dd>
                                    </div>
                                </dl>
                                <div className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                                    <a
                                        href="/admin"
                                        className="block rounded-lg bg-zinc-900 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-zinc-800 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                                    >
                                        Masuk ke Panel Pengelola (Filament)
                                        &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Metrics Section */}
            <section className="border-y border-zinc-200/80 bg-white py-10 dark:border-zinc-800 dark:bg-zinc-900/60">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-indigo-600 sm:text-4xl dark:text-indigo-400">
                                {stats.total_students}
                            </p>
                            <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm">
                                Peserta Didik Aktif
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-indigo-600 sm:text-4xl dark:text-indigo-400">
                                {stats.total_teachers}
                            </p>
                            <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm">
                                Guru &amp; Tendik
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-indigo-600 sm:text-4xl dark:text-indigo-400">
                                {stats.total_classrooms}
                            </p>
                            <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm">
                                Rombongan Belajar
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-indigo-600 sm:text-4xl dark:text-indigo-400">
                                {hasMajors ? stats.total_majors : '1'}
                            </p>
                            <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm">
                                {hasMajors
                                    ? 'Kompetensi Keahlian'
                                    : 'Kurikulum Terpadu'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conditional Majors Section (Only when hasMajors is true) */}
            {hasMajors && majors.length > 0 && (
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                                Kejuruan &amp; Peminatan
                            </h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                                Program Keahlian Unggulan
                            </p>
                            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                                Pilihan kompetensi keahlian yang diselaraskan
                                dengan kebutuhan dunia industri &amp; kerja.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {majors.map((m) => (
                                <div
                                    key={m.id}
                                    className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div>
                                        <div className="inline-block rounded-lg bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                            {m.kode_jurusan}
                                        </div>
                                        <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-white">
                                            {m.nama_jurusan}
                                        </h3>
                                        <p className="mt-2 line-clamp-3 text-xs text-zinc-500 dark:text-zinc-400">
                                            {m.deskripsi ??
                                                'Program pelatihan kompetensi keahlian siap kerja.'}
                                        </p>
                                    </div>
                                    {m.prospek_kerja && (
                                        <div className="mt-4 border-t border-zinc-100 pt-3 text-[11px] text-zinc-500 dark:border-zinc-800">
                                            <strong className="text-zinc-700 dark:text-zinc-300">
                                                Prospek:
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

            {/* Articles / News Section */}
            <section className="bg-zinc-100/60 py-16 dark:bg-zinc-900/40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                                Kabar Sekolah
                            </h2>
                            <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                Warta &amp; Berita Terkini
                            </p>
                        </div>
                        <Link
                            href="/berita"
                            className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                            Lihat Semua Berita &rarr;
                        </Link>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {articles.map((art) => (
                            <article
                                key={art.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                {art.thumbnail && (
                                    <div className="aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                        <img
                                            src={art.thumbnail}
                                            alt={art.judul}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-1 flex-col p-6">
                                    <span className="inline-block self-start rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                        {art.kategori}
                                    </span>
                                    <h3 className="mt-3 text-base font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                        <Link href={`/berita/${art.slug}`}>
                                            {art.judul}
                                        </Link>
                                    </h3>
                                    <p className="mt-2 line-clamp-3 text-xs text-zinc-500 dark:text-zinc-400">
                                        {art.ringkasan}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-[11px] text-zinc-400 dark:border-zinc-800">
                                        <span>
                                            {new Date(
                                                art.published_at,
                                            ).toLocaleDateString('id-ID', {
                                                dateStyle: 'medium',
                                            })}
                                        </span>
                                        <Link
                                            href={`/berita/${art.slug}`}
                                            className="font-semibold text-indigo-600 dark:text-indigo-400"
                                        >
                                            Baca Selengkapnya
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Announcements & Achievements Section */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Announcements */}
                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                                    Pengumuman Resmi
                                </h3>
                                <Link
                                    href="/pengumuman"
                                    className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    Semua Pengumuman &rarr;
                                </Link>
                            </div>
                            <div className="mt-6 space-y-4">
                                {announcements.map((anc) => (
                                    <div
                                        key={anc.id}
                                        className="rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                                                    anc.urgensi === 'Mendesak'
                                                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                                                        : anc.urgensi ===
                                                            'Penting'
                                                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                                                          : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                                                }`}
                                            >
                                                {anc.urgensi}
                                            </span>
                                            <span className="text-[11px] text-zinc-400">
                                                {new Date(
                                                    anc.published_at,
                                                ).toLocaleDateString('id-ID', {
                                                    dateStyle: 'medium',
                                                })}
                                            </span>
                                        </div>
                                        <h4 className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                            {anc.judul}
                                        </h4>
                                        <div className="mt-2 text-[11px] text-zinc-500">
                                            Sasaran:{' '}
                                            <strong>
                                                {anc.target_audiens}
                                            </strong>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                                    Prestasi Kebanggaan
                                </h3>
                                <Link
                                    href="/galeri"
                                    className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    Galeri Prestasi &rarr;
                                </Link>
                            </div>
                            <div className="mt-6 space-y-4">
                                {achievements.map((ach) => (
                                    <div
                                        key={ach.id}
                                        className="flex items-start gap-4 rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-lg font-bold text-amber-600 dark:text-amber-400">
                                            &#127942;
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                                                    {ach.peringkat}
                                                </span>
                                                <span className="text-[11px] font-medium text-zinc-500">
                                                    Tingkat {ach.tingkat} (
                                                    {ach.tahun})
                                                </span>
                                            </div>
                                            <h4 className="mt-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                                {ach.judul_prestasi}
                                            </h4>
                                            <p className="mt-1 text-xs text-zinc-500">
                                                Oleh:{' '}
                                                <strong className="text-zinc-700 dark:text-zinc-300">
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
                <section className="bg-zinc-100/60 py-16 dark:bg-zinc-900/40">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <h2 className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                                    Dokumentasi Visual
                                </h2>
                                <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                    Galeri Kegiatan Sekolah
                                </p>
                            </div>
                            <Link
                                href="/galeri"
                                className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                            >
                                Lihat Semua Foto &rarr;
                            </Link>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {galleries.slice(0, 3).map((item) => (
                                <div
                                    key={item.id}
                                    className="group overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                        <img
                                            src={item.foto}
                                            alt={item.judul}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                            {item.kategori}
                                        </span>
                                        <h3 className="mt-1 truncate text-xs font-bold text-zinc-900 dark:text-white">
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
