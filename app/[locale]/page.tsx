import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { DeliveryStrip } from "@/components/sections/DeliveryStrip";
import { WholesaleTeaser } from "@/components/sections/WholesaleTeaser";
import { ProductGridSkeleton } from "@/components/sections/ProductSkeleton";
import { About } from "@/components/sections/About";
import { NewsTeaser } from "@/components/sections/NewsTeaser";
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
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <main className="min-h-screen bg-mesh">
            <Hero />
            
            <AnimatedSection>
                <About />
            </AnimatedSection>
            
            <DeliveryStrip locale={locale} />

            <AnimatedSection id="shop">
                <Suspense fallback={<ProductGridFallback />}>
                    <ProductGrid locale={locale} />
                </Suspense>
            </AnimatedSection>

            <AnimatedSection>
                <NewsTeaser locale={locale} />
            </AnimatedSection>

            <AnimatedSection>
                <WholesaleTeaser locale={locale} />
            </AnimatedSection>
        </main>
    );
}
