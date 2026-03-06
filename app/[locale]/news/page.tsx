import { getPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, Rss, ArrowLeft } from "lucide-react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "news" });
    return {
        title: `${t("title")} | Batela Foods`,
    };
}

export default async function NewsPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const posts = await getPosts();
    const t = await getTranslations({ locale, namespace: "news" });

    return (
        <main className="min-h-screen pt-24 pb-16 bg-background">
            {/* Header section with premium look */}
            <section className="py-24 bg-muted/30 border-b border-border mb-16 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-neon-red/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="container-max relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-red/30 bg-neon-red/5 text-neon-red text-xs font-heading font-black tracking-widest uppercase mb-6">
                        {t("badge")}
                    </div>
                    <h1 className="font-heading font-black text-5xl md:text-7xl text-foreground mb-6">
                        {t("title")} <span className="neon-text-red">Batela</span>
                    </h1>
                    <p className="font-body text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>
            </section>

            <div className="container-max">
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {posts.map((post: any, idx: number) => (
                            <Link
                                key={post._id}
                                href={`/news/${post.slug.current}`}
                                className={`group flex flex-col ${idx === 0 ? 'md:col-span-2 lg:col-span-2 md:flex-row gap-12' : ''}`}
                            >
                                <div className={`relative overflow-hidden rounded-[32px] border border-border bg-muted ${idx === 0 ? 'flex-1 aspect-[16/10]' : 'aspect-[16/10] mb-6'}`}>
                                    {post.mainImage ? (
                                        <Image
                                            src={urlFor(post.mainImage).url()}
                                            alt={post.title?.[locale] || ""}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">📰</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className={`flex flex-col justify-center ${idx === 0 ? 'flex-1 py-4' : ''}`}>
                                    <div className="flex items-center gap-3 text-xs font-heading font-black text-neon-red tracking-widest uppercase mb-4">
                                        <span>{new Date(post.publishedAt).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        <span className="w-1 h-1 bg-border rounded-full" />
                                        <span>Batela Admin</span>
                                    </div>
                                    <h2 className={`${idx === 0 ? 'text-3xl md:text-5xl' : 'text-2xl'} font-heading font-black text-foreground mb-4 group-hover:text-neon-red transition-colors line-clamp-2`}>
                                        {post.title?.[locale] || ""}
                                    </h2>
                                    <p className="text-muted-foreground font-body leading-relaxed line-clamp-3 mb-6">
                                        {post.excerpt?.[locale] || post.excerpt?.fr || t("empty_subtitle")}
                                    </p>
                                    <div className="mt-auto flex items-center text-xs font-black uppercase tracking-widest text-foreground group-hover:text-neon-red transition-colors">
                                        {t("discover")} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/20 rounded-[40px] border border-dashed border-border">
                        <h2 className="text-2xl font-heading font-bold text-muted-foreground">
                            {t("empty")}
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            {t("empty_subtitle")}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
