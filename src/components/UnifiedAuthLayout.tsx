import React from "react";
import { cn } from "@/lib/utils";

interface UnifiedAuthLayoutProps {
    children: React.ReactNode;
    leftPanelContent: React.ReactNode;
    backgroundImage?: string;
    className?: string; // For the right panel wrapper
    contentClassName?: string; // For the inner content wrapper
}

export const UnifiedAuthLayout: React.FC<UnifiedAuthLayoutProps> = ({
    children,
    leftPanelContent,
    className,
    contentClassName,
}) => {
    return (
        <div className="h-screen bg-slate-100 dark:bg-slate-950 flex flex-row overflow-hidden">
            {/* Left Panel - Dark Background with Animated Shapes - Acting as Sidebar */}
            <div className="hidden lg:block relative w-1/2 h-full bg-slate-900 text-white overflow-hidden transition-all duration-300 ease-in-out">
                <div className="absolute inset-0 z-0">
                    {/* Animated Shapes */}
                    <div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-[30%] opacity-[0.04] blur-[50px] animate-pulse"
                        style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500 rounded-[30%] opacity-[0.04] blur-[50px] animate-pulse"
                        style={{ animationDelay: "-10s" }}
                    ></div>
                    <div
                        className="absolute top-10 right-10 w-64 h-64 bg-blue-400 rounded-[30%] opacity-[0.04] blur-[50px] animate-pulse"
                        style={{ animationDelay: "-5s" }}
                    ></div>
                    <div
                        className="absolute bottom-5 left-5 w-72 h-72 bg-indigo-400 rounded-[30%] opacity-[0.04] blur-[50px] animate-pulse"
                        style={{ animationDelay: "-15s" }}
                    ></div>
                </div>

                <div className="relative z-10 flex flex-col h-full p-12 justify-center">
                    {leftPanelContent}
                </div>
            </div>

            {/* Right Panel - Clean Light Background for Content - Acting as Main Window */}
            <div
                className={cn(
                    "flex-1 w-full min-w-0 bg-white dark:bg-slate-900 overflow-y-auto flex items-start justify-center transition-all duration-300 ease-in-out relative",
                    className
                )}
            >
                <div className={cn("w-full max-w-md animate-fade-in-up min-h-full flex flex-col py-12 px-6", contentClassName)}>
                    {children}
                </div>
            </div>
        </div>
    );
};
