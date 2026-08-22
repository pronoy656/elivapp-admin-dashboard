export type BusinessStatus = "ACTIVE" | "SUSPENDED" | "PENDING"

export interface BusinessItem {
  id: string
  name: string
  category: string
  sales: number
  rewardPerSale: string
  status: BusinessStatus
}

export type PromoterStatus = "ACTIVE" | "SUSPENDED"

export interface PromoterItem {
  id: string
  name: string
  email: string
  salesCount: number
  earned: string
  multiplier: string
  status: PromoterStatus
}

export type ReferralStatus = "PENDING" | "VERIFIED" | "REJECTED" | "PAID"

export interface ReferralItem {
  id: string
  promoter: string
  business: string
  amount: string
  date: string
  status: ReferralStatus
}

export interface DisputeItem {
  id: string
  promoter: string
  business: string
  reason: string
  amount: string
  date: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  target: "All" | "Promoters" | "Businesses"
  date: string
  read: boolean
}
