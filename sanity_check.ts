import { getAllProductSlugs } from "./lib/sanity/queries";

async function check() {
    try {
        const slugs = await getAllProductSlugs();
        console.log("Product Slugs:", JSON.stringify(slugs, null, 2));
    } catch (e) {
        console.error("Error fetching slugs:", e);
    }
}

check();
