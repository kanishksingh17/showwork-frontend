import React from 'react';

export const ObservabilityMonitoring: React.FC = () => {
    return (
        <div className="space-y-32 animate-fade-in">
            {/* Headline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-9">
                    <div className="mb-12 flex items-center gap-6">
                        <div className="w-16 hero-line"></div>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">A04 // Telemetry & Signal Analysis</span>
                    </div>
                    <h1 className="text-[8vw] lg:text-[8rem] font-black monolith-text uppercase">
                        OBSERVABILITY<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>MONITORING</span>
                    </h1>
                </div>
                <div className="lg:col-span-3 pb-6">
                    <p className="text-lg leading-relaxed text-muted font-light italic">
                        Transforming noise into actionable intelligence. Monitoring is the sensory system of a resilient architecture.
                    </p>
                </div>
            </div>

            {/* Signal Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
                {[
                    { label: 'Metrics', desc: 'Quantitative telemetry mapping system health over time.', icon: 'analytics' },
                    { label: 'Logging', desc: 'Structured event streams for deep-dive causality analysis.', icon: 'description' },
                    { label: 'Tracing', desc: 'End-to-end request visibility across distributed services.', icon: 'trace' },
                    { label: 'Profiling', desc: 'Granular resource utilization mapping at the runtime level.', icon: 'memory' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-12 group hover:bg-black transition-all duration-500">
                        <span className="material-symbols-outlined text-4xl text-accent mb-8">{item.icon}</span>
                        <h4 className="text-lg font-black uppercase mb-4 group-hover:text-white transition-colors">{item.label}</h4>
                        <p className="text-sm text-muted group-hover:text-white/50 font-light leading-relaxed transition-colors">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Dashboard Visualization Mockup */}
            <div className="bg-soft-gray p-12 md:p-24 border border-black/5 relative group overflow-hidden">
                <div className="flex justify-between items-start mb-16 relative z-10">
                    <div className="space-y-2">
                        <h3 className="text-3xl font-black uppercase">Anomaly Detection</h3>
                        <p className="text-xs text-muted font-light">Predictive signal monitoring with multi-threshold alerting.</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow"></span>
                        Live Telemetry Feed
                    </div>
                </div>

                <div className="relative h-64 flex items-end gap-2 z-10">
                    {[30, 45, 25, 60, 85, 40, 55, 30, 70, 95, 45, 60, 20, 40, 55, 75, 30, 45, 80, 50].map((h, i) => (
                        <div
                            key={i}
                            className={`flex-1 transition-all duration-700 delay-[${i * 50}ms] group-hover:opacity-100 ${h > 80 ? 'bg-accent' : 'bg-black/10'}`}
                            style={{ height: `${h}%` }}
                        ></div>
                    ))}
                    <div className="absolute top-1/2 left-0 w-full h-px border-t border-dashed border-black/20 group-hover:border-accent/40 transition-colors"></div>
                </div>

                <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted block mb-2">P95 Latency</span>
                        <span className="text-2xl font-black">124ms</span>
                    </div>
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted block mb-2">Error Rate</span>
                        <span className="text-2xl font-black text-accent">0.04%</span>
                    </div>
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted block mb-2">Active Signals</span>
                        <span className="text-2xl font-black">12.4k</span>
                    </div>
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted block mb-2">Alert Density</span>
                        <span className="text-2xl font-black">Low</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
