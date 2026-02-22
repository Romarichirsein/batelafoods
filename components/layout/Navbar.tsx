"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, User } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartDrawer } from "@/components/cart/CartDrawer";

const navLinks = [
    { href: "/", key: "home" },
    { href: "/#shop", key: "shop" },
    { href: "/wholesale", key: "wholesale" },
    { href: "/blog", key: "blog" },
    { href: "/contact", key: "contact" },
];


export function Navbar() {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-background/80 backdrop-blur-md border-b border-border py-2 shadow-neon-red-sm"
                : "bg-transparent py-4"
                }`}
        >
            <div className="container-max flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-0 group focus-visible:outline-none"
                >
                    <Image
                        src="/logo.png"
                        alt="Batela Foods"
                        width={140}
                        height={60}
                        className="object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    <div className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                href={link.href}
                                className={`px-4 py-2 font-heading font-bold text-sm transition-all duration-200
                           rounded-md hover:bg-neon-red/5 hover:text-neon-red
                           ${pathname === link.href
                                        ? "text-neon-red"
                                        : "text-muted-foreground"
                                    }`}
                            >
                                {t(link.key)}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 pl-4 border-l border-border">
                        <div className="flex items-center gap-1">
                            <ThemeToggle />
                            <LanguageToggle />
                        </div>
                        <Link
                            href="/login"
                            className="p-2 rounded-full hover:bg-muted transition-all duration-200 border border-transparent hover:border-neon-red/30 group"
                            aria-label="Mon compte"
                        >
                            <User className="w-5 h-5 text-foreground group-hover:text-neon-red transition-colors" />
                        </Link>
                        <CartDrawer />
                    </div>
                </div>

                {/* Mobile Actions Overlay Trigger */}
                <div className="lg:hidden flex items-center gap-2">
                    <Link
                        href="/login"
                        className="p-2 rounded-full hover:bg-muted transition-colors hover:text-neon-red"
                        aria-label="Mon compte"
                    >
                        <User className="w-5 h-5" />
                    </Link>
                    <CartDrawer />
                    <button
                        className="p-2 text-foreground focus-visible:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Fermer" : "Menu"}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 top-[60px] bg-background/95 backdrop-blur-lg
                   transition-all duration-300 transform ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col p-6 space-y-4 h-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.key}
                            href={link.href}
                            className={`text-2xl font-heading font-black transition-colors ${pathname === link.href ? "text-neon-red" : "text-foreground"
                                }`}
                        >
                            {t(link.key)}
                        </Link>
                    ))}

                    {/* Mobile Actions Section */}
                    <div className="flex flex-col gap-4 mt-auto pb-12">
                        <div className="flex items-center justify-between px-2">
                            <span className="text-sm font-heading font-medium text-muted-foreground uppercase tracking-widest">
                                {t("settings")}
                            </span>
                            <div className="flex items-center gap-2">
                                <ThemeToggle />
                                <LanguageToggle />
                            </div>
                        </div>
                        <Separator />
                        <Link href="/#shop" className="w-full">
                            <Button variant="neon" className="w-full h-12 shadow-neon-red font-black uppercase text-base">
                                {t("cta_order")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
