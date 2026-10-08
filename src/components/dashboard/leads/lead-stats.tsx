"use client"

import { Users, CheckCircle2, Clock } from "lucide-react"
import { StatCard } from "@/components/common/stat-card"

export function LeadStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        title="Total Leads" 
        value="1,420" 
        icon={<Users className="h-5 w-5 text-[#D7FE7C]" />} 
        trendValue="+14.8%" 
      />
      <StatCard 
        title="Approved Leads" 
        value="840" 
        icon={<CheckCircle2 className="h-5 w-5 text-[#34D399]" />} 
        trendValue="+18.2%" 
      />
      <StatCard 
        title="Pending Review" 
        value="48" 
        icon={<Clock className="h-5 w-5 text-[#FF4D4D]" />} 
        trendValue="Needs action" 
        isWarning={true}
      />
    </div>
  )
}
