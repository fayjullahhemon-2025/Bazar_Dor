import ProductCard, { Product } from "./ProductCard";

interface ProductSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: string;
  iconColor?: string;
  total?: number;
  products: Product[];
}
const toBengaliNumber = (num: number | string) => {
  const englishToBengaliMap: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    '.': '.'
  };
  return num.toString().replace(/[0-9.]/g, (match) => englishToBengaliMap[match] || match);
};
export default function ProductSection({
  id,
  title,
  subtitle,
  icon,
  iconColor = "text-gray-700",
  products,
  total
}: ProductSectionProps) {
  return (
    <section id={id} className="my-8 px-4 w-full scroll-mt-6" >

      <div className="max-w-6xl mx-auto">

        <div className="mb-4">
          <div className="flex items-center gap-2">
            {icon && <span className={`text-sm ${iconColor}`}>{icon}</span>}
            <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>
          </div>
          {
            products.length === total ? <><p className="text-xs text-gray-500 mt-0.5">{`মোট ${toBengaliNumber(total)}টি পণ্য দেখানো হচ্ছে`}</p></> : <></>
          }

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}