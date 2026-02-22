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

const catalog = [
    // Viandes Fumées
    {
        _type: "product",
        name: { fr: "Porc fumé 500g", en: "Smoked Pork 500g" },
        slug: { _type: "slug", current: "porc-fume-500g" },
        price: 3000,
        featured: true,
        category: "animal",
        subcategory: "Viandes Fumées",
        description: { fr: "Porc fumé traditionnel, 500g.", en: "Traditional smoked pork, 500g." },
        ingredients: { fr: ["Porc"], en: ["Pork"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Bœuf fumé 500g", en: "Smoked Beef 500g" },
        slug: { _type: "slug", current: "boeuf-fume-500g" },
        price: 3000,
        featured: true,
        category: "animal",
        subcategory: "Viandes Fumées",
        description: { fr: "Bœuf fumé traditionnel, 500g.", en: "Traditional smoked beef, 500g." },
        ingredients: { fr: ["Bœuf"], en: ["Beef"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Poulet fumé", en: "Smoked Chicken" },
        slug: { _type: "slug", current: "poulet-fume" },
        price: 4500,
        featured: true,
        category: "animal",
        subcategory: "Viandes Fumées",
        description: { fr: "Poulet fumé entier. Prix selon gabarit (4 500 - 8 500 Frs).", en: "Whole smoked chicken. Price depends on size." },
        ingredients: { fr: ["Poulet"], en: ["Chicken"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    // Saucisses à cuire
    {
        _type: "product",
        name: { fr: "Saucisses de porc 250g", en: "Pork Sausages 250g" },
        slug: { _type: "slug", current: "saucisses-porc-250g" },
        price: 1500,
        featured: false,
        category: "animal",
        subcategory: "Saucisses à cuire",
        description: { fr: "Saucisses de porc à cuire (250g).", en: "Pork sausages for cooking (250g)." },
        ingredients: { fr: ["Porc", "Epices"], en: ["Pork", "Spices"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Saucisses de porc 500g", en: "Pork Sausages 500g" },
        slug: { _type: "slug", current: "saucisses-porc-500g" },
        price: 3000,
        featured: true,
        category: "animal",
        subcategory: "Saucisses à cuire",
        description: { fr: "Saucisses de porc à cuire (500g).", en: "Pork sausages for cooking (500g)." },
        ingredients: { fr: ["Porc", "Epices"], en: ["Pork", "Spices"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Saucisses de porc 1Kg", en: "Pork Sausages 1Kg" },
        slug: { _type: "slug", current: "saucisses-porc-1kg" },
        price: 5000,
        featured: false,
        category: "animal",
        subcategory: "Saucisses à cuire",
        description: { fr: "Saucisses de porc à cuire (1Kg).", en: "Pork sausages for cooking (1Kg)." },
        ingredients: { fr: ["Porc", "Epices"], en: ["Pork", "Spices"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Chipolatas 500g", en: "Chipolatas 500g" },
        slug: { _type: "slug", current: "chipolatas-500g" },
        price: 3500,
        featured: false,
        category: "animal",
        subcategory: "Saucisses à cuire",
        description: { fr: "Saucisses Chipolatas (500g).", en: "Chipolatas sausages (500g)." },
        ingredients: { fr: ["Viande", "Epices douces"], en: ["Meat", "Mild spices"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Chipolatas 1Kg", en: "Chipolatas 1Kg" },
        slug: { _type: "slug", current: "chipolatas-1kg" },
        price: 6000,
        featured: true,
        category: "animal",
        subcategory: "Saucisses à cuire",
        description: { fr: "Saucisses Chipolatas (1Kg).", en: "Chipolatas sausages (1Kg)." },
        ingredients: { fr: ["Viande", "Epices douces"], en: ["Meat", "Mild spices"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Merguez 500g", en: "Merguez 500g" },
        slug: { _type: "slug", current: "merguez-500g" },
        price: 3500,
        featured: false,
        category: "animal",
        subcategory: "Saucisses à cuire",
        description: { fr: "Saucisses Merguez épicées (500g).", en: "Spicy Merguez sausages (500g)." },
        ingredients: { fr: ["Viande", "Epices fortes", "Piment"], en: ["Meat", "Strong spices", "Chili"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Merguez 1Kg", en: "Merguez 1Kg" },
        slug: { _type: "slug", current: "merguez-1kg" },
        price: 6000,
        featured: true,
        category: "animal",
        subcategory: "Saucisses à cuire",
        description: { fr: "Saucisses Merguez épicées (1Kg).", en: "Spicy Merguez sausages (1Kg)." },
        ingredients: { fr: ["Viande", "Epices fortes", "Piment"], en: ["Meat", "Strong spices", "Chili"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    // Saucissons Cuits
    {
        _type: "product",
        name: { fr: "Saucisson cuit à l'ail (Nature) 250g", en: "Garlic Cooked Sausage (Plain) 250g" },
        slug: { _type: "slug", current: "saucisson-ail-nature-250g" },
        price: 1500,
        featured: false,
        category: "animal",
        subcategory: "Saucissons Cuits",
        description: { fr: "Barre de saucisson cuit à l'ail nature (250g).", en: "Plain garlic cooked sausage bar (250g)." },
        ingredients: { fr: ["Viande", "Ail"], en: ["Meat", "Garlic"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Saucisson cuit à l'ail (Nature) 500g", en: "Garlic Cooked Sausage (Plain) 500g" },
        slug: { _type: "slug", current: "saucisson-ail-nature-500g" },
        price: 2500,
        featured: true,
        category: "animal",
        subcategory: "Saucissons Cuits",
        description: { fr: "Barre de saucisson cuit à l'ail nature (500g).", en: "Plain garlic cooked sausage bar (500g)." },
        ingredients: { fr: ["Viande", "Ail"], en: ["Meat", "Garlic"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Saucisson cuit à l'ail (Pimenté) 250g", en: "Garlic Cooked Sausage (Spicy) 250g" },
        slug: { _type: "slug", current: "saucisson-ail-pimente-250g" },
        price: 1500,
        featured: false,
        category: "animal",
        subcategory: "Saucissons Cuits",
        description: { fr: "Barre de saucisson cuit à l'ail, légèrement pimenté (250g).", en: "Spicy garlic cooked sausage bar (250g)." },
        ingredients: { fr: ["Viande", "Ail", "Piment"], en: ["Meat", "Garlic", "Chili"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Saucisson cuit à l'ail (Pimenté) 500g", en: "Garlic Cooked Sausage (Spicy) 500g" },
        slug: { _type: "slug", current: "saucisson-ail-pimente-500g" },
        price: 2500,
        featured: true,
        category: "animal",
        subcategory: "Saucissons Cuits",
        description: { fr: "Barre de saucisson cuit à l'ail, légèrement pimenté (500g).", en: "Spicy garlic cooked sausage bar (500g)." },
        ingredients: { fr: ["Viande", "Ail", "Piment"], en: ["Meat", "Garlic", "Chili"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    // Terrines & Crèmes
    {
        _type: "product",
        name: { fr: "Museau 100g", en: "Pork Snout 100g" },
        slug: { _type: "slug", current: "museau-100g" },
        price: 550,
        featured: false,
        category: "animal",
        subcategory: "Terrines & Crèmes",
        description: { fr: "Tranche de museau préparée (100g).", en: "Prepared pork snout slice (100g)." },
        ingredients: { fr: ["Museau de porc"], en: ["Pork snout"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Pâté de campagne 100g", en: "Country Pâté 100g" },
        slug: { _type: "slug", current: "pate-campagne-100g" },
        price: 600,
        featured: true,
        category: "animal",
        subcategory: "Terrines & Crèmes",
        description: { fr: "Pâté de campagne traditionnel (100g).", en: "Traditional country pâté (100g)." },
        ingredients: { fr: ["Viande", "Foie", "Epices"], en: ["Meat", "Liver", "Spices"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    },
    {
        _type: "product",
        name: { fr: "Crème de foie 100g", en: "Liver Cream 100g" },
        slug: { _type: "slug", current: "creme-foie-100g" },
        price: 500,
        featured: false,
        category: "animal",
        subcategory: "Terrines & Crèmes",
        description: { fr: "Crème de foie à tartiner (100g).", en: "Liver cream spread (100g)." },
        ingredients: { fr: ["Foie", "Viande", "Epices douces"], en: ["Liver", "Meat", "Mild spices"] },
        storageInfo: { fr: "A conserver au frais.", en: "Keep refrigerated." }
    }
];

async function seedCatalog() {
    console.log("🌱 Démarrage de l'import du catalogue complet Batela Foods...\n");

    for (const product of catalog) {
        try {
            const result = await client.create(product);
            console.log(`✅ Créé: ${product.name.fr} (ID: ${result._id})`);
        } catch (err) {
            console.error(`❌ Erreur pour ${product.name.fr}:`, err);
        }
    }

    console.log("\n🎉 Import du catalogue terminé !");
}

seedCatalog();
