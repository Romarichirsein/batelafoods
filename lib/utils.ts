import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(
    price: number,
    locale: string = "fr"
): string {
    return new Intl.NumberFormat(locale === "fr" ? "fr-CM" : "en-CM", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}
