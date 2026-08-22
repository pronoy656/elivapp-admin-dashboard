import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowUpRight } from "lucide-react"

export interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trendValue?: string
  isWarning?: boolean
}

export function StatCard({ title, value, icon, trendValue, isWarning }: StatCardProps) {
  return (
    <Card className="bg-[#042850] border-[#0A355C]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className={`p-2 rounded-lg ${isWarning ? 'bg-[#FF4D4D]/15' : 'bg-[#D7FE7C]/15'}`}>
          {icon}
        </div>
        
        {isWarning ? (
          <Badge variant="outline" className="text-[#FF4D4D] border-transparent bg-[#FF4D4D]/25 hover:bg-[#FF4D4D]/35">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {trendValue || "Needs review"}
          </Badge>
        ) : trendValue ? (
          <div className="flex items-center gap-1 text-[#D7FE7C] bg-[#D7FE7C]/15 px-2 py-1 rounded-md text-xs font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{trendValue}</span>
          </div>
        ) : null}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <p className="text-xs text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}
