import { defineField, defineType } from "sanity";

export const productSchema = defineType({
    name: "product",
    title: "Produit",
    type: "document",
    fields: [
        // Localized name
        defineField({
            name: "name",
            title: "Nom du produit",
            type: "object",
            fields: [
                defineField({ name: "fr", title: "Français", type: "string", validation: (r) => r.required() }),
                defineField({ name: "en", title: "English", type: "string", validation: (r) => r.required() }),
            ],
        }),

        // Slug
        defineField({
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            options: { source: "name.fr", maxLength: 96 },
            validation: (r) => r.required(),
        }),

        // Price in FCFA
        defineField({
            name: "price",
            title: "Prix (FCFA / XAF)",
            type: "number",
            validation: (r) => r.required().positive(),
        }),

        // Featured
        defineField({
            name: "featured",
            title: "Produit vedette (Crowd Favorites)",
            type: "boolean",
            initialValue: false,
        }),

        // Deprecated single image (keep for backward compatibility)
        defineField({
            name: "image",
            title: "Image du produit (déprécié)",
            type: "image",
            options: { hotspot: true },
            validation: (r) => r.required(),
            hidden: true,
        }),
        // New array of images for gallery support
        defineField({
            name: "images",
            title: "Galerie d'images",
            type: "array",
            of: [{ type: "image", options: { hotspot: true } }],
            description: "Ajoutez plusieurs images pour créer un carrousel de produit",
        }),

        // Category
        defineField({
            name: "category",
            title: "Catégorie principale",
            type: "string",
            options: {
                list: [
                    { title: "🥩 Saucissons", value: "saucissons" },
                    { title: "🌭 Saucisses", value: "saucisses" },
                    { title: "🔥 Viandes Fumées", value: "viandes-fumees" },
                    { title: "🌱 Végétal", value: "vegetal" },
                    { title: "📦 En Gros", value: "wholesale" },
                ],
                layout: "radio",
            },
            validation: (r) => r.required(),
        }),

        // Subcategory
        defineField({
            name: "subcategory",
            title: "Sous-catégorie",
            type: "string",
            placeholder: "Ex: Légumes-feuilles, Viande fumée, Poisson frais...",
        }),

        // Localized description
        defineField({
            name: "description",
            title: "Description",
            type: "object",
            fields: [
                defineField({ name: "fr", title: "Français", type: "text", rows: 3 }),
                defineField({ name: "en", title: "English", type: "text", rows: 3 }),
            ],
        }),

        // Localized ingredients
        defineField({
            name: "ingredients",
            title: "Ingrédients / Composition",
            type: "object",
            fields: [
                defineField({ name: "fr", title: "Français", type: "array", of: [{ type: "string" }] }),
                defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
            ],
        }),

        // Storage info
        defineField({
            name: "storageInfo",
            title: "Conditions de conservation",
            type: "object",
            fields: [
                defineField({ name: "fr", title: "Français", type: "string" }),
                defineField({ name: "en", title: "English", type: "string" }),
            ],
        }),
    ],

    preview: {
        select: {
            title: "name.fr",
            subtitle: "price",
            media: "image",
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title ?? "Sans nom",
                subtitle: subtitle ? `${subtitle.toLocaleString("fr-FR")} FCFA` : "Prix non défini",
                media,
            };
        },
    },
});
