import { getPosts } from "@/lib/sanity/queries";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import { ArrowLeft, ArrowRight, Rss } from "lucide-react";

export function generateStaticParams() {
    return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "blog" });
    return {
        title: `${t("title")} | Batela Foods`,
    };
}

export default async function BlogIndexPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "blog" });
    const posts = await getPosts();

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background section-padding">
            <div className="container-max">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-red mb-6 transition-colors font-semibold uppercase tracking-wider">
                        <ArrowLeft className="w-4 h-4" />
                        {t("back_home")}
                    </Link>
                    <div className="flex items-center gap-3">
                        <Rss className="w-8 h-8 text-neon-red" />
                        <h1 className="font-heading font-black text-4xl lg:text-5xl text-foreground">
                            {t("title")}
                        </h1>
                    </div>
                    <p className="font-body text-xl text-muted-foreground mt-4 max-w-2xl">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                key={post._id}
                                href={`/blog/${post.slug.current}`}
                                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-neon-red/50 hover:shadow-neon-red-sm transition-all duration-300 flex flex-col hover:-translate-y-2"
                            >
                                <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden">
                                    {post.mainImage ? (
                                        <Image
                                            src={urlFor(post.mainImage).url()}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                            <Rss className="w-12 h-12 text-muted-foreground/30" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="text-sm font-semibold text-neon-red mb-3">
                                        {new Date(post.publishedAt).toLocaleDateString(locale, {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </div>
                                    <h2 className="font-heading font-bold text-xl text-foreground mb-3 line-clamp-2 group-hover:text-neon-red transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted-foreground font-body text-sm line-clamp-3 mb-6 flex-1">
                                        {post.excerpt || "Découvrez notre nouvel article."}
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-neon-red transition-colors mt-auto">
                                        {t("read_more")}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 border border-dashed border-border rounded-2xl bg-muted/20">
                        <Rss className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
                            {t("empty")}
                        </h2>
                        <p className="text-muted-foreground">
                            {t("empty_subtitle")}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
