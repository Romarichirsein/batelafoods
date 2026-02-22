import { sanityClient } from "./client";
import type { Product } from "./types";

// Fetch all featured products for the "Crowd Favorites" section
export async function getFeaturedProducts(): Promise<Product[]> {
  const query = `*[_type == "product" && featured == true] | order(_createdAt desc) {
    _id,
    _type,
    name,
    slug,
    price,
    image,
    category,
    subcategory,
    featured
  }`;
  return sanityClient.fetch<Product[]>(query);
}

// Fetch a single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    price,
    image,
    category,
    subcategory,
    ingredients,
    description,
    storageInfo,
    featured
  }`;
  return sanityClient.fetch<Product | null>(query, { slug });
}

// Fetch related products (same category, excluding current)
export async function getRelatedProducts(
  category: string,
  excludeId: string
): Promise<Product[]> {
  const query = `*[_type == "product" && category == $category && _id != $excludeId] | order(_createdAt desc)[0...4] {
    _id,
    _type,
    name,
    slug,
    price,
    image,
    category,
    subcategory,
    featured
  }`;
  return sanityClient.fetch<Product[]>(query, { category, excludeId });
}

// Fetch all products (for shop page)
export async function getAllProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(featured desc, _createdAt desc) {
    _id,
    _type,
    name,
    slug,
    price,
    image,
    category,
    subcategory,
    featured
  }`;
  return sanityClient.fetch<Product[]>(query);
}

// Get all product slugs for static generation
export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  const query = `*[_type == "product"] { "slug": slug.current }`;
  return sanityClient.fetch<{ slug: string }[]>(query);
}

// Blog Post Interface
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  excerpt: string;
  body: any[];
}

// Fetch all blog posts
export async function getPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    body
  }`;
  return sanityClient.fetch<BlogPost[]>(query);
}

// Fetch a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    body
  }`;
  return sanityClient.fetch<BlogPost | null>(query, { slug });
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const query = `*[_type == "post"] { "slug": slug.current }`;
  return sanityClient.fetch<{ slug: string }[]>(query);
}

