import React from 'react';

export const IncidentResponse: React.FC = () => {
    return (
        <div className="space-y-32 animate-fade-in">
            {/* Headline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-9">
                    <div className="mb-12 flex items-center gap-6">
                        <div className="w-16 hero-line"></div>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">A06 // Crisis Management & Recovery</span>
                    </div>
                    <h1 className="text-[8vw] lg:text-[8rem] font-black monolith-text uppercase">
                        INCIDENT<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>RESPONSE</span>
                    </h1>
                </div>
                <div className="lg:col-span-3 pb-6">
                    <p className="text-lg leading-relaxed text-muted font-light italic">
                        Uptime is temporary; resilience is the ability to recover gracefully. Our response framework is engineered for precision under pressure.
                    </p>
                </div>
            </div>

            {/* Response Lifecycle */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div className="space-y-16">
                    <div>
                        <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em] block mb-8">Detection Isolation</span>
                        <div className="flex gap-8 group">
                            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center font-mono text-xl group-hover:border-accent group-hover:text-accent transition-colors">01</div>
                            <div className="flex-1 space-y-4 pt-2">
                                <h4 className="text-xl font-black uppercase">Anomaly Identification</h4>
                                <p className="text-sm text-muted font-light leading-relaxed">
                                    Leveraging multi-dimensional signal analysis to distinguish between standard volatility and critical system drift.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em] block mb-8">Mobilization Recovery</span>
                        <div className="flex gap-8 group">
                            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center font-mono text-xl group-hover:border-accent group-hover:text-accent transition-colors">02</div>
                            <div className="flex-1 space-y-4 pt-2">
                                <h4 className="text-xl font-black uppercase">Automated Remediation</h4>
                                <p className="text-sm text-muted font-light leading-relaxed">
                                    Triggering pre-validated self-healing sequence to isolate faulty components and restore service integrity autonomously.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em] block mb-8">Post-Mortem Synthesis</span>
                        <div className="flex gap-8 group">
                            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center font-mono text-xl group-hover:border-accent group-hover:text-accent transition-colors">03</div>
                            <div className="flex-1 space-y-4 pt-2">
                                <h4 className="text-xl font-black uppercase">Blameless Review</h4>
                                <p className="text-sm text-muted font-light leading-relaxed">
                                    Converting failure events into architectural knowledge. Deep causality analysis to prevent recursive failure patterns.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-soft-gray p-12 md:p-20 border border-black/5 flex flex-col justify-between">
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Averaging Recovery Threshold</span>
                        <h2 className="text-8xl font-black tracking-tighter">0.8<small className="text-3xl text-muted font-light">m</small></h2>
                        <p className="text-xs text-muted leading-relaxed font-light uppercase tracking-tight">Mean Time To Remediation (MTTR) - Q3 Baseline</p>
                    </div>
                    <div className="space-y-8 pt-12">
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                            <span className="material-symbols-outlined text-sm">notifications_active</span>
                            Zero Critical Escalations in 180 Days
                        </div>
                        <button className="w-full border border-black/10 hover:bg-black hover:text-white p-6 text-[10px] font-bold uppercase tracking-widest transition-all">
                            Review Blameless Repository
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
