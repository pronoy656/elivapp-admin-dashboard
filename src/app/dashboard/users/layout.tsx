"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Users } from "lucide-react"

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isBusiness =
    pathname.includes("/dashboard/users/business") ||
    pathname.includes("/dashboard/users/businesses") ||
    pathname === "/dashboard/businesses"
  const isPromoters =
    pathname.includes("/dashboard/users/promoters") ||
    pathname === "/dashboard/promoters"

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Users Subroute Header & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {isBusiness
              ? "Business Management"
              : isPromoters
              ? "Promoter Management"
              : "User Management"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {isBusiness
              ? "Review awaiting approvals and manage all listed businesses."
              : isPromoters
              ? "Monitor promoter performance, disputes, and rewards distribution."
              : "Manage businesses and promoters on elivapp."}
          </p>
        </div>

        {/* Subroute Switcher Tabs */}
        <div className="flex items-center bg-[#021830] border border-[#0A355C] p-1 rounded-xl self-start sm:self-auto shadow-inner">
          <Link
            href="/dashboard/users/business"
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isBusiness
                ? "bg-[#C7F556] text-[#00152B] font-semibold shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Business</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-bold ml-1 ${
                isBusiness
                  ? "bg-[#00152B]/15 text-[#00152B]"
                  : "bg-[#0A355C] text-[#C7F556]"
              }`}
            >
              2
            </span>
          </Link>

          <Link
            href="/dashboard/users/promoters"
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isPromoters
                ? "bg-[#C7F556] text-[#00152B] font-semibold shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Promoters</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-bold ml-1 ${
                isPromoters
                  ? "bg-[#00152B]/15 text-[#00152B]"
                  : "bg-[#0A355C] text-[#C7F556]"
              }`}
            >
              2
            </span>
          </Link>
        </div>
      </div>

      {children}
    </div>
  )
}
