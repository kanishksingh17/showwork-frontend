import React from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { setActiveSection, setRightPanelOpen } from '@/store/portfolio/portfolioSlice';
import { Sparkles, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableBlockProps {
    id: string; // The section type/ID matching Redux
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onAIPolish?: () => void;
}

export const EditableBlock: React.FC<EditableBlockProps> = ({ id, children, className, style, onAIPolish }) => {
    const dispatch = usePortfolioDispatch();
    const editorMode = usePortfolioSelector(state => state.portfolio.editorMode);
    const activeSection = usePortfolioSelector(state => state.portfolio.activeSection);
    const isPreviewMode = usePortfolioSelector(state => state.portfolio.isPreviewMode);
    
    // If we're not in the editor (e.g. livesite), just render standard children
    // but preserve the wrapping <div> so that any layout classNames passed by the parent are kept.
    if (editorMode !== 'portfolio' || isPreviewMode) {
        return className || style ? <div className={className} style={style}>{children}</div> : <>{children}</>;
    }

    const isActive = activeSection === id;

    return (
        <div 
            className={cn(
                "group relative rounded-xl border-2 transition-all p-1 -m-1",
                isActive 
                    ? "border-indigo-500/50 bg-indigo-500/5" 
                    : "border-transparent hover:border-indigo-500/30",
                className
            )}
            style={style}
            onClick={(e) => {
                e.stopPropagation();
                dispatch(setActiveSection(id));
            }}
        >
            {/* Toolbar: two clearly labeled action buttons */}
            <div className={cn(
                "absolute top-4 right-4 z-[110] flex items-center opacity-0 transition-all duration-150 pointer-events-none",
                "group-hover:opacity-100 group-hover:pointer-events-auto",
                isActive ? "opacity-100 pointer-events-auto" : ""
            )}>
                <div className="flex items-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden">
                    {/* AI Polish */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onAIPolish) onAIPolish();
                            else dispatch(setActiveSection(id));
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Polish
                    </button>

                    {/* Divider */}
                    <div className="w-px h-5 bg-gray-200 dark:bg-zinc-700 flex-shrink-0" />

                    {/* Edit */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setActiveSection(id));
                            dispatch(setRightPanelOpen(true));
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};
