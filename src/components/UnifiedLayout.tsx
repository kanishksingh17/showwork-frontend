import React, { useState } from "react";
import { UnifiedSidebar } from "@/components/UnifiedSidebar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface UnifiedLayoutProps {
    children: React.ReactNode;
    activePage: string;
    showSidebar?: boolean; // New prop to allow external control (e.g., hiding in editor)
}

export const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({
    children,
    activePage,
    showSidebar = true,
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // For standard layouts, we want the sidebar to be joined immediately without animation delay
    const [isSidebarJoined] = useState(true);

    const actualShowSidebar = showSidebar && isSidebarJoined;

    return (
        <div
            className={cn(
                "h-screen bg-slate-100 dark:bg-slate-950 flex flex-row p-6 overflow-hidden transition-all duration-700",
                actualShowSidebar && isSidebarOpen ? "gap-6" : "gap-0",
            )}
        >
            {/* Floating Toggle Button (visible when sidebar is closed and we are supposed to show it) */}
            {actualShowSidebar && !isSidebarOpen && (
                <button
                    className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex items-center justify-center w-5 h-16 bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 rounded-r-2xl shadow-lg hover:w-7 transition-all duration-300 group cursor-pointer"
                    onClick={() => setIsSidebarOpen(true)}
                    title="Open Sidebar"
                >
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </button>
            )}

            {/* Sidebar - Desktop Only with Collapsible Logic */}
            <div
                className={cn(
                    "hidden lg:block h-full transition-all duration-700 ease-in-out overflow-hidden flex-shrink-0",
                    !actualShowSidebar
                        ? "w-0 opacity-0 -translate-x-full pointer-events-none"
                        : isSidebarOpen
                            ? "w-64 opacity-100 translate-x-0"
                            : "w-0 opacity-0 -translate-x-full pointer-events-none",
                )}
            >
                <div className="w-64 h-full">
                    <UnifiedSidebar
                        isOpen={isSidebarOpen}
                        onToggle={() => setIsSidebarOpen(false)}
                        currentPage={activePage}
                    />
                </div>
            </div>

            {/* Main Content Area - Refined Window Design with Internal Scroll */}
            <div
                className={cn(
                    "flex-1 w-full min-w-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col relative transition-all duration-300 h-full",
                    actualShowSidebar && isSidebarOpen && "transition-all duration-700",
                )}
            >
                {children}
            </div>
        </div>
    );
};
