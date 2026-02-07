"use client"

import * as React from "react"
import { format, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval, addDays } from "date-fns"
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarItem, Platform, ItemStatus } from "./types"
import { nanoid } from "nanoid"

interface ContentCalendarProps {
  items?: CalendarItem[]
  onItemsChange?: (items: CalendarItem[]) => void
}

const PLATFORM_ICONS = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  none: null,
}

const STATUS_COLORS = {
  draft: "bg-slate-200 text-slate-700",
  scheduled: "bg-blue-200 text-blue-700",
  posted: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
}

export function ContentCalendar({ items: initialItems, onItemsChange }: ContentCalendarProps) {
  const [items, setItems] = React.useState<CalendarItem[]>(initialItems || [])
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [view, setView] = React.useState<"month" | "week" | "list">("month")
  const [isCreating, setIsCreating] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<CalendarItem | null>(null)

  const formState = React.useState({
    title: "",
    content: "",
    type: "social" as "social" | "personal",
    platform: "twitter" as Platform,
    status: "draft" as ItemStatus,
    scheduledAt: new Date().toISOString(),
    recurrence: "none" as "none" | "daily" | "weekly" | "monthly",
  })

  const [form, setForm] = formState

  React.useEffect(() => {
    if (onItemsChange) {
      onItemsChange(items)
    }
  }, [items, onItemsChange])

  const handleCreate = () => {
    const newItem: CalendarItem = {
      id: nanoid(),
      title: form.title,
      content: form.content,
      type: form.type,
      platform: form.platform,
      status: form.status,
      scheduledAt: form.scheduledAt,
      recurrence: form.recurrence,
      createdAt: new Date().toISOString(),
    }
    setItems([...items, newItem])
    resetForm()
    setIsCreating(false)
  }

  const handleUpdate = (item: CalendarItem) => {
    const updated = items.map(i => 
      i.id === item.id ? { ...item, updatedAt: new Date().toISOString() } : i
    )
    setItems(updated)
    setEditingItem(null)
    resetForm()
  }

  const handleDelete = (id: string) => {
    setItems(items.filter(i => i.id !== id))
  }

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      type: "social",
      platform: "twitter",
      status: "draft",
      scheduledAt: new Date().toISOString(),
      recurrence: "none",
    })
  }

  const getItemsForDate = (date: Date) => {
    return items.filter(item => 
      isSameDay(new Date(item.scheduledAt), date)
    )
  }

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate)
    const end = endOfWeek(selectedDate)
    return eachDayOfInterval({ start, end })
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setForm(prev => ({ ...prev, scheduledAt: date.toISOString() }))
    setIsCreating(true)
  }

  if (editingItem) {
    return (
      <ItemForm 
        item={editingItem}
        onSave={handleUpdate}
        onCancel={() => {
          setEditingItem(null)
          resetForm()
        }}
      />
    )
  }

  if (isCreating) {
    return (
      <ItemForm
        formState={formState}
        onSave={handleCreate}
        onCancel={() => {
          setIsCreating(false)
          resetForm()
        }}
      />
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Content Calendar</h2>
          <p className="text-muted-foreground">Schedule your social media posts and personal events</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Item
        </Button>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={view === "month" ? "default" : "outline"}
          onClick={() => setView("month")}
        >
          Month
        </Button>
        <Button
          variant={view === "week" ? "default" : "outline"}
          onClick={() => setView("week")}
        >
          Week
        </Button>
        <Button
          variant={view === "list" ? "default" : "outline"}
          onClick={() => setView("list")}
        >
          List
        </Button>
      </div>

      {/* Calendar Views */}
      {view === "month" && (
        <MonthView 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          items={items}
          onDateClick={handleDateClick}
          onItemClick={setEditingItem}
          onItemDelete={handleDelete}
        />
      )}

      {view === "week" && (
        <WeekView
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          items={items}
          onDateClick={handleDateClick}
          onItemClick={setEditingItem}
          onItemDelete={handleDelete}
        />
      )}

      {view === "list" && (
        <ListView
          items={items}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onItemClick={setEditingItem}
          onItemDelete={handleDelete}
        />
      )}
    </div>
  )
}

function MonthView({
  selectedDate,
  onDateChange,
  items,
  onDateClick,
  onItemClick,
  onItemDelete,
}: any) {
  const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
  const daysInMonth = monthEnd.getDate()
  const firstDayOfMonth = monthStart.getDay()

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={() => onDateChange(addDays(selectedDate, -30))}>
          Previous
        </Button>
        <h3 className="text-xl font-semibold">
          {format(selectedDate, "MMMM yyyy")}
        </h3>
        <Button variant="outline" onClick={() => onDateChange(addDays(selectedDate, 30))}>
          Next
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="text-center font-semibold text-sm p-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-20" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1)
          const dayItems = getItemsForDate(items, date)
          
          return (
            <div
              key={i}
              className="h-20 border rounded p-1 cursor-pointer hover:bg-accent"
              onClick={() => onDateClick(date)}
            >
              <div className="font-semibold text-sm mb-1">
                {i + 1}
              </div>
              <div className="space-y-1">
                {dayItems.slice(0, 2).map((item: CalendarItem) => (
                  <div
                    key={item.id}
                    className={cn(
                      "text-xs px-1 py-0.5 rounded truncate",
                      STATUS_COLORS[item.status]
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      onItemClick(item)
                    }}
                  >
                    {item.title}
                  </div>
                ))}
                {dayItems.length > 2 && (
                  <div className="text-xs text-muted-foreground px-1">
                    +{dayItems.length - 2} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekView({
  selectedDate,
  onDateChange,
  items,
  onDateClick,
  onItemClick,
  onItemDelete,
}: any) {
  const weekDays = getWeekDays(selectedDate)

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={() => onDateChange(addDays(selectedDate, -7))}>
          Previous
        </Button>
        <h3 className="text-xl font-semibold">
          {format(weekDays[0], "MMM d")} - {format(weekDays[6], "MMM d, yyyy")}
        </h3>
        <Button variant="outline" onClick={() => onDateChange(addDays(selectedDate, 7))}>
          Next
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, i) => {
          const dayItems = getItemsForDate(items, day)
          return (
            <div key={i} className="border rounded p-2 min-h-[200px]">
              <div 
                className="font-semibold text-sm mb-2 cursor-pointer hover:bg-accent rounded p-1"
                onClick={() => onDateClick(day)}
              >
                {format(day, "EEE, MMM d")}
              </div>
              <div className="space-y-2">
                {dayItems.map((item: CalendarItem) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={() => onItemClick(item)}
                    onDelete={() => onItemDelete(item.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ListView({
  items,
  selectedDate,
  onDateChange,
  onItemClick,
  onItemDelete,
}: any) {
  const sortedItems = [...items].sort((a, b) => 
    new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  )

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">
        All Scheduled Items
      </h3>
      <div className="space-y-2">
        {sortedItems.map((item: CalendarItem) => (
          <ItemCard
            key={item.id}
            item={item}
            onClick={() => onItemClick(item)}
            onDelete={() => onItemDelete(item.id)}
          />
        ))}
        {items.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No scheduled items yet. Create your first item!
          </div>
        )}
      </div>
    </div>
  )
}

function ItemCard({ item, onClick, onDelete }: any) {
  const PlatformIcon = PLATFORM_ICONS[item.platform || "none"]
  
  return (
    <div
      className="p-3 border rounded-lg hover:bg-accent cursor-pointer group relative"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {PlatformIcon && <PlatformIcon className="h-4 w-4" />}
            <span className="font-semibold text-sm">{item.title}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {format(new Date(item.scheduledAt), "MMM d, yyyy 'at' h:mm a")}
          </div>
        </div>
        <span className={cn("text-xs px-2 py-1 rounded", STATUS_COLORS[item.status])}>
          {item.status}
        </span>
      </div>
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </button>
    </div>
  )
}

function ItemForm({ item, formState, onSave, onCancel }: any) {
  const [form, setForm] = formState || React.useState({
    title: item?.title || "",
    content: item?.content || "",
    type: item?.type || "social",
    platform: item?.platform || "twitter",
    status: item?.status || "draft",
    scheduledAt: item?.scheduledAt || new Date().toISOString(),
    recurrence: item?.recurrence || "none",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (item) {
      onSave({ ...item, ...form })
    } else {
      onSave()
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 border rounded-lg">
      <h3 className="text-2xl font-bold mb-6">
        {item ? "Edit Item" : "Create New Item"}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Input
            id="content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Enter post content..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={form.type}
              onValueChange={(value) => setForm({ ...form, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {form.type === "social" && (
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select
                value={form.platform}
                onValueChange={(value) => setForm({ ...form, platform: value as Platform })}
              >
                <SelectTrigger id="platform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) => setForm({ ...form, status: value as ItemStatus })}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="posted">Posted</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="recurrence">Recurrence</Label>
            <Select
              value={form.recurrence}
              onValueChange={(value) => setForm({ ...form, recurrence: value })}
            >
              <SelectTrigger id="recurrence">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            {item ? "Update" : "Create"} Item
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

// Helper functions
function getItemsForDate(items: CalendarItem[], date: Date) {
  return items.filter(item => 
    isSameDay(new Date(item.scheduledAt), date)
  )
}

function getWeekDays(selectedDate: Date) {
  const start = startOfWeek(selectedDate)
  const end = endOfWeek(selectedDate)
  return eachDayOfInterval({ start, end })
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

export { ContentCalendar as default }

