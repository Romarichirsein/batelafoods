import { getTranslations } from "next-intl/server";
import { MapPin, Clock, Truck } from "lucide-react";

export async function DeliveryStrip({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "delivery" });

    return (
        <section
            className="border-y border-border bg-card"
            aria-label={t("title")}
        >
            <div className="container-max section-padding py-10">
                <h2 className="font-heading font-black text-2xl lg:text-3xl text-center
                       text-foreground mb-8">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {/* Douala */}
                    <div
                        className="p-6 rounded-xl border border-neon-red/20 bg-neon-red/5
                       hover:border-neon-red/40 hover:shadow-neon-red-sm transition-all duration-300
                       flex items-start gap-4"
                    >
                        <div className="p-3 rounded-full bg-neon-red/10 flex-shrink-0">
                            <MapPin className="w-6 h-6 text-neon-red" />
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-lg text-foreground">
                                {t("douala_title")}
                            </h3>
                            <p className="flex items-center gap-1.5 text-neon-red font-semibold mt-1">
                                <Clock className="w-4 h-4" />
                                {t("douala_time")}
                            </p>
                        </div>
                    </div>

                    {/* Other cities */}
                    <div
                        className="p-6 rounded-xl border border-neon-green/20 bg-neon-green/5
                       hover:border-neon-green/40 hover:shadow-neon-green-sm transition-all duration-300
                       flex items-start gap-4"
                    >
                        <div className="p-3 rounded-full bg-neon-green/10 flex-shrink-0">
                            <Truck className="w-6 h-6 text-neon-green" />
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-lg text-foreground">
                                {t("cities_title")}
                            </h3>
                            <p className="flex items-center gap-1.5 text-neon-green font-semibold mt-1">
                                <Clock className="w-4 h-4" />
                                {t("cities_time")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Note */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                    {t("note")}
                </p>
            </div>
        </section>
    );
}
