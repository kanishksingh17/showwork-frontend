export type Platform = "twitter" | "facebook" | "instagram" | "linkedin" | "none"

export type ItemStatus = "draft" | "scheduled" | "posted" | "cancelled"

export interface CalendarItem {
  id: string
  title: string
  content?: string
  imageUrl?: string
  type: "social" | "personal"
  platform?: Platform
  scheduledAt: string // ISO timestamp
  status: ItemStatus
  recurrence?: "none" | "daily" | "weekly" | "monthly"
  createdAt: string
  updatedAt?: string
}

export interface CalendarView {
  view: "month" | "week" | "list"
}

