import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

export const Header: React.FC<{ userData: any; onNavigate?: (view: 'home' | 'about' | 'blog' | 'speaking' | 'toolbox' | 'projects') => void }> = ({ userData, onNavigate }) => {
    const socials = userData?.socialLinks || userData?.socials || {};

    return (
        <header className="flex justify-between items-center mb-20">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate?.('home')}>
                <div className="w-10 h-10 bg-[#181a20] dark:bg-white rounded-xl flex items-center justify-center border border-gray-200 dark:border-[#2d3039] shadow-sm overflow-hidden p-1 transition-transform group-hover:scale-110">
                    <img src="/favicon.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
            </div>
            <nav className="hidden md:flex bg-white dark:bg-[#181a20] rounded-full px-6 py-2 border border-gray-200 dark:border-[#2d3039] shadow-sm gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                <button onClick={() => { onNavigate?.('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">Home</button>
                <button onClick={() => onNavigate?.('about')} className="hover:text-indigo-600 transition-colors">About</button>
                <button onClick={() => onNavigate?.('blog')} className="hover:text-indigo-600 transition-colors">Blog</button>
                <button onClick={() => onNavigate?.('projects')} className="hover:text-indigo-600 transition-colors">Projects</button>
                <button onClick={() => onNavigate?.('speaking')} className="hover:text-indigo-600 transition-colors">Speaking</button>
                <button onClick={() => onNavigate?.('toolbox')} className="hover:text-indigo-600 transition-colors">Toolbox</button>
            </nav>
            <div className="flex bg-[#2d2d2d] dark:bg-[#181a20] rounded-full px-4 py-2 border border-transparent shadow-lg gap-4 items-center">
                <a href={socials.twitter || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter size={18} strokeWidth={1.5} />
                </a>
                <a href={socials.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin size={18} strokeWidth={1.5} />
                </a>
                <a href={socials.github || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Github size={18} strokeWidth={1.5} />
                </a>
            </div>
        </header>
    );
};
