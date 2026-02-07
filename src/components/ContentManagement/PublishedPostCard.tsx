import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Instagram, Linkedin, Twitter, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";

interface PublishedPost {
    id: string;
    projectId: string;
    projectName?: string;
    projectImage?: string;
    platforms: string[];
    messages: Record<string, string>;
    platformResults: Record<string, {
        postId?: string;
        url?: string;
        status: string;
        publishedAt: string;
    }>;
    status: "posted" | "partial";
    publishedAt: string;
    createdAt: string;
    scheduledPostId?: string;
    mediaUrls: string[];
    feedback?: {
        positive: number;
        negative: number;
        neutral: number;
    };
}

interface PublishedPostCardProps {
    post: PublishedPost;
}

const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform.toLowerCase()) {
        case "instagram": return <Instagram className="w-3 h-3" />;
        case "linkedin": return <Linkedin className="w-3 h-3" />;
        case "twitter": return <Twitter className="w-3 h-3" />;
        case "facebook": return <Facebook className="w-3 h-3" />;
        default: return null;
    }
};

export const PublishedPostCard = ({ post }: PublishedPostCardProps) => {
    // Determine primary content
    const primaryPlatform = post.platforms[0] || "instagram";
    const message = post.messages[primaryPlatform] || "";
    // Handle message being an object
    const messageText = typeof message === 'string'
        ? message
        : (message as any)?.message || JSON.stringify(message);

    // Feedback defaults
    const feedback = post.feedback || { positive: 0, negative: 0, neutral: 0 };

    return (
        <Card className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-slate-900 flex flex-col h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group rounded-[32px] p-1">
            <CardContent className="p-6 pb-4 flex-1 flex flex-col gap-3">
                {/* Platform Icons */}
                <div className="flex items-center gap-2 mb-[-8px]">
                    {post.platforms.map(platform => (
                        <div key={platform} className="text-slate-400 hover:text-blue-500 transition-colors">
                            <PlatformIcon platform={platform} />
                        </div>
                    ))}
                </div>

                {/* Header: Title + Badge */}
                <div className="flex justify-between items-start gap-4">
                    <h3 className="font-extrabold text-[1.15rem] leading-[1.3] text-slate-900 line-clamp-2 tracking-tight">
                        {post.projectName || "What I Learned from My Project"}
                    </h3>
                    <Badge variant="outline" className="shrink-0 border-[1.5px] border-blue-600 text-blue-700 bg-transparent rounded-full px-3 py-0.5 text-[11px] font-bold hover:bg-blue-50 transition-colors">
                        Featured
                    </Badge>
                </div>

                {/* Description */}
                <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-3 font-normal">
                    {messageText || "No description provided. This is a placeholder for the post content body."}
                </p>

                {/* Reaction Pills */}
                <div className="flex items-center gap-3 mt-auto pt-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-[14px] border border-slate-100/80 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer min-w-[60px] justify-center">
                        <span>{feedback.positive || 20}</span>
                        <span className="text-sm">🔥</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-[14px] border border-slate-100/80 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer min-w-[50px] justify-center">
                        <span>{feedback.negative || 3}</span>
                        <span className="text-sm">🎸</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-2 pb-5 flex justify-between items-center mt-auto">
                {/* Avatar Pile */}
                <div className="flex -space-x-2.5 items-center">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-7 h-7 rounded-full bg-slate-200 border-[2px] border-white overflow-hidden shadow-sm relative z-10 hover:z-20 transition-all hover:scale-105">
                            <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="avatar" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                {/* Link Action */}
                <button className="flex items-center gap-1 text-blue-700 hover:text-blue-800 text-[13px] font-bold group/link transition-colors">
                    <span>30 Comments</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5px] transition-transform group-hover/link:translate-x-0.5" />
                </button>
            </CardFooter>
        </Card>
    );
};
