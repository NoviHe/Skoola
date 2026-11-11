import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';

interface ArticlesProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
    };
    articles: {
        data: Array<{
            id: number;
            judul: string;
            slug: string;
            kategori: string;
            ringkasan?: string;
            thumbnail?: string;
            published_at: string;
            views: number;
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    categories: string[];
    selectedCategory?: string;
}

export default function Articles({
    institution,
    articles,
    categories,
    selectedCategory,
}: ArticlesProps) {
    return (
        <PublicLayout>
            <Head title={`Warta & Berita - ${institution.nama_institusi}`} />

            <div className="bg-zinc-50 py-12 dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                            Warta &amp; Publikasi
                        </span>
                        <h1 className="mt-3 text-3xl font-extrabold text-zinc-900 sm:text-4xl dark:text-white">
                            Kabar &amp; Berita Terkini
                        </h1>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Informasi resmi, agenda kegiatan, liputan prestasi,
                            dan karya edukatif {institution.nama_institusi}.
                        </p>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                        <Link
                            href="/berita"
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                                !selectedCategory
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'
                            }`}
                        >
                            Semua Kategori
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                href={`/berita?kategori=${encodeURIComponent(cat)}`}
                                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                                    selectedCategory === cat
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'
                                }`}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>

                    {/* Articles Grid */}
                    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {articles.data.map((art) => (
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
                                    <span className="inline-block self-start rounded-md bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                        {art.kategori}
                                    </span>
                                    <h2 className="mt-3 text-base font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                        <Link href={`/berita/${art.slug}`}>
                                            {art.judul}
                                        </Link>
                                    </h2>
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
                                            Selengkapnya &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Pagination */}
                    {articles.links && articles.links.length > 3 && (
                        <div className="mt-12 flex justify-center gap-1">
                            {articles.links.map((link, idx) => (
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
