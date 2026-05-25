/**
 * Seed script — inserts 6 sample Batela Foods products into Sanity.
 * Run: npm run seed
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Load .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

const products = [
    {
        _type: "product",
        name: { fr: "Saucisson Fumé au Poivre", en: "Pepper Smoked Salami" },
        slug: { _type: "slug", current: "saucisson-fume-poivre" },
        price: 4500,
        featured: true,
        category: "animal",
        subcategory: "Saucissons",
        description: {
            fr: "Saucisson artisanal de porc, fumé au bois de hêtre et relevé au poivre de Penja.",
            en: "Artisanal pork salami, smoked with beech wood and spiced with Penja pepper.",
        },
        ingredients: {
            fr: ["Viande de porc", "Gras de porc", "Sel", "Poivre de Penja", "Ail", "Épices locales"],
            en: ["Pork meat", "Pork fat", "Salt", "Penja pepper", "Garlic", "Local spices"],
        },
        storageInfo: {
            fr: "À conserver au frais. Consommer dans les 15 jours après ouverture.",
            en: "Keep refrigerated. Consume within 15 days after opening.",
        },
    },
    {
        _type: "product",
        name: { fr: "Saucisse de Bœuf Épicée", en: "Spicy Beef Sausage" },
        slug: { _type: "slug", current: "saucisse-boeuf-epicee" },
        price: 3500,
        featured: true,
        category: "animal",
        subcategory: "Saucisses",
        description: {
            fr: "Saucisses fraîches 100% bœuf, idéales pour le barbecue ou à la poêle.",
            en: "100% beef fresh sausages, ideal for BBQ or pan-frying.",
        },
        ingredients: {
            fr: ["Viande de bœuf", "Graisse de bœuf", "Sel", "Piment", "Ail"],
            en: ["Beef meat", "Beef fat", "Salt", "Chili", "Garlic"],
        },
        storageInfo: {
            fr: "Réfrigéré, consommer dans les 48h ou congeler.",
            en: "Refrigerated, consume within 48 hours or freeze.",
        },
    },
    {
        _type: "product",
        name: { fr: "Côtes de Porc Fumées", en: "Smoked Pork Ribs" },
        slug: { _type: "slug", current: "cotes-porc-fumees" },
        price: 5500,
        featured: true,
        category: "animal",
        subcategory: "Viandes_fumees",
        description: {
            fr: "Côtes de porc charnues, longuement fumées au bois pour une saveur intense.",
            en: "Meaty pork ribs, slow-smoked over wood for an intense flavor.",
        },
        ingredients: {
            fr: ["Côtes de porc", "Sel", "Marinade maison aux herbes"],
            en: ["Pork ribs", "Salt", "House herb marinade"],
        },
        storageInfo: {
            fr: "Conserver au frais ou congeler pour une longue conservation.",
            en: "Keep refrigerated or freeze for long-term storage.",
        },
    }
];

async function seed() {
    console.log("🌱 Démarrage du seeding Batela Foods...\n");

    for (const product of products) {
        try {
            const result = await client.create(product);
            console.log(`✅ Créé: ${product.name.fr} (ID: ${result._id})`);
        } catch (err) {
            console.error(`❌ Erreur pour ${product.name.fr}:`, err);
        }
    }

    console.log("\n🎉 Seeding terminé ! Ouvrez votre Sanity Studio pour voir les produits.");
    console.log("   Studio: npx sanity dev (dans le dossier /studio)");
}

seed();
