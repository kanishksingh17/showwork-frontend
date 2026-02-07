import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaAngleUp } from 'react-icons/fa';

interface SimpleFolioFooterProps {
    socialLinks: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
}

export const SimpleFolioFooter: React.FC<SimpleFolioFooterProps> = ({ socialLinks = {} }) => {
    return (
        <footer className="bg-[#333333] text-white py-16 text-center">
            <div className="container mx-auto px-8">
                <a href="#hero" className="inline-block mb-12 text-white hover:text-[#02aab0] transition-colors duration-300">
                    <FaAngleUp size={30} />
                </a>

                <div className="flex justify-center gap-10 mb-10">
                    {socialLinks.twitter && (
                        <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="text-white hover:text-[#02aab0] transition-colors duration-300">
                            <FaTwitter size={24} />
                        </a>
                    )}
                    {socialLinks.linkedin && (
                        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-white hover:text-[#02aab0] transition-colors duration-300">
                            <FaLinkedin size={24} />
                        </a>
                    )}
                    {socialLinks.github && (
                        <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-white hover:text-[#02aab0] transition-colors duration-300">
                            <FaGithub size={24} />
                        </a>
                    )}
                </div>

                <hr className="border-[#404040] w-1/2 mx-auto mb-8" />

                <p className="text-[1.3rem] text-gray-400">
                    © {new Date().getFullYear()} - Template developed by <a href="https://github.com/cobiwave" target="_blank" rel="noreferrer" className="text-white hover:underline">Jacobo Martínez</a>
                    <br />
                    Ported to React by ShowWork
                </p>
            </div>
        </footer>
    );
};
