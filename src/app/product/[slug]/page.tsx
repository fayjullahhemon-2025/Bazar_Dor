import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { Product } from "@/types";
import { toBengaliNumber } from "@/utils/formatters";
import ProductDetailView from "@/components/product/ProductDetailView";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      }
    }

    const fallbackRes = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
      next: { revalidate: 60 },
    });
    if (!fallbackRes.ok) return null;
    const products: Product[] = await fallbackRes.json();
    return Array.isArray(products) ? products.find((p) => p.slug === slug) || null : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি - বাজার দর",
      description: "বাজার দর - পণ্যের আজকের বাজার দর",
    };
  }

  return {
    title: `${product.nameBn} - আজকের বাজার দর | বাজার দর`,
    description: `${product.nameBn}-এর আজকের বাজার দর ${toBengaliNumber(product.today)} টাকা এবং বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের তালিকা।`,
  };
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 animate-pulse">
          <div className="h-4 w-40 bg-gray-200/80 rounded-lg mb-6" />
          <div className="h-32 bg-white rounded-2xl border border-gray-100 mb-6" />
          <div className="h-96 bg-white rounded-2xl border border-gray-100" />
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
