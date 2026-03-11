import React from 'react';

export const CaseStudies: React.FC = () => {
    return (
        <div className="space-y-32 animate-fade-in">
            {/* Headline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-9">
                    <div className="mb-12 flex items-center gap-6">
                        <div className="w-16 hero-line"></div>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">A09 // Production Resolution Deep-Dives</span>
                    </div>
                    <h1 className="text-[8vw] lg:text-[8rem] font-black monolith-text uppercase">
                        CASE<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>STUDIES</span>
                    </h1>
                </div>
                <div className="lg:col-span-3 pb-6">
                    <p className="text-lg leading-relaxed text-muted font-light italic">
                        Real-world systems challenges met with engineered solutions. No hype, just data-driven production resolutions.
                    </p>
                </div>
            </div>

            {/* Case Study Cards */}
            <div className="space-y-24">
                {[
                    {
                        id: 'CS_01',
                        title: 'Zero-Downtime Multi-Region Failover',
                        challenge: 'Critical database latency spikes across US-East-1 region, impacting 40% of global traffic.',
                        solution: 'Automated global edge traffic redirection with state-synced regional failover clusters.',
                        outcome: 'Recovery in < 45s with zero data loss and 99.999% availability maintained.',
                        metrics: [{ l: 'Availability', v: '99.999%' }, { l: 'MTTR', v: '42s' }]
                    },
                    {
                        id: 'CS_02',
                        title: 'Infrastructure Cost Realignment',
                        challenge: 'Cloud OpEx scaling non-linearly with traffic growth, leading to 25% waste in over-provisioned clusters.',
                        solution: 'Strategic ML-driven right-sizing and spot-instance orchestration layer implementation.',
                        outcome: '30% reduction in annual cloud spend with zero impact on P99 latency targets.',
                        metrics: [{ l: 'Savings', v: '30%' }, { l: 'MTD ROI', v: '4.2x' }]
                    }
                ].map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 group">
                        <div className="lg:col-span-2">
                            <span className="text-[10px] font-mono font-bold text-accent">{item.id}</span>
                        </div>
                        <div className="lg:col-span-7 space-y-8">
                            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight group-hover:text-accent transition-colors">{item.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-black/5">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Challenge</h4>
                                    <p className="text-sm text-muted font-light leading-relaxed">{item.challenge}</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Resolution</h4>
                                    <p className="text-sm text-muted font-light leading-relaxed">{item.solution}</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-3">
                            <div className="bg-soft-gray p-8 space-y-8 border border-black/5 h-full flex flex-col justify-center">
                                {item.metrics.map((m, i) => (
                                    <div key={i}>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted block mb-2">{m.l}</span>
                                        <span className="text-3xl font-black text-primary">{m.v}</span>
                                    </div>
                                ))}
                                <button className="pt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2 group-hover:gap-4 transition-all">
                                    Read Post-Mortem <span className="material-symbols-outlined text-sm">north_east</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
