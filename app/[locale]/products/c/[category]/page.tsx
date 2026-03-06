import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/sections/ProductSkeleton";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
    return [
        { locale: 'fr', category: 'saucissons' },
        { locale: 'fr', category: 'saucisses' },
        { locale: 'fr', category: 'viandes-fumees' },
        { locale: 'en', category: 'saucissons' },
        { locale: 'en', category: 'saucisses' },
        { locale: 'en', category: 'viandes-fumees' },
    ];
}

export default async function CategoryPage({
    params: { locale, category }
}: {
    params: { locale: string; category: string }
}) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations("categories");

    // Convert category to category key (e.g. 'viandes-fumees' -> 'viandes_fumees')
    const categoryKey = category.replace(/-/g, '_');
    const categoryName = t(`${categoryKey}.title`);

    const validKeys = ['saucissons', 'saucisses', 'viandes_fumees'];
    const tipsKey = validKeys.includes(categoryKey) ? categoryKey : 'generic';

    return (
        <main className="pt-24 pb-16">
            <section className="bg-muted/30 py-16 mb-12 border-b border-border">
                <div className="container-max">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon-red transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        {t("tips.back")}
                    </Link>
                    <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 uppercase tracking-tighter">
                        {categoryName}
                    </h1>
                    <p className="font-body text-muted-foreground text-lg max-w-2xl">
                        {t(`${categoryKey}.description`)}
                    </p>
                </div>
            </section>

            <div className="container-max">
                <Suspense fallback={<ProductGridSkeleton />}>
                    <ProductGrid locale={locale} category={category} />
                </Suspense>
            </div>

            {/* Recipes & Tips section */}
            <section className="section-padding bg-muted/20 mt-20 border-t border-border">
                <div className="container-max">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2 space-y-6">
                            <span className="text-neon-red text-sm font-heading font-black tracking-widest uppercase">
                                {t("tips.badge")}
                            </span>
                            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground">
                                {t(`tips.${tipsKey}.title`)}
                            </h2>
                            <p className="font-body text-muted-foreground text-lg leading-relaxed">
                                {t(`tips.${tipsKey}.description`)}
                            </p>
                            <Link href="/recipes" className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-black uppercase tracking-widest text-background transition-all hover:bg-neon-red hover:text-white group">
                                {t("tips.cta", { category: categoryName })}
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                            <div className="aspect-square rounded-3xl bg-background border border-border p-6 flex flex-col justify-center items-center text-center space-y-2">
                                <span className="text-3xl">
                                    {category === 'saucissons' ? "🔪" : category === 'saucisses' ? "🔥" : "🍲"}
                                </span>
                                <p className="font-heading font-bold text-sm">
                                    {t(`tips.${tipsKey}.card1`)}
                                </p>
                            </div>
                            <div className="aspect-square rounded-3xl bg-background border border-border p-6 flex flex-col justify-center items-center text-center space-y-2">
                                <span className="text-3xl">
                                    {category === 'saucissons' ? "🍷" : "✨"}
                                </span>
                                <p className="font-heading font-bold text-sm">
                                    {t(`tips.${tipsKey}.card2`)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
