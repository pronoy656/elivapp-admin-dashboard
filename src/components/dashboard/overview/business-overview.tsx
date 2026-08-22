"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Building2, Target, BarChart2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts"
import { ConfirmModal } from "@/components/common/confirm-modal"
import { EditBusinessModal, EditBusinessData } from "@/components/common/edit-business-modal"

const chartData = [
  { name: "Jul 29", redemptions: 48, sales: 1850 },
  { name: "Aug 1", redemptions: 58, sales: 2400 },
  { name: "Aug 4", redemptions: 96, sales: 4250 },
  { name: "Aug 7", redemptions: 52, sales: 2100 },
  { name: "Aug 10", redemptions: 62, sales: 2800 },
]

interface BusinessItem {
  id: string
  name: string
  category: string
  redemptions: string
  totalLinks: string
  revenue: string
  convRate: string
  rewardSale: string
  promoters: number
  status: "ACTIVE" | "SUSPENDED"
  img: string
}

const initialBusinessData: BusinessItem[] = [
  {
    id: "1",
    name: "FitZone Gym",
    category: "Fitness",
    redemptions: "94",
    totalLinks: "128 links",
    revenue: "$3,760",
    convRate: "73%",
    rewardSale: "$40",
    promoters: 21,
    status: "ACTIVE",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "2",
    name: "TacoFusion",
    category: "Food",
    redemptions: "187",
    totalLinks: "215 links",
    revenue: "$3,740",
    convRate: "87%",
    rewardSale: "$20",
    promoters: 34,
    status: "ACTIVE",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "3",
    name: "Luna Spa",
    category: "Wellness",
    redemptions: "61",
    totalLinks: "83 links",
    revenue: "$1,830",
    convRate: "73%",
    rewardSale: "$30",
    promoters: 8,
    status: "ACTIVE",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "4",
    name: "Kava Brew",
    category: "Café",
    redemptions: "38",
    totalLinks: "47 links",
    revenue: "$950",
    convRate: "81%",
    rewardSale: "$25",
    promoters: 12,
    status: "ACTIVE",
    img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "5",
    name: "CloudCuts",
    category: "Salon",
    redemptions: "44",
    totalLinks: "61 links",
    revenue: "$660",
    convRate: "72%",
    rewardSale: "$15",
    promoters: 5,
    status: "SUSPENDED",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop&crop=faces",
  },
]

export function BusinessOverview() {
  const [businesses, setBusinesses] = useState<BusinessItem[]>(initialBusinessData)
  
  // Modals state
  const [editingBusiness, setEditingBusiness] = useState<BusinessItem | null>(null)
  const [confirmTarget, setConfirmTarget] = useState<{
    row: BusinessItem
    action: "SUSPEND" | "ACTIVATE"
  } | null>(null)

  const handleSaveEdit = (updated: EditBusinessData) => {
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === updated.id
          ? {
              ...b,
              name: updated.name,
              category: updated.category,
              rewardSale: updated.reward,
              status: updated.status,
            }
          : b
      )
    )
    setEditingBusiness(null)
  }

  const handleConfirmStatusChange = () => {
    if (!confirmTarget) return
    const { row, action } = confirmTarget
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === row.id
          ? { ...b, status: action === "SUSPEND" ? "SUSPENDED" : "ACTIVE" }
          : b
      )
    )
    setConfirmTarget(null)
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 4 Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Revenue Paid */}
        <Card className="bg-[#042850] border-[#0A355C] text-white p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#0A355C]/50 rounded-xl text-[#C7F556]">
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#10B981]/20 text-[#10B981]">
              <span className="text-[10px]">↗</span> +12.4%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white tracking-tight mb-1">$10,940</h3>
            <p className="text-xs text-[#94A3B8] font-medium">Total Revenue Paid</p>
          </div>
        </Card>

        {/* Card 2: Active Businesses */}
        <Card className="bg-[#042850] border-[#0A355C] text-white p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#0A355C]/50 rounded-xl text-[#C7F556]">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#10B981]/20 text-[#10B981]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Live
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white tracking-tight mb-1">
              {businesses.filter((b) => b.status === "ACTIVE").length}
            </h3>
            <p className="text-xs text-[#94A3B8] font-medium">Active Businesses</p>
          </div>
        </Card>

        {/* Card 3: Avg Conversion Rate */}
        <Card className="bg-[#042850] border-[#0A355C] text-white p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#0A355C]/50 rounded-xl text-[#C7F556]">
              <Target className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#10B981]/20 text-[#10B981]">
              <span className="text-[10px]">↗</span> +3.2%
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white tracking-tight mb-1">79%</h3>
            <p className="text-xs text-[#94A3B8] font-medium">Avg Conversion Rate</p>
          </div>
        </Card>

        {/* Card 4: Total Campaigns */}
        <Card className="bg-[#042850] border-[#0A355C] text-white p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#0A355C]/50 rounded-xl text-[#C7F556]">
              <BarChart2 className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#10B981]/20 text-[#10B981]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Active
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white tracking-tight mb-1">6</h3>
            <p className="text-xs text-[#94A3B8] font-medium">Total Campaigns</p>
          </div>
        </Card>
      </div>

      {/* Chart: Redemptions & Sales Over Time */}
      <Card className="bg-[#042850] border-[#0A355C] p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-white">Redemptions & Sales Over Time</h2>
            <div className="flex items-center gap-4 text-xs mt-1">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#A855F7]" />
                <span className="text-[#94A3B8]">Redemptions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                <span className="text-[#94A3B8]">Sales ($)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRedemptions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0A355C" opacity={0.4} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 11 }}
                dy={10}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 11 }}
                domain={[0, 120]}
                ticks={[0, 30, 60, 90, 120]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 11 }}
                domain={[0, 5000]}
                ticks={[0, 2000, 3000, 5000]}
                tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000}K`)}
              />
              <RechartsTooltip
                contentStyle={{ backgroundColor: '#00152B', borderColor: '#0A355C', borderRadius: '12px', color: '#fff' }}
                formatter={(value: any, name: any) => [
                  name === "sales" || name === "Sales ($)" ? `$${Number(value).toLocaleString()}` : value,
                  name === "sales" ? "Sales ($)" : name === "redemptions" ? "Redemptions" : name
                ]}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="redemptions"
                name="Redemptions"
                stroke="#A855F7"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRedemptions)"
                dot={{ r: 4, fill: "#A855F7", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#A855F7" }}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="sales"
                name="Sales ($)"
                stroke="#10B981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSales)"
                dot={{ r: 4, fill: "#10B981", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#10B981" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Business Activity Breakdown Table */}
      <Card className="bg-[#042850] border-[#0A355C] p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-white">Business Activity Breakdown</h2>
            <p className="text-xs text-[#94A3B8]">Redemptions, sales revenue, and promoter activity per business</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#0A355C]/80 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                <th className="py-3 px-4">BUSINESS</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">REDEMPTIONS</th>
                <th className="py-3 px-4">SALES REVENUE</th>
                <th className="py-3 px-4">CONV. RATE</th>
                <th className="py-3 px-4">REWARD/SALE</th>
                <th className="py-3 px-4">PROMOTERS</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0A355C]/40">
              {businesses.map((item) => (
                <tr key={item.id} className="hover:bg-[#0A355C]/30 transition-colors">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <Avatar className="h-9 w-9 rounded-full border border-[#0A355C]">
                      <AvatarImage src={item.img} alt={item.name} />
                      <AvatarFallback>{item.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-white text-sm">{item.name}</span>
                  </td>
                  <td className="py-4 px-4 text-[#94A3B8] text-xs font-medium">{item.category}</td>
                  <td className="py-4 px-4 text-xs">
                    <span className="font-bold text-white text-sm">{item.redemptions}</span>
                    <span className="text-[#64748B] ml-1.5 font-normal">/ {item.totalLinks}</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-white text-sm">{item.revenue}</td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-[#10B981]/20 text-[#10B981]">
                      {item.convRate}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white text-xs font-medium">{item.rewardSale}</td>
                  <td className="py-4 px-4 text-white text-xs font-medium">{item.promoters}</td>
                  <td className="py-4 px-4">
                    {item.status === "ACTIVE" ? (
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider bg-[#10B981]/20 text-[#10B981]">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider bg-[#EF4444]/20 text-[#EF4444]">
                        SUSPENDED
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingBusiness(item)}
                        className="h-7 px-3 text-xs font-medium text-[#CBD5E1] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-white rounded-lg cursor-pointer transition-colors"
                      >
                        Edit
                      </Button>
                      {item.status === "ACTIVE" ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setConfirmTarget({ row: item, action: "SUSPEND" })}
                          className="h-7 px-3 text-xs font-medium text-[#F87171] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#F87171] rounded-lg cursor-pointer transition-colors"
                        >
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setConfirmTarget({ row: item, action: "ACTIVATE" })}
                          className="h-7 px-3 text-xs font-medium text-[#34D399] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-[#34D399] rounded-lg cursor-pointer transition-colors"
                        >
                          Activate
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Modal */}
      <EditBusinessModal
        isOpen={!!editingBusiness}
        onClose={() => setEditingBusiness(null)}
        onSave={handleSaveEdit}
        business={
          editingBusiness
            ? {
                id: editingBusiness.id,
                name: editingBusiness.name,
                category: editingBusiness.category,
                reward: editingBusiness.rewardSale,
                status: editingBusiness.status,
              }
            : null
        }
      />

      {/* Action Confirm Modal */}
      <ConfirmModal
        isOpen={!!confirmTarget}
        onClose={() => setConfirmTarget(null)}
        onConfirm={handleConfirmStatusChange}
        title={confirmTarget?.action === "SUSPEND" ? "Confirm Suspend" : "Confirm Activation"}
        description={
          confirmTarget?.action === "SUSPEND"
            ? `Are you sure you want to suspend ${confirmTarget.row.name}?`
            : `Are you sure you want to reactivate ${confirmTarget?.row.name}?`
        }
        confirmText={confirmTarget?.action === "SUSPEND" ? "Suspend Business" : "Activate Business"}
        cancelText="Cancel"
        variant={confirmTarget?.action === "SUSPEND" ? "destructive" : "success"}
      />
    </div>
  )
}
