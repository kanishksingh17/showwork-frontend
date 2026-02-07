import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MoreHorizontal,
  Zap,
  CheckCircle2,
  Video,
  Image as ImageIcon,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Mock Data ---



const UPCOMING_POSTS = [
  {
    id: 1,
    title: "Product Launch Teaser",
    time: "10:00 - 11:00 AM",
    type: "video",
    platforms: ["Instagram", "TikTok"],
    team: [1, 2, 3]
  },
  {
    id: 2,
    title: "Weekly Newsletter",
    time: "02:00 - 03:00 PM",
    type: "article",
    platforms: ["LinkedIn", "Twitter"],
    team: [2]
  },
  {
    id: 3,
    title: "Client Case Study",
    time: "04:00 - 05:00 PM",
    type: "image",
    platforms: ["Instagram", "LinkedIn"],
    team: [1, 4, 5]
  },
];

const CONNECTED_APPS = [
  { name: "LinkedIn", status: "Connected", icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png" },
  { name: "Twitter / X", status: "Connected", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png" },
  { name: "Instagram", status: "Connected", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" },
];

const EVENTS = [
  { id: 1, title: "Morning Sync", time: "09:00 - 09:30 AM", dayOffset: 0, color: "bg-blue-50 border-blue-100 text-blue-700", type: "video" },
  { id: 2, title: "Design Review", time: "11:00 - 12:00 PM", dayOffset: 1, color: "bg-indigo-50 border-indigo-100 text-indigo-700", type: "image" },
  { id: 3, title: "Content Prep", time: "02:00 - 04:00 PM", dayOffset: 2, color: "bg-sky-50 border-sky-100 text-sky-700", type: "article" },
  { id: 4, title: "Client Call", time: "10:00 - 11:00 AM", dayOffset: 3, color: "bg-blue-100 border-blue-200 text-blue-800", type: "video" },
  { id: 5, title: "Team Lunch", time: "12:30 - 01:30 PM", dayOffset: 4, color: "bg-slate-50 border-slate-200 text-slate-700", type: "image" },
  { id: 6, title: "Weekly Report", time: "04:00 - 05:00 PM", dayOffset: 4, color: "bg-emerald-50 border-emerald-100 text-emerald-700", type: "article" },
];

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) =>
  `${i.toString().padStart(2, '0')}:00`
);

interface ContentCalendarProps {
  compact?: boolean;
}

export default function ContentCalendar({ }: ContentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"week" | "month" | "year">("week");

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday start

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(startDate, i);
    return {
      name: format(date, "EEE"),
      date: format(date, "dd"),
      fullDate: date,
      isToday: isSameDay(date, new Date())
    };
  });

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 p-1 bg-gray-50/50">

      {/* --- Main Calendar Section (Left/Center) --- */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 tracking-tight leading-none">Content Calendar</h2>
              <p className="text-[10px] text-gray-500 font-medium">Manage schedule and assets</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-100/80 p-1 rounded-xl hidden md:flex">
              {(["week", "month", "year"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    "px-4 py-1.5 text-sm font-semibold rounded-lg transition-all capitalize",
                    view === v
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Date Nav */}
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1 pr-2 shadow-sm">
              <button
                onClick={() => setCurrentDate(addDays(currentDate, -7))}
                className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-gray-700 min-w-[100px] text-center px-2">
                {format(currentDate, "MMMM yyyy")}
              </span>
              <button
                onClick={() => setCurrentDate(addDays(currentDate, 7))}
                className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 h-8 shadow-md shadow-blue-200 hidden md:flex items-center gap-1.5 transition-all text-xs font-semibold">
              <Plus className="w-3.5 h-3.5" />
              Schedule Post
            </Button>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="flex-1 overflow-auto bg-white relative">
          <div className="min-w-[800px] pb-10">
            {/* Days Header */}
            <div className="grid grid-cols-[70px_repeat(7,1fr)] sticky top-0 z-10 bg-white border-b border-gray-100 shadow-[0_4px_10px_-4px_rgba(0,0,0,0.02)]">
              <div className="p-4 border-r border-gray-50"></div>
              {weekDays.map((day, i) => (
                <div key={i} className="p-4 flex flex-col items-center justify-center border-r border-gray-50 last:border-r-0 group">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 group-hover:text-blue-500 transition-colors">{day.name}</span>
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold transition-all",
                    day.isToday ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-110" : "text-gray-700 group-hover:bg-gray-50"
                  )}>
                    {day.date}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Slots Grid */}
            <div className="relative">
              {TIME_SLOTS.map((time) => (
                <div key={time} className="grid grid-cols-[70px_repeat(7,1fr)] min-h-[120px]">
                  {/* Time Label */}
                  <div className="p-3 text-right border-r border-gray-50 border-b border-gray-50">
                    <span className="text-xs font-medium text-gray-400 -mt-2 block relative -top-3 sticky left-0">
                      {time}
                    </span>
                  </div>

                  {/* Columns */}
                  {weekDays.map((_, dayIndex) => {
                    // Mock event filtering
                    const dayEvents = EVENTS.filter(e =>
                      e.dayOffset === dayIndex && e.time.startsWith(time.split(':')[0])
                    );

                    return (
                      <div
                        key={dayIndex}
                        className="relative border-r border-gray-50 border-b border-gray-50 p-2 group hover:bg-gray-50/30 transition-colors"
                        style={{
                          backgroundImage: dayEvents.length === 0 ? "repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(249, 250, 251, 0.6) 10px, rgba(249, 250, 251, 0.6) 20px)" : undefined,
                          backgroundColor: dayEvents.length === 0 ? "rgba(250, 250, 252, 0.3)" : undefined
                        }}
                      >
                        {/* Add Button Overlay */}
                        <div className="absolute inset-x-0 top-0 h-1 opacity-0 group-hover:opacity-100 z-10 flex justify-center -mt-2.5 pointer-events-none">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
                            <Plus className="w-3 h-3" />
                          </div>
                        </div>

                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={cn(
                              "rounded-xl p-3 mb-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md border shadow-sm group/card relative overflow-hidden",
                              event.color
                            )}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <span className="font-semibold text-xs leading-tight line-clamp-2 pr-4">{event.title}</span>
                              <button className="text-current opacity-0 group-hover/card:opacity-60 hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2 mt-auto">
                              {/* Mock Avatars */}
                              <div className="flex -space-x-1.5">
                                {[1, 2].map(k => (
                                  <div key={k} className="w-5 h-5 rounded-full border border-white bg-white/40 flex items-center justify-center">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${k + event.id}`} alt="User" className="w-full h-full rounded-full" />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Type Icon Background Watermark */}
                            {event.type === 'video' && <Video className="absolute bottom-1 right-1 w-8 h-8 opacity-5 -rotate-12" />}
                            {event.type === 'image' && <ImageIcon className="absolute bottom-1 right-1 w-8 h-8 opacity-5 -rotate-12" />}
                            {event.type === 'article' && <FileText className="absolute bottom-1 right-1 w-8 h-8 opacity-5 -rotate-12" />}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Right Sidebar Widgets --- */}
      <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0 overflow-y-auto pb-4">

        {/* Stats Widget */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-100">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">This Week</h3>
              <p className="text-xs text-gray-500 font-medium">Content Productivity</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-1">Posts Created</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-1">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">08</p>
            </div>
          </div>
        </div>

        {/* Upcoming Posts Widget */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Upcoming Posts</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
          </div>

          <div className="space-y-4">
            {UPCOMING_POSTS.map((post) => (
              <div key={post.id} className="relative pl-4 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100 before:rounded-full group hover:before:bg-blue-500 hover:before:scale-y-110 before:transition-all">
                <div className="flex flex-col gap-1 mb-2">
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">{post.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {post.time}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Tags */}
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
                    {post.type}
                  </span>

                  {/* Team Stack */}
                  <div className="flex -space-x-1.5 ml-auto">
                    {post.team.map(m => (
                      <div key={m} className="w-5 h-5 rounded-full border border-white bg-gray-100 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=member${m}`} alt="Member" className="w-full h-full" />
                      </div>
                    ))}
                  </div>

                  <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-50 space-y-3">
            <Button variant="outline" className="w-full justify-start text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 rounded-xl h-10 border-gray-200">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Schedule Post
            </Button>
            <Button variant="outline" className="w-full justify-start text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 rounded-xl h-10 border-gray-200">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Set Team Deadline
            </Button>
            <Button variant="ghost" className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl h-10">
              <Plus className="w-4 h-4 mr-2" />
              Create Draft
            </Button>
          </div>
        </div>

        {/* Connected Apps */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Connected</h3>
          <div className="space-y-3">
            {CONNECTED_APPS.map((app) => (
              <div key={app.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-110 transition-transform">
                    <img src={app.icon} alt={app.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{app.name}</span>
                </div>
                <span className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
