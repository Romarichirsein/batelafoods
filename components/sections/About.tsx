"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export function About() {
    const t = useTranslations("about");

    return (
        <section className="section-padding bg-muted/30 border-y border-border">
            <div className="container-max">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Visual Side */}
                    <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-md bg-white flex items-center justify-center border border-border p-8">
                        <div className="absolute inset-0 bg-neon-green/5" />
                        <Image
                            src="/logo.png"
                            alt="Batela Foods"
                            width={350}
                            height={150}
                            className="object-contain relative z-10 opacity-90"
                        />
                    </div>

                    {/* Text / Message Side */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-red/20 bg-neon-red/5 text-neon-red text-sm font-heading font-bold tracking-widest uppercase mb-2">
                            {t("title")}
                        </div>
                        <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground leading-tight">
                            {t("subtitle")}
                        </h2>

                        <div className="bg-background p-6 lg:p-8 rounded-xl border border-border shadow-sm mt-6">
                            <h3 className="font-heading font-bold text-lg text-neon-green mb-3 flex items-center gap-2">
                                <span className="text-2xl">🌱</span> {t("promoter")}
                            </h3>
                            <p className="font-body text-muted-foreground leading-relaxed italic text-base sm:text-lg">
                                "{t("message")}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
