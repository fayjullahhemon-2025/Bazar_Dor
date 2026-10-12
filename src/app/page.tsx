import HeroSection from "@/components/homepage/hero";
import ProductSection from "@/components/homepage/ProductSection";
import Image from "next/image";
async function getProducts() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
export default async function Home() {
  const products = await getProducts();
  const priceHikeProducts = products.filter((p: any) => p.change.dir === "up").sort((a: any, b: any) => b?.change?.pct - a?.change?.pct).slice(0, 6);
  const priceDecreaseProducts = products.filter((p: any) => p.change.dir === "down").sort((a: any, b: any) => a?.change?.pct - b?.change?.pct).slice(0, 6);
  return (
    <div>
      <HeroSection></HeroSection>
      <ProductSection
        title="আজ দাম বেড়েছে"
        icon="▲"
        iconColor="text-red-500"
        products={priceHikeProducts}
      />
      <ProductSection
        title="আজ দাম কমেছে"
        icon="▼"
        iconColor="text-emerald-500"
        products={priceDecreaseProducts}
      />

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="সবটি পণ্যের বাজার দর তালিকা"
        total={products.length}
        products={products}
      />
    </div>
  );
}
