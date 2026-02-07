import React from 'react';
import { SimpleFolioSectionTitle } from '../atoms/SimpleFolioSectionTitle';
import { SimpleFolioProjectCard } from '../molecules/SimpleFolioProjectCard';

interface Project {
    title: string;
    description: string;
    liveUrl?: string;
    sourceUrl?: string;
    imageUrl: string;
}

interface SimpleFolioProjectsProps {
    projects: Project[];
}

export const SimpleFolioProjects: React.FC<SimpleFolioProjectsProps> = ({ projects }) => {
    return (
        <section id="projects" className="bg-white text-[#272341] py-32">
            <div className="container mx-auto px-8 lg:px-24">
                <SimpleFolioSectionTitle className="mb-24">Projects</SimpleFolioSectionTitle>
                <div>
                    {projects.map((project, index) => (
                        <SimpleFolioProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
