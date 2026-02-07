import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { portfolioStore } from '@/store/portfolio';
import { initializeDefaultSections, updateUserData } from '@/store/portfolio/portfolioSlice';
import { HeaderOrganism } from '@/components/portfolio/organisms/HeaderOrganism/HeaderOrganism';
import { AboutOrganism } from '@/components/portfolio/organisms/AboutOrganism/AboutOrganism';
import { SkillsOrganism } from '@/components/portfolio/organisms/SkillsOrganism/SkillsOrganism';
import { ProjectsOrganism } from '@/components/portfolio/organisms/ProjectsOrganism/ProjectsOrganism';
import { ResumeOrganism } from '@/components/portfolio/organisms/ResumeOrganism/ResumeOrganism';
import { ContactOrganism } from '@/components/portfolio/organisms/ContactOrganism/ContactOrganism';
import { FooterOrganism } from '@/components/portfolio/organisms/FooterOrganism/FooterOrganism';

// Icons for Navigation
import {
    AiOutlineHome,
    AiOutlineFundProjectionScreen,
    AiOutlineContacts
} from "react-icons/ai";
import { GiSkills } from "react-icons/gi"
import { CgFileDocument } from "react-icons/cg";


const ORIGINAL_NAV_ITEMS = [
    { label: 'Home', to: '/portfolio/demo/', icon: <AiOutlineHome style={{ marginBottom: "2px" }} /> },
    { label: 'Skillset', to: '/portfolio/demo/skillset', icon: <GiSkills style={{ marginBottom: "2px" }} /> },
    { label: 'Projects', to: '/portfolio/demo/project', icon: <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} /> },
    { label: 'Resume', to: '/portfolio/demo/resume', icon: <CgFileDocument style={{ marginBottom: "2px" }} /> },
    { label: 'Contact Me', to: '/portfolio/demo/contact', icon: <AiOutlineContacts style={{ marginBottom: "2px" }} /> },
];

const PortfolioContent: React.FC = () => {
    const dispatch = useDispatch();
    const [load, updateLoad] = React.useState(true);
    const { pathname } = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            updateLoad(false);
        }, 1200);

        dispatch(initializeDefaultSections());

        // Setup User Data
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

        return () => clearTimeout(timer);
    }, [dispatch]);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="App" id={load ? "no-scroll" : "scroll"}>
            <HeaderOrganism
                variant="HeaderMain"
                menuItems={ORIGINAL_NAV_ITEMS}
            />

            <Routes>
                <Route path="/" element={<AboutOrganism variant="HeroMain" />} />
                <Route path="skillset" element={<SkillsOrganism variant="SkillsMain" />} />
                <Route path="project" element={<ProjectsOrganism variant="ProjectsMain" />} />
                <Route path="resume" element={<ResumeOrganism variant="ResumeMain" />} />
                <Route path="contact" element={<ContactOrganism variant="ContactMain" />} />
                <Route path="*" element={<Navigate to="/portfolio/demo/" />} />
            </Routes>

            <FooterOrganism variant="FooterMain" />
        </div>
    );
};

const PortfolioDemoPage: React.FC = () => {
    return (
        <Provider store={portfolioStore}>
            <PortfolioContent />
        </Provider>
    );
};

export default PortfolioDemoPage;
