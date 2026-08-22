import { AwaitingApproval } from "@/components/dashboard/business/awaiting-approval"
import { ListedBusinesses } from "@/components/dashboard/business/listed-businesses"

export default function BusinessesPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <AwaitingApproval />
      <ListedBusinesses />
    </div>
  )
}
