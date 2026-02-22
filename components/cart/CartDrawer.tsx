"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } =
        useCart();
    const t = useTranslations("cart");
    const tCommon = useTranslations("product_card");
    const locale = useLocale() as "fr" | "en";
    const [open, setOpen] = React.useState(false);

    const subtotal = getTotalPrice();
    const deliveryFee = subtotal >= 50000 ? 0 : 2500;
    const total = subtotal + (subtotal > 0 ? deliveryFee : 0);

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
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
                <button
                    className="relative p-2 rounded-full hover:bg-muted transition-all duration-200 border border-transparent hover:border-neon-red/30 group"
                    aria-label={t("title")}
                >
                    <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-neon-red transition-colors" />
                    {getTotalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-neon-red text-white text-[10px] font-bold flex items-center justify-center shadow-neon-red animate-in zoom-in">
                            {getTotalItems()}
                        </span>
                    )}
                </button>
            </DialogPrimitive.Trigger>

            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-[101] h-full w-full max-w-sm border-l border-border bg-background shadow-2xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
                    <div className="flex h-full flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 pb-4">
                            <h2 className="font-heading font-black text-2xl uppercase tracking-tighter">
                                {t("title")}{" "}
                                <span className="neon-text-red">({getTotalItems()})</span>
                            </h2>
                            <DialogPrimitive.Close asChild>
                                <button className="rounded-full p-2 hover:bg-muted transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </DialogPrimitive.Close>
                        </div>

                        <Separator />

                        {/* List */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                                        <ShoppingCart className="w-10 h-10 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-lg">{t("empty")}</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {t("empty_subtitle")}
                                        </p>
                                    </div>
                                    <Button
                                        variant="neonOutline"
                                        onClick={() => setOpen(false)}
                                        className="mt-4"
                                    >
                                        {t("shop_now")}
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {items.map((item) => {
                                        const name = item.name?.[locale] ?? item.name?.fr;
                                        const imageUrl = item.image
                                            ? urlFor(item.image).width(100).height(100).url()
                                            : null;

                                        return (
                                            <div
                                                key={item._id}
                                                className="flex gap-4 animate-in slide-in-from-bottom-2"
                                            >
                                                {/* Image */}
                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0">
                                                    {imageUrl ? (
                                                        <Image
                                                            src={imageUrl}
                                                            alt={name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-white">
                                                            <Image src="/logo.png" alt="Batela Foods" fill className="object-contain opacity-30 p-2" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Details */}
                                                <div className="flex flex-col flex-1 gap-1">
                                                    <h3 className="text-sm font-heading font-black line-clamp-1">
                                                        {name}
                                                    </h3>
                                                    <p className="text-neon-red font-heading font-black text-sm">
                                                        {formatPrice(item.price)}{" "}
                                                        <span className="text-[10px] font-normal text-muted-foreground">
                                                            {tCommon("price_unit")}
                                                        </span>
                                                    </p>

                                                    {/* Controls */}
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center border border-border rounded-md overflow-hidden bg-muted/50">
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(item._id, item.quantity - 1)
                                                                }
                                                                className="px-2 py-1 hover:bg-neon-red/10 border-r border-border"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="px-3 py-1 text-xs font-bold min-w-[30px] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(item._id, item.quantity + 1)
                                                                }
                                                                className="px-2 py-1 hover:bg-neon-red/10 border-l border-border"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item._id)}
                                                            className="text-muted-foreground hover:text-neon-red transition-colors p-1"
                                                            aria-label={t("remove")}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-muted/30 border-t border-border space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-heading font-bold uppercase text-muted-foreground tracking-wider">
                                        {t("total")}
                                    </span>
                                    <span className="font-heading font-black text-2xl neon-text-red">
                                        {formatPrice(getTotalPrice())}{" "}
                                        <span className="text-xs font-normal text-muted-foreground uppercase">
                                            {tCommon("price_unit")}
                                        </span>
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
                                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                                    Livraison gratuite à Douala <br /> dès 50,000 FCFA
                                </p>
                            </div>
                        )}
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
