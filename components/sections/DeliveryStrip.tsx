import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Truck } from "lucide-react";

export async function DeliveryStrip({ locale }: { locale: string }) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "delivery" });

    return (
        <div className="bg-[#0a0a0a] py-3 overflow-hidden border-y border-white/5 relative group">
            <div className="absolute inset-0 bg-neon-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="container-max relative z-10">
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-2 text-center">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-neon-red animate-pulse" />
                        <span className="text-white font-heading font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                            {t("title")}
                        </span>
                    </div>
                    <div className="hidden md:block w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-3">
                        <Truck className="w-4 h-4 text-neon-green" />
                        <span className="text-white/80 font-body text-xs md:text-sm tracking-wide">
                            {t("subtitle")}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-2 py-0.5 rounded border border-white/20 text-[9px] font-black uppercase tracking-widest text-white/40">
                            {t("badge")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
