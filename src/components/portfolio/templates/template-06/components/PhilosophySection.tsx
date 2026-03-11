import React from 'react';
import { motion } from 'framer-motion';

export const PhilosophySection: React.FC = () => {
    const principles = [
        {
            num: "01 — Reliability First",
            title: "Failure is not an edge case — it is the expected state",
            body: "Every design decision is evaluated against its failure modes before its features. Circuit breakers, graceful degradation, and chaos-tested recovery paths are baseline requirements."
        },
        {
            num: "02 — Cost as Architecture",
            title: "Financial governance belongs in the architecture review",
            body: "Infrastructure cost is a structural outcome, not an operational variable. Reserved instance strategy, rightsizing cadence, and egress optimization are architectural decisions."
        },
        {
            num: "03 — Minimal Blast Radius",
            title: "Scope isolation is the most underrated architectural principle",
            body: "Partitioning services, data, and access controls so that failures, breaches, and degradations are contained — not propagated — is what separates distributed systems."
        }
    ];

    return (
        <section id="philosophy" className="py-32 bg-[#f7f6f4] border-b border-[var(--t06-line)]">
            <div className="max-w-[1360px] mx-auto px-14">
                <span className="t06-meta-label r-left mb-6 block">02 Architecture Philosophy</span>
                <div className="t06-rule mb-16" />

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-start-3 col-span-8">
                        <p className="font-serif text-[clamp(24px,3vw,40px)] font-normal leading-[1.45] text-[var(--t06-ink)] r-up">
                            Good architecture is not the sum of
                            <span className="italic"> clever decisions</span> — it is the result of
                            anticipating failure, quantifying constraints,
                            and designing for the system that will exist
                            in three years, not the one that exists today.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--t06-line)] mt-20">
                    {principles.map((p, idx) => (
                        <div key={idx} className="p-12 border-r last:border-0 border-[var(--t06-line)] bg-white/50 hover:bg-white transition-colors r-up" style={{ transitionDelay: `${idx * 100}ms` }}>
                            <div className="font-mono text-[10px] tracking-widest text-[var(--t06-mid)] mb-6 uppercase">{p.num}</div>
                            <h3 className="font-serif text-[18px] font-medium text-[var(--t06-ink)] mb-4 leading-tight">{p.title}</h3>
                            <p className="text-[14px] text-[var(--t06-ink-3)] leading-relaxed italic opacity-80">{p.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
