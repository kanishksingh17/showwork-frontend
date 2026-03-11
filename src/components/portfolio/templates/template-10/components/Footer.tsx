import React from 'react';

interface FooterProps {
    name?: string;
}

export const Footer: React.FC<FooterProps> = ({ name = 'Marcus Chen' }) => {
    return (
        <footer>
            <div className="footer-logo">📱 {name}.</div>
            <div className="footer-copy">© {new Date().getFullYear()} Mobile Engineering Portfolio.</div>
            <div className="footer-socials">
                <a href="#">GITHUB</a>
                <a href="#">LINKEDIN</a>
                <a href="#">TWITTER</a>
            </div>
        </footer>
    );
};
