"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Package, Truck, Star, Users, Building2, ChefHat, ShoppingBag, TrendingDown, Phone, Mail, MessageCircle } from "lucide-react";

export const dynamic = "force-static";

export default function WholesalePage() {
    const tiers = [
        {
            label: "Démarrage",
            min: "50 000",
            max: "200 000",
            discount: "5%",
            color: "border-border",
        },
        {
            label: "Partenaire",
            min: "200 000",
            max: "500 000",
            discount: "10%",
            color: "border-neon-red/50",
            featured: true,
        },
        {
            label: "Distributeur",
            min: "500 000+",
            max: null,
            discount: "20%",
            color: "border-neon-green/50",
        },
    ];

    const profiles = [
        { icon: ChefHat, label: "Restaurants & Traiteurs" },
        { icon: ShoppingBag, label: "Points de vente" },
        { icon: Building2, label: "Supermarchés" },
        { icon: Users, label: "Groupements d'achat" },
    ];

    const products = [
        { emoji: "🌽", name: "Farine de Maïs Premium", weight: "50 kg", price: "25 000 FCFA" },
        { emoji: "🥜", name: "Pâte d'Arachide", weight: "20 kg", price: "18 000 FCFA" },
        { emoji: "🍅", name: "Concentré de Tomate", weight: "25 kg", price: "22 000 FCFA" },
        { emoji: "🌿", name: "Épices Camerounaises", weight: "10 kg", price: "15 000 FCFA" },
    ];

    return (
        <div className="min-h-screen pt-24 pb-20">
            {/* Hero */}
            <div className="container-max px-4 sm:px-6 lg:px-8 mb-20">
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/5 text-neon-green text-sm font-heading font-semibold tracking-wider uppercase mb-6">
                        🏭 Vente en Gros
                    </span>
                    <h1 className="font-heading font-black text-5xl lg:text-7xl text-foreground mb-6 leading-tight">
                        Batela <span className="neon-text-red">Wholesale</span>
                    </h1>
                    <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                        Approvisionnez votre restaurant ou point de vente avec les meilleurs produits camerounais. Tarifs préférentiels sur les volumes, qualité garantie.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a href="#request">
                            <Button variant="neon" size="lg" className="shadow-neon-red font-black uppercase tracking-tighter h-12 px-8">
                                Demander un devis
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </a>
                        <a href="tel:+237600000000">
                            <Button variant="neonOutline" size="lg" className="font-black uppercase tracking-tighter h-12 px-8">
                                Nous appeler
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Key benefits */}
            <div className="container-max px-4 sm:px-6 lg:px-8 mb-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        { icon: Package, title: "Approvisionnement régulier", sub: "Stock disponible toute l'année" },
                        { icon: Star, title: "Qualité premium garantie", sub: "Sélection rigoureuse à la source" },
                        { icon: TrendingDown, title: "Tarification dégressive", sub: "Plus vous commandez, moins vous payez" },
                    ].map(({ icon: Icon, title, sub }) => (
                        <div key={title} className="p-6 rounded-2xl border border-border bg-card hover:border-neon-red/30 transition-all duration-300 group">
                            <div className="p-3 rounded-xl bg-neon-red/10 w-fit mb-4 group-hover:bg-neon-red/20 transition-colors">
                                <Icon className="w-6 h-6 text-neon-red" />
                            </div>
                            <h3 className="font-heading font-black text-foreground text-lg mb-1">{title}</h3>
                            <p className="text-muted-foreground text-sm">{sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Who it's for */}
            <div className="container-max px-4 sm:px-6 lg:px-8 mb-20">
                <div className="text-center mb-10">
                    <h2 className="font-heading font-black text-4xl text-foreground mb-3">
                        Pour qui est ce <span className="neon-text-red">programme</span> ?
                    </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {profiles.map(({ icon: Icon, label }) => (
                        <div key={label} className="p-6 rounded-2xl border border-border bg-card text-center hover:border-neon-green/40 transition-all duration-300 group">
                            <Icon className="w-10 h-10 text-neon-green mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                            <p className="font-heading font-bold text-foreground text-sm">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing tiers */}
            <div className="container-max px-4 sm:px-6 lg:px-8 mb-20">
                <div className="text-center mb-12">
                    <h2 className="font-heading font-black text-4xl text-foreground mb-3">
                        Grille <span className="neon-text-red">tarifaire</span>
                    </h2>
                    <p className="text-muted-foreground">Réductions automatiques selon votre volume de commande</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiers.map(({ label, min, max, discount, color, featured }) => (
                        <div
                            key={label}
                            className={`relative p-8 rounded-2xl border-2 ${color} bg-card transition-all duration-300 hover:scale-[1.02] ${featured ? "shadow-neon-red" : ""}`}
                        >
                            {featured && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-red text-white text-[10px] font-heading font-black px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                                    Le plus populaire
                                </div>
                            )}
                            <h3 className="font-heading font-black text-foreground text-xl mb-2">{label}</h3>
                            <p className="text-muted-foreground text-sm mb-6">
                                {min} FCFA{max ? ` — ${max} FCFA` : "+"}
                            </p>
                            <div className="text-center mb-6">
                                <span className="font-heading font-black text-5xl neon-text-red">{discount}</span>
                                <br />
                                <span className="text-muted-foreground text-sm uppercase tracking-widest">de réduction</span>
                            </div>
                            <ul className="space-y-2">
                                {["Livraison en 48h", "Suivi de commande", "Support dédié"].map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-neon-green flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured bulk products */}
            <div className="container-max px-4 sm:px-6 lg:px-8 mb-20">
                <div className="text-center mb-12">
                    <h2 className="font-heading font-black text-4xl text-foreground mb-3">
                        Produits <span className="neon-text-red">disponibles en gros</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map(({ emoji, name, weight, price }) => (
                        <div key={name} className="p-5 rounded-2xl border border-border bg-card hover:border-neon-red/30 transition-all duration-300">
                            <div className="text-4xl mb-4">{emoji}</div>
                            <h3 className="font-heading font-bold text-foreground mb-1 text-sm">{name}</h3>
                            <p className="text-muted-foreground text-xs mb-2">{weight}</p>
                            <p className="font-heading font-black text-neon-red text-lg">{price}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Request form */}
            <div id="request" className="container-max px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto p-8 rounded-3xl border border-border bg-card">
                    <h2 className="font-heading font-black text-3xl text-foreground mb-2">
                        Demander un <span className="neon-text-red">accès grossiste</span>
                    </h2>
                    <p className="text-muted-foreground text-sm mb-8">Notre équipe vous contactera sous 24h ouvrables</p>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-heading font-semibold text-foreground uppercase tracking-widest" htmlFor="ws-name">Nom / Entreprise *</label>
                                <input id="ws-name" type="text" className="w-full h-11 px-4 rounded-xl border border-border bg-muted text-foreground focus:border-neon-red outline-none transition-colors text-sm" placeholder="Restaurant La Saveur" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-heading font-semibold text-foreground uppercase tracking-widest" htmlFor="ws-type">Type de structure *</label>
                                <select id="ws-type" className="w-full h-11 px-4 rounded-xl border border-border bg-muted text-foreground focus:border-neon-red outline-none transition-colors text-sm">
                                    <option value="">Choisir…</option>
                                    <option>Restaurant / Traiteur</option>
                                    <option>Épicerie / Supermarché</option>
                                    <option>Grossiste</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-heading font-semibold text-foreground uppercase tracking-widest" htmlFor="ws-email">Email *</label>
                                <input id="ws-email" type="email" className="w-full h-11 px-4 rounded-xl border border-border bg-muted text-foreground focus:border-neon-red outline-none transition-colors text-sm" placeholder="contact@restaurant.cm" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-heading font-semibold text-foreground uppercase tracking-widest" htmlFor="ws-phone">Téléphone *</label>
                                <input id="ws-phone" type="tel" className="w-full h-11 px-4 rounded-xl border border-border bg-muted text-foreground focus:border-neon-red outline-none transition-colors text-sm" placeholder="+237 6XX XXX XXX" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-heading font-semibold text-foreground uppercase tracking-widest" htmlFor="ws-volume">Volume mensuel estimé (FCFA)</label>
                            <select id="ws-volume" className="w-full h-11 px-4 rounded-xl border border-border bg-muted text-foreground focus:border-neon-red outline-none transition-colors text-sm">
                                <option value="">Choisir…</option>
                                <option>Moins de 50 000 FCFA</option>
                                <option>50 000 – 200 000 FCFA</option>
                                <option>200 000 – 500 000 FCFA</option>
                                <option>Plus de 500 000 FCFA</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-heading font-semibold text-foreground uppercase tracking-widest" htmlFor="ws-msg">Message (optionnel)</label>
                            <textarea id="ws-msg" rows={3} className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-foreground focus:border-neon-red outline-none transition-colors text-sm resize-none" placeholder="Produits spécifiques, besoins particuliers…" />
                        </div>

                        <Button type="submit" variant="neon" className="w-full h-12 text-base font-black uppercase tracking-tighter shadow-neon-red">
                            Envoyer ma demande
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </form>

                    {/* Quick contact */}
                    <div className="mt-6 pt-6 border-t border-border flex flex-wrap justify-center gap-4">
                        <a href="tel:+237600000000" className="flex items-center gap-2 text-muted-foreground hover:text-neon-red text-sm font-heading font-semibold transition-colors">
                            <Phone className="w-4 h-4" /> (+237) 6XX XXX XXX
                        </a>
                        <a href="mailto:pro@batelafoods.cm" className="flex items-center gap-2 text-muted-foreground hover:text-neon-red text-sm font-heading font-semibold transition-colors">
                            <Mail className="w-4 h-4" /> pro@batelafoods.cm
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
