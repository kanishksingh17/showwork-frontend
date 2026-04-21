import React from 'react';
import { motion } from 'framer-motion';
import { HardDrive, ShieldAlert, Eye } from 'lucide-react';

export const PhilosophyDevOps: React.FC<{ data?: any }> = ({ data }) => {
    const philData = {
        num: data?.num || "01 / Philosophy",
        h2: data?.h2 || "Infrastructure is an engineering discipline.",
        sub: data?.sub || "Not a cost center. Not an afterthought.",
        body: data?.body || "I operate from a set of hard-won principles: that toil is a systems failure, that runbooks are technical debt in disguise, and that every manual operation is an automation waiting to be written.",
        principles: data?.principles || [
            { id: "P-01", icon: <HardDrive size={16} />, title: "Immutable by default, mutable by exception.", desc: "Infrastructure state is declared, versioned, and applied — never mutated in-place." },
            { id: "P-02", icon: <ShieldAlert size={16} />, title: "Failure is a design input, not an edge case.", desc: "Chaos engineering is practiced quarterly. Blast radius is a first-class design constraint." },
            { id: "P-03", icon: <Eye size={16} />, title: "Observability before instrumentation.", desc: "You cannot alert on what you cannot observe. I instrument at the boundary layer first." }
        ]
    };

    return (
        <section id="philosophy">
            <div className="section-inner w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="reveal"
                >
                    <div className="section-header mb-14">
                        <span className="section-num font-mono text-[11px] text-[var(--t07-purple-bright)] tracking-widest uppercase mb-3 block">{philData.num}</span>
                        <h2 className="section-h2 text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4" dangerouslySetInnerHTML={{ __html: philData.h2.replace(/\n/g, '<br />') }} />
                        <p className="section-sub font-serif italic text-[clamp(18px,2vw,24px)] text-[var(--t07-purple-edge)] mb-4">{philData.sub}</p>
                        <p className="section-body text-[14px] leading-[1.75] text-[var(--t07-text-secondary)] max-w-[680px]">
                            {philData.body}
                        </p>
                    </div>

                    <div className="principles-list flex flex-col gap-6">
                        {philData.principles.map((principle: any, i: number) => (
                            <div key={i} className="principle-item p-6 border-l-2 border-[var(--t07-purple-mid)] bg-white/2 rounded-r-lg hover:border-[var(--t07-purple-bright)] hover:bg-[var(--t07-purple-bright)]/[0.06] transition-all group">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="principle-num font-mono text-[10px] text-[var(--t07-purple-mid)]">{principle.id}</span>
                                    <span className="text-[var(--t07-purple-mid)]">{principle.icon || <HardDrive size={16} />}</span>
                                </div>
                                <div className="principle-title text-[15px] font-bold mb-2">{principle.title}</div>
                                <p className="principle-desc text-[13px] leading-[1.65] text-[var(--t07-text-secondary)]">{principle.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="philosophy-diagram bg-[var(--t07-bg-card)] border border-[var(--t07-border-subtle)] rounded-[18px] p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden"
                >
                    <svg width="100%" height="400" viewBox="0 0 340 400" className="w-full max-w-[340px]">
                        <defs>
                            <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#7c2fd4" stopOpacity="0.1" />
                            </radialGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                        </defs>

                        <circle cx="170" cy="200" r="140" fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="1" strokeDasharray="4 8" />
                        <circle cx="170" cy="200" r="90" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="1" />

                        <motion.circle
                            animate={{ r: [32, 50, 32], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            cx="170" cy="200" r="32" fill="none" stroke="rgba(168,85,247,0.4)" strokeWidth="1"
                        />

                        <circle cx="170" cy="200" r="32" fill="url(#nodeGrad)" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" filter="url(#glow)" />
                        <text x="170" y="196" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" style={{ fontFamily: 'var(--t07-mono)' }}>SYSTEMS</text>
                        <text x="170" y="208" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" style={{ fontFamily: 'var(--t07-mono)' }}>THINKING</text>

                        <g transform="rotate(-90, 170, 200)">
                            {[
                                { label: "CODE", cx: 170, cy: 60 },
                                { label: "BUILD", cx: 310, cy: 200 },
                                { label: "RUN", cx: 170, cy: 340 },
                                { label: "OBS", cx: 30, cy: 200 }
                            ].map((node, i) => (
                                <g key={i}>
                                    <circle cx={node.cx} cy={node.cy} r="22" fill="rgba(124,47,212,0.2)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" />
                                    <text
                                        x={node.cx}
                                        y={node.cy}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="8"
                                        dominantBaseline="middle"
                                        transform={`rotate(90, ${node.cx}, ${node.cy})`}
                                        style={{ fontFamily: 'var(--t07-mono)' }}
                                    >
                                        {node.label}
                                    </text>
                                </g>
                            ))}

                            <path d="M 170 82 A 118 118 0 0 1 288 178" fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" markerEnd="url(#arr)" />
                            <path d="M 310 222 A 118 118 0 0 1 192 340" fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" markerEnd="url(#arr)" />
                            <path d="M 148 340 A 118 118 0 0 1 30 222" fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" markerEnd="url(#arr)" />
                            <path d="M 30 178 A 118 118 0 0 1 148 60" fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" markerEnd="url(#arr)" />
                        </g>

                        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6" fill="rgba(168,85,247,0.6)" />
                        </marker>
                    </svg>
                </motion.div>
            </div>
        </section>
    );
};
