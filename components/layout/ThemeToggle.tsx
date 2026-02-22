"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const t = useTranslations("theme");
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <button className="p-2 rounded-lg hover:bg-muted transition-colors w-9 h-9" />
        );
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-muted transition-all duration-200
                 hover:shadow-neon-red-sm border border-transparent hover:border-neon-red/30"
            aria-label={t("toggle")}
            title={resolvedTheme === "dark" ? t("light") : t("dark")}
        >
            {resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
                <Moon className="w-5 h-5 text-slate-600" />
            )}
        </button>
    );
}
