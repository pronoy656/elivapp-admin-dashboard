"use client"

import React, { useState, useEffect } from "react"
import { X, User, Mail, Phone, Building2, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LeadData, LeadStatus } from "./view-lead-modal"

interface EditLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (updated: LeadData) => void
  lead: LeadData | null
}

const statusOptions: LeadStatus[] = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"]

export function EditLeadModal({
  isOpen,
  onClose,
  onSave,
  lead,
}: EditLeadModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [value, setValue] = useState("")
  const [status, setStatus] = useState<LeadStatus>("NEW")

  useEffect(() => {
    if (lead) {
      setName(lead.name)
      setEmail(lead.email)
      setPhone(lead.phone)
      setCompany(lead.company)
      setValue(lead.value)
      setStatus(lead.status)
    }
  }, [lead, isOpen])

  if (!isOpen || !lead) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...lead,
      name,
      email,
      phone,
      company,
      value,
      status,
    })
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
          <h2 className="text-xl font-bold text-white tracking-tight">Edit Lead</h2>
          <p className="text-xs text-[#94A3B8]">Update lead details, pipeline stage, and valuation.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[#C7F556]" /> Full Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              required
              className="bg-[#00152B] border-[#0A355C] text-white rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#38BDF8]" /> Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
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

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#C7F556]" /> Business
              </label>
              <Input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Target Business"
                required
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-[#10B981]" /> Est. Value
              </label>
              <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="$250"
                required
                className="bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#CBD5E1]">Pipeline Stage</label>
            <div className="grid grid-cols-3 gap-2">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`py-2 px-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                    status === st
                      ? "bg-[#C7F556] border-[#C7F556] text-[#00152B] font-bold"
                      : "bg-[#00152B] border-[#0A355C] text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#0A355C]">
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
