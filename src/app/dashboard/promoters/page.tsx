import { PromoterStats } from "@/components/dashboard/promoter/promoter-stats"
import { OpenDisputes } from "@/components/dashboard/promoter/open-disputes"
import { AllPromoters } from "@/components/dashboard/promoter/all-promoters"

export default function PromotersPage() {
  return (
    <div className="flex flex-col w-full pb-10">
      <PromoterStats />
      <OpenDisputes />
      <AllPromoters />
    </div>
  )
}
