import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddSectionZoneProps {
    index: number;
    onAdd?: (index: number) => void;
    isActive?: boolean;
}

export const AddSectionZone: React.FC<AddSectionZoneProps> = ({ index, onAdd, isActive }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative h-8 group flex items-center justify-center transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/* The Add Button */}
                        <Button
                            size="sm"
                            className={cn(
                                "relative z-10 rounded-full h-8 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 shadow-xl gap-2 px-4 py-0 transition-all duration-500",
                                (isActive || isHovered) ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none translate-y-0"
                            )}
                            onClick={() => onAdd?.(index)}
                        >
                            <Plus className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Add component</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-900 dark:bg-slate-800 text-white border border-slate-700 shadow-2xl px-4 py-2 max-w-xs text-center">
                        <p className="text-xs font-medium">
                            Add a new component between sections
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
