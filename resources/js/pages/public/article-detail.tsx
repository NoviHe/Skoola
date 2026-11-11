import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';

interface ArticleDetailProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
    };
    article: {
        id: number;
        judul: string;
        slug: string;
        kategori: string;
        ringkasan?: string;
        konten: string;
        thumbnail?: string;
        published_at: string;
        views: number;
    };
    relatedArticles: Array<{
        id: number;
        judul: string;
        slug: string;
        kategori: string;
        thumbnail?: string;
        published_at: string;
    }>;
}

export default function ArticleDetail({
    institution,
    article,
    relatedArticles,
}: ArticleDetailProps) {
    return (
        <PublicLayout>
            <Head title={`${article.judul} - ${institution.nama_institusi}`} />

            <div className="bg-zinc-50 py-12 dark:bg-zinc-950">
                <article className="mx-auto max-w-4xl px-4 sm:px-6">
                    {/* Breadcrumbs */}
                    <nav className="mb-6 flex items-center gap-2 text-xs text-zinc-500">
                        <Link href="/" className="hover:text-indigo-600">
                            Beranda
                        </Link>
                        <span>/</span>
                        <Link href="/berita" className="hover:text-indigo-600">
                            Warta
                        </Link>
                        <span>/</span>
                        <span className="max-w-xs truncate font-medium text-zinc-700 dark:text-zinc-300">
                            {article.judul}
                        </span>
                    </nav>

                    {/* Article Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3">
                            <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                {article.kategori}
                            </span>
                            <span className="text-xs text-zinc-400">
                                {new Date(
                                    article.published_at,
                                ).toLocaleDateString('id-ID', {
                                    dateStyle: 'full',
                                })}
                            </span>
                            <span className="text-xs text-zinc-400">
                                &bull; Dibaca {article.views} kali
                            </span>
                        </div>
                        <h1 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                            {article.judul}
                        </h1>
                        {article.ringkasan && (
                            <p className="mt-4 border-l-4 border-indigo-500 pl-4 text-base text-zinc-600 italic dark:text-zinc-400">
                                {article.ringkasan}
                            </p>
                        )}
                    </div>

                    {/* Hero Thumbnail */}
                    {article.thumbnail && (
                        <div className="mb-8 overflow-hidden rounded-2xl shadow-md">
                            <img
                                src={article.thumbnail}
                                alt={article.judul}
                                className="max-h-[480px] w-full object-cover"
                            />
                        </div>
                    )}

                    {/* Article Body Content */}
                    <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="prose prose-zinc dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-line text-zinc-800 sm:text-base dark:text-zinc-200">
                            {article.konten}
                        </div>
                    </div>

                    {/* Back CTA */}
                    <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
                        <Link
                            href="/berita"
                            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                        >
                            &larr; Kembali ke Daftar Warta
                        </Link>
                    </div>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                                Warta Terkait Lainnya
                            </h3>
                            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                                {relatedArticles.map((rel) => (
                                    <div
                                        key={rel.id}
                                        className="group rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                                    >
                                        <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                                            {rel.kategori}
                                        </span>
                                        <h4 className="mt-1 line-clamp-2 text-xs font-bold text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                            <Link href={`/berita/${rel.slug}`}>
                                                {rel.judul}
                                            </Link>
                                        </h4>
                                        <p className="mt-2 text-[10px] text-zinc-400">
                                            {new Date(
                                                rel.published_at,
                                            ).toLocaleDateString('id-ID', {
                                                dateStyle: 'medium',
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </PublicLayout>
    );
}
