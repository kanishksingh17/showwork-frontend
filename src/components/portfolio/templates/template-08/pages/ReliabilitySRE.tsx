import React from 'react';

export const ReliabilitySRE: React.FC = () => {
    return (
        <div className="space-y-32 animate-fade-in">
            {/* Headline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-9">
                    <div className="mb-12 flex items-center gap-6">
                        <div className="w-16 hero-line"></div>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">A05 // Measured Assurance</span>
                    </div>
                    <h1 className="text-[8vw] lg:text-[8rem] font-black monolith-text uppercase">
                        RELIABILITY<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>ENGINEERING</span>
                    </h1>
                </div>
                <div className="lg:col-span-3 pb-6">
                    <p className="text-lg leading-relaxed text-muted font-light italic">
                        SLOs are more than targets; they are the contract between engineering and the business. Precision reliability through data.
                    </p>
                </div>
            </div>

            {/* SLO Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { label: 'Availability', target: '99.99%', actual: '99.994%', budget: 'Remaining: 12m/mo' },
                    { label: 'Latency (P99)', target: '< 250ms', actual: '184ms', budget: 'Health: Optimal' },
                    { label: 'Integrity', target: '100%', actual: '100%', budget: 'Zero Data Loss' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-black/5 p-12 shadow-soft group hover:border-accent transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-8">{item.label}</span>
                        <div className="flex items-end justify-between mb-8">
                            <span className="text-3xl font-black">{item.actual}</span>
                            <span className="text-[10px] font-bold text-accent">Target: {item.target}</span>
                        </div>
                        <div className="h-1 bg-black/5 w-full rounded-full overflow-hidden mb-6">
                            <div className="h-full bg-accent w-[92%] group-hover:w-[95%] transition-all duration-1000"></div>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-muted">{item.budget}</p>
                    </div>
                ))}
            </div>

            {/* Error Budget Policy */}
            <div className="bg-black text-white p-12 md:p-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                    <span className="material-symbols-outlined text-[30rem] leading-none">balance</span>
                </div>
                <div className="max-w-2xl relative z-10 space-y-12">
                    <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em]">Operational Policy</span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">The Error Budget<br />Framework</h2>
                    <p className="text-xl font-light leading-relaxed text-white/70 italic border-l border-white/20 pl-8">
                        "If the budget is depleted, all innovation ceases. We pivot 100% of engineering effort toward system stabilization."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider">Burn Rate Monitoring</h4>
                            <p className="text-xs text-white/40 leading-relaxed">Automated alerts trigger when budget consumption exceeds 2% per hour.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider">Freeze Protocols</h4>
                            <p className="text-xs text-white/40 leading-relaxed">Dynamic deployment inhibitors active during high-volatility events.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
