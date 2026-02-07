import React, { useState } from "react";
import {
    ArrowLeft,
    Search,
    Bell,
    Plus,
    MoreHorizontal,
    Filter,
    Calendar,
    MessageSquare,
    Github,
    Linkedin,
    Video,
    ExternalLink,
    MessageCircle,
    BadgeCheck
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock Data for Timeline
const ACTIVITIES = [
    {
        id: 1,
        type: "linkedin",
        platform: "LinkedIn",
        icon: Linkedin,
        title: "Posted on LinkedIn: 'The Future of Frontend'",
        subtitle: "Posted in #webdev-trends",
        content: "Just shared my thoughts on the new React server components. It's a paradigm shift that we all need to prepare for. Read the full article on my blog...",
        time: "2 hours ago",
        date: "Jan 19, 2026",
        participants: [
            "https://i.pravatar.cc/150?u=20",
            "https://i.pravatar.cc/150?u=21",
            "https://i.pravatar.cc/150?u=22"
        ],
        action: "View Post",
        color: "text-blue-600",
        bgColor: "bg-blue-100"
    },
    {
        id: 2,
        type: "reddit",
        platform: "Reddit",
        icon: MessageCircle, // Fallback for Reddit
        title: "Reddit discussion in r/reactjs",
        subtitle: "Commented on 'Best state management library 2026?'",
        content: "I personally stick with Zustand for 90% of my projects. It's lightweight and just works without the boilerplate...",
        time: "Yesterday at 4:30pm",
        date: "Jan 18, 2026",
        participants: ["https://i.pravatar.cc/150?u=23", "https://i.pravatar.cc/150?u=24"],
        action: "Join Thread",
        color: "text-orange-600",
        bgColor: "bg-orange-100"
    },
    {
        id: 3,
        type: "discord",
        platform: "Discord",
        icon: MessageSquare,
        title: "Discord conversation in #showwork-community",
        subtitle: "Replied to @sarah_design",
        content: "Hey Sarah! I took a look at your portfolio. The typography choices are excellent, but you might want to increase the contrast on the dark mode toggle.",
        time: "Jan 18, 2026 at 1:39pm",
        date: "Jan 18, 2026",
        participants: ["https://i.pravatar.cc/150?u=25", "https://i.pravatar.cc/150?u=11"],
        action: "Go to Discord",
        color: "text-indigo-500",
        bgColor: "bg-indigo-100"
    },
    {
        id: 4,
        type: "github",
        platform: "GitHub",
        icon: Github,
        title: "Pull Request #57 on showwork-frontend",
        subtitle: "Merged 3 commits",
        content: "feat: Implement new user profile timeline view with responsive layout adjustments.",
        time: "Jan 17, 2026 at 9:02am",
        date: "Jan 17, 2026",
        participants: ["https://i.pravatar.cc/150?u=26"],
        action: "View PR",
        color: "text-gray-900",
        bgColor: "bg-gray-100" // GitHub uses black/white usually
    },
    {
        id: 5,
        type: "event",
        platform: "Webinar",
        icon: Video,
        title: "Community Camp 21: Developer Events Panel",
        subtitle: "Registered as Speaker",
        content: "Looking forward to speaking about 'Building Community Driven Apps' at the upcoming Community Camp next week!",
        time: "Jan 15, 2026 at 6:30pm",
        date: "Jan 15, 2026",
        participants: ["https://i.pravatar.cc/150?u=27", "https://i.pravatar.cc/150?u=28", "https://i.pravatar.cc/150?u=29", "https://i.pravatar.cc/150?u=30"],
        action: "Event Info",
        tag: "+203",
        color: "text-purple-600",
        bgColor: "bg-purple-100"
    }
];

interface UserProfileViewProps {
    user: any;
    onBack: () => void;
}

export function UserProfileView({ user, onBack }: UserProfileViewProps) {
    const [activeTab, setActiveTab] = useState("Interactions");

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">

            {/* Header / Nav */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-gray-100">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Button>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 leading-none">{user.name}</h2>
                        <div className="flex items-center gap-1 mt-1 text-blue-600">
                            <BadgeCheck className="w-4 h-4 fill-blue-600 text-white" />
                            <span className="text-xs font-semibold">Trusted by ShowWork</span>
                            <img src="/favicon.svg" className="w-5 h-5 ml-1" alt="ShowWork" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search interactions..." className="pl-9 w-64 h-9 bg-gray-50 border-gray-200" />
                    </div>
                    <Button variant="ghost" size="icon"><Bell className="w-5 h-5 text-gray-500" /></Button>
                    <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {/* Profile & Tabs Bar */}
            <div className="bg-white border-b border-gray-200 px-8 pt-6">
                <div className="flex items-start gap-6 mb-8">
                    <Avatar className="w-20 h-20 border-4 border-white shadow-sm ring-1 ring-gray-100">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-xl">{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 pt-1">
                        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-gray-500">{user.role}</p>
                        <div className="flex gap-2 mt-3">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                {user.points || "12.4k"} points
                            </Badge>
                            <Badge variant="outline" className="text-gray-600 border-gray-300">
                                Level 5 Contributor
                            </Badge>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Follow</Button>
                        <Button variant="outline">Message</Button>
                    </div>
                </div>

                <div className="flex items-center gap-8 -mb-px">
                    {["Interactions", "Activities", "Portfolio", "Mentions"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-4 text-sm font-medium border-b-2 transition-colors",
                                activeTab === tab
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-5xl mx-auto">

                    {/* Timeline Tools */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search name, username and email..."
                                className="pl-10 pr-4 py-2 w-full md:w-80 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                                <Calendar className="w-4 h-4" />
                                The Last 30 Days
                            </div>
                            <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                                <Filter className="w-4 h-4" /> Filters
                            </Button>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gray-200" />

                        {ACTIVITIES.map((activity) => (
                            <div key={activity.id} className="relative flex gap-6 group">

                                {/* Left Icon Node */}
                                <div className={cn(
                                    "relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-sm border-4 border-gray-50 shrink-0 bg-white",
                                )}>
                                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", activity.bgColor)}>
                                        <activity.icon className={cn("w-5 h-5", activity.color)} />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="flex-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-base font-semibold text-gray-900">{activity.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 font-normal">
                                                {activity.action}
                                            </Badge>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subtitle & Time */}
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                                        <span className="flex items-center gap-1 font-medium text-gray-700">
                                            <activity.icon className="w-3 h-3" />
                                            {activity.platform}
                                        </span>
                                        <span>•</span>
                                        <span>{activity.subtitle}</span>
                                        <span>•</span>
                                        <span>{activity.date}</span>
                                    </div>

                                    {/* Content Body */}
                                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 leading-relaxed mb-4 border border-gray-100">
                                        {activity.content}
                                    </div>

                                    {/* Footer (Participants & Meta) */}
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100/50">
                                        <div className="flex items-center gap-4">
                                            <div className="flex -space-x-2">
                                                {activity.participants.map((p, i) => (
                                                    <img
                                                        key={i}
                                                        src={p}
                                                        alt="Participant"
                                                        className="w-6 h-6 rounded-full border-2 border-white ring-1 ring-gray-100"
                                                    />
                                                ))}
                                                {activity.tag && (
                                                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-[10px] text-white flex items-center justify-center border-2 border-white font-bold">
                                                        {activity.tag}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-400">Latest Activity: {activity.time}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
