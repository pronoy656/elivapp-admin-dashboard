import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LucideIcon } from "lucide-react"

export interface ListCardItem {
  name: string
  desc: string
  val: string
  img?: string
}

interface ListCardProps {
  title: string
  items: ListCardItem[]
  FallbackIcon: LucideIcon
}

export function ListCard({ title, items, FallbackIcon }: ListCardProps) {
  return (
    <Card className="bg-[#042850] border-[#0A355C] rounded-2xl overflow-hidden p-0">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-[#0A355C]/80 space-y-0">
        <CardTitle className="text-sm font-semibold text-white tracking-wide">{title}</CardTitle>
        <Button variant="link" className="text-xs text-[#94A3B8] hover:text-white font-medium h-auto p-0 no-underline">
          View all
        </Button>
      </CardHeader>
      <CardContent className="px-6 py-2 flex flex-col divide-y divide-[#0A355C]/60">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3.5 py-3.5 first:pt-2 last:pb-2">
            <span className="text-xs text-[#64748B] font-medium w-3 text-center">{i + 1}</span>
            <Avatar className="h-9 w-9 rounded-full border border-[#0A355C]/80">
              {item.img && <AvatarImage src={item.img} alt={item.name} />}
              <AvatarFallback className="bg-[#00152B] text-xs text-white">
                <FallbackIcon className="h-4 w-4 text-[#C7F556]" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white leading-tight">{item.name}</span>
              <span className="text-[11px] text-[#64748B] font-normal mt-0.5">{item.desc}</span>
            </div>
            <div className="ml-auto text-sm font-bold text-[#C7F556] tracking-tight">{item.val}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
