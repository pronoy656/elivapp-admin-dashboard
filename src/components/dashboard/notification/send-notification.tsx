"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { ConfirmModal } from "@/components/common/confirm-modal"

type TargetAudience = "All" | "Promoters" | "Businesses"

export function SendNotification() {
  const [target, setTarget] = useState<TargetAudience>("All")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const isSendDisabled = title.trim() === "" || message.trim() === ""
  const getReachText = () => {
    switch(target) {
      case "All": return "Reaches 2,841 all on elivapp"
      case "Promoters": return "Reaches 2,056 promoters"
      case "Businesses": return "Reaches 785 businesses"
    }
  }

  const handleSendConfirm = () => {
    setIsConfirmOpen(false)
    setIsSuccess(true)
    setTitle("")
    setMessage("")
    setTimeout(() => setIsSuccess(false), 4000)
  }

  return (
    <>
      <Card className="bg-[#042850] border-[#0A355C] h-fit rounded-2xl">
        <CardHeader className="pb-4 pt-5 px-6">
          <CardTitle className="text-sm font-semibold text-white">Send Push Notification</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 px-6 pb-6 pt-0">
          
          {isSuccess && (
            <div className="bg-[#34D399]/15 border border-[#34D399]/40 text-[#34D399] p-3.5 rounded-xl text-xs font-semibold animate-in fade-in">
              ✓ Notification sent successfully to {target}!
            </div>
          )}

          {/* Target Audience */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Target Audience</label>
            <div className="flex p-1.5 bg-[#00152B] border border-[#0A355C] rounded-xl relative">
              {(["All", "Promoters", "Businesses"] as TargetAudience[]).map((type) => {
                const isActive = target === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTarget(type)}
                    className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-all duration-200 z-10 cursor-pointer ${
                      isActive 
                        ? "bg-[#C7F556] text-[#00152B] shadow-md" 
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                )
              })}
            </div>
            <p className="text-[11px] text-[#94A3B8] mt-1">{getReachText()}</p>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Title</label>
            <Input 
              type="text" 
              placeholder="e.g. Weekend bonus is live!" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 bg-[#00152B] border-[#0A355C] text-white placeholder:text-[#94A3B8] focus-visible:ring-1 focus-visible:ring-[#C7F556] rounded-xl text-xs"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Message</label>
            <textarea 
              placeholder="Write the notification message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] bg-[#00152B] border-[#0A355C] text-white text-xs placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7F556] rounded-xl p-3 resize-none border"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button 
              type="button"
              variant="ghost" 
              onClick={() => { setTitle(""); setMessage(""); }}
              className="h-10 px-6 text-xs text-[#94A3B8] border border-[#0A355C] bg-transparent hover:bg-[#0A355C] hover:text-white rounded-xl cursor-pointer"
            >
              Clear
            </Button>
            <Button 
              type="button"
              disabled={isSendDisabled}
              onClick={() => setIsConfirmOpen(true)}
              className={`h-10 flex-1 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                isSendDisabled 
                  ? "bg-[#0A355C] text-[#94A3B8] opacity-50 cursor-not-allowed" 
                  : "text-[#00152B] bg-[#C7F556] hover:bg-[#bce65c] shadow-sm"
              }`}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Now
            </Button>
          </div>

        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleSendConfirm}
        title="Send Notification"
        description={`Are you sure you want to broadcast "${title}" to ${target} (${getReachText()})?`}
        confirmText="Send Notification"
        cancelText="Cancel"
        variant="success"
      />
    </>
  )
}
