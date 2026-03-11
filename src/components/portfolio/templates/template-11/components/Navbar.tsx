import React from 'react';

export const Navbar: React.FC = () => {
    return (
        <div className="absolute top-6 left-0 right-0 z-50 flex justify-center w-full px-4">
            <nav className="bg-[--datacmd-surface-dark] bg-opacity-80 backdrop-blur-md rounded-full px-6 py-2 border border-[--datacmd-border-muted] shadow-2xl shadow-black/50 transition-all duration-300">
                <ul className="flex items-center space-x-1 md:space-x-4 text-[10px] md:text-xs font-bold tracking-[0.2em] font-mono uppercase">
                    <li><a className="px-3 py-1.5 rounded-full text-white bg-[--datacmd-primary] bg-opacity-20 border border-[--datacmd-primary] border-opacity-30" href="#">Home</a></li>
                    <li><a className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors" href="#">Projects</a></li>
                    <li><a className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors" href="#">Stack</a></li>
                    <li><a className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors" href="#">Impact</a></li>
                    <li><a className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors" href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    );
};
