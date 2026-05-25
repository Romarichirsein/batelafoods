import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
    return [{ locale: 'fr' }, { locale: 'en' }];
}

export default function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const t = useTranslations("categories");

    const categories = [
        { id: 'saucissons', icon: '🥩' },
        { id: 'saucisses', icon: '🌭' },
        { id: 'viandes_fumees', icon: '🔥', slug: 'viandes-fumees' }
    ];

    return (
        <main className="pt-24 pb-16">
            <section className="bg-muted/30 py-16 mb-12 border-b border-border">
                <div className="container-max text-center lg:text-left">
                    <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                        {t("title")}
                    </h1>
                </div>
            </section>

            <div className="container-max">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/products/c/${cat.slug || cat.id}`}
                            className="group relative h-80 rounded-[40px] overflow-hidden border border-border hover:border-black/5 transition-all duration-700"
                        >
                            <div className="absolute inset-0 bg-muted/40 group-hover:bg-neon-red/5 transition-colors duration-700" />
                            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                                <span className="text-6xl group-hover:scale-110 transition-transform duration-700">{cat.icon}</span>
                                <div>
                                    <h2 className="font-heading font-black text-3xl uppercase tracking-tighter">
                                        {t(`${cat.id}.title`)}
                                    </h2>
                                    <p className="text-sm text-muted-foreground font-body mt-2 px-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 line-clamp-2">
                                        {t(`${cat.id}.description`)}
                                    </p>
                                </div>
                                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                    <span className="inline-flex h-10 items-center justify-center rounded-full bg-black px-6 text-[10px] font-black uppercase tracking-widest text-white">
                                        {t("view_range")}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
