import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";

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
                        📬 Contact
                    </span>
                    <h1 className="font-heading font-black text-5xl lg:text-7xl text-foreground mb-4 leading-tight">
                        Contact{" "}
                        <span className="neon-text-red">Batela Foods</span>
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
                            label: "WhatsApp",
                            value: "+237 699 98 40 29",
                            sub: "Chat disponible",
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
                            Envoyez un <span className="neon-text-red">Message</span>
                        </h2>
                        <ContactForm />
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
                            <h3 className="font-heading font-bold text-foreground mb-4">Réseaux sociaux</h3>
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

                        {/* Map placeholder */}
                        <div
                            className="w-full h-40 rounded-2xl border border-border bg-muted/40
                           flex flex-col items-center justify-center gap-2 text-muted-foreground
                           hover:border-neon-red/30 transition-all duration-200"
                        >
                            <MapPin className="w-8 h-8 text-neon-red/60" />
                            <p className="text-xs font-body text-center px-4">
                                Douala, Cameroun<br />
                                <span className="opacity-60">Google Maps à intégrer</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
