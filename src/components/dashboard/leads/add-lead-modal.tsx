"use client"

import React, { useState } from "react"
import { X, User, Mail, Phone, Building2, DollarSign, Tag, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LeadData, LeadStatus } from "./view-lead-modal"

interface AddLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (newLead: LeadData) => void
}

export function AddLeadModal({
  isOpen,
  onClose,
  onAdd,
}: AddLeadModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [promoter, setPromoter] = useState("")
  const [source, setSource] = useState("Direct Referral")
  const [value, setValue] = useState("$250")
  const [status, setStatus] = useState<LeadStatus>("NEW")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      id: String(Date.now()).slice(-4),
      name,
      email,
      phone: phone || "+1 555-0100",
      company: company || "General Inquiry",
      promoter: promoter || "Direct / Admin",
      source: source || "Organic",
      value: value.startsWith("$") ? value : `$${value}`,
      status,
      date: "Just now",
    })
    // Reset & close
    setName("")
    setEmail("")
    setPhone("")
    setCompany("")
    setPromoter("")
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

        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Create New Lead</h2>
          <p className="text-xs text-[#94A3B8]">Add a prospective customer or business lead to acquisition pipeline.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[#C7F556]" /> Full Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              required
              className="bg-[#00152B] border-[#0A355C] text-white rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#38BDF8]" /> Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                required
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-[#34D399]" /> Phone
              </label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-0144"
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#C7F556]" /> Target Business
              </label>
              <Input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="FitZone Gym"
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-[#A855F7]" /> Promoter
              </label>
              <Input
                type="text"
                value={promoter}
                onChange={(e) => setPromoter(e.target.value)}
                placeholder="Alicia Monroe"
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-[#F59E0B]" /> Source Channel
              </label>
              <Input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="QR Code / Social"
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-[#10B981]" /> Est. Deal Value
              </label>
              <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="$250"
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-[#0A355C]">
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
              Create Lead
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
