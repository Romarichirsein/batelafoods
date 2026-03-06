import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { CheckCircle2, Award, Users, History, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = useTranslations("about");

    return (
        <main className="pt-24 pb-16">
            <section className="bg-muted/30 py-20 border-b border-border">
                <div className="container-max">
                    <div className="max-w-3xl">
                        <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-6">
                            {t("title")}
                        </h1>
                        <p className="font-body text-xl text-muted-foreground leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
            </section>

            {/* CEO Message Section */}
            <section className="section-padding bg-background">
                <div className="container-max">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-neon-red/10 animate-pulse" />
                            {/* Placeholder for CEO Image */}
                            <div className="absolute inset-0 flex items-center justify-center text-neon-red/20 font-heading font-black text-4xl uppercase tracking-tighter text-center px-12">
                                Dolvys NGOULE NANA
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-neon-red/10 text-neon-red text-sm font-bold uppercase tracking-widest">
                                {t("ceo_title")}
                            </div>
                            <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
                                <p className="font-heading font-bold text-2xl text-foreground mb-4">
                                    {t("ceo_greeting")}
                                </p>
                                <p>{t("ceo_p1")}</p>
                                <p>{t("ceo_p2")}</p>
                                <p>{t("ceo_p3")}</p>
                                <p className="font-bold text-foreground">{t("ceo_p4")}</p>
                            </div>
                            <div className="pt-6 border-t border-border">
                                <p className="font-heading font-black text-xl text-foreground uppercase tracking-tight">
                                    {t("ceo_name")}
                                </p>
                                <p className="text-neon-red font-bold uppercase text-xs tracking-widest">
                                    {t("ceo_role")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="section-padding bg-muted/20">
                <div className="container-max">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* History */}
                        <div className="bg-background p-8 rounded-3xl border border-border shadow-sm hover:border-neon-green/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-neon-green/10 text-neon-green flex items-center justify-center mb-6">
                                <History className="w-6 h-6" />
                            </div>
                            <h2 className="font-heading font-black text-xl mb-4 tracking-tighter uppercase">{t("history_title")}</h2>
                            <p className="font-body text-muted-foreground leading-relaxed text-sm">
                                {t("history_text")}
                            </p>
                        </div>

                        {/* Values */}
                        <div className="bg-background p-8 rounded-3xl border border-border shadow-sm hover:border-neon-red/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-neon-red/10 text-neon-red flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h2 className="font-heading font-black text-xl mb-4 tracking-tighter uppercase">{t("values_title")}</h2>
                            <p className="font-body text-muted-foreground leading-relaxed text-sm">
                                {t("values_text")}
                            </p>
                        </div>

                        {/* Team */}
                        <div className="bg-background p-8 rounded-3xl border border-border shadow-sm hover:border-blue-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h2 className="font-heading font-black text-xl mb-4 tracking-tighter uppercase">{t("team_title")}</h2>
                            <p className="font-body text-muted-foreground leading-relaxed text-sm">
                                {t("team_text")}
                            </p>
                        </div>

                        {/* Certifications */}
                        <div className="bg-background p-8 rounded-3xl border border-border shadow-sm hover:border-amber-500/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
                                <Award className="w-6 h-6" />
                            </div>
                            <h2 className="font-heading font-black text-xl mb-4 tracking-tighter uppercase">{t("certifications_title")}</h2>
                            <p className="font-body text-muted-foreground leading-relaxed text-sm">
                                {t("certifications_text")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recruitment Section */}
            <section className="section-padding bg-background border-t border-border relative overflow-hidden">
                <div className="container-max">
                    <div className="bg-muted/30 rounded-[40px] p-8 md:p-16 border border-border shadow-xl relative z-10 overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Users size={200} />
                        </div>
                        <div className="max-w-3xl space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-red/30 bg-neon-red/5 text-neon-red text-[10px] font-black tracking-widest uppercase mb-2">
                                🚀 Carrières
                            </div>
                            <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground">
                                {t("careers_title")}
                            </h2>
                            <p className="font-body text-lg text-muted-foreground leading-relaxed">
                                {t("careers_text")}
                            </p>
                            <div className="pt-4">
                                <Link
                                    href="/contact?subject=recrutement"
                                    className="btn-neon-red inline-flex items-center gap-3 h-14 px-10"
                                >
                                    {t("careers_cta")}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
