"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Check } from "lucide-react"

export interface MultiplierModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (newMultiplier: string) => void
  promoterName?: string
  currentMultiplier?: string
}

// Generate options from 0.5 to 20 in steps of 0.5
const multiplierOptions: string[] = []
for (let i = 0.5; i <= 20; i += 0.5) {
  const val = Number.isInteger(i) ? `${i}x` : `${i.toFixed(1)}x`
  multiplierOptions.push(val)
}

const quickSelects = ["0.5x", "1x", "1.5x", "2x", "2.5x", "3x", "5x", "10x", "20x"]

export function MultiplierModal({
  isOpen,
  onClose,
  onSave,
  promoterName,
  currentMultiplier = "1x",
}: MultiplierModalProps) {
  const [selectedMultiplier, setSelectedMultiplier] = useState<string>(currentMultiplier)

  useEffect(() => {
    if (currentMultiplier) {
      setSelectedMultiplier(currentMultiplier)
    }
  }, [currentMultiplier, isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSave = () => {
    onSave(selectedMultiplier)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#021830] border border-[#0A355C] rounded-3xl p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-1 tracking-wide">Adjust Multiplier</h2>

        {/* Subtitle */}
        <p className="text-xs md:text-sm text-[#94A3B8] mb-6">
          {promoterName ? `Set reward multiplier for ${promoterName}` : "Set reward multiplier"}
        </p>

        {/* Shadcn UI Dropdown Menu */}
        <div className="flex flex-col gap-2 mb-5">
          <label className="text-xs font-semibold text-[#CBD5E1]">Select Multiplier (0.5x - 20x)</label>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full bg-[#00152B] border border-[#0A355C] text-white text-sm font-semibold rounded-xl h-12 px-4 flex items-center justify-between hover:border-[#C7F556] focus:border-[#C7F556] transition-colors cursor-pointer outline-none">
              <span className="text-white font-bold text-base">{selectedMultiplier}</span>
              <ChevronDown className="h-4 w-4 text-[#94A3B8]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[340px] max-h-[220px] overflow-y-auto bg-[#042850] border-[#0A355C] text-white p-1.5 rounded-xl shadow-2xl z-[70]">
              {multiplierOptions.map((opt) => {
                const isSelected = selectedMultiplier === opt
                return (
                  <DropdownMenuItem
                    key={opt}
                    onClick={() => setSelectedMultiplier(opt)}
                    className={`cursor-pointer rounded-lg px-3.5 py-2.5 text-sm font-semibold flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-[#C7F556] text-[#00152B] focus:bg-[#C7F556] focus:text-[#00152B]"
                        : "text-white focus:bg-[#0A355C] focus:text-white hover:bg-[#0A355C]"
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="h-4 w-4 stroke-[3]" />}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Quick Select Presets */}
        <div className="flex flex-col gap-2 mb-8">
          <label className="text-[11px] font-medium text-[#64748B]">Quick Presets</label>
          <div className="flex flex-wrap gap-2">
            {quickSelects.map((preset) => {
              const isSelected = selectedMultiplier === preset
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSelectedMultiplier(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-[#C7F556] text-[#00152B] shadow-sm"
                      : "bg-[#042850] text-[#94A3B8] hover:text-white border border-[#0A355C]"
                  }`}
                >
                  {preset}
                </button>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full bg-[#042850]/40 hover:bg-[#0A355C] text-white border border-[#0A355C] rounded-2xl h-12 text-sm font-semibold transition-all"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSave}
            className="w-full bg-[#C7F556] hover:bg-[#b8eb42] text-[#00152B] font-semibold rounded-2xl h-12 text-sm shadow-md transition-all"
          >
            Save Multiplier
          </Button>
        </div>
      </div>
    </div>
  )
}
