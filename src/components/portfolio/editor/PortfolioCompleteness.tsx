import React, { useMemo } from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { setActiveSection, setRightPanelOpen } from '@/store/portfolio/portfolioSlice';
import { CheckCircle2, Circle, AlertCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export const PortfolioCompleteness: React.FC = () => {
    const dispatch = usePortfolioDispatch();
    const sections = usePortfolioSelector(state => state.portfolio.sections);
    const globalUserData = usePortfolioSelector(state => state.portfolio.userData);

    const checklist = useMemo(() => {
        const getCustomData = (type: string) => sections.find(s => s.type === type)?.customData || {};
        const integratedGithub = globalUserData?.githubUsername || globalUserData?.socials?.github;
        
        return [
            {
                id: 'about',
                label: 'Identity & Hero',
                isDone: !!(getCustomData('about').headline && getCustomData('about').bio),
                missing: 'Add a headline and short bio to your hero section.'
            },
            {
                id: 'about',
                label: 'Social Links',
                isDone: Object.keys(getCustomData('about').socialLinks || {}).length > 0 || !!globalUserData?.socials,
                missing: 'Connect your GitHub, LinkedIn or Twitter.'
            },
            {
                id: 'skills',
                label: 'Tech Stack',
                isDone: (getCustomData('skills').techSlugs || []).length > 0,
                missing: 'Add your core programming languages and tools.'
            },
            {
                id: 'projects',
                label: 'Projects',
                isDone: (getCustomData('projects').manualProjects || []).length > 0 || 
                        !!getCustomData('projects').githubUsername || 
                        !!integratedGithub, 
                missing: 'Import GitHub repos or add manual projects.'
            },
            {
                id: 'resume',
                label: 'Work & Education',
                isDone: (getCustomData('resume').experiences || []).length > 0 && (getCustomData('resume').educations || []).length > 0,
                missing: 'Fill out your career timeline and education.'
            }
        ];
    }, [sections]);

    const completedCount = checklist.filter(item => item.isDone).length;
    const progress = (completedCount / checklist.length) * 100;

    const handleJump = (id: string) => {
        const section = sections.find(s => s.type === id || s.id === id);
        if (section) {
            dispatch(setActiveSection(section.id));
            dispatch(setRightPanelOpen(true));
        }
    };

    return (
        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Portfolio Readiness</h4>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1.5 bg-gray-100 dark:bg-zinc-800" />
                
                <div className="mt-2 space-y-1">
                    {checklist.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleJump(item.id)}
                            className={cn(
                                "group w-full flex items-center justify-between p-1.5 rounded-lg text-left transition-all hover:bg-gray-50 dark:hover:bg-zinc-800/50",
                                item.isDone ? "opacity-60" : "opacity-100"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                {item.isDone ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                ) : (
                                    <Circle className="w-3.5 h-3.5 text-gray-300 dark:text-zinc-700" />
                                )}
                                <span className={cn(
                                    "text-[11px] font-medium",
                                    item.isDone ? "text-gray-500 dark:text-zinc-500 line-through decoration-1" : "text-gray-700 dark:text-zinc-300"
                                )}>
                                    {item.label}
                                </span>
                            </div>
                            {!item.isDone && (
                                <ChevronRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100" />
                            )}
                        </button>
                    ))}
                </div>

                {progress < 100 && (
                    <div className="mt-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 flex gap-2">
                        <AlertCircle className="w-3 h-3 text-amber-500 flex-none mt-0.5" />
                        <p className="text-[10px] text-amber-700 dark:text-amber-400 leading-tight">
                        {checklist.find(i => !i.isDone)?.missing}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
