"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
    const t = useTranslations("hero");
    const locale = useLocale();

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Hero Batela Foods"
        >
            {/* Background Image with Premium Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-product.jpg"
                    alt="Batela Foods Featured Product"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Multi-layer gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
            </div>

            {/* Animated glow orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-red/10 blur-[150px] pointer-events-none"
                animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-green/10 blur-[150px] pointer-events-none"
                animate={{ y: [20, -20, 20], x: [10, -10, 10], scale: [1.1, 1, 1.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 container-max section-padding text-center">
                {/* Premium badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                        border border-white/20 bg-white/10 backdrop-blur-md
                        text-white text-sm sm:text-base
                        font-heading font-bold tracking-widest uppercase mb-8
                        shadow-glass"
                >
                    <Sparkles className="w-4 h-4 text-gold" />
                    {t("badge")}
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
                     text-white leading-[1.05] mb-6 drop-shadow-lg"
                >
                    {t("tagline").split("\n").map((line: string, i: number) => (
                        <span key={i} className="block">
                            {i === 0 ? (
                                line
                            ) : (
                                <span className="text-gradient-red inline-block">
                                    {line}
                                </span>
                            )}
                        </span>
                    ))}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="font-body text-white/80 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto
                     mb-12 leading-relaxed"
                >
                    {t("subtitle")}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        href={`/${locale}/contact`}
                        className="btn-neon-red inline-flex items-center gap-3 text-lg px-10 py-4
                                   shadow-neon-red hover:shadow-[0_8px_40px_rgba(191,14,21,0.5)]
                                   transition-all duration-300"
                    >
                        {t("cta_order")}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href={`/${locale}#shop`}
                        className="inline-flex items-center gap-3 text-lg px-10 py-4 rounded-full
                                   border-2 border-white/30 text-white font-heading font-semibold
                                   backdrop-blur-md bg-white/5
                                   hover:bg-white/15 hover:border-white/50
                                   hover:-translate-y-1 transition-all duration-300"
                    >
                        {t("cta_catalogue")}
                    </Link>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    aria-hidden="true"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Scroll</span>
                        <ChevronDown className="w-5 h-5 text-white/40" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
