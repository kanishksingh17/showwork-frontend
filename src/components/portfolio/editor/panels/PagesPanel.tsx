import React from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { 
    toggleSectionVisibility, 
    reorderSections,
    setActiveSection,
    setRightPanelOpen
} from '@/store/portfolio/portfolioSlice';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
    Eye,
    EyeOff,
    GripVertical,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export const PagesPanel: React.FC = () => {
    const dispatch = usePortfolioDispatch();
    const sections = usePortfolioSelector(state => state.portfolio.sections);

    const activeSectionId = usePortfolioSelector(state => state.portfolio.activeSection);

    const handleSelectSection = (id: string) => {
        dispatch(setActiveSection(id));
        dispatch(setRightPanelOpen(true));
    };

    const handleToggleVisibility = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(toggleSectionVisibility(id));
    };

    const moveSection = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
        e.stopPropagation();
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === sections.length - 1) return;

        const newSections = [...sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap
        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];

        dispatch(reorderSections(newSections.map(s => s.id)));
    };

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Manage Pages</h3>
                <p className="text-sm text-gray-500">Reorder or hide sections of your portfolio.</p>
            </div>

            <ScrollArea className="flex-1 pr-4 -mr-4">
                <div className="space-y-3 pb-4">
                    {sections.map((section, index) => (
                        <div
                            key={section.id}
                            onClick={() => handleSelectSection(section.id)}
                            className={`
                                flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer group/card
                                ${activeSectionId?.toLowerCase() === section.id?.toLowerCase() 
                                    ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200 shadow-md' 
                                    : section.isVisible 
                                        ? 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-zinc-50' 
                                        : 'bg-gray-50 border-gray-100 opacity-70'}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-gray-400 cursor-grab active:cursor-grabbing">
                                    <GripVertical className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className={cn(
                                        "font-medium text-sm capitalize",
                                        activeSectionId?.toLowerCase() === section.id?.toLowerCase() ? "text-indigo-700" : "text-gray-900"
                                    )}>
                                        {typeof section.type === 'string' ? (section.title || section.type) : 'Unknown'}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                                        {typeof section.variant === 'string' ? section.variant : 'Default'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 transition-opacity">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={(e) => moveSection(index, 'up', e)}
                                    disabled={index === 0}
                                >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={(e) => moveSection(index, 'down', e)}
                                    disabled={index === sections.length - 1}
                                >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                </Button>
                                <div className="w-px h-4 bg-gray-200 mx-1" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-7 w-7 ${section.isVisible ? 'text-gray-500' : 'text-gray-400'}`}
                                    onClick={(e) => handleToggleVisibility(section.id, e)}
                                >
                                    {section.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                </Button>
                            </div>
                        </div>
                    ))}

                    {sections.length === 0 && (
                        <div className="text-center py-8 text-gray-500 text-sm">
                            No sections found. Try resetting the portfolio.
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};
