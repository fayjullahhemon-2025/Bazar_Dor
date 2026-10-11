"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber } from "@/utils/formatters";
import CategoryProductCard from "./CategoryProductCard";

interface CategoryViewProps {
  categoryName: string;
  categoryIcon: string;
  initialProducts: Product[];
  categorySlug: string;
}

export default function CategoryView({
  categoryName,
  categoryIcon,
  initialProducts,
  categorySlug,
}: CategoryViewProps) {
  const [sortBy, setSortBy] = useState<string>("default");

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.today - a.today);
    }
    if (sortBy === "change-desc") {
      return list.sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0));
    }
    if (sortBy === "change-asc") {
      return list.sort((a, b) => (a.change?.pct ?? 0) - (b.change?.pct ?? 0));
    }
    return list;
  }, [initialProducts, sortBy]);

  const isIconEmoji = !categoryIcon?.startsWith("http") && !categoryIcon?.startsWith("/");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">

      <div className="bg-white rounded-2xl p-6 border border-gray-100/90 shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#f4f7f4] flex items-center justify-center text-3xl shrink-0">
          {isIconEmoji ? (
            <span className="leading-none">{categoryIcon || "🛒"}</span>
          ) : (
            <img
              src={categoryIcon}
              alt={categoryName}
              className="w-8 h-8 object-contain"
            />
          )}
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {toBengaliNumber(initialProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>


      <div className="bg-white rounded-2xl px-6 py-3.5 border border-gray-100/90 shadow-xs flex items-center justify-end mt-4">
        <div className="flex items-center gap-3">
          <label htmlFor="sort-dropdown" className="text-sm font-medium text-gray-600">
            সাজান
          </label>
          <div className="relative">
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-3.5 py-1.5 pr-8 text-sm text-gray-700 font-medium cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#05893E]"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
              <option value="change-desc">পরিবর্তন: সবচেয়ে বৃদ্ধি</option>
              <option value="change-asc">পরিবর্তন: সবচেয়ে হ্রাস</option>
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-4">
        <p className="text-xs sm:text-sm font-medium text-gray-600">
          মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>


      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <CategoryProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-xs mt-4">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-3xl mx-auto mb-3">
            🛒
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            অনুগ্রহ করে অন্য কোনো ক্যাটাগরি নির্বাচন করুন।
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-4 py-2 bg-[#05893E] text-white rounded-lg text-sm font-medium hover:bg-[#046e32] transition-colors"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      )}
    </div>
  );
}
