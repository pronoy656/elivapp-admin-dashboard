"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown } from "lucide-react"

interface FunnelStage {
  label: string
  value: number
  percentage: string
  width: string
  barColor: string
  dropOff?: string
}

const funnelData: FunnelStage[] = [
  {
    label: "Links shared",
    value: 534,
    percentage: "100%",
    width: "100%",
    barColor: "bg-[#C7F556]",
  },
  {
    label: "Customer pages opened",
    value: 389,
    percentage: "72.8%",
    width: "72.8%",
    barColor: "bg-[#C7F556]",
    dropOff: "-27.2% drop-off",
  },
  {
    label: "QR codes generated",
    value: 271,
    percentage: "50.7%",
    width: "50.7%",
    barColor: "bg-[#C7F556]",
    dropOff: "-22.1% drop-off",
  },
  {
    label: "QR scanned by business",
    value: 182,
    percentage: "34.1%",
    width: "34.1%",
    barColor: "bg-[#34D399]",
    dropOff: "-16.6% drop-off",
  },
  {
    label: "Reward confirmed",
    value: 142,
    percentage: "26.6%",
    width: "26.6%",
    barColor: "bg-[#34D399]",
    dropOff: "-7.5% drop-off",
  },
]

export function ReferralConversionFunnel() {
  return (
    <Card className="bg-[#042850] border-[#0A355C] rounded-2xl p-6 shadow-sm">
      <CardHeader className="p-0 pb-6">
        <CardTitle className="text-sm font-semibold text-white tracking-wide">
          Referral Conversion Funnel
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex flex-col gap-3.5">
        {funnelData.map((item, i) => (
          <div key={i} className="flex flex-col">
            {/* Red Drop-off Indicator */}
            {item.dropOff && (
              <div className="flex items-center gap-1.5 pl-[185px] py-1 text-[11px] font-medium text-[#F87171]">
                <TrendingDown className="h-3 w-3 shrink-0" />
                <span>{item.dropOff}</span>
              </div>
            )}

            {/* Stage Row */}
            <div className="flex items-center gap-4">
              {/* Stage Label */}
              <div className="w-[180px] shrink-0 text-xs text-[#94A3B8] font-medium">
                {item.label}
              </div>

              {/* Progress Track & Fill Bar */}
              <div className="flex-1 h-2.5 bg-[#00152B] border border-[#0A355C]/60 rounded-full overflow-hidden flex">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${item.barColor}`}
                  style={{ width: item.width }}
                />
              </div>

              {/* Stage Value & Percentage */}
              <div className="w-[90px] shrink-0 flex items-center justify-end gap-2.5 text-xs">
                <span className="font-bold text-white text-sm">{item.value}</span>
                <span className="text-[#64748B] font-medium w-11 text-right">{item.percentage}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
