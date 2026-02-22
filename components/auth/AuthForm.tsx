"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

export function AuthForm({ type }: { type: "login" | "register" }) {
    const t = useTranslations(type === "login" ? "login" : "register");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-md mx-auto bg-card rounded-2xl p-8 border border-border shadow-neon-red-sm relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-neon-red/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 mb-8 border-l-4 border-neon-red pl-4">
                <h1 className="font-heading font-black text-4xl text-foreground mb-2">
                    {t("title")}
                </h1>
                <p className="text-muted-foreground font-body">
                    {t("subtitle")}
                </p>
            </div>

            {/* Form */}
            <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                {type === "register" && (
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">
                            {t("name_label")}
                        </label>
                        <input
                            type="text"
                            className="w-full bg-background border border-border rounded-lg px-4 py-3 placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon-red focus:ring-1 focus:ring-neon-red transition-all"
                            placeholder={t("name_placeholder")}
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                        {t("email_label")}
                    </label>
                    <input
                        type="email"
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon-red focus:ring-1 focus:ring-neon-red transition-all"
                        placeholder="jean@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground">
                            {t("password_label")}
                        </label>
                        {type === "login" && (
                            <Link href="/forgot-password" className="text-sm text-neon-red hover:text-neon-red-dark font-medium transition-colors">
                                {t("forgot_password")}
                            </Link>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-background border border-border rounded-lg px-4 py-3 placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon-red focus:ring-1 focus:ring-neon-red transition-all"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {type === "login" && (
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" className="rounded border-border text-neon-red focus:ring-neon-red" />
                        <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                            {t("remember_me")}
                        </label>
                    </div>
                )}

                <button type="submit" className="w-full bg-neon-red text-white font-bold py-3.5 rounded-lg hover:bg-neon-red-dark hover:shadow-neon-red-sm transition-all active:scale-[0.98] flex justify-center items-center gap-2 uppercase tracking-wide">
                    {type === "login" ? t("btn_login") : t("btn_register")}
                </button>
            </form>

            <div className="mt-8 relative z-10 text-center">
                <p className="text-sm text-muted-foreground">
                    {type === "login" ? (
                        <>
                            {t("no_account")} <Link href="/register" className="text-neon-red font-bold hover:underline">{t("register_link")}</Link>
                        </>
                    ) : (
                        <>
                            {t("has_account")} <Link href="/login" className="text-neon-red font-bold hover:underline">{t("login_link")}</Link>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
