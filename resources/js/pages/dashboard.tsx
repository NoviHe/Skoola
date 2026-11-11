import { Head } from '@inertiajs/react';
import {
    ArrowUpRight,
    BookOpen,
    Building2,
    CalendarCheck,
    CheckCircle2,
    ExternalLink,
    GraduationCap,
    Layers,
    Shield,
    Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

interface InstitutionSettingData {
    id: number;
    nama_institusi: string;
    jenjang: string;
    npsn?: string | null;
    nsm?: string | null;
    kurikulum_aktif: string;
    has_jurusan: boolean;
    kepala_sekolah?: string | null;
    telepon?: string | null;
    email?: string | null;
    fitur_ppdb: boolean;
    fitur_pkl: boolean;
}

interface AcademicYearData {
    id: number;
    tahun: string;
    semester: string;
    is_active: boolean;
}

interface DashboardProps {
    institution?: InstitutionSettingData | null;
    activeAcademicYear?: AcademicYearData | null;
}

export default function Dashboard({
    institution,
    activeAcademicYear,
}: DashboardProps) {
    const institutionName =
        institution?.nama_institusi || 'SMK Negeri 1 Padaherang';
    const tier = institution?.jenjang || 'SMK';
    const curriculum =
        institution?.kurikulum_aktif === 'merdeka'
            ? 'Kurikulum Merdeka'
            : institution?.kurikulum_aktif === 'k13'
              ? 'Kurikulum 2013'
              : 'Kombinasi';

    return (
        <>
            <Head title="Dashboard - Skoola" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Hero Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-8 text-white shadow-xl">
                    <div className="relative z-10 max-w-2xl space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
                            <GraduationCap className="size-4 text-indigo-300" />
                            <span>
                                Sistem Informasi Manajemen Sekolah Terpadu
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            {institutionName}
                        </h1>
                        <p className="text-sm text-indigo-200 sm:text-base">
                            Pusat tata kelola administrasi pendidikan terpadu,
                            mendukung multi-jenjang adaptif (SD/MI, SMP/MTs,
                            SMA/MA, SMK/MAK).
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <a href="/admin">
                                <Button className="bg-white font-semibold text-indigo-950 shadow hover:bg-indigo-50">
                                    <Shield className="mr-2 size-4 text-indigo-700" />
                                    Buka Panel Admin (Filament)
                                    <ArrowUpRight className="ml-1 size-4" />
                                </Button>
                            </a>
                            <a href="/admin/institution-settings">
                                <Button
                                    variant="outline"
                                    className="border-white/30 bg-white/5 text-white hover:bg-white/15"
                                >
                                    <Building2 className="mr-2 size-4" />
                                    Ubah Profil Lembaga
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-10">
                        <GraduationCap className="size-96 text-white" />
                    </div>
                </div>

                {/* Status Cards Grid */}
                <div className="grid gap-5 md:grid-cols-3">
                    {/* Card 1: Profil Lembaga */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Identitas Lembaga
                            </span>
                            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                                Jenjang {tier}
                            </span>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                {institutionName}
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                NPSN: {institution?.npsn || '20253456'}
                                {institution?.nsm
                                    ? ` | NSM: ${institution.nsm}`
                                    : ''}
                            </p>
                        </div>
                        <div className="mt-4 border-t border-neutral-100 pt-3 text-xs dark:border-neutral-800">
                            <div className="flex items-center justify-between py-1">
                                <span className="text-muted-foreground">
                                    Kurikulum:
                                </span>
                                <span className="font-medium text-foreground">
                                    {curriculum}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <span className="text-muted-foreground">
                                    Kepala Sekolah:
                                </span>
                                <span className="font-medium text-foreground">
                                    {institution?.kepala_sekolah || '-'}
                                </span>
                            </div>
                        </div>
                        <a
                            href="/admin/institution-settings"
                            className="mt-3 inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                        >
                            Kelola profil lengkap
                            <ExternalLink className="ml-1 size-3" />
                        </a>
                    </div>

                    {/* Card 2: Tahun Ajaran */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Kalender Akademik
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                <CheckCircle2 className="size-3" />
                                Aktif
                            </span>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                {activeAcademicYear?.tahun || '2026/2027'}
                            </h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Semester{' '}
                                {activeAcademicYear?.semester || 'Ganjil'}
                            </p>
                        </div>
                        <div className="mt-4 border-t border-neutral-100 pt-3 text-xs dark:border-neutral-800">
                            <div className="flex items-center justify-between py-1">
                                <span className="text-muted-foreground">
                                    Status Periode:
                                </span>
                                <span className="font-medium text-emerald-600">
                                    Berjalan Normal
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <span className="text-muted-foreground">
                                    Tingkat Kelas:
                                </span>
                                <span className="font-medium text-foreground">
                                    {tier === 'SD' || tier === 'MI'
                                        ? 'Kelas 1 - 6'
                                        : tier === 'SMP' || tier === 'MTs'
                                          ? 'Kelas 7 - 9'
                                          : 'Kelas 10 - 12'}
                                </span>
                            </div>
                        </div>
                        <a
                            href="/admin/academic-years"
                            className="mt-3 inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                        >
                            Kelola tahun ajaran
                            <ExternalLink className="ml-1 size-3" />
                        </a>
                    </div>

                    {/* Card 3: Status Modul */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Konfigurasi Modul
                            </span>
                            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                Adaptif
                            </span>
                        </div>
                        <div className="mt-3 space-y-2.5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                                    <Layers className="size-3.5 text-indigo-500" />
                                    Peminatan / Jurusan:
                                </span>
                                <span
                                    className={`rounded px-1.5 py-0.5 font-bold ${
                                        institution?.has_jurusan
                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                            : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                                    }`}
                                >
                                    {institution?.has_jurusan
                                        ? 'Aktif'
                                        : 'Nonaktif'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                                    <Users className="size-3.5 text-indigo-500" />
                                    PPDB Online:
                                </span>
                                <span
                                    className={`rounded px-1.5 py-0.5 font-bold ${
                                        institution?.fitur_ppdb
                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                            : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                                    }`}
                                >
                                    {institution?.fitur_ppdb
                                        ? 'Aktif'
                                        : 'Nonaktif'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                                    <BookOpen className="size-3.5 text-indigo-500" />
                                    PKL / Magang Vokasi:
                                </span>
                                <span
                                    className={`rounded px-1.5 py-0.5 font-bold ${
                                        institution?.fitur_pkl
                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                            : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                                    }`}
                                >
                                    {institution?.fitur_pkl
                                        ? 'Aktif'
                                        : 'Nonaktif'}
                                </span>
                            </div>
                        </div>
                        <a
                            href="/admin/institution-settings"
                            className="mt-4 inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                        >
                            Ubah toggle modul
                            <ExternalLink className="ml-1 size-3" />
                        </a>
                    </div>
                </div>

                {/* Direct Action Hub */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                Pusat Operasional Sekolah (Backoffice Filament)
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Seluruh modul pengelolaan guru, siswa, kelas,
                                kurikulum, dan nilai dioperasikan melalui panel
                                admin.
                            </p>
                        </div>
                        <a href="/admin">
                            <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                                <Shield className="mr-2 size-4" />
                                Buka Panel Admin Sekarang
                            </Button>
                        </a>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <a
                            href="/admin/institution-settings"
                            className="group flex flex-col justify-between rounded-xl border border-neutral-200/80 p-4 transition-all hover:border-indigo-500 hover:shadow-md dark:border-neutral-800"
                        >
                            <div className="space-y-1">
                                <Building2 className="size-6 text-indigo-600 transition-transform group-hover:scale-110" />
                                <h4 className="text-sm font-semibold text-foreground">
                                    Profil & Jenjang Lembaga
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Sesuaikan tingkat SD, SMP, SMA, atau SMK
                                    beserta logo & kontak.
                                </p>
                            </div>
                            <span className="mt-3 inline-flex items-center text-xs font-medium text-indigo-600">
                                Kelola <ArrowUpRight className="ml-1 size-3" />
                            </span>
                        </a>

                        <a
                            href="/admin/academic-years"
                            className="group flex flex-col justify-between rounded-xl border border-neutral-200/80 p-4 transition-all hover:border-indigo-500 hover:shadow-md dark:border-neutral-800"
                        >
                            <div className="space-y-1">
                                <CalendarCheck className="size-6 text-indigo-600 transition-transform group-hover:scale-110" />
                                <h4 className="text-sm font-semibold text-foreground">
                                    Tahun Ajaran & Semester
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Atur semester aktif, kalender belajar, dan
                                    periode raport.
                                </p>
                            </div>
                            <span className="mt-3 inline-flex items-center text-xs font-medium text-indigo-600">
                                Kelola <ArrowUpRight className="ml-1 size-3" />
                            </span>
                        </a>

                        <div className="flex flex-col justify-between rounded-xl border border-dashed border-neutral-300 p-4 opacity-75 dark:border-neutral-700">
                            <div className="space-y-1">
                                <Users className="size-6 text-neutral-400" />
                                <h4 className="text-sm font-semibold text-foreground">
                                    Master Guru & Siswa
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Sprint 2: Pendataan guru, wali kelas,
                                    rombel, dan kesiswaan.
                                </p>
                            </div>
                            <span className="mt-3 text-xs font-medium text-muted-foreground">
                                Tahap Berikutnya
                            </span>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl border border-dashed border-neutral-300 p-4 opacity-75 dark:border-neutral-700">
                            <div className="space-y-1">
                                <BookOpen className="size-6 text-neutral-400" />
                                <h4 className="text-sm font-semibold text-foreground">
                                    Presensi & e-Raport
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Sprint 3: Penginputan nilai formatif/sumatif
                                    dan cetak raport PDF.
                                </p>
                            </div>
                            <span className="mt-3 text-xs font-medium text-muted-foreground">
                                Tahap Berikutnya
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
