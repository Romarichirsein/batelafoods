import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";
import "../globals.css";

export function generateStaticParams() {
    return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const isEn = locale === "en";
    return {
        title: {
            default: "Batela Foods — Saveurs du Cameroun",
            template: "%s | Batela Foods"
        },
        description: isEn
            ? "Batela Foods brings you the best of local, fresh and authentic Cameroonian products directly to your doorstep."
            : "Batela Foods vous apporte le meilleur des produits camerounais locaux, frais et authentiques directement à votre porte.",
        metadataBase: new URL("https://batelafoods.cm"),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                "fr-FR": "/fr",
                "en-US": "/en",
            },
        },
        openGraph: {
            type: "website",
            locale: locale === "en" ? "en_US" : "fr_FR",
            url: `https://batelafoods.cm/${locale}`,
            siteName: "Batela Foods",
            images: [
                {
                    url: `/${locale}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: "Batela Foods — Saveurs du Cameroun",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Batela Foods — Saveurs du Cameroun",
            creator: "@batelafoods",
        },
    };
}

export const viewport = {
    themeColor: "#0a0a0a",
    width: "device-width",
    initialScale: 1,
};

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);
    const messages = await getMessages({ locale });

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body className={`font-body antialiased`}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <div className="flex-1">
                                {children}
                            </div>
                            <Footer />
                        </div>
                        <Toaster position="bottom-right" richColors theme="dark" />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
