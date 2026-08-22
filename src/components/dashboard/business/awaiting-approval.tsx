import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check } from "lucide-react"

interface ApprovalItem {
  id: string
  name: string
  category: string
  owner: string
  reward: string
  distance: string
  time: string
  img: string
}

const dummyData: ApprovalItem[] = [
  {
    id: "1",
    name: "SunBake Patisserie",
    category: "Bakery",
    owner: "Maria Tran",
    reward: "$30/referral",
    distance: "1.1 mi",
    time: "Submitted 2h ago",
    img: "https://i.pravatar.cc/150?u=sunbake"
  },
  {
    id: "2",
    name: "UrbanFit Studio",
    category: "Fitness",
    owner: "James Osei",
    reward: "$50/referral",
    distance: "0.8 mi",
    time: "Submitted 5h ago",
    img: "https://i.pravatar.cc/150?u=urbanfit"
  }
]

export function AwaitingApproval() {
  return (
    <Card className="bg-[#042850] border-[#0A355C] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-5 px-6 border-b border-[#0A355C]">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#F87171]"></div>
          <h2 className="text-sm font-semibold text-white">Awaiting Approval</h2>
        </div>
        <div className="bg-[#F87171]/15 text-[#F87171] px-3 py-1 rounded-full text-[11px] font-medium">
          {dummyData.length} pending
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          {dummyData.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 ${index !== dummyData.length - 1 ? 'border-b border-[#0A355C]/50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item.img} alt={item.name} />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-white">{item.name}</span>
                  <span className="text-xs text-[#94A3B8]">
                    {item.category} &bull; Owner: {item.owner} &bull; Reward: {item.reward} &bull; {item.distance} &bull; {item.time}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <Button variant="ghost" className="h-9 px-5 text-xs text-[#94A3B8] border border-[#0A355C] hover:bg-[#0A355C] hover:text-white rounded-lg">
                  Reject
                </Button>
                <Button className="h-9 px-4 text-xs font-semibold text-[#00152B] bg-[#4ADE80] hover:bg-[#34D399] rounded-lg">
                  <Check className="mr-1.5 h-4 w-4" />
                  Approve & List
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
