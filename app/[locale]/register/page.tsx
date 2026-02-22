import { AuthForm } from "@/components/auth/AuthForm";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "register" });
    return {
        title: `${t("title")} | Batela Foods`,
    };
}

export default function RegisterPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    return (
        <main className="min-h-[80vh] flex items-center justify-center section-padding bg-background/50">
            <div className="w-full">
                <AuthForm type="register" />
            </div>
        </main>
    );
}
