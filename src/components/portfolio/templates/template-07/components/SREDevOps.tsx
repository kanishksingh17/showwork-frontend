import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Wrench, FileText } from 'lucide-react';

export const SREDevOps: React.FC = () => {
    return (
        <section id="sre">
            <div className="section-inner w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="reveal"
                >
                    <div className="section-header mb-14">
                        <span className="section-num font-mono text-[11px] text-[var(--t07-purple-bright)] tracking-widest uppercase mb-3 block">05 / Reliability Engineering (SRE)</span>
                        <h2 className="section-h2 text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4">Incidents are<br />a systems problem.</h2>
                        <p className="section-sub font-serif italic text-[clamp(18px,2vw,24px)] text-[var(--t07-purple-edge)] mb-4">Not a people problem. Never a people problem.</p>
                        <p className="section-body text-[14px] leading-[1.75] text-[var(--t07-text-secondary)]">
                            I practice SRE as an engineering discipline. Error budgets are contractual commitments. Every on-call rotation has a bounded cognitive load ceiling.
                        </p>
                    </div>

                    <div className="sre-timeline flex flex-col gap-0">
                        {[
                            { dot: <Activity size={14} />, title: "Detection — <2 minutes", desc: "Multi-signal alerting: composite alerts requiring metric + log + trace correlation. PagerDuty with dynamic routing." },
                            { dot: <Target size={14} />, title: "Triage — <5 minutes", desc: "Runbooks are executable. Automated playbook triggers fire first: traffic shifting, pod restarts. Human reviews the result." },
                            { dot: <Wrench size={14} />, title: "Remediation — <15 minutes", desc: "Rollback is the default path. Feature flags give instant blast radius control. Every fix is also a test." },
                            { dot: <FileText size={14} />, title: "Post-Mortem — Blameless", desc: "5-whys analysis archived in version control. Action items tracked as engineering tickets with SLAs." }
                        ].map((item, i, arr) => (
                            <div key={i} className="timeline-item flex gap-5 pb-8 relative group">
                                {i !== arr.length - 1 && (
                                    <div className="absolute left-[15px] top-[36px] w-[1px] bottom-0 bg-gradient-to-b from-[var(--t07-purple-mid)] to-transparent" />
                                )}
                                <div className="timeline-dot w-8 h-8 rounded-full bg-[var(--t07-purple-mid)]/20 border-2 border-[var(--t07-purple-mid)] flex-shrink-0 flex items-center justify-center text-xs group-hover:bg-[var(--t07-purple-bright)]/40 transition-colors">
                                    {item.dot}
                                </div>
                                <div>
                                    <div className="timeline-title text-[14px] font-bold mb-1.5">{item.title}</div>
                                    <p className="timeline-desc text-[13px] text-[var(--t07-text-secondary)] leading-[1.6]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="reveal"
                >
                    <div className="font-mono text-[11px] text-[var(--t07-text-muted)] mb-5 tracking-[0.08em] uppercase">SERVICE LEVEL OBJECTIVES</div>
                    <div className="slo-grid flex flex-col gap-4">
                        {[
                            { name: "API Availability", target: "99.95%", current: "99.97%", budget: "4h remaining", fill: 99.97 },
                            { name: "P99 Latency <250ms", target: "99.0%", current: "99.3%", budget: "38% left", fill: 99 },
                            { name: "Deploy Success Rate", target: "99.8%", current: "100%", budget: "full", fill: 100 },
                            { name: "Data Pipeline Freshness", target: "<5min lag", current: "2.3min avg", budget: "P99: 4.1min", fill: 97 },
                            { name: "MTTR", target: "<15min", current: "11.4min", budget: "P95: 28min", fill: 92 },
                            { name: "Alert Actionability", target: ">90%", current: "94.2%", budget: "Noise: 5.8%", fill: 94 }
                        ].map((slo, i) => (
                            <div key={i} className="slo-item bg-white/3 border border-[var(--t07-border-subtle)] rounded-lg p-5">
                                <div className="slo-header flex justify-between mb-2.5">
                                    <span className="slo-name text-[13px] font-semibold">{slo.name}</span>
                                    <span className="slo-target font-mono text-[13px] text-[var(--t07-purple-bright)]">{slo.target}</span>
                                </div>
                                <div className="slo-bar-track h-1 bg-white/[0.08] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${slo.fill}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="slo-bar-fill h-full bg-gradient-to-r from-[var(--t07-purple-mid)] to-[var(--t07-purple-bright)] rounded-full"
                                    />
                                </div>
                                <div className="text-[11px] text-[var(--t07-text-muted)] mt-2 font-mono">Current: {slo.current} · {slo.budget}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
