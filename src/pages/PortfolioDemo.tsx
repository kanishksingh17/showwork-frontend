import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { portfolioStore } from '@/store/portfolio';
import { updateUserData } from '@/store/portfolio/portfolioSlice';
const DEMO_USER = {
    name: 'Soumyajit Behera',
    title: 'Full Stack Developer, React Developer, Open Source Contributor',
    bio: 'I am a freelancer based in India and I have been building noteworthy UX/UI designs and websites for years, which comply with the latest design trends. Having a sharp eye for product evolution helps me prioritise tasks, iterate fast and deliver faster.',
    profileImage: 'https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/avatar.svg',
    avatar: 'https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/avatar.svg',
    techStack: ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Git'],
    socials: {
        github: 'https://github.com/soumyajit4419',
        linkedin: 'https://www.linkedin.com/in/soumyajit4419/',
        twitter: 'https://twitter.com/SoumyajitBehera',
        instagram: 'https://www.instagram.com/soumyajit4419',
    },
    socialLinks: {
        github: 'https://github.com/soumyajit4419',
        linkedin: 'https://www.linkedin.com/in/soumyajit4419/',
    },
    resumeUrl: 'https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/Soumyajit_Behera-BIT_MESRA.pdf',
};

/**
 * Inner — syncs demo data to Redux (so any child using usePortfolioSelector also gets it)
 * AND passes it directly as props so PortfolioTemplateInner renders immediately.
 * This avoids the HOC timing race where the backend fetch overwrites demo data.
 */
const PortfolioDemoInner: React.FC = () => {
    const dispatch = useDispatch();

    // Sync to Redux store so template's usePortfolioSelector reads correct values
    useEffect(() => {
        dispatch(updateUserData(DEMO_USER as any));
    }, [dispatch]);

    return (
        <iframe
            src={`http://localhost:3003`}
            className="w-full h-screen border-0"
            title="Portfolio Demo - Raj Singh"
        />
    );
};

const PortfolioDemoPage: React.FC = () => (
    <Provider store={portfolioStore}>
        <PortfolioDemoInner />
    </Provider>
);

export default PortfolioDemoPage;
