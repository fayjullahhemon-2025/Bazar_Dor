export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="relative flex items-center justify-center">
        {/* Outer pulsing ring */}
        <div className="w-16 h-16 rounded-full border-4 border-[#05893E]/20 border-t-[#05893E] animate-spin" />
        {/* Center icon */}
        <div className="absolute w-8 h-8 rounded-full bg-[#05893E]/10 flex items-center justify-center text-base">
          🛒
        </div>
      </div>

      <h3 className="mt-5 text-base sm:text-lg font-bold text-gray-800 tracking-tight">
        লোড হচ্ছে...
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-gray-500 text-center max-w-sm">
        বাজারের সর্বশেষ পণ্যের দর ও তথ্য সংগ্রহ করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন।
      </p>

      {/* Subtle skeleton card placeholders */}
      <div className="w-full max-w-md mt-8 grid grid-cols-3 gap-3">
        <div className="h-16 bg-white/70 rounded-xl border border-gray-100 shadow-xs animate-pulse" />
        <div className="h-16 bg-white/70 rounded-xl border border-gray-100 shadow-xs animate-pulse" />
        <div className="h-16 bg-white/70 rounded-xl border border-gray-100 shadow-xs animate-pulse" />
      </div>
    </div>
  );
}
