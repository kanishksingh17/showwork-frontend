"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Bot,
    CheckCircle2,
    AlertTriangle,
    Lightbulb,
    ArrowRight
} from "lucide-react";

interface PortfolioInsightsCardProps {
    health: any | null;
    loading: boolean;
}

export default function PortfolioInsightsCard({
    health,
    loading
}: PortfolioInsightsCardProps) {
    const [activeTab, setActiveTab] = useState<'summary' | 'actions'>('summary');

    if (loading || !health) {
        return (
            <Card className="rounded-2xl hover:shadow-lg transition-all w-full flex flex-col border border-border bg-card overflow-hidden font-sans h-full">
                <div className="flex flex-col h-full p-4 justify-center items-center gap-2">
                    <Bot className="w-8 h-8 text-blue-200 animate-pulse" />
                    <span className="text-xs text-gray-400 font-medium">Analyzing portfolio...</span>
                </div>
            </Card>
        );
    }

    const strategies = [
        {
            type: "strength",
            text: "Strong technical stack alignment with market trends.",
            icon: CheckCircle2,
            color: "text-green-500",
            bg: "bg-green-50"
        },
        {
            type: "warning",
            text: "Resume lacks quantifiable metrics in 2 project descriptions.",
            icon: AlertTriangle,
            color: "text-amber-500",
            bg: "bg-amber-50"
        },
        {
            type: "tip",
            text: "Add a case study for your 'E-commerce' project to boost engagement.",
            icon: Lightbulb,
            color: "text-blue-500",
            bg: "bg-blue-50"
        }
    ];

    return (
        <Card className="rounded-2xl hover:shadow-lg transition-all w-full flex flex-col border border-border bg-card overflow-hidden font-sans group relative h-full">
            <div className="flex flex-col h-full p-4 relative z-10">

                {/* Header */}
                {/* Header removed as per request */}

                {/* Tabs / Toggle */}
                <div className="flex p-1 bg-gray-50 rounded-lg mb-4">
                    <button
                        onClick={() => setActiveTab('summary')}
                        className={`flex-1 text-[10px] font-semibold py-1.5 rounded-md transition-all ${activeTab === 'summary'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Summary
                    </button>
                    <button
                        onClick={() => setActiveTab('actions')}
                        className={`flex-1 text-[10px] font-semibold py-1.5 rounded-md transition-all ${activeTab === 'actions'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Action Plan
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto pr-1 -mr-1">
                    {activeTab === 'summary' ? (
                        <div className="space-y-3">
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Your portfolio demonstrates <span className="font-semibold text-gray-900">high technical competence</span>. However, the resume parsing indicates a potential gap in soft skills keywords compared to top-tier profiles.
                            </p>

                            <div className="space-y-2 pt-1">
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Key Highlights</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                                        <span className="block text-lg font-bold text-gray-900">Top 5%</span>
                                        <span className="text-[10px] text-gray-500 font-medium">in React Skills</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                                        <span className="block text-lg font-bold text-gray-900">High</span>
                                        <span className="text-[10px] text-gray-500 font-medium">Readability</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2.5">
                            {strategies.map((item, idx) => (
                                <div key={idx} className="flex gap-2.5 items-start p-2 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className={`mt-0.5 p-1 rounded-full flex-shrink-0 ${item.bg}`}>
                                        <item.icon className={`w-3 h-3 ${item.color}`} />
                                    </div>
                                    <p className="text-[11px] text-gray-600 leading-snug">
                                        {item.text}
                                    </p>
                                </div>
                            ))}

                            <Button variant="ghost" className="w-full justify-between text-[10px] h-7 px-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 mt-2">
                                View Full Report <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                    )}
                </div>

                {/* Footer or Call to Action Area just in case */}
                <div className="mt-auto pt-3 border-t border-gray-50">
                    <p className="text-[9px] text-gray-400 text-center">
                        Generated by AI based on your latest scan
                    </p>
                </div>
            </div>
        </Card>
    );
}
