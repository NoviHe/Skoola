import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ExternalLink,
    GraduationCap,
    Mail,
    MapPin,
    Menu,
    Phone,
    ShieldCheck,
    X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
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

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const auth = props.auth;
    const inst = props.institution;

    const navItems = [
        { label: 'Beranda', href: '/' },
        { label: 'Profil Sekolah', href: '/profil' },
        { label: 'Warta & Berita', href: '/berita' },
        { label: 'Pengumuman', href: '/pengumuman' },
        { label: 'Galeri & Prestasi', href: '/galeri' },
        { label: 'PPDB Online', href: '/ppdb' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:bg-blue-600 selection:text-white dark:bg-slate-950 dark:text-slate-100">
            {/* Top Bar for Institutional Contact and Quick Links */}
            <header className="border-b border-slate-200/80 bg-slate-900 px-4 py-2 text-xs text-slate-300 dark:border-slate-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs">
                        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                            SIMAT Skoola Resmi
                        </span>
                        {inst?.npsn && (
                            <span className="hidden items-center gap-1 text-slate-400 sm:inline-flex">
                                NPSN:{' '}
                                <strong className="text-slate-200">
                                    {inst.npsn}
                                </strong>
                            </span>
                        )}
                        {inst?.telepon && (
                            <span className="hidden items-center gap-1 text-slate-400 md:inline-flex">
                                <Phone className="h-3 w-3 text-slate-400" />
                                {inst.telepon}
                            </span>
                        )}
                        {inst?.email && (
                            <span className="hidden items-center gap-1 text-slate-400 lg:inline-flex">
                                <Mail className="h-3 w-3 text-slate-400" />
                                {inst.email}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="/admin"
                            className="inline-flex items-center gap-1 font-medium text-slate-300 transition hover:text-white"
                        >
                            <span>Panel Admin (Filament)</span>
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Navigation Bar */}
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
                    {/* Brand */}
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20 transition group-hover:scale-105">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                    {inst?.jenjang ?? 'SMK'}
                                </span>
                                <h1 className="text-base font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                    {inst?.nama_institusi ?? 'Akademi Web'}
                                </h1>
                            </div>
                            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                Sistem Informasi Manajemen Sekolah Terpadu
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Action / Auth Button */}
                    <div className="hidden items-center gap-3 sm:flex">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                            >
                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                Dashboard ({auth.user.name})
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-600/30 transition hover:bg-blue-700 active:scale-95"
                            >
                                <span>Portal Siswa</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
                        aria-label="Toggle Navigation"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-5 lg:hidden dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-col gap-1.5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-lg px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-800">
                                {auth?.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="block rounded-lg bg-slate-100 px-4 py-2.5 text-center text-sm font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                                    >
                                        Buka Dashboard ({auth.user.name})
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-sm hover:bg-blue-700"
                                    >
                                        Masuk Portal Siswa
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Institutional Footer */}
            <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                        {/* School Info */}
                        <div className="space-y-4 md:col-span-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-base font-extrabold text-white">
                                        {inst?.nama_institusi ?? 'Akademi Web'}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Jenjang {inst?.jenjang ?? 'SMK'} &bull;
                                        SIMAT Skoola
                                    </p>
                                </div>
                            </div>
                            <p className="max-w-md text-sm leading-relaxed text-slate-400">
                                {inst?.alamat ?? 'Jalan Raya Pendidikan No. 1'},{' '}
                                {inst?.kota ?? ''} {inst?.provinsi ?? ''}.
                                Institusi pendidikan yang berorientasi pada
                                integritas, keunggulan akademis, penguasaan
                                teknologi, dan kesiapan karir.
                            </p>
                            <div className="flex flex-col gap-1.5 text-xs text-slate-300">
                                {inst?.telepon && (
                                    <span className="flex items-center gap-2">
                                        <Phone className="h-3.5 w-3.5 text-blue-400" />
                                        {inst.telepon}
                                    </span>
                                )}
                                {inst?.email && (
                                    <span className="flex items-center gap-2">
                                        <Mail className="h-3.5 w-3.5 text-blue-400" />
                                        {inst.email}
                                    </span>
                                )}
                                {inst?.kota && (
                                    <span className="flex items-center gap-2">
                                        <MapPin className="h-3.5 w-3.5 text-blue-400" />
                                        {inst.kota}, {inst.provinsi}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                                Tautan Cepat
                            </h4>
                            <ul className="mt-4 space-y-2.5 text-sm">
                                <li>
                                    <Link
                                        href="/"
                                        className="transition hover:text-white"
                                    >
                                        Beranda
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/profil"
                                        className="transition hover:text-white"
                                    >
                                        Profil &amp; Visi Misi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/berita"
                                        className="transition hover:text-white"
                                    >
                                        Warta Sekolah
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/pengumuman"
                                        className="transition hover:text-white"
                                    >
                                        Pengumuman
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/galeri"
                                        className="transition hover:text-white"
                                    >
                                        Galeri &amp; Prestasi
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Portals & Security */}
                        <div>
                            <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                                Layanan Terpadu
                            </h4>
                            <ul className="mt-4 space-y-2.5 text-sm">
                                <li>
                                    <a
                                        href="/admin"
                                        className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300"
                                    >
                                        <span>Panel Admin Sekolah</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href="/login"
                                        className="transition hover:text-white"
                                    >
                                        Portal Siswa &amp; Guru
                                    </Link>
                                </li>
                                <li className="pt-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300">
                                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                                        Kurikulum Merdeka
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
                        <p>
                            &copy; {new Date().getFullYear()}{' '}
                            {inst?.nama_institusi ?? 'Sekolah'}. Seluruh hak
                            cipta dilindungi.
                        </p>
                        <p className="flex items-center gap-1">
                            Didukung oleh arsitektur SIMAT Skoola Terpadu
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
