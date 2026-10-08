"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable, ColumnDef } from "@/components/common/data-table"
import { Search, MoreVertical, Eye, Pencil, Ban, CheckCircle2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConfirmModal } from "@/components/common/confirm-modal"
import { ViewPromoterModal, ViewPromoterData } from "@/components/common/view-promoter-modal"
import { EditPromoterModal, EditPromoterData } from "@/components/common/edit-promoter-modal"

type Status = "ACTIVE" | "SUSPENDED"

interface PromoterData {
  id: string
  name: string
  img: string
  handle: string
  referrals: number
  conversions: number
  earned: string
  status: Status
}

const initialData: PromoterData[] = [
  { id: "1", name: "Devon Rivera", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces", handle: "@devon_earns", referrals: 34, conversions: 28, earned: "$700", status: "ACTIVE" },
  { id: "2", name: "Mia Torres", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces", handle: "@mia_promo", referrals: 22, conversions: 19, earned: "$475", status: "ACTIVE" },
  { id: "3", name: "Kwame Asante", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces", handle: "@kwame_ref", referrals: 18, conversions: 14, earned: "$350", status: "ACTIVE" },
  { id: "4", name: "Sakura Ito", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces", handle: "@sakura_links", referrals: 12, conversions: 8, earned: "$200", status: "ACTIVE" },
  { id: "5", name: "Alicia Monroe", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces", handle: "@alicia_earns", referrals: 162, conversions: 141, earned: "$3,240", status: "ACTIVE" },
  { id: "6", name: "Jordan Travis", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces", handle: "@jtpromoter", referrals: 144, conversions: 128, earned: "$2,890", status: "ACTIVE" },
  { id: "7", name: "Tariq Osman", img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&h=100&fit=crop&crop=faces", handle: "@tariqo", referrals: 22, conversions: 11, earned: "$220", status: "SUSPENDED" },
  { id: "8", name: "Elena Vazquez", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces", handle: "@elena_v", referrals: 45, conversions: 38, earned: "$950", status: "ACTIVE" },
  { id: "9", name: "Jamal King", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces", handle: "@jking_promo", referrals: 78, conversions: 62, earned: "$1,550", status: "ACTIVE" },
  { id: "10", name: "Chloe Smith", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces", handle: "@chloes_links", referrals: 15, conversions: 10, earned: "$250", status: "ACTIVE" },
]

export function AllPromoters() {
  const [data, setData] = useState<PromoterData[]>(initialData)
  const [searchTerm, setSearchTerm] = useState<string>("")

  // View Promoter Modal State
  const [viewingPromoter, setViewingPromoter] = useState<PromoterData | null>(null)

  // Edit Promoter Modal State
  const [editingPromoter, setEditingPromoter] = useState<PromoterData | null>(null)

  // Suspend / Activate Confirm Modal State
  const [confirmTarget, setConfirmTarget] = useState<{
    row: PromoterData
    action: "SUSPEND" | "ACTIVATE"
  } | null>(null)

  const handleSaveEdit = (updated: EditPromoterData) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === updated.id
          ? { ...item, name: updated.name, handle: updated.handle, status: updated.status }
          : item
      )
    )
    if (viewingPromoter && viewingPromoter.id === updated.id) {
      setViewingPromoter((prev) => prev ? { ...prev, ...updated } : null)
    }
    setEditingPromoter(null)
  }

  const handleOpenConfirm = (row: PromoterData, action: "SUSPEND" | "ACTIVATE") => {
    setConfirmTarget({ row, action })
  }

  const handleConfirmAction = () => {
    if (!confirmTarget) return
    const { row, action } = confirmTarget
    const updatedStatus = action === "SUSPEND" ? "SUSPENDED" : "ACTIVE"
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: updatedStatus } : item
      )
    )
    if (viewingPromoter && viewingPromoter.id === row.id) {
      setViewingPromoter((prev) => prev ? { ...prev, status: updatedStatus } : null)
    }
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
      className: "text-right",
      render: (row) => {
        return (
          <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#0A355C] rounded-lg transition-colors cursor-pointer outline-none">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#021830] border border-[#0A355C] text-white min-w-[140px] rounded-xl p-1.5 shadow-xl z-50"
              >
                <DropdownMenuItem
                  onClick={() => setViewingPromoter(row)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#CBD5E1] hover:text-white hover:bg-[#0A355C] rounded-lg cursor-pointer outline-none transition-colors"
                >
                  <Eye className="h-3.5 w-3.5 text-[#C7F556]" />
                  <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setEditingPromoter(row)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#CBD5E1] hover:text-white hover:bg-[#0A355C] rounded-lg cursor-pointer outline-none transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5 text-[#38BDF8]" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleOpenConfirm(row, row.status === "ACTIVE" ? "SUSPEND" : "ACTIVATE")
                  }
                  className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg cursor-pointer outline-none transition-colors ${
                    row.status === "ACTIVE"
                      ? "text-[#F87171] hover:text-[#F87171] hover:bg-[#F87171]/15"
                      : "text-[#34D399] hover:text-[#34D399] hover:bg-[#34D399]/15"
                  }`}
                >
                  {row.status === "ACTIVE" ? (
                    <>
                      <Ban className="h-3.5 w-3.5 text-[#F87171]" />
                      <span>Suspend</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#34D399]" />
                      <span>Activate</span>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <Card className="bg-[#042850] border-[#0A355C] overflow-hidden mt-6 rounded-2xl">
        <CardHeader className="flex flex-col gap-3 pb-4 pt-5 px-6 border-b border-[#0A355C]">
          <CardTitle className="text-sm font-semibold text-white">
            All Promoters ({filteredData.length})
          </CardTitle>
          <div className="relative w-full sm:w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name or handle..."
              className="h-9 w-full pl-9 bg-[#00152B] border-[#0A355C] text-white text-xs placeholder:text-[#94A3B8] rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable 
            columns={columns} 
            data={filteredData} 
            onRowClick={(row) => setViewingPromoter(row)}
          />
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <ViewPromoterModal
        isOpen={!!viewingPromoter}
        onClose={() => setViewingPromoter(null)}
        promoter={viewingPromoter}
        onEdit={(p) => setEditingPromoter(p as PromoterData)}
        onToggleStatus={(p) =>
          handleOpenConfirm(p as PromoterData, p.status === "ACTIVE" ? "SUSPEND" : "ACTIVATE")
        }
      />

      {/* Edit Promoter Modal */}
      <EditPromoterModal
        isOpen={!!editingPromoter}
        onClose={() => setEditingPromoter(null)}
        onSave={handleSaveEdit}
        promoter={editingPromoter}
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
        confirmText={confirmTarget?.action === "SUSPEND" ? "Suspend Promoter" : "Activate Promoter"}
        cancelText="Cancel"
        variant={confirmTarget?.action === "SUSPEND" ? "destructive" : "success"}
      />
    </>
  )
}
