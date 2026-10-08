"use client"

import React, { useState, useEffect } from "react"
import { X, Building2, User, Mail, Phone, MapPin, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LeadData, LeadStatus } from "./view-lead-modal"

interface EditLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (updated: LeadData) => void
  lead: LeadData | null
}

const statusOptions: { key: LeadStatus; label: string }[] = [
  { key: "PENDING", label: "Pending" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "APPROVED", label: "Approved" },
  { key: "REJECTED", label: "Rejected" },
]

export function EditLeadModal({
  isOpen,
  onClose,
  onSave,
  lead,
}: EditLeadModalProps) {
  const [businessName, setBusinessName] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [status, setStatus] = useState<LeadStatus>("PENDING")
  const [adminNote, setAdminNote] = useState("")
  const [rejectReason, setRejectReason] = useState("")

  useEffect(() => {
    if (lead) {
      setBusinessName(lead.businessName)
      setOwnerName(lead.ownerName)
      setOwnerEmail(lead.ownerEmail)
      setPhone(lead.phone)
      setAddress(lead.address)
      setStatus(lead.status)
      setAdminNote(lead.adminNote || "")
      setRejectReason(lead.rejectReason || "")
    }
  }, [lead, isOpen])

  if (!isOpen || !lead) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...lead,
      businessName,
      ownerName,
      ownerEmail,
      phone,
      address,
      status,
      adminNote,
      rejectReason: status === "REJECTED" ? rejectReason : undefined,
    })
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#021830] border border-[#0A355C] rounded-3xl p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-[#0A355C] transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col gap-1 mb-5">
          <h2 className="text-xl font-bold text-white tracking-tight">Edit Lead</h2>
          <p className="text-xs text-[#94A3B8]">Update business details, status, and admin notes.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#C7F556]" /> Business Name
              </label>
              <Input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business Name"
                required
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#C7F556]" /> Owner Name
              </label>
              <Input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Owner Name"
                required
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#38BDF8]" /> Owner Email
              </label>
              <Input
                type="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                placeholder="owner@example.com"
                required
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-[#34D399]" /> Phone
              </label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-0199"
                required
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#C7F556]" /> Address
            </label>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 742 Evergreen Terrace, Springfield, IL"
              required
              className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
          </div>

          {/* Status Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#CBD5E1]">Status</label>
            <div className="grid grid-cols-4 gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setStatus(opt.key)}
                  className={`py-2 px-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                    status === opt.key
                      ? "bg-[#C7F556] border-[#C7F556] text-[#00152B] font-bold"
                      : "bg-[#00152B] border-[#0A355C] text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Admin Note */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#C7F556]" /> Admin Note
            </label>
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Notes on verification, documents, or conversation with owner..."
              rows={2}
              className="bg-[#00152B] border border-[#0A355C] text-white text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C7F556] placeholder:text-[#64748B] resize-none"
            />
          </div>

          {/* Reject Reason (only if Rejected) */}
          {status === "REJECTED" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#F87171] flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" /> Rejection Reason
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejecting this lead..."
                required
                rows={2}
                className="bg-[#00152B] border border-[#F87171]/40 text-white text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F87171] placeholder:text-[#64748B] resize-none"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-3 mt-3 pt-3 border-t border-[#0A355C]">
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
              className="h-10 px-6 rounded-xl text-xs font-semibold bg-[#C7F556] hover:bg-[#b8e645] text-[#00152B] cursor-pointer"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
