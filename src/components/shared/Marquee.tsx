import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const getMarqueeTexts = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', {
            next: { revalidate: 60 },
        });
        if (!res.ok) {
            throw new Error('Http Error');
        }
        return res.json();
    } catch (error) {
        throw new Error('Http Error');
    } finally {
        console.log('Marquee texts fetched successfully');
    }
}

interface MarkeueeProduct {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}
const toBengaliNumber = (num: number | string) => {
    const englishToBengaliMap: { [key: string]: string } = {
        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
        '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
        '.': '.'
    };
    return num.toString().replace(/[0-9.]/g, (match) => englishToBengaliMap[match] || match);
};
export default async function Marquee() {
    const data = await getMarqueeTexts();
    // Ensuring we work with an array whether the API returns it directly or nested under data
    const products: MarkeueeProduct[] = Array.isArray(data) ? data : data.data || [];

    return (
        <div className="py-2 bg-white border-y border-gray-100">
            <MarqueeText
                duration={10}
                pauseOnHover={true}
                direction="right"
            >
                <div className="flex items-center gap-8">
                    {products.map((item) => {
                        const isUp = item.change.dir === "up";

                        return (
                            <div key={item.id} className="flex items-center gap-1 whitespace-nowrap ">

                                <span className="text-xl">{item.image}</span>
                                <span className="font-semibold text-gray-800 text-sm md:text-base">
                                    {item.nameBn}
                                </span>
                                <span className="text-gray-700 text-sm md:text-base">
                                    {toBengaliNumber(item.today)} টাকা/{item.unit === "kg" ? "কেজি" :
                                        item.unit === "litre" ? "লিটার" :
                                            item.unit === "dozen" ? "ডজন" :
                                                item.unit === "piece" ? "পিস" : item.unit}
                                </span>
                                <div className={`flex items-center gap-1 font-semibold text-sm ${isUp ? "text-red-600" : "text-green-600"}`}>
                                    <span>{isUp ? "▲" : "▼"}</span>
                                    <span>{toBengaliNumber(item.change.pct)}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </MarqueeText>
        </div>
    );
}