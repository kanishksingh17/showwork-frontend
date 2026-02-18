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
    BadgeCheck,
    Flame,
    TrendingUp,
    Eye,
    Sparkles,
    Lock,
    Mail,
    Globe,
    Pencil,
    Check,
    Palette,
    X,
    FolderGit,
    GitFork,
    Star,
} from "lucide-react";
import { FaFigma } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming Textarea component exists, if not use native or Input
import { cn } from "@/lib/utils";
import axios from "axios";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000") + "/api";

// Mock Data for Activities (Notifications)
const MOCK_NOTIFICATIONS = [
    {
        id: "1",
        type: "profile_view",
        actorName: "Sarah Chen",
        actorAvatar: "https://i.pravatar.cc/150?u=sarah",
        createdAt: new Date().toISOString(),
        isRead: false,
    },
    {
        id: "2",
        type: "follow",
        actorName: "Alex Rivers",
        actorAvatar: "https://i.pravatar.cc/150?u=alex",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        isRead: true,
    },
    {
        id: "3",
        type: "comment",
        actorName: "Marcus Thorne",
        actorAvatar: "https://i.pravatar.cc/150?u=marcus",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        isRead: true,
    }
];

// Mock Data for Portfolio
const MOCK_PORTFOLIO = {
    title: "Full Stack Developer Portfolio 2024",
    description: "A comprehensive showcase of my journey building scalable web applications and AI-driven tools. Featuring real-world impact and high-performance code.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    stats: [
        { label: "Views", value: "12.4k" },
        { label: "Stars", value: "850" },
        { label: "Updated", value: "2 days ago" }
    ],
    tech: ["React", "Go", "PostgreSQL", "Tailwind", "OpenAI"]
};

// Generate Mock Contribution Data
const generateContributionData = () => {
    const data = [];
    const today = new Date();
    const platforms = ['github', 'linkedin', 'showwork'];
    for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (364 - i));
        // Random activity level 0-4
        const level = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;
        const platform = level > 0 ? platforms[Math.floor(Math.random() * platforms.length)] : null;
        data.push({ date, level, platform });
    }
    return data;
};
const CONTRIBUTION_DATA = generateContributionData();

// Mock Data for Projects (Repositories)
const MOCK_PROJECTS = [
    {
        title: "ShowWork",
        description: "A platform for developers to showcase their work and get hired. Built with React, Go, and AI integration.",
        language: "TypeScript",
        languageColor: "bg-blue-500",
        stars: 124,
        forks: 45,
        updated: "2d ago"
    },
    {
        title: "AI-Code-Assistant",
        description: "An AI-powered coding assistant that helps you write better code faster. Integrates with VS Code.",
        language: "Python",
        languageColor: "bg-yellow-500",
        stars: 89,
        forks: 12,
        updated: "1w ago"
    },
    {
        title: "E-Commerce-Dashboard",
        description: "A comprehensive dashboard for managing online stores with real-time analytics and inventory tracking.",
        language: "React",
        languageColor: "bg-cyan-500",
        stars: 256,
        forks: 67,
        updated: "3d ago"
    },
    {
        title: "Data-Viz-Lib",
        description: "A lightweight, zero-dependency library for creating beautiful and interactive charts on the web.",
        language: "JavaScript",
        languageColor: "bg-yellow-400",
        stars: 512,
        forks: 123,
        updated: "1mo ago"
    },
    {
        title: "Go-Backend-Template",
        description: "A production-ready Go backend template with authentication, database integration, and Docker support.",
        language: "Go",
        languageColor: "bg-cyan-600",
        stars: 1024,
        forks: 345,
        updated: "2mo ago"
    },
    {
        title: "Portfolio-Next",
        description: "My personal portfolio website built with Next.js and Tailwind CSS. Fully responsive and accessible.",
        language: "TypeScript",
        languageColor: "bg-blue-500",
        stars: 45,
        forks: 5,
        updated: "3mo ago"
    }
];

// Mock Data for Timeline (Interactions)
const ACTIVITIES: any[] = [];

interface UserProfileViewProps {
    user: any;
    onBack?: () => void;
    mode?: "owner" | "public";
}

export function UserProfileView({ user, onBack, mode = "public" }: UserProfileViewProps) {
    const [activeTab, setActiveTab] = useState("Interactions");
    const [activities, setActivities] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    // Portfolio Customization State
    const [portfolioTitle, setPortfolioTitle] = useState(() => {
        return localStorage.getItem("portfolio_title") || "Experienced software engineer & creative developer driven to build high-impact and scalable digital products.";
    });
    const [cardTheme, setCardTheme] = useState<"blue" | "purple" | "green" | "orange">(() => {
        return (localStorage.getItem("portfolio_theme") as "blue" | "purple" | "green" | "orange") || "blue";
    });
    const [isEditingPortfolio, setIsEditingPortfolio] = useState(false);

    // Persist customizations
    React.useEffect(() => {
        localStorage.setItem("portfolio_title", portfolioTitle);
    }, [portfolioTitle]);

    React.useEffect(() => {
        localStorage.setItem("portfolio_theme", cardTheme);
    }, [cardTheme]);

    const THEMES = {
        blue: {
            primary: "bg-blue-100/50",
            secondary: "bg-cyan-100/40",
            text: "text-gray-900/90", // Made very dark/black
            button: "bg-blue-600/90 hover:bg-blue-500",
            border: "border-blue-200",
            shadow: "shadow-[0_20px_50px_rgba(37,99,235,0.1)]",
            indicator: "bg-blue-500"
        },
        purple: {
            primary: "bg-purple-100/50",
            secondary: "bg-pink-100/40",
            text: "text-gray-900/90",
            button: "bg-purple-600/90 hover:bg-purple-500",
            border: "border-purple-200",
            shadow: "shadow-[0_20px_50px_rgba(147,51,234,0.1)]",
            indicator: "bg-purple-500"
        },
        green: {
            primary: "bg-green-100/50",
            secondary: "bg-emerald-100/40",
            text: "text-gray-900/90",
            button: "bg-green-600/90 hover:bg-green-500",
            border: "border-green-200",
            shadow: "shadow-[0_20px_50px_rgba(22,163,74,0.1)]",
            indicator: "bg-green-500"
        },
        orange: {
            primary: "bg-orange-100/50",
            secondary: "bg-yellow-100/40",
            text: "text-gray-900/90",
            button: "bg-orange-600/90 hover:bg-orange-500",
            border: "border-orange-200",
            shadow: "shadow-[0_20px_50px_rgba(234,88,12,0.1)]",
            indicator: "bg-orange-500"
        }
    };
    const currentTheme = THEMES[cardTheme];

    const filterRole = (role: string) => {
        if (!role) return "DEV";
        return role.toUpperCase();
    };

    React.useEffect(() => {
        if (activeTab === "Activities") {
            fetchActivities();
        }
    }, [activeTab]);

    const fetchActivities = async () => {
        setLoading(true);
        try {
            const resp = await axios.get(`${API_BASE}/activities`, { withCredentials: true });
            if (resp.data.success) {
                const fetchedNotes = resp.data.data || [];
                setActivities(fetchedNotes);

                // Mark as read if there are unread notifications
                const unreadIds = fetchedNotes.filter((n: any) => !n.isRead).map((n: any) => n.id);
                if (unreadIds.length > 0) {
                    await axios.patch(`${API_BASE}/activities/read`, { ids: unreadIds }, { withCredentials: true });
                }
            }
        } catch (err) {
            console.error("Failed to fetch activities:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatActivityText = (a: any) => {
        switch (a.type) {
            case "profile_view":
                return { text: "viewed your profile", icon: Eye, color: "text-blue-600", bg: "bg-blue-50" };
            case "follow":
                return { text: "started following you", icon: Plus, color: "text-green-600", bg: "bg-green-50" };
            case "comment":
                return { text: "commented on your project", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" };
            case "portfolio_view":
                return { text: "viewed your portfolio", icon: ExternalLink, color: "text-orange-600", bg: "bg-orange-50" };
            default:
                return { text: "interacted with you", icon: Bell, color: "text-gray-600", bg: "bg-gray-50" };
        }
    };

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
                    <Avatar className="h-8 w-8 ml-2 border border-gray-200">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {/* Profile & Tabs Bar */}
            <div className="bg-white border-b border-gray-200 px-8 pt-6">
                <div className={cn(
                    "transition-all duration-500 ease-in-out overflow-hidden",
                    activeTab === "Portfolio" || activeTab === "Projects"
                        ? "h-0 opacity-0 mb-0 translate-y-[-20px]"
                        : "h-auto opacity-100 mb-8 translate-y-0"
                )}>
                    <div className="flex items-start gap-6">
                        <Avatar className="w-20 h-20 border-4 border-white shadow-sm ring-1 ring-gray-100">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xl">{user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 pt-1">
                            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                            <p className="text-gray-500">{user.role}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1">
                                    {user.points || "0"} points
                                </Badge>
                                <div className="flex flex-col gap-1.5 min-w-[200px]">
                                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                        <span>Level {user.level || "1"} Contributor</span>
                                        <span>{user.levelProgress || "0"}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                            style={{ width: `${user.levelProgress || 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 rounded-full border border-orange-100 text-xs font-bold transition-all hover:scale-105">
                                    <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                                    <span>{user.streak || "0"} day build streak</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {mode === "owner" ? (
                                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 px-6">
                                    Edit Profile
                                </Button>
                            ) : (
                                <>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Follow</Button>
                                    <Button variant="outline" className="border-gray-200">Message</Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8 -mb-px overflow-x-auto no-scrollbar">
                    {["Interactions", "Activities", "Portfolio", "Projects"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
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

                    {activeTab === "Activities" ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto">
                                    Mark all as read
                                </Button>
                            </div>

                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : (activities.length > 0 ? activities : MOCK_NOTIFICATIONS).map((activity) => {
                                const info = formatActivityText(activity);
                                return (
                                    <div key={activity.id} className={cn(
                                        "group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300",
                                        activity.isRead
                                            ? "bg-white border-gray-100 hover:border-gray-200"
                                            : "bg-blue-50/30 border-blue-100/50 hover:bg-blue-50/50"
                                    )}>
                                        <div className="relative">
                                            <Avatar className="h-12 w-12 ring-2 ring-white">
                                                <AvatarImage src={activity.actorAvatar} />
                                                <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200">
                                                    {activity.actorName?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className={cn(
                                                "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center",
                                                info.bg
                                            )}>
                                                <info.icon className={cn("w-3 h-3", info.color)} />
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                                                    {activity.actorName || "Someone"}
                                                </span>
                                                <span className="text-gray-600">{info.text}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                                <span>{new Date(activity.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                                <span>•</span>
                                                <span>{new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {activity.type === "follow" && (
                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8">
                                                    Follow Back
                                                </Button>
                                            )}
                                            {activity.type === "profile_view" && (
                                                <Button variant="outline" size="sm" className="h-8 border-gray-200 text-gray-600">
                                                    View Profile
                                                </Button>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {!activity.isRead && (
                                            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : activeTab === "Portfolio" ? (
                        <div className="animate-in fade-in zoom-in-95 duration-700">
                            {/* Minimalist Portfolio Card */}
                            <Card className={cn(
                                "relative overflow-hidden border-none bg-white rounded-[40px] aspect-[16/8] flex flex-col p-10 min-h-[500px] transition-all duration-500",
                                currentTheme.shadow
                            )}>
                                {/* Background Ambient Glows */}
                                <div className={cn("absolute top-0 right-0 w-[400px] h-[400px] blur-[120px] rounded-full -mr-20 -mt-20 z-0 transition-colors duration-500", currentTheme.primary)} />
                                <div className={cn("absolute bottom-0 left-1/3 w-[300px] h-[300px] blur-[100px] rounded-full z-0 transition-colors duration-500", currentTheme.secondary)} />

                                {/* Header */}
                                <div className="relative z-10 flex items-center justify-between text-[13px] font-medium text-gray-500 uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex h-2 w-2">
                                                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", currentTheme.indicator)}></span>
                                                <span className={cn("relative inline-flex rounded-full h-2 w-2", currentTheme.indicator)}></span>
                                            </div>
                                            <span className="text-gray-900 font-bold tracking-normal capitalize">Live Preview Available</span>
                                        </div>
                                    </div>

                                    {/* Edit Controls */}
                                    {mode === "owner" && (
                                        <div className="flex items-center gap-2">
                                            {isEditingPortfolio ? (
                                                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-1 rounded-full border border-gray-200 shadow-sm">
                                                    <div className="flex items-center gap-1 px-2 border-r border-gray-200">
                                                        {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((color) => (
                                                            <button
                                                                key={color}
                                                                onClick={() => setCardTheme(color)}
                                                                className={cn(
                                                                    "w-4 h-4 rounded-full border border-white shadow-sm transition-transform hover:scale-125",
                                                                    THEMES[color].indicator,
                                                                    cardTheme === color && "ring-2 ring-gray-900 ring-offset-1"
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                    <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full hover:bg-green-50 text-green-600" onClick={() => setIsEditingPortfolio(false)}>
                                                        <Check className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 gap-2 text-gray-400 hover:text-gray-900 hover:bg-white/50"
                                                    onClick={() => setIsEditingPortfolio(true)}
                                                >
                                                    <Palette className="w-3.5 h-3.5" />
                                                    <span className="text-[10px] tracking-widest font-bold">CUSTOMIZE</span>
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Main Content */}
                                <div className="relative z-10 flex-1 flex items-center justify-center">
                                    {/* Left stylized card - Minimal Abstract Version */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 group scale-110">
                                        <div className="relative w-[180px] h-[220px] rounded-[30px] flex items-center justify-center transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105">
                                            {/* Removed Image, only abstract button remains */}
                                            <div className="absolute inset-0 bg-gray-200/80 backdrop-blur-sm rounded-[30px] border border-gray-300" />

                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <button className={cn(
                                                    "relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]",
                                                    currentTheme.button
                                                )}>
                                                    <ExternalLink className="w-6 h-6 z-10" />
                                                    <svg className="absolute w-28 h-28 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                                                        <path
                                                            id="circlePath"
                                                            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                                                            fill="none"
                                                        />
                                                        <text className="text-[9px] uppercase font-bold tracking-[0.2em] fill-gray-900">
                                                            <textPath xlinkHref="#circlePath">Click to Open Preview • View Live Demo • </textPath>
                                                        </text>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center Bio */}
                                    <div className="max-w-md text-center relative group/edit">
                                        {isEditingPortfolio ? (
                                            <div className="relative animate-in fade-in zoom-in-95">
                                                <textarea
                                                    value={portfolioTitle}
                                                    onChange={(e) => setPortfolioTitle(e.target.value)}
                                                    className="w-full bg-transparent text-xl md:text-2xl font-semibold text-gray-900 text-center border-b-2 border-blue-500 focus:outline-none resize-none p-2 min-h-[120px]"
                                                    autoFocus
                                                />
                                                <p className="text-xs text-gray-400 mt-2 font-medium tracking-wide uppercase">Editing Tagline</p>
                                            </div>
                                        ) : (
                                            <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-snug break-words">
                                                {portfolioTitle}
                                                {mode === "owner" && (
                                                    <button
                                                        onClick={() => setIsEditingPortfolio(true)}
                                                        className="inline-flex ml-2 opacity-0 group-hover/edit:opacity-100 transition-opacity text-gray-300 hover:text-blue-500"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </p>
                                        )}
                                    </div>

                                    {/* Large background typography */}
                                    <div className="absolute bottom-0 right-0 text-right select-none pointer-events-none opacity-20">
                                        <h1 className={cn(
                                            "text-[100px] font-black leading-[0.85] tracking-tighter -mr-4 -mb-4 transition-colors duration-500 uppercase",
                                            currentTheme.text
                                        )}>
                                            {user.role ? (
                                                user.role.split(" ").length > 1 ? (
                                                    <>
                                                        {user.role.split(" ")[0]}<br />
                                                        {user.role.split(" ").slice(1).join(" ")}
                                                    </>
                                                ) : (
                                                    filterRole(user.role)
                                                )
                                            ) : (
                                                <>DIGITAL<br />DEV</>
                                            )}
                                        </h1>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ) : activeTab === "Projects" ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 -mt-2">

                            {/* Top Stats Row */}
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                                {[
                                    { label: "Commits", value: "260" },
                                    { label: "Pull Requests", value: "102" },
                                    { label: "Repositories", value: "10" },
                                    { label: "Stars", value: "10k" },
                                    { label: "Followers", value: "21k" },
                                    { label: "Following", value: "0" },
                                ].map((stat) => (
                                    <div key={stat.label} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{stat.label}</div>
                                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Popular Repositories Title */}
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Popular Repositories</h3>

                            {/* Projects Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {MOCK_PROJECTS.slice(0, 4).map((project, index) => (
                                    <Card
                                        key={index}
                                        className="p-6 bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col justify-between min-h-[160px]"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <FolderGit className="w-4 h-4 text-gray-400" />
                                                    <a href="#" className="font-semibold text-blue-600 text-lg hover:underline group-hover:text-blue-700">
                                                        {project.title}
                                                    </a>
                                                    <span className="px-2 py-0.5 rounded-full border border-gray-200 text-[10px] font-medium text-gray-500 bg-gray-50">Public</span>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ExternalLink className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                                                </div>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-6 text-xs text-gray-500 mt-auto">
                                            <div className="flex items-center gap-1.5">
                                                <div className={cn("w-3 h-3 rounded-full", project.languageColor)} />
                                                <span>{project.language}</span>
                                            </div>
                                            <div className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                                                <Star className="w-4 h-4" />
                                                <span>{project.stats ? project.stats.stars : project.stars}</span>
                                            </div>
                                            <div className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                                                <GitFork className="w-3.5 h-3.5" />
                                                <span>{project.stats ? project.stats.forks : project.forks}</span>
                                            </div>
                                            <span className="ml-auto text-gray-400">Updated {project.updated}</span>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {MOCK_PROJECTS.length > 4 && (
                                <div className="flex justify-center mt-4">
                                    <Button variant="outline" className="text-sm text-gray-600 border-gray-300 hover:bg-gray-50">
                                        View All Repositories
                                    </Button>
                                </div>
                            )}

                            {/* Contribution Activity Map */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-gray-900">Contribution Activity</h3>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-sm bg-gray-50 border border-gray-100" />
                                            <span>No activity</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>Activity:</span>
                                            <Github className="w-3 h-3 text-gray-900" />
                                            <Linkedin className="w-3 h-3 text-blue-700" />
                                            <img src="/favicon.svg" className="w-3 h-3 opacity-90" alt="ShowWork" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex flex-col gap-1 pt-6 text-[10px] text-gray-400 font-medium text-right pr-2">
                                        <span className="h-4 flex items-center">Sun</span>
                                        <span className="h-4 flex items-center">Mon</span>
                                        <span className="h-4 flex items-center">Tue</span>
                                        <span className="h-4 flex items-center">Wed</span>
                                        <span className="h-4 flex items-center">Thu</span>
                                        <span className="h-4 flex items-center">Fri</span>
                                        <span className="h-4 flex items-center">Sat</span>
                                    </div>
                                    <div className="flex gap-1 overflow-x-auto pb-4 no-scrollbar pt-6 flex-1">
                                        {Array.from({ length: 53 }).map((_, weekIndex) => {
                                            const startDate = CONTRIBUTION_DATA[weekIndex * 7]?.date;
                                            const prevStartDate = weekIndex > 0 ? CONTRIBUTION_DATA[(weekIndex - 1) * 7]?.date : null;
                                            const showMonth = startDate && (weekIndex === 0 || (prevStartDate && startDate.getMonth() !== prevStartDate.getMonth()));
                                            const monthLabel = showMonth ? startDate.toLocaleString('default', { month: 'short' }) : "";

                                            return (
                                                <div key={weekIndex} className="flex flex-col gap-1 relative">
                                                    {showMonth && (
                                                        <>
                                                            <div className="absolute -top-8 left-0 z-10">
                                                                <span className="px-1.5 py-0.5 rounded border border-gray-200 bg-white text-[10px] font-medium text-gray-500 shadow-sm whitespace-nowrap">
                                                                    {monthLabel}
                                                                </span>
                                                            </div>
                                                            {weekIndex > 0 && (
                                                                <div className="absolute -top-2 bottom-0 -left-1 w-px border-l border-dashed border-gray-300 h-[calc(100%+8px)] pointer-events-none opacity-50" />
                                                            )}
                                                        </>
                                                    )}
                                                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                                                        const dataIndex = weekIndex * 7 + dayIndex;
                                                        const dayData = CONTRIBUTION_DATA[dataIndex] || { level: 0 };

                                                        // Icon Mapping
                                                        const PlatformIcon =
                                                            dayData.platform === 'github' ? Github :
                                                                dayData.platform === 'linkedin' ? Linkedin :
                                                                    null;

                                                        const iconColor =
                                                            dayData.platform === 'github' ? 'text-gray-900' :
                                                                dayData.platform === 'linkedin' ? 'text-blue-700' :
                                                                    'text-gray-400';

                                                        return (
                                                            <div
                                                                key={dayIndex}
                                                                className={cn(
                                                                    "w-4 h-4 rounded-[4px] flex items-center justify-center transition-all hover:ring-2 hover:ring-blue-100 hover:z-10 relative cursor-pointer",
                                                                    dayData.level === 0 ? "bg-gray-50" : "bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                                                                )}
                                                                title={`${dayData.platform ? dayData.platform : 'No'} activity on ${dayData.date ? dayData.date.toDateString() : 'Date'}`}
                                                            >
                                                                {dayData.platform === 'showwork' ? (
                                                                    <img src="/favicon.svg" className="w-full h-full object-cover rounded-[3px]" alt="ShowWork" />
                                                                ) : PlatformIcon && (
                                                                    <PlatformIcon className={cn("w-2.5 h-2.5", iconColor)} />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
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
                                {ACTIVITIES.length > 0 ? (
                                    <>
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
                                                                {activity.participants.map((p: string, i: number) => (
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
                                    </>
                                ) : (
                                    <div className="relative">
                                        {/* Vertical Line Stem */}
                                        <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gray-200" />

                                        <div className="relative flex gap-6 group">
                                            {/* Left Icon Node (Timeline Style) */}
                                            <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-sm border-4 border-slate-50 shrink-0 bg-white">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50/50">
                                                    <Plus className="w-5 h-5 text-blue-600" />
                                                </div>
                                            </div>

                                            {/* Content Card (Timeline Style) */}
                                            <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                                <div className="space-y-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Start your journey</h3>
                                                        <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                                                            Your timeline is currently empty. Begin documenting your proof of work,
                                                            milestones, and real-world impact to build your developer presence.
                                                        </p>
                                                    </div>
                                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-6 h-10 rounded-lg shadow-md shadow-blue-500/10 transition-all hover:scale-[1.02] active:scale-95">
                                                        <Plus className="w-4 h-4" /> Create First Update
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
