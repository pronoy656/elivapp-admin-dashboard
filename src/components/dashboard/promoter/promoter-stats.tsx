import { Users, CreditCard, Target } from "lucide-react"
import { StatCard } from "@/components/common/stat-card"

export function PromoterStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        title="Active Promoters" 
        value="6" 
        icon={<Users className="h-5 w-5 text-[#D7FE7C]" />} 
        trendValue="+7 this month" 
      />
      <StatCard 
        title="Total Rewards Paid" 
        value="$8,075" 
        icon={<CreditCard className="h-5 w-5 text-[#D7FE7C]" />} 
        trendValue="~ All time" 
      />
      <StatCard 
        title="Open Disputes" 
        value="2" 
        icon={<Target className="h-5 w-5 text-[#FF4D4D]" />} 
        trendValue="~ Needs action" 
        isWarning={true}
      />
    </div>
  )
}
