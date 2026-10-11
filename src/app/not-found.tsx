import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm text-center">
        {/* 404 Visual Indicator */}
        <div className="w-20 h-20 rounded-3xl bg-[#05893E]/10 text-[#05893E] flex items-center justify-center text-3xl font-black mx-auto mb-6">
          ৪০৪
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 mb-3">
          ৪০৪ ত্রুটি (404 Error)
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
          দুঃখিত, আপনি যে পাতাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি হয়তো ভুল লেখা হয়েছে।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#05893E] hover:bg-[#046e32] active:bg-[#035a28] text-white font-bold rounded-xl text-sm shadow-xs transition-colors inline-flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>হোমে ফিরে যান</span>
          </Link>

          <Link
            href="/category/chal"
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>বাজারের পণ্য দেখুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
