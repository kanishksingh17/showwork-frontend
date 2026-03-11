import React from 'react';


export const AboutPage: React.FC<{ userData: any }> = ({ userData }) => {
    return (
        <section id="about" className="relative min-h-screen pt-12 pb-32 overflow-hidden bg-[var(--t05-paper)]">
            <div className="absolute inset-0 z-0 opacity-[0.03] schematic-grid" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Left: Manifesto & Bio */}
                    <div className="lg:col-span-6 flex flex-col gap-12">
                        <div className="flex flex-col gap-4">
                            <span className="text-[var(--t05-accent)] font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                                [ STACK_O1: ARCHITECT_PROFILE ]
                            </span>
                            <h2 className="text-[var(--t05-ink)] text-5xl font-light leading-tight">
                                Building for <span className="italic">scale</span>, <br />
                                optimized for <span className="font-medium">clarity</span>.
                            </h2>
                        </div>

                        <div className="flex flex-col gap-8 text-[var(--t05-ink)]/70 text-lg leading-relaxed font-light max-w-xl">
                            <p>
                                {userData?.bio || 'I specialize in the bridge between business complexity and technical implementation. My approach treats infrastructure as a declarative system, where deterministic outcomes must be engineered into the core logic.'}
                            </p>
                        </div>

                        <div className="p-8 border border-[var(--t05-line)] bg-white/40 backdrop-blur-sm rounded-sm">
                            <h3 className="text-[var(--t05-ink)] font-mono text-xs uppercase tracking-widest mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 bg-[var(--t05-accent)] rounded-full animate-pulse" />
                                Core Architecture Philosophy
                            </h3>
                            <ul className="flex flex-col gap-4">
                                {[
                                    { title: 'Deterministic Borders', desc: 'Strict boundary enforcement between micro-domains.' },
                                    { title: 'Event Integrity', desc: 'Append-only logs as the single source of immutable truth.' },
                                    { title: 'Declarative State', desc: 'Infrastructure as code, always synced to system intent.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex flex-col gap-1 pl-5 border-l border-[var(--t05-line)]">
                                        <span className="text-[var(--t05-ink)] text-sm font-bold">{item.title}</span>
                                        <span className="text-[var(--t05-ink)]/50 text-xs">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right: Technical Competencies */}
                    <div className="lg:col-span-6 flex flex-col gap-12">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Cloud Infrastructure', items: ['AWS EKS', 'GCP Antos', 'Azure Service Fabric'] },
                                { label: 'Data Engineering', items: ['Kafka', 'ScyllaDB', 'Postgres / Citus'] },
                                { label: 'Observability', items: ['Prometheus', 'Grafana', 'OpenTelemetry'] },
                                { label: 'Governance', items: ['OPA', 'Terragrunt', 'Istio Mesh'] }
                            ].map((group, i) => (
                                <div key={i} className="p-6 border border-[var(--t05-line)] bg-white/20 group hover:border-[var(--t05-accent)] transition-colors">
                                    <span className="text-[var(--t05-ink)]/40 font-mono text-[9px] uppercase tracking-widest block mb-4">
                                        [{i + 1}] {group.label}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((item, j) => (
                                            <span key={j} className="px-2 py-1 bg-white border border-[var(--t05-line)] text-[var(--t05-ink)] text-[10px] font-mono whitespace-nowrap">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Schematic Diagram placeholder */}
                        <div className="aspect-square w-full border border-[var(--t05-line)] relative flex items-center justify-center p-12 bg-white/10">
                            <div className="absolute inset-0 z-0 opacity-10 schematic-grid" />
                            <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--t05-ink)" strokeWidth="0.2" />
                                <circle cx="50" cy="50" r="30" fill="none" stroke="var(--t05-ink)" strokeWidth="0.2" strokeDasharray="4 4" />
                                <line x1="50" y1="10" x2="50" y2="90" stroke="var(--t05-ink)" strokeWidth="0.2" />
                                <line x1="10" y1="50" x2="90" y2="50" stroke="var(--t05-ink)" strokeWidth="0.2" />
                            </svg>
                            <div className="relative z-10 text-center">
                                <span className="material-symbols-outlined text-4xl text-[var(--t05-accent)] mb-2">schema</span>
                                <p className="text-[var(--t05-ink)]/50 font-mono text-[10px] uppercase tracking-[0.2em]">System Symmetry Model v2.4</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
