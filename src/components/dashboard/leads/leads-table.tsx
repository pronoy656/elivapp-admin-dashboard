"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable, ColumnDef } from "@/components/common/data-table"
import { Search, MoreVertical, Eye, Pencil, Trash2, CheckCircle2, Plus, ArrowUpRight, Tag, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ViewLeadModal, LeadData, LeadStatus } from "./view-lead-modal"
import { EditLeadModal } from "./edit-lead-modal"
import { AddLeadModal } from "./add-lead-modal"

const initialLeads: LeadData[] = [
  {
    id: "1",
    name: "Marcus Sterling",
    email: "marcus.s@outlook.com",
    phone: "+1 555-0143",
    company: "FitZone Gym",
    promoter: "Devon Rivera",
    source: "Instagram QR",
    value: "$450",
    status: "QUALIFIED",
    date: "2h ago",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "2",
    name: "Elena Rostova",
    email: "elena.r@gmail.com",
    phone: "+1 555-0182",
    company: "Luna Spa",
    promoter: "Alicia Monroe",
    source: "Referral Link",
    value: "$320",
    status: "CONVERTED",
    date: "5h ago",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "3",
    name: "David Chen",
    email: "dchen@techcorp.io",
    phone: "+1 555-0199",
    company: "TacoFusion",
    promoter: "Jordan Travis",
    source: "TikTok Video",
    value: "$180",
    status: "NEW",
    date: "Today",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "4",
    name: "Sarah Jenkins",
    email: "sarah.j@brandpulse.co",
    phone: "+1 555-0211",
    company: "Kava Brew",
    promoter: "Mia Torres",
    source: "Flyer Promo",
    value: "$240",
    status: "CONTACTED",
    date: "Yesterday",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "5",
    name: "Carlos Mendez",
    email: "carlos.m@yahoo.com",
    phone: "+1 555-0234",
    company: "FitZone Gym",
    promoter: "Devon Rivera",
    source: "Referral Link",
    value: "$600",
    status: "CONVERTED",
    date: "Yesterday",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "6",
    name: "Hannah Abbott",
    email: "hannah@creativehub.com",
    phone: "+1 555-0255",
    company: "CloudCuts",
    promoter: "Sakura Ito",
    source: "Direct Invite",
    value: "$120",
    status: "LOST",
    date: "2d ago",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "7",
    name: "Zack Peterson",
    email: "zack.p@apexfit.com",
    phone: "+1 555-0278",
    company: "FitZone Gym",
    promoter: "Alicia Monroe",
    source: "Event Booth",
    value: "$520",
    status: "QUALIFIED",
    date: "3d ago",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "8",
    name: "Amara Nwosu",
    email: "amara@globaltech.ng",
    phone: "+1 555-0291",
    company: "Luna Spa",
    promoter: "Kwame Asante",
    source: "Referral Link",
    value: "$380",
    status: "CONTACTED",
    date: "3d ago",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=faces",
  },
]

const statusStyles: Record<LeadStatus, { bg: string; text: string }> = {
  NEW: { bg: "bg-[#38BDF8]/15", text: "text-[#38BDF8]" },
  CONTACTED: { bg: "bg-[#FBBF24]/15", text: "text-[#FBBF24]" },
  QUALIFIED: { bg: "bg-[#C7F556]/15", text: "text-[#C7F556]" },
  CONVERTED: { bg: "bg-[#34D399]/15", text: "text-[#34D399]" },
  LOST: { bg: "bg-[#F87171]/15", text: "text-[#F87171]" },
}

export function LeadsTable() {
  const [data, setData] = useState<LeadData[]>(initialLeads)
  const [activeTab, setActiveTab] = useState<"All" | LeadStatus>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Modals state
  const [viewingLead, setViewingLead] = useState<LeadData | null>(null)
  const [editingLead, setEditingLead] = useState<LeadData | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const handleSaveEdit = (updated: LeadData) => {
    setData((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
    if (viewingLead && viewingLead.id === updated.id) {
      setViewingLead(updated)
    }
    setEditingLead(null)
  }

  const handleAddLead = (newLead: LeadData) => {
    setData((prev) => [newLead, ...prev])
  }

  const handleUpdateStatus = (id: string, newStatus: LeadStatus) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
  }

  const handleDeleteLead = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id))
    if (viewingLead && viewingLead.id === id) {
      setViewingLead(null)
    }
  }

  const filteredData = data.filter((d) => {
    const matchesTab = activeTab === "All" || d.status === activeTab
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.promoter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.source.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const columns: ColumnDef<LeadData>[] = [
    {
      key: "name",
      header: "LEAD",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-[#0A355C]">
            {row.img ? <AvatarImage src={row.img} alt={row.name} /> : null}
            <AvatarFallback>{row.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-white text-xs font-semibold">{row.name}</span>
            <span className="text-[#94A3B8] text-[11px] truncate max-w-[140px]">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "company",
      header: "BUSINESS",
      render: (row) => (
        <span className="text-white text-xs font-medium">{row.company}</span>
      ),
    },
    {
      key: "promoter",
      header: "PROMOTER",
      render: (row) => (
        <span className="text-[#CBD5E1] text-xs">{row.promoter}</span>
      ),
    },
    {
      key: "source",
      header: "SOURCE",
      render: (row) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#0A355C]/60 text-[#CBD5E1] border border-[#0A355C]">
          <Tag className="h-2.5 w-2.5 text-[#F59E0B]" />
          {row.source}
        </span>
      ),
    },
    {
      key: "value",
      header: "EST. VALUE",
      render: (row) => (
        <span className="text-[#C7F556] text-xs font-bold">{row.value}</span>
      ),
    },
    {
      key: "status",
      header: "STAGE",
      render: (row) => {
        const style = statusStyles[row.status] || { bg: "bg-white/10", text: "text-white" }
        return (
          <div
            className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${style.bg} ${style.text}`}
          >
            {row.status}
          </div>
        )
      },
    },
    {
      key: "date",
      header: "ACQUIRED",
      render: (row) => <span className="text-[#94A3B8] text-xs">{row.date}</span>,
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
                className="bg-[#021830] border border-[#0A355C] text-white min-w-[150px] rounded-xl p-1.5 shadow-xl z-50"
              >
                <DropdownMenuItem
                  onClick={() => setViewingLead(row)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#CBD5E1] hover:text-white hover:bg-[#0A355C] rounded-lg cursor-pointer outline-none transition-colors"
                >
                  <Eye className="h-3.5 w-3.5 text-[#C7F556]" />
                  <span>View Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setEditingLead(row)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#CBD5E1] hover:text-white hover:bg-[#0A355C] rounded-lg cursor-pointer outline-none transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5 text-[#38BDF8]" />
                  <span>Edit Lead</span>
                </DropdownMenuItem>

                {row.status !== "CONVERTED" && (
                  <DropdownMenuItem
                    onClick={() => handleUpdateStatus(row.id, "CONVERTED")}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-[#34D399] hover:bg-[#34D399]/15 rounded-lg cursor-pointer outline-none transition-colors"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#34D399]" />
                    <span>Mark Converted</span>
                  </DropdownMenuItem>
                )}

                {row.status !== "LOST" && (
                  <DropdownMenuItem
                    onClick={() => handleUpdateStatus(row.id, "LOST")}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-[#F87171] hover:bg-[#F87171]/15 rounded-lg cursor-pointer outline-none transition-colors"
                  >
                    <XCircle className="h-3.5 w-3.5 text-[#F87171]" />
                    <span>Mark Lost</span>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={() => handleDeleteLead(row.id)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#F87171] hover:bg-[#F87171]/15 rounded-lg cursor-pointer outline-none transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5 text-[#F87171]" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const tabs: ("All" | LeadStatus)[] = ["All", "NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"]

  return (
    <>
      <Card className="bg-[#042850] border-[#0A355C] overflow-hidden rounded-2xl">
        <CardHeader className="flex flex-col md:flex-row md:items-end justify-between pb-4 pt-5 px-6 border-b border-[#0A355C] gap-4">
          {/* Left side: Title and Search underneath */}
          <div className="flex flex-col gap-3">
            <CardTitle className="text-sm font-semibold text-white">
              All Leads ({filteredData.length})
            </CardTitle>
            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search lead, email, business, or source..."
                className="h-9 w-full pl-9 bg-[#00152B] border-[#0A355C] text-white text-xs placeholder:text-[#94A3B8] rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>
          </div>

          {/* Right side: Tabs filter and Add Lead Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start md:self-end">
            <div className="flex items-center gap-1 bg-[#00152B] p-1 rounded-xl border border-[#0A355C] overflow-x-auto max-w-full">
              {tabs.map((tab) => {
                const isActive = activeTab === tab
                return (
                  <Button
                    key={tab}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab(tab)}
                    className={`h-7 px-3 text-[11px] font-medium rounded-lg transition-colors cursor-pointer capitalize ${
                      isActive ? "bg-[#0A355C] text-white shadow-sm" : "text-[#94A3B8] hover:text-white hover:bg-[#0A355C]/50"
                    }`}
                  >
                    {tab.toLowerCase()}
                  </Button>
                )
              })}
            </div>

            <Button
              onClick={() => setIsAddOpen(true)}
              className="h-9 px-4 text-xs font-semibold bg-[#C7F556] hover:bg-[#b8e645] text-[#00152B] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#C7F556]/15"
            >
              <Plus className="h-4 w-4" />
              <span>Add Lead</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={filteredData}
            onRowClick={(row) => setViewingLead(row)}
          />
        </CardContent>
      </Card>

      {/* View Lead Modal */}
      <ViewLeadModal
        isOpen={!!viewingLead}
        onClose={() => setViewingLead(null)}
        lead={viewingLead}
        onEdit={(lead) => setEditingLead(lead)}
      />

      {/* Edit Lead Modal */}
      <EditLeadModal
        isOpen={!!editingLead}
        onClose={() => setEditingLead(null)}
        onSave={handleSaveEdit}
        lead={editingLead}
      />

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddLead}
      />
    </>
  )
}
