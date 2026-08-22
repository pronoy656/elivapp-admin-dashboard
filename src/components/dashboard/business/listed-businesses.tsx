"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable, ColumnDef } from "@/components/common/data-table"
import { Search } from "lucide-react"

type Status = "ACTIVE" | "SUSPENDED"

interface BusinessData {
  id: string
  name: string
  img: string
  category: string
  reward: string
  referrals: number
  conversions: number
  revenue: string
  status: Status
}

const dummyData: BusinessData[] = [
  { id: "1", name: "Kava Brew", img: "https://i.pravatar.cc/150?u=kava", category: "Café", reward: "$25", referrals: 47, conversions: 38, revenue: "$950", status: "ACTIVE" },
  { id: "2", name: "FitZone Gym", img: "https://i.pravatar.cc/150?u=fit", category: "Fitness", reward: "$40", referrals: 128, conversions: 94, revenue: "$3,760", status: "ACTIVE" },
  { id: "3", name: "Luna Spa", img: "https://i.pravatar.cc/150?u=luna", category: "Wellness", reward: "$30", referrals: 83, conversions: 61, revenue: "$1,830", status: "ACTIVE" },
  { id: "4", name: "TacoFusion", img: "https://i.pravatar.cc/150?u=taco", category: "Food", reward: "$20", referrals: 215, conversions: 187, revenue: "$3,740", status: "ACTIVE" },
  { id: "5", name: "CloudCuts", img: "https://i.pravatar.cc/150?u=cloud", category: "Salon", reward: "$15", referrals: 61, conversions: 44, revenue: "$660", status: "SUSPENDED" },
  { id: "6", name: "TechFix Solutions", img: "https://i.pravatar.cc/150?u=tech", category: "Services", reward: "$50", referrals: 32, conversions: 28, revenue: "$1,400", status: "ACTIVE" },
  { id: "7", name: "Green Thumb Garden", img: "https://i.pravatar.cc/150?u=green", category: "Retail", reward: "$20", referrals: 154, conversions: 120, revenue: "$2,400", status: "ACTIVE" },
  { id: "8", name: "Burger Barn", img: "https://i.pravatar.cc/150?u=burger", category: "Food", reward: "$15", referrals: 342, conversions: 290, revenue: "$4,350", status: "ACTIVE" },
  { id: "9", name: "Peak Performance", img: "https://i.pravatar.cc/150?u=peak", category: "Fitness", reward: "$35", referrals: 89, conversions: 72, revenue: "$2,520", status: "SUSPENDED" },
  { id: "10", name: "Serenity Yoga", img: "https://i.pravatar.cc/150?u=yoga", category: "Wellness", reward: "$25", referrals: 112, conversions: 95, revenue: "$2,375", status: "ACTIVE" },
  { id: "11", name: "Bake My Day", img: "https://i.pravatar.cc/150?u=bake", category: "Café", reward: "$10", referrals: 405, conversions: 380, revenue: "$3,800", status: "ACTIVE" },
  { id: "12", name: "AutoCare Plus", img: "https://i.pravatar.cc/150?u=auto", category: "Automotive", reward: "$100", referrals: 14, conversions: 10, revenue: "$1,000", status: "ACTIVE" },
]

export function ListedBusinesses() {
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Suspended">("All")
  
  const filteredData = dummyData.filter(d => 
    activeTab === "All" || d.status === activeTab.toUpperCase()
  )

  const columns: ColumnDef<BusinessData>[] = [
    {
      key: "name",
      header: "BUSINESS",
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
      key: "category",
      header: "CATEGORY",
      render: (row) => <span className="text-[#CBD5E1] text-xs">{row.category}</span>
    },
    {
      key: "reward",
      header: "REWARD",
      render: (row) => <span className="text-[#D7FE7C] text-xs font-bold">{row.reward}</span>
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
      key: "revenue",
      header: "REVENUE",
      render: (row) => <span className="text-[#D7FE7C] text-xs font-bold">{row.revenue}</span>
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
            <Button size="sm" variant="ghost" className="h-7 px-3 text-xs font-medium text-[#CBD5E1] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-white rounded-lg">Edit</Button>
            {isSuspended ? (
              <Button size="sm" variant="ghost" className="h-7 px-3 text-xs font-medium text-[#34D399] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-white rounded-lg">Activate</Button>
            ) : (
              <Button size="sm" variant="ghost" className="h-7 px-3 text-xs font-medium text-[#F87171] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-white rounded-lg">Suspend</Button>
            )}
            <Button size="sm" variant="ghost" className="h-7 px-3 text-xs font-medium text-[#F87171] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-white rounded-lg">Remove</Button>
          </div>
        )
      }
    }
  ]

  const tabs = ["All", "Active", "Suspended"]

  return (
    <Card className="bg-[#042850] border-[#0A355C] overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between pb-4 pt-5 px-6 border-b border-[#0A355C] gap-4 md:gap-0">
        <CardTitle className="text-sm font-semibold text-white">Listed Businesses ({dummyData.length})</CardTitle>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-1 bg-[#00152B] p-1 rounded-lg">
            {tabs.map((tab) => {
              const isActive = activeTab === tab
              return (
                <Button 
                  key={tab}
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveTab(tab as any)}
                  className={`h-7 px-4 text-[11px] font-medium rounded-md transition-colors ${
                    isActive ? "bg-[#0A355C] text-white" : "text-[#94A3B8] hover:text-white hover:bg-[#0A355C]/50"
                  }`}
                >
                  {tab}
                </Button>
              )
            })}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="h-9 w-[220px] pl-9 bg-[#00152B] border-[#0A355C] text-white text-xs placeholder:text-[#94A3B8] rounded-lg focus-visible:ring-1 focus-visible:ring-[#D7FE7C]"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <DataTable columns={columns} data={filteredData} />
      </CardContent>
    </Card>
  )
}
