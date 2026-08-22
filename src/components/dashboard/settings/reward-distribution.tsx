"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

const presets = [5, 10, 15, 20, 25, 30, 40]

export function RewardDistribution() {
  const [platformCut, setPlatformCut] = useState(14)
  
  const promoterEarns = 100 - platformCut
  const exampleReward = 40
  const platformAmount = (exampleReward * (platformCut / 100)).toFixed(2)
  const promoterAmount = (exampleReward * (promoterEarns / 100)).toFixed(2)

  const handleDecrease = () => {
    setPlatformCut((prev) => Math.max(5, prev - 1))
  }

  const handleIncrease = () => {
    setPlatformCut((prev) => Math.min(40, prev + 1))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    if (isNaN(val)) {
      setPlatformCut(5)
    } else {
      setPlatformCut(Math.min(40, Math.max(5, val)))
    }
  }

  return (
    <Card className="bg-[#042850] border-[#0A355C] h-full flex flex-col rounded-2xl">
      <CardHeader className="pb-2 pt-6 px-6">
        <CardTitle className="text-sm font-semibold text-white">Reward Distribution</CardTitle>
        <p className="text-xs text-[#94A3B8] mt-1">Set how much of each business reward goes to the promoter vs. elivapp</p>
      </CardHeader>
      
      <CardContent className="p-6 flex flex-col flex-1 gap-6">
        {/* Main Controls & Stepper */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#00152B] border border-[#0A355C] p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#94A3B8]">Platform cut:</span>
            
            {/* Stepper Controls */}
            <div className="flex items-center gap-1.5 bg-[#042850] border border-[#0A355C] p-1 rounded-xl">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleDecrease}
                disabled={platformCut <= 5}
                className="h-8 w-8 text-white hover:bg-[#0A355C] disabled:opacity-30 rounded-lg cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              
              <div className="flex items-center px-1">
                <input
                  type="number"
                  min={5}
                  max={40}
                  value={platformCut}
                  onChange={handleInputChange}
                  className="w-12 bg-transparent text-center text-sm font-bold text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-sm font-bold text-white pr-1">%</span>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleIncrease}
                disabled={platformCut >= 40}
                className="h-8 w-8 text-white hover:bg-[#0A355C] disabled:opacity-30 rounded-lg cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#94A3B8]">Promoter earns:</span>
            <span className="text-base font-bold text-[#C7F556] bg-[#C7F556]/15 px-3 py-1 rounded-lg">
              {promoterEarns}%
            </span>
          </div>
        </div>

        {/* Quick Select Presets */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Quick Presets</span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => {
              const isSelected = platformCut === preset
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setPlatformCut(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#C7F556] text-[#00152B] shadow-sm scale-105"
                      : "bg-[#00152B] text-[#94A3B8] hover:text-white border border-[#0A355C] hover:border-[#C7F556]/50"
                  }`}
                >
                  {preset}%
                </button>
              )
            })}
          </div>
        </div>

        {/* Custom Visual Slider Bar */}
        <div className="flex flex-col gap-2 py-1">
          <div className="relative w-full h-7 flex items-center">
            {/* Background Track */}
            <div className="absolute inset-x-0 h-3 bg-[#00152B] border border-[#0A355C] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#C7F556] rounded-full transition-all duration-100"
                style={{ width: `${((platformCut - 5) / (40 - 5)) * 100}%` }}
              />
            </div>

            {/* Native Invisible Controller Input */}
            <input
              type="range"
              min="5"
              max="40"
              value={platformCut}
              onChange={(e) => setPlatformCut(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />

            {/* Custom Centered Glowing Thumb Handle */}
            <div
              className="absolute z-10 w-6 h-6 bg-white border-2 border-[#C7F556] rounded-full shadow-[0_0_12px_rgba(199,245,86,0.7)] pointer-events-none transition-all duration-100 -translate-x-1/2 flex items-center justify-center"
              style={{ left: `${((platformCut - 5) / (40 - 5)) * 100}%` }}
            >
              <div className="w-2 h-2 rounded-full bg-[#042850]" />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-[#94A3B8] font-medium px-0.5">
            <span>5% (min)</span>
            <span>40% (max)</span>
          </div>
        </div>

        {/* Live Example Cards */}
        <div>
          <p className="text-xs font-semibold text-[#94A3B8] mb-3">Example: Business sets ${exampleReward} reward →</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#00152B] border border-[#0A355C] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Business sets</span>
              <span className="text-lg font-bold text-white">${exampleReward.toFixed(2)}</span>
            </div>
            <div className="bg-[#00152B] border border-[#0A355C] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Platform ({platformCut}%)</span>
              <span className="text-lg font-bold text-[#C7F556] transition-all">${platformAmount}</span>
            </div>
            <div className="bg-[#00152B] border border-[#0A355C] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Promoter ({promoterEarns}%)</span>
              <span className="text-lg font-bold text-[#C7F556] transition-all">${promoterAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-4 mt-auto pt-2">
          <Button
            variant="ghost"
            onClick={() => setPlatformCut(14)}
            className="h-11 px-6 text-xs font-semibold text-[#94A3B8] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-white rounded-xl cursor-pointer"
          >
            Reset
          </Button>
          <Button className="h-11 flex-1 text-sm font-semibold text-[#00152B] bg-[#C7F556] hover:bg-[#bce65c] rounded-xl shadow-sm cursor-pointer">
            Save Config
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
