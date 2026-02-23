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

const anicesFoodProducts = [
    // Image 1
    { name: { fr: "Croustille de coco", en: "Coconut Chips" }, slug: "croustille-coco", price: 1000, category: "plant", subcategory: "Snacks", weight: "100g", descFr: "Croustilles de coco croquantes de la marque Anice's Food. Poids: 100g.", descEn: "Crunchy coconut chips from Anice's Food. Weight: 100g." },
    { name: { fr: "Ananas séché", en: "Dried Pineapple" }, slug: "ananas-seche", price: 1000, category: "plant", subcategory: "Fruits séchés", weight: "100g", descFr: "Tranches d'ananas séchées naturellement, marque Anice's Food. Poids: 100g.", descEn: "Naturally dried pineapple slices, Anice's Food brand. Weight: 100g." },
    { name: { fr: "Safou séché", en: "Dried Safou" }, slug: "safou-seche", price: 1000, category: "plant", subcategory: "Fruits séchés", weight: "50g", descFr: "Safou (prune locale) séché, marque Anice's Food. Poids: 50g.", descEn: "Dried Safou (local plum), Anice's Food brand. Weight: 50g." },
    { name: { fr: "Mangue séchée", en: "Dried Mango" }, slug: "mangue-sechee", price: 1000, category: "plant", subcategory: "Fruits séchés", weight: "50g", descFr: "Lanières de mangue séchées, naturellement sucrées. Anice's Food. Poids: 50g.", descEn: "Dried mango strips, naturally sweet. Anice's Food. Weight: 50g." },
    { name: { fr: "Papaye séchée", en: "Dried Papaya" }, slug: "papaye-sechee", price: 1000, category: "plant", subcategory: "Fruits séchés", weight: "100g", descFr: "Lanières de papaye séchées, riches en vitamines. Anice's Food. Poids: 100g.", descEn: "Dried papaya strips, rich in vitamins. Anice's Food. Weight: 100g." },
    { name: { fr: "Croustille de plantain", en: "Plantain Chips" }, slug: "croustille-plantain", price: 1000, category: "plant", subcategory: "Snacks", weight: "500g", descFr: "Chips de plantain croquantes, grand format 500g. Anice's Food.", descEn: "Crunchy plantain chips, large 500g format. Anice's Food." },
    { name: { fr: "Croustille de cacao-torrifié", en: "Roasted Cocoa Nib Chips" }, slug: "croustille-cacao", price: 1000, category: "plant", subcategory: "Snacks", weight: "50g", descFr: "Éclats de cacao torrifié croquants. Anice's Food. Poids: 50g.", descEn: "Crunchy roasted cocoa nibs. Anice's Food. Weight: 50g." },
    { name: { fr: "Croustille de cacao-coco", en: "Cocoa-Coconut Chips" }, slug: "croustille-cacao-coco", price: 1000, category: "plant", subcategory: "Snacks", weight: "50g", descFr: "Mélange gourmand de chips de coco et de cacao. Anice's Food. Poids: 50g.", descEn: "Gourmet mix of coconut and cocoa chips. Anice's Food. Weight: 50g." },
    { name: { fr: "Fèves de cacao-caramélisées", en: "Caramelized Cocoa Beans" }, slug: "feves-cacao-caramelisees", price: 1000, category: "plant", subcategory: "Snacks", weight: "50g", descFr: "Fèves de cacao entières caramélisées. Anice's Food. Poids: 50g.", descEn: "Whole caramelized cocoa beans. Anice's Food. Weight: 50g." },

    // Image 2
    { name: { fr: "Spiruline", en: "Spirulina" }, slug: "spiruline", price: 5000, category: "plant", subcategory: "Compléments", weight: "100g", descFr: "Spiruline pure en poudre, superaliment riche en protéines. Anice's Food. Poids: 100g.", descEn: "Pure spirulina powder, protein-rich superfood. Anice's Food. Weight: 100g." },
    { name: { fr: "Ginseng", en: "Ginseng" }, slug: "ginseng", price: 1000, category: "plant", subcategory: "Compléments", weight: "100g", descFr: "Ginseng en poudre pour la vitalité. Anice's Food. Poids: 100g.", descEn: "Ginseng powder for vitality. Anice's Food. Weight: 100g." },
    { name: { fr: "Gingembre", en: "Ginger Powder" }, slug: "gingembre", price: 1000, category: "plant", subcategory: "Épices", weight: "50g", descFr: "Poudre de gingembre pur, intense et parfumée. Anice's Food. Poids: 50g.", descEn: "Pure ginger powder, intense and fragrant. Anice's Food. Weight: 50g." },
    { name: { fr: "Poudre de curcuma", en: "Turmeric Powder" }, slug: "poudre-curcuma", price: 1000, category: "plant", subcategory: "Épices", weight: "50g", descFr: "Poudre de curcuma riche en curcumine. Anice's Food. Poids: 50g.", descEn: "Turmeric powder rich in curcumin. Anice's Food. Weight: 50g." },
    { name: { fr: "Poudre de coquilles d'oeufs", en: "Eggshell Powder" }, slug: "poudre-coquilles-oeufs", price: 1000, category: "animal", subcategory: "Compléments", weight: "100g", descFr: "Source naturelle de calcium. Anice's Food. Poids: 100g.", descEn: "Natural source of calcium. Anice's Food. Weight: 100g." },
    { name: { fr: "Poudre de coquilles d'escargots", en: "Snail Shell Powder" }, slug: "poudre-coquilles-escargots", price: 1000, category: "animal", subcategory: "Compléments", weight: "500g", descFr: "Poudre de coquilles d'escargots riche en minéraux. Anice's Food. Poids: 500g.", descEn: "Snail shell powder rich in minerals. Anice's Food. Weight: 500g." },
    { name: { fr: "Épice du mbongo", en: "Mbongo Spice" }, slug: "epice-mbongo", price: 1000, category: "plant", subcategory: "Épices", weight: "50g", descFr: "Mélange d'épices pour la préparation du fameux Mbongo Tchobi. Anice's Food. Poids: 50g.", descEn: "Spice blend for the famous Mbongo Tchobi. Anice's Food. Weight: 50g." },
    { name: { fr: "Épice du taro", en: "Taro Spice" }, slug: "epice-taro", price: 1000, category: "plant", subcategory: "Épices", weight: "50g", descFr: "Mélange d'épices pour la sauce jaune du Taro. Anice's Food. Poids: 50g.", descEn: "Spice blend for Taro yellow sauce. Anice's Food. Weight: 50g." },
    { name: { fr: "Citronnelle séchée", en: "Dried Lemongrass" }, slug: "citronnelle-sechee", price: 1000, category: "plant", subcategory: "Infusions", weight: "100g", descFr: "Feuilles de citronnelle séchées pour infusions. Anice's Food. Poids: 100g.", descEn: "Dried lemongrass leaves for infusions. Anice's Food. Weight: 100g." },
];

async function seed() {
    console.log("🌱 Importation du catalogue Anice's Food...\n");

    for (const item of anicesFoodProducts) {
        const product = {
            _type: "product",
            name: item.name,
            slug: { _type: "slug", current: item.slug },
            price: item.price,
            featured: false,
            category: item.category,
            subcategory: item.subcategory,
            description: {
                fr: item.descFr,
                en: item.descEn,
            },
            ingredients: {
                fr: [`100% Produit Anice's Food (${item.weight})`],
                en: [`100% Anice's Food Product (${item.weight})`],
            },
            storageInfo: {
                fr: "Conserver dans un endroit sec et frais, à l'abri de la lumière.",
                en: "Store in a cool, dry place, away from light.",
            },
        };

        try {
            const result = await client.create(product);
            console.log(`✅ Créé: ${item.name.fr} (ID: ${result._id})`);
        } catch (err) {
            console.error(`❌ Erreur pour ${item.name.fr}:`, err);
        }
    }

    console.log("\n🎉 Seeding terminé !");
}

seed();
