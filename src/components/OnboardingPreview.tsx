import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import EnhancedOnboardingFlow from "./EnhancedOnboardingFlow";

interface OnboardingPreviewProps {
    onBack: () => void;
}

export const OnboardingPreview: React.FC<OnboardingPreviewProps> = ({ onBack }) => {
    return (
        <div className="h-full w-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden flex flex-col">
            {/* Background Gradients to match landing */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-400/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                    <Button variant="ghost" onClick={onBack} className="gap-2 text-slate-600 dark:text-slate-400">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-medium">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Interactive Demo Mode</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-6xl mx-auto py-12 px-6">
                        <EnhancedOnboardingFlow
                            user={{ name: "Guest User" }}
                            onComplete={(data) => console.log("Onboarding complete", data)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
