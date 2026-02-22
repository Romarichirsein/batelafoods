"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/store/useCart";
import type { Product } from "@/lib/sanity/types";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
    product: Product;
    min?: number;
    max?: number;
    initial?: number;
}

export function QuantitySelector({
    product,
    min = 1,
    max = 99,
    initial = 1,
}: QuantitySelectorProps) {
    const [qty, setQty] = useState(initial);
    const t = useTranslations("product_detail");
    const addItem = useCart((state) => state.addItem);

    const update = (newQty: number) => {
        const clamped = Math.min(Math.max(newQty, min), max);
        setQty(clamped);
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 w-full">
            <div className="flex items-center gap-0" role="group" aria-label={t("quantity")}>
                <button
                    onClick={() => update(qty - 1)}
                    disabled={qty <= min}
                    className="w-10 h-10 rounded-l-lg border border-border bg-muted
                     flex items-center justify-center hover:bg-neon-red/10
                     hover:border-neon-red/50 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-200"
                    aria-label="Diminuer"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <div
                    className="w-14 h-10 border-t border-b border-border bg-background
                     flex items-center justify-center font-heading font-bold text-lg"
                    aria-live="polite"
                    aria-label={`${t("quantity")}: ${qty}`}
                >
                    {qty}
                </div>
                <button
                    onClick={() => update(qty + 1)}
                    disabled={qty >= max}
                    className="w-10 h-10 rounded-r-lg border border-border bg-muted
                     flex items-center justify-center hover:bg-neon-red/10
                     hover:border-neon-red/50 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-200"
                    aria-label="Augmenter"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <Button
                onClick={() => addItem(product, qty)}
                className="btn-neon-red inline-flex items-center gap-2 flex-1 justify-center h-10 px-8"
                aria-label={t("add_to_cart")}
            >
                <ShoppingCart className="w-5 h-5" />
                {t("add_to_cart")}
            </Button>
        </div>
    );
}
