import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Trophy } from 'lucide-react';

interface GalleryProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
    };
    galleries: {
        data: Array<{
            id: number;
            judul: string;
            kategori: string;
            foto: string;
            deskripsi?: string;
            tanggal_kegiatan?: string;
        }>;
    };
    achievements: Array<{
        id: number;
        judul_prestasi: string;
        nama_peraih: string;
        tingkat: string;
        peringkat: string;
        penyelenggara?: string;
        tahun: string;
        deskripsi?: string;
    }>;
}

export default function GalleryPage({
    institution,
    galleries,
    achievements,
}: GalleryProps) {
    return (
        <PublicLayout>
            <Head title={`Galeri & Prestasi - ${institution.nama_institusi}`} />

            <div className="bg-zinc-50 py-12 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center">
                        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                            Dokumentasi &amp; Jejak Langkah
                        </span>
                        <h1 className="mt-3 text-3xl font-extrabold text-zinc-900 sm:text-4xl dark:text-white">
                            Galeri Kegiatan &amp; Prestasi
                        </h1>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Sorotan rekam visual kegiatan civitas akademika dan
                            deretan prestasi membanggakan.
                        </p>
                    </div>

                    {/* Prestasi Section */}
                    {achievements.length > 0 && (
                        <div className="mt-12 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
                                <Trophy className="h-7 w-7 shrink-0 text-amber-500" />
                                <div>
                                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                                        Deretan Prestasi Siswa &amp; Lembaga
                                    </h2>
                                    <p className="text-xs text-zinc-500">
                                        Capaian kejuaraan tingkat regional
                                        hingga internasional
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                                {achievements.map((ach) => (
                                    <div
                                        key={ach.id}
                                        className="flex flex-col justify-between rounded-2xl border border-zinc-100 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-800/40"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                                                    {ach.peringkat}
                                                </span>
                                                <span className="text-xs font-semibold text-zinc-400">
                                                    {ach.tahun}
                                                </span>
                                            </div>
                                            <h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">
                                                {ach.judul_prestasi}
                                            </h3>
                                            <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                                                Peraih: {ach.nama_peraih}
                                            </p>
                                            {ach.deskripsi && (
                                                <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                                                    {ach.deskripsi}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mt-4 border-t border-zinc-200/60 pt-3 text-[10px] text-zinc-400 dark:border-zinc-800">
                                            Tingkat {ach.tingkat} &bull;{' '}
                                            {ach.penyelenggara ?? 'Kemdikbud'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Photo Gallery Grid */}
                    <div className="mt-16">
                        <div className="border-b border-zinc-200 pb-4 dark:border-zinc-800">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                                Dokumentasi Visual Kegiatan
                            </h2>
                            <p className="text-xs text-zinc-500">
                                Potret sarana, dinamika pembelajaran, dan
                                aktivitas sekolah
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {galleries.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="group overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                        <img
                                            src={item.foto}
                                            alt={item.judul}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                                {item.kategori}
                                            </span>
                                            {item.tanggal_kegiatan && (
                                                <span className="text-[11px] text-zinc-400">
                                                    {new Date(
                                                        item.tanggal_kegiatan,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            dateStyle: 'medium',
                                                        },
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="mt-2 text-sm font-bold text-zinc-900 dark:text-white">
                                            {item.judul}
                                        </h3>
                                        {item.deskripsi && (
                                            <p className="mt-1 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
                                                {item.deskripsi}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
