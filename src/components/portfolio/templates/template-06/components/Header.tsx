import React from 'react';

export const Header: React.FC<{ userData: any }> = ({ userData }) => {

    return (
        <nav className="sticky top-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10 h-20">
            <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <div className="w-5 h-5 rounded-[4px] bg-gradient-to-br from-[#6EE7F7] to-[#B56EF7] flex items-center justify-center text-[9px] text-black font-bold">
                            <svg viewBox="0 0 16 16" fill="black" className="w-2.5 h-2.5"><path d="M8 3C5.5 3 4 4.5 4 6c0 1 .5 1.8 1.2 2.3C3.9 8.7 3 9.7 3 11h2c0-1 1.3-2 3-2s3 1 3 2h2c0-1.3-.9-2.3-2.2-2.7C11.5 7.8 12 7 12 6c0-1.5-1.5-3-4-3z" /></svg>
                        </div>
                        <div className="w-5 h-5 rounded-[4px] bg-gradient-to-br from-[#B56EF7] to-[#F7A26E] flex items-center justify-center text-[8px] font-mono font-black text-black">
                            ⟨/⟩
                        </div>
                    </div>
                    <span className="font-mono text-[12px] font-medium tracking-[0.12em] text-white uppercase">
                        [{userData?.name || 'CLOUD ARCHITECT'}]
                    </span>
                </div>

                <ul className="hidden md:flex items-center gap-10">
                    <li><a href="#about" className="text-[12px] font-normal tracking-[0.12em] uppercase text-white/55 hover:text-white transition-colors">About</a></li>
                    <li><a href="#portfolio" className="text-[12px] font-normal tracking-[0.12em] uppercase text-white/55 hover:text-white transition-colors">Portfolio</a></li>
                    <li><a href="#experience" className="text-[12px] font-normal tracking-[0.12em] uppercase text-white/55 hover:text-white transition-colors">Experience</a></li>
                    <li><a href="#skills" className="text-[12px] font-normal tracking-[0.12em] uppercase text-white/55 hover:text-white transition-colors">Skills</a></li>
                    <li><a href="#contact" className="text-[12px] font-normal tracking-[0.12em] uppercase text-white underline underline-offset-[3px] decoration-1">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};
