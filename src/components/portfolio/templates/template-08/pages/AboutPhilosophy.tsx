import React from 'react';

export const AboutPhilosophy: React.FC<{ sections?: any[] }> = ({ sections }) => {
    const philosophyData = sections?.find((s: any) => s.variant === 'AboutPhilosophy' || s.id === 'about')?.customData || {};

    return (
        <div className="space-y-32 animate-fade-in">
            {/* Headline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-9">
                    <div className="mb-12 flex items-center gap-6">
                        <div className="w-16 hero-line"></div>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">A01 // Strategic Intent</span>
                    </div>
                    <h1 className="text-[8vw] lg:text-[8rem] font-black monolith-text uppercase">
                        {philosophyData.titleLine1 || "INFRASTRUCTURE"}<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>{philosophyData.titleLine2 || "PHILOSOPHY"}</span>
                    </h1>
                </div>
                <div className="lg:col-span-3 pb-6">
                    <p className="text-lg leading-relaxed text-muted font-light italic">
                        {philosophyData.introText || "Engineering resilience is not a reaction to failure, but a prerequisite for innovation. We treat reliability as the primary product feature."}
                    </p>
                </div>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div>
                    <span className="text-accent font-bold text-[10px] tracking-[0.3em] block mb-6">Pillar 01</span>
                    <h3 className="text-2xl font-black uppercase mb-4">Measured Resilience</h3>
                    <p className="text-sm text-muted leading-relaxed font-light">
                        Every system component is instrumented to provide high-fidelity telemetry, allowing for data-driven reliability decisions rather than guesswork.
                    </p>
                </div>
                <div>
                    <span className="text-accent font-bold text-[10px] tracking-[0.3em] block mb-6">Pillar 02</span>
                    <h3 className="text-2xl font-black uppercase mb-4">Autonomous Recovery</h3>
                    <p className="text-sm text-muted leading-relaxed font-light">
                        Human intervention is the bottleneck. We prioritize self-healing architectures that isolate failures and remediate known patterns automatically.
                    </p>
                </div>
                <div>
                    <span className="text-accent font-bold text-[10px] tracking-[0.3em] block mb-6">Pillar 03</span>
                    <h3 className="text-2xl font-black uppercase mb-4">Blameless Evolution</h3>
                    <p className="text-sm text-muted leading-relaxed font-light">
                        Failures are the greatest source of organizational knowledge. We foster a culture of blameless introspection to drive continuous system evolution.
                    </p>
                </div>
            </div>

            {/* Diagram Placeholder / Logic Map */}
            <div className="border border-black/5 bg-soft-gray p-12 md:p-20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <span className="material-symbols-outlined text-[20rem]">schema</span>
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">The Reliability<br />Lifecycle</h2>
                        <div className="space-y-6">
                            {[
                                { step: '01', title: 'Detection & Isolation', desc: 'Identifying anomalies before they impact the user experience.' },
                                { step: '02', title: 'Automated Remediation', desc: 'Triggering self-healing protocols to restore service integrity.' },
                                { step: '03', title: 'Root Cause Synthesis', desc: 'Deep-dive analysis to prevent recursive failure patterns.' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-6 group/item">
                                    <div className="text-xs font-mono font-bold text-accent group-hover/item:translate-x-1 transition-transform">{item.step}</div>
                                    <div>
                                        <h4 className="text-sm font-bold uppercase mb-1">{item.title}</h4>
                                        <p className="text-xs text-muted font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="aspect-square border border-black/10 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-4 border border-black/5 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-12 border border-accent/20 rounded-full"></div>
                        <div className="w-48 h-48 bg-white border border-black/5 shadow-soft rounded-full flex items-center justify-center flex-col text-center p-6">
                            <span className="text-3xl font-black text-primary">99.99%</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-muted mt-2">Target Uptime</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
