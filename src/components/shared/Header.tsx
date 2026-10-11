import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';
import Logo from '@/assets/logo.png'
import DateComponent from './Date';
import Navlinks from './Navlinks';
export default function Header() {

    const auth_links =
        <>
            <button className="btn btn-ghost text-gray-700 hover:bg-gray-100 font-medium">
                সাইন ইন
            </button>
            <button className="btn bg-[#05893E] hover:bg-[#046e32] text-white border-none rounded-lg px-6 shadow-sm">
                সাইন আপ
            </button>
        </>

    return (
        <header className="navbar px-4 md:px-12 py-3 flex justify-between items-center max-w-7xl mx-auto">

            <Link href="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity">
                <div className="w-12 h-12 flex justify-center items-center rounded-2xl bg-[#05893E]">
                    <Image
                        src={Logo}
                        width={28}
                        height={28}
                        alt="logo"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-gray-900 leading-tight">
                        বাজার দর
                    </h1>
                    <div className="text-xs text-gray-500">
                        <Suspense>
                            <DateComponent />
                        </Suspense>
                    </div>
                </div>
            </Link>


            <div className="flex items-center gap-2">
                {auth_links}
            </div>
            
        </header>
    );
}