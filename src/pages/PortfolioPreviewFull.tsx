import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { portfolioStore } from '@/store/portfolio';
import { initializeDefaultSections, updateUserData } from '@/store/portfolio/portfolioSlice';
import { HeaderOrganism } from '@/components/portfolio/organisms/HeaderOrganism/HeaderOrganism';
import { AboutOrganism } from '@/components/portfolio/organisms/AboutOrganism/AboutOrganism';
import { SkillsOrganism } from '@/components/portfolio/organisms/SkillsOrganism/SkillsOrganism';
import { ProjectsOrganism } from '@/components/portfolio/organisms/ProjectsOrganism/ProjectsOrganism';
import { ResumeOrganism } from '@/components/portfolio/organisms/ResumeOrganism/ResumeOrganism';
import { ContactOrganism } from '@/components/portfolio/organisms/ContactOrganism/ContactOrganism';
import { FooterOrganism } from '@/components/portfolio/organisms/FooterOrganism/FooterOrganism';

import {
    AiOutlineHome,
    AiOutlineFundProjectionScreen,
    AiOutlineContacts
} from "react-icons/ai";
import { GiSkills } from "react-icons/gi"
import { CgFileDocument } from "react-icons/cg";

const ORIGINAL_NAV_ITEMS = [
    { label: 'Home', to: '#home', icon: <AiOutlineHome style={{ marginBottom: "2px" }} /> },
    { label: 'Skillset', to: '#skillset', icon: <GiSkills style={{ marginBottom: "2px" }} /> },
    { label: 'Projects', to: '#projects', icon: <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} /> },
    { label: 'Resume', to: '#resume', icon: <CgFileDocument style={{ marginBottom: "2px" }} /> },
    { label: 'Contact Me', to: '#contact', icon: <AiOutlineContacts style={{ marginBottom: "2px" }} /> },
];

import { SimpleFolioTemplate } from '@/components/portfolio/simplefolio/SimpleFolioTemplate';
import { useLocation } from 'react-router-dom';

const PortfolioContent: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isBackend = location.pathname.includes('backend') || new URLSearchParams(location.search).get('type') === 'backend';

    useEffect(() => {
        dispatch(initializeDefaultSections());

        if (isBackend) {
            dispatch(updateUserData({
                name: 'Alex Server',
                title: 'Backend Systems Engineer',
                bio: 'Specialized in building high-performance distributed systems and scalable microservices. I love optimizing database queries, designing RESTful & GraphQL APIs, and ensuring 99.99% uptime. Experienced with Go, Java, and Cloud Infrastructure.',
                profileImage: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Black&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light',
                socialLinks: {
                    github: 'https://github.com/',
                    linkedin: 'https://linkedin.com/',
                    twitter: 'https://twitter.com/',
                    instagram: 'https://instagram.com/',
                },
                resumeUrl: "#"
            }));
        } else {
            dispatch(updateUserData({
                name: 'Soumyajit Behera',
                title: 'Full Stack Developer',
                bio: 'I am a freelancer based in the India and i have been building noteworthy UX/UI designs and websites for years, which comply with the latest design trends. I help convert a vision and an idea into meaningful and useful products. Having a sharp eye for product evolution helps me prioritize tasks, iterate fast and deliver faster.',
                profileImage: 'https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/avatar.svg',
                socialLinks: {
                    github: 'https://github.com/soumyajit4419',
                    linkedin: 'https://www.linkedin.com/in/soumyajit4419/',
                    twitter: 'https://twitter.com/SoumyajitBehera',
                    instagram: 'https://www.instagram.com/soumyajit4419',
                },
                resumeUrl: "https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/Soumyajit_Behera-BIT_MESRA.pdf"
            }));
        }
    }, [dispatch, location, isBackend]);

    if (isBackend) {
        return <SimpleFolioTemplate
            userData={{
                name: 'Alex Server',
                title: 'Backend Systems Engineer',
                bio: 'Specialized in building high-performance distributed systems.',
                profileImage: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Black&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light',
                socialLinks: {
                    github: 'https://github.com/',
                    linkedin: 'https://linkedin.com/',
                },
                resumeUrl: "#"
            }}
            projects={[
                {
                    title: 'High-Scale DB',
                    description: 'Optimized query engine for distributed database.',
                    liveUrl: '#',
                    sourceUrl: '#',
                    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b01201b?auto=format&fit=crop&q=80&w=1000'
                },
                {
                    title: 'GraphQL Gateway',
                    description: 'Unified federated GraphQL gateway for microservices.',
                    liveUrl: '#',
                    sourceUrl: '#',
                    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000'
                }
            ]}
        />;
    }

    return (
        <div className="App">
            <HeaderOrganism
                variant="HeaderMain"
                menuItems={ORIGINAL_NAV_ITEMS}
            />

            <div id="home">
                <AboutOrganism variant="HeroMain" />
            </div>

            <div id="skillset">
                <SkillsOrganism variant="SkillsMain" />
            </div>

            <div id="projects">
                <ProjectsOrganism variant="ProjectsMain" />
            </div>

            <div id="resume">
                <ResumeOrganism variant="ResumeMain" />
            </div>

            <div id="contact">
                <ContactOrganism variant="ContactMain" />
            </div>

            <FooterOrganism variant="FooterMain" />
        </div>
    );
};

const PortfolioPreviewFull: React.FC = () => {
    return (
        <Provider store={portfolioStore}>
            <PortfolioContent />
        </Provider>
    );
};

export default PortfolioPreviewFull;
