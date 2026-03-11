import React from 'react';

export const EcosystemStrategic: React.FC = () => {
    return (
        <section id="values" className="py-24 md:py-40 px-8 md:px-16 bg-white overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div className="max-w-2xl">
                        <span className="text-accent font-black uppercase text-[10px] tracking-[0.4em] block mb-6">Core Ecosystem</span>
                        <h2 className="text-6xl md:text-[9rem] font-black uppercase leading-[0.8] tracking-tighter monolith-text">
                            The<br />Infrastructure<br />Capital
                        </h2>
                    </div>
                    <div className="md:text-right max-w-sm">
                        <p className="text-sm md:text-base text-muted leading-relaxed font-light">
                            We invest in top-tier technology that translates directly into operational efficiency and market speed.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 border border-black/5 divide-y md:divide-y-0 md:divide-x divide-black/5">
                    {/* Card 01 */}
                    <div className="bg-white p-12 md:p-24 group hover:bg-black transition-all duration-700 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <div className="w-20 h-20 bg-soft-gray group-hover:bg-white/10 flex items-center justify-center transition-colors">
                                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-accent transition-colors">visibility</span>
                            </div>
                            <span className="text-6xl font-black text-black/5 group-hover:text-white/5 transition-colors">01</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-5xl font-black uppercase mb-6 group-hover:text-white transition-colors tracking-tighter">Predictive<br />Observability</h3>
                            <p className="text-muted group-hover:text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-md transition-colors">
                                Transforming raw data into foresight. We don't just react to failures; we anticipate them through multi-dimensional signal analysis.
                            </p>
                            <div className="mt-16 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-accent transition-colors">
                                View Capability Map <span className="material-symbols-outlined text-sm">north_east</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 02 */}
                    <div className="bg-white p-12 md:p-24 group hover:bg-black transition-all duration-700 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <div className="w-20 h-20 bg-soft-gray group-hover:bg-white/10 flex items-center justify-center transition-colors">
                                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-accent transition-colors">auto_mode</span>
                            </div>
                            <span className="text-6xl font-black text-black/5 group-hover:text-white/5 transition-colors">02</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-5xl font-black uppercase mb-6 group-hover:text-white transition-colors tracking-tighter">Autonomous<br />Scale</h3>
                            <p className="text-muted group-hover:text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-md transition-colors">
                                Dynamic resource allocation that mirrors business demand. Our orchestration layer ensures cost-efficiency without sacrificing performance.
                            </p>
                            <div className="mt-16 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-accent transition-colors">
                                Resource Metrics <span className="material-symbols-outlined text-sm">north_east</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
