import { getPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function NewsTeaser({ locale }: { locale: string }) {
    // Note: Since this is a server component used in the page, it will inherit locale if needed 
    // but we can fetch posts and just use the locale for formatting.
    // For simplicity, we'll fetch all posts and slice.
    const posts = await getPosts();
    const featuredPosts = posts.slice(0, 2);

    // We can't use useLocale/useTranslations inside a non-hook async component if it's strictly server-side
    // but next-intl/server provides getTranslations.
    const t = await getTranslations("news");

    return (
        <section className="section-padding bg-background">
            <div className="container-max">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground">
                            {t("title")}
                        </h2>
                        <p className="font-body text-muted-foreground text-lg max-w-2xl">
                            {t("subtitle")}
                        </p>
                    </div>
                    <Link href="/news">
                        <Button variant="outline" className="group">
                            {t("view_all")}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredPosts.length > 0 ? (
                        featuredPosts.map((post: any) => (
                            <Link key={post._id} href={`/news/${post.slug.current}`} className="group">
                                <article className="bg-muted/30 rounded-[32px] p-8 border border-border hover:border-neon-red/30 transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-6 relative z-10">
                                        <span className="px-3 py-1 rounded-full bg-neon-red/10 text-neon-red text-[10px] font-black uppercase tracking-widest">
                                            {t("badge")}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'long' })}
                                        </div>
                                    </div>
                                    <h3 className="font-heading font-black text-2xl mb-4 group-hover:text-neon-red transition-colors relative z-10 leading-tight">
                                        {/* Fallback to fr if current locale not available on object */}
                                        {post.title?.[locale] || post.title?.fr || post.title || ""}
                                    </h3>
                                    <p className="font-body text-muted-foreground text-sm line-clamp-2 mb-8 relative z-10 opacity-80">
                                        {post.excerpt?.[locale] || post.excerpt?.fr || "..."}
                                    </p>
                                    <div className="mt-auto flex items-center text-neon-red font-black text-xs tracking-widest uppercase relative z-10">
                                        {t("discover")}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <ArrowRight size={100} strokeWidth={1} />
                                    </div>
                                </article>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-muted-foreground italic">
                            {t("empty")}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
