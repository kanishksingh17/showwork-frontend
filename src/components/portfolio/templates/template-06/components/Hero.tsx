import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC<{ userData: any }> = ({ userData }) => {
    const nameParts = userData?.name?.split(' ') || ['Cloud', 'Architect'];
    const firstName = nameParts[0] || 'PORT';
    const lastName = nameParts[nameParts.length - 1] || 'FOLIO';

    return (
        <section className="pt-20 pb-16 border-b border-white/10 overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] items-center gap-16">
                    <div className="flex gap-4 items-start">
                        <div className="flex flex-col gap-3 pt-2">
                            <div className="w-[clamp(72px,9vw,112px)] h-[clamp(72px,9vw,112px)] bg-white rounded-[clamp(12px,1.4vw,20px)] flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 24 24" className="w-[55%] h-[55%] fill-black"><path d="M19 18H6a4 4 0 010-8h.34A6 6 0 1119 18z" /></svg>
                            </div>
                            <div className="w-[clamp(72px,9vw,112px)] h-[clamp(72px,9vw,112px)] bg-white rounded-[clamp(12px,1.4vw,20px)] flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 24 24" className="w-[55%] h-[55%]"><polyline points="16 18 22 12 16 6" stroke="black" strokeWidth="2.5" fill="none" /><polyline points="8 6 2 12 8 18" stroke="black" strokeWidth="2.5" fill="none" /></svg>
                            </div>
                        </div>
                        <h1 className="font-display text-[96px] lg:text-[160px] font-black leading-[0.92] tracking-tight uppercase text-white">
                            {firstName}<br />
                            {lastName}
                        </h1>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="w-[300px] h-[300px] rounded-full bg-[conic-gradient(from_0deg,#6EE7F7,#B56EF7,#F7A26E,#6EF7A2,#F76EE7,#6EE7F7)] shadow-[0_0_80px_rgba(110,231,247,0.25),0_0_40px_rgba(181,110,247,0.20),inset_0_0_60px_rgba(0,0,0,0.4)] relative">
                            <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.3)_0%,transparent_60%)]" />
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-5 flex justify-between items-center border-t border-white/10">
                    <span className="text-[11px] font-normal tracking-[0.2em] uppercase text-white/35">Breakthrough</span>
                    <span className="text-[11px] font-normal tracking-[0.2em] uppercase text-white/35">Inspired</span>
                    <span className="text-[11px] font-normal tracking-[0.2em] uppercase text-white/35">Technology</span>
                </div>
            </div>
        </section>
    );
};
