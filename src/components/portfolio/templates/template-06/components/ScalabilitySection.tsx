import React, { useEffect, useState } from 'react';

const ScaleBar = ({ name, val, fill, delay }: any) => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => setWidth(fill), delay + 400);
        return () => clearTimeout(timer);
    }, [fill, delay]);

    return (
        <div className="mb-8 r-up" style={{ transitionDelay: `${delay}ms` }}>
            <div className="flex justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--t06-ink-3)]">{name}</span>
                <span className="font-mono text-[10px] text-[var(--t06-accent)]">{val}</span>
            </div>
            <div className="h-[1px] bg-[var(--t06-line)] w-full relative">
                <div
                    className="absolute inset-y-0 left-0 bg-[var(--t06-accent)] transition-all duration-1000 ease-[var(--t06-ease-arch)]"
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
};

export const ScalabilitySection: React.FC = () => {
    return (
        <section id="systems" className="py-32 bg-white border-b border-[var(--t06-line)]">
            <div className="max-w-[1360px] mx-auto px-14">
                <span className="t06-meta-label r-left mb-6 block">05 Scalability & Cost Architecture</span>
                <div className="t06-rule mb-16" />

                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-6">
                        <h2 className="font-serif text-[clamp(32px,3.8vw,52px)] font-normal leading-[1.2] text-[var(--t06-ink)] mb-8 r-up">Cost is a constraint,<br />not a budget line</h2>
                        <p className="text-[14px] text-[var(--t06-ink-3)] leading-relaxed max-w-[460px] r-up" style={{ transitionDelay: '100ms' }}>
                            Infrastructure cost compounds. A decision made in week two — choosing a data transfer path, a replication model — will generate or destroy value for years. I treat cost modeling as a first-class deliverable.
                        </p>
                    </div>

                    <div className="col-span-5 col-start-8">
                        <div className="p-10 border-l-2 border-[var(--t06-accent)] bg-[#f7f6f4] r-up" style={{ transitionDelay: '200ms' }}>
                            <p className="font-serif text-[20px] italic leading-relaxed text-[var(--t06-ink)]">
                                "The cheapest infrastructure is the infrastructure you don't need to provision because you designed the load profile correctly."
                            </p>
                            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--t06-mid)] mt-4">— Architecture Review, 2023</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-20">
                    <div>
                        <div className="t06-meta-label mb-10 r-left">Cost Optimization Levers</div>
                        <ScaleBar name="Reserved Capacity Planning" val="40–60% savings" fill={78} delay={100} />
                        <ScaleBar name="Data Transfer Optimization" val="15–30% savings" fill={56} delay={200} />
                        <ScaleBar name="Rightsizing + Spot Strategy" val="20–35% savings" fill={64} delay={300} />
                        <ScaleBar name="Storage Tiering Policy" val="10–40% savings" fill={48} delay={400} />
                    </div>

                    <div className="space-y-0">
                        <div className="t06-meta-label mb-10 r-left">Scale Decisions</div>
                        {[
                            { t: "Stateless Service Design", d: "Designed for horizontal scalability. State is externalized to purpose-built storage layers." },
                            { t: "Predictive Autoscaling", d: "Scaling on leading indicators (queue depth) before traffic spikes hit user experience." },
                            { t: "Write-Path Topology", d: "Separating workloads onto replicas to reduce instance costs and contention." }
                        ].map((item, idx) => (
                            <div key={idx} className="py-6 border-t border-[var(--t06-line)] last:border-b r-up" style={{ transitionDelay: `${idx * 150}ms` }}>
                                <div className="font-sans text-[14px] font-medium text-[var(--t06-ink)] mb-2">{item.t}</div>
                                <p className="text-[13px] text-[var(--t06-ink-3)] leading-relaxed">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
