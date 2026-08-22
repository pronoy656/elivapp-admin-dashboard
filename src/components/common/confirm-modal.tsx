"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"

export interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description: React.ReactNode | string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  variant?: "default" | "destructive" | "success"
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "default",
}: ConfirmModalProps) {
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

  const confirmBtnStyles =
    variant === "destructive"
      ? "bg-[#EF4444] hover:bg-[#dc2626] text-white font-semibold shadow-md"
      : "bg-[#C7F556] hover:bg-[#b8eb42] text-[#00152B] font-semibold shadow-md"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#021830] border border-[#0A355C] rounded-3xl p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-2 tracking-wide">{title}</h2>

        {/* Description */}
        <div className="text-sm md:text-base text-[#94A3B8] font-normal leading-relaxed mb-6">
          {description}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-[#042850]/40 hover:bg-[#0A355C] text-white border border-[#0A355C] rounded-2xl h-12 text-sm font-semibold transition-all cursor-pointer"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full rounded-2xl h-12 text-sm transition-all cursor-pointer ${confirmBtnStyles}`}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
