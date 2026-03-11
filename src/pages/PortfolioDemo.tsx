import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { portfolioStore } from '@/store/portfolio';
import { PortfolioTemplate } from '@/components/portfolio/templates/PortfolioTemplate';
import { selectTemplate, updateUserData, initializeDefaultSections } from '@/store/portfolio/portfolioSlice';

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

/**
 * PortfolioDemoInner — syncs demo data and selected template to Redux
 */
const PortfolioDemoInner: React.FC = () => {
    const dispatch = useDispatch();
    const { templateId } = useParams<{ templateId: string }>();

    useEffect(() => {
        // Sync demo user data
        dispatch(updateUserData(DEMO_USER as any));

        // Initialize default sections if needed
        dispatch(initializeDefaultSections());

        // Select the template from the URL (fallback to recommended-fullstack)
        const id = templateId || 'recommended-fullstack';
        dispatch(selectTemplate(id));
    }, [dispatch, templateId]);

    return (
        <div className="w-full min-h-screen bg-white">
            <PortfolioTemplate />
        </div>
    );
};

const PortfolioDemoPage: React.FC = () => (
    <Provider store={portfolioStore}>
        <PortfolioDemoInner />
    </Provider>
);

export default PortfolioDemoPage;
