"use client"

import React, { useState, useRef, useEffect } from "react"
import { Calendar, ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export type PredefinedRange = "7D" | "30D" | "90D" | "Custom"

export interface CustomDateRange {
  from: Date | null
  to: Date | null
}

interface DateRangeFilterProps {
  currentRange: PredefinedRange
  customRange?: CustomDateRange
  onChange: (range: PredefinedRange, customRange?: CustomDateRange) => void
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export function DateRangeFilter({
  currentRange,
  customRange,
  onChange,
}: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Internal calendar state
  const today = new Date()
  const [viewDate, setViewDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1))
  const [startDate, setStartDate] = useState<Date | null>(customRange?.from || null)
  const [endDate, setEndDate] = useState<Date | null>(customRange?.to || null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Navigate calendar months
  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  }
  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  }

  // Handle day click
  const handleDayClick = (dayDate: Date) => {
    if (!startDate || (startDate && endDate)) {
      // Starting new selection
      setStartDate(dayDate)
      setEndDate(null)
    } else if (startDate && !endDate) {
      if (dayDate < startDate) {
        setStartDate(dayDate)
        setEndDate(null)
      } else {
        setEndDate(dayDate)
      }
    }
  }

  const handleApplyCustom = () => {
    if (startDate) {
      const finalEnd = endDate || startDate
      onChange("Custom", { from: startDate, to: finalEnd })
      setIsOpen(false)
    }
  }

  const handleSelectPreset = (preset: "7D" | "30D" | "90D") => {
    onChange(preset)
    setIsOpen(false)
  }

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // Render calendar days
  const renderCalendarDays = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDayIndex = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const prevMonthDays = new Date(year, month, 0).getDate()

    const days = []

    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="h-8 w-8 flex items-center justify-center text-xs text-[#64748B]/40 select-none"
        >
          {prevMonthDays - i}
        </div>
      )
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(year, month, d)
      const isStart = startDate && dayDate.toDateString() === startDate.toDateString()
      const isEnd = endDate && dayDate.toDateString() === endDate.toDateString()
      const isInRange =
        startDate &&
        endDate &&
        dayDate > startDate &&
        dayDate < endDate
      const isHoverRange =
        startDate &&
        !endDate &&
        hoverDate &&
        dayDate > startDate &&
        dayDate <= hoverDate
      const isToday = dayDate.toDateString() === today.toDateString()

      let dayStyle = "text-[#CBD5E1] hover:bg-[#0A355C] hover:text-white"
      if (isStart || isEnd) {
        dayStyle = "bg-[#C7F556] text-[#00152B] font-bold shadow-md shadow-[#C7F556]/20"
      } else if (isInRange || isHoverRange) {
        dayStyle = "bg-[#C7F556]/15 text-[#C7F556] rounded-none"
      }

      days.push(
        <button
          key={`current-${d}`}
          type="button"
          onClick={() => handleDayClick(dayDate)}
          onMouseEnter={() => setHoverDate(dayDate)}
          className={`h-8 w-8 text-xs rounded-lg transition-all flex items-center justify-center font-medium cursor-pointer ${dayStyle} ${
            isToday && !isStart && !isEnd ? "border border-[#C7F556]/40" : ""
          }`}
        >
          {d}
        </button>
      )
    }

    return days
  }

  // Label for custom button
  const getCustomLabel = () => {
    if (currentRange === "Custom" && customRange?.from) {
      if (customRange.to && customRange.from.toDateString() !== customRange.to.toDateString()) {
        return `${formatDateDisplay(customRange.from)} - ${formatDateDisplay(customRange.to)}`
      }
      return formatDateDisplay(customRange.from)
    }
    return "Custom"
  }

  return (
    <div className="relative" ref={popoverRef}>
      {/* Pills Container */}
      <div className="hidden md:flex items-center bg-[#00152B] rounded-xl p-1 h-10 border border-[#0A355C]">
        {(["7D", "30D", "90D"] as const).map((range) => {
          const isActive = currentRange === range
          return (
            <button
              key={range}
              type="button"
              onClick={() => handleSelectPreset(range)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0A355C] text-white shadow-sm"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {range}
            </button>
          )
        })}

        {/* Custom Calendar Pill */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            currentRange === "Custom"
              ? "bg-[#C7F556] text-[#00152B] font-bold shadow-sm"
              : isOpen
              ? "bg-[#0A355C] text-white"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          <Calendar className={`h-3.5 w-3.5 ${currentRange === "Custom" ? "text-[#00152B]" : "text-[#C7F556]"}`} />
          <span>{getCustomLabel()}</span>
        </button>
      </div>

      {/* Calendar Popover */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-[320px] bg-[#021830] border border-[#0A355C] rounded-2xl p-4 shadow-2xl animate-in zoom-in-95 duration-150">
          {/* Header Month / Year & Navigation */}
          <div className="flex items-center justify-between pb-3 border-b border-[#0A355C]/70">
            <h4 className="text-sm font-semibold text-white">
              {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
            </h4>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevMonth}
                className="h-7 w-7 text-[#94A3B8] hover:text-white hover:bg-[#0A355C] rounded-lg cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextMonth}
                className="h-7 w-7 text-[#94A3B8] hover:text-white hover:bg-[#0A355C] rounded-lg cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center py-2 text-[11px] font-semibold text-[#94A3B8]">
            {DAYS_OF_WEEK.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>

          {/* Selected Date Summary & Actions */}
          <div className="mt-4 pt-3 border-t border-[#0A355C]/70 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8]">Range:</span>
              <span className="font-semibold text-white font-mono">
                {startDate ? formatDateDisplay(startDate) : "Select start"} -{" "}
                {endDate ? formatDateDisplay(endDate) : startDate ? "Select end" : ""}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setStartDate(null)
                  setEndDate(null)
                  setIsOpen(false)
                }}
                className="h-8 px-3 text-xs text-[#94A3B8] hover:text-white hover:bg-[#0A355C] rounded-lg cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleApplyCustom}
                disabled={!startDate}
                className="h-8 px-4 text-xs font-semibold bg-[#C7F556] hover:bg-[#b8e645] text-[#00152B] rounded-lg cursor-pointer disabled:opacity-50"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
