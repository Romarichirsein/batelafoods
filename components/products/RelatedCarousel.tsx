"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/sections/ProductCard";
import type { Product } from "@/lib/sanity/types";
import { useTranslations } from "next-intl";
import { getAllProducts } from "@/lib/sanity/queries";

interface RelatedCarouselProps {
    currentSlug: string;
}

export function RelatedCarousel({ currentSlug }: RelatedCarouselProps) {
    const t = useTranslations("product_detail");
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
    const [products, setProducts] = useState<Product[]>([]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        getAllProducts()
            .then((all) => setProducts(all.filter((p) => p.slug?.current !== currentSlug).slice(0, 6)))
            .catch(() => setProducts([]));
    }, [currentSlug]);

    if (!products.length) return null;

    return (
        <section
            className="section-padding border-t border-border"
            aria-labelledby="related-heading"
        >
            <div className="container-max">
                <div className="flex items-center justify-between mb-8">
                    <h2
                        id="related-heading"
                        className="font-heading font-black text-2xl lg:text-3xl text-foreground"
                    >
                        {t("related")}
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={scrollPrev}
                            className="p-2 rounded-lg border border-border hover:border-neon-red/50
                         hover:bg-neon-red/10 transition-all duration-200"
                            aria-label="Précédent"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="p-2 rounded-lg border border-border hover:border-neon-red/50
                         hover:bg-neon-red/10 transition-all duration-200"
                            aria-label="Suivant"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="flex-none w-[280px] sm:w-[320px]"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
