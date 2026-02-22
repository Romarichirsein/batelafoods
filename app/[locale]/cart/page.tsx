"use client";

import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Package, Truck, Shield } from "lucide-react";

export const dynamic = "force-static";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();
    const t = useTranslations("cart");
    const tCard = useTranslations("product_card");
    const locale = useLocale() as "fr" | "en";

    const subtotal = getTotalPrice();
    const deliveryFee = subtotal >= 50000 ? 0 : 2500;
    const total = subtotal + deliveryFee;

    const handleCheckout = () => {
        if (items.length === 0) return;

        let message = "Bonjour Batela Foods ! Je souhaite passer une commande :\n\n";
        items.forEach(item => {
            const name = item.name?.[locale] ?? item.name?.fr ?? "Produit";
            message += `- ${item.quantity}x ${name} (${formatPrice(item.price * item.quantity)} FCFA)\n`;
        });

        message += `\nSous-total : ${formatPrice(subtotal)} FCFA`;
        message += `\nLivraison : ${deliveryFee === 0 ? "Gratuite" : formatPrice(deliveryFee) + " FCFA"}`;
        message += `\n*TOTAL : ${formatPrice(total)} FCFA*`;

        message += "\n\nMerci de m'indiquer la marche à suivre pour le paiement par WhatsApp et la livraison.";

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/237699984029?text=${encodedMessage}`, "_blank");
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container-max px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <Link
                        href={`/${locale}#shop`}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon-red transition-colors text-sm font-heading font-semibold uppercase tracking-widest mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continuer les achats
                    </Link>
                    <h1 className="font-heading font-black text-5xl lg:text-6xl text-foreground leading-tight">
                        {t("title")}{" "}
                        <span className="neon-text-red">({getTotalItems()})</span>
                    </h1>
                </div>

                {items.length === 0 ? (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center py-32 gap-8 text-center">
                        <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center border border-border">
                            <ShoppingBag className="w-14 h-14 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="font-heading font-black text-3xl text-foreground mb-2">{t("empty")}</p>
                            <p className="text-muted-foreground">{t("empty_subtitle")}</p>
                        </div>
                        <Link href={`/${locale}#shop`}>
                            <Button variant="neon" size="lg" className="shadow-neon-red font-black uppercase tracking-tighter h-12 px-8">
                                {t("shop_now")}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        {/* Items list */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => {
                                const name = item.name?.[locale] ?? item.name?.fr ?? "Produit";
                                const imageUrl = item.image
                                    ? urlFor(item.image).width(120).height(120).url()
                                    : null;
                                const lineTotal = item.price * item.quantity;

                                return (
                                    <div
                                        key={item._id}
                                        className="flex gap-5 p-5 rounded-2xl border border-border bg-card hover:border-neon-red/20 transition-all duration-300"
                                    >
                                        {/* Image */}
                                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted border border-border flex-shrink-0">
                                            {imageUrl ? (
                                                <Image src={imageUrl} alt={name} fill className="object-cover" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-white">
                                                    <Image src="/logo.png" alt="Batela Foods" fill className="object-contain opacity-30 p-4" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex flex-col flex-1 gap-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-heading font-black text-foreground text-lg leading-tight line-clamp-2">{name}</h3>
                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    className="text-muted-foreground hover:text-neon-red transition-colors p-1 flex-shrink-0"
                                                    aria-label={t("remove")}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <p className="text-neon-red font-heading font-black text-xl">
                                                {formatPrice(item.price)}{" "}
                                                <span className="text-xs font-normal text-muted-foreground">{tCard("price_unit")}</span>
                                            </p>

                                            <div className="flex items-center justify-between mt-auto">
                                                {/* Quantity control */}
                                                <div className="flex items-center border border-border rounded-xl overflow-hidden bg-muted/50">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        className="px-3 py-2 hover:bg-neon-red/10 border-r border-border transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="px-4 py-2 text-sm font-bold min-w-[40px] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        className="px-3 py-2 hover:bg-neon-red/10 border-l border-border transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                {/* Line total */}
                                                <span className="font-heading font-black text-foreground text-lg">
                                                    {formatPrice(lineTotal)} <span className="text-xs font-normal text-muted-foreground">{tCard("price_unit")}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="p-6 rounded-2xl border border-border bg-card sticky top-28">
                                <h2 className="font-heading font-black text-xl text-foreground mb-6 uppercase tracking-tighter">
                                    Récapitulatif
                                </h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Sous-total ({getTotalItems()} article{getTotalItems() > 1 ? "s" : ""})</span>
                                        <span className="font-heading font-bold">{formatPrice(subtotal)} {tCard("price_unit")}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Livraison</span>
                                        <span className={deliveryFee === 0 ? "text-neon-green font-bold" : "font-heading font-bold"}>
                                            {deliveryFee === 0 ? "GRATUITE" : `${formatPrice(deliveryFee)} ${tCard("price_unit")}`}
                                        </span>
                                    </div>
                                </div>

                                <Separator className="mb-4" />

                                <div className="flex items-center justify-between mb-6">
                                    <span className="font-heading font-black text-foreground uppercase tracking-tighter">TOTAL</span>
                                    <span className="font-heading font-black text-2xl neon-text-red">
                                        {formatPrice(total)} <span className="text-xs font-normal text-muted-foreground">{tCard("price_unit")}</span>
                                    </span>
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    variant="neon"
                                    className="w-full h-12 text-base font-black uppercase tracking-tighter shadow-neon-red"
                                >
                                    {t("checkout")} (WhatsApp)
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>

                                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed mt-3">
                                    Livraison gratuite à Douala dès 50 000 FCFA
                                </p>

                                {/* Trust badges */}
                                <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-2 text-center">
                                    {[
                                        { icon: Package, label: "Emballage sécurisé" },
                                        { icon: Truck, label: "Livraison rapide" },
                                        { icon: Shield, label: "Qualité garantie" },
                                    ].map(({ icon: Icon, label }) => (
                                        <div key={label} className="flex flex-col items-center gap-1">
                                            <Icon className="w-5 h-5 text-neon-red" />
                                            <span className="text-[9px] text-muted-foreground uppercase tracking-widest leading-tight">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
