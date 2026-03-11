import React from 'react';

export const ToolingEcosystem: React.FC = () => {
    return (
        <div className="space-y-32 animate-fade-in">
            {/* Headline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-9">
                    <div className="mb-12 flex items-center gap-6">
                        <div className="w-16 hero-line"></div>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">A08 // Systems & Frameworks Radar</span>
                    </div>
                    <h1 className="text-[8vw] lg:text-[8rem] font-black monolith-text uppercase">
                        TOOLING<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>ECOSYSTEM</span>
                    </h1>
                </div>
                <div className="lg:col-span-3 pb-6">
                    <p className="text-lg leading-relaxed text-muted font-light italic">
                        The right tool for the specific problem. A curated stack of industry-standard and specialized systems technology.
                    </p>
                </div>
            </div>

            {/* Tech Radar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[
                    { category: 'Orchestration', tools: ['Kubernetes', 'Helm', 'Terraform', 'Crossplane'], icon: 'hub' },
                    { category: 'Observability', tools: ['Prometheus', 'Grafana', 'Loki', 'Tempo', 'OpenTelemetry'], icon: 'view_in_ar' },
                    { category: 'Security & Auth', tools: ['Vault', 'Oyster', 'Istio', 'SPIRE'], icon: 'shield_lock' },
                    { category: 'Compute / Clouds', tools: ['AWS', 'GCP', 'Azure', 'Bare Metal'], icon: 'cloud_queue' },
                    { category: 'Data & State', tools: ['PostgreSQL', 'Redis', 'Kafka', 'Etcd'], icon: 'database' },
                    { category: 'CI/CD & DevEx', tools: ['GitHub Actions', 'ArgoCD', 'Backstage'], icon: 'auto_settings' }
                ].map((cat, idx) => (
                    <div key={idx} className="bg-white border border-black/5 p-12 shadow-soft group hover:bg-black transition-all duration-700">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em]">{cat.category}</span>
                            <span className="material-symbols-outlined text-muted group-hover:text-accent transition-colors">{cat.icon}</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {cat.tools.map((tool, i) => (
                                <span key={i} className="text-xs font-bold uppercase tracking-tighter text-primary bg-soft-gray px-4 py-2 group-hover:bg-white/10 group-hover:text-white transition-all whitespace-nowrap">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Strategic Tooling Philosophy */}
            <div className="bg-soft-gray p-12 md:p-24 border border-black/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                    <span className="material-symbols-outlined text-[20rem]">architecture</span>
                </div>
                <div className="max-w-xl relative z-10 space-y-12">
                    <h3 className="text-4xl font-black uppercase tracking-tighter leading-tight">The "Boring Technology" Strategy</h3>
                    <p className="text-lg text-muted font-light leading-relaxed">
                        We prioritize battle-tested, standard solutions for core infrastructure, reserving innovation for the 10% of the stack where it provides a direct competitive advantage.
                    </p>
                    <div className="space-y-6 pt-4">
                        {[
                            'Standardization over customization',
                            'Aggressive upstream contributions',
                            'Zero lock-in architectural patterns'
                        ].map((point, idx) => (
                            <div key={idx} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                                <span className="w-1 h-1 bg-accent rounded-full"></span>
                                {point}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
