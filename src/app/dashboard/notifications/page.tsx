import { SendNotification } from "@/components/dashboard/notification/send-notification"
import { SentHistory } from "@/components/dashboard/notification/sent-history"

export default function NotificationsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full pb-10">
      <SendNotification />
      <SentHistory />
    </div>
  )
}
