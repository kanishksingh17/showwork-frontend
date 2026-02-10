import { UnifiedSidebar } from '@/components/UnifiedSidebar';
import ApplicationTrackerBoard from '@/components/ApplicationTrackerBoard';
import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';

export default function ApplicationTracker() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#FAFAFA] dark:bg-[#0f172a] font-sans text-slate-900 dark:text-slate-100">
            <UnifiedSidebar currentPage="portfolio-manage" />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#FAFAFA] dark:bg-[#0f172a]">
                <header className="h-16 flex items-center justify-between px-8 bg-[#FAFAFA]/80 dark:bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                    <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Application Tracker</h1>
                    <div className="flex-1 max-w-md mx-6">
                        <div className="relative group">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                <Search className="w-4 h-4" />
                            </span>
                            <input
                                className="w-full rounded-lg border-0 bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 py-2 pl-9 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-900 shadow-sm transition-all"
                                placeholder="Search applications..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-slate-800 shadow-none hover:shadow-sm transition-all">
                            <Bell className="w-5 h-5" />
                        </Button>
                    </div>
                </header>
                <div className="flex-1 overflow-hidden p-6">
                    <ApplicationTrackerBoard />
                </div>
            </main>
        </div>
    );
}
