import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link as LinkIcon, MousePointerClick, QrCode, Scan, Gift } from "lucide-react"

export function HowItWorks() {
  return (
    <Card className="bg-[#042850] border-[#0A355C]">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-white">How elivapp Works</CardTitle>
      </CardHeader>
      <CardContent className="py-8">
        <div className="flex flex-col md:flex-row items-center justify-between relative px-4 md:px-12 gap-8 md:gap-0">
          
          {/* Connecting lines for desktop */}
          <div className="hidden md:block absolute top-6 left-24 right-24 h-[1px] border-t border-dashed border-[#0A355C] z-0"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center gap-4 relative z-10 w-32">
            <div className="h-12 w-12 rounded-full bg-[#D7FE7C]/15 flex items-center justify-center">
              <LinkIcon className="h-5 w-5 text-[#D7FE7C]" />
            </div>
            <span className="text-xs text-muted-foreground text-center">Promoter shares link</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-4 relative z-10 w-32">
            <div className="h-12 w-12 rounded-full bg-[#D7FE7C]/15 flex items-center justify-center">
              <MousePointerClick className="h-5 w-5 text-[#D7FE7C]" />
            </div>
            <span className="text-xs text-muted-foreground text-center">Customer opens & enters name</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-4 relative z-10 w-32">
            <div className="h-12 w-12 rounded-full bg-[#D7FE7C]/15 flex items-center justify-center">
              <QrCode className="h-5 w-5 text-[#D7FE7C]" />
            </div>
            <span className="text-xs text-muted-foreground text-center">Customer gets QR code</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-4 relative z-10 w-32">
            <div className="h-12 w-12 rounded-full bg-[#D7FE7C]/15 flex items-center justify-center">
              <Scan className="h-5 w-5 text-[#D7FE7C]" />
            </div>
            <span className="text-xs text-muted-foreground text-center">Business scans QR</span>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col items-center gap-4 relative z-10 w-32">
            <div className="h-12 w-12 rounded-full bg-[#D7FE7C]/15 flex items-center justify-center">
              <Gift className="h-5 w-5 text-[#D7FE7C]" />
            </div>
            <span className="text-xs text-muted-foreground text-center">Promoter earns reward</span>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
