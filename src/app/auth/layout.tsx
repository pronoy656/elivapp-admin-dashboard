import React from "react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full bg-[#00152B] text-white">
      {/* Left Side Panel with Frame 77 Background & Light Blue Gradient */}
      <div className="hidden lg:flex lg:w-[35%] xl:w-[32%] relative bg-[#021428] items-center justify-center p-8 xl:p-12 overflow-hidden border-r border-[#0A355C]/40">
        {/* New Auth Background Image */}
        <img
          src="/auth-bg.png"
          alt="Elivapp Auth Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Very Light Blue Linear Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#042850]/45 via-[#0A355C]/25 to-[#00152B]/60" />

        {/* Centered Brand Logo & Title Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-5">
          <Link href="/" className="flex flex-col items-center justify-center gap-4 group">
            <img
              src="/brand-logo.png"
              alt="Elivapp Heart Icon"
              className="h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            />
            <img
              src="/brand-logo-tag.png"
              alt="Elivapp - Share the good. Earn more."
              className="h-24 w-auto object-contain brightness-0 invert filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)]"
            />
          </Link>
        </div>
      </div>

      {/* Right Auth Form Area */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-12 bg-[#00152B] relative">
        {/* Mobile Header Logo */}
        <div className="lg:hidden flex flex-col items-center mb-8 gap-2">
          <img src="/brand-logo.png" alt="Elivapp" className="h-20 w-auto object-contain" />
          <img src="/brand-logo-tag.png" alt="Elivapp" className="h-10 w-auto object-contain brightness-0 invert" />
        </div>

        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </div>
    </div>
  )
}
