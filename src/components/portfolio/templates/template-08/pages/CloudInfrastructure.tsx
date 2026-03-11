import React from 'react';

export const CloudInfrastructure: React.FC = () => {
    return (
        <div className="space-y-32 animate-fade-in">
            {/* Headline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-9">
                    <div className="mb-12 flex items-center gap-6">
                        <div className="w-16 hero-line"></div>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">A03 // Compute & Orchestration</span>
                    </div>
                    <h1 className="text-[8vw] lg:text-[8rem] font-black monolith-text uppercase">
                        CLOUD<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>INFRASTRUCTURE</span>
                    </h1>
                </div>
                <div className="lg:col-span-3 pb-6">
                    <p className="text-lg leading-relaxed text-muted font-light italic">
                        Abstracting complexity through scalable, resilient orchestration layers. Infrastructure as a dynamic response to load.
                    </p>
                </div>
            </div>

            {/* Infrastructure Topology Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-soft-gray p-12 md:p-20 relative border border-black/5 overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <span className="material-symbols-outlined text-[10rem]">cloud</span>
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-12">Cluster Topology</h3>
                    <div className="space-y-12">
                        {[
                            { name: 'Gateway / Ingress', detail: 'Edge-based routing with deep packet inspection and rate-limiting.', metric: '15ms Latency' },
                            { name: 'Compute Tier', name2: 'Auto-scaling EKS', detail: 'Dynamic resource scheduling across multiple availability zones.', metric: '500+ Nodes' },
                            { name: 'Data Persistence', detail: 'Stateful replication with sub-millisecond point-in-time recovery.', metric: 'Multi-AZ' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-end border-b border-black/10 pb-6 group">
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold uppercase group-hover:text-accent transition-colors">{item.name}</h4>
                                    <p className="text-xs text-muted font-light max-w-xs">{item.detail}</p>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-primary bg-white px-3 py-1 border border-black/5">{item.metric}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-black text-white p-12 flex flex-col justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Region Availability</span>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black">99.999%</h2>
                            <p className="text-xs text-white/50 leading-relaxed font-light">Global reach with multi-region failover protocols active.</p>
                        </div>
                    </div>
                    <div className="bg-white border border-black/5 p-12 flex flex-col justify-between shadow-soft">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Orchestration Efficiency</span>
                        <div className="space-y-4 text-center">
                            <div className="text-4xl font-black text-primary">85%</div>
                            <div className="text-[9px] font-bold uppercase tracking-tighter text-muted">Resource Utilization</div>
                        </div>
                        <div className="h-1 bg-black/5 w-full rounded-full overflow-hidden">
                            <div className="h-full bg-accent w-[85%]"></div>
                        </div>
                    </div>
                    <div className="bg-soft-gray border border-black/5 p-12 md:col-span-2 group">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-sm font-black uppercase">Infrastructure Drift Control</h4>
                            <span className="material-symbols-outlined text-accent animate-pulse">check_circle</span>
                        </div>
                        <p className="text-xs text-muted font-light leading-relaxed mb-6">
                            Automated reconciliation loops ensuring production state matches Terraform source of truth within minute-level precision.
                        </p>
                        <div className="flex gap-2">
                            <div className="flex-1 h-8 bg-black/10"></div>
                            <div className="flex-1 h-8 bg-black/5"></div>
                            <div className="flex-1 h-8 bg-black/10"></div>
                            <div className="flex-1 h-8 bg-accent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
