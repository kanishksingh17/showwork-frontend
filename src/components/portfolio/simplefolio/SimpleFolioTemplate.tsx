import React from 'react';
import { useSelector } from 'react-redux';
import type { PortfolioRootState } from '@/store/portfolio';
import { SimpleFolioHero } from './organisms/SimpleFolioHero';
import { SimpleFolioAbout } from './organisms/SimpleFolioAbout';
import { SimpleFolioProjects } from './organisms/SimpleFolioProjects';
import { SimpleFolioContact } from './organisms/SimpleFolioContact';
import { SimpleFolioFooter } from './organisms/SimpleFolioFooter';
import './simplefolio.css';

interface SimpleFolioTemplateProps {
    userData?: any;
    projects?: any[];
}

export const SimpleFolioLayout: React.FC<SimpleFolioTemplateProps> = ({ userData: propUserData, projects: propProjects }) => {
    console.log('SimpleFolioLayout Rendering', { propUserData, propProjects });
    // Merge or fallback
    const userData = propUserData || {};
    const projects = propProjects || [];

    // Map existing data to SimpleFolio props
    const heroProps = {
        name: userData.name || 'Unknown Developer',
        title: userData.title || 'Developer'
    };

    const aboutProps = {
        bio: userData.bio || '',
        profileImage: userData.profileImage || 'assets/profile.jpg',
        resumeUrl: userData.resumeUrl
    };

    const projectProps = {
        projects: (projects || []).map((p: any) => ({
            title: p.title || p.name,
            description: p.description,
            liveUrl: p.liveUrl,
            sourceUrl: p.githubUrl,
            imageUrl: p.imageUrl || 'assets/project.jpg'
        }))
    };

    const contactProps = {
        email: "jacobojavier98@gmail.com", // Fallback or from user data if available
        ctaText: "Would you like to work with me? Awesome!"
    };

    const footerProps = {
        socialLinks: userData.socialLinks
    };

    return (
        <div className="simplefolio-wrapper bg-white min-h-screen text-[1.6rem] font-sans antialiased">
            <SimpleFolioHero {...heroProps} />
            <SimpleFolioAbout {...aboutProps} />
            <SimpleFolioProjects {...projectProps} />
            <SimpleFolioContact {...contactProps} />
            <SimpleFolioFooter {...footerProps} />

            <style>{`
          /* Global reset overrides for SimpleFolio to match its base font size strategy */
          .simplefolio-wrapper {
             /* simplefolio uses 1.6rem as default with html font-size 62.5% -> 10px */
             /* existing app might not use 62.5% html size, so we might need to adjust rems or force font-size */
             /* For now assuming standard rem, so 1.6rem = 25.6px might be too big if html is 16px. */
             /* If html is 16px, 1.6rem is 25px. The original used html { font-size: 62.5% } -> 1rem = 10px. */
             /* So 1.6rem should be 16px. */
          }
       `}</style>
        </div>
    );
};

export const SimpleFolioTemplate: React.FC<SimpleFolioTemplateProps> = ({ userData: propUserData, projects: propProjects }) => {
    // Try to get data from Redux, but be safe if undefined (e.g. used without Provider)
    const reduxState = useSelector((state: PortfolioRootState) => state.portfolio);

    // Merge or fallback
    const userData = propUserData || reduxState?.userData || {};
    // Projects are not currently in the Redux slice for portfolio, so we rely on props or default empty
    const projects = propProjects || [];

    return <SimpleFolioLayout userData={userData} projects={projects} />;
};
