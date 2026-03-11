import React from 'react';

export const Footer: React.FC<{ userData: any }> = ({ userData }) => {
    return (
        <footer className="pt-14 pb-10">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10 rounded overflow-hidden mb-10">
                    <div className="bg-black p-10 flex items-start justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <a href={`mailto:${userData?.email || 'hello@clouddevs.pro'}`} className="text-[15px] text-white/55 hover:text-white transition-colors">
                                {userData?.email || 'hello@clouddevs.pro'}
                            </a>
                        </div>
                        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="black" strokeWidth="2" /><polyline points="2,4 12,13 22,4" fill="none" stroke="black" strokeWidth="2" /></svg>
                        </div>
                    </div>
                    <div className="bg-black p-10 flex items-start justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <a href="#" className="text-[15px] text-white/55 hover:text-white transition-colors">LinkedIn</a>
                            <a href="#" className="text-[15px] text-white/55 hover:text-white transition-colors">Dribbble</a>
                        </div>
                        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-black"><path d="M12 21C12 21 3 14 3 8a5 5 0 0110 0 5 5 0 0110 0c0 6-9 13-9 13z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                    <span className="text-[12px] text-white/35 tracking-[0.08em]">Privacy Policy</span>
                    <span className="text-[12px] text-white/35 font-mono tracking-[0.06em]">©{new Date().getFullYear()} «{userData?.name || 'Cloud Architect'}»</span>
                </div>
            </div>
        </footer>
    );
};
