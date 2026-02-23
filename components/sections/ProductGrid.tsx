import { getTranslations, getLocale } from "next-intl/server";
import { getAllProducts } from "@/lib/sanity/queries";
import { ProductCard } from "./ProductCard";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

export async function ProductGrid({ locale }: { locale: string }) {
    const t = await getTranslations("favorites");

    let products: any[] = [];
    try {
        products = await getAllProducts();
    } catch {
        products = [];
    }

    return (
        <section
            id="shop"
            className="section-padding bg-background"
            aria-labelledby="favorites-heading"
        >
            <div className="container-max">
                {/* Section header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end
                        justify-between gap-4 mb-12">
                    <div>
                        <span className="text-neon-red text-sm font-heading font-semibold
                             uppercase tracking-widest mb-2 block">
                            ⭐ Top Picks
                        </span>
                        <h2
                            id="favorites-heading"
                            className="font-heading font-black text-4xl lg:text-5xl text-foreground"
                        >
                            {t("title")}
                        </h2>
                        <p className="font-body text-muted-foreground mt-2 max-w-sm">
                            {t("subtitle")}
                        </p>
                    </div>
                    <Link
                        href={`/${locale}#shop`}
                        className="btn-neon-green inline-flex items-center gap-2 text-sm flex-shrink-0"
                    >
                        {t("view_all")}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Products grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-border rounded-xl">
                        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="font-heading font-semibold text-foreground mb-1">
                            {t("empty")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Lancez <code className="text-neon-red">npm run seed</code> pour
                            ajouter des produits de démo
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
