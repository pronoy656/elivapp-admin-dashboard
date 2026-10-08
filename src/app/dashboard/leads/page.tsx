import { LeadStats } from "@/components/dashboard/leads/lead-stats"
import { LeadsTable } from "@/components/dashboard/leads/leads-table"

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Lead Acquisition
        </h2>
        <p className="text-muted-foreground text-sm">
          Track prospective customer acquisitions, monitor pipeline conversion stages, and manage incoming leads.
        </p>
      </div>

      <LeadStats />
      <LeadsTable />
    </div>
  )
}
