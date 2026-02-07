import React from 'react';
import { SimpleFolioButton } from '../atoms/SimpleFolioButton';

interface Project {
    title: string;
    description: string;
    liveUrl?: string;
    sourceUrl?: string;
    imageUrl: string;
}

interface SimpleFolioProjectCardProps {
    project: Project;
}

export const SimpleFolioProjectCard: React.FC<SimpleFolioProjectCardProps> = ({ project }) => {
    // Logic to calculate standard bootstrap columns replacement
    // Design: Text takes 4 cols, Image takes 8 cols.
    // They stack on mobile.

    return (
        <div className="flex flex-col lg:flex-row gap-8 mb-32">
            {/* Text Section - lg:w-1/3 (4/12 columns) */}
            <div className="lg:w-1/3 flex flex-col justify-center text-left">
                <h3 className="text-[2.5rem] font-bold mb-4 text-[#272341]">
                    {project.title}
                </h3>
                <div className="mb-6">
                    <p className="text-[1.6rem] leading-relaxed text-[#272341]">
                        {project.description}
                    </p>
                </div>
                <div className="flex gap-4">
                    {project.liveUrl && (
                        <SimpleFolioButton variant="hero" href={project.liveUrl} target="_blank">
                            See Live
                        </SimpleFolioButton>
                    )}
                    {project.sourceUrl && (
                        <SimpleFolioButton variant="default" className="text-[#02aab0] hover:underline" href={project.sourceUrl} target="_blank">
                            Source Code
                        </SimpleFolioButton>
                    )}
                </div>
            </div>

            {/* Image Section - lg:w-2/3 (8/12 columns) */}
            <div className="lg:w-2/3">
                <a href={project.liveUrl || '#'} target="_blank" rel="noreferrer">
                    <div className="rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:-translate-y-2">
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-auto object-cover border-none"
                        />
                    </div>
                </a>
            </div>
        </div>
    );
};
