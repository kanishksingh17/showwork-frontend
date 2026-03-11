import React from 'react';

export const CICDArchitecture: React.FC = () => {
    return (
        <div className="space-y-32 animate-fade-in">
            {/* Headline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-9">
                    <div className="mb-12 flex items-center gap-6">
                        <div className="w-16 hero-line"></div>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">A02 // Delivery Pipeline</span>
                    </div>
                    <h1 className="text-[8vw] lg:text-[8rem] font-black monolith-text uppercase">
                        CI/CD<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>ARCHITECTURE</span>
                    </h1>
                </div>
                <div className="lg:col-span-3 pb-6">
                    <p className="text-lg leading-relaxed text-muted font-light italic">
                        The integrity of production is decided during the build. Our pipelines are the automated guardians of system stability.
                    </p>
                </div>
            </div>

            {/* Pipeline Stages */}
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-px bg-black/5"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/5">
                    {[
                        { stage: 'Source', desc: 'Secure repository hooks and automated linting gating.', icons: 'source' },
                        { stage: 'Build & Test', desc: 'Containerization and exhaustive unit/integration suites.', icons: 'build' },
                        { stage: 'Staging', desc: 'Mirror-production validation and automated smoky tests.', icons: 'approval' },
                        { stage: 'Deployment', desc: 'Blue/Green rollout with automated rollback capability.', icons: 'deployed_code' }
                    ].map((step, idx) => (
                        <div key={idx} className="p-12 group hover:bg-soft-gray transition-colors">
                            <span className="material-symbols-outlined text-accent mb-8 block text-3xl opacity-50 group-hover:opacity-100 transition-opacity">{step.icons}</span>
                            <h4 className="text-lg font-black uppercase mb-4">{step.stage}</h4>
                            <p className="text-sm text-muted font-light leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delivery Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/5 border border-black/5">
                <div className="bg-white p-12 md:p-24 space-y-12">
                    <h3 className="text-3xl font-black uppercase tracking-tight">Deployment Frequency</h3>
                    <div className="flex items-end gap-2 h-40">
                        <div className="flex-1 bg-black/10 h-[30%]"></div>
                        <div className="flex-1 bg-black/10 h-[45%]"></div>
                        <div className="flex-1 bg-black/10 h-[60%]"></div>
                        <div className="flex-1 bg-accent h-full animate-pulse-slow"></div>
                        <div className="flex-1 bg-black/10 h-[80%]"></div>
                    </div>
                    <div className="flex justify-between items-center border-t border-black/5 pt-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Averaging 12+ Deploys/Day</span>
                        <span className="text-xl font-black">Elite Performance</span>
                    </div>
                </div>
                <div className="bg-white p-12 md:p-24 space-y-12 flex flex-col justify-center">
                    <div className="space-y-4">
                        <span className="text-accent font-bold text-[10px] tracking-[0.3em] block">Change Failure Rate</span>
                        <h2 className="text-7xl font-black tracking-tighter">{"< 2.5%"}</h2>
                        <p className="text-sm text-muted leading-relaxed font-light">
                            Targeting near-zero regression in production through aggressive automated gating and synthetic monitoring.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
