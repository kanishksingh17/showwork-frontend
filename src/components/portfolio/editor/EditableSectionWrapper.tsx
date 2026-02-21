import React, { useState } from 'react';
import { usePortfolioDispatch, usePortfolioSelector } from '@/store/portfolio/hooks';
import {
    moveSection,
    removeSection,
    updateSectionVariant,
    setActiveSection,
    enhanceSectionAI
} from '@/store/portfolio/portfolioSlice';
import {
    ChevronUp,
    ChevronDown,
    Trash2,
    Sparkles,
    Layers as LayersIcon,
    Plus,
    MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditableSectionWrapperProps {
    sectionId: string;
    sectionType: string;
    sectionContent: string;
    children: React.ReactNode;
}

export const EditableSectionWrapper: React.FC<EditableSectionWrapperProps> = ({
    sectionId,
    sectionType,
    sectionContent,
    children
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPrompting, setIsPrompting] = useState(false);
    const [prompt, setPrompt] = useState("");
    const dispatch = usePortfolioDispatch();
    const activeSection = usePortfolioSelector(state => state.portfolio.activeSection);
    const isActive = activeSection === sectionId;

    const handleMoveUp = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(moveSection({ id: sectionId, direction: 'up' }));
    };

    const handleMoveDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(moveSection({ id: sectionId, direction: 'down' }));
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this section?')) {
            dispatch(removeSection(sectionId));
        }
    };

    const handleAskAI = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPrompting(true);
    };

    const handlePromptSubmit = () => {
        if (!prompt.trim()) return;

        // Find current section content (this might need to be passed down or selected from store)
        // For now we'll send empty content and let backend handle it or we can try to find it.
        dispatch(enhanceSectionAI({
            id: sectionId,
            type: sectionType,
            content: sectionContent,
            userPrompt: prompt
        }));

        setIsPrompting(false);
        setPrompt("");
    };

    const handleEditComponent = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(setActiveSection(sectionId));
        // We might want to communicate back to the editor to switch the sidebar tab
        // But for now, setting activeSection is the first step.
    };

    return (
        <div
            className={cn(
                "relative group transition-all duration-300 cursor-default",
                (isActive || isHovered) ? "ring-2 ring-slate-400 dark:ring-slate-500 ring-offset-0 z-[60] pt-12" : "z-[10] pt-0"
            )}
            onClick={(e) => {
                e.stopPropagation();
                dispatch(setActiveSection(sectionId));
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Action Toolbar - Sticky behavior within the reserved padding */}
            <div className={cn(
                "sticky top-4 lg:top-6 inset-x-0 h-0 z-[70] flex justify-center items-start pointer-events-none transition-all duration-300",
                (isActive || isHovered || isPrompting) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            )}>
                <div className={cn(
                    "flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-2xl rounded-full p-1.5 transition-all duration-500 pointer-events-auto",
                    (isHovered || isActive || isPrompting) ? "translate-y-0 scale-100" : "translate-y-0 scale-95"
                )}>
                    <TooltipProvider>
                        {isPrompting ? (
                            <div className="flex items-center gap-2 px-3 py-0.5 animate-in fade-in zoom-in duration-300">
                                <input
                                    autoFocus
                                    className="bg-transparent border-none outline-none text-xs w-48 dark:text-gray-100 placeholder:text-gray-400 font-medium"
                                    placeholder="Instructions (e.g. 'Make it shorter')"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handlePromptSubmit();
                                        if (e.key === 'Escape') setIsPrompting(false);
                                    }}
                                />
                                <div className="flex items-center gap-1">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 w-7 rounded-full p-0"
                                        onClick={() => handlePromptSubmit()}
                                        disabled={!prompt.trim()}
                                    >
                                        <Sparkles className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 w-7 rounded-full p-0 text-gray-400"
                                        onClick={() => {
                                            setIsPrompting(false);
                                            setPrompt("");
                                        }}
                                    >
                                        <Plus className="w-3.5 h-3.5 transform rotate-45" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 px-3 py-1 mr-1 border-r border-gray-200 dark:border-gray-600">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                        {sectionType}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 px-1 border-r border-gray-200 dark:border-gray-600 mr-1">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full dark:hover:bg-gray-700" onClick={handleMoveUp}>
                                                <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Move Up</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full dark:hover:bg-gray-700" onClick={handleMoveDown}>
                                                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Move Down</TooltipContent>
                                    </Tooltip>
                                </div>

                                <Button
                                    size="sm"
                                    variant="default"
                                    className="h-8 rounded-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 gap-1.5 text-xs font-bold px-4 shadow-xl transition-all active:scale-95"
                                    onClick={handleAskAI}
                                >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Ask AI
                                </Button>

                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="h-8 rounded-full bg-white/70 dark:bg-gray-700/80 border border-gray-200/50 dark:border-gray-500/50 text-gray-900 dark:text-gray-100 hover:bg-white/90 dark:hover:bg-gray-600 backdrop-blur-md gap-1.5 text-xs font-semibold px-4 transition-all shadow-sm"
                                    onClick={handleEditComponent}
                                >
                                    <LayersIcon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                                    Edit style
                                </Button>

                                <div className="flex items-center gap-1 ml-1 pl-1 border-l border-gray-200 dark:border-gray-600">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                                onClick={handleDelete}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Delete Section</TooltipContent>
                                    </Tooltip>
                                </div>
                            </>
                        )}
                    </TooltipProvider>
                </div>
            </div>

            {/* Section Content */}
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};
