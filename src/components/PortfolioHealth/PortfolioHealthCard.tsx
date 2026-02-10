"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    MoreHorizontal,
    RefreshCw,
    Calendar,
    AlertCircle,
} from "lucide-react";

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
}: PortfolioHealthCardProps) {



    if (loading && !health) {
        return (
            <Card className="rounded-xl hover:shadow-md transition-all w-full flex flex-col h-full border-gray-200">
                <CardHeader className="flex items-center justify-between pb-2 flex-shrink-0 p-4">
                    <div>
                        <CardTitle className="text-xs font-semibold text-gray-900 flex items-center gap-2">
                            Portfolio Health
                            <Badge variant="outline" className="text-[9px] font-normal px-1 py-0 h-4">
                                AI Analysis
                            </Badge>
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex items-center justify-center p-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <p className="text-[10px] text-gray-500">Analyzing...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error || !health) {
        return (
            <Card className="rounded-xl hover:shadow-md transition-all w-full flex flex-col h-full border-gray-200">
                <CardHeader className="flex items-center justify-between pb-2 flex-shrink-0 p-4">
                    <CardTitle className="text-xs font-semibold text-gray-900">
                        Portfolio Health
                    </CardTitle>
                    <Button size="sm" onClick={onRecompute} className="h-6 w-6 p-0 rounded-full">
                        <RefreshCw className="w-3 h-3" />
                    </Button>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col items-center justify-center text-gray-400 p-4">
                    <AlertCircle className="h-6 w-6 mb-2 text-gray-300" />
                    <p className="text-[10px] mb-3 text-center max-w-[150px]">
                        {error || "No data"}
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onRecompute}
                        className="text-[10px] h-7 px-2"
                    >
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const getTimeAgo = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
        return Math.floor(seconds) + "s ago";
    };

    const getInsight = (overall: number, ats: number) => {
        if (overall >= 80 && ats >= 80) return "Excellent! Ready to apply.";
        if (overall >= 80 && ats < 70) return "Strong portfolio, optimize resume.";
        if (ats >= 80 && overall < 70) return "Good resume, improve projects.";
        if (overall < 60) return "Focus on adding quality projects.";
        return "Keep improving your profile.";
    };

    // Colors for the breakdown rings - Blue/Pink/Orange theme from image
    const ringColors = [
        { stroke: "#6366f1", bg: "#e0e7ff" }, // Indigo/Blue
        { stroke: "#ec4899", bg: "#fce7f3" }, // Pink
        { stroke: "#f97316", bg: "#ffedd5" }, // Orange
    ];

    // Select top 3 metrics or specific ones to display in rings
    const availableMetrics = Object.entries(health.breakdown || {});
    const topMetrics = availableMetrics
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 3);

    // Fallback if no metrics
    if (topMetrics.length === 0) {
        topMetrics.push(["overall", health.overall]);
    }

    const metricLabels: Record<string, string> = {
        technicalSkills: "Tech Skills",
        projectQuality: "Projects",
        portfolioPresentation: "Presentation",
        experience: "Experience",
        industryAlignment: "Alignment",
        certifications: "Certs",
        overall: "Overall"
    };

    return (
        <Card className="rounded-2xl hover:shadow-lg transition-all w-full flex flex-col border border-border bg-card overflow-hidden font-sans group relative h-full">
            <div className="flex flex-col h-full p-4 relative z-10">

                {/* Header - Compact with Insight */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                            <h2 className="text-sm font-bold text-gray-900 tracking-tight">Portfolio Health</h2>
                            <MoreHorizontal className="w-4 h-4 text-gray-300 cursor-pointer hover:text-gray-600 transition-colors" />
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium border-l-2 border-blue-500 pl-1.5 leading-tight max-w-[140px]">
                            {getInsight(health.overall, health.atsScore || Math.round(health.overall * 0.9))}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-[9px] text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded border border-gray-100/50">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            {getTimeAgo(new Date())}
                        </div>
                    </div>
                </div>

                {/* Top Stats Row - Health Left, ATS Gauge Right */}
                <div className="flex items-end justify-between mb-2 px-0.5">
                    {/* Left: Overall Health */}
                    <div className="flex flex-col gap-0 mb-1">
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-3xl font-bold text-gray-900 tracking-tighter">
                                {health.overall}
                            </span>
                            <span className="text-sm text-gray-400 font-medium font-sans">/100</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium tracking-wide">Overall Health</span>
                    </div>

                    {/* Right: ATS Score Speed Dial */}
                    <div className="flex flex-col items-center relative gap-0 -mb-1">
                        <div className="relative w-24 h-12">
                            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                                <defs>
                                    <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                                        <rect width="2" height="4" transform="translate(0,0)" fill="#e5e7eb" />
                                    </pattern>
                                </defs>

                                {/* Background Arc (Hatched) */}
                                <path
                                    d="M 10 50 A 40 40 0 0 1 90 50"
                                    fill="none"
                                    stroke="url(#diagonalHatch)"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                />

                                {/* Value Arc (Solid Dark) */}
                                <path
                                    d="M 10 50 A 40 40 0 0 1 90 50"
                                    fill="none"
                                    stroke="#1f2937"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    strokeDasharray="126"
                                    strokeDashoffset={126 - (126 * (health.atsScore || Math.round(health.overall * 0.9)) / 100)}
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                        </div>
                        {/* Score Text */}
                        <div className="flex items-baseline gap-0.5 -mt-2">
                            <span className="text-sm font-bold text-gray-900">
                                {health.atsScore || Math.round(health.overall * 0.9)}
                            </span>
                            <span className="text-[9px] text-gray-400 font-medium">%</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-medium tracking-wide">ATS Score</span>
                    </div>
                </div>

                {/* Bottom Section: Breakdown List (Right) + Concentric Rings (Left) */}
                <div className="flex items-center justify-between gap-4 mt-auto">

                    {/* Concentric Rings - Left Aligned */}
                    <div className="flex justify-start relative py-1 pr-2">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90 transform overflow-visible">
                                {topMetrics.map(([key, score], index) => {
                                    const radius = 80 - (index * 22);
                                    const circumference = 2 * Math.PI * radius;
                                    const color = ringColors[index % ringColors.length];

                                    return (
                                        <React.Fragment key={key}>
                                            {/* Background Ring */}
                                            <circle
                                                cx="100"
                                                cy="100"
                                                r={radius}
                                                fill="none"
                                                stroke={color.stroke}
                                                strokeWidth="14"
                                                strokeLinecap="round"
                                                className="opacity-10"
                                            />
                                            {/* Progress Ring */}
                                            <circle
                                                cx="100"
                                                cy="100"
                                                r={radius}
                                                fill="none"
                                                stroke={color.stroke}
                                                strokeWidth="14"
                                                strokeLinecap="round"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={circumference - (circumference * (score as number)) / 100}
                                                className="transition-all duration-1000 ease-out"
                                            />
                                        </React.Fragment>
                                    );
                                })}
                            </svg>

                            {/* Tooltip Overlay - Smaller & Over the chart */}
                            {topMetrics.length > 0 && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm z-20 flex flex-col items-center">
                                    <span className="text-[10px] font-bold text-gray-900">
                                        {(topMetrics[0][1] as number)}%
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Metrics Breakdown List - Compact & Right Aligned */}
                    <div className="flex flex-col gap-2 flex-1">
                        {topMetrics.map(([key, score], index) => {
                            const color = ringColors[index % ringColors.length];
                            return (
                                <div key={key} className="flex items-center justify-between group/item">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-2 h-2 rounded-[2px]"
                                            style={{ backgroundColor: color.stroke }}
                                        />
                                        <span className="text-[10px] font-semibold text-gray-600 truncate max-w-[80px]">
                                            {metricLabels[key]}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-900 font-bold w-6 text-right">
                                            {(score as number)}
                                        </span>
                                        <span className="text-[9px] text-gray-400 font-medium">
                                            %
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </Card>
    );
}
