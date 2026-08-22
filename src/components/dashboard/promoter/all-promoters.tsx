"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable, ColumnDef } from "@/components/common/data-table"
import { Search } from "lucide-react"

type Status = "ACTIVE" | "SUSPENDED"

interface PromoterData {
  id: string
  name: string
  img: string
  handle: string
  referrals: number
  conversions: number
  earned: string
  multiplier: string
  status: Status
}

const dummyData: PromoterData[] = [
  { id: "1", name: "Devon Rivera", img: "https://i.pravatar.cc/150?u=devon", handle: "@devon_earns", referrals: 34, conversions: 28, earned: "$700", multiplier: "1x", status: "ACTIVE" },
  { id: "2", name: "Mia Torres", img: "https://i.pravatar.cc/150?u=mia", handle: "@mia_promo", referrals: 22, conversions: 19, earned: "$475", multiplier: "1x", status: "ACTIVE" },
  { id: "3", name: "Kwame Asante", img: "https://i.pravatar.cc/150?u=kwame", handle: "@kwame_ref", referrals: 18, conversions: 14, earned: "$350", multiplier: "1x", status: "ACTIVE" },
  { id: "4", name: "Sakura Ito", img: "https://i.pravatar.cc/150?u=sakura", handle: "@sakura_links", referrals: 12, conversions: 8, earned: "$200", multiplier: "1x", status: "ACTIVE" },
  { id: "5", name: "Alicia Monroe", img: "https://i.pravatar.cc/150?u=alicia", handle: "@alicia_earns", referrals: 162, conversions: 141, earned: "$3,240", multiplier: "2x", status: "ACTIVE" },
  { id: "6", name: "Jordan Travis", img: "https://i.pravatar.cc/150?u=jordan", handle: "@jtpromoter", referrals: 144, conversions: 128, earned: "$2,890", multiplier: "1x", status: "ACTIVE" },
  { id: "7", name: "Tariq Osman", img: "https://i.pravatar.cc/150?u=tariq", handle: "@tariqo", referrals: 22, conversions: 11, earned: "$220", multiplier: "0.5x", status: "SUSPENDED" },
  { id: "8", name: "Elena Vazquez", img: "https://i.pravatar.cc/150?u=elena", handle: "@elena_v", referrals: 45, conversions: 38, earned: "$950", multiplier: "1x", status: "ACTIVE" },
  { id: "9", name: "Jamal King", img: "https://i.pravatar.cc/150?u=jamal", handle: "@jking_promo", referrals: 78, conversions: 62, earned: "$1,550", multiplier: "1.5x", status: "ACTIVE" },
  { id: "10", name: "Chloe Smith", img: "https://i.pravatar.cc/150?u=chloe", handle: "@chloes_links", referrals: 15, conversions: 10, earned: "$250", multiplier: "1x", status: "ACTIVE" },
  { id: "11", name: "Lucas Tanner", img: "https://i.pravatar.cc/150?u=lucas", handle: "@lucastanner", referrals: 56, conversions: 48, earned: "$1,200", multiplier: "1x", status: "ACTIVE" },
  { id: "12", name: "Nina Patel", img: "https://i.pravatar.cc/150?u=nina", handle: "@ninap", referrals: 110, conversions: 92, earned: "$2,300", multiplier: "2x", status: "ACTIVE" },
]

export function AllPromoters() {
  const columns: ColumnDef<PromoterData>[] = [
    {
      key: "name",
      header: "PROMOTER",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.img} alt={row.name} />
            <AvatarFallback>{row.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-white text-xs font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      key: "handle",
      header: "HANDLE",
      render: (row) => <span className="text-[#CBD5E1] text-[11px] font-mono">{row.handle}</span>
    },
    {
      key: "referrals",
      header: "REFERRALS",
      render: (row) => <span className="text-[#CBD5E1] text-xs">{row.referrals}</span>
    },
    {
      key: "conversions",
      header: "CONVERSIONS",
      render: (row) => <span className="text-[#CBD5E1] text-xs">{row.conversions}</span>
    },
    {
      key: "earned",
      header: "EARNED",
      render: (row) => <span className="text-[#D7FE7C] text-xs font-bold">{row.earned}</span>
    },
    {
      key: "multiplier",
      header: "MULTIPLIER",
      render: (row) => {
        let bg = "bg-[#D7FE7C]/15"
        let text = "text-[#D7FE7C]"
        if (row.multiplier === "0.5x") {
          bg = "bg-[#FBBF24]/15"
          text = "text-[#FBBF24]"
        } else if (row.multiplier === "2x" || row.multiplier === "1.5x") {
          bg = "bg-[#34D399]/15"
          text = "text-[#34D399]"
        }
        
        return (
          <div className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[10px] font-bold ${bg} ${text}`}>
            {row.multiplier}
          </div>
        )
      }
    },
    {
      key: "status",
      header: "STATUS",
      render: (row) => {
        const isSuspended = row.status === "SUSPENDED"
        return (
          <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${isSuspended ? 'bg-[#F87171]/15 text-[#F87171]' : 'bg-[#34D399]/15 text-[#34D399]'}`}>
            {row.status}
          </div>
        )
      }
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: (row) => {
        const isSuspended = row.status === "SUSPENDED"
        return (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-7 px-3 text-[11px] font-medium text-[#D7FE7C] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#D7FE7C] rounded-lg">Multiplier</Button>
            {isSuspended ? (
              <Button size="sm" variant="ghost" className="h-7 px-3 text-[11px] font-medium text-[#34D399] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#34D399] rounded-lg">Activate</Button>
            ) : (
              <Button size="sm" variant="ghost" className="h-7 px-3 text-[11px] font-medium text-[#F87171] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#F87171] rounded-lg">Suspend</Button>
            )}
          </div>
        )
      }
    }
  ]

  return (
    <Card className="bg-[#042850] border-[#0A355C] overflow-hidden mt-6">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between pb-4 pt-5 px-6 border-b border-[#0A355C] gap-4 md:gap-0">
        <CardTitle className="text-sm font-semibold text-white">All Promoters ({dummyData.length})</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
          <Input 
            type="text" 
            placeholder="Search name or handle" 
            className="h-9 w-[240px] pl-9 bg-[#00152B] border-[#0A355C] text-white text-xs placeholder:text-[#94A3B8] rounded-lg focus-visible:ring-1 focus-visible:ring-[#D7FE7C]"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <DataTable columns={columns} data={dummyData} />
      </CardContent>
    </Card>
  )
}
