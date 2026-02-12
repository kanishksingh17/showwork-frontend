import { useState } from 'react';
import { DndContext, type DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor, closestCorners, type DragStartEvent } from '@dnd-kit/core';
import { UnifiedSidebar } from '@/components/UnifiedSidebar';
import ApplicationTrackerBoard, { type Application, ApplicationCard } from '@/components/ApplicationTrackerBoard';
import { Button } from '@/components/ui/button';
import { Bell, Search, Plus } from 'lucide-react';

export default function ApplicationTracker() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newApp, setNewApp] = useState({ company: '', role: '', url: '', status: 'bookmarked' });
    const [applications, setApplications] = useState<Application[]>([
        // Bookmarked
        {
            id: '1',
            company: 'Airbnb',
            role: 'Senior Product Designer',
            logo: 'A',
            logoBg: 'bg-rose-500',
            status: 'bookmarked',
            matchScore: 82,
            activity: 'Draft Resume',
            activityTime: '2d ago',
            linkedAssets: { resume: true, portfolio: true },
            action: 'To Apply',
            actionType: 'neutral'
        },
        {
            id: '2',
            company: 'Uber',
            role: 'UX Researcher',
            logo: 'U',
            logoBg: 'bg-black',
            status: 'bookmarked',
            matchScore: 65,
            activity: 'Tailor CV',
            activityTime: '5d ago',
            linkedAssets: {},
            action: 'To Apply',
            actionType: 'neutral'
        },
        // Applied
        {
            id: '3',
            company: 'Spotify',
            role: 'Product Designer II',
            logo: 'S',
            logoBg: 'bg-green-500',
            status: 'applied',
            matchScore: 95,
            activity: 'Track Status',
            activityTime: '1d ago',
            linkedAssets: { resume: true, portfolio: true },
            action: 'Applied',
            actionType: 'primary'
        },
        // Interviewing
        {
            id: '5',
            company: 'Vercel',
            role: 'Design Engineer',
            logo: 'V',
            logoBg: 'bg-black',
            status: 'interviewing',
            matchScore: 92,
            activity: 'Prep for Interview',
            activityTime: '1w ago',
            linkedAssets: { resume: true, portfolio: true },
            action: 'Tech Round',
            actionType: 'secondary'
        },
        // Offer
        {
            id: '7',
            company: 'Dropbox',
            role: 'Product Lead',
            logo: 'D',
            logoBg: 'bg-blue-600',
            status: 'offer',
            matchScore: 98,
            activity: 'Review Terms',
            activityTime: '3w ago',
            linkedAssets: { resume: true, portfolio: true },
            action: 'Received',
            actionType: 'primary'
        }
    ]);

    const [activeId, setActiveId] = useState<string | null>(null);

    const activeApp = applications.find(app => app.id === activeId);


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            const activeId = active.id as string;
            // The over.id will be the status of the column we dropped into
            const overId = over.id as string;

            setApplications((items) => {
                return items.map(item => {
                    if (item.id === activeId) {
                        // Update activity text based on new status for realism
                        let activity = item.activity;
                        let status = overId as Application['status'];

                        // Validate status is one of the allowed types
                        const validStatuses = ['bookmarked', 'applied', 'interviewing', 'offer', 'archive'];
                        if (!validStatuses.includes(status)) return item;

                        if (status === 'interviewing') activity = 'Prep required';
                        else if (status === 'offer') activity = 'Reviewing';
                        else if (status === 'applied') activity = 'Applied';
                        else if (status === 'archive') activity = 'Archived';

                        return {
                            ...item,
                            status,
                            activity
                        };
                    }
                    return item;
                });
            });
        }
    };

    const handleAddApplication = () => {
        const newApplication: Application = {
            id: Math.random().toString(36).substr(2, 9),
            company: newApp.company,
            role: newApp.role,
            logo: newApp.company.charAt(0).toUpperCase(),
            logoBg: 'bg-blue-500',
            status: newApp.status as Application['status'],
            matchScore: Math.floor(Math.random() * 40) + 60,
            activity: 'Added',
            activityTime: 'Just now',
            linkedAssets: { resume: !!newApp.url },
            action: 'View',
            actionType: 'neutral'
        };

        setApplications([...applications, newApplication]);
        setIsModalOpen(false);
        setNewApp({ company: '', role: '', url: '', status: 'bookmarked' });
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#FAFAFA] dark:bg-[#0f172a] font-sans text-slate-900 dark:text-slate-100">
            <UnifiedSidebar currentPage="portfolio-manage" />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#FAFAFA] dark:bg-[#0f172a]">
                <header className="h-16 flex items-center justify-between px-8 bg-[#FAFAFA]/80 dark:bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                    <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        Application Tracker
                        <span className="text-[10px] font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                            Drag to update
                        </span>
                    </h1>
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="relative group w-64">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                <Search className="w-4 h-4" />
                            </span>
                            <input
                                className="w-full rounded-lg border-0 bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 py-2 pl-9 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-900 shadow-sm transition-all"
                                placeholder="Search applications..."
                                type="text"
                            />
                        </div>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        >
                            <Plus className="w-4 h-4 mr-2" /> New Application
                        </Button>
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-slate-800 shadow-none hover:shadow-sm transition-all">
                            <Bell className="w-5 h-5" />
                        </Button>
                    </div>
                </header>
                <div className="flex-1 overflow-hidden p-6 pt-2">
                    <DndContext
                        collisionDetection={closestCorners}

                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                    >
                        <ApplicationTrackerBoard applications={applications} />
                        <DragOverlay>
                            {activeApp ? <ApplicationCard app={activeApp} isOverlay /> : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            </main>

            {/* Add Application Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Add Application</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                <Plus className="w-5 h-5 rotate-45" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Company Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-blue-500 py-2 px-3"
                                    placeholder="e.g. Airbnb"
                                    value={newApp.company}
                                    onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Role / Position</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-blue-500 py-2 px-3"
                                    placeholder="e.g. Senior Product Designer"
                                    value={newApp.role}
                                    onChange={(e) => setNewApp({ ...newApp, role: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex justify-between">
                                    Job URL / Description
                                    <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold">✨ AI Tailoring</span>
                                </label>
                                <textarea
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-blue-500 min-h-[80px] py-2 px-3"
                                    placeholder="Paste the job link or description here..."
                                    value={newApp.url}
                                    onChange={(e) => setNewApp({ ...newApp, url: e.target.value })}
                                />
                                <p className="text-[10px] text-slate-500">We'll use this to tailor your resume and portfolio for this role.</p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Status</label>
                                <select
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-blue-500 py-2 px-3"
                                    value={newApp.status}
                                    onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}
                                >
                                    <option value="bookmarked">Bookmarked</option>
                                    <option value="applied">Applied</option>
                                    <option value="interviewing">Interviewing</option>
                                    <option value="offer">Offer</option>
                                </select>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddApplication}
                                className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
                            >
                                Add Application
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
