export interface LocalizedString {
    fr: string;
    en: string;
}

export interface LocalizedStringArray {
    fr: string[];
    en: string[];
}

export interface SanityImageAsset {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    hotspot?: object;
}

export interface Product {
    _id: string;
    _type: "product";
    name: LocalizedString;
    slug: { current: string };
    price: number;
    image: SanityImageAsset;
    category: "animal" | "plant";
    subcategory?: string;
    ingredients?: LocalizedStringArray;
    description?: LocalizedString;
    featured?: boolean;
    storageInfo?: LocalizedString;
}
