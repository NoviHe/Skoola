import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';

interface AnnouncementsProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
    };
    announcements: {
        data: Array<{
            id: number;
            judul: string;
            slug: string;
            konten: string;
            target_audiens: string;
            urgensi: string;
            published_at: string;
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

export default function Announcements({
    institution,
    announcements,
}: AnnouncementsProps) {
    return (
        <PublicLayout>
            <Head title={`Pengumuman Resmi - ${institution.nama_institusi}`} />

            <div className="bg-zinc-50 py-12 dark:bg-zinc-950">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <div className="text-center">
                        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                            Papan Informasi Resmi
                        </span>
                        <h1 className="mt-3 text-3xl font-extrabold text-zinc-900 sm:text-4xl dark:text-white">
                            Pengumuman &amp; Maklumat
                        </h1>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Pemberitahuan akademik, instruksi dinas, dan edaran
                            resmi dari {institution.nama_institusi}.
                        </p>
                    </div>

                    <div className="mt-10 space-y-6">
                        {announcements.data.map((anc) => (
                            <div
                                key={anc.id}
                                className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3 dark:border-zinc-800">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`rounded-md px-2.5 py-0.5 text-xs font-bold ${
                                                anc.urgensi === 'Mendesak'
                                                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                                                    : anc.urgensi === 'Penting'
                                                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                                                      : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                                            }`}
                                        >
                                            {anc.urgensi}
                                        </span>
                                        <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                            Sasaran: {anc.target_audiens}
                                        </span>
                                    </div>
                                    <span className="text-xs text-zinc-400">
                                        {new Date(
                                            anc.published_at,
                                        ).toLocaleDateString('id-ID', {
                                            dateStyle: 'full',
                                        })}
                                    </span>
                                </div>
                                <h2 className="mt-4 text-base font-bold text-zinc-900 sm:text-lg dark:text-white">
                                    {anc.judul}
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-zinc-700 dark:text-zinc-300">
                                    {anc.konten}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {announcements.links && announcements.links.length > 3 && (
                        <div className="mt-10 flex justify-center gap-1">
                            {announcements.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url ?? '#'}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : link.url
                                              ? 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200'
                                              : 'cursor-not-allowed text-zinc-400'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
