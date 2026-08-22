"use client"

import { RewardDistribution } from "@/components/dashboard/settings/reward-distribution"
import { PlatformFeatures } from "@/components/dashboard/settings/platform-features"
import { AdminActivityLog } from "@/components/dashboard/settings/admin-activity-log"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <RewardDistribution />
        <PlatformFeatures />
      </div>
      <AdminActivityLog />
    </div>
  )
}
