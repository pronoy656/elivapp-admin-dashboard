"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, CartesianGrid } from "recharts"

const chartData = [
  { name: 'Feb', referrals: 400, conversions: 240, revenue: 2400 },
  { name: 'Mar', referrals: 450, conversions: 280, revenue: 2800 },
  { name: 'Apr', referrals: 420, conversions: 290, revenue: 2900 },
  { name: 'May', referrals: 580, conversions: 350, revenue: 3800 },
  { name: 'Jun', referrals: 720, conversions: 480, revenue: 5200 },
  { name: 'Jul', referrals: 890, conversions: 610, revenue: 7800 },
]

export function ReferralActivityChart() {
  return (
    <Card className="bg-[#042850] border-[#0A355C]">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8">
        <div>
          <CardTitle className="text-lg font-medium text-white mb-1">Referral Activity</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Last 30 days</CardDescription>
        </div>
        <div className="flex items-center bg-[#00152B] p-1 rounded-lg">
          <Button variant="ghost" size="sm" className="bg-[#0A355C] text-white rounded-md h-8 text-xs px-4">Referrals</Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white rounded-md h-8 text-xs px-4">Conversions</Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white rounded-md h-8 text-xs px-4">Revenue</Button>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReferrals" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D7FE7C" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D7FE7C" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0A355C" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              dy={10}
            />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: '#00152B', borderColor: '#0A355C', borderRadius: '8px' }}
              itemStyle={{ color: '#D7FE7C' }}
            />
            <Area 
              type="natural" 
              dataKey="referrals" 
              stroke="#D7FE7C" 
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorReferrals)"
              activeDot={{ r: 6, fill: '#00152B', stroke: '#D7FE7C', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
