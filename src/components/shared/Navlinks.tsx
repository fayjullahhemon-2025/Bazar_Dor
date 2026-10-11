import NavlinkItems, { NavLinkItem } from "./NavlinkItems";

const getLinks = async (): Promise<NavLinkItem[]> => {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error("Http Error");
    }
    return res.json();
  } catch (error) {
    console.error("Navlinks fetch error:", error);
    return [];
  }
};

export default async function Navlinks() {
  const links = await getLinks();

  return (
    <nav className="border-b border-gray-200/80 pb-3 w-full" aria-label="Categories">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <NavlinkItems links={links} />
      </div>
    </nav>
  );
}