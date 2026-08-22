"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface EditBusinessData {
  id: string
  name: string
  category: string
  reward: string
  status: "ACTIVE" | "SUSPENDED"
}

interface EditBusinessModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (updated: EditBusinessData) => void
  business: EditBusinessData | null
}

export function EditBusinessModal({
  isOpen,
  onClose,
  onSave,
  business,
}: EditBusinessModalProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [reward, setReward] = useState("")
  const [status, setStatus] = useState<"ACTIVE" | "SUSPENDED">("ACTIVE")

  useEffect(() => {
    if (business) {
      setName(business.name)
      setCategory(business.category)
      setReward(business.reward)
      setStatus(business.status)
    }
  }, [business, isOpen])

  if (!isOpen || !business) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...business,
      name,
      category,
      reward,
      status,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#021830] border border-[#0A355C] rounded-3xl p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white mb-1 tracking-wide">Edit Business Details</h2>
        <p className="text-xs md:text-sm text-[#94A3B8] mb-6">
          Update information for {business.name}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Business Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#CBD5E1]">Business Name</label>
            <Input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#CBD5E1]">Category</label>
            <Input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
          </div>

          {/* Reward per Sale */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#CBD5E1]">Reward per Sale</label>
            <Input
              type="text"
              required
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              className="h-11 bg-[#00152B] border-[#0A355C] text-white text-xs rounded-xl focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#CBD5E1]">Status</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("ACTIVE")}
                className={`h-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  status === "ACTIVE"
                    ? "bg-[#34D399] text-[#00152B]"
                    : "bg-[#00152B] text-[#94A3B8] border border-[#0A355C]"
                }`}
              >
                ACTIVE
              </button>
              <button
                type="button"
                onClick={() => setStatus("SUSPENDED")}
                className={`h-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  status === "SUSPENDED"
                    ? "bg-[#F87171] text-white"
                    : "bg-[#00152B] text-[#94A3B8] border border-[#0A355C]"
                }`}
              >
                SUSPENDED
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full bg-[#042850]/40 hover:bg-[#0A355C] text-white border border-[#0A355C] rounded-2xl h-11 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full bg-[#C7F556] hover:bg-[#b8eb42] text-[#00152B] font-semibold rounded-2xl h-11 text-xs shadow-md cursor-pointer"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
