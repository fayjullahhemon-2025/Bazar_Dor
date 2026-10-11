import Link from "next/link";
import { Metadata } from "next";
import { Product } from "@/types";
import { toBengaliNumber } from "@/utils/formatters";
import ProductDetailView from "@/components/product/ProductDetailView";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

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

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-3xl mx-auto mb-4">
            🛒
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            পণ্যটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            দুঃখিত, আপনি যে পণ্যটি খুঁজছেন তা এই মুহূর্তে উপলব্ধ নেই।
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-[#05893E] text-white rounded-xl font-medium hover:bg-[#046e32] transition-colors"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailView product={product} />;
}
