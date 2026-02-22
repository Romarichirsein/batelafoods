import { defineField, defineType } from "sanity";

export const post = defineType({
    name: "post",
    title: "Article de Blog",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Lien (Slug)",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "mainImage",
            title: "Image Principale",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "publishedAt",
            title: "Date de publication",
            type: "datetime",
            validation: (Rule) => Rule.required(),
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: "excerpt",
            title: "Extrait (Résumé rapide)",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "body",
            title: "Contenu de l'article",
            type: "array",
            of: [
                {
                    type: "block"
                },
                {
                    type: "image",
                    options: { hotspot: true }
                }
            ]
        }),
    ],
    preview: {
        select: {
            title: "title",
            media: "mainImage",
            date: "publishedAt",
        },
        prepare(selection) {
            const { title, media, date } = selection;
            return {
                title,
                media,
                subtitle: date
                    ? new Date(date).toLocaleDateString("fr-FR", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })
                    : "Sans date",
            };
        },
    },
});
