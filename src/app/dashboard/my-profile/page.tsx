"use client"

import { ProfileOverview } from "@/components/dashboard/my-profile/profile-overview"
import { SecuritySettings } from "@/components/dashboard/my-profile/security-settings"

export default function MyProfilePage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto pb-10">
      <ProfileOverview />
      <SecuritySettings />
    </div>
  )
}
