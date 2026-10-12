import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Navlinks from "@/components/shared/Navlinks";
import { Suspense } from "react";
import Marquee from "@/components/shared/Marquee";
import Footer from "@/components/shared/Footer";
import ToastProvider from "@/components/shared/ToastProvider";

const HindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আজকের বাজার দর ও তথ্য",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${HindSiliguri.className} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#f2f6f3]">
        <ToastProvider />
        <Header />
        <Suspense>
          <Navlinks />
        </Suspense>
        <Suspense>
          <Marquee />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}