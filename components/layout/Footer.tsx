"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
    const t = useTranslations("footer");
    const tNav = useTranslations("nav");
    const tContact = useTranslations("contact");

    const navLinks = [
        { href: "/", label: tNav("home") },
        { href: "/#shop", label: tNav("shop") },
        { href: "/contact", label: tNav("contact") },
    ];

    return (
        <footer className="bg-card border-t border-border">
            {/* Main footer */}
            <div className="container-max py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex flex-col mb-4">
                            <Image
                                src="/logo.png"
                                alt="Batela Foods"
                                width={140}
                                height={60}
                                className="object-contain"
                            />
                        </Link>
                        <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-xs">
                            {t("about_text")}
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-3 mt-6">
                            <span className="text-xs text-muted-foreground uppercase tracking-widest font-heading">
                                {t("contact_title")}
                            </span>
                            <div className="flex gap-2">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-muted hover:bg-neon-red hover:text-white
                             transition-all duration-200 hover:shadow-neon-red-sm text-muted-foreground"
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-muted hover:bg-neon-red hover:text-white
                             transition-all duration-200 hover:shadow-neon-red-sm text-muted-foreground"
                                >
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://wa.me/237690000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-muted hover:bg-neon-green hover:text-white
                             transition-all duration-200 hover:shadow-neon-green-sm text-muted-foreground"
                                >
                                    <Phone className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-4 text-foreground">
                            {t("nav_title")}
                        </h3>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-body text-sm text-muted-foreground hover:text-neon-red
                               transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest mb-4 text-foreground">
                            {tContact("info_title")}
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4 mt-0.5 text-neon-red flex-shrink-0" />
                                <a href="tel:+237699984029" className="hover:text-neon-red transition-colors">+237 699 98 40 29</a>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4 mt-0.5 text-neon-red flex-shrink-0" />
                                <a href="tel:+237677116525" className="hover:text-neon-red transition-colors">+237 677 11 65 25</a>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 mt-0.5 text-neon-red flex-shrink-0" />
                                <a href="mailto:contact@batelafoods.com" className="hover:text-neon-red transition-colors">contact@batelafoods.com</a>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 mt-0.5 text-neon-red flex-shrink-0" />
                                <span>Douala, Bonamoussadi</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-border">
                <div className="container-max py-4 flex flex-col sm:flex-row
                        items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">{t("rights")}</p>
                    <p className="text-xs text-muted-foreground">{t("made_in")}</p>
                </div>
            </div>
        </footer>
    );
}
