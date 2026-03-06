import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle, Loader2 } from "lucide-react";
import { Suspense } from "react";

export function generateStaticParams() {
    return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "contact" });
    return {
        title: t("title"),
        description: t("subtitle"),
    };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "contact" });

    return (
        <div className="min-h-screen pt-24 pb-16">
            {/* Hero header */}
            <div className="container-max px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-red/30 bg-neon-red/5 text-neon-red text-sm font-heading font-semibold tracking-wider uppercase mb-6">
                        {t("badge")}
                    </span>
                    <h1 className="font-heading font-black text-5xl lg:text-7xl text-foreground mb-4 leading-tight">
                        {t("title_prefix")}{" "}
                        <span className="neon-text-red">{t("title_highlight")}</span>
                    </h1>
                    <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>
            </div>

            <div className="container-max px-4 sm:px-6 lg:px-8">
                {/* Quick contact cards row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    {[
                        {
                            icon: Phone,
                            label: t("phone"),
                            value: "+237 699 98 40 29",
                            sub: "+237 677 11 65 25",
                            href: "tel:+237699984029",
                        },
                        {
                            icon: Mail,
                            label: t("email"),
                            value: "contact@batelafoods.com",
                            sub: "ngoule@yahoo.com",
                            href: "mailto:contact@batelafoods.com",
                        },
                        {
                            icon: MessageCircle,
                            label: t("whatsapp_label"),
                            value: "+237 699 98 40 29",
                            sub: t("whatsapp_status"),
                            href: "https://wa.me/237699984029",
                        },
                    ].map(({ icon: Icon, label, value, sub, href }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="group p-6 rounded-2xl border border-border bg-card hover:border-neon-red/40 hover:bg-card/80 transition-all duration-300 hover:shadow-neon-red-sm flex flex-col gap-3"
                        >
                            <div className="p-3 rounded-xl bg-neon-red/10 w-fit">
                                <Icon className="w-6 h-6 text-neon-red" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-heading uppercase tracking-widest mb-1">{label}</p>
                                <p className="font-heading font-bold text-foreground group-hover:text-neon-red transition-colors">{value}</p>
                                <p className="text-xs text-muted-foreground mt-1">{sub}</p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Main grid: form + info */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                    {/* Contact form */}
                    <div className="lg:col-span-3 p-8 rounded-2xl border border-border bg-card">
                        <h2 className="font-heading font-black text-2xl text-foreground mb-6">
                            {t("form_title")}
                        </h2>
                        <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-neon-red" /></div>}>
                            <ContactForm />
                        </Suspense>
                    </div>

                    {/* Info sidebar */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Location */}
                        <div className="p-6 rounded-2xl border border-border bg-card">
                            <MapPin className="w-6 h-6 text-neon-red mb-3" />
                            <h3 className="font-heading font-bold text-foreground mb-1">{t("address")}</h3>
                            <p className="text-muted-foreground text-sm">{t("address_value")}</p>
                        </div>

                        {/* Hours */}
                        <div className="p-6 rounded-2xl border border-border bg-card">
                            <Clock className="w-6 h-6 text-neon-red mb-3" />
                            <h3 className="font-heading font-bold text-foreground mb-1">{t("hours")}</h3>
                            <p className="text-muted-foreground text-sm">{t("hours_value")}</p>
                        </div>

                        {/* Social */}
                        <div className="p-6 rounded-2xl border border-border bg-card">
                            <h3 className="font-heading font-bold text-foreground mb-4">{t("socials_title")}</h3>
                            <div className="flex flex-col gap-3">
                                {[
                                    { icon: Instagram, label: "Instagram", href: "https://instagram.com/batelafoods" },
                                    { icon: Facebook, label: "Facebook", href: "https://facebook.com/batelafoods" },
                                ].map(({ icon: Icon, label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border
                                         hover:border-neon-red/40 hover:bg-neon-red/5 transition-all duration-200 text-muted-foreground hover:text-neon-red"
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-heading font-semibold text-sm">{label} @batelafoods</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Map section */}
                        <div className="p-0 rounded-2xl border border-border bg-card overflow-hidden">
                            <div className="p-6 border-b border-border">
                                <h3 className="font-heading font-bold text-foreground">{t("map_address_title")}</h3>
                                <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">{t("map_address_subtitle")}</p>
                            </div>
                            <div className="w-full h-[300px] bg-muted/20 relative group">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127357.54580396017!2d9.650153381483864!3d4.030467554906561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128be2e1fe6d%3A0x92daa1444781ca48!2sDouala!5e0!3m2!1sfr!2scm!4v1709468500000!5m2!1sfr!2scm"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                                ></iframe>
                                <div className="absolute inset-0 pointer-events-none border border-inset border-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
