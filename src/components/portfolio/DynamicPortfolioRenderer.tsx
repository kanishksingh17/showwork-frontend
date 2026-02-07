import React, { useMemo } from 'react';
import type { PortfolioSection } from '@/types/portfolio';
// import { usePortfolioSelector } from '@/store/portfolio/hooks';

// Import Organisms
import { HeaderOrganism } from './organisms/HeaderOrganism/HeaderOrganism';
import { AboutOrganism } from './organisms/AboutOrganism/AboutOrganism';
import { SkillsOrganism } from './organisms/SkillsOrganism/SkillsOrganism';
import { ProjectsOrganism } from './organisms/ProjectsOrganism/ProjectsOrganism';
import { FooterOrganism } from './organisms/FooterOrganism/FooterOrganism';
import { ContactOrganism } from './organisms/ContactOrganism/ContactOrganism';
import { ResumeOrganism } from './organisms/ResumeOrganism/ResumeOrganism';

// SimpleFolioLayout import removed as we rely on dynamic rendering



interface DynamicPortfolioRendererProps {
    templateId: string;
    sections: PortfolioSection[];
    userData: any;
    projects: any[];
}

export const DynamicPortfolioRenderer: React.FC<DynamicPortfolioRendererProps> = ({
    templateId,
    sections,
    userData,
    projects
}) => {
    // If it's a legacy template id that relies on hardcoded layout, we can still use fallback
    // But ideally we want to use the sections driven approach for everything except maybe specific complex ones.

    // For "api-engineer" or simple-folio based ones if they are not fully migrated to sections config
    // we can keep a check. But based on PortfolioSelector, "api-engineer" has sections defined too.
    // The previous implementation used SimpleFolioLayout for 'api-engineer'. 
    // We can support that as a special case if needed, or try to render it dynamically if sections align.

    // Check for special legacy handling
    if (templateId === 'api-engineer' || templateId === 'simple-folio') {
        // existing legacy fallback if sections aren't enough
        // return <SimpleFolioLayout userData={userData} projects={projects} />;
        // Actually, let's try to render dynamically first, if sections exist.
    }

    // Sort sections by order
    const sortedSections = useMemo(() => {
        return [...sections].sort((a, b) => a.order - b.order);
    }, [sections]);

    const renderSection = (section: PortfolioSection) => {
        const key = section.id;

        switch (section.type) {
            case 'header':
                return <HeaderOrganism
                    key={key}
                    variant={(section.variant as any) || 'Header01'}
                    socialLinks={userData.socialLinks}
                />;

            case 'hero': // 'hero' usually maps to AboutOrganism/Hero variants or a dedicated Hero
            case 'about':
                return <AboutOrganism
                    key={key}
                    variant={(section.variant as any) || 'Hero01'}
                // userData is fetched from store in AboutOrganism
                />;

            case 'skills':
                // Map string skills to SkillItems if needed, or pass as is if compatible (likely need mapping)
                const skills = (userData.skills || []).map((s: any) => typeof s === 'string' ? { name: s } : s);
                return <SkillsOrganism
                    key={key}
                    variant={(section.variant as any) || 'Skills01'}
                    skills={skills}
                />;

            case 'projects':
                return <ProjectsOrganism
                    key={key}
                    variant={(section.variant as any) || 'Projects01'}
                    projects={projects}
                />;

            case 'resume':
                return <ResumeOrganism
                    key={key}
                    variant={(section.variant as any) || 'Resume01'}
                // resumeUrl fetched from store
                />;

            case 'contact':
                return <ContactOrganism
                    key={key}
                    variant={(section.variant as any) || 'Contact01'}
                // userData fetched from store
                />;

            case 'footer':
                return <FooterOrganism
                    key={key}
                    variant={(section.variant as any) || 'Footer01'}
                // socialLinks fetched from store
                />;

            default:
                return (
                    <div key={key} className="p-4 border border-dashed border-gray-300 m-4 text-center text-gray-400">
                        Unknown section type: {section.type} ({section.variant})
                    </div>
                );
        }
    };

    return (
        <div className="w-full bg-white dark:bg-gray-900 min-h-full">
            {sortedSections.map(renderSection)}
        </div>
    );
};
