import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Search } from 'lucide-react';

export const ObservabilityDevOps: React.FC = () => {
    return (
        <section id="observability">
            <div className="section-inner w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="reveal section-header mb-14"
                >
                    <span className="section-num font-mono text-[11px] text-[var(--t07-purple-bright)] tracking-widest uppercase mb-3 block">04 / Observability</span>
                    <h2 className="section-h2 text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4">Know before<br />your users know.</h2>
                    <p className="section-sub font-serif italic text-[clamp(18px,2vw,24px)] text-[var(--t07-purple-edge)] mb-4">The three pillars aren't optional.</p>
                    <p className="section-body text-[14px] leading-[1.75] text-[var(--t07-text-secondary)] max-w-[680px]">
                        I build observability as infrastructure, not as tooling sprinkled on top. Unified telemetry collection via OpenTelemetry, correlated across logs, metrics, and traces.
                    </p>
                </motion.div>

                <div className="obs-grid grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {[
                        {
                            icon: <BarChart3 size={28} />,
                            title: "Metrics",
                            desc: "Prometheus + Thanos for long-term retention. Recording rules pre-aggregate cardinality. Every SLO burns at the Prometheus layer.",
                            visual: (
                                <div className="obs-spark h-10 flex items-flex-end gap-[3px] mt-4">
                                    {[30, 60, 45, 80, 55, 90, 70, 40, 85, 65, 50, 75].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ opacity: [0.3, 0.9, 0.3] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                                            className="spark-bar flex-1 rounded-t-sm bg-[var(--t07-purple-mid)]"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            )
                        },
                        {
                            icon: <FileText size={28} />,
                            title: "Logs",
                            desc: "Structured JSON logs. Loki/OpenSearch for aggregation. Every line carries trace_id, span_id, and service metadata.",
                            visual: (
                                <div className="mt-4 font-mono text-[10px] text-[var(--t07-text-muted)] leading-[1.8] bg-black/30 p-3 rounded-md">
                                    <span className="text-[var(--t07-purple-bright)]">INFO</span> svc=api region=us-east-1<br />
                                    <span className="opacity-30">trace_id=</span><span className="text-[#a3e635]">7fa2c</span> latency=43ms<br />
                                    <span className="opacity-30">status=</span><span className="text-[#4ade80]">200</span> tier=enterprise
                                </div>
                            )
                        },
                        {
                            icon: <Search size={28} />,
                            title: "Traces",
                            desc: "OpenTelemetry SDK + Jaeger. Tail-based sampling in production to capture error and latency outliers. P99 visualized per deploy.",
                            visual: (
                                <svg width="100%" height="60" className="mt-4">
                                    <rect x="0" y="10" width="200" height="12" rx="2" fill="rgba(124,47,212,0.4)" stroke="rgba(168,85,247,0.4)" strokeWidth="1" />
                                    <text x="4" y="20" fill="rgba(255,255,255,0.5)" fontSize="7">api-gateway 43ms</text>
                                    <rect x="20" y="28" width="130" height="10" rx="2" fill="rgba(124,47,212,0.3)" stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
                                    <text x="24" y="37" fill="rgba(255,255,255,0.4)" fontSize="7">user-svc 28ms</text>
                                    <rect x="40" y="44" width="80" height="10" rx="2" fill="rgba(124,47,212,0.25)" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />
                                    <text x="44" y="53" fill="rgba(255,255,255,0.4)" fontSize="7">postgres 12ms</text>
                                </svg>
                            )
                        }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="obs-card bg-[var(--t07-bg-card)] border border-[var(--t07-border-subtle)] rounded-[18px] p-7 relative overflow-hidden group hover:border-[var(--t07-border-glow)] transition-all"
                        >
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--t07-purple-mid)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="obs-icon text-[28px] mb-4 block">{card.icon}</span>
                            <div className="obs-title text-[16px] font-bold mb-3">{card.title}</div>
                            <p className="obs-desc text-[13px] text-[var(--t07-text-secondary)] leading-[1.6] mb-4">{card.desc}</p>
                            {card.visual}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="obs-dashboard bg-[var(--t07-bg-card)] border border-[var(--t07-border-subtle)] rounded-[18px] p-8 mt-10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <div className="font-mono text-[11px] text-[var(--t07-text-muted)] tracking-[0.08em] uppercase">ERROR BUDGET — 30 DAY WINDOW</div>
                        <div className="flex gap-2">
                            <span className="tag">SLO: 99.9%</span>
                            <span className="tag text-[#4ade80] border-[#4ade80]/30 bg-[#4ade80]/10">Budget Remaining: 78%</span>
                        </div>
                    </div>

                    <div className="h-16 flex items-end gap-[2px]">
                        {[99, 100, 100, 99, 100, 100, 98, 100, 100, 100, 99, 100, 100, 100, 100, 99, 100, 97, 100, 100, 100, 100, 99, 100, 100, 100, 100, 100, 100, 99].map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${v}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.02, duration: 0.5 }}
                                className={`flex-1 rounded-sm ${v < 99 ? 'bg-rose-500/60' : 'bg-[var(--t07-purple-mid)]/60'}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
