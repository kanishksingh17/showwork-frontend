import React from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { updateSectionVariant } from '@/store/portfolio/portfolioSlice';
import { Check, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define available variants for each section type
const VARIANT_REGISTRY: Record<string, { id: string; name: string; preview: string }[]> = {
    header: [
        { id: 'Header01', name: 'Minimal Nav', preview: 'https://via.placeholder.com/150x80?text=Header+01' },
    ],
    hero: [
        { id: 'Hero01', name: 'Standard Hero', preview: 'https://via.placeholder.com/150x80?text=Hero+01' },
        { id: 'Hero02', name: 'Centered Hero', preview: 'https://via.placeholder.com/150x80?text=Hero+02' },
        { id: 'HeroMain', name: 'Modern Gradient', preview: 'https://via.placeholder.com/150x80?text=Hero+Main' },
    ],
    about: [
        { id: 'Hero01', name: 'Standard About', preview: 'https://via.placeholder.com/150x80?text=About+01' },
        { id: 'Hero02', name: 'Centered About', preview: 'https://via.placeholder.com/150x80?text=About+02' },
    ],
    skills: [
        { id: 'Skills01', name: 'Grid Icons', preview: 'https://via.placeholder.com/150x80?text=Skills+01' },
    ],
    projects: [
        { id: 'Projects01', name: 'Card Grid', preview: 'https://via.placeholder.com/150x80?text=Projects+01' },
    ],
    contact: [
        { id: 'Contact01', name: 'Standard Contact', preview: 'https://via.placeholder.com/150x80?text=Contact+01' },
    ],
    footer: [
        { id: 'Footer01', name: 'Minimal Footer', preview: 'https://via.placeholder.com/150x80?text=Footer+01' },
    ],
};

export const SectionVariantsPanel: React.FC = () => {
    const dispatch = usePortfolioDispatch();
    const activeSectionId = usePortfolioSelector(state => state.portfolio.activeSection);
    const sections = usePortfolioSelector(state => state.portfolio.sections);

    const activeSection = sections.find(s => s.id === activeSectionId);
    if (!activeSection) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
                <Layout className="w-12 h-12 mb-4 opacity-20" />
                <p>Select a section to change its design</p>
            </div>
        );
    }

    const availableVariants = VARIANT_REGISTRY[activeSection.type] || [];

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 capitalize">{activeSection.type} Styles</h3>
                <p className="text-sm text-gray-500">Choose a layout variant for this section</p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    {availableVariants.map((variant) => (
                        <button
                            key={variant.id}
                            onClick={() => dispatch(updateSectionVariant({ id: activeSection.id, variant: variant.id }))}
                            className={cn(
                                "w-full text-left rounded-xl border-2 transition-all overflow-hidden group relative",
                                activeSection.variant === variant.id
                                    ? "border-indigo-600 ring-2 ring-indigo-50/50"
                                    : "border-gray-100 hover:border-gray-200"
                            )}
                        >
                            <div className="aspect-video bg-gray-50 flex items-center justify-center">
                                <img src={variant.preview} alt={variant.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-3 bg-white flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-700">{variant.name}</span>
                                {activeSection.variant === variant.id && (
                                    <div className="bg-indigo-600 rounded-full p-0.5">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
