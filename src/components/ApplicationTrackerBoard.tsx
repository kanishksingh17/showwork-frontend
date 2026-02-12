import {
    useDraggable,
    useDroppable,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
    MoreHorizontal,
    GripVertical,
    FileText,
    FolderOpen,
    Clock,
    ArrowRight,
    Plus,
} from 'lucide-react';

export interface Application {
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

export default function ApplicationTrackerBoard({ applications, onAddClick }: { applications: Application[], onAddClick?: () => void }) {
    const getColumnApplications = (status: Application['status']) => {
        return applications.filter(app => app.status === status);
    };

    return (
        <div className="flex flex-col h-full">


            <div className="flex-1 overflow-x-auto overflow-y-hidden p-0 h-full">
                <div className="flex h-full gap-2 w-full pb-2">

                    {/* Bookmarked Column */}
                    <KanbanColumn
                        title="Bookmarked"
                        count={getColumnApplications('bookmarked').length}
                        color="bg-slate-400"
                    >
                        {getColumnApplications('bookmarked').map(app => (
                            <KanbanCard key={app.id} app={app} />
                        ))}

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
        </div>
    );
}

function KanbanColumn({ title, count, color, children, className = '' }: { title: string, count: number, color: string, children: React.ReactNode, className?: string }) {
    const { setNodeRef } = useDroppable({
        id: title.toLowerCase(),
    });

    return (
        <div ref={setNodeRef} className={`flex flex-col h-full flex-1 min-w-0 bg-slate-100/50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 flex-shrink-0 ${className}`}>
            <div className="p-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-t-lg sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${color}`}></span>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                    <span className="bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 text-[10px] font-medium px-1.5 py-0.5 rounded">{count}</span>
                </div>
                <button className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 p-1 rounded transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
            <div className="p-2 space-y-2 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {children}
            </div>
        </div>
    );
}


// Exported for DragOverlay
export function ApplicationCard({ app, isOverlay = false }: { app: Application, isOverlay?: boolean }) {
    return (
        <div className={`bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-grab active:cursor-grabbing group ${app.status === 'archive' ? 'grayscale hover:grayscale-0' : ''} ${isOverlay ? 'shadow-2xl ring-2 ring-blue-500 rotate-2 cursor-grabbing scale-105' : ''}`}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2.5">
                    <div className={`h-8 w-8 rounded-lg ${app.logoBg} text-white flex items-center justify-center font-bold text-[10px]`}>
                        {app.logo}
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs leading-tight">{app.company}</h4>
                        <p className="text-[10px] text-slate-500">{app.role}</p>
                    </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-900 hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-300 -mr-1 -mt-1 p-1 cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[10px] font-medium border ${app.status === 'interviewing' ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30' :
                    app.status === 'offer' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30' :
                        app.status === 'applied' ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30' :
                            'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                    }`}>
                    <span className={`w-1 h-1 rounded-full ${app.status === 'interviewing' ? 'bg-purple-500 animate-pulse' :
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
                    {app.matchScore}%
                </span>
            </div>

            {(app.linkedAssets.resume || app.linkedAssets.portfolio) ? (
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex -space-x-1">
                        {app.linkedAssets.resume && (
                            <div className="h-4 w-4 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm z-10" title="Resume V4">
                                <FileText className="w-2.5 h-2.5 text-slate-400" />
                            </div>
                        )}
                        {app.linkedAssets.portfolio && (
                            <div className="h-4 w-4 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm z-0" title="Portfolio V2">
                                <FolderOpen className="w-2.5 h-2.5 text-slate-400" />
                            </div>
                        )}
                    </div>
                </div>
            ) : null}

            <div className="pt-2 border-t border-slate-50 dark:border-slate-700/50 flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {app.activityTime}
                </span>
                <span className={`text-[10px] font-semibold flex items-center gap-1 ${app.status === 'offer' ? 'text-emerald-600 dark:text-emerald-400' :
                    app.status === 'interviewing' ? 'text-purple-600 dark:text-purple-400' :
                        'text-slate-700 dark:text-slate-300'
                    }`}>
                    {app.activity}
                    {app.status === 'interviewing' && <ArrowRight className="w-2.5 h-2.5" />}
                </span>
            </div>
        </div>
    );
}

function KanbanCard({ app }: { app: Application }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: app.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.3 : 1, // Dim while dragging
        touchAction: 'none',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <ApplicationCard app={app} />
        </div>
    );
}
