'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Logo from '@/assets/logo.png';
import DateComponent from './Date';
import { useSession, signOut } from '@/lib/auth-client';

export default function Header() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [dropdownOpen]);

    const handleSignOut = async () => {
        setDropdownOpen(false);
        try {
            await signOut();
            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out error:", error);
            toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
        }
    };

    const user = session?.user;
    const displayName = user?.name ? user.name.split(' ')[0] : 'ইউজার';

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
                {isPending ? (
                    <div className="w-24 h-9 bg-gray-200/60 rounded-xl animate-pulse" />
                ) : user ? (
                    <div className="relative" ref={dropdownRef}>

                        <button
                            type="button"
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100/80 transition-colors focus:outline-none cursor-pointer"
                        >
                            {user.image ? (
                                <img
                                    src={user?.image}
                                    alt={user?.name || "User"}
                                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-[#05893E]/15 text-[#05893E] font-bold flex items-center justify-center text-sm border border-[#05893E]/20">
                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                            <span className="text-sm font-semibold text-gray-800">
                                {displayName}
                            </span>
                            <span className="text-gray-400 text-xs select-none">▾</span>
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl p-4 shadow-xl border border-gray-100/90 z-50 animate-in fade-in zoom-in-95 duration-100">
                                {/* User Info Header */}
                                <div className="mb-3">
                                    <h4 className="text-sm font-bold text-gray-900 leading-snug truncate">
                                        {user.name || 'ইউজার'}
                                    </h4>
                                    <p className="text-xs text-gray-400 truncate mt-0.5">
                                        {user.email}
                                    </p>
                                </div>

                                <div className="border-t border-gray-100 my-2.5" />

                                {/* Menu Links */}
                                <div className="space-y-1">
                                    <Link
                                        href="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2.5 px-2 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                                    >
                                        <svg
                                            className="w-4 h-4 text-sky-600 shrink-0"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                        <span>আমার প্রোফাইল</span>
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-2.5 px-2 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50/60 rounded-lg transition-colors font-medium cursor-pointer text-left"
                                    >
                                        <svg
                                            className="w-4 h-4 text-red-500 shrink-0"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="9 10 4 15 9 20" />
                                            <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                                        </svg>
                                        <span>সাইন আউট</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link
                            href="/sign-in"
                            className="btn btn-ghost text-gray-700 hover:bg-gray-100 font-medium"
                        >
                            সাইন ইন
                        </Link>
                        <Link
                            href="/sign-up"
                            className="btn bg-[#05893E] hover:bg-[#046e32] text-white border-none rounded-lg px-6 shadow-sm flex items-center justify-center"
                        >
                            সাইন আপ
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}