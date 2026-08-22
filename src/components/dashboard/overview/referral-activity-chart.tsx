"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, CartesianGrid } from "recharts"

type MetricType = "referrals" | "conversions" | "revenue"

const chartData = [
  { name: 'Feb', referrals: 400, conversions: 240, revenue: 2400 },
  { name: 'Mar', referrals: 450, conversions: 280, revenue: 2800 },
  { name: 'Apr', referrals: 420, conversions: 290, revenue: 2900 },
  { name: 'May', referrals: 580, conversions: 350, revenue: 3800 },
  { name: 'Jun', referrals: 720, conversions: 480, revenue: 5200 },
  { name: 'Jul', referrals: 890, conversions: 610, revenue: 7800 },
]

const metricConfig: Record<MetricType, { label: string; stroke: string; stopColor: string }> = {
  referrals: { label: "Referrals", stroke: "#D7FE7C", stopColor: "#D7FE7C" },
  conversions: { label: "Conversions", stroke: "#34D399", stopColor: "#34D399" },
  revenue: { label: "Revenue ($)", stroke: "#A855F7", stopColor: "#A855F7" },
}

export function ReferralActivityChart() {
  const [activeMetric, setActiveMetric] = useState<MetricType>("referrals")

  const currentConfig = metricConfig[activeMetric]

  return (
    <Card className="bg-[#042850] border-[#0A355C] rounded-2xl">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8">
        <div>
          <CardTitle className="text-lg font-medium text-white mb-1">Referral Activity</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Last 30 days breakdown</CardDescription>
        </div>
        <div className="flex items-center bg-[#00152B] p-1.5 rounded-xl border border-[#0A355C]">
          {(["referrals", "conversions", "revenue"] as MetricType[]).map((metric) => {
            const isActive = activeMetric === metric
            return (
              <Button
                key={metric}
                variant="ghost"
                size="sm"
                onClick={() => setActiveMetric(metric)}
                className={`rounded-lg h-8 text-xs px-4 font-semibold transition-all cursor-pointer capitalize ${
                  isActive
                    ? "bg-[#0A355C] text-white shadow-sm"
                    : "text-muted-foreground hover:text-white hover:bg-[#0A355C]/40"
                }`}
              >
                {metric}
              </Button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentConfig.stopColor} stopOpacity={0.35} />
                <stop offset="95%" stopColor={currentConfig.stopColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0A355C" opacity={0.4} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              dy={10}
            />
            <RechartsTooltip
              contentStyle={{ backgroundColor: '#00152B', borderColor: '#0A355C', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: currentConfig.stroke }}
              formatter={(val: any) => [
                activeMetric === "revenue" ? `$${Number(val).toLocaleString()}` : val,
                currentConfig.label
              ]}
            />
            <Area
              type="natural"
              dataKey={activeMetric}
              stroke={currentConfig.stroke}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorMetric)"
              activeDot={{ r: 6, fill: '#00152B', stroke: currentConfig.stroke, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
