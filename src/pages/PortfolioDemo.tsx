import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useParams } from 'react-router-dom';
import { portfolioStore } from '@/store/portfolio';
import { PortfolioTemplateInner } from '@/components/portfolio/templates/PortfolioTemplate';
import { selectTemplate, updateUserData, initializeDefaultSections } from '@/store/portfolio/portfolioSlice';
import { usePortfolioDispatch } from '@/store/portfolio/hooks';

const DEMO_USER = {
    name: 'Raj Singh',
    title: 'Full Stack Developer, React Developer, Open Source Contributor',
    bio: 'I am a freelancer based in India and I have been building noteworthy UX/UI designs and websites for years, which comply with the latest design trends. Having a sharp eye for product evolution helps me prioritise tasks, iterate fast and deliver faster.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    techStack: ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Git'],
    socialLinks: {
        github: 'https://github.com/soumyajit4419',
        linkedin: 'https://www.linkedin.com/in/soumyajit4419/',
    },
};

const DEMO_PROJECTS = [
    {
        id: 'demo-p1',
        name: 'Portfolio Engine',
        description: 'Template-driven portfolio builder with section variants and live editing.',
        technologies: ['React', 'TypeScript', 'Redux'],
    },
    {
        id: 'demo-p2',
        name: 'DevOps Insights',
        description: 'Operational dashboard for releases, reliability, and change tracking.',
        technologies: ['Node.js', 'PostgreSQL', 'Grafana'],
    },
];

export interface PortfolioDemoPreviewProps {
    templateId?: string;
    userData?: any;
    projects?: any[];
    className?: string;
}

export const PortfolioDemoPreview: React.FC<PortfolioDemoPreviewProps> = ({
    templateId = 'recommended-fullstack',
    userData = DEMO_USER,
    projects = DEMO_PROJECTS,
    className = 'w-full min-h-screen bg-white',
}) => {
    const dispatch = usePortfolioDispatch();

    useEffect(() => {
        dispatch(initializeDefaultSections());
    }, [dispatch]);

    useEffect(() => {
        dispatch(selectTemplate(templateId));
    }, [dispatch, templateId]);

    useEffect(() => {
        dispatch(updateUserData(userData as any));
    }, [dispatch, userData]);

    return (
        <div className={className}>
            <PortfolioTemplateInner userData={userData} projects={projects} />
        </div>
    );
};

/**
 * PortfolioDemoInner — syncs demo data and selected template to Redux
 */
const PortfolioDemoInner: React.FC = () => {
    const { templateId } = useParams<{ templateId: string }>();

    return (
        <PortfolioDemoPreview templateId={templateId || 'recommended-fullstack'} />
    );
};

const PortfolioDemoPage: React.FC = () => (
    <Provider store={portfolioStore}>
        <PortfolioDemoInner />
    </Provider>
);

export default PortfolioDemoPage;
