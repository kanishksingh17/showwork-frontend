import React from 'react';

export const HeaderStrategic: React.FC<{ name?: string }> = ({ name }) => {
    return (
        <nav className="w-full px-8 md:px-16 py-10 flex justify-between items-center max-w-[1600px] mx-auto sticky top-0 bg-white/90 backdrop-blur-xl z-50">
            <div className="text-2xl font-black tracking-tighter uppercase">
                {name}
            </div>
            <div className="hidden md:flex space-x-16 items-center">
                <a className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors" href="#summary">Executive Summary</a>
                <a className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors" href="#values">Value Pillars</a>
                <a className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors" href="#metrics">Impact Metrics</a>
                <button className="bg-primary text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all">
                    Get Resume
                </button>
            </div>
        </nav>
    );
};
