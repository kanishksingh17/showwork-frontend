import { useState } from 'react';
import {
    Search,
    Bell,
    Plus,
    MoreHorizontal,
    MoreVertical,
    FileText,
    FolderOpen,
    Clock,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Calendar,
    Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Application {
    id: string;
    company: string;
    role: string;
    logo: string;
    logoBg: string;
    status: 'bookmarked' | 'applied' | 'interviewing' | 'offer' | 'archive';
    matchScore: number;
    activity: string;
    activityTime: string;
    linkedAssets: {
        resume?: boolean;
        portfolio?: boolean;
    };
    action?: string;
    actionType?: 'primary' | 'secondary' | 'neutral';
}

export default function ApplicationTrackerBoard() {
    const [applications] = useState<Application[]>([
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
        {
            id: '4',
            company: 'Linear',
            role: 'Frontend Engineer',
            logo: 'L',
            logoBg: 'bg-indigo-600',
            status: 'applied',
            matchScore: 88,
            activity: 'Check Portal',
            activityTime: '3d ago',
            linkedAssets: { resume: true },
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
        {
            id: '6',
            company: 'Ramp',
            role: 'Senior Product Designer',
            logo: 'R',
            logoBg: 'bg-yellow-500',
            status: 'interviewing',
            matchScore: 89,
            activity: 'Follow up in 2 days',
            activityTime: '1w ago',
            linkedAssets: { resume: true },
            action: 'Screening',
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
        },
        // Archive
        {
            id: '8',
            company: 'Netflix',
            role: 'UI Engineer',
            logo: 'N',
            logoBg: 'bg-red-600',
            status: 'archive',
            matchScore: 72,
            activity: 'View Feedback',
            activityTime: '1mo ago',
            linkedAssets: {},
            action: 'Rejected',
            actionType: 'neutral'
        }
    ]);

    const getColumnApplications = (status: Application['status']) => {
        return applications.filter(app => app.status === status);
    };

    return (
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-0 h-full">
            <div className="flex h-full gap-6 min-w-max pb-4">

                {/* Bookmarked Column */}
                <KanbanColumn
                    title="Bookmarked"
                    count={getColumnApplications('bookmarked').length}
                    color="bg-slate-400"
                >
                    {getColumnApplications('bookmarked').map(app => (
                        <KanbanCard key={app.id} app={app} />
                    ))}
                    <button className="m-3 mt-0 py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 text-xs font-medium hover:bg-white dark:hover:bg-slate-800 hover:border-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all flex items-center justify-center gap-1">
                        <Plus className="w-4 h-4" /> Add Card
                    </button>
                </KanbanColumn>

                {/* Applied Column */}
                <KanbanColumn
                    title="Applied"
                    count={getColumnApplications('applied').length}
                    color="bg-blue-500"
                >
                    {getColumnApplications('applied').map(app => (
                        <KanbanCard key={app.id} app={app} />
                    ))}
                </KanbanColumn>

                {/* Interviewing Column */}
                <KanbanColumn
                    title="Interviewing"
                    count={getColumnApplications('interviewing').length}
                    color="bg-purple-500"
                >
                    {getColumnApplications('interviewing').map(app => (
                        <KanbanCard key={app.id} app={app} />
                    ))}
                </KanbanColumn>

                {/* Offer Column */}
                <KanbanColumn
                    title="Offer"
                    count={getColumnApplications('offer').length}
                    color="bg-emerald-500"
                >
                    {getColumnApplications('offer').map(app => (
                        <KanbanCard key={app.id} app={app} />
                    ))}
                </KanbanColumn>

                {/* Archive Column */}
                <KanbanColumn
                    title="Archive"
                    count={getColumnApplications('archive').length}
                    color="bg-slate-300"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                >
                    {getColumnApplications('archive').map(app => (
                        <KanbanCard key={app.id} app={app} />
                    ))}
                </KanbanColumn>

            </div>
        </div>
    );
}

function KanbanColumn({ title, count, color, children, className = '' }: { title: string, count: number, color: string, children: React.ReactNode, className?: string }) {
    return (
        <div className={`flex flex-col h-full w-80 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 flex-shrink-0 ${className}`}>
            <div className="p-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-t-xl sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${color}`}></span>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                    <span className="bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 text-[10px] font-medium px-1.5 py-0.5 rounded">{count}</span>
                </div>
                <button className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 p-1 rounded transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
            <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                {children}
            </div>
        </div>
    );
}

function KanbanCard({ app }: { app: Application }) {
    return (
        <div className={`bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer group ${app.status === 'archive' ? 'grayscale hover:grayscale-0' : ''}`}>
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg ${app.logoBg} text-white flex items-center justify-center font-bold text-xs`}>
                        {app.logo}
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{app.company}</h4>
                        <p className="text-[11px] text-slate-500">{app.role}</p>
                    </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium border ${app.status === 'interviewing' ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30' :
                    app.status === 'offer' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30' :
                        app.status === 'applied' ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30' :
                            'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'interviewing' ? 'bg-purple-500 animate-pulse' :
                        app.status === 'offer' ? 'bg-emerald-500' :
                            app.status === 'applied' ? 'bg-blue-500' :
                                'bg-slate-400'
                        }`}></span>
                    {app.action}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${app.matchScore >= 90 ? 'text-emerald-700 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-900/30' :
                    app.matchScore >= 80 ? 'text-blue-700 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-900/30' :
                        'text-amber-700 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-900/20 dark:border-amber-900/30'
                    }`}>
                    {app.matchScore}% Match
                </span>
            </div>

            {(app.linkedAssets.resume || app.linkedAssets.portfolio) ? (
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-1.5">
                        {app.linkedAssets.resume && (
                            <div className="h-5 w-5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm z-10" title="Resume V4">
                                <FileText className="w-3 h-3 text-slate-500" />
                            </div>
                        )}
                        {app.linkedAssets.portfolio && (
                            <div className="h-5 w-5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm z-0" title="Portfolio V2">
                                <FolderOpen className="w-3 h-3 text-slate-500" />
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] text-slate-500 ml-1">Assets linked</span>
                </div>
            ) : (
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] text-slate-400 italic">No assets linked</span>
                </div>
            )}

            <div className="pt-3 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {app.activityTime}
                </span>
                <span className={`text-[10px] font-semibold flex items-center gap-1 ${app.status === 'offer' ? 'text-emerald-600 dark:text-emerald-400' :
                    app.status === 'interviewing' ? 'text-purple-600 dark:text-purple-400' :
                        'text-slate-900 dark:text-slate-100'
                    }`}>
                    {app.activity}
                    {app.status === 'interviewing' && <ArrowRight className="w-3 h-3" />}
                </span>
            </div>
        </div>
    );
}
