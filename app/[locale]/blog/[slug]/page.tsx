import { getPostBySlug } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Clock } from "lucide-react";

// Required setup to render Sanity Rich Text Content
import { PortableText } from "next-sanity";
import { getAllPostSlugs } from "@/lib/sanity/queries";
import { unstable_setRequestLocale } from "next-intl/server";

export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const slugs = await getAllPostSlugs();
        const params: { locale: string; slug: string }[] = [];

        // If no posts yet, provide a fallback slug to avoid build-time errors with output: export
        const safeSlugs = slugs.length > 0 ? slugs : [{ slug: 'bienvenue' }];

        for (const locale of ['fr', 'en']) {
            for (const meta of safeSlugs) {
                params.push({ locale, slug: meta.slug });
            }
        }
        return params;
    } catch {
        return [{ locale: 'fr', slug: 'bienvenue' }, { locale: 'en', slug: 'bienvenue' }];
    }
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
    const post = await getPostBySlug(slug);
    if (!post) {
        return { title: "Article non trouvé | Batela Foods" };
    }
    return {
        title: `${post.title} | Batela Foods`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params: { slug, locale } }: { params: { slug: string, locale: string } }) {
    unstable_setRequestLocale(locale);
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Custom configuration to render rich text blocks with beautiful Tailwind styling
    const portableTextComponents = {
        types: {
            image: ({ value }: any) => {
                return (
                    <div className="relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-md">
                        <Image
                            src={urlFor(value).url()}
                            alt={value.alt || "Image de l'article"}
                            fill
                            className="object-cover"
                        />
                    </div>
                );
            },
        },
        block: {
            h1: ({ children }: any) => <h1 className="font-heading text-4xl font-black mt-12 mb-6 text-foreground">{children}</h1>,
            h2: ({ children }: any) => <h2 className="font-heading text-3xl font-bold mt-10 mb-4 text-foreground">{children}</h2>,
            h3: ({ children }: any) => <h3 className="font-heading text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h3>,
            h4: ({ children }: any) => <h4 className="font-heading text-xl font-bold mt-6 mb-3 text-foreground">{children}</h4>,
            blockquote: ({ children }: any) => <blockquote className="border-l-4 border-neon-red pl-4 italic my-6 text-muted-foreground">{children}</blockquote>,
            normal: ({ children }: any) => <p className="font-body text-base text-foreground/80 leading-relaxed mb-6">{children}</p>,
        },
        list: {
            bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-6 space-y-2 text-foreground/80">{children}</ul>,
            number: ({ children }: any) => <ol className="list-decimal pl-5 mb-6 space-y-2 text-foreground/80">{children}</ol>,
        },
        marks: {
            strong: ({ children }: any) => <strong className="font-bold text-foreground">{children}</strong>,
            em: ({ children }: any) => <em className="italic">{children}</em>,
            link: ({ value, children }: any) => {
                const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
                return (
                    <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className="text-neon-red hover:text-neon-red-dark underline transition-colors">
                        {children}
                    </a>
                );
            },
        }
    };


    return (
        <main className="min-h-screen pt-24 pb-20 bg-background">
            <article className="container-max max-w-4xl mx-auto px-4 sm:px-6">

                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-red mb-8 transition-colors font-semibold uppercase tracking-wider">
                    <ArrowLeft className="w-4 h-4" />
                    RETOUR AU BLOG
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-neon-red" />
                            {new Date(post.publishedAt).toLocaleDateString(locale, {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                        </div>
                    </div>
                </header>

                {/* Main Hero Image */}
                {post.mainImage && (
                    <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-md">
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Portable Text Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    {post.body ? (
                        <PortableText value={post.body} components={portableTextComponents} />
                    ) : (
                        <p className="text-muted-foreground italic">Le contenu de cet article est en cours de rédaction.</p>
                    )}
                </div>

            </article>
        </main>
    );
}
