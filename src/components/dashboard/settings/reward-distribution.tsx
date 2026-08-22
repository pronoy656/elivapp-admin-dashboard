"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RewardDistribution() {
  const [platformCut, setPlatformCut] = useState(15)
  
  const promoterEarns = 100 - platformCut
  const exampleReward = 40
  const platformAmount = (exampleReward * (platformCut / 100)).toFixed(2)
  const promoterAmount = (exampleReward * (promoterEarns / 100)).toFixed(2)

  return (
    <Card className="bg-[#042850] border-[#0A355C] h-full flex flex-col">
      <CardHeader className="pb-2 pt-6 px-6">
        <CardTitle className="text-sm font-semibold text-white">Reward Distribution</CardTitle>
        <p className="text-xs text-[#94A3B8] mt-1">Set how much of each business reward goes to the promoter vs. elivapp</p>
      </CardHeader>
      
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-center text-sm font-medium mb-6">
          <span className="text-[#94A3B8]">Platform cut: <span className="text-white">{platformCut}%</span></span>
          <span className="text-[#94A3B8]">Promoter earns: <span className="text-[#C7F556]">{promoterEarns}%</span></span>
        </div>

        <div className="relative mb-6 group py-4">
          <div className="absolute inset-x-0 bg-[#00152B] rounded-full h-2 top-1/2 -translate-y-1/2 overflow-hidden border border-[#0A355C]">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-[#C7F556]"
              style={{ width: `${((platformCut - 5) / (40 - 5)) * 100}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="5"
            max="40"
            value={platformCut}
            onChange={(e) => setPlatformCut(Number(e.target.value))}
            className="w-full h-2 appearance-none bg-transparent relative z-10 cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
          <div className="flex justify-between items-center text-xs text-[#94A3B8] font-medium mt-3 px-1">
            <span>5% (min)</span>
            <span>40% (max)</span>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold text-[#94A3B8] mb-3">Example: Business sets ${exampleReward} reward →</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#00152B] border border-[#0A355C] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Business sets</span>
              <span className="text-lg font-bold text-white">${exampleReward.toFixed(2)}</span>
            </div>
            <div className="flex-1 bg-[#00152B] border border-[#0A355C] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Platform ({platformCut}%)</span>
              <span className="text-lg font-bold text-[#C7F556] transition-all">${platformAmount}</span>
            </div>
            <div className="flex-1 bg-[#00152B] border border-[#0A355C] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1">Promoter ({promoterEarns}%)</span>
              <span className="text-lg font-bold text-[#C7F556] transition-all">${promoterAmount}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-auto">
          <Button variant="ghost" onClick={() => setPlatformCut(15)} className="h-10 px-6 text-xs text-[#94A3B8] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-white rounded-lg">
            Reset
          </Button>
          <Button className="h-10 flex-1 text-sm font-semibold text-[#00152B] bg-[#C7F556] hover:bg-[#bce65c] rounded-lg">
            Save Config
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
