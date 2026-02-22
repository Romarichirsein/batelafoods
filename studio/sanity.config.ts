import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
    name: "batela-foods-studio",
    title: "Batela Foods Studio",
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "yi7rgipx",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
    plugins: [
        structureTool(),
        visionTool(),
    ],
    schema: { types: schemaTypes },
});
