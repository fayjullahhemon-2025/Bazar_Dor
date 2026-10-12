import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber, formatUnit } from "@/utils/formatters";

export default function CategoryProductCard({ product }: { product: Product }) {
  const pct = product.change?.pct ?? 0;
  const isUp = product.change?.dir === "up" || pct > 0;
  const isDown = product.change?.dir === "down" || pct < 0;

  let badgeStyles = "text-gray-500 bg-gray-100";
  let badgeIcon = "—";
  let formattedPct = `${toBengaliNumber((0).toFixed(1))}%`;

  if (isUp) {
    badgeStyles = "text-red-600 bg-red-50";
    badgeIcon = "▲";
    formattedPct = `${toBengaliNumber(Math.abs(pct).toFixed(1))}%`;
  } else if (isDown) {
    badgeStyles = "text-emerald-600 bg-emerald-50";
    badgeIcon = "▼";
    formattedPct = `${toBengaliNumber(Math.abs(pct).toFixed(1))}%`;
  }

  const isImageEmoji = !product.image?.startsWith("http") && !product.image?.startsWith("/");

  return (
    <Link href={`/product/${product.slug}`} prefetch={false} className="block group">
      <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-xs hover:border-[#05893E]/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">

        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#f4f7f4] flex items-center justify-center text-xl shrink-0">
            {isImageEmoji ? (
              <span className="leading-none">{product.image || product.categoryIcon}</span>
            ) : (
              <img
                src={product.image}
                alt={product.nameBn}
                className="w-6 h-6 object-contain"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-[#05893E] transition-colors">
              {product.nameBn}
            </h3>
            <span className="text-xs text-gray-400 mt-0.5">
              {formatUnit(product.unit)}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between mt-6">
          <div>
            <span className="text-xs text-gray-400 block mb-0.5">আজকের দাম</span>
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {toBengaliNumber(product.today)} টাকা
            </span>
          </div>

          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md ${badgeStyles}`}
          >
            <span>{badgeIcon}</span>
            <span>{formattedPct}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
