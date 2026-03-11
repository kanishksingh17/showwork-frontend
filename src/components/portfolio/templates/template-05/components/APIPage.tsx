import React from 'react';


export const APIPage: React.FC = () => {
    return (
        <section id="api" className="relative min-h-screen pt-12 pb-32 bg-[var(--t05-ink)] text-white">
            <div className="absolute inset-0 z-0 opacity-[0.05] schematic-grid-dark" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Left: API Concept */}
                    <div className="lg:col-span-4 flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <span className="text-[var(--t05-accent)] font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                                [ DOCS_O3: SYSTEM_INTERFACE ]
                            </span>
                            <h2 className="text-5xl font-light leading-tight">API <br />Specification.</h2>
                        </div>

                        <p className="text-white/40 text-lg font-light leading-relaxed">
                            A declarative guide to external communication protocols, structured for total observability and predictable integration patterns.
                        </p>

                        <div className="flex flex-col gap-6 border-l border-white/10 pl-6 mt-10">
                            {[
                                { key: 'PROTOCOL', val: 'GRPC_OVER_HTTP2' },
                                { key: 'AUTH', val: 'ED25519_HS256' },
                                { key: 'FORMAT', val: 'BINARY_PROTOBUF' },
                                { key: 'SLA', val: '99.999%' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="text-white/20 font-mono text-[9px] uppercase tracking-wider">{item.key}</span>
                                    <span className="text-[var(--t05-accent)] font-mono text-sm uppercase">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Endpoint Documentation */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {[
                            { method: 'POST', path: '/v1/system/provision', desc: 'Initialize new autonomous computation node within the selected infrastructure layer.' },
                            { method: 'GET', path: '/v1/state/snapshot/{node_id}', desc: 'Retrieve full immutable state tree for a specific cluster participant.' },
                            { method: 'PATCH', path: '/v1/governance/policy', desc: 'Update decentralized access control manifest for the mesh gateway.' }
                        ].map((endpoint, i) => (
                            <div key={i} className="group p-8 border border-white/10 bg-white/[0.03] hover:border-[var(--t05-accent)] transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className={`px-3 py-1 font-mono text-[10px] font-bold rounded-sm ${endpoint.method === 'POST' ? 'bg-emerald-500/10 text-emerald-400' : endpoint.method === 'GET' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                        {endpoint.method}
                                    </span>
                                    <span className="font-mono text-sm text-[var(--t05-accent)]">{endpoint.path}</span>
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed mb-6">
                                    {endpoint.desc}
                                </p>
                                <div className="bg-black/40 p-6 rounded-sm border border-white/5 font-mono text-[11px] text-white/40 leading-relaxed overflow-hidden">
                                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                                        <span className="uppercase tracking-widest text-[9px]">Request Payload Example</span>
                                        <span className="material-symbols-outlined text-xs">content_copy</span>
                                    </div>
                                    <pre className="text-emerald-400">
                                        {`{
  "system_id": "NX-9421",
  "intent": "SCALE_OR_DIE",
  "meta_params": {
    "dry_run": false,
    "priority": "HIGH_CONSEQUENCE"
  }
}`}
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
