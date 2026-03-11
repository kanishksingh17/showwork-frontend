import React from 'react';

export const HeroTitle: React.FC = () => {
    return (
        <div className="md:col-span-6 flex flex-col items-center justify-center text-center py-6 px-4">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
                <span className="text-[10px] font-mono text-[--datacmd-accent-cyan] tracking-widest uppercase">Central Command v2.4</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight text-white pixel-text">
                DATA.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400">CLARITY.</span><br />
                IMPACT.
            </h1>
        </div>
    );
};
