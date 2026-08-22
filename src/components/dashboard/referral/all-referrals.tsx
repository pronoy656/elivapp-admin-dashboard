"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable, ColumnDef } from "@/components/common/data-table"
import { ConfirmModal } from "@/components/common/confirm-modal"

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

const initialData: ReferralData[] = [
  { id: "1", promoter: { name: "Devon R.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" }, customer: "Sarah K.", business: "FitZone Gym", status: "PENDING", reward: "$40", time: "1h ago" },
  { id: "2", promoter: { name: "Alicia M.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" }, customer: "Tom M.", business: "FitZone Gym", status: "PENDING", reward: "$40", time: "3h ago" },
  { id: "3", promoter: { name: "Jordan T.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" }, customer: "Jen P.", business: "Kava Brew", status: "VERIFIED", reward: "$25", time: "5h ago" },
  { id: "4", promoter: { name: "Devon R.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" }, customer: "Carlos S.", business: "FitZone Gym", status: "PAID", reward: "$40", time: "1d ago" },
  { id: "5", promoter: { name: "Mia T.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" }, customer: "Amy L.", business: "Luna Spa", status: "PAID", reward: "$30", time: "1d ago" },
  { id: "6", promoter: { name: "Kwame A.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces" }, customer: "Ben W.", business: "TacoFusion", status: "REJECTED", reward: "$20", time: "2d ago" },
  { id: "7", promoter: { name: "Sakura I.", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces" }, customer: "Lisa N.", business: "CloudCuts", status: "PENDING", reward: "$15", time: "2d ago" },
  { id: "8", promoter: { name: "Marcus J.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces" }, customer: "David B.", business: "TacoFusion", status: "VERIFIED", reward: "$20", time: "3d ago" },
  { id: "9", promoter: { name: "Elena V.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces" }, customer: "Sophie M.", business: "Luna Spa", status: "PAID", reward: "$30", time: "3d ago" },
  { id: "10", promoter: { name: "Jamal K.", img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&h=100&fit=crop&crop=faces" }, customer: "Omar F.", business: "FitZone Gym", status: "REJECTED", reward: "$40", time: "4d ago" },
]

export function AllReferrals() {
  const [data, setData] = useState<ReferralData[]>(initialData)
  const [activeTab, setActiveTab] = useState<"All" | Status>("All")
  
  // Action Modal State
  const [confirmTarget, setConfirmTarget] = useState<{
    row: ReferralData
    action: "VERIFY" | "REJECT" | "PAY"
  } | null>(null)

  const handleOpenAction = (row: ReferralData, action: "VERIFY" | "REJECT" | "PAY") => {
    setConfirmTarget({ row, action })
  }

  const handleConfirmAction = () => {
    if (!confirmTarget) return
    const { row, action } = confirmTarget
    let newStatus: Status = row.status
    if (action === "VERIFY") newStatus = "VERIFIED"
    if (action === "REJECT") newStatus = "REJECTED"
    if (action === "PAY") newStatus = "PAID"

    setData((prev) =>
      prev.map((item) => (item.id === row.id ? { ...item, status: newStatus } : item))
    )
    setConfirmTarget(null)
  }

  const filteredData = data.filter((d) => activeTab === "All" || d.status === activeTab)

  const columns: ColumnDef<ReferralData>[] = [
    {
      key: "promoter",
      header: "PROMOTER",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 border border-[#0A355C]">
            <AvatarImage src={row.promoter.img} alt={row.promoter.name} />
            <AvatarFallback>{row.promoter.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-white text-xs font-medium">{row.promoter.name}</span>
        </div>
      ),
    },
    {
      key: "customer",
      header: "CUSTOMER",
      render: (row) => <span className="text-[#CBD5E1] text-xs">{row.customer}</span>,
    },
    {
      key: "business",
      header: "BUSINESS",
      render: (row) => <span className="text-[#CBD5E1] text-xs">{row.business}</span>,
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
          <div
            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${bg} ${text}`}
          >
            {row.status}
          </div>
        )
      },
    },
    {
      key: "reward",
      header: "REWARD",
      render: (row) => <span className="text-[#C7F556] text-xs font-bold">{row.reward}</span>,
    },
    {
      key: "time",
      header: "TIME",
      render: (row) => <span className="text-[#CBD5E1] text-xs font-medium">{row.time}</span>,
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: (row) => {
        if (row.status === "PENDING") {
          return (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleOpenAction(row, "VERIFY")}
                className="h-7 px-4 text-xs font-semibold text-[#34D399] bg-[#34D399]/15 hover:bg-[#34D399]/25 rounded-full cursor-pointer transition-colors"
              >
                Verify
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleOpenAction(row, "REJECT")}
                className="h-7 px-4 text-xs font-semibold text-[#F87171] bg-[#F87171]/15 hover:bg-[#F87171]/25 rounded-full cursor-pointer transition-colors"
              >
                Reject
              </Button>
            </div>
          )
        }
        if (row.status === "VERIFIED") {
          return (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleOpenAction(row, "PAY")}
                className="h-7 px-4 text-xs font-semibold text-[#FBBF24] bg-[#FBBF24]/15 hover:bg-[#FBBF24]/25 rounded-full cursor-pointer transition-colors"
              >
                Pay Now
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleOpenAction(row, "REJECT")}
                className="h-7 px-3 text-[11px] font-medium text-[#F87171] bg-[#F87171]/10 hover:bg-[#F87171]/20 rounded-full cursor-pointer transition-colors"
              >
                Reject
              </Button>
            </div>
          )
        }
        return <span className="text-[#64748B] text-xs font-medium px-2">Completed</span>
      },
    },
  ]

  const tabs = ["All", "Pending", "Verified", "Paid", "Rejected"]

  const getModalTitle = () => {
    if (!confirmTarget) return ""
    if (confirmTarget.action === "VERIFY") return "Confirm Verification"
    if (confirmTarget.action === "REJECT") return "Confirm Rejection"
    return "Confirm Payment"
  }

  const getModalDesc = () => {
    if (!confirmTarget) return ""
    const { row, action } = confirmTarget
    if (action === "VERIFY") return `Are you sure you want to verify the ${row.reward} referral for ${row.customer} from ${row.promoter.name}?`
    if (action === "REJECT") return `Are you sure you want to reject the referral for ${row.customer} from ${row.promoter.name}?`
    return `Are you sure you want to process ${row.reward} payment to ${row.promoter.name} for ${row.business}?`
  }

  const getModalConfirmText = () => {
    if (!confirmTarget) return "Confirm"
    if (confirmTarget.action === "VERIFY") return "Verify Referral"
    if (confirmTarget.action === "REJECT") return "Reject Referral"
    return "Pay Now"
  }

  const getModalVariant = () => {
    if (!confirmTarget) return "default"
    if (confirmTarget.action === "REJECT") return "destructive"
    if (confirmTarget.action === "VERIFY") return "success"
    return "default"
  }

  return (
    <>
      <Card className="bg-[#042850] border-[#0A355C] overflow-hidden rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-[#0A355C]">
          <CardTitle className="text-sm font-semibold text-white">All Referrals</CardTitle>
          <div className="flex items-center gap-1 bg-[#00152B] p-1 rounded-xl border border-[#0A355C]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab || (activeTab === "All" && tab === "All")
              return (
                <Button
                  key={tab}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(tab === "All" ? "All" : (tab.toUpperCase() as Status))}
                  className={`h-7 px-4 text-[11px] font-medium rounded-lg transition-colors cursor-pointer ${
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

      {/* Confirmation Modal for Verify, Reject, Pay Now */}
      <ConfirmModal
        isOpen={!!confirmTarget}
        onClose={() => setConfirmTarget(null)}
        onConfirm={handleConfirmAction}
        title={getModalTitle()}
        description={getModalDesc()}
        confirmText={getModalConfirmText()}
        cancelText="Cancel"
        variant={getModalVariant()}
      />
    </>
  )
}
