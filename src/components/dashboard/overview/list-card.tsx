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
    <Card className="bg-[#042850] border-[#0A355C]">
      <CardHeader className="flex flex-row items-center justify-between pb-4 mb-4 border-b border-[#D7FE7C]/60">
        <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
        <Button variant="link" className="text-xs text-[#D7FE7C] h-auto p-0">View all</Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 border-b border-[#D7FE7C]/60 pb-4 h-16 last:border-0 last:pb-0">
            <span className="text-xs text-muted-foreground font-semibold w-4 text-center">{i + 1}</span>
            <Avatar className="h-10 w-10 border border-[#0A355C]">
              {item.img && <AvatarImage src={item.img} alt={item.name} />}
              <AvatarFallback className="bg-[#00152B] text-xs text-white">
                <FallbackIcon className="h-4 w-4 text-[#D7FE7C]" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{item.name}</span>
              <span className="text-[10px] text-muted-foreground">{item.desc}</span>
            </div>
            <div className="ml-auto text-sm font-bold text-[#D7FE7C]">{item.val}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
