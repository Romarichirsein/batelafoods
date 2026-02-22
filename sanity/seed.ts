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
        name: { fr: "Ndolé au Bœuf", en: "Beef Ndolé" },
        slug: { _type: "slug", current: "ndole-boeuf" },
        price: 3500,
        featured: true,
        category: "animal",
        subcategory: "Plat cuisiné",
        description: {
            fr: "Notre Ndolé traditionnel aux feuilles amères mijotées avec du bœuf tendre et des crevettes. Recette authentique du Cameroun.",
            en: "Traditional Ndolé with bitter leaves simmered with tender beef and shrimp. Authentic Cameroonian recipe.",
        },
        ingredients: {
            fr: ["Feuilles de Ndolé", "Bœuf", "Crevettes", "Arachides", "Poisson fumé", "Ail", "Oignon"],
            en: ["Ndolé leaves", "Beef", "Shrimp", "Peanuts", "Smoked fish", "Garlic", "Onion"],
        },
        storageInfo: {
            fr: "À conserver au réfrigérateur. Consommer dans les 48h.",
            en: "Keep refrigerated. Consume within 48 hours.",
        },
    },
    {
        _type: "product",
        name: { fr: "Eru aux Légumes", en: "Eru with Vegetables" },
        slug: { _type: "slug", current: "eru-legumes" },
        price: 2000,
        featured: true,
        category: "plant",
        subcategory: "Légumes-feuilles",
        description: {
            fr: "Eru frais préparé à la traditionnelle avec huile de palme et crevettes séchées. Originaire de la région du Sud-Ouest.",
            en: "Fresh Eru prepared traditionally with palm oil and dried shrimp. From the South West region.",
        },
        ingredients: {
            fr: ["Feuilles d'Eru", "Huile de palme", "Crevettes séchées", "Sel", "Piment"],
            en: ["Eru leaves", "Palm oil", "Dried shrimp", "Salt", "Chili pepper"],
        },
        storageInfo: {
            fr: "Réfrigéré, consommer dans les 24h.",
            en: "Refrigerated, consume within 24 hours.",
        },
    },
    {
        _type: "product",
        name: { fr: "Poisson Braisé (Tilapia)", en: "Grilled Tilapia" },
        slug: { _type: "slug", current: "poisson-braise-tilapia" },
        price: 5000,
        featured: true,
        category: "animal",
        subcategory: "Poisson",
        description: {
            fr: "Tilapia entier braisé au charbon, mariné aux épices camerounaises. Livraison en emballage isotherme.",
            en: "Whole tilapia grilled over charcoal, marinated with Cameroonian spices. Delivered in insulated packaging.",
        },
        ingredients: {
            fr: ["Tilapia frais", "Piment", "Ail", "Gingembre", "Huile végétale", "Épices locales"],
            en: ["Fresh tilapia", "Chili pepper", "Garlic", "Ginger", "Vegetable oil", "Local spices"],
        },
        storageInfo: {
            fr: "Consommer chaud ou réfrigérer et réchauffer dans les 12h.",
            en: "Consume hot or refrigerate and reheat within 12 hours.",
        },
    },
    {
        _type: "product",
        name: { fr: "Plantains Mûrs", en: "Ripe Plantains" },
        slug: { _type: "slug", current: "plantains-murs" },
        price: 800,
        featured: true,
        category: "plant",
        subcategory: "Fruits & Tubercules",
        description: {
            fr: "Régime de plantains mûrs sélectionnés, idéaux pour le beignet, le pilon ou à frire. Origine : Bafang.",
            en: "Selected ripe plantain bunch, ideal for fritters, pounding or frying. Origin: Bafang.",
        },
        ingredients: {
            fr: ["Plantains mûrs 100% naturels"],
            en: ["100% natural ripe plantains"],
        },
        storageInfo: {
            fr: "Conserver à température ambiante. Consommer dans les 3 jours.",
            en: "Store at room temperature. Consume within 3 days.",
        },
    },
    {
        _type: "product",
        name: { fr: "Poulet DG (Director General)", en: "Director General Chicken" },
        slug: { _type: "slug", current: "poulet-dg" },
        price: 7500,
        featured: true,
        category: "animal",
        subcategory: "Volaille",
        description: {
            fr: "Le célèbre Poulet DG, spécialité camerounaise avec plantains frits et légumes sautés. Portion pour 2 personnes.",
            en: "The famous DG Chicken, Cameroonian specialty with fried plantains and sautéed vegetables. Portion for 2.",
        },
        ingredients: {
            fr: ["Poulet entier", "Plantains", "Carottes", "Haricots verts", "Ail", "Oignon", "Huile de palme"],
            en: ["Whole chicken", "Plantains", "Carrots", "Green beans", "Garlic", "Onion", "Palm oil"],
        },
        storageInfo: {
            fr: "Consommer dans les 24h. Réfrigérer si non consommé immédiatement.",
            en: "Consume within 24 hours. Refrigerate if not consumed immediately.",
        },
    },
    {
        _type: "product",
        name: { fr: "Ananas Victoria", en: "Victoria Pineapple" },
        slug: { _type: "slug", current: "ananas-victoria" },
        price: 1200,
        featured: false,
        category: "plant",
        subcategory: "Fruits frais",
        description: {
            fr: "Ananas Victoria naturellement sucrés, cueillis à maturité dans les plantations de Bafia. Très juteux.",
            en: "Naturally sweet Victoria pineapples, picked at peak ripeness from Bafia plantations. Very juicy.",
        },
        ingredients: {
            fr: ["Ananas Victoria 100% naturel"],
            en: ["100% natural Victoria pineapple"],
        },
        storageInfo: {
            fr: "Conserver à température ambiante ou réfrigérer une fois coupé.",
            en: "Store at room temperature or refrigerate once cut.",
        },
    },
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
