import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="py-6 px-10 border-b border-white/10">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold tracking-tighter">MICROSERVICES_ARCH</div>
                <nav className="flex gap-6 text-xs uppercase tracking-widest text-slate-400">
                    <span>About</span>
                    <span>Projects</span>
                    <span>Contact</span>
                </nav>
            </div>
        </header>
    );
};
