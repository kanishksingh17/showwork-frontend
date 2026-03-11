import React from 'react';

const SecPillar = ({ num, title, body, delay }: any) => (
    <div className="py-8 border-t border-white/10 grid grid-cols-[48px_1fr] gap-5 items-start r-up" style={{ transitionDelay: `${delay}ms` }}>
        <div className="font-mono text-[10px] tracking-widest text-white/25 pt-1">{num}</div>
        <div>
            <div className="font-sans text-[14px] font-medium text-white/90 mb-2">{title}</div>
            <p className="text-[13px] text-white/45 leading-relaxed">{body}</p>
        </div>
    </div>
);

export const SecuritySection: React.FC = () => {
    return (
        <section id="security" className="py-32 bg-[var(--t06-ink)] text-white border-b border-white/10">
            <div className="max-w-[1360px] mx-auto px-14">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35 r-left mb-6 block">06 Security & Governance</span>
                <div className="w-full h-px bg-white/10 r-up mb-16" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="font-serif text-[clamp(32px,3.8vw,52px)] font-normal leading-[1.15] text-white mb-8 r-up">Security is architectural,<br />not operational</h2>
                        <p className="text-[14px] text-white/60 leading-relaxed mb-12 max-w-[480px] r-up" style={{ transitionDelay: '100ms' }}>
                            Security controls bolted on after deployment fail under pressure. I design security into the network topology and identity model before any code is written.
                        </p>

                        <div className="flex flex-col">
                            <SecPillar num="01" title="Identity-First Architecture" body="Every workload and operator has cryptographically verifiable identity. Decisions on identity, not network position." delay={200} />
                            <SecPillar num="02" title="Encryption at Rest Lifecycle" body="Data classified at ingest. Encryption keys managed in dedicated KMS with automatic rotation policies." delay={300} />
                            <SecPillar num="04" title="Audit Trail as Infrastructure" body="Every API call and config change captured, immutable, and queryable for continuous reporting." delay={400} />
                        </div>
                    </div>

                    <div className="r-right" style={{ transitionDelay: '300ms' }}>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-8 lowercase">Compliance Coverage</div>
                        <div className="space-y-1">
                            {[
                                { n: "SOC 2 Type II", w: 100, f: true },
                                { n: "ISO 27001", w: 100, f: true },
                                { n: "PCI-DSS L1", w: 92 },
                                { n: "GDPR Controls", w: 95 },
                                { n: "CIS Benchmarks", w: 100, f: true }
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-[140px_1fr] gap-4 items-center p-3 bg-white/5">
                                    <div className="font-mono text-[10px] uppercase text-white/50">{row.n}</div>
                                    <div className="h-0.5 bg-white/10 relative">
                                        <div className={`h-full absolute left-0 ${row.f ? 'bg-[var(--t06-accent)]' : 'bg-white/40'}`} style={{ width: `${row.w}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 border border-white/10 bg-white/5">
                            <div className="font-mono text-[10px] tracking-widest text-white/25 mb-5 uppercase">Certifications</div>
                            <div className="flex flex-wrap gap-2">
                                {["AWS Solutions Architect Pro", "GCP Professional Arch.", "CKA — Kubernetes", "CISSP"].map((cert, i) => (
                                    <span key={i} className="font-mono text-[9px] uppercase tracking-widest text-white/55 border border-white/10 px-3 py-1.5">{cert}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
