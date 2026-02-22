import { MetadataRoute } from 'next';
import { getAllProductSlugs } from '@/lib/sanity/queries';

const BASE_URL = 'https://batelafoods.cm';
const locales = ['fr', 'en'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let products: { slug: string }[] = [];
    try {
        products = await getAllProductSlugs();
    } catch (error) {
        console.error('Sitemap: Failed to fetch products', error);
    }

    const productEntries = products.flatMap((product) =>
        locales.map((locale) => ({
            url: `${BASE_URL}/${locale}/products/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    );

    const staticEntries = locales.flatMap((locale) => [
        {
            url: `${BASE_URL}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/${locale}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ]);

    return [...staticEntries, ...productEntries];
}
