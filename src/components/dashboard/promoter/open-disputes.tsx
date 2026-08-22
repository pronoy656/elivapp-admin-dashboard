import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DisputeItem {
  id: string
  name: string
  business: string
  description: string
  time: string
  img: string
}

const dummyData: DisputeItem[] = [
  {
    id: "1",
    name: "Tariq Osman",
    business: "FitZone Gym",
    description: "QR scan not registered — customer visited but no credit",
    time: "4h ago",
    img: "https://i.pravatar.cc/150?u=tariq"
  },
  {
    id: "2",
    name: "Jordan Travis",
    business: "Kava Brew",
    description: "Business delayed payout beyond 7-day window",
    time: "1d ago",
    img: "https://i.pravatar.cc/150?u=jordan"
  }
]

export function OpenDisputes() {
  return (
    <Card className="bg-[#042850] border-[#0A355C] overflow-hidden mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-5 px-6 border-b border-[#0A355C]">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#F87171]"></div>
          <h2 className="text-sm font-semibold text-white">Open Disputes ({dummyData.length})</h2>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          {dummyData.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 ${index !== dummyData.length - 1 ? 'border-b border-[#0A355C]/50' : ''}`}
            >
              <div className="flex items-start md:items-center gap-4">
                <Avatar className="h-10 w-10 mt-1 md:mt-0">
                  <AvatarImage src={item.img} alt={item.name} />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-white">
                    {item.name} <span className="text-[#94A3B8]">·</span> {item.business}
                  </span>
                  <span className="text-xs text-[#94A3B8]">
                    {item.description}
                  </span>
                  <span className="text-[10px] text-[#0A355C] font-medium opacity-60">
                    {item.time}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 md:mt-0 ml-14 md:ml-0">
                <Button variant="ghost" className="h-9 px-5 text-xs text-[#94A3B8] border border-[#0A355C] hover:bg-[#0A355C] hover:text-white rounded-lg">
                  Reject
                </Button>
                <Button className="h-9 px-5 text-xs font-semibold text-[#00152B] bg-[#4ADE80] hover:bg-[#34D399] rounded-lg">
                  Pay & Resolve
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
