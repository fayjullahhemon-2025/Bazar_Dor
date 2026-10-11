"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkItem {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function NavlinkItems({ links }: { links: NavLinkItem[] }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
      {links.map((link) => {
        const isActive = pathname === `/category/${link.slug}`;
        return (
          <Link
            key={link.id}
            href={`/category/${link.slug}`}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-[#05893E] text-white shadow-xs"
                : "text-gray-800 hover:bg-[#dcdfdc]"
            }`}
          >
            <span className="text-base leading-none">{link.icon}</span>
            <span>{link.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
}
