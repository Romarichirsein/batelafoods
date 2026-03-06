import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Facebook, Instagram, Youtube, MessageCircle, Share2, ArrowRight } from "lucide-react";

export default function SocialsPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = useTranslations("socials");

    const socialPlatforms = [
        {
            name: "Facebook",
            icon: Facebook,
            handle: "@batelafoods",
            description: t("platforms.facebook.description"),
            href: "https://facebook.com/batelafoods",
            color: "bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20 shadow-[#1877F2]/10"
        },
        {
            name: "Instagram",
            icon: Instagram,
            handle: "@batelafoods_officiel",
            description: t("platforms.instagram.description"),
            href: "https://instagram.com/batelafoods",
            color: "bg-[#E4405F]/10 text-[#E4405F] border-[#E4405F]/20 shadow-[#E4405F]/10"
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            handle: "+237 699 98 40 29",
            description: t("platforms.whatsapp.description"),
            href: "https://wa.me/237699984029",
            color: "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20 shadow-[#25D366]/10"
        }
    ];

    return (
        <main className="min-h-screen pt-24 pb-16 bg-background">
            <section className="py-20 bg-muted/30 border-b border-border mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-neon-red/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="container-max text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-red/30 bg-neon-red/5 text-neon-red text-[10px] font-black tracking-widest uppercase mb-6">
                        <Share2 className="w-4 h-4" />
                        {t("follow_us")}
                    </div>
                    <h1 className="font-heading font-black text-5xl md:text-7xl text-foreground mb-6 transition-all duration-700">
                        {t("title")} <span className="neon-text-red">{t("subtitle")}</span>
                    </h1>
                    <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {t("intro")}
                    </p>
                </div>
            </section>

            <section className="container-max pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {socialPlatforms.map((platform) => (
                        <a
                            key={platform.name}
                            href={platform.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex flex-col p-8 rounded-[32px] border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${platform.color}`}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <platform.icon size={48} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-500" />
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                    {t("join")}
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                            <div className="mt-auto">
                                <h3 className="font-heading font-black text-3xl mb-1">{platform.name}</h3>
                                <p className="font-heading font-bold text-sm opacity-80 mb-4">{platform.handle}</p>
                                <p className="font-body text-sm leading-relaxed opacity-70">
                                    {platform.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Newsletter/Action Section */}
            <section className="container-max px-4">
                <div className="bg-neon-red rounded-[40px] p-8 md:p-16 text-white text-center shadow-2xl shadow-neon-red/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                        <Facebook size={200} />
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="font-heading font-black text-3xl md:text-5xl">
                            {t("hashtag_title")}
                        </h2>
                        <p className="font-body text-lg opacity-90 leading-relaxed">
                            {t("hashtag_text", { hashtag: "#BatelaFoods" })}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
