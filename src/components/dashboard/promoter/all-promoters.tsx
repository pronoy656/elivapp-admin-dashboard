"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable, ColumnDef } from "@/components/common/data-table"
import { Search } from "lucide-react"
import { MultiplierModal } from "@/components/common/multiplier-modal"
import { ConfirmModal } from "@/components/common/confirm-modal"

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

const initialData: PromoterData[] = [
  { id: "1", name: "Devon Rivera", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces", handle: "@devon_earns", referrals: 34, conversions: 28, earned: "$700", multiplier: "1x", status: "ACTIVE" },
  { id: "2", name: "Mia Torres", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces", handle: "@mia_promo", referrals: 22, conversions: 19, earned: "$475", multiplier: "1x", status: "ACTIVE" },
  { id: "3", name: "Kwame Asante", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces", handle: "@kwame_ref", referrals: 18, conversions: 14, earned: "$350", multiplier: "1x", status: "ACTIVE" },
  { id: "4", name: "Sakura Ito", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces", handle: "@sakura_links", referrals: 12, conversions: 8, earned: "$200", multiplier: "1x", status: "ACTIVE" },
  { id: "5", name: "Alicia Monroe", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces", handle: "@alicia_earns", referrals: 162, conversions: 141, earned: "$3,240", multiplier: "2x", status: "ACTIVE" },
  { id: "6", name: "Jordan Travis", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces", handle: "@jtpromoter", referrals: 144, conversions: 128, earned: "$2,890", multiplier: "1x", status: "ACTIVE" },
  { id: "7", name: "Tariq Osman", img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&h=100&fit=crop&crop=faces", handle: "@tariqo", referrals: 22, conversions: 11, earned: "$220", multiplier: "0.5x", status: "SUSPENDED" },
  { id: "8", name: "Elena Vazquez", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces", handle: "@elena_v", referrals: 45, conversions: 38, earned: "$950", multiplier: "1x", status: "ACTIVE" },
  { id: "9", name: "Jamal King", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces", handle: "@jking_promo", referrals: 78, conversions: 62, earned: "$1,550", multiplier: "1.5x", status: "ACTIVE" },
  { id: "10", name: "Chloe Smith", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces", handle: "@chloes_links", referrals: 15, conversions: 10, earned: "$250", multiplier: "1x", status: "ACTIVE" },
]

export function AllPromoters() {
  const [data, setData] = useState<PromoterData[]>(initialData)
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Multiplier Modal State
  const [selectedPromoter, setSelectedPromoter] = useState<PromoterData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // Suspend / Activate Confirm Modal State
  const [confirmTarget, setConfirmTarget] = useState<{
    row: PromoterData
    action: "SUSPEND" | "ACTIVATE"
  } | null>(null)

  const handleOpenMultiplier = (row: PromoterData) => {
    setSelectedPromoter(row)
    setIsModalOpen(true)
  }

  const handleSaveMultiplier = (newMultiplier: string) => {
    if (!selectedPromoter) return
    setData((prev) =>
      prev.map((item) =>
        item.id === selectedPromoter.id ? { ...item, multiplier: newMultiplier } : item
      )
    )
    setSelectedPromoter(null)
  }

  const handleOpenConfirm = (row: PromoterData, action: "SUSPEND" | "ACTIVATE") => {
    setConfirmTarget({ row, action })
  }

  const handleConfirmAction = () => {
    if (!confirmTarget) return
    const { row, action } = confirmTarget
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id
          ? { ...item, status: action === "SUSPEND" ? "SUSPENDED" : "ACTIVE" }
          : item
      )
    )
    setConfirmTarget(null)
  }

  const filteredData = data.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.handle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns: ColumnDef<PromoterData>[] = [
    {
      key: "name",
      header: "PROMOTER",
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
      key: "handle",
      header: "HANDLE",
      render: (row) => <span className="text-[#CBD5E1] text-[11px] font-mono">{row.handle}</span>,
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
      key: "earned",
      header: "EARNED",
      render: (row) => <span className="text-[#C7F556] text-xs font-bold">{row.earned}</span>,
    },
    {
      key: "multiplier",
      header: "MULTIPLIER",
      render: (row) => {
        let bg = "bg-[#C7F556]/15"
        let text = "text-[#C7F556]"
        if (row.multiplier === "0.5x") {
          bg = "bg-[#FBBF24]/15"
          text = "text-[#FBBF24]"
        } else if (parseFloat(row.multiplier) > 1.5) {
          bg = "bg-[#34D399]/15"
          text = "text-[#34D399]"
        }

        return (
          <div
            className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-[10px] font-bold ${bg} ${text}`}
          >
            {row.multiplier}
          </div>
        )
      },
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
              onClick={() => handleOpenMultiplier(row)}
              className="h-7 px-3 text-[11px] font-medium text-[#C7F556] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#C7F556] rounded-lg transition-colors cursor-pointer"
            >
              Multiplier
            </Button>

            {isSuspended ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleOpenConfirm(row, "ACTIVATE")}
                className="h-7 px-3 text-[11px] font-medium text-[#34D399] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#34D399] rounded-lg transition-colors cursor-pointer"
              >
                Activate
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleOpenConfirm(row, "SUSPEND")}
                className="h-7 px-3 text-[11px] font-medium text-[#F87171] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#F87171] rounded-lg transition-colors cursor-pointer"
              >
                Suspend
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <>
      <Card className="bg-[#042850] border-[#0A355C] overflow-hidden mt-6 rounded-2xl">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between pb-4 pt-5 px-6 border-b border-[#0A355C] gap-4 md:gap-0">
          <CardTitle className="text-sm font-semibold text-white">All Promoters ({filteredData.length})</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name or handle"
              className="h-9 w-[240px] pl-9 bg-[#00152B] border-[#0A355C] text-white text-xs placeholder:text-[#94A3B8] rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable columns={columns} data={filteredData} />
        </CardContent>
      </Card>

      {/* Multiplier Adjustment Modal */}
      <MultiplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMultiplier}
        promoterName={selectedPromoter ? `${selectedPromoter.name} (${selectedPromoter.handle})` : undefined}
        currentMultiplier={selectedPromoter?.multiplier || "1x"}
      />

      {/* Suspend & Activate Confirmation Modal */}
      <ConfirmModal
        isOpen={!!confirmTarget}
        onClose={() => setConfirmTarget(null)}
        onConfirm={handleConfirmAction}
        title={confirmTarget?.action === "SUSPEND" ? "Confirm Suspend" : "Confirm Activation"}
        description={
          confirmTarget?.action === "SUSPEND"
            ? `Are you sure you want to suspend ${confirmTarget.row.name} (${confirmTarget.row.handle})?`
            : `Are you sure you want to reactivate ${confirmTarget?.row.name} (${confirmTarget?.row.handle})?`
        }
        confirmText={confirmTarget?.action === "SUSPEND" ? "Suspend" : "Activate"}
        cancelText="Cancel"
        variant={confirmTarget?.action === "SUSPEND" ? "destructive" : "success"}
      />
    </>
  )
}
