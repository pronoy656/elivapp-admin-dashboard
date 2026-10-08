"use client"

import { Users, Target, CheckCircle2, Clock } from "lucide-react"
import { StatCard } from "@/components/common/stat-card"

export function LeadStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Leads" 
        value="1,420" 
        icon={<Users className="h-5 w-5 text-[#D7FE7C]" />} 
        trendValue="+14.8%" 
      />
      <StatCard 
        title="Qualified Leads" 
        value="892" 
        icon={<Target className="h-5 w-5 text-[#D7FE7C]" />} 
        trendValue="62.8% rate" 
      />
      <StatCard 
        title="Converted Deals" 
        value="540" 
        icon={<CheckCircle2 className="h-5 w-5 text-[#34D399]" />} 
        trendValue="+18.2%" 
      />
      <StatCard 
        title="Pending Follow-up" 
        value="18" 
        icon={<Clock className="h-5 w-5 text-[#FF4D4D]" />} 
        trendValue="Needs action" 
        isWarning={true}
      />
    </div>
  )
}
