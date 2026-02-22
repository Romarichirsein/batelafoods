import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getProductBySlug, getAllProductSlugs } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { formatPrice } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { ArrowLeft, CheckCircle2, Info, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { RelatedCarousel } from "@/components/products/RelatedCarousel";

export async function generateStaticParams() {
    const slugs = await getAllProductSlugs();
    const params = [];
    for (const locale of ['fr', 'en']) {
        for (const meta of slugs) {
            params.push({ locale, slug: meta.slug });
        }
    }
    return params;
}

export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: string; slug: string };
}) {
    const product = await getProductBySlug(slug);
    if (!product) return {};

    const name = product.name?.[locale as "fr" | "en"] ?? product.name?.fr;
    const description = product.description?.[locale as "fr" | "en"] ?? product.description?.fr;

    return {
        title: `${name} | Batela Foods`,
        description: description,
    };
}

export default async function ProductDetailPage({
    params: { locale, slug },
}: {
    params: { locale: string; slug: string };
}) {
    unstable_setRequestLocale(locale);
    const product = await getProductBySlug(slug);
    const t = await getTranslations({ locale, namespace: "product_detail" });

    if (!product) {
        notFound();
    }

    const name = product.name?.[locale as "fr" | "en"] ?? product.name?.fr;
    const description =
        product.description?.[locale as "fr" | "en"] ?? product.description?.fr;
    const ingredients =
        product.ingredients?.[locale as "fr" | "en"] ?? product.ingredients?.fr;
    const storage =
        product.storageInfo?.[locale as "fr" | "en"] ?? product.storageInfo?.fr;

    const imageUrl = product.image ? urlFor(product.image).width(800).url() : null;

    return (
        <main className="pt-24 pb-16 min-h-screen">
            <div className="container-max">
                {/* Breadcrumb / Back */}
                <Link
                    href="/#shop"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon-red transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t("back")}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Product Gallery */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border shadow-xl">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-8xl">
                                🥬
                            </div>
                        )}
                        <div className="absolute top-4 left-4">
                            <Badge variant="neon" className="px-3 py-1 text-sm uppercase">
                                {product.category}
                            </Badge>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-neon-green font-bold text-sm uppercase tracking-widest">
                                <CheckCircle2 className="w-4 h-4" />
                                {t("in_stock")}
                            </div>
                            <h1 className="font-heading font-black text-4xl lg:text-5xl text-foreground uppercase tracking-tighter leading-none">
                                {name}
                            </h1>
                        </div>

                        <p className="text-2xl lg:text-3xl font-heading font-black neon-text-red">
                            {formatPrice(product.price)}
                            <span className="text-sm font-normal text-muted-foreground ml-2 uppercase">
                                {t("price_unit")}
                            </span>
                        </p>

                        <Separator />

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="text-muted-foreground leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Quantity + CTA */}
                        <QuantitySelector product={product} />

                        {/* Product Meta */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {ingredients && (
                                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                                    <h4 className="flex items-center gap-2 font-heading font-bold text-sm mb-2 uppercase text-foreground">
                                        <Info className="w-4 h-4 text-neon-red" />
                                        {t("ingredients")}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">{ingredients}</p>
                                </div>
                            )}
                            {storage && (
                                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                                    <h4 className="flex items-center gap-2 font-heading font-bold text-sm mb-2 uppercase text-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-neon-green" />
                                        {t("storage")}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">{storage}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <section className="mt-24">
                    <Separator className="mb-12" />
                    <RelatedCarousel currentSlug={slug} />
                </section>
            </div>
        </main>
    );
}
