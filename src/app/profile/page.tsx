"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession, signOut, updateUser } from "@/lib/auth-client";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [signOutLoading, setSignOutLoading] = useState(false);

    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session?.user?.name]);

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push(`/sign-in?redirected=true&callbackUrl=/profile&t=${Date.now()}`);
        }
    }, [isPending, session, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = name.trim();
        if (!trimmedName) {
            toast.warning("অনুগ্রহ করে একটি নাম লিখুন।");
            return;
        }

        setLoading(true);
        try {
            const res = await updateUser({
                name: trimmedName,
            });

            if (res?.error) {
                toast.error(res.error.message || "প্রোফাইল আপডেট ব্যর্থ হয়েছে।");
            } else {
                toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
                router.refresh();
            }
        } catch (err) {
            console.error("Profile update error:", err);
            toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setSignOutLoading(true);
        try {
            await signOut();
            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            router.push("/sign-in");
            router.refresh();
        } catch (err) {
            console.error("Sign out error:", err);
            toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
        } finally {
            setSignOutLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <div className="h-8 w-44 bg-gray-200/70 rounded-xl animate-pulse mb-2" />
                <div className="h-4 w-60 bg-gray-200/50 rounded-lg animate-pulse mb-8" />
                <div className="h-32 bg-white rounded-2xl border border-gray-100 animate-pulse mb-6" />
                <div className="h-48 bg-white rounded-2xl border border-gray-100 animate-pulse" />
            </div>
        );
    }

    if (!session?.user) {
        return null;
    }

    const user = session.user;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">

            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    আমার প্রোফাইল
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6">
                <div className="flex items-center gap-4 sm:gap-5">

                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 flex items-center justify-center">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name || "User Avatar"}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#05893E]/10 text-[#05893E] font-black text-2xl sm:text-3xl flex items-center justify-center">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}
                    </div>


                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                            {user.name || "ইউজার"}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                            {user.email}
                        </p>
                    </div>
                </div>


                <div>
                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signOutLoading}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 hover:border-red-300 hover:bg-red-50/60 active:bg-red-100 text-red-500 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60"
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
                        <span>{signOutLoading ? "বের হওয়া হচ্ছে..." : "সাইন আউট"}</span>
                    </button>
                </div>
            </div>


            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100/90 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-5">
                    তথ্য
                </h3>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2"
                        >
                            নাম
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="আপনার নাম লিখুন"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200/90 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#05893E]/20 focus:border-[#05893E] transition-all bg-white"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[#05893E] hover:bg-[#046e32] active:bg-[#035a28] text-white text-sm sm:text-base font-bold rounded-xl shadow-xs transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    আপডেট হচ্ছে...
                                </>
                            ) : (
                                "আপডেট"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
