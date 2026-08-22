"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Map, Shield, BadgeCheck, Wrench } from "lucide-react"

export function PlatformFeatures() {
  const [features, setFeatures] = useState({
    maps: true,
    moderation: true,
    autoApprove: false,
    maintenance: false,
  })

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Card className="bg-[#042850] border-[#0A355C] h-full flex flex-col">
      <CardHeader className="pb-2 pt-6 px-6">
        <CardTitle className="text-sm font-semibold text-white">Platform Features</CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 flex flex-col gap-3">
        {/* Google Maps API */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#00152B] border border-[#0A355C]">
          <div className="flex items-center gap-4">
            <Map className="h-6 w-6 text-[#C7F556]" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Google Maps API</span>
              <span className="text-xs text-[#5C7C9E] font-medium">Location-based business discovery on promoter Discover tab</span>
            </div>
          </div>
          <button 
            onClick={() => toggleFeature('maps')}
            className={`flex items-center w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out border ${features.maps ? 'bg-[#C7F556] border-[#C7F556]' : 'bg-[#042850] border-[#0A355C]'}`}
          >
            <div className={`h-full aspect-square rounded-full transition-transform duration-200 ease-in-out ${features.maps ? 'translate-x-5 bg-[#00152B]' : 'translate-x-0 bg-[#94A3B8]'}`}></div>
          </button>
        </div>

        {/* Feed Moderation */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#00152B] border border-[#0A355C]">
          <div className="flex items-center gap-4">
            <Shield className="h-6 w-6 text-[#C7F556]" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Feed Moderation</span>
              <span className="text-xs text-[#5C7C9E] font-medium">Auto-flag suspicious posts in promoter social feed</span>
            </div>
          </div>
          <button 
            onClick={() => toggleFeature('moderation')}
            className={`flex items-center w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out border ${features.moderation ? 'bg-[#C7F556] border-[#C7F556]' : 'bg-[#042850] border-[#0A355C]'}`}
          >
            <div className={`h-full aspect-square rounded-full transition-transform duration-200 ease-in-out ${features.moderation ? 'translate-x-5 bg-[#00152B]' : 'translate-x-0 bg-[#94A3B8]'}`}></div>
          </button>
        </div>

        {/* Auto-approve Businesses */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#00152B] border border-[#0A355C]">
          <div className="flex items-center gap-4">
            <BadgeCheck className="h-6 w-6 text-[#C7F556]" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Auto-approve Businesses</span>
              <span className="text-xs text-[#5C7C9E] font-medium">Skip the approval queue for verified accounts</span>
            </div>
          </div>
          <button 
            onClick={() => toggleFeature('autoApprove')}
            className={`flex items-center w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out border ${features.autoApprove ? 'bg-[#C7F556] border-[#C7F556]' : 'bg-[#042850] border-[#0A355C]'}`}
          >
            <div className={`h-full aspect-square rounded-full transition-transform duration-200 ease-in-out ${features.autoApprove ? 'translate-x-5 bg-[#00152B]' : 'translate-x-0 bg-white'}`}></div>
          </button>
        </div>

        {/* Maintenance Mode */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#00152B] border border-[#0A355C]">
          <div className="flex items-center gap-4">
            <Wrench className="h-6 w-6 text-[#C7F556]" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Maintenance Mode</span>
              <span className="text-xs text-[#0A355C] font-medium">Take elivapp offline for all users (use carefully)</span>
            </div>
          </div>
          <button 
            onClick={() => toggleFeature('maintenance')}
            className={`flex items-center w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out border ${features.maintenance ? 'bg-[#C7F556] border-[#C7F556]' : 'bg-[#042850] border-[#0A355C]'}`}
          >
            <div className={`h-full aspect-square rounded-full transition-transform duration-200 ease-in-out ${features.maintenance ? 'translate-x-5 bg-[#00152B]' : 'translate-x-0 bg-white'}`}></div>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
