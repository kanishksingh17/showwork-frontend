import React, { useState, useEffect } from "react";
import { UnifiedSidebar } from "@/components/UnifiedSidebar";
import { cn } from "@/lib/utils";

interface UnifiedLayoutProps {
    children: React.ReactNode;
    activePage: string;
    showSidebar?: boolean; // New prop to allow external control (e.g., hiding in editor)
    showAuthButtons?: boolean; // New prop to control demo/showcase mode sidebar
}

export const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({
    children,
    activePage,
    showSidebar = true,
    showAuthButtons = false,
}) => {
    // Initialize state from localStorage if available, default to true
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem("sidebarOpen");
            if (saved !== null) {
                return saved === "true";
            }
        }
        return true;
    });

    // Update localStorage when state changes
    useEffect(() => {
        localStorage.setItem("sidebarOpen", String(isSidebarOpen));
    }, [isSidebarOpen]);
    // For standard layouts, we want the sidebar to be joined immediately without animation delay
    const [isSidebarJoined] = useState(true);

    const actualShowSidebar = showSidebar && isSidebarJoined;

    return (
        <div
            className={cn(
                "h-screen bg-slate-100 dark:bg-slate-950 flex flex-row p-6 overflow-hidden transition-all duration-700",
                actualShowSidebar ? "gap-6" : "gap-0",
            )}
        >
            {/* Sidebar - Desktop Only with Collapsible Logic */}
            <div
                className={cn(
                    "hidden lg:block h-full transition-all duration-700 ease-in-out overflow-hidden flex-shrink-0",
                    !actualShowSidebar
                        ? "w-0 opacity-0 -translate-x-full pointer-events-none"
                        : isSidebarOpen
                            ? "w-64 opacity-100 translate-x-0"
                            : "w-16 opacity-100 translate-x-0",
                )}
            >
                <div className={cn("h-full transition-all duration-300", isSidebarOpen ? "w-64" : "w-16")}>
                    <UnifiedSidebar
                        isOpen={isSidebarOpen}
                        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                        currentPage={activePage}
                        showAuthButtons={showAuthButtons}
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
