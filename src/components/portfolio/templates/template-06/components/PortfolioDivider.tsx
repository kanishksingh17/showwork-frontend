import React from 'react';

export const PortfolioDivider: React.FC = () => {
    return (
        <section className="py-12 border-b border-white/10 overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6 overflow-hidden">
                <div className="font-display text-[72px] lg:text-[120px] font-black uppercase text-white tracking-[-0.01em] leading-none whitespace-nowrap -ml-2">
                    Selected Projects<span className="opacity-[0.08] ml-16">Selected Projects</span>
                </div>
            </div>
        </section>
    );
};
