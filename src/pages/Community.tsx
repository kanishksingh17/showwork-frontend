import React, { useState } from "react";
import { UnifiedSidebar } from "../components/UnifiedSidebar";
import { UserProfileView } from "../components/Community/UserProfileView";
import {
  Search,
  Bell,
  Plus,
  Pin,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Filter,
  Trophy,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const LEADERBOARD_USERS = [
  { id: 1, name: "Keeton Wagle", role: "Full Stack Developer", points: "32,909", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Lorenzo Nuttle", role: "UI/UX Designer", points: "4,078", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Rio Chapman", role: "Frontend Engineer", points: "3,883", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Ahmed-Aziz Resnick", role: "Product Manager", points: "5,616", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Abhinav Chapman", role: "DevOps Engineer", points: "456", avatar: "https://i.pravatar.cc/150?u=5" },
  { id: 6, name: "Abdul Nuttle", role: "Mobile Developer", points: "2,129", avatar: "https://i.pravatar.cc/150?u=6" },
  { id: 7, name: "Kurt Nuttle", role: "Data Scientist", points: "4,201", avatar: "https://i.pravatar.cc/150?u=7" },
];

const FEED_POSTS = [
  {
    id: "pinned-1",
    isPinned: true,
    user: { name: "Sayem Sumon", role: "Community Manager", avatar: "https://i.pravatar.cc/150?u=8", bg: "bg-orange-100", initials: "SS" },
    content: "Can I see your ShowWork Landing Page? Feedback Required",
    description: "I'm all in using ShowWork fully not only for portfolios but as the main website, landing pages...",
    likes: 12,
    comments: 0,
    time: "2h ago"
  },
  {
    id: "post-1",
    user: { name: "Salman hira", role: "Frontend Developer", avatar: "https://i.pravatar.cc/150?u=9", bg: "bg-blue-100", initials: "SH" },
    time: "20 hours ago",
    content: "Just published my new portfolio using the 'Creative Flow' template! Check it out and let me know what you think.",
    description: "Currently, I really love how the dark mode turned out. The animations are smooth and the transitions feel very premium. Would love some feedback on the project section layout!",
    likes: 45,
    comments: 12,
    shares: 4,
    images: ["https://images.unsplash.com/photo-1545665277-59374f47d25b?auto=format&fit=crop&q=80&w=800"],
    activityType: "posted on LinkedIn"
  },
  {
    id: "event-1",
    type: "event",
    user: { name: "Imran Khan", role: "Product Designer", avatar: "https://i.pravatar.cc/150?u=10", bg: "bg-green-100", initials: "IK" },
    time: "2 hours ago",
    title: "Winter Design Show",
    description: "Join us for a showcase of the best design portfolios created this month.",
    interested: 24,
    date: "Dec 24, 2026"
  },
  {
    id: "post-2",
    user: { name: "Sarah Jenkins", role: "Content Creator", avatar: "https://i.pravatar.cc/150?u=11", bg: "bg-purple-100", initials: "SJ" },
    time: "1 day ago",
    content: "The new 'Tone Selector' feature in content management is a game changer! 🚀",
    description: "I used the 'Witty' tone for my latest Twitter thread and engagement went up by 40%. Highly recommend giving it a try.",
    likes: 89,
    comments: 23,
    shares: 15,
    activityType: "posted on Twitter"
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("Latest");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  if (selectedUser) {
    return <UserProfileView user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <UnifiedSidebar currentPage="community" />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for topics and discussions"
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-gray-500">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm">
              <Plus className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9 border border-gray-200 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

            {/* Left Column: Navigation & Feed (approx 70%) */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* Feed Navigation */}
              <div className="flex items-center gap-4 text-sm font-medium text-gray-500 pb-2 border-b border-gray-100">
                {["Explore", "Feed"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-2 rounded-lg transition-colors",
                      activeTab === tab ? "bg-blue-50 text-blue-600" : "hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Feed Content */}
              <div className="space-y-6">

                {/* Pinned Post */}
                {FEED_POSTS.filter(p => p.isPinned).map(post => (
                  <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setSelectedUser(post.user)}>
                        <div className="p-1.5 bg-red-50 text-red-500 rounded-full mb-1">
                          <Pin className="w-3.5 h-3.5" />
                        </div>
                        <Avatar className="h-10 w-10 border border-gray-100">
                          <AvatarImage src={post.user.avatar} />
                          <AvatarFallback>{post.user.initials}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="cursor-pointer" onClick={() => setSelectedUser(post.user)}>
                            <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors">{post.user.name}</h3>
                            <p className="text-xs text-gray-500">{post.user.role}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        <h4 className="mt-3 font-semibold text-gray-800 text-lg">{post.content}</h4>
                        <p className="mt-2 text-gray-600 text-sm leading-relaxed">{post.description}</p>

                        <div className="mt-4 flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-gray-500 gap-2 hover:text-red-500">
                            <Heart className="w-4 h-4" /> {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 gap-2 hover:text-blue-500">
                            <MessageSquare className="w-4 h-4" /> Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Feed Tabs */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">Latest</Badge>
                  <Badge variant="ghost" className="text-gray-500 hover:bg-gray-100 cursor-pointer">Recent activity</Badge>
                </div>

                {/* Regular Posts */}
                {FEED_POSTS.filter(p => !p.isPinned).map(post => (
                  <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    {post.type === 'event' ? (
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10 cursor-pointer" onClick={() => setSelectedUser(post.user)}>
                          <AvatarImage src={post.user.avatar} />
                          <AvatarFallback>{post.user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 cursor-pointer" onClick={() => setSelectedUser(post.user)}>
                            {post.user.name} <span className="text-gray-400 font-normal hover:text-gray-400">• {post.time}</span>
                          </p>
                          <div className="mt-3 border rounded-xl p-4 flex gap-4 items-center bg-gray-50">
                            <div className="h-16 w-16 bg-blue-100 rounded-lg flex flex-col items-center justify-center text-blue-600 font-bold leading-tight">
                              <span className="text-xs font-medium uppercase">Dec</span>
                              <span className="text-xl">24</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{post.title}</h4>
                              <p className="text-sm text-gray-500">{post.description}</p>
                              <p className="text-xs text-gray-400 mt-1">{post.interested} people interested</p>
                            </div>
                            <Button size="sm" variant="outline" className="ml-auto">Event Details</Button>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
                          <Plus className="w-4 h-4" /> Follow
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10 cursor-pointer" onClick={() => setSelectedUser(post.user)}>
                          <AvatarImage src={post.user.avatar} />
                          <AvatarFallback>{post.user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="cursor-pointer" onClick={() => setSelectedUser(post.user)}>
                              <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors">{post.user.name}</h3>
                              <p className="text-xs text-gray-500">{post.time} • {post.activityType}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 p-2 text-gray-400">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>

                          <h4 className="mt-3 font-medium text-gray-800">{post.content}</h4>
                          <p className="mt-2 text-gray-600 text-sm leading-relaxed">{post.description}</p>

                          {post.images && (
                            <div className="mt-4 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                              <img src={post.images[0]} alt="Post content" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                          )}

                          <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
                            <div className="flex items-center gap-6">
                              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors">
                                <Heart className="w-4 h-4" /> {post.likes}
                              </button>
                              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                                <MessageSquare className="w-4 h-4" /> {post.comments || 'Reply'}
                              </button>
                              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-500 transition-colors">
                                <Share2 className="w-4 h-4" /> Share
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </div>

            {/* Right Column: Sidebar (approx 30%) */}
            <div className="w-full lg:w-80 space-y-8 flex-shrink-0">

              {/* Leaderboard */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    Leaderboard
                  </h3>
                  <button className="text-xs font-semibold text-blue-600 hover:underline">See all</button>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {LEADERBOARD_USERS.map((user, index) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className="flex items-center gap-3 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <Avatar className="h-10 w-10 border border-gray-100">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-xs bg-gray-100">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">{user.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{user.role}</p>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-gray-900 text-sm">{user.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Tags (Optional extra to fill space) */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Trending Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {["#PortfolioDesign", "#ReactJS", "#CareerTips", "#RemoteWork", "#ShowWork"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-blue-200 hover:text-blue-600 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
