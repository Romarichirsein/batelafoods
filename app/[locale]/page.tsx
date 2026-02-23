import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { DeliveryStrip } from "@/components/sections/DeliveryStrip";
import { WholesaleTeaser } from "@/components/sections/WholesaleTeaser";
import { ProductGridSkeleton } from "@/components/sections/ProductSkeleton";
import { About } from "@/components/sections/About";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }) {
    const t = await getTranslations("hero");
    return {
        title: "Batela Foods — Saveurs du Cameroun",
        description: t("subtitle"),
    };
}

async function ProductGridFallback() {
    return (
        <div className="section-padding">
            <div className="container-max">
                <ProductGridSkeleton />
            </div>
        </div>
    );
}

import { unstable_setRequestLocale } from "next-intl/server";

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <main className="min-h-screen">
            <Hero />
            <About />
            <DeliveryStrip locale={locale} />

            <section id="shop">
                <Suspense fallback={<ProductGridFallback />}>
                    <ProductGrid locale={locale} />
                </Suspense>
            </section>

            <WholesaleTeaser locale={locale} />
        </main>
    );
}
