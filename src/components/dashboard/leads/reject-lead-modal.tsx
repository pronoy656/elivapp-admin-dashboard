"use client"

import React, { useState } from "react"
import { X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RejectLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (id: string, reason: string) => void
  lead: { id: string; businessName: string } | null
}

export function RejectLeadModal({
  isOpen,
  onClose,
  onConfirm,
  lead,
}: RejectLeadModalProps) {
  const [reason, setReason] = useState("")

  if (!isOpen || !lead) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason.trim()) return
    onConfirm(lead.id, reason)
    setReason("")
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#021830] border border-[#0A355C] rounded-3xl p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-[#0A355C] transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col gap-1.5 mb-5">
          <div className="flex items-center gap-2 text-[#F87171]">
            <AlertCircle className="h-5 w-5" />
            <h2 className="text-lg font-bold text-white tracking-tight">Reject Lead</h2>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Please provide a rejection reason for <span className="text-white font-semibold">{lead.businessName}</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#CBD5E1]">Rejection Reason *</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Ineligible business license, unreachable phone number, or duplicate lead..."
              required
              rows={3}
              className="bg-[#00152B] border border-[#F87171]/40 text-white text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F87171] placeholder:text-[#64748B] resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="h-10 px-4 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-[#0A355C] cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 px-5 rounded-xl text-xs font-semibold bg-[#F87171] hover:bg-[#ef4444] text-white cursor-pointer"
            >
              Confirm Rejection
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
