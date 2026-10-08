"use client"

import React from "react"
import { X, User, DollarSign, Share2, MousePointerClick, Percent, Calendar, Mail, ShieldAlert, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface ViewPromoterData {
  id: string
  name: string
  img: string
  handle: string
  referrals: number
  conversions: number
  earned: string
  status: "ACTIVE" | "SUSPENDED"
  multiplier?: string
}

interface ViewPromoterModalProps {
  isOpen: boolean
  onClose: () => void
  promoter: ViewPromoterData | null
  onEdit?: (promoter: ViewPromoterData) => void
  onToggleStatus?: (promoter: ViewPromoterData) => void
}

export function ViewPromoterModal({
  isOpen,
  onClose,
  promoter,
  onEdit,
  onToggleStatus,
}: ViewPromoterModalProps) {
  if (!isOpen || !promoter) return null

  const conversionRate =
    promoter.referrals > 0
      ? Math.round((promoter.conversions / promoter.referrals) * 100)
      : 0

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

        {/* Header with Avatar and Basic Info */}
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16 border-2 border-[#C7F556]">
            <AvatarImage src={promoter.img} alt={promoter.name} />
            <AvatarFallback className="bg-[#0A355C] text-white font-bold text-lg">
              {promoter.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-white">{promoter.name}</h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                  promoter.status === "ACTIVE"
                    ? "bg-[#34D399]/15 text-[#34D399]"
                    : "bg-[#F87171]/15 text-[#F87171]"
                }`}
              >
                {promoter.status}
              </span>
            </div>
            <p className="text-sm font-mono text-[#94A3B8]">{promoter.handle}</p>
            <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
              <Mail className="h-3 w-3" />
              {promoter.handle.replace("@", "")}@elivapp.network
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-3 flex flex-col">
            <span className="text-[11px] text-[#94A3B8] flex items-center gap-1">
              <Share2 className="h-3 w-3 text-[#38BDF8]" />
              Referrals
            </span>
            <span className="text-lg font-bold text-white mt-1">{promoter.referrals}</span>
          </div>

          <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-3 flex flex-col">
            <span className="text-[11px] text-[#94A3B8] flex items-center gap-1">
              <MousePointerClick className="h-3 w-3 text-[#A855F7]" />
              Conversions
            </span>
            <span className="text-lg font-bold text-white mt-1">{promoter.conversions}</span>
          </div>

          <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-3 flex flex-col">
            <span className="text-[11px] text-[#94A3B8] flex items-center gap-1">
              <Percent className="h-3 w-3 text-[#10B981]" />
              Conv. Rate
            </span>
            <span className="text-lg font-bold text-[#10B981] mt-1">{conversionRate}%</span>
          </div>

          <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-3 flex flex-col">
            <span className="text-[11px] text-[#94A3B8] flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-[#C7F556]" />
              Earned
            </span>
            <span className="text-lg font-bold text-[#C7F556] mt-1">{promoter.earned}</span>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-[#00152B] border border-[#0A355C] rounded-2xl p-4 flex flex-col gap-2.5 mb-6 text-xs text-[#CBD5E1]">
          <div className="flex justify-between items-center py-1 border-b border-[#0A355C]/50">
            <span className="text-[#94A3B8]">Promoter ID</span>
            <span className="font-mono text-white">PRM-{promoter.id.padStart(4, "0")}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-[#0A355C]/50">
            <span className="text-[#94A3B8]">Payout Method</span>
            <span className="text-white">Direct Deposit (Verified)</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-[#94A3B8]">Account Status</span>
            <span className={promoter.status === "ACTIVE" ? "text-[#34D399] font-medium" : "text-[#F87171] font-medium"}>
              {promoter.status === "ACTIVE" ? "In Good Standing" : "Suspended by Admin"}
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3">
          {onToggleStatus && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onToggleStatus(promoter)
              }}
              className={`h-10 px-4 rounded-xl text-xs font-semibold border-[#0A355C] bg-transparent cursor-pointer ${
                promoter.status === "ACTIVE"
                  ? "text-[#F87171] hover:bg-[#F87171]/15 hover:text-[#F87171]"
                  : "text-[#34D399] hover:bg-[#34D399]/15 hover:text-[#34D399]"
              }`}
            >
              {promoter.status === "ACTIVE" ? "Suspend Account" : "Activate Account"}
            </Button>
          )}

          {onEdit && (
            <Button
              type="button"
              onClick={() => {
                onClose()
                onEdit(promoter)
              }}
              className="h-10 px-5 rounded-xl text-xs font-semibold bg-[#C7F556] hover:bg-[#b8e645] text-[#00152B] cursor-pointer"
            >
              Edit Details
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
