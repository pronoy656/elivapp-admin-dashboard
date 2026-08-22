import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Globe, Edit, Camera } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function ProfileOverview() {
  return (
    <Card className="bg-[#042850] border-[#0A355C] w-full">
      <CardContent className="p-8 flex flex-col gap-8">
        
        {/* Header: Avatar and Edit Button */}
        <div className="flex justify-between items-start">
          <div className="h-24 w-24 rounded-2xl overflow-hidden shadow-lg border-2 border-[#0A355C]">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80" 
              alt="Admin Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          <Dialog>
            <DialogTrigger render={
              <Button variant="outline" className="border-[#C7F556] text-[#C7F556] hover:bg-[#C7F556]/10 hover:text-[#C7F556] font-medium rounded-lg h-9">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            } />
            <DialogContent className="bg-[#042850] border-[#0A355C] max-w-2xl sm:max-w-2xl p-8 rounded-2xl gap-8" showCloseButton={false}>
              <DialogTitle className="sr-only">Edit Profile</DialogTitle>
              
              <div className="flex justify-between items-start">
                <div className="relative h-24 w-24 rounded-2xl overflow-hidden shadow-lg border-2 border-[#0A355C]">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80" 
                    alt="Admin Profile" 
                    className="w-full h-full object-cover" 
                  />
                  <button className="absolute -bottom-1 -right-1 p-1.5 bg-[#0A355C] border-2 border-[#042850] rounded-lg text-[#C7F556] hover:bg-[#0A355C]/80 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Full Name</label>
                  <Input defaultValue="Super Admin" className="bg-[#00152B] border-[#0A355C] text-white focus-visible:ring-[#C7F556] h-12" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Job Title</label>
                  <Input defaultValue="Platform Administrator" className="bg-[#00152B] border-[#0A355C] text-white focus-visible:ring-[#C7F556] h-12" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Email</label>
                  <Input defaultValue="admin@elivapp.com" className="bg-[#00152B] border-[#0A355C] text-white focus-visible:ring-[#C7F556] h-12" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Phone</label>
                  <Input defaultValue="+1 (555) 000-1234" className="bg-[#00152B] border-[#0A355C] text-white focus-visible:ring-[#C7F556] h-12" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Location</label>
                  <Input defaultValue="San Francisco, CA" className="bg-[#00152B] border-[#0A355C] text-white focus-visible:ring-[#C7F556] h-12" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Website</label>
                  <Input defaultValue="elivapp.com" className="bg-[#00152B] border-[#0A355C] text-white focus-visible:ring-[#C7F556] h-12" />
                </div>
                
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] text-[#5C7C9E] font-semibold uppercase tracking-wider">Bio</label>
                  <textarea 
                    className="w-full bg-[#00152B] border border-[#0A355C] text-white focus:outline-none focus:ring-2 focus:ring-[#C7F556] rounded-md px-3 py-2 min-h-[100px] resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4">
                <DialogClose render={
                  <Button variant="ghost" className="text-[#94A3B8] hover:bg-[#0A355C] hover:text-white border border-[#0A355C] rounded-lg h-10 px-6">
                    Cancel
                  </Button>
                } />
                <Button className="bg-[#C7F556] text-[#00152B] hover:bg-[#bce65c] font-semibold rounded-lg h-10 px-6">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Bio Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white">Shahriar Rabbi</h1>
          <p className="text-sm font-medium text-[#C7F556]">Platform Administrator</p>
          <p className="text-sm text-[#94A3B8] leading-relaxed max-w-4xl mt-2">
            Managing the elivapp referral platform — approving businesses, resolving disputes, and keeping the promoter ecosystem running smoothly.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-transparent border border-[#0A355C] rounded-lg p-3.5">
            <Mail className="h-4 w-4 text-[#C7F556]" />
            <span className="text-sm text-[#94A3B8]">admin@elivapp.com</span>
          </div>
          <div className="flex items-center gap-3 bg-transparent border border-[#0A355C] rounded-lg p-3.5">
            <Phone className="h-4 w-4 text-[#C7F556]" />
            <span className="text-sm text-[#94A3B8]">+1 (555) 000-1234</span>
          </div>
          <div className="flex items-center gap-3 bg-transparent border border-[#0A355C] rounded-lg p-3.5">
            <MapPin className="h-4 w-4 text-[#C7F556]" />
            <span className="text-sm text-[#94A3B8]">San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-3 bg-transparent border border-[#0A355C] rounded-lg p-3.5">
            <Globe className="h-4 w-4 text-[#C7F556]" />
            <span className="text-sm text-[#94A3B8]">elivapp.com</span>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#0A355C]">
          <div className="flex flex-col items-center justify-center gap-1 bg-transparent border border-[#0A355C] rounded-xl py-6 shadow-sm">
            <span className="text-3xl font-bold text-[#C7F556]">5</span>
            <span className="text-[11px] text-[#5C7C9E] font-medium tracking-wide">Businesses managed</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 bg-transparent border border-[#0A355C] rounded-xl py-6 shadow-sm">
            <span className="text-3xl font-bold text-[#C7F556]">7</span>
            <span className="text-[11px] text-[#5C7C9E] font-medium tracking-wide">Promoters overseen</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 bg-transparent border border-[#0A355C] rounded-xl py-6 shadow-sm">
            <span className="text-3xl font-bold text-[#C7F556]">534</span>
            <span className="text-[11px] text-[#5C7C9E] font-medium tracking-wide">Referrals reviewed</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 bg-[#00152B] border border-[#0A355C] rounded-xl py-6 shadow-sm">
            <span className="text-3xl font-bold text-[#C7F556]">142</span>
            <span className="text-[11px] text-[#5C7C9E] font-medium tracking-wide">Days active</span>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
