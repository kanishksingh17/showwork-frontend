import React from 'react';

interface NavbarProps {
    name?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ name = 'Marcus' }) => {
    // Extract first name or default to 'Marcus'
    const displayName = name.split(' ')[0] || 'Marcus';

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav>
            <div className="nav-pill">
                <div className="nav-logo">
                    <div className="nav-logo-mark">📱</div>
                    <span className="nav-logo-name">{displayName}.</span>
                </div>
                <ul className="nav-links hidden md:flex">
                    <li><a href="#stack" onClick={(e) => handleScroll(e, 'stack')}>Stack</a></li>
                    <li><a href="#apps" onClick={(e) => handleScroll(e, 'apps')}>Apps</a></li>
                    <li><a href="#testimonials" onClick={(e) => handleScroll(e, 'testimonials')}>Reviews</a></li>
                    <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a></li>
                </ul>
                <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="nav-cta">
                    Let's Build <span className="arrow">↗</span>
                </a>
            </div>
        </nav>
    );
};
