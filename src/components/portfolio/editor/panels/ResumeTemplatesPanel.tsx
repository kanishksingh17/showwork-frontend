import React from 'react';
import { usePortfolioSelector, usePortfolioDispatch } from '@/store/portfolio/hooks';
import { setResumeTemplateId } from '@/store/portfolio/portfolioSlice';
import { Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const RESUME_TEMPLATES = [
    {
        id: 'resume-minimal',
        name: 'Minimalist',
        description: 'Clean, simple, and effective.',
        thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=600&fit=crop'
    },
    {
        id: 'resume-modern',
        name: 'Modern Professional',
        description: 'High impact with clear typography.',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=600&fit=crop'
    }
];

export const ResumeTemplatesPanel: React.FC = () => {
    const dispatch = usePortfolioDispatch();
    const currentTemplateId = usePortfolioSelector(state => state.portfolio.resumeTemplateId);

    const handleSelectTemplate = (id: string) => {
        dispatch(setResumeTemplateId(id));
    };

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Resume Templates</h3>
                <p className="text-sm text-gray-500">Choose a design that best fits your role.</p>
            </div>

            <ScrollArea className="flex-1 pr-4 -mr-4">
                <div className="grid grid-cols-1 gap-4 pb-6">
                    {RESUME_TEMPLATES.map((template) => (
                        <div
                            key={template.id}
                            className={`
                                relative group cursor-pointer rounded-xl border-2 transition-all overflow-hidden
                                ${currentTemplateId === template.id ? 'border-indigo-600 ring-2 ring-indigo-600/10' : 'border-gray-100 hover:border-gray-200'}
                            `}
                            onClick={() => handleSelectTemplate(template.id)}
                        >
                            <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
                                <img
                                    src={template.thumbnail}
                                    alt={template.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                {currentTemplateId === template.id && (
                                    <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                            <div className="p-3 bg-white">
                                <h4 className="font-semibold text-sm text-gray-900">{template.name}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{template.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
