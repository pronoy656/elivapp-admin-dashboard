"use client"

import React from "react"
import { X, Building2, User, Mail, Phone, MapPin, Calendar, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export type LeadStatus = "PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED"

export interface LeadData {
  id: string
  businessName: string
  ownerName: string
  ownerEmail: string
  phone: string
  address: string
  status: LeadStatus
  adminNote?: string
  rejectReason?: string
  createdAt: string
}

interface ViewLeadModalProps {
  isOpen: boolean
  onClose: () => void
  lead: LeadData | null
  onEdit?: (lead: LeadData) => void
  onApprove?: (id: string) => void
  onReject?: (lead: LeadData) => void
}

export const statusBadgeStyles: Record<LeadStatus, { label: string; bg: string; text: string }> = {
  PENDING: { label: "Pending", bg: "bg-[#FBBF24]/15", text: "text-[#FBBF24]" },
  IN_PROGRESS: { label: "In Progress", bg: "bg-[#38BDF8]/15", text: "text-[#38BDF8]" },
  APPROVED: { label: "Approved", bg: "bg-[#34D399]/15", text: "text-[#34D399]" },
  REJECTED: { label: "Rejected", bg: "bg-[#F87171]/15", text: "text-[#F87171]" },
}

export function ViewLeadModal({
  isOpen,
  onClose,
  lead,
  onEdit,
  onApprove,
  onReject,
}: ViewLeadModalProps) {
  if (!isOpen || !lead) return null

  const badge = statusBadgeStyles[lead.status] || { label: lead.status, bg: "bg-white/10", text: "text-white" }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#021830] border border-[#0A355C] rounded-3xl p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-[#0A355C] transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Lead Header */}
        <div className="flex flex-col gap-1 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white tracking-tight">{lead.businessName}</h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${badge.bg} ${badge.text}`}
            >
              {badge.label}
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] flex items-center gap-1.5 mt-0.5">
            <User className="h-3.5 w-3.5 text-[#C7F556]" />
            Owner: <span className="text-white font-medium">{lead.ownerName}</span>
            <span className="text-[#64748B]">·</span>
            <span className="font-mono text-[#64748B]">Lead #{lead.id.padStart(4, "0")}</span>
          </p>
        </div>

        {/* Contact & Location Info */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-3.5 flex flex-col gap-1">
            <span className="text-[11px] text-[#94A3B8] flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-[#38BDF8]" /> Owner Email
            </span>
            <span className="text-xs font-medium text-white truncate">{lead.ownerEmail}</span>
          </div>

          <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-3.5 flex flex-col gap-1">
            <span className="text-[11px] text-[#94A3B8] flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#34D399]" /> Phone Number
            </span>
            <span className="text-xs font-medium text-white">{lead.phone}</span>
          </div>
        </div>

        {/* Address & Meta */}
        <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-4 flex flex-col gap-2.5 mb-5 text-xs text-[#CBD5E1]">
          <div className="flex justify-between items-start py-1 border-b border-[#0A355C]/50 gap-4">
            <span className="text-[#94A3B8] flex items-center gap-1.5 shrink-0">
              <MapPin className="h-3.5 w-3.5 text-[#C7F556]" /> Business Address
            </span>
            <span className="font-medium text-white text-right">{lead.address}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-[#0A355C]/50">
            <span className="text-[#94A3B8] flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#A855F7]" /> Created At
            </span>
            <span className="font-mono text-white">{lead.createdAt}</span>
          </div>

          <div className="flex flex-col gap-1 py-1">
            <span className="text-[#94A3B8] flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#C7F556]" /> Admin Note
            </span>
            <p className="text-white text-xs bg-[#042850] p-2.5 rounded-xl border border-[#0A355C]/70">
              {lead.adminNote || "No admin notes added yet."}
            </p>
          </div>

          {lead.status === "REJECTED" && lead.rejectReason && (
            <div className="flex flex-col gap-1 py-1 border-t border-[#0A355C]/50">
              <span className="text-[#F87171] flex items-center gap-1.5 font-semibold">
                <AlertCircle className="h-3.5 w-3.5" /> Rejection Reason
              </span>
              <p className="text-[#F87171] text-xs bg-[#F87171]/10 p-2.5 rounded-xl border border-[#F87171]/30">
                {lead.rejectReason}
              </p>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {lead.status !== "APPROVED" && onApprove && (
              <Button
                type="button"
                onClick={() => {
                  onApprove(lead.id)
                  onClose()
                }}
                className="h-9 px-4 rounded-xl text-xs font-semibold bg-[#34D399] hover:bg-[#2ebb85] text-[#00152B] cursor-pointer"
              >
                Approve
              </Button>
            )}

            {lead.status !== "REJECTED" && onReject && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onClose()
                  onReject(lead)
                }}
                className="h-9 px-4 rounded-xl text-xs font-semibold border-[#F87171]/40 text-[#F87171] hover:bg-[#F87171]/15 cursor-pointer"
              >
                Reject
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onEdit && (
              <Button
                type="button"
                onClick={() => {
                  onClose()
                  onEdit(lead)
                }}
                className="h-9 px-4 rounded-xl text-xs font-semibold bg-[#C7F556] hover:bg-[#b8e645] text-[#00152B] cursor-pointer"
              >
                Edit
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="h-9 px-3.5 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-[#0A355C] cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
