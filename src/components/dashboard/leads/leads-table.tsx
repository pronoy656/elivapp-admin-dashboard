"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable, ColumnDef } from "@/components/common/data-table"
import { Search, MoreVertical, Eye, Pencil, CheckCircle2, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ViewLeadModal, LeadData, LeadStatus, statusBadgeStyles } from "./view-lead-modal"
import { EditLeadModal } from "./edit-lead-modal"
import { RejectLeadModal } from "./reject-lead-modal"

const initialLeads: LeadData[] = [
  {
    id: "1",
    businessName: "FitZone Gym",
    ownerName: "Devon Rivera",
    ownerEmail: "devon@fitzone.com",
    phone: "+1 555-0143",
    address: "120 Market St, Austin, TX",
    status: "APPROVED",
    adminNote: "Initial verification call completed and verified.",
    createdAt: "Oct 02, 2026",
  },
  {
    id: "2",
    businessName: "TacoFusion",
    ownerName: "Marco Silva",
    ownerEmail: "marco@tacofusion.com",
    phone: "+1 555-0182",
    address: "450 Broadway Ave, New York, NY",
    status: "IN_PROGRESS",
    adminNote: "Requested business tax identification documents.",
    createdAt: "Oct 04, 2026",
  },
  {
    id: "3",
    businessName: "Luna Spa & Wellness",
    ownerName: "Alicia Monroe",
    ownerEmail: "alicia@lunaspa.com",
    phone: "+1 555-0199",
    address: "88 Sunset Blvd, Los Angeles, CA",
    status: "APPROVED",
    adminNote: "Signed 12-month promoter partnership agreement.",
    createdAt: "Oct 03, 2026",
  },
  {
    id: "4",
    businessName: "Kava Brew Café",
    ownerName: "Tariq Osman",
    ownerEmail: "tariq@kavabrew.com",
    phone: "+1 555-0211",
    address: "304 Pine St, Seattle, WA",
    status: "PENDING",
    adminNote: "Awaiting owner response via email regarding menu rewards.",
    createdAt: "Oct 06, 2026",
  },
  {
    id: "5",
    businessName: "CloudCuts Salon",
    ownerName: "Sarah Connor",
    ownerEmail: "sarah@cloudcuts.com",
    phone: "+1 555-0234",
    address: "12 Ocean Dr, Miami, FL",
    status: "REJECTED",
    adminNote: "Incomplete registration info submitted.",
    rejectReason: "Unverifiable business registration license.",
    createdAt: "Sep 28, 2026",
  },
  {
    id: "6",
    businessName: "Apex Auto Care",
    ownerName: "James Wright",
    ownerEmail: "james@apexauto.com",
    phone: "+1 555-0255",
    address: "98 Industrial Pkwy, Chicago, IL",
    status: "PENDING",
    adminNote: "New inbound lead from website form.",
    createdAt: "Oct 07, 2026",
  },
  {
    id: "7",
    businessName: "Green Thumb Nursery",
    ownerName: "Elena Rostova",
    ownerEmail: "elena@greenthumb.org",
    phone: "+1 555-0278",
    address: "15 Garden Ln, Portland, OR",
    status: "IN_PROGRESS",
    adminNote: "Scheduled onboarding call for tomorrow morning.",
    createdAt: "Oct 05, 2026",
  },
  {
    id: "8",
    businessName: "Burger Barn Express",
    ownerName: "Zack Peterson",
    ownerEmail: "zack@burgerbarn.com",
    phone: "+1 555-0291",
    address: "77 Main St, Dallas, TX",
    status: "REJECTED",
    adminNote: "Owner declined proposal during follow-up.",
    rejectReason: "Owner opted for direct competitor software.",
    createdAt: "Sep 30, 2026",
  },
]

type TabFilter = "All" | "Pending" | "In Progress" | "Approved" | "Rejected"

const tabToStatusMap: Record<TabFilter, LeadStatus | "ALL"> = {
  All: "ALL",
  Pending: "PENDING",
  "In Progress": "IN_PROGRESS",
  Approved: "APPROVED",
  Rejected: "REJECTED",
}

export function LeadsTable() {
  const [data, setData] = useState<LeadData[]>(initialLeads)
  const [activeTab, setActiveTab] = useState<TabFilter>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Modals state
  const [viewingLead, setViewingLead] = useState<LeadData | null>(null)
  const [editingLead, setEditingLead] = useState<LeadData | null>(null)
  const [rejectingLead, setRejectingLead] = useState<LeadData | null>(null)

  const handleSaveEdit = (updated: LeadData) => {
    setData((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
    if (viewingLead && viewingLead.id === updated.id) {
      setViewingLead(updated)
    }
    setEditingLead(null)
  }

  const handleApprove = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "APPROVED", rejectReason: undefined } : item
      )
    )
    if (viewingLead && viewingLead.id === id) {
      setViewingLead((prev) => (prev ? { ...prev, status: "APPROVED", rejectReason: undefined } : null))
    }
  }

  const handleConfirmReject = (id: string, reason: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "REJECTED", rejectReason: reason } : item
      )
    )
    if (viewingLead && viewingLead.id === id) {
      setViewingLead((prev) => (prev ? { ...prev, status: "REJECTED", rejectReason: reason } : null))
    }
  }

  const filteredData = data.filter((d) => {
    const requiredStatus = tabToStatusMap[activeTab]
    const matchesTab = requiredStatus === "ALL" || d.status === requiredStatus
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      d.businessName.toLowerCase().includes(term) ||
      d.ownerName.toLowerCase().includes(term) ||
      d.ownerEmail.toLowerCase().includes(term) ||
      d.phone.toLowerCase().includes(term) ||
      d.address.toLowerCase().includes(term) ||
      (d.adminNote && d.adminNote.toLowerCase().includes(term))
    return matchesTab && matchesSearch
  })

  const columns: ColumnDef<LeadData>[] = [
    {
      key: "businessName",
      header: "BUSINESS NAME",
      render: (row) => (
        <span className="font-semibold text-white text-xs whitespace-nowrap">
          {row.businessName}
        </span>
      ),
    },
    {
      key: "ownerName",
      header: "OWNER NAME",
      render: (row) => (
        <span className="text-[#CBD5E1] text-xs font-medium whitespace-nowrap">
          {row.ownerName}
        </span>
      ),
    },
    {
      key: "ownerEmail",
      header: "OWNER EMAIL",
      render: (row) => (
        <span className="text-[#94A3B8] text-xs font-mono">{row.ownerEmail}</span>
      ),
    },
    {
      key: "phone",
      header: "PHONE",
      render: (row) => (
        <span className="text-[#CBD5E1] text-xs font-mono whitespace-nowrap">{row.phone}</span>
      ),
    },
    {
      key: "address",
      header: "ADDRESS",
      render: (row) => (
        <span className="text-[#94A3B8] text-xs max-w-[200px] truncate block" title={row.address}>
          {row.address}
        </span>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      render: (row) => {
        const badge = statusBadgeStyles[row.status] || {
          label: row.status,
          bg: "bg-white/10",
          text: "text-white",
        }
        return (
          <div
            className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap ${badge.bg} ${badge.text}`}
          >
            {badge.label}
          </div>
        )
      },
    },
    {
      key: "adminNote",
      header: "ADMIN NOTE",
      render: (row) => (
        <span
          className="text-[#CBD5E1] text-xs max-w-[180px] truncate block italic"
          title={row.adminNote}
        >
          {row.adminNote || "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "CREATED AT",
      render: (row) => (
        <span className="text-[#94A3B8] text-xs whitespace-nowrap font-mono">{row.createdAt}</span>
      ),
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

                {row.status !== "APPROVED" && (
                  <DropdownMenuItem
                    onClick={() => handleApprove(row.id)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-[#34D399] hover:bg-[#34D399]/15 rounded-lg cursor-pointer outline-none transition-colors"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#34D399]" />
                    <span>Approve</span>
                  </DropdownMenuItem>
                )}

                {row.status !== "REJECTED" && (
                  <DropdownMenuItem
                    onClick={() => setRejectingLead(row)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-[#F87171] hover:bg-[#F87171]/15 rounded-lg cursor-pointer outline-none transition-colors"
                  >
                    <XCircle className="h-3.5 w-3.5 text-[#F87171]" />
                    <span>Reject</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const tabs: TabFilter[] = ["All", "Pending", "In Progress", "Approved", "Rejected"]

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
                placeholder="Search business, owner, phone, email..."
                className="h-9 w-full pl-9 bg-[#00152B] border-[#0A355C] text-white text-xs placeholder:text-[#94A3B8] rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>
          </div>

          {/* Right side: Tabs filter (Pending, In Progress, Approved, Rejected) */}
          <div className="flex items-center gap-1 bg-[#00152B] p-1 rounded-xl border border-[#0A355C] overflow-x-auto self-start md:self-end">
            {tabs.map((tab) => {
              const isActive = activeTab === tab
              return (
                <Button
                  key={tab}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(tab)}
                  className={`h-7 px-3.5 text-[11px] font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#0A355C] text-white shadow-sm font-semibold"
                      : "text-[#94A3B8] hover:text-white hover:bg-[#0A355C]/50"
                  }`}
                >
                  {tab}
                </Button>
              )
            })}
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

      {/* View Lead Details Modal */}
      <ViewLeadModal
        isOpen={!!viewingLead}
        onClose={() => setViewingLead(null)}
        lead={viewingLead}
        onEdit={(lead) => setEditingLead(lead)}
        onApprove={handleApprove}
        onReject={(lead) => setRejectingLead(lead)}
      />

      {/* Edit Lead Modal */}
      <EditLeadModal
        isOpen={!!editingLead}
        onClose={() => setEditingLead(null)}
        onSave={handleSaveEdit}
        lead={editingLead}
      />

      {/* Reject Lead Modal */}
      <RejectLeadModal
        isOpen={!!rejectingLead}
        onClose={() => setRejectingLead(null)}
        onConfirm={handleConfirmReject}
        lead={rejectingLead ? { id: rejectingLead.id, businessName: rejectingLead.businessName } : null}
      />
    </>
  )
}
