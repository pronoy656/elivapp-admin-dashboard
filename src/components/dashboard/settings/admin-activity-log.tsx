import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const activities = [
  { id: 1, action: "Approved Kava Brew campaign", time: "09:14" },
  { id: 2, action: "Suspended CloudCuts account", time: "08:32" },
  { id: 3, action: "Adjusted multiplier Tariq Osman → 0.5x", time: "Yesterday" },
  { id: 4, action: "Sent push notification to All users", time: "Yesterday" },
  { id: 5, action: "Commission updated 10% → 15%", time: "3 days ago" },
]

export function AdminActivityLog() {
  return (
    <Card className="bg-[#042850] border-[#0A355C] w-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-[#0A355C] pb-4 pt-5 px-6">
        <CardTitle className="text-sm font-semibold text-white">Admin Activity Log</CardTitle>
        <Badge className="bg-[#00152B] hover:bg-[#00152B] text-[#94A3B8] font-medium border border-[#0A355C] rounded-md px-2.5 py-0.5">
          5 events
        </Badge>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="flex flex-col">
          {activities.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex items-center justify-between p-4 px-6 ${index !== activities.length - 1 ? 'border-b border-[#0A355C]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-[#C7F556]"></div>
                <span className="text-sm text-white">{item.action}</span>
              </div>
              <span className="text-xs text-[#5C7C9E] font-medium opacity-80">{item.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
