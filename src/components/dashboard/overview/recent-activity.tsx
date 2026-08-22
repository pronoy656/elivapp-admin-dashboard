import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface ActivityItem {
  action: string
  time: string
  color?: string
}

interface RecentActivityProps {
  items: ActivityItem[]
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card className="bg-[#042850] border-[#0A355C] rounded-2xl overflow-hidden p-0">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-[#0A355C]/80 space-y-0">
        <CardTitle className="text-sm font-semibold text-white tracking-wide">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-2 flex flex-col divide-y divide-[#0A355C]/60">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 py-3.5 first:pt-2 last:pb-2">
            <span className="h-2 w-2 rounded-full bg-[#C7F556] shrink-0 mt-1.5" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white leading-tight">{item.action}</span>
              <span className="text-[11px] text-[#64748B] font-normal mt-1">{item.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
