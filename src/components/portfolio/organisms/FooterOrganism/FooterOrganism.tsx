import React from 'react';
import { usePortfolioSelector } from '@/store/portfolio/hooks';
import { SocialLinksBar, type SocialLink } from '../../molecules/SocialLinksBar/SocialLinksBar';
import { AiFillGithub, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

export interface FooterOrganismProps {
    variant?: 'Footer01' | 'FooterMain';
    className?: string;
}

export const FooterOrganism: React.FC<FooterOrganismProps> = ({
    variant = 'Footer01',
    className,
}) => {
    const userData = usePortfolioSelector(state => state.portfolio.userData);

    // Convert social links from object to array
    const socialLinks: SocialLink[] = Object.entries(userData.socialLinks).map(([platform, url]) => ({
        platform: platform as SocialLink['platform'],
        url,
    }));

    const currentYear = new Date().getFullYear();

    // FooterMain - Exact replica of portfolio-main footer
    if (variant === 'FooterMain') {
        let date = new Date();
        let year = date.getFullYear();
        return (
            <div className={`bg-[#0a0416] py-4 text-white ${className || ''}`}>
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-3 gap-4 items-center text-center">
                        <div className="text-white text-base">
                            Designed and Developed by {userData.name || 'Soumyajit Behera'}
                        </div>
                        <div className="text-white text-base">
                            Copyright © {year} SB
                        </div>
                        <div>
                            <ul className="flex justify-center gap-8 list-none p-0 m-0">
                                <li className="inline-block">
                                    <a href={userData.socialLinks.github || "https://github.com/soumyajit4419"} target="_blank" rel="noopener noreferrer" className="text-white text-lg">
                                        <AiFillGithub />
                                    </a>
                                </li>
                                <li className="inline-block">
                                    <a href={userData.socialLinks.twitter || "https://twitter.com/SoumyajitBehera"} target="_blank" rel="noopener noreferrer" className="text-white text-lg">
                                        <AiOutlineTwitter />
                                    </a>
                                </li>
                                <li className="inline-block">
                                    <a href={userData.socialLinks.linkedin || "https://www.linkedin.com/in/soumyajit4419/"} target="_blank" rel="noopener noreferrer" className="text-white text-lg">
                                        <FaLinkedinIn />
                                    </a>
                                </li>
                                <li className="inline-block">
                                    <a href={userData.socialLinks.instagram || "https://www.instagram.com/soumyajit4419"} target="_blank" rel="noopener noreferrer" className="text-white text-lg">
                                        <AiFillInstagram />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <footer className={`bg-gray-900 text-white py-12 ${className || ''}`}>
            <div className="container mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* About Column */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">{userData.name || 'Portfolio'}</h3>
                        <p className="text-gray-400 text-sm">
                            {userData.title || 'Full-Stack Developer'}
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                            <li><a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a></li>
                            <li><a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a></li>
                            <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Feel free to reach out and connect
                        </p>
                        {socialLinks.length > 0 && (
                            <SocialLinksBar
                                links={socialLinks}
                                variant="solid"
                                size="md"
                            />
                        )}
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} {userData.name || 'Your Name'}. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        Designed & Built with ❤️ using React & Redux
                    </p>
                </div>
            </div>
        </footer>
    );
};
