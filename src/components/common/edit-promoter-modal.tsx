"use client"

import React, { useState, useEffect } from "react"
import { X, User, AtSign, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface EditPromoterData {
  id: string
  name: string
  handle: string
  status: "ACTIVE" | "SUSPENDED"
}

interface EditPromoterModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (updated: EditPromoterData) => void
  promoter: EditPromoterData | null
}

export function EditPromoterModal({
  isOpen,
  onClose,
  onSave,
  promoter,
}: EditPromoterModalProps) {
  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")
  const [status, setStatus] = useState<"ACTIVE" | "SUSPENDED">("ACTIVE")

  useEffect(() => {
    if (promoter) {
      setName(promoter.name)
      setHandle(promoter.handle)
      setStatus(promoter.status)
    }
  }, [promoter, isOpen])

  if (!isOpen || !promoter) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...promoter,
      name,
      handle,
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
          <h2 className="text-xl font-bold text-white tracking-tight">Edit Promoter</h2>
          <p className="text-xs text-[#94A3B8]">Update account credentials and status.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[#C7F556]" /> Full Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Devon Rivera"
              required
              className="bg-[#00152B] border-[#0A355C] text-white rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
              <AtSign className="h-3.5 w-3.5 text-[#C7F556]" /> Promoter Handle
            </label>
            <Input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="e.g. @devon_earns"
              required
              className="bg-[#00152B] border-[#0A355C] text-white rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#C7F556]" /> Account Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("ACTIVE")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  status === "ACTIVE"
                    ? "bg-[#34D399]/20 border-[#34D399] text-[#34D399]"
                    : "bg-[#00152B] border-[#0A355C] text-[#94A3B8] hover:text-white"
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setStatus("SUSPENDED")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  status === "SUSPENDED"
                    ? "bg-[#F87171]/20 border-[#F87171] text-[#F87171]"
                    : "bg-[#00152B] border-[#0A355C] text-[#94A3B8] hover:text-white"
                }`}
              >
                Suspended
              </button>
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
