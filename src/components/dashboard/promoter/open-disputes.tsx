"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ConfirmModal } from "@/components/common/confirm-modal"

interface DisputeItem {
  id: string
  name: string
  business: string
  description: string
  time: string
  img: string
}

const initialDisputes: DisputeItem[] = [
  {
    id: "1",
    name: "Tariq Osman",
    business: "FitZone Gym",
    description: "QR scan not registered — customer visited but no credit",
    time: "4h ago",
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "2",
    name: "Jordan Travis",
    business: "Kava Brew",
    description: "Business delayed payout beyond 7-day window",
    time: "1d ago",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  },
]

export function OpenDisputes() {
  const [disputes, setDisputes] = useState<DisputeItem[]>(initialDisputes)
  const [confirmTarget, setConfirmTarget] = useState<{
    item: DisputeItem
    action: "RESOLVE" | "REJECT"
  } | null>(null)

  const handleConfirmAction = () => {
    if (!confirmTarget) return
    setDisputes((prev) => prev.filter((d) => d.id !== confirmTarget.item.id))
    setConfirmTarget(null)
  }

  return (
    <>
      <Card className="bg-[#042850] border-[#0A355C] overflow-hidden mt-6 rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4 pt-5 px-6 border-b border-[#0A355C]">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-[#F87171] animate-pulse"></div>
            <h2 className="text-sm font-semibold text-white">Open Disputes ({disputes.length})</h2>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {disputes.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#94A3B8]">No open disputes found</div>
          ) : (
            <div className="flex flex-col divide-y divide-[#0A355C]/50">
              {disputes.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-[#0A355C]/20 transition-colors"
                >
                  <div className="flex items-start md:items-center gap-4">
                    <Avatar className="h-10 w-10 border border-[#0A355C]">
                      <AvatarImage src={item.img} alt={item.name} />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-white">
                        {item.name} <span className="text-[#94A3B8]">·</span> {item.business}
                      </span>
                      <span className="text-xs text-[#94A3B8] font-normal">{item.description}</span>
                      <span className="text-[10px] text-[#64748B] font-medium">{item.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 md:mt-0">
                    <Button
                      variant="ghost"
                      onClick={() => setConfirmTarget({ item, action: "REJECT" })}
                      className="h-9 px-5 text-xs text-[#F87171] border border-[#0A355C] bg-transparent hover:bg-[#F87171]/10 rounded-xl cursor-pointer transition-colors"
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => setConfirmTarget({ item, action: "RESOLVE" })}
                      className="h-9 px-5 text-xs font-semibold text-[#00152B] bg-[#C7F556] hover:bg-[#b8eb42] rounded-xl cursor-pointer transition-colors shadow-sm"
                    >
                      Pay & Resolve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Modal for Disputes */}
      <ConfirmModal
        isOpen={!!confirmTarget}
        onClose={() => setConfirmTarget(null)}
        onConfirm={handleConfirmAction}
        title={confirmTarget?.action === "RESOLVE" ? "Resolve Dispute" : "Reject Dispute"}
        description={
          confirmTarget?.action === "RESOLVE"
            ? `Are you sure you want to approve payout and resolve dispute for ${confirmTarget.item.name}?`
            : `Are you sure you want to reject the dispute for ${confirmTarget?.item.name}?`
        }
        confirmText={confirmTarget?.action === "RESOLVE" ? "Pay & Resolve" : "Reject Dispute"}
        cancelText="Cancel"
        variant={confirmTarget?.action === "REJECT" ? "destructive" : "success"}
      />
    </>
  )
}
