import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SentHistoryItem {
  id: string
  title: string
  description: string
  target: string
  reach: string
  time: string
}

const dummyData: SentHistoryItem[] = [
  {
    id: "1",
    title: "Weekend Bonus!",
    description: "Top 5 promoters earn 2x this weekend",
    target: "Promoters",
    reach: "312 reached",
    time: "Yesterday"
  },
  {
    id: "2",
    title: "New Campaigns Available",
    description: "3 new high-reward businesses added",
    target: "All",
    reach: "2,841 reached",
    time: "3 days ago"
  },
  {
    id: "3",
    title: "Payout Processed",
    description: "Referral rewards have been transferred to your wallet",
    target: "Promoters",
    reach: "289 reached",
    time: "1 week ago"
  }
]

export function SentHistory() {
  return (
    <Card className="bg-[#042850] border-[#0A355C] h-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-5 px-6 border-b border-[#0A355C]">
        <CardTitle className="text-sm font-semibold text-white">Sent History</CardTitle>
        <Button variant="link" className="h-auto p-0 text-xs font-semibold text-[#F87171] hover:text-[#F87171]/80">
          Clear all
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          {dummyData.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex flex-col gap-3 p-6 ${index !== dummyData.length - 1 ? 'border-b border-[#0A355C]/50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <span className="text-[10px] text-[#94A3B8] font-medium mt-0.5">{item.time}</span>
              </div>
              
              <p className="text-xs text-[#CBD5E1] -mt-1">{item.description}</p>
              
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-[#0A355C]/50 text-[#94A3B8] px-2 py-0.5 rounded text-[10px] font-medium">
                    <span className="text-[#0A355C] opacity-70">→</span> {item.target}
                  </div>
                  <span className="text-[11px] font-semibold text-[#34D399]">{item.reach}</span>
                </div>
                
                <Button variant="link" className="h-auto p-0 text-[11px] font-medium text-[#F87171] hover:text-[#F87171]/80">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
