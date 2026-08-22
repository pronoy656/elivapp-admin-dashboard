"use client"

import { useState } from "react"
import Link from "next/link"
import { Target, CreditCard, Link as LinkIcon, MousePointerClick, Building2, Users, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"

// Overview Components
import { StatCard } from "@/components/common/stat-card"
import { ReferralActivityChart } from "@/components/dashboard/overview/referral-activity-chart"
import { HowItWorks } from "@/components/dashboard/overview/how-it-works"
import { ListCard } from "@/components/dashboard/overview/list-card"
import { RecentActivity } from "@/components/dashboard/overview/recent-activity"
import { BusinessOverview } from "@/components/dashboard/overview/business-overview"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"promoters" | "businesses">("promoters")

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Good morning, Admin</h1>
          <p className="text-muted-foreground text-sm">Here's what's happening on elivapp today.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Promoters | Businesses Toggle Tab */}
          <div className="flex items-center bg-[#021830] border border-[#0A355C] p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("promoters")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === "promoters"
                  ? "bg-[#C7F556] text-[#00152B] font-semibold"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Promoters</span>
            </button>
            <button
              onClick={() => setActiveTab("businesses")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === "businesses"
                  ? "bg-[#C7F556] text-[#00152B] font-semibold"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Businesses</span>
            </button>
          </div>

          {/* View Pipeline Button */}
          <Link href="/dashboard/referrals">
            <Button className="bg-[#021830] text-white border border-[#0A355C] hover:bg-[#0A355C] rounded-xl px-4 py-2.5 h-auto text-sm font-medium flex items-center gap-2 cursor-pointer">
              <QrCode className="h-4 w-4 text-[#C7F556]" />
              <span>View Pipeline</span>
            </Button>
          </Link>
        </div>
      </div>

      {activeTab === "businesses" ? (
        <BusinessOverview />
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="Total Revenue Paid" 
              value="$10,940" 
              icon={<CreditCard className="h-5 w-5 text-[#D7FE7C]" />} 
              trendValue="+12.4%" 
            />
            <StatCard 
              title="Referral Links Shared" 
              value="534" 
              icon={<LinkIcon className="h-5 w-5 text-[#D7FE7C]" />} 
              trendValue="+8.3%" 
            />
            <StatCard 
              title="Confirmed Conversions" 
              value="424" 
              icon={<MousePointerClick className="h-5 w-5 text-[#D7FE7C]" />} 
              trendValue="+15.1%" 
            />
            <StatCard 
              title="Pending Payouts" 
              value="3" 
              icon={<Target className="h-5 w-5 text-[#FF4D4D]" />} 
              isWarning={true}
            />
          </div>

          {/* Main Chart */}
          <ReferralActivityChart />

          {/* How elivapp Works */}
          <HowItWorks />

          {/* Bottom 3 Columns */}
          <div className="grid gap-4 md:grid-cols-3">
            <ListCard 
              title="Top Businesses"
              FallbackIcon={Building2}
              items={[
                { name: "TacoFusion", desc: "187 conversions · $20/referral", val: "$3,740", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop&crop=faces" },
                { name: "FitZone Gym", desc: "94 conversions · $40/referral", val: "$3,760", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop&crop=faces" },
                { name: "Luna Spa", desc: "61 conversions · $30/referral", val: "$1,830", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100&h=100&fit=crop&crop=faces" },
                { name: "Kava Brew", desc: "38 conversions · $25/referral", val: "$950", img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&h=100&fit=crop&crop=faces" },
              ]}
            />
            <ListCard 
              title="Top Promoters"
              FallbackIcon={Users}
              items={[
                { name: "Alicia Monroe", desc: "141 converted", val: "$3,240", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" },
                { name: "Jordan Travis", desc: "128 converted", val: "$2,890", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" },
                { name: "Devon Rivera", desc: "28 converted", val: "$700", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" },
                { name: "Mia Torres", desc: "19 converted", val: "$475", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" },
              ]}
            />
            <RecentActivity 
              items={[
                { action: "Approved Kava Brew campaign", time: "09:14" },
                { action: "Suspended CloudCuts account", time: "08:32" },
                { action: "Adjusted multiplier Tariq Osman → 0.5x", time: "Yesterday" },
                { action: "Sent push notification to All users", time: "Yesterday" },
                { action: "Commission updated 10% → 15%", time: "3 days ago" },
              ]}
            />
          </div>
        </>
      )}
      
    </div>
  )
}
