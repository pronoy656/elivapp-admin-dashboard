"use client"

import React from "react"
import { X, User, Mail, Phone, Building2, DollarSign, Calendar, Tag, UserCheck, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "LOST"

export interface LeadData {
  id: string
  name: string
  email: string
  phone: string
  company: string
  promoter: string
  source: string
  value: string
  status: LeadStatus
  date: string
  img?: string
}

interface ViewLeadModalProps {
  isOpen: boolean
  onClose: () => void
  lead: LeadData | null
  onEdit?: (lead: LeadData) => void
}

const statusBadgeStyles: Record<LeadStatus, { bg: string; text: string }> = {
  NEW: { bg: "bg-[#38BDF8]/15", text: "text-[#38BDF8]" },
  CONTACTED: { bg: "bg-[#FBBF24]/15", text: "text-[#FBBF24]" },
  QUALIFIED: { bg: "bg-[#C7F556]/15", text: "#C7F556" },
  CONVERTED: { bg: "bg-[#34D399]/15", text: "text-[#34D399]" },
  LOST: { bg: "bg-[#F87171]/15", text: "text-[#F87171]" },
}

export function ViewLeadModal({
  isOpen,
  onClose,
  lead,
  onEdit,
}: ViewLeadModalProps) {
  if (!isOpen || !lead) return null

  const badge = statusBadgeStyles[lead.status] || { bg: "bg-white/10", text: "text-white" }

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
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-14 w-14 border-2 border-[#C7F556]">
            {lead.img ? <AvatarImage src={lead.img} alt={lead.name} /> : null}
            <AvatarFallback className="bg-[#0A355C] text-white font-bold text-lg">
              {lead.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-white">{lead.name}</h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${badge.bg} ${badge.text}`}
              >
                {lead.status}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8]">{lead.company}</p>
            <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5 font-mono">
              Lead #{lead.id.padStart(4, "0")} · Acquired {lead.date}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-3 flex flex-col">
            <span className="text-[11px] text-[#94A3B8] flex items-center gap-1.5 mb-1">
              <Mail className="h-3.5 w-3.5 text-[#38BDF8]" />
              Email
            </span>
            <span className="text-xs font-medium text-white truncate">{lead.email}</span>
          </div>

          <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-3 flex flex-col">
            <span className="text-[11px] text-[#94A3B8] flex items-center gap-1.5 mb-1">
              <Phone className="h-3.5 w-3.5 text-[#34D399]" />
              Phone
            </span>
            <span className="text-xs font-medium text-white">{lead.phone}</span>
          </div>
        </div>

        {/* Lead Details Card */}
        <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-4 flex flex-col gap-2.5 mb-6 text-xs text-[#CBD5E1]">
          <div className="flex justify-between items-center py-1 border-b border-[#0A355C]/50">
            <span className="text-[#94A3B8] flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-[#C7F556]" /> Target Business
            </span>
            <span className="font-semibold text-white">{lead.company}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-[#0A355C]/50">
            <span className="text-[#94A3B8] flex items-center gap-1.5">
              <UserCheck className="h-3.5 w-3.5 text-[#A855F7]" /> Referring Promoter
            </span>
            <span className="text-white font-medium">{lead.promoter}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-[#0A355C]/50">
            <span className="text-[#94A3B8] flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-[#F59E0B]" /> Acquisition Source
            </span>
            <span className="text-white bg-[#0A355C]/50 px-2 py-0.5 rounded text-[11px] font-mono">
              {lead.source}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#94A3B8] flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-[#10B981]" /> Est. Deal Value
            </span>
            <span className="text-[#C7F556] font-bold text-sm">{lead.value}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3">
          {onEdit && (
            <Button
              type="button"
              onClick={() => {
                onClose()
                onEdit(lead)
              }}
              className="h-10 px-5 rounded-xl text-xs font-semibold bg-[#C7F556] hover:bg-[#b8e645] text-[#00152B] cursor-pointer"
            >
              Edit Lead
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="h-10 px-4 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-[#0A355C] cursor-pointer"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
