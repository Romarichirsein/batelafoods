import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock, Users, ChefHat } from "lucide-react";

export default function RecipesPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = useTranslations("recipes");

    // Mock recipes data
    const recipes = [
        {
            id: 1,
            title: t("recipe1_title"),
            time: "20 min",
            serves: "4 pers",
            image: "🍳",
            tag: "Express"
        },
        {
            id: 2,
            title: t("recipe2_title"),
            time: "45 min",
            serves: "6 pers",
            image: "🥘",
            tag: "Tradition"
        },
        {
            id: 3,
            title: t("recipe3_title"),
            time: "15 min",
            serves: "4 pers",
            image: "🌭",
            tag: "Kids"
        },
        {
            id: 4,
            title: t("recipe4_title"),
            time: "25 min",
            serves: "4 pers",
            image: "🍚",
            tag: "Quick"
        }
    ];

    return (
        <main className="pt-24 pb-16 bg-background">
            <section className="bg-muted/30 py-24 border-b border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-neon-red/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="container-max relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-red/30 bg-neon-red/5 text-neon-red text-xs font-heading font-black tracking-widest uppercase mb-6">
                            🍴 Savoir-Faire Culinaire
                        </div>
                        <h1 className="font-heading font-black text-5xl md:text-7xl text-foreground mb-8">
                            {t("title")}
                        </h1>
                        <p className="font-body text-xl text-muted-foreground leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Recipes Grid */}
            <section className="section-padding">
                <div className="container-max">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="group cursor-pointer">
                                <div className="aspect-[16/10] rounded-[40px] bg-muted flex items-center justify-center text-7xl mb-8 border border-border group-hover:border-neon-red/30 transition-all duration-500 overflow-hidden relative shadow-sm hover:shadow-neon-red-sm">
                                    <div className="absolute inset-0 bg-neon-red/5 group-hover:bg-neon-red/10 transition-colors" />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-[10px] font-black uppercase tracking-widest">
                                            {recipe.tag}
                                        </span>
                                    </div>
                                    <span className="transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                                        {recipe.image}
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-neon-red" /> {recipe.time}</span>
                                        <span className="flex items-center gap-2"><Users className="w-4 h-4 text-neon-green" /> {recipe.serves}</span>
                                    </div>
                                    <h3 className="font-heading font-black text-2xl group-hover:text-neon-red transition-colors duration-300">{recipe.title}</h3>
                                    <div className="flex items-center text-neon-red font-black text-xs tracking-widest uppercase border-b border-transparent group-hover:border-neon-red w-fit pb-1 transition-all">
                                        Découvrir la recette
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Monthly Menu Section - Premium Kids Focus */}
            <section className="section-padding bg-muted/20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-neon-green/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="container-max">
                    <div className="bg-background rounded-[48px] p-8 md:p-20 border border-border shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-neon-green">
                            <ChefHat size={300} strokeWidth={1} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/5 text-neon-green text-[10px] font-black tracking-widest uppercase mb-2">
                                    👶 {t("monthly_menu")}
                                </div>
                                <h2 className="font-heading font-black text-4xl md:text-5xl leading-tight">
                                    {t("kids_menu_title")}
                                </h2>
                                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                                    {t("kids_menu_subtitle")}
                                </p>
                                <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                                    <a
                                        href="https://facebook.com/batelafoods"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-neon-red w-full sm:w-auto h-16 inline-flex items-center justify-center px-10 animate-neon-pulse-red"
                                    >
                                        Suivre sur Facebook
                                    </a>
                                    <span className="text-sm text-muted-foreground italic font-medium">
                                        {t("facebook_hint")}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-muted/30 rounded-[32px] p-8 border border-border relative">
                                <div className="absolute -top-4 -right-4 bg-neon-red text-white p-4 rounded-2xl shadow-neon-red-sm transform rotate-12 font-heading font-black text-xs tracking-widest uppercase">
                                    Mars 2024
                                </div>
                                <h4 className="font-heading font-black text-xl mb-6 uppercase tracking-wider text-neon-green">Au menu ce mois-ci</h4>
                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-neon-red/10 text-neon-red flex items-center justify-center font-black text-xs shrink-0 mt-1">S1</div>
                                        <p className="font-body text-foreground font-medium">Lundi : Mini saucisses grillées & purée de patates douces.</p>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-neon-green/10 text-neon-green flex items-center justify-center font-black text-xs shrink-0 mt-1">S2</div>
                                        <p className="font-body text-foreground font-medium">Jeudi : Riz aux lanières de jambon fumé & petits pois.</p>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-neon-red/10 text-neon-red flex items-center justify-center font-black text-xs shrink-0 mt-1">S3</div>
                                        <p className="font-body text-foreground font-medium">Mercredi : Hot-dogs artisanaux "maison" & bâtonnets de carottes.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
