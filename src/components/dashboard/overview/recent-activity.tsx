import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface ActivityItem {
  action: string
  time: string
  color: string
}

interface RecentActivityProps {
  items: ActivityItem[]
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card className="bg-[#042850] border-[#0A355C]">
      <CardHeader className="pb-4 mb-4 border-b border-[#D7FE7C]/60">
        <CardTitle className="text-sm font-medium text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 border-b border-[#D7FE7C]/60 pb-4 h-16 last:border-0 last:pb-0">
            <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white">{item.action}</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">{item.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
