import React from 'react';
import { Zap } from 'lucide-react';

export const Header: React.FC<{ userData: any; onNavigate: (view: string) => void }> = ({ userData, onNavigate }) => {
    return (
        <nav className="bg-black text-white rounded-full px-6 py-4 flex items-center justify-between mb-16 shadow-2xl mx-auto max-w-6xl">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold group-hover:scale-110 transition-transform">
                    <Zap size={18} fill="currentColor" />
                </div>
                <span className="font-bold text-xl tracking-tight font-display">
                    {userData?.name?.split(' ')[0] || 'Dev'}Ipsum
                </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors">Projects</button>
                <button onClick={() => onNavigate('api')} className="hover:text-white transition-colors">API</button>
                <button onClick={() => onNavigate('casestudy')} className="hover:text-white transition-colors">Case Studies</button>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">Blog</button>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About</button>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onNavigate('contact')}
                    className="bg-[#D9FF3F] text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-opacity-90 transition-all transform hover:scale-105 active:scale-95"
                >
                    Hire Me
                </button>
            </div>
        </nav>
    );
};
