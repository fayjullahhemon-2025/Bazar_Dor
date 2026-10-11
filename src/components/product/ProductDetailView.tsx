"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber, formatUnit, getUnitShortName } from "@/utils/formatters";

interface ProductDetailViewProps {
  product: Product;
}

const formatMarketAvg = (min: number, max: number): string => {
  const avg = (min + max) / 2;
  const isInteger = Number.isInteger(avg);
  const formattedNum = isInteger ? avg.toString() : avg.toFixed(2);
  return `${toBengaliNumber(formattedNum)} টাকা`;
};

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const pct = product.change?.pct ?? 0;
  const isUp = product.change?.dir === "up" || pct > 0;
  const isDown = product.change?.dir === "down" || pct < 0;

  const unitShort = getUnitShortName(product.unit);


  const yesterdayPrice = product.yesterday ?? product.today;
  const priceDiff = product.today - yesterdayPrice;

  let priceDiffText = "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
  if (priceDiff > 0) {
    priceDiffText = `গতকালের তুলনায় আজ দাম বেড়েছে : ${toBengaliNumber(priceDiff)} টাকা`;
  } else if (priceDiff < 0) {
    priceDiffText = `গতকালের তুলনায় আজ দাম কমেছে : ${toBengaliNumber(Math.abs(priceDiff))} টাকা`;
  }


  const markets = product.markets ?? [];

  const { minPrice, maxPrice, avgPrice } = useMemo(() => {
    if (markets.length === 0) {
      return {
        minPrice: product.today,
        maxPrice: product.today,
        avgPrice: product.today,
      };
    }

    const min = Math.min(...markets.map((m) => m.min));
    const max = Math.max(...markets.map((m) => m.max));
    const avgSum = markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0);
    const avg = Math.round(avgSum / markets.length);

    return {
      minPrice: min,
      maxPrice: max,
      avgPrice: avg,
    };
  }, [markets, product.today]);


  const sortedMarkets = useMemo(() => {
    if (markets.length === 0) return [];
    return [...markets].sort((a, b) => {
      if (a.min !== b.min) return a.min - b.min;
      const avgA = (a.min + a.max) / 2;
      const avgB = (b.min + b.max) / 2;
      return avgA - avgB;
    });
  }, [markets]);

  const isImageEmoji =
    !product.image?.startsWith("http") && !product.image?.startsWith("/");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">

      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 font-medium"
      >
        <Link href="/" className="hover:text-[#05893E] transition-colors">
          হোম
        </Link>
        <span className="text-gray-400 text-xs">›</span>
        {product.category && (
          <>
            <Link
              href={`/category/${product.category}`}
              className="hover:text-[#05893E] transition-colors"
            >
              {product.categoryNameBn || "ক্যাটাগরি"}
            </Link>
            <span className="text-gray-400 text-xs">›</span>
          </>
        )}
        <span className="text-gray-700 font-semibold truncate">
          {product.nameBn}
        </span>
      </nav>


      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f4f7f4] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {isImageEmoji ? (
              <span className="leading-none">
                {product.image || product.categoryIcon || "🍚"}
              </span>
            ) : (
              <img
                src={product.image}
                alt={product.nameBn}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            )}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
              {formatUnit(product.unit)}
              {product.categoryNameBn ? ` · ${product.categoryNameBn}` : ""}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
              {priceDiffText}
            </p>
          </div>
        </div>

        <div className="bg-[#f8faf8] border border-gray-100/80 rounded-2xl p-4 sm:px-6 sm:py-4 text-center min-w-[130px] self-start md:self-auto shrink-0">
          <span className="text-xs text-gray-500 font-medium block mb-1">
            আজকের দর
          </span>
          <div className="text-3xl sm:text-4xl font-black text-gray-900 leading-none mb-1">
            {toBengaliNumber(product.today)}
          </div>
          <span className="text-xs text-gray-400 font-medium block mb-2">
            টাকা / {unitShort}
          </span>
          <div
            className={`text-xs font-bold flex items-center justify-center gap-1 ${isUp
              ? "text-red-500"
              : isDown
                ? "text-emerald-600"
                : "text-gray-500"
              }`}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
            <span>{toBengaliNumber(Math.abs(pct).toFixed(1))}%</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100/90 shadow-xs mt-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-gray-500 font-medium block mb-1.5">
                সর্বনিম্ন দর
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#05893E] mb-1.5">
                {toBengaliNumber(minPrice)} টাকা
              </div>
              <span className="text-xs text-gray-400 font-medium block">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-gray-500 font-medium block mb-1.5">
                সর্বাধিক দর
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E53935] mb-1.5">
                {toBengaliNumber(maxPrice)} টাকা
              </div>
              <span className="text-xs text-gray-400 font-medium block">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-gray-500 font-medium block mb-1.5">
                গড় দর
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#05893E] mb-1.5">
                {toBengaliNumber(avgPrice)} টাকা
              </div>
              <span className="text-xs text-gray-400 font-medium block">
                প্রতি {unitShort}-এর হিসাবে
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-2">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {sortedMarkets.length > 0 ? (
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-left border-collapse min-w-[540px]">
                <thead>
                  <tr className="border-b border-gray-200/90">
                    <th className="py-3.5 px-4 text-xs sm:text-sm font-semibold text-gray-600 text-left">
                      বাজার
                    </th>
                    <th className="py-3.5 px-4 text-xs sm:text-sm font-semibold text-gray-600 text-left">
                      বিভাগ
                    </th>
                    <th className="py-3.5 px-4 text-xs sm:text-sm font-semibold text-gray-600 text-right">
                      সর্বনিম্ন
                    </th>
                    <th className="py-3.5 px-4 text-xs sm:text-sm font-semibold text-gray-600 text-right">
                      সর্বাধিক
                    </th>
                    <th className="py-3.5 px-4 text-xs sm:text-sm font-semibold text-gray-600 text-right">
                      গড়
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedMarkets.map((m, index) => (
                    <tr
                      key={`${m.market}-${index}`}
                      className="border-b border-gray-800 last:border-b-0 hover:bg-[#fcfdfc] transition-colors"
                    >
                      <td className="py-3.5 px-4 text-sm font-bold text-gray-800 text-left">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-600 text-left">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-4 text-sm font-bold text-gray-800 text-right whitespace-nowrap">
                        {toBengaliNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-sm font-bold text-gray-800 text-right whitespace-nowrap">
                        {toBengaliNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-sm font-bold text-gray-800 text-right whitespace-nowrap">
                        {formatMarketAvg(m.min, m.max)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">
              কোনো বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
