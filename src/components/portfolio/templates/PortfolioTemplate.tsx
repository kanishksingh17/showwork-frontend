import React from 'react';
import { Provider } from 'react-redux';
import { portfolioStore } from '@/store/portfolio';
import { usePortfolioSelector } from '@/store/portfolio/hooks';
import { HeaderOrganism } from '../organisms/HeaderOrganism/HeaderOrganism';
import { AboutOrganism } from '../organisms/AboutOrganism/AboutOrganism';
import { SkillsOrganism } from '../organisms/SkillsOrganism/SkillsOrganism';
import { ResumeOrganism } from '../organisms/ResumeOrganism/ResumeOrganism';
import { ContactOrganism } from '../organisms/ContactOrganism/ContactOrganism';



import { FooterOrganism } from '../organisms/FooterOrganism/FooterOrganism';
import { type MenuItem } from '../molecules/NavigationMenu/NavigationMenu';
import { type SocialLink } from '../molecules/SocialLinksBar/SocialLinksBar';
import {
    AiOutlineHome,
    AiOutlineFundProjectionScreen,
    AiOutlineUser,
    AiOutlineContacts
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { TbCertificate } from "react-icons/tb";

/**
 * Inner component that renders the portfolio template
 * This is separated to access Redux hooks after Provider is set up
 */
const PortfolioTemplateInner: React.FC = () => {
    const sections = usePortfolioSelector(state => state.portfolio.sections);
    const userData = usePortfolioSelector(state => state.portfolio.userData);

    // Default menu items with icons
    const menuItems: MenuItem[] = [
        { label: 'Home', to: '#home', icon: <AiOutlineHome /> },
        { label: 'About', to: '#about', icon: <AiOutlineUser /> },
        { label: 'Skills', to: '#skills', icon: <TbCertificate /> },
        { label: 'Projects', to: '#projects', icon: <AiOutlineFundProjectionScreen /> },
        { label: 'Resume', to: '#resume', icon: <CgFileDocument /> },
        { label: 'Contact', to: '#contact', icon: <AiOutlineContacts /> },
    ];

    // Convert social links from object to array
    const socialLinks: SocialLink[] = Object.entries(userData.socialLinks || {}).map(([platform, url]) => ({
        platform: platform as SocialLink['platform'],
        url,
    }));

    // Sort sections by order
    const sortedSections = [...sections].sort((a, b) => a.order - b.order);

    return (
        <div className="portfolio-template min-h-screen bg-white dark:bg-gray-900">
            {sortedSections.map(section => {
                if (!section.isVisible) return null;

                switch (section.type) {
                    case 'header':
                        return (
                            <HeaderOrganism
                                key={section.id}
                                variant={section.variant}
                                menuItems={menuItems}
                                socialLinks={socialLinks}
                                {...section.customData}
                            />
                        );

                    case 'about':
                        return (
                            <AboutOrganism
                                key={section.id}
                                variant={section.variant as 'Hero01' | 'Hero02' | 'HeroMain'}
                                {...section.customData}
                            />
                        );

                    case 'skills':
                        return (
                            <SkillsOrganism
                                key={section.id}
                                variant={section.variant as 'Skills01' | 'Skills02'}
                                {...section.customData}
                            />
                        );

                    case 'projects':
                        return (
                            <ProjectsOrganism
                                key={section.id}
                                variant={section.variant as 'Projects01'}
                                {...section.customData}
                            />
                        );

                    case 'resume':
                        return (
                            <ResumeOrganism
                                key={section.id}
                                variant={section.variant as 'ResumeMain'}
                                {...section.customData}
                            />
                        );

                    case 'contact':
                        return (
                            <ContactOrganism
                                key={section.id}
                                variant={section.variant as 'ContactMain'}
                                {...section.customData}
                            />
                        );

                    case 'footer':
                        return (
                            <FooterOrganism
                                key={section.id}
                                variant={section.variant as 'Footer01'}
                                {...section.customData}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

/**
 * Main Portfolio Template component
 * Wraps the template with Redux Provider
 */
export const PortfolioTemplate: React.FC = () => {
    return (
        <Provider store={portfolioStore}>
            <PortfolioTemplateInner />
        </Provider>
    );
};
