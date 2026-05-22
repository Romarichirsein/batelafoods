// scripts/upload_product_images_js.js
// Plain JavaScript version of the upload script (no TypeScript dependencies)
const { createClient } = require("@sanity/client");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const imagesDir = path.resolve(process.cwd(), "Image produit");
if (!fs.existsSync(imagesDir)) {
  console.error(`Images directory not found: ${imagesDir}`);
  process.exit(1);
}

const imageFiles = fs.readdirSync(imagesDir).filter((f) => !fs.statSync(path.join(imagesDir, f)).isDirectory());

async function main() {
  // Fetch all products ordered by creation date (deterministic order)
  const products = await client.fetch(`*[_type == "product"] | order(_createdAt asc) {_id, slug}`);
  if (products.length === 0) {
    console.log("No products found.");
    return;
  }

  // Map images to products sequentially (allow multiple images per product)
  const assignments = [];
  let prodIdx = 0;
  for (const file of imageFiles) {
    const product = products[prodIdx % products.length];
    if (!assignments[prodIdx % products.length]) {
      assignments[prodIdx % products.length] = { productId: product._id, files: [] };
    }
    assignments[prodIdx % products.length].files.push(file);
    prodIdx++;
  }

  for (const assign of assignments) {
    const { productId, files } = assign;
    const uploadedRefs = [];
    for (const f of files) {
      const filePath = path.join(imagesDir, f);
      try {
        const asset = await client.assets.upload("image", fs.createReadStream(filePath), { filename: f });
        uploadedRefs.push({ _type: "image", asset: { _ref: asset._id, _type: "reference" } });
      } catch (e) {
        console.error(`Failed to upload ${f}:`, e);
      }
    }
    // Patch product with images array (append)
    const patch = client.patch(productId)
      .setIfMissing({ images: [] })
      .insert("after", "images[-1]", uploadedRefs);
    try {
      await patch.commit();
      console.log(`Updated product ${productId} with ${uploadedRefs.length} image(s).`);
    } catch (e) {
      console.error(`Patch failed for ${productId}:`, e);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
