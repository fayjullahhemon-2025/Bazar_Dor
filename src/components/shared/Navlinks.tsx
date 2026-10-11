import Link from "next/link";

const getLinks = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');
        if (!res.ok) {
            throw new Error('Http Error');
        }
        return res.json();
    } catch (error) {
        throw new Error('Http Error');
    } finally {
        console.log('Navlinks fetched successfully');
    }
}

interface navType {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

export default async function Navlinks() {
    const links: navType[] = await getLinks();

    return (
        <div className=" border-b border-gray-200 pb-3 pl-10">
            <div className=" flex items-center  gap-2 sm:gap-4 flex-wrap px-4">
                {links.map((link) => (
                    <Link 
                        key={link.id} 
                        href={`/${link.slug}`}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-800 font-semibold text-sm transition-all duration-200 hover:bg-[#dcdfdc]"
                    >
                        <span className="text-base leading-none">{link.icon}</span>
                        <span>{link.nameBn}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}