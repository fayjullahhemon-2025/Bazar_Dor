import Link from "next/link";

export interface Product {
  id: number | string;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

// Utility function to convert numbers to Bengali digits
const toBengaliNumber = (num: number | string): string => {
  const englishToBengaliMap: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    '.': '.'
  };
  return num.toString().replace(/[0-9.]/g, (match) => englishToBengaliMap[match] || match);
};

export default function ProductCard({ product }: { product: Product }) {
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

  return (
    <Link href={`/product/${product.slug}`} className="block">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#05893E] transition-all duration-200 flex flex-col justify-between h-full">

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 flex justify-center items-center rounded-lg bg-[#F0F5F0]" >
            <span className="text-2xl leading-none">{product.image}</span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-snug">
              {product.nameBn}
            </h3>
            <span className="text-xs text-gray-500 mt-0.5">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
            </span>
          </div>
        </div>


        <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-50">
          <div>
            <span className="text-xs text-gray-400 block">আজকের দাম</span>
            <span className="font-bold text-gray-800 text-base md:text-lg">
              {toBengaliNumber(product.today)} টাকা
            </span>
          </div>

  
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${badgeStyles}`}
          >
            <span>{badgeIcon}</span>
            <span>{formattedPct}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}