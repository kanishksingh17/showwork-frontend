import React from 'react';

const PatternCard = ({ title, body, icon: Icon, delay }: any) => (
    <div className="bg-[#f7f6f4] p-10 hover:bg-white transition-all duration-300 border-[0.5px] border-[var(--t06-line)] r-up" style={{ transitionDelay: `${delay}ms` }}>
        <div className="w-10 h-10 mb-6 flex items-center justify-center text-[var(--t06-accent)]">
            <Icon />
        </div>
        <h3 className="font-serif text-[18px] font-medium text-[var(--t06-ink)] mb-3 leading-tight">{title}</h3>
        <p className="text-[13px] text-[var(--t06-ink-3)] leading-relaxed">{body}</p>
    </div>
);

export const PatternsSection: React.FC = () => {
    return (
        <section id="patterns" className="py-32 bg-[#f7f6f4] border-b border-[var(--t06-line)]">
            <div className="max-w-[1360px] mx-auto px-14">
                <span className="t06-meta-label r-left mb-6 block">04 Infrastructure Patterns</span>
                <div className="t06-rule mb-16" />

                <div className="grid grid-cols-12 gap-12 mb-16">
                    <div className="col-span-6">
                        <h2 className="font-serif text-[clamp(28px,3.8vw,52px)] font-normal leading-[1.2] text-[var(--t06-ink)] r-up">Patterns applied <br /> in production</h2>
                    </div>
                    <div className="col-span-5 col-start-8">
                        <p className="text-[14px] text-[var(--t06-ink-3)] leading-relaxed pt-2 r-right">These are not textbook patterns — they are documented implementations from production systems, with the failure conditions observed in real deployments.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--t06-line)] border border-[var(--t06-line)]">
                    <PatternCard
                        title="Circuit Breaker Isolation"
                        body="Preventing cascading failure by isolating thread pools per downstream dependency. Implemented with empirically tuned thresholds."
                        icon={() => <svg viewBox="0 0 40 40" fill="none" stroke="currentColor"><rect x="4" y="4" width="32" height="32" rx="2" /><line x1="20" y1="4" x2="20" y2="36" /><line x1="4" y1="20" x2="36" y2="20" /></svg>}
                        delay={100}
                    />
                    <PatternCard
                        title="Saga Orchestration"
                        body="Coordinating multi-service workflows with compensating transactions. Eliminates distributed locks in favor of rollback choreography."
                        icon={() => <svg viewBox="0 0 40 40" fill="none" stroke="currentColor"><circle cx="20" cy="20" r="12" /><path d="M20 8 A12 12 0 0 1 32 20" strokeWidth="2" /></svg>}
                        delay={200}
                    />
                    <PatternCard
                        title="Event Sourcing Models"
                        body="Using append-only event logs as the system of record. Enables complete audit trails and temporal queries without migrations."
                        icon={() => <svg viewBox="0 0 40 40" fill="none" stroke="currentColor"><path d="M4 10 H36 M4 20 H36 M4 30 H24" /></svg>}
                        delay={300}
                    />
                </div>

                <div className="mt-16 p-16 bg-white border border-[var(--t06-line)] r-up">
                    <h4 className="font-serif text-[18px] font-medium text-[var(--t06-ink)] mb-10">Request Path — Cloud-Native Service Mesh</h4>
                    <div className="flex items-center gap-0 overflow-x-auto pb-4 no-scrollbar">
                        {["Client", "CDN Edge", "API Gateway", "Load Balancer", "Service Mesh", "Microservice", "Data Layer"].map((node, i) => (
                            <React.Fragment key={i}>
                                <div className="flex-shrink-0 border border-[var(--t06-line)] p-4 min-w-[120px] text-center bg-white hover:border-[var(--t06-accent)] transition-colors">
                                    <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--t06-ink-3)]">{node}</div>
                                </div>
                                {i < 6 && <div className={`w-10 h-px bg-[var(--t06-line)] relative flex-shrink-0 ${i % 2 === 0 ? 'after:content-[""] after:absolute after:inset-0 after:bg-[var(--t06-accent)] after:scale-x-0 after:origin-left after:animate-[t06-flow_2s_infinite]' : ''}`} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <style dangerouslySetInnerHTML={{ __html: `@keyframes t06-flow { from { transform: scaleX(0); } to { transform: scaleX(1); } }` }} />
            </div>
        </section>
    );
};
