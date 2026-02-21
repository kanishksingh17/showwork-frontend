import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { portfolioStore } from '@/store/portfolio';
import { updateUserData } from '@/store/portfolio/portfolioSlice';
import { PortfolioTemplateInner } from '@/components/portfolio/templates/PortfolioTemplate';

/**
 * Static demo data — content only, layout is never touched.
 * To show a different person's demo, change values here ONLY.
 */
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

const DEMO_PROJECTS = [
    {
        id: 'chatbot',
        title: 'AI Chatbot',
        name: 'AI Chatbot',
        description: 'A smart chatbot interface powered by GPT, built with React and Node.js.',
        technologies: ['React', 'Node.js', 'Python'],
        githubUrl: 'https://github.com/soumyajit4419',
    },
    {
        id: 'portfolio',
        title: 'Developer Portfolio',
        name: 'Developer Portfolio',
        description: 'A pixel-perfect, animated developer portfolio built with React and Bootstrap.',
        technologies: ['React', 'JavaScript', 'CSS'],
        githubUrl: 'https://github.com/soumyajit4419/Portfolio',
        liveUrl: 'https://soumyajit.vercel.app',
    },
];

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
        <PortfolioTemplateInner
            userData={DEMO_USER}
            projects={DEMO_PROJECTS}
        />
    );
};

const PortfolioDemoPage: React.FC = () => (
    <Provider store={portfolioStore}>
        <PortfolioDemoInner />
    </Provider>
);

export default PortfolioDemoPage;
