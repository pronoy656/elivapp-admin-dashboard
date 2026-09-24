"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlayCircle, PauseCircle, Edit2, Check, X } from "lucide-react"

export interface CampaignData {
  id: string
  name: string
  budget: string
  spent: string
  status: "ACTIVE" | "PAUSED"
}

// Dummy campaigns data generator based on business name
const getDummyCampaigns = (businessName: string): CampaignData[] => [
  { id: "c1", name: `${businessName} - Summer Sale`, budget: "$500", spent: "$120", status: "ACTIVE" },
  { id: "c2", name: `${businessName} - New Users`, budget: "$200", spent: "$200", status: "PAUSED" },
  { id: "c3", name: `${businessName} - Retargeting`, budget: "$300", spent: "$45", status: "ACTIVE" },
]

interface BusinessCampaignsModalProps {
  isOpen: boolean
  onClose: () => void
  business: { name: string; id: string } | null
}

export function BusinessCampaignsModal({ isOpen, onClose, business }: BusinessCampaignsModalProps) {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Edit form state
  const [editName, setEditName] = useState("")
  const [editBudget, setEditBudget] = useState("")
  const [editStatus, setEditStatus] = useState<"ACTIVE" | "PAUSED">("ACTIVE")

  // Load dummy data when business changes
  if (business && campaigns.length === 0) {
    setCampaigns(getDummyCampaigns(business.name))
  } else if (!business && campaigns.length > 0) {
    setCampaigns([])
  }

  const handleEditClick = (campaign: CampaignData) => {
    setEditingId(campaign.id)
    setEditName(campaign.name)
    setEditBudget(campaign.budget)
    setEditStatus(campaign.status)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleSaveEdit = () => {
    setCampaigns(prev => prev.map(c => 
      c.id === editingId 
        ? { ...c, name: editName, budget: editBudget, status: editStatus }
        : c
    ))
    setEditingId(null)
  }

  const toggleStatus = (id: string) => {
    setCampaigns(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === "ACTIVE" ? "PAUSED" : "ACTIVE" } : c
    ))
  }

  if (!business) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-[#042850] text-white border-[#0A355C]">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Campaigns for {business.name}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 mt-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-[#00152B] p-4 rounded-xl border border-[#0A355C] flex flex-col gap-3">
              {editingId === campaign.id ? (
                // Edit Mode
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[#94A3B8]">Campaign Name</label>
                    <Input 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-8 bg-[#042850] border-[#0A355C] text-sm text-white"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                      <label className="text-xs text-[#94A3B8]">Budget</label>
                      <Input 
                        value={editBudget}
                        onChange={(e) => setEditBudget(e.target.value)}
                        className="h-8 bg-[#042850] border-[#0A355C] text-sm text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <label className="text-xs text-[#94A3B8]">Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as "ACTIVE" | "PAUSED")}
                        className="h-8 bg-[#042850] border-[#0A355C] text-sm text-white rounded-md px-2"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="PAUSED">Paused</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <Button variant="ghost" size="sm" onClick={handleCancelEdit} className="h-7 text-xs text-[#F87171] hover:bg-[#F87171]/10 hover:text-[#F87171]">
                      <X className="h-3 w-3 mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveEdit} className="h-7 text-xs bg-[#C7F556] text-[#001F3E] hover:bg-[#b5e045]">
                      <Check className="h-3 w-3 mr-1" /> Save
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{campaign.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-[#94A3B8]">Budget: <span className="text-white font-medium">{campaign.budget}</span></span>
                        <span className="text-xs text-[#94A3B8]">Spent: <span className="text-white font-medium">{campaign.spent}</span></span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className={
                        campaign.status === "ACTIVE" 
                          ? "bg-green-500/10 text-green-400 border-green-500/20 text-[10px]"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px]"
                      }>
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-[#0A355C]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleStatus(campaign.id)}
                      className={`h-7 px-2 text-xs ${campaign.status === 'ACTIVE' ? 'text-amber-400 hover:text-amber-300' : 'text-green-400 hover:text-green-300'} hover:bg-transparent p-0`}
                    >
                      {campaign.status === "ACTIVE" ? (
                        <><PauseCircle className="h-3.5 w-3.5 mr-1" /> Pause</>
                      ) : (
                        <><PlayCircle className="h-3.5 w-3.5 mr-1" /> Activate</>
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditClick(campaign)}
                      className="h-7 px-2 text-xs text-[#94A3B8] hover:text-white hover:bg-[#042850]"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
          
          {campaigns.length === 0 && (
            <div className="text-center py-8 text-sm text-[#94A3B8]">
              No campaigns found for this business.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
