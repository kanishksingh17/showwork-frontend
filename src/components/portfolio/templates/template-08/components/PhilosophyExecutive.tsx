import React from 'react';

export const PhilosophyExecutive: React.FC = () => {
    return (
        <section className="bg-black text-white py-40 px-8 md:px-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                <span className="material-symbols-outlined text-[30rem] leading-none select-none">architecture</span>
            </div>
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
                <div className="space-y-12">
                    <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em]">Executive Philosophy</span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">Engineering Is The Strategy</h2>
                    <div className="flex items-start gap-8 border-l border-white/20 pl-8">
                        <p className="text-xl font-light leading-relaxed text-white/70 italic">
                            "Hope is not a strategy. Reliability is a technical challenge that requires an engineering solution, not a management one."
                        </p>
                    </div>
                </div>
                <div className="space-y-16">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-white/40">Reliability Lifecycle</h4>
                        <div className="space-y-10">
                            <div className="flex items-center gap-8 group">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors font-mono text-sm">01</div>
                                <div className="flex-1">
                                    <h5 className="text-lg font-bold uppercase tracking-wider">Detection Isolation</h5>
                                    <div className="h-px bg-white/10 mt-2 w-full"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 group">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors font-mono text-sm">02</div>
                                <div className="flex-1">
                                    <h5 className="text-lg font-bold uppercase tracking-wider">Automated Remediation</h5>
                                    <div className="h-px bg-white/10 mt-2 w-full"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 group">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors font-mono text-sm">03</div>
                                <div className="flex-1">
                                    <h5 className="text-lg font-bold uppercase tracking-wider">Blameless Evolution</h5>
                                    <div className="h-px bg-white/10 mt-2 w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="border border-white/30 hover:border-white hover:bg-white hover:text-black px-12 py-5 text-[10px] font-bold uppercase tracking-widest transition-all">
                        Download Portfolio Briefing
                    </button>
                </div>
            </div>
        </section>
    );
};
