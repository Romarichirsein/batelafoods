"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Globe } from "lucide-react";

export function LanguageToggle() {
    const currentLocale = useLocale();
    const pathname = usePathname();
    const t = useTranslations("language");

    const nextLocale = currentLocale === "fr" ? "en" : "fr";

    return (
        <Link
            href={pathname}
            locale={nextLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                 hover:bg-muted transition-all duration-200 border border-transparent
                 hover:border-neon-green/30 hover:text-neon-green hover:shadow-neon-green-sm
                 text-muted-foreground group"
            aria-label={t("toggle")}
            title={t("toggle")}
        >
            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="uppercase font-heading font-semibold tracking-wide">
                {nextLocale}
            </span>
        </Link>
    );
}
