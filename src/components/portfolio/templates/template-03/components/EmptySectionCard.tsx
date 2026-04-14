import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolioDispatch, usePortfolioSelector } from '@/store/portfolio/hooks';
import { setActiveSection, setRightPanelOpen } from '@/store/portfolio/portfolioSlice';
import { cn } from '@/lib/utils';

interface EmptySectionCardProps {
    sectionId: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    actionLabel: string;
    className?: string;
}

export const EmptySectionCard: React.FC<EmptySectionCardProps> = ({
    sectionId,
    icon,
    title,
    description,
    actionLabel,
    className,
}) => {
    const dispatch = usePortfolioDispatch();
    const isPreviewMode = usePortfolioSelector(state => state.portfolio.isPreviewMode);

    if (isPreviewMode) return null;

    const handleAction = () => {
        dispatch(setActiveSection(sectionId));
        dispatch(setRightPanelOpen(true));
    };

    return (
        <div className={cn(
            "group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-700",
            "bg-zinc-50/50 dark:bg-zinc-900/30 py-12 px-8 text-center transition-colors",
            "hover:border-indigo-300 hover:bg-indigo-50/30 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/20",
            className
        )}>
            <div className="p-3 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-500 transition-colors">
                {icon}
            </div>
            <div>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">{title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">{description}</p>
            </div>
            <Button
                onClick={handleAction}
                size="sm"
                variant="outline"
                className="mt-1 gap-2 text-xs border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
            >
                <Plus className="w-3.5 h-3.5" />
                {actionLabel}
            </Button>
        </div>
    );
};
