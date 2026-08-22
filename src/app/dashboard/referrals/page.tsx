import { ReferralConversionFunnel } from "@/components/dashboard/referral/referral-conversion-funnel"
import { AllReferrals } from "@/components/dashboard/referral/all-referrals"

export default function ReferralsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <ReferralConversionFunnel />
      <AllReferrals />
    </div>
  )
}
