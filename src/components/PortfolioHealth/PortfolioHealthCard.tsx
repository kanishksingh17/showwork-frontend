"use client";

import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    RefreshCw,
    Brain,
    Share2,
    Download,
    Calendar,
    TrendingUp,
    Award,
    Code,
    Star,
    Target,
    Briefcase,
    AlertCircle,
} from "lucide-react";
// import { PortfolioHealthResponse } from "@/hooks/usePortfolioHealth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PortfolioHealthCardProps {
    health: any | null;
    loading: boolean;
    error?: string | null;
    onRecompute: () => void;
    userName?: string;
    userUsername?: string;
    userAvatar?: string;
    userBio?: string;
}

export default function PortfolioHealthCard({
    health,
    loading,
    error,
    onRecompute,
    userName,
    userUsername,
    userAvatar,
    userBio,
}: PortfolioHealthCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async () => {
        if (cardRef.current === null) {
            return;
        }

        setIsSharing(true);

        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true });
            const link = document.createElement("a");
            link.download = `portfolio-health-${new Date().toISOString().split("T")[0]}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Failed to share portfolio health card", err);
        } finally {
            setIsSharing(false);
        }
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Excellent":
                return "bg-green-100 text-green-800 border-green-200";
            case "Good":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "Fair":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Needs Work":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 85) return "text-green-600";
        if (score >= 70) return "text-blue-600";
        if (score >= 50) return "text-yellow-600";
        return "text-red-600";
    };

    const getProgressColor = (score: number) => {
        if (score >= 85) return "bg-green-500";
        if (score >= 70) return "bg-blue-500";
        if (score >= 50) return "bg-yellow-500";
        return "bg-red-500";
    };

    if (loading && !health) {
        return (
            <Card className="rounded-2xl hover:shadow-md transition-all w-full flex flex-col h-full border-gray-200">
                <CardHeader className="flex items-center justify-between pb-2 flex-shrink-0">
                    <div>
                        <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                            Portfolio Health
                            <Badge variant="outline" className="text-[10px] font-normal">
                                AI Analysis
                            </Badge>
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-xs text-gray-500">Analyzing your portfolio...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error || !health) {
        return (
            <Card className="rounded-2xl hover:shadow-md transition-all w-full flex flex-col h-full border-gray-200">
                <CardHeader className="flex items-center justify-between pb-2 flex-shrink-0">
                    <CardTitle className="text-sm font-semibold text-gray-900">
                        Portfolio Health
                    </CardTitle>
                    <Button size="sm" onClick={onRecompute} className="h-7 w-7 p-0 rounded-full">
                        <RefreshCw className="w-3.5 h-3.5" />
                    </Button>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col items-center justify-center text-gray-400">
                    <AlertCircle className="h-8 w-8 mb-2 text-gray-300" />
                    <p className="text-xs mb-4 text-center max-w-[180px]">
                        {error || "No health data available yet"}
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onRecompute}
                        className="text-xs"
                    >
                        Generate Analysis
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="rounded-2xl hover:shadow-md transition-all w-full flex flex-col h-full border-gray-200 overflow-hidden group">
            <div ref={cardRef} className="bg-white flex flex-col h-full">
                <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
                    <div className="flex flex-col gap-1">
                        <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                            Portfolio Health
                            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        </CardTitle>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleShare}
                            disabled={isSharing}
                            className="h-8 w-8 p-0 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            title="Share Health Card"
                        >
                            {isSharing ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current" />
                            ) : (
                                <Share2 className="w-4 h-4" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onRecompute}
                            disabled={loading}
                            className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 transition-colors"
                            title="Refresh Analysis"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="pt-2 flex-1 flex flex-col gap-4">
                    {/* User Info & Score */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                <AvatarImage src={userAvatar} alt={userName} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                                    {userName?.substring(0, 2).toUpperCase() || "ME"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">
                                    {userName || "Developer"}
                                </span>
                                <span className="text-[10px] text-gray-500">
                                    @{userUsername || "username"}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-baseline gap-1">
                                <span className={`text-3xl font-bold ${getScoreColor(health.overall)}`}>
                                    {health.overall}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">/100</span>
                            </div>
                            <Badge
                                variant="outline"
                                className={`text-[10px] px-2 py-0 h-5 ${getStatusColor(health.status)}`}
                            >
                                {health.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {Object.entries(health.breakdown).map(([key, score]) => {
                            const labels: Record<string, string> = {
                                technicalSkills: "Tech Skills",
                                projectQuality: "Projects",
                                portfolioPresentation: "Presentation",
                                experience: "Experience",
                                industryAlignment: "Alignment",
                                certifications: "Certs",
                            };

                            const icons: Record<string, React.ReactNode> = {
                                technicalSkills: <Code className="w-3 h-3" />,
                                projectQuality: <Star className="w-3 h-3" />,
                                portfolioPresentation: <Target className="w-3 h-3" />,
                                experience: <Briefcase className="w-3 h-3" />,
                                industryAlignment: <TrendingUp className="w-3 h-3" />,
                                certifications: <Award className="w-3 h-3" />,
                            };

                            return (
                                <div key={key} className="space-y-1">
                                    <div className="flex items-center justify-between text-[10px]">
                                        <div className="flex items-center gap-1.5 text-gray-600">
                                            {icons[key]}
                                            <span>{labels[key]}</span>
                                        </div>
                                        <span className={`font-medium ${getScoreColor(score)}`}>
                                            {score}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(score)}`}
                                            style={{ width: `${score}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Top Recommendation */}
                    {health.recommendedImprovements && health.recommendedImprovements.length > 0 && (
                        <div className="mt-auto bg-blue-50/50 rounded-xl p-3 border border-blue-100">
                            <div className="flex items-center gap-2 mb-1.5">
                                <Brain className="w-3.5 h-3.5 text-blue-600" />
                                <span className="text-xs font-semibold text-blue-900">
                                    AI Insight
                                </span>
                            </div>
                            <p className="text-[10px] text-blue-700 leading-relaxed line-clamp-2">
                                {health.recommendedImprovements[0]}
                            </p>
                        </div>
                    )}
                </CardContent>
            </div>
        </Card>
    );
}
