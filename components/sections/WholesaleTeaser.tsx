import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export async function WholesaleTeaser({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "wholesale" });

    const features = [
        t("feature1"),
        t("feature2"),
        t("feature3"),
    ];

    return (
        <section
            id="wholesale"
            className="section-padding bg-card border-t border-border"
            aria-labelledby="wholesale-heading"
        >
            <div className="container-max">
                <div className="relative overflow-hidden rounded-2xl border border-neon-green/20
                        bg-gradient-to-br from-background via-neon-green/5 to-background p-8 lg:p-14">
                    {/* Background glow */}
                    <div
                        className="absolute top-0 right-0 w-96 h-96 bg-neon-green/10
                       blur-[100px] rounded-full pointer-events-none"
                        aria-hidden="true"
                    />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left content */}
                        <div>
                            <span
                                className="inline-block px-4 py-1.5 rounded-full border border-neon-green/30
                           bg-neon-green/10 text-neon-green text-xs font-heading font-semibold
                           uppercase tracking-widest mb-6"
                            >
                                {t("badge")}
                            </span>
                            <h2
                                id="wholesale-heading"
                                className="font-heading font-black text-3xl lg:text-4xl xl:text-5xl
                           text-foreground mb-4 leading-tight"
                            >
                                {t("title")}
                            </h2>
                            <p className="font-body text-muted-foreground text-lg mb-8 leading-relaxed">
                                {t("subtitle")}
                            </p>

                            <Link
                                href={`/${locale}/contact?subject=wholesale`}
                                className="btn-neon-green inline-flex items-center gap-2 text-base"
                            >
                                {t("cta")}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Right features list */}
                        <div className="space-y-4">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-4 p-5 rounded-xl border border-border
                             bg-background/60 hover:border-neon-green/30
                             hover:shadow-neon-green-sm transition-all duration-300"
                                >
                                    <CheckCircle2 className="w-6 h-6 text-neon-green flex-shrink-0 mt-0.5" />
                                    <span className="font-body font-medium text-foreground">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
