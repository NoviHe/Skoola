import { Link, usePage } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { props } = usePage<{
        auth?: { user?: { name: string; email: string } };
        institution?: {
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
    }>();

    const [mobileOpen, setMobileOpen] = useState(false);
    const auth = props.auth;
    const inst = props.institution;

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Profil', href: '/profil' },
        { name: 'Warta & Berita', href: '/berita' },
        { name: 'Pengumuman', href: '/pengumuman' },
        { name: 'Galeri & Prestasi', href: '/galeri' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-900 selection:bg-indigo-500 selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
            {/* Top Bar with School Contact */}
            <div className="border-b border-zinc-200 bg-white/70 px-4 py-1.5 text-xs text-zinc-600 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 font-medium text-indigo-600 dark:text-indigo-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            </span>
                            SIMAT Skoola Hub
                        </span>
                        {inst?.npsn && (
                            <span className="hidden sm:inline-block">
                                NPSN:{' '}
                                <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
                                    {inst.npsn}
                                </strong>
                            </span>
                        )}
                        {inst?.kota && (
                            <span className="hidden md:inline-block">
                                {inst.kota}, {inst.provinsi}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        {inst?.telepon && (
                            <span className="hidden items-center gap-1 sm:inline-flex">
                                Telp: {inst.telepon}
                            </span>
                        )}
                        <a
                            href="/admin"
                            className="font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline dark:text-indigo-400"
                        >
                            Portal Admin &rarr;
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/90">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
                            <span className="text-lg font-bold tracking-tight">
                                {inst?.jenjang ?? 'SK'}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-base leading-tight font-bold tracking-tight text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                {inst?.nama_institusi ??
                                    'Sistem Informasi Sekolah'}
                            </h1>
                            <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                                Jenjang {inst?.jenjang ?? 'Pendidikan'} Terpadu
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Auth / Action CTA */}
                    <div className="hidden items-center gap-2.5 sm:flex">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                            >
                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                Dashboard ({auth.user.name})
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                Masuk Portal
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-300 dark:hover:bg-zinc-800"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <span className="text-xl font-bold">&times;</span>
                        ) : (
                            <span className="text-xl font-bold">&#9776;</span>
                        )}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileOpen && (
                    <div className="border-b border-zinc-200 bg-white px-4 pt-2 pb-4 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="mt-2 border-t border-zinc-200 pt-2 dark:border-zinc-800">
                                {auth?.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="block rounded-lg bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
                                    >
                                        Buka Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="block rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white"
                                    >
                                        Masuk Portal Siswa
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Page Main Content */}
            <main className="flex-1">{children}</main>

            {/* Modern School Footer */}
            <footer className="border-t border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                                    {inst?.jenjang ?? 'SK'}
                                </div>
                                <span className="text-base font-bold text-zinc-900 dark:text-white">
                                    {inst?.nama_institusi ??
                                        'Sekolah / Madrasah Terpadu'}
                                </span>
                            </div>
                            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                {inst?.alamat ?? 'Jalan Raya Pendidikan No. 1'},{' '}
                                {inst?.kota ?? ''} {inst?.provinsi ?? ''}.
                                Sistem Informasi Manajemen Sekolah &amp;
                                Madrasah Terpadu (SIMAT Skoola) berbasis
                                multi-jenjang fleksibel.
                            </p>
                            <div className="mt-4 flex flex-col gap-1 text-xs text-zinc-500">
                                {inst?.telepon && (
                                    <span>Telepon: {inst.telepon}</span>
                                )}
                                {inst?.email && (
                                    <span>Email: {inst.email}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold tracking-wider text-zinc-900 uppercase dark:text-zinc-200">
                                Navigasi Publik
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/"
                                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        Beranda
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/profil"
                                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        Profil &amp; Visi Misi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/berita"
                                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        Warta &amp; Berita
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/pengumuman"
                                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        Pengumuman
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/galeri"
                                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        Galeri Dokumentasi
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold tracking-wider text-zinc-900 uppercase dark:text-zinc-200">
                                Akses Terpadu
                            </h3>
                            <ul className="mt-3 space-y-2 text-sm">
                                <li>
                                    <a
                                        href="/admin"
                                        className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                                    >
                                        Panel Admin (Filament)
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href="/login"
                                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                                    >
                                        Portal Siswa / Orang Tua
                                    </Link>
                                </li>
                                <li>
                                    <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                        Jenjang: {inst?.jenjang ?? 'SMK'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        &copy; {new Date().getFullYear()}{' '}
                        {inst?.nama_institusi ?? 'Akademi Web'}. Hak Cipta
                        Dilindungi Undang-Undang.
                    </div>
                </div>
            </footer>
        </div>
    );
}
