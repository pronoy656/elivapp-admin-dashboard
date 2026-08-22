"use client"

import { useState } from "react"
import { Target, CreditCard, Link as LinkIcon, MousePointerClick, Building2, Users, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"

// Overview Components
import { StatCard } from "@/components/common/stat-card"
import { ReferralActivityChart } from "@/components/dashboard/overview/referral-activity-chart"
import { HowItWorks } from "@/components/dashboard/overview/how-it-works"
import { ListCard } from "@/components/dashboard/overview/list-card"
import { RecentActivity } from "@/components/dashboard/overview/recent-activity"

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
                  ? "bg-[#D7FE7C] text-[#00152B] font-semibold"
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
                  ? "bg-[#D7FE7C] text-[#00152B] font-semibold"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Businesses</span>
            </button>
          </div>

          {/* View Pipeline Button */}
          <Button className="bg-[#021830] text-white border border-[#0A355C] hover:bg-[#0A355C] rounded-xl px-4 py-2.5 h-auto text-sm font-medium flex items-center gap-2">
            <QrCode className="h-4 w-4 text-[#D7FE7C]" />
            <span>View Pipeline</span>
          </Button>
        </div>
      </div>

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
            { name: "TacoFusion", desc: "187 conversions • $20/referral", val: "$3,740", img: "/placeholder-user.jpg" },
            { name: "FitZone Gym", desc: "94 conversions • $40/referral", val: "$3,760", img: "/placeholder-user.jpg" },
            { name: "Luna Spa", desc: "61 conversions • $30/referral", val: "$1,830", img: "/placeholder-user.jpg" },
            { name: "Kava Brew", desc: "38 conversions • $25/referral", val: "$950", img: "/placeholder-user.jpg" },
          ]}
        />
        <ListCard 
          title="Top Promoters"
          FallbackIcon={Users}
          items={[
            { name: "Alicia Monroe", desc: "141 converted", val: "$3,240", img: "https://i.pravatar.cc/150?u=alicia" },
            { name: "Jordan Travis", desc: "128 converted", val: "$2,890", img: "https://i.pravatar.cc/150?u=jordan" },
            { name: "Devon Rivera", desc: "28 converted", val: "$700", img: "https://i.pravatar.cc/150?u=devon" },
            { name: "Mia Torres", desc: "19 converted", val: "$475", img: "https://i.pravatar.cc/150?u=mia" },
          ]}
        />
        <RecentActivity 
          items={[
            { action: "Approved Kava Brew campaign", time: "09:14", color: "#D7FE7C" },
            { action: "Suspended CloudCuts account", time: "08:32", color: "#D7FE7C" },
            { action: "Adjusted multiplier Tariq Osman → 0.5x", time: "Yesterday", color: "#D7FE7C" },
            { action: "Sent push notification to All users", time: "Yesterday", color: "#D7FE7C" },
          ]}
        />
      </div>
      
    </div>
  )
}
