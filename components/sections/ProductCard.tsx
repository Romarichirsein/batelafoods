"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { urlFor } from "@/lib/sanity/client";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/sanity/types";
import { ArrowRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/store/useCart";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const t = useTranslations("product_card");
    const locale = useLocale() as "fr" | "en";
    const addItem = useCart((state) => state.addItem);

    const productName = product.name?.[locale] ?? product.name?.fr ?? "Produit";
    const imageUrl = product.image
        ? urlFor(product.image).width(400).height(300).fit("crop").url()
        : null;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        toast.success(`${productName} ajouté au panier`, {
            description: "Vous pouvez finaliser votre commande dans le panier.",
        });
    };

    return (
        <article className="card-neon group overflow-hidden flex flex-col">
            {/* Product image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={productName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <Image src="/logo.png" alt="Batela Foods" fill className="object-contain opacity-30 p-8" />
                    </div>
                )}
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                    <Badge
                        variant={product.category === "animal" ? "neon" : "neonGreen"}
                        className="font-heading uppercase tracking-wider backdrop-blur-md shadow-sm border-2"
                    >
                        {product.category === "animal" ? "🥩" : "🌱"}{" "}
                        {product.subcategory ?? product.category}
                    </Badge>
                </div>
            </div>

            {/* Card body */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 line-clamp-2">
                    {productName}
                </h3>
                <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-heading font-black text-2xl neon-text-red">
                        {formatPrice(product.price)}{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                            {t("price_unit")}
                        </span>
                    </span>

                    <div className="flex items-center gap-2">
                        <Link
                            href={`/products/${product.slug?.current}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold
                         text-neon-green hover:gap-2.5 transition-all duration-200
                         hover:text-neon-green-dark"
                            aria-label={`${t("view_details")} — ${productName}`}
                        >
                            {t("view_details")}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-9 w-9 border-neon-red/30 hover:border-neon-red hover:bg-neon-red/10 group rounded-full"
                            onClick={handleAddToCart}
                        >
                            <Plus className="w-4 h-4 group-hover:text-neon-red group-hover:scale-125 transition-all" />
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
