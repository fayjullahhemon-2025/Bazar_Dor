import { Metadata } from "next";
import CategoryView from "@/components/category/CategoryView";
import { Product, Category } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryProducts(slug: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const currentCategory = categories.find((c) => c.slug === slug);
  const title = currentCategory
    ? `${currentCategory.nameBn} - বাজার দর | আজকের বাজার দর`
    : `ক্যাটাগরি - বাজার দর`;

  return {
    title,
    description: `${currentCategory?.nameBn || slug} পণ্যের আজকের বাজার দর এবং দামের ওঠানামা।`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch products and category list in parallel
  const [products, categories] = await Promise.all([
    getCategoryProducts(slug),
    getCategories(),
  ]);

  const currentCategory = categories.find((c) => c.slug === slug);
  const categoryName = currentCategory?.nameBn || products[0]?.categoryNameBn || slug;
  const categoryIcon = currentCategory?.icon || products[0]?.categoryIcon || "🛒";

  return (
    <CategoryView
      categoryName={categoryName}
      categoryIcon={categoryIcon}
      initialProducts={products}
      categorySlug={slug}
    />
  );
}
