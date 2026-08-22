"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable, ColumnDef } from "@/components/common/data-table"
import { Search } from "lucide-react"
import { ConfirmModal } from "@/components/common/confirm-modal"
import { EditBusinessModal, EditBusinessData } from "@/components/common/edit-business-modal"

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

const initialData: BusinessData[] = [
  { id: "1", name: "Kava Brew", img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&h=100&fit=crop&crop=faces", category: "Café", reward: "$25", referrals: 47, conversions: 38, revenue: "$950", status: "ACTIVE" },
  { id: "2", name: "FitZone Gym", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop&crop=faces", category: "Fitness", reward: "$40", referrals: 128, conversions: 94, revenue: "$3,760", status: "ACTIVE" },
  { id: "3", name: "Luna Spa", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100&h=100&fit=crop&crop=faces", category: "Wellness", reward: "$30", referrals: 83, conversions: 61, revenue: "$1,830", status: "ACTIVE" },
  { id: "4", name: "TacoFusion", img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop&crop=faces", category: "Food", reward: "$20", referrals: 215, conversions: 187, revenue: "$3,740", status: "ACTIVE" },
  { id: "5", name: "CloudCuts", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop&crop=faces", category: "Salon", reward: "$15", referrals: 61, conversions: 44, revenue: "$660", status: "SUSPENDED" },
  { id: "6", name: "TechFix Solutions", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=100&h=100&fit=crop&crop=faces", category: "Services", reward: "$50", referrals: 32, conversions: 28, revenue: "$1,400", status: "ACTIVE" },
  { id: "7", name: "Green Thumb Garden", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop&crop=faces", category: "Retail", reward: "$20", referrals: 154, conversions: 120, revenue: "$2,400", status: "ACTIVE" },
  { id: "8", name: "Burger Barn", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop&crop=faces", category: "Food", reward: "$15", referrals: 342, conversions: 290, revenue: "$4,350", status: "ACTIVE" },
  { id: "9", name: "Peak Performance", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&h=100&fit=crop&crop=faces", category: "Fitness", reward: "$35", referrals: 89, conversions: 72, revenue: "$2,520", status: "SUSPENDED" },
  { id: "10", name: "Serenity Yoga", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=100&h=100&fit=crop&crop=faces", category: "Wellness", reward: "$25", referrals: 112, conversions: 95, revenue: "$2,375", status: "ACTIVE" },
]

export function ListedBusinesses() {
  const [data, setData] = useState<BusinessData[]>(initialData)
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Suspended">("All")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Edit Modal state
  const [editingBusiness, setEditingBusiness] = useState<BusinessData | null>(null)
  
  // Confirm Modal state
  const [confirmTarget, setConfirmTarget] = useState<{
    row: BusinessData
    action: "SUSPEND" | "ACTIVATE" | "REMOVE"
  } | null>(null)

  const handleSaveEdit = (updated: EditBusinessData) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === updated.id
          ? {
              ...item,
              name: updated.name,
              category: updated.category,
              reward: updated.reward,
              status: updated.status,
            }
          : item
      )
    )
    setEditingBusiness(null)
  }

  const handleConfirmAction = () => {
    if (!confirmTarget) return
    const { row, action } = confirmTarget

    if (action === "REMOVE") {
      setData((prev) => prev.filter((item) => item.id !== row.id))
    } else {
      setData((prev) =>
        prev.map((item) =>
          item.id === row.id
            ? { ...item, status: action === "SUSPEND" ? "SUSPENDED" : "ACTIVE" }
            : item
        )
      )
    }
    setConfirmTarget(null)
  }

  const filteredData = data.filter((d) => {
    const matchesTab = activeTab === "All" || d.status === activeTab.toUpperCase()
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const columns: ColumnDef<BusinessData>[] = [
    {
      key: "name",
      header: "BUSINESS",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-[#0A355C]">
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
      render: (row) => <span className="text-[#CBD5E1] text-xs">{row.category}</span>,
    },
    {
      key: "reward",
      header: "REWARD",
      render: (row) => <span className="text-[#C7F556] text-xs font-bold">{row.reward}</span>,
    },
    {
      key: "referrals",
      header: "REFERRALS",
      render: (row) => <span className="text-[#CBD5E1] text-xs">{row.referrals}</span>,
    },
    {
      key: "conversions",
      header: "CONVERSIONS",
      render: (row) => <span className="text-[#CBD5E1] text-xs">{row.conversions}</span>,
    },
    {
      key: "revenue",
      header: "REVENUE",
      render: (row) => <span className="text-[#C7F556] text-xs font-bold">{row.revenue}</span>,
    },
    {
      key: "status",
      header: "STATUS",
      render: (row) => {
        const isSuspended = row.status === "SUSPENDED"
        return (
          <div
            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
              isSuspended ? "bg-[#F87171]/15 text-[#F87171]" : "bg-[#34D399]/15 text-[#34D399]"
            }`}
          >
            {row.status}
          </div>
        )
      },
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: (row) => {
        const isSuspended = row.status === "SUSPENDED"
        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setEditingBusiness(row)}
              className="h-7 px-3 text-xs font-medium text-[#CBD5E1] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-white rounded-lg cursor-pointer transition-colors"
            >
              Edit
            </Button>
            {isSuspended ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setConfirmTarget({ row, action: "ACTIVATE" })}
                className="h-7 px-3 text-xs font-medium text-[#34D399] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#34D399] rounded-lg cursor-pointer transition-colors"
              >
                Activate
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setConfirmTarget({ row, action: "SUSPEND" })}
                className="h-7 px-3 text-xs font-medium text-[#F87171] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#F87171] rounded-lg cursor-pointer transition-colors"
              >
                Suspend
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setConfirmTarget({ row, action: "REMOVE" })}
              className="h-7 px-3 text-xs font-medium text-[#F87171] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#F87171] rounded-lg cursor-pointer transition-colors"
            >
              Remove
            </Button>
          </div>
        )
      },
    },
  ]

  const tabs = ["All", "Active", "Suspended"]

  return (
    <>
      <Card className="bg-[#042850] border-[#0A355C] overflow-hidden rounded-2xl">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between pb-4 pt-5 px-6 border-b border-[#0A355C] gap-4 md:gap-0">
          <CardTitle className="text-sm font-semibold text-white">Listed Businesses ({filteredData.length})</CardTitle>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-1 bg-[#00152B] p-1 rounded-xl border border-[#0A355C]">
              {tabs.map((tab) => {
                const isActive = activeTab === tab
                return (
                  <Button
                    key={tab}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab(tab as any)}
                    className={`h-7 px-4 text-[11px] font-medium rounded-lg transition-colors cursor-pointer ${
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search business or category"
                className="h-9 w-[220px] pl-9 bg-[#00152B] border-[#0A355C] text-white text-xs placeholder:text-[#94A3B8] rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable columns={columns} data={filteredData} />
        </CardContent>
      </Card>

      {/* Edit Business Modal */}
      <EditBusinessModal
        isOpen={!!editingBusiness}
        onClose={() => setEditingBusiness(null)}
        onSave={handleSaveEdit}
        business={editingBusiness}
      />

      {/* Action Confirmation Modal */}
      <ConfirmModal
        isOpen={!!confirmTarget}
        onClose={() => setConfirmTarget(null)}
        onConfirm={handleConfirmAction}
        title={
          confirmTarget?.action === "SUSPEND"
            ? "Confirm Suspend"
            : confirmTarget?.action === "ACTIVATE"
            ? "Confirm Activation"
            : "Confirm Removal"
        }
        description={
          confirmTarget?.action === "SUSPEND"
            ? `Are you sure you want to suspend ${confirmTarget.row.name}?`
            : confirmTarget?.action === "ACTIVATE"
            ? `Are you sure you want to reactivate ${confirmTarget?.row.name}?`
            : `Are you sure you want to permanently remove ${confirmTarget?.row.name}?`
        }
        confirmText={
          confirmTarget?.action === "SUSPEND"
            ? "Suspend Business"
            : confirmTarget?.action === "ACTIVATE"
            ? "Activate Business"
            : "Remove Business"
        }
        cancelText="Cancel"
        variant={confirmTarget?.action === "ACTIVATE" ? "success" : "destructive"}
      />
    </>
  )
}
