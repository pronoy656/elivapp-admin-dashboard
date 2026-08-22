"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable, ColumnDef } from "@/components/common/data-table"

type Status = "PENDING" | "VERIFIED" | "PAID" | "REJECTED"

interface ReferralData {
  id: string
  promoter: { name: string; img: string }
  customer: string
  business: string
  status: Status
  reward: string
  time: string
}

const dummyData: ReferralData[] = [
  { id: "1", promoter: { name: "Devon R.", img: "https://i.pravatar.cc/150?u=devon" }, customer: "Sarah K.", business: "FitZone Gym", status: "PENDING", reward: "$40", time: "1h ago" },
  { id: "2", promoter: { name: "Alicia M.", img: "https://i.pravatar.cc/150?u=alicia" }, customer: "Tom M.", business: "FitZone Gym", status: "PENDING", reward: "$40", time: "3h ago" },
  { id: "3", promoter: { name: "Jordan T.", img: "https://i.pravatar.cc/150?u=jordan" }, customer: "Jen P.", business: "Kava Brew", status: "VERIFIED", reward: "$25", time: "5h ago" },
  { id: "4", promoter: { name: "Devon R.", img: "https://i.pravatar.cc/150?u=devon" }, customer: "Carlos S.", business: "FitZone Gym", status: "PAID", reward: "$40", time: "1d ago" },
  { id: "5", promoter: { name: "Mia T.", img: "https://i.pravatar.cc/150?u=mia" }, customer: "Amy L.", business: "Luna Spa", status: "PAID", reward: "$30", time: "1d ago" },
  { id: "6", promoter: { name: "Kwame A.", img: "https://i.pravatar.cc/150?u=kwame" }, customer: "Ben W.", business: "TacoFusion", status: "REJECTED", reward: "$20", time: "2d ago" },
  { id: "7", promoter: { name: "Sakura I.", img: "https://i.pravatar.cc/150?u=sakura" }, customer: "Lisa N.", business: "CloudCuts", status: "PENDING", reward: "$15", time: "2d ago" },
  { id: "8", promoter: { name: "Marcus J.", img: "https://i.pravatar.cc/150?u=marcus" }, customer: "David B.", business: "TacoFusion", status: "VERIFIED", reward: "$20", time: "3d ago" },
  { id: "9", promoter: { name: "Elena V.", img: "https://i.pravatar.cc/150?u=elena" }, customer: "Sophie M.", business: "Luna Spa", status: "PAID", reward: "$30", time: "3d ago" },
  { id: "10", promoter: { name: "Jamal K.", img: "https://i.pravatar.cc/150?u=jamal" }, customer: "Omar F.", business: "FitZone Gym", status: "REJECTED", reward: "$40", time: "4d ago" },
  { id: "11", promoter: { name: "Chloe S.", img: "https://i.pravatar.cc/150?u=chloe" }, customer: "Emma W.", business: "Kava Brew", status: "PAID", reward: "$25", time: "4d ago" },
  { id: "12", promoter: { name: "Devon R.", img: "https://i.pravatar.cc/150?u=devon" }, customer: "Lucas T.", business: "CloudCuts", status: "PENDING", reward: "$15", time: "5d ago" },
  { id: "13", promoter: { name: "Alicia M.", img: "https://i.pravatar.cc/150?u=alicia" }, customer: "Nina P.", business: "TacoFusion", status: "VERIFIED", reward: "$20", time: "5d ago" },
  { id: "14", promoter: { name: "Jordan T.", img: "https://i.pravatar.cc/150?u=jordan" }, customer: "Isaac H.", business: "Luna Spa", status: "PAID", reward: "$30", time: "6d ago" },
  { id: "15", promoter: { name: "Kwame A.", img: "https://i.pravatar.cc/150?u=kwame" }, customer: "Zara L.", business: "FitZone Gym", status: "PENDING", reward: "$40", time: "1w ago" },
]

export function AllReferrals() {
  const [activeTab, setActiveTab] = useState<"All" | Status>("All")
  
  const filteredData = dummyData.filter(d => activeTab === "All" || d.status === activeTab)

  const columns: ColumnDef<ReferralData>[] = [
    {
      key: "promoter",
      header: "PROMOTER",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={row.promoter.img} alt={row.promoter.name} />
            <AvatarFallback>{row.promoter.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-white text-xs">{row.promoter.name}</span>
        </div>
      ),
    },
    {
      key: "customer",
      header: "CUSTOMER",
      render: (row) => <span className="text-[#CBD5E1] text-xs">{row.customer}</span>
    },
    {
      key: "business",
      header: "BUSINESS",
      render: (row) => <span className="text-[#CBD5E1] text-xs">{row.business}</span>
    },
    {
      key: "status",
      header: "STATUS",
      render: (row) => {
        let bg = "bg-[#D7FE7C]/15"
        let text = "text-[#D7FE7C]"
        if (row.status === "REJECTED") {
          bg = "bg-[#F87171]/15"
          text = "text-[#F87171]"
        } else if (row.status === "VERIFIED") {
          bg = "bg-[#34D399]/15"
          text = "text-[#34D399]"
        }
        
        return (
          <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${bg} ${text}`}>
            {row.status}
          </div>
        )
      }
    },
    {
      key: "reward",
      header: "REWARD",
      render: (row) => <span className="text-[#D7FE7C] text-xs font-bold">{row.reward}</span>
    },
    {
      key: "time",
      header: "TIME",
      render: (row) => <span className="text-[#CBD5E1] text-xs font-medium">{row.time}</span>
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: (row) => {
        if (row.status === "PENDING") {
          return (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="h-7 px-4 text-xs font-semibold text-[#34D399] bg-[#34D399]/15 hover:bg-[#34D399]/25 rounded-full">Verify</Button>
              <Button size="sm" variant="ghost" className="h-7 px-4 text-xs font-semibold text-[#F87171] bg-[#F87171]/15 hover:bg-[#F87171]/25 rounded-full">Reject</Button>
            </div>
          )
        }
        if (row.status === "VERIFIED") {
          return (
            <Button size="sm" variant="ghost" className="h-7 px-4 text-xs font-semibold text-[#FBBF24] bg-[#FBBF24]/15 hover:bg-[#FBBF24]/25 rounded-full">Pay Now</Button>
          )
        }
        return <span className="text-[#CBD5E1] text-xs font-medium px-2">Done</span>
      }
    }
  ]

  const tabs = ["All", "Pending", "Verified", "Paid", "Rejected"]

  return (
    <Card className="bg-[#042850] border-[#0A355C] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-[#0A355C]">
        <CardTitle className="text-sm font-medium text-white">All Referrals</CardTitle>
        <div className="flex items-center gap-1 bg-[#00152B] p-1 rounded-lg">
          {tabs.map((tab) => {
            const isActive = activeTab === tab || (activeTab === "All" && tab === "All")
            return (
              <Button 
                key={tab}
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveTab(tab === "All" ? "All" : tab.toUpperCase() as Status)}
                className={`h-7 px-4 text-[10px] rounded-md transition-colors ${
                  isActive ? "bg-[#0A355C] text-white" : "text-[#94A3B8] hover:text-white hover:bg-[#0A355C]/50"
                }`}
              >
                {tab}
              </Button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <DataTable columns={columns} data={filteredData} />
      </CardContent>
    </Card>
  )
}
