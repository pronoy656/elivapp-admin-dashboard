import { PromoterStats } from "@/components/dashboard/promoter/promoter-stats"
import { AllPromoters } from "@/components/dashboard/promoter/all-promoters"

export default function UsersPromotersPage() {
  return (
    <div className="flex flex-col w-full pb-10">
      <PromoterStats />
      <AllPromoters />
    </div>
  )
}
