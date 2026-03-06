"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
    const t = useTranslations("hero");
    const locale = useLocale();

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Hero Batela Foods"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-product.jpg"
                    alt="Batela Foods Featured Product"
                    fill
                    className="object-cover opacity-60 mix-blend-luminosity"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
            </div>

            {/* Neon grid background */}
            <div className="absolute inset-0 z-1 neon-grid-bg opacity-30" />

            {/* Neon glow orbs */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full
                   bg-neon-red/15 blur-[120px] pointer-events-none animate-float"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full
                   bg-neon-green/12 blur-[120px] pointer-events-none animate-float"
                style={{ animationDelay: '3s' }}
                aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 container-max section-padding text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                        border border-neon-red/40 bg-neon-red/10 text-neon-red text-sm sm:text-base
                        font-heading font-bold tracking-widest uppercase mb-8
                        animate-fade-in-up shadow-neon-red-sm">
                    {t("badge")}
                </div>

                {/* Main headline */}
                <h1
                    className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
                     text-foreground leading-tight mb-6 animate-fade-in-up
                     [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]"
                >
                    {t("tagline").split("\n").map((line: string, i: number) => (
                        <span key={i} className="block">
                            {i === 0 ? (
                                line
                            ) : (
                                <span className="neon-text-red">{line}</span>
                            )}
                        </span>
                    ))}
                </h1>

                {/* Subtitle */}
                <p
                    className="font-body text-muted-foreground text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto
                     mb-12 leading-relaxed animate-fade-in-up
                     [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]"
                >
                    {t("subtitle")}
                </p>

                {/* CTAs */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6
                     animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]"
                >
                    <Link
                        href={`/${locale}/contact`}
                        className="btn-neon-red inline-flex items-center gap-3 text-lg px-8 py-4 animate-neon-pulse-red"
                    >
                        {t("cta_order")}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href={`/${locale}#shop`}
                        className="btn-neon-green inline-flex items-center gap-3 text-lg px-8 py-4"
                    >
                        {t("cta_catalogue")}
                    </Link>
                </div>

                {/* Scroll indicator */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2
                     animate-bounce text-muted-foreground/50"
                    aria-hidden="true"
                >
                    <ChevronDown className="w-6 h-6" />
                </div>
            </div>
        </section>
    );
}
