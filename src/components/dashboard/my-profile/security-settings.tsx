"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Shield, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  return (
    <Card className="bg-[#042850] border-[#0A355C] w-full">
      <CardContent className="p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#0A355C]">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded bg-[#C7F556]/10 border border-[#C7F556]/30">
              <Lock className="h-4 w-4 text-[#C7F556]" />
            </div>
            <h2 className="text-base font-semibold text-white">Security</h2>
          </div>
          <Dialog>
            <DialogTrigger render={
              <Button variant="outline" className="border-[#0A355C] text-[#C7F556] hover:bg-[#C7F556]/10 hover:border-[#C7F556] hover:text-[#C7F556] font-medium rounded-lg h-9">
                Change Password
              </Button>
            } />
            <DialogContent className="bg-[#042850] border-[#0A355C] max-w-xl sm:max-w-xl p-8 rounded-2xl gap-6" showCloseButton={false}>
              <DialogTitle className="sr-only">Change Password</DialogTitle>
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#0A355C]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded bg-[#C7F556]/10 border border-[#C7F556]/30">
                    <Lock className="h-4 w-4 text-[#C7F556]" />
                  </div>
                  <h2 className="text-base font-semibold text-white">Security</h2>
                </div>
                <DialogClose render={
                  <Button variant="outline" className="border-[#0A355C] text-[#C7F556] hover:bg-[#0A355C] hover:text-[#C7F556] font-medium rounded-lg h-9 px-4">
                    Cancel
                  </Button>
                } />
              </div>

              {/* Password Fields */}
              <div className="flex flex-col gap-5 border border-[#0A355C] rounded-xl p-6 bg-transparent">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Current Password</label>
                  <div className="relative">
                    <Input type="password" defaultValue="••••••••" className="bg-[#00152B] border-[#0A355C] text-white focus-visible:ring-[#C7F556] h-12 pr-10" />
                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C7C9E] cursor-pointer hover:text-white transition-colors" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">New Password</label>
                  <div className="relative">
                    <Input type="password" defaultValue="••••••••" className="bg-[#00152B] border-[#0A355C] text-white focus-visible:ring-[#C7F556] h-12 pr-10" />
                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C7C9E] cursor-pointer hover:text-white transition-colors" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <Input type="password" defaultValue="••••••••" className="bg-[#00152B] border-[#0A355C] text-white focus-visible:ring-[#C7F556] h-12 pr-10" />
                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C7C9E] cursor-pointer hover:text-white transition-colors" />
                  </div>
                </div>
                
                <Button className="w-full bg-[#C7F556] text-[#00152B] hover:bg-[#bce65c] font-semibold rounded-lg h-12 mt-2">
                  Update Password
                </Button>
              </div>

            </DialogContent>
          </Dialog>
        </div>

        {/* Two-Factor Authentication Row */}
        <div className="flex items-center justify-between bg-transparent border border-[#0A355C] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#C7F556]/10">
              <Shield className="h-5 w-5 text-[#C7F556]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Two-Factor Authentication</span>
              <span className="text-xs text-[#5C7C9E] font-medium mt-0.5">Secure your account with a verification code on every login</span>
            </div>
          </div>
          <button 
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`flex items-center w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out border ${twoFactorEnabled ? 'bg-[#C7F556] border-[#C7F556]' : 'bg-[#042850] border-[#0A355C]'}`}
          >
            <div className={`h-full aspect-square rounded-full transition-transform duration-200 ease-in-out ${twoFactorEnabled ? 'translate-x-5 bg-[#00152B]' : 'translate-x-0 bg-white'}`}></div>
          </button>
        </div>

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col justify-center gap-1.5 bg-transparent border border-[#0A355C] rounded-xl p-5 shadow-sm">
            <span className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Last Sign In</span>
            <span className="text-sm font-semibold text-white">Today, 9:14 AM</span>
          </div>
          <div className="flex flex-col justify-center gap-1.5 bg-transparent border border-[#0A355C] rounded-xl p-5 shadow-sm">
            <span className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Account Created</span>
            <span className="text-sm font-semibold text-white">Mar 15, 2024</span>
          </div>
          <div className="flex flex-col justify-center gap-1.5 bg-transparent border border-[#0A355C] rounded-xl p-5 shadow-sm">
            <span className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Sessions Active</span>
            <span className="text-sm font-semibold text-white">1 device</span>
          </div>
          <div className="flex flex-col justify-center gap-1.5 bg-transparent border border-[#0A355C] rounded-xl p-5 shadow-sm">
            <span className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Role</span>
            <span className="text-sm font-semibold text-white">Super Admin</span>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
