import Image from 'next/image';
import { Suspense } from 'react';
import DateComponent from '../shared/Date';
import HeroImg from '@/assets/bazar-hero.png'

export default function HeroSection() {
  return (
    <section className="bg-[#f2f6f3] p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">


        <div className="flex-1 space-y-4">

          <div className="inline-block px-3 py-1 bg-[#e2f0e7] text-[#05893E] text-xs font-semibold rounded-full">
            <Suspense fallback={<span></span>}>

              <span><DateComponent></DateComponent></span>
            </Suspense>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <a
              href="#সব-পণ্য"
              className="btn bg-[#05893E] hover:bg-[#046e32] text-white font-medium px-6 py-2.5 rounded-xl shadow-md border-none text-sm transition-all inline-flex items-center justify-center"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        <div className="flex-shrink-0 w-48 md:w-64 lg:w-72 flex justify-center items-center">
          <Image
            src={HeroImg}
            alt="Grocery Basket"
            width={280}
            height={220}
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}