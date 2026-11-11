import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';

interface ProfileProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
        npsn?: string;
        alamat?: string;
        desa?: string;
        kecamatan?: string;
        kota?: string;
        provinsi?: string;
        kode_pos?: string;
        telepon?: string;
        email?: string;
        website?: string;
        kepala_sekolah?: string;
        nip_kepala_sekolah?: string;
        visi?: string;
        misi?: string;
        sejarah?: string;
    };
    teachers: Array<{
        id: number;
        nama_lengkap: string;
        gelar_depan?: string;
        gelar_belakang?: string;
        bidang_studi_utama?: string;
        status_kepegawaian?: string;
    }>;
    stats: {
        total_students: number;
        total_teachers: number;
        total_classrooms: number;
    };
}

export default function Profile({
    institution,
    teachers,
    stats,
}: ProfileProps) {
    return (
        <PublicLayout>
            <Head title={`Profil Lembaga - ${institution.nama_institusi}`} />

            <div className="bg-gradient-to-b from-indigo-50/60 to-transparent py-12 dark:from-zinc-900/40">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="text-center">
                        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                            Profil Resmi Lembaga
                        </span>
                        <h1 className="mt-3 text-3xl font-extrabold text-zinc-900 sm:text-4xl dark:text-white">
                            {institution.nama_institusi}
                        </h1>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Jenjang {institution.jenjang} &bull; NPSN:{' '}
                            {institution.npsn ?? '-'}
                        </p>
                    </div>

                    {/* Visi & Misi */}
                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <h2 className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                                VISI LEMBAGA
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                {institution.visi ??
                                    'Terwujudnya insan bertakwa, berkarakter unggul, menguasai ilmu pengetahuan dan teknologi, serta berdaya saing global.'}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <h2 className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                                MISI LEMBAGA
                            </h2>
                            <div className="mt-3 text-sm leading-relaxed whitespace-pre-line text-zinc-700 dark:text-zinc-300">
                                {institution.misi ??
                                    `1. Menyelenggarakan proses pembelajaran berbasis teknologi dan nilai moral luhur.\n2. Mengembangkan bakat, minat, dan potensi peserta didik secara holistik.\n3. Membangun kemitraan strategis dengan dunia industri dan perguruan tinggi.`}
                            </div>
                        </div>
                    </div>

                    {/* Identitas Instansi Lengkap */}
                    <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <h2 className="border-b border-zinc-100 pb-3 text-base font-bold text-zinc-900 dark:border-zinc-800 dark:text-white">
                            Data Pokok Lembaga
                        </h2>
                        <dl className="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-2 md:grid-cols-3">
                            <div>
                                <dt className="text-zinc-500">Nama Sekolah</dt>
                                <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">
                                    {institution.nama_institusi}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-zinc-500">NPSN</dt>
                                <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">
                                    {institution.npsn ?? '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-zinc-500">Jenjang</dt>
                                <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">
                                    {institution.jenjang}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-zinc-500">
                                    Alamat Lengkap
                                </dt>
                                <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">
                                    {institution.alamat ?? '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-zinc-500">
                                    Kota / Kabupaten
                                </dt>
                                <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">
                                    {institution.kota ?? '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-zinc-500">Provinsi</dt>
                                <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">
                                    {institution.provinsi ?? '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-zinc-500">Nomor Telepon</dt>
                                <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">
                                    {institution.telepon ?? '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-zinc-500">Email Resmi</dt>
                                <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">
                                    {institution.email ?? '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-zinc-500">
                                    Kepala Lembaga
                                </dt>
                                <dd className="mt-1 font-semibold text-zinc-900 dark:text-white">
                                    {institution.kepala_sekolah ??
                                        'Pimpinan Lembaga'}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Tenaga Pendidik */}
                    <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                            <div>
                                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                                    Dewan Guru &amp; Tenaga Pendidik
                                </h2>
                                <p className="text-xs text-zinc-500">
                                    Pendidik berkompetensi dan berdedikasi
                                    tinggi
                                </p>
                            </div>
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                                Total: {stats.total_teachers} Pendidik
                            </span>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                            {teachers.map((t) => (
                                <div
                                    key={t.id}
                                    className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-800/40"
                                >
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-base font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
                                        {t.nama_lengkap.charAt(0)}
                                    </div>
                                    <h4 className="mt-2 text-xs font-bold text-zinc-900 dark:text-white">
                                        {(t.gelar_depan
                                            ? t.gelar_depan + ' '
                                            : '') +
                                            t.nama_lengkap +
                                            (t.gelar_belakang
                                                ? ', ' + t.gelar_belakang
                                                : '')}
                                    </h4>
                                    <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                                        {t.bidang_studi_utama ?? 'Pendidik'}
                                    </p>
                                    <span className="mt-2 inline-block rounded bg-zinc-200/70 px-2 py-0.5 text-[10px] font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                                        {t.status_kepegawaian ?? 'PNS'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
