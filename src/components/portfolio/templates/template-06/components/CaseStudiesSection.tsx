import React from 'react';

const CaseStudy = ({ index, total, tag, title, challenge, patterns, outcomes, delay }: any) => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 pt-16 pb-16 border-t border-[var(--t06-line)] group hover:bg-[var(--t06-accent-light)] transition-colors px-14 -mx-14 r-up" style={{ transitionDelay: `${delay}ms` }}>
        <div className="lg:col-span-2">
            <div className="font-mono text-[10px] text-[var(--t06-mid)] mb-2">{index} / {total}</div>
            <div className="inline-block font-mono text-[9px] uppercase tracking-widest text-[var(--t06-accent)] border border-[var(--t06-accent-mid)] px-2.5 py-1 mb-4">{tag}</div>
        </div>

        <div className="lg:col-span-5 px-6">
            <h3 className="font-serif text-[clamp(20px,2.2vw,28px)] font-medium text-[var(--t06-ink)] group-hover:text-[var(--t06-accent)] transition-colors mb-4">{title}</h3>
            <p className="text-[14px] text-[var(--t06-ink-3)] leading-relaxed mb-6">{challenge}</p>
            <div className="flex flex-wrap gap-2">
                {patterns.map((p: string, idx: number) => (
                    <span key={idx} className="font-mono text-[9px] uppercase tracking-widest text-[var(--t06-mid)] border border-[var(--t06-line)] px-2.5 py-1 group-hover:border-[var(--t06-accent-mid)] transition-colors">{p}</span>
                ))}
            </div>
        </div>

        <div className="lg:col-span-3 px-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--t06-mid)] mb-5">Measured Outcomes</div>
            <div className="space-y-6">
                {outcomes.map((o: any, idx: number) => (
                    <div key={idx}>
                        <div className="font-serif text-[36px] text-[var(--t06-ink)] leading-none -mb-1">{o.val}</div>
                        <div className="font-mono text-[11px] text-[var(--t06-mid)] lowercase tracking-widest">{o.label}</div>
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-2 flex items-center justify-end opacity-20 group-hover:opacity-100 transition-opacity">
            <svg className="w-24 h-24" viewBox="0 0 100 80">
                <rect x="25" y="5" width="50" height="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <rect x="5" y="30" width="40" height="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <rect x="55" y="30" width="40" height="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <rect x="30" y="55" width="40" height="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M50 20 L25 30 M50 20 L75 30 M25 42 L50 55 M75 42 L50 55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 1" />
            </svg>
        </div>
    </div>
);

export const CaseStudiesSection: React.FC<{ projects: any[] }> = ({ projects }) => {
    return (
        <section id="work" className="py-32 bg-white">
            <div className="max-w-[1360px] mx-auto px-14">
                <div className="mb-16">
                    <span className="t06-meta-label r-left mb-6 block">03 Distributed Systems Work</span>
                    <div className="t06-rule" />
                </div>

                <CaseStudy
                    index="01" total="02" tag="Financial Infrastructure"
                    title="Multi-Region Active-Active Architecture for Settlement"
                    challenge="Sub-50ms finality with zero-downtime across 3 regions. Rearchitected from active-passive resulting in 8s regional failover."
                    patterns={["Blue-Green Pipelines", "CRDT Conflict Resolution", "Consensus Protocols"]}
                    outcomes={[{ val: "8s", label: "regional failover rto" }, { val: "44ms", label: "p99 latency" }]}
                    delay={100}
                />

                <CaseStudy
                    index="02" total="02" tag="Platform Re-Architecture"
                    title="Event-Driven Microservices Migration"
                    challenge="Decomposed monolithic app into 14 independently deployable services using strangler-fig pattern across 22 weeks."
                    patterns={["Strangler Fig", "Event Sourcing", "Saga Orchestration"]}
                    outcomes={[{ val: "14x", label: "deploy frequency" }, { val: "68%", label: "infra cost reduction" }]}
                    delay={200}
                />
            </div>
        </section>
    );
};
