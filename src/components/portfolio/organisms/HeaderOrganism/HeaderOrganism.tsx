import React from 'react';
import { Logo } from '../../atoms/Logo/Logo';
import { NavigationMenu, type MenuItem } from '../../molecules/NavigationMenu/NavigationMenu';
import { SocialLinksBar, type SocialLink } from '../../molecules/SocialLinksBar/SocialLinksBar';
import { usePortfolioSelector } from '@/store/portfolio/hooks';

export interface HeaderOrganismProps {
    variant: 'Header01' | 'Header02' | 'Header03' | string;
    menuItems?: MenuItem[];
    socialLinks?: SocialLink[];
    className?: string;
}

export const HeaderOrganism: React.FC<HeaderOrganismProps> = ({
    variant,
    menuItems = [],
    socialLinks = [],
    className,
}) => {
    const userData = usePortfolioSelector(state => state.portfolio.userData);

    // Default menu items if not provided
    const defaultMenuItems: MenuItem[] = [
        { label: 'Home', to: '#home' },
        { label: 'About', to: '#about' },
        { label: 'Skills', to: '#skills' },
        { label: 'Projects', to: '#projects' },
        { label: 'Contact', to: '#contact' },
    ];

    const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

    // Scroll effect for HeaderMain
    const [navColour, updateNavbar] = React.useState(false);

    React.useEffect(() => {
        function scrollHandler() {
            if (window.scrollY >= 20) {
                updateNavbar(true);
            } else {
                updateNavbar(false);
            }
        }
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);

    // Variant-specific rendering logic
    const renderHeader = () => {
        switch (variant) {
            case 'HeaderMain':
                // Replicating Navbar.jsx from portfolio-main
                return (
                    <header
                        className={`sticky w-full top-0 z-50 transition-all duration-300 ${navColour ? "bg-[#1b1a2ea9] shadow-lg backdrop-blur-md py-2" : "bg-transparent py-4"
                            } ${className || ''}`}
                    >
                        <div className="container mx-auto flex items-center justify-between px-4">
                            <Logo text={userData.name || 'Portfolio'} variant="image" imageSrc={userData.profileImage} className="max-h-12" />

                            <div className="hidden md:block">
                                <NavigationMenu
                                    items={items}
                                    variant="highlight"
                                    className="text-white"
                                />
                            </div>

                            {/* Mobile menu button could go here */}
                            <div className="md:hidden text-white text-2xl cursor-pointer">
                                ☰
                            </div>
                        </div>
                    </header>
                );

            case 'Header01':
                // Centered logo with nav below and social links
                return (
                    <header className={`container mx-auto py-6 ${className || ''}`}>
                        <div className="flex flex-col items-center gap-6">
                            <Logo text={userData.name || 'Portfolio'} variant="gradient" />
                            <NavigationMenu items={items} variant="underline" />
                            {socialLinks.length > 0 && (
                                <SocialLinksBar links={socialLinks} variant="ghost" />
                            )}
                        </div>
                    </header>
                );

            case 'Header02':
                // Logo left, nav right, minimal design
                return (
                    <header className={`container mx-auto py-6 ${className || ''}`}>
                        <div className="flex items-center justify-between">
                            <Logo text={userData.name || 'Portfolio'} variant="text" />
                            <NavigationMenu items={items} variant="pill" />
                        </div>
                    </header>
                );

            case 'Header03':
                // Full-width with gradient background
                return (
                    <header className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white ${className || ''}`}>
                        <div className="container mx-auto py-6 flex items-center justify-between">
                            <Logo text={userData.name || 'Portfolio'} variant="text" className="text-white" />
                            <div className="flex items-center gap-8">
                                <NavigationMenu items={items} variant="highlight" className="text-white" />
                                {socialLinks.length > 0 && (
                                    <SocialLinksBar links={socialLinks} variant="ghost" />
                                )}
                            </div>
                        </div>
                    </header>
                );

            default:
                // Default header layout
                return (
                    <header className={`container mx-auto py-6 ${className || ''}`}>
                        <div className="flex items-center justify-between">
                            <Logo text={userData.name || 'Portfolio'} />
                            <NavigationMenu items={items} />
                            {socialLinks.length > 0 && (
                                <SocialLinksBar links={socialLinks} className="ml-6" />
                            )}
                        </div>
                    </header>
                );
        }
    };

    return renderHeader();
};
