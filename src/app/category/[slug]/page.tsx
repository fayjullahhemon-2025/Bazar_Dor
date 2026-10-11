import { Metadata } from "next";
import { Suspense } from "react";
import CategoryView from "@/components/category/CategoryView";
import { Product, Category } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

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

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
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

async function CategoryContent({ params }: PageProps) {
  const { slug } = await params;

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

export default function CategoryPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs animate-pulse h-24 mb-4" />
          <div className="bg-white rounded-2xl px-6 py-3.5 border border-gray-100 shadow-xs animate-pulse h-14 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs h-36 animate-pulse"
              />
            ))}
          </div>
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
