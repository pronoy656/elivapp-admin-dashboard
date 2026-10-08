"use client"

import React from "react"
import { usePathname } from "next/navigation"

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
      {/* Users Subroute Header */}
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
              ? "Manage all listed businesses on elivapp."
              : isPromoters
              ? "Monitor promoter performance and rewards distribution."
              : "Manage businesses and promoters on elivapp."}
          </p>
        </div>
      </div>

      {children}
    </div>
  )
}
