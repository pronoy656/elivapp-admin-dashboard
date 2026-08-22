import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const funnelData = [
  { label: "Links shared", value: 534, percentage: "100%", width: "100%" },
  { label: "Customer pages opened", value: 389, percentage: "72.8%", width: "72.8%" },
  { label: "QR codes generated", value: 271, percentage: "50.7%", width: "50.7%" },
  { label: "QR scanned by business", value: 182, percentage: "34.1%", width: "34.1%" },
  { label: "Reward confirmed (paid)", value: 142, percentage: "26.6%", width: "26.6%" },
]

export function ReferralConversionFunnel() {
  return (
    <Card className="bg-[#042850] border-[#0A355C]">
      <CardHeader className="pb-6">
        <CardTitle className="text-sm font-medium text-white">Referral Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {funnelData.map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="w-[180px] shrink-0 text-xs text-[#94A3B8]">
              {item.label}
            </div>
            
            <div className="flex-1 h-2 bg-[#0A355C] rounded-full overflow-hidden flex">
              <div 
                className={`h-full rounded-full ${item.value < 150 ? 'bg-[#4ADE80]' : item.value < 200 ? 'bg-[#34D399]' : 'bg-[#C7F556]'}`}
                style={{ width: item.width }}
              />
            </div>
            
            <div className="w-[80px] shrink-0 flex items-center justify-end gap-2 text-xs">
              <span className="font-semibold text-white">{item.value}</span>
              <span className="text-[#94A3B8] font-medium w-10 text-right">{item.percentage}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
