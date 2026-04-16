import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Container, ShieldCheck, Globe } from 'lucide-react';

export const CloudDiagramDevOps: React.FC = () => {
    return (
        <section id="cloud">
            <div className="section-inner w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="cloud-diagram bg-[var(--t07-bg-card)] border border-[var(--t07-border-subtle)] rounded-[18px] p-8 min-h-[480px] overflow-visible"
                >
                    <svg width="100%" height="480" viewBox="0 0 420 480" className="w-full h-full overflow-visible">
                        <defs>
                            <radialGradient id="regionGrad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="rgba(124,47,212,0.2)" />
                                <stop offset="100%" stopColor="rgba(124,47,212,0)" />
                            </radialGradient>
                        </defs>

                        {/* Region 1: US-EAST-1 */}
                        <g>
                            <rect x="20" y="20" width="180" height="200" rx="12" fill="url(#regionGrad)" stroke="rgba(168,85,247,0.25)" strokeWidth="1" strokeDasharray="5 4" />
                            <text x="110" y="44" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" letterSpacing="2" style={{ fontFamily: 'var(--t07-mono)' }}>US-EAST-1</text>

                            <rect x="36" y="54" width="148" height="76" rx="8" fill="rgba(168,85,247,0.1)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
                            <text x="110" y="72" textAnchor="middle" fill="white" fontSize="9" style={{ fontFamily: 'var(--t07-sans)' }}>VPC / EKS Cluster</text>

                            {[46, 90, 134].map((x, i) => (
                                <rect key={i} x={x} y={84} width="36" height="28" rx="4" fill="rgba(124,47,212,0.3)" stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
                            ))}
                            {[64, 108, 152].map((x, i) => (
                                <text key={i} x={x} y={102} textAnchor="middle" fill="white" fontSize="8" style={{ fontFamily: 'var(--t07-sans)' }}>Node</text>
                            ))}

                            <rect x="36" y="144" width="68" height="60" rx="8" fill="rgba(59,13,110,0.4)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
                            <text x="70" y="164" textAnchor="middle" fill="white" fontSize="9">RDS</text>
                            <text x="70" y="178" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Multi-AZ</text>

                            <rect x="116" y="144" width="68" height="60" rx="8" fill="rgba(59,13,110,0.4)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
                            <text x="150" y="164" textAnchor="middle" fill="white" fontSize="9">ElastiCache</text>
                            <text x="150" y="178" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Redis</text>
                        </g>

                        {/* Region 2: EU-WEST-2 */}
                        <g>
                            <rect x="220" y="20" width="180" height="200" rx="12" fill="url(#regionGrad)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" strokeDasharray="5 4" />
                            <text x="310" y="44" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" letterSpacing="2" style={{ fontFamily: 'var(--t07-mono)' }}>EU-WEST-2</text>

                            <rect x="236" y="54" width="148" height="76" rx="8" fill="rgba(168,85,247,0.1)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
                            <text x="310" y="72" textAnchor="middle" fill="white" fontSize="9">VPC / GKE Cluster</text>

                            {[246, 290, 334].map((x, i) => (
                                <rect key={i} x={x} y={84} width="36" height="28" rx="4" fill="rgba(124,47,212,0.3)" stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
                            ))}
                            {[264, 308, 352].map((x, i) => (
                                <text key={i} x={x} y={102} textAnchor="middle" fill="white" fontSize="8">Node</text>
                            ))}

                            <rect x="236" y="144" width="68" height="60" rx="8" fill="rgba(59,13,110,0.4)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
                            <text x="270" y="172" textAnchor="middle" fill="white" fontSize="9">Cloud SQL</text>

                            <rect x="316" y="144" width="68" height="60" rx="8" fill="rgba(59,13,110,0.4)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
                            <text x="350" y="172" textAnchor="middle" fill="white" fontSize="9">MemoryStore</text>
                        </g>

                        {/* Transit Layer */}
                        <rect x="100" y="260" width="220" height="50" rx="10" fill="rgba(124,47,212,0.15)" stroke="rgba(168,85,247,0.3)" strokeWidth="1" />
                        <text x="210" y="282" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Global Load Balancer + CDN</text>
                        <text x="210" y="298" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Anycast · Cloudflare · WAF</text>

                        {/* Connections */}
                        <line x1="110" y1="220" x2="160" y2="260" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
                        <line x1="310" y1="220" x2="260" y2="260" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
                        <path d="M 200 160 Q 210 150 220 160" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" />
                        <text x="210" y="145" textAnchor="middle" fill="rgba(168,85,247,0.7)" fontSize="8">replication</text>

                        {/* Control Plane */}
                        <rect x="60" y="340" width="300" height="110" rx="12" fill="rgba(18,6,30,0.6)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
                        <text x="210" y="364" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" letterSpacing="2">CONTROL PLANE</text>

                        {[
                            { label: "ArgoCD", x: 80 },
                            { label: "Vault", x: 165 },
                            { label: "Terraform", x: 250, w: 80 }
                        ].map((node, i) => (
                            <rect key={i} x={node.x} y={374} width={node.w || 70} height={34} rx="6" fill="rgba(124,47,212,0.2)" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />
                        ))}
                        {[115, 200, 290].map((x, i) => (
                            <text key={i} x={x} y={395} textAnchor="middle" fill="white" fontSize="9">
                                {i === 0 ? "ArgoCD" : i === 1 ? "Vault" : "Terraform"}
                            </text>
                        ))}

                        {/* Animated Data Dots */}
                        <motion.circle
                            animate={{ cx: [110, 160], cy: [220, 260], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            r="3" fill="var(--t07-purple-bright)"
                        />
                        <motion.circle
                            animate={{ cx: [310, 260], cy: [220, 260], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            r="3" fill="var(--t07-purple-bright)"
                        />
                    </svg>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="cloud-right"
                >
                    <div className="section-header mb-10">
                        <span className="section-num font-mono text-[11px] text-[var(--t07-purple-bright)] tracking-widest uppercase mb-3 block">03 / Cloud Architecture</span>
                        <h2 className="section-h2 text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4">Multi-cloud. Multi-region. Zero single points.</h2>
                        <p className="section-sub font-serif italic text-[clamp(18px,2vw,24px)] text-[var(--t07-purple-edge)] mb-4">Infrastructure that survives an AZ going dark.</p>
                        <p className="section-body text-[14px] leading-[1.75] text-[var(--t07-text-secondary)]">
                            I architect for active-active, not active-passive. Every stateful system has replication lag monitored as an SLO. Every region is a complete system, not a failover target.
                        </p>
                    </div>

                    <div className="cloud-capabilities flex flex-col gap-4">
                        {[
                            { icon: <Layers size={18} />, title: "Terraform at Scale", desc: "Modular IaC with remote state locking, Atlantis for PR-driven plans, and sentinel policies." },
                            { icon: <Container size={18} />, title: "Kubernetes Operations", desc: "Fleet management across EKS, GKE, AKS. KEDA autoscaling and Karpenter provisioning." },
                            { icon: <ShieldCheck size={18} />, title: "Zero-Trust Networking", desc: "Service mesh via Istio with mTLS everywhere. Secrets injected at runtime via Vault." },
                            { icon: <Globe size={18} />, title: "Global Traffic Management", desc: "Anycast routing, weighted traffic splitting, and automated health-check failover." }
                        ].map((cap, i) => (
                            <div key={i} className="cap-item flex gap-4 items-start p-5 border border-[var(--t07-border-subtle)] rounded-xl bg-white/2 hover:border-[var(--t07-border-glow)] transition-all">
                                <div className="cap-icon w-9 h-9 rounded-lg bg-[var(--t07-purple-mid)]/20 flex-shrink-0 flex items-center justify-center text-lg">
                                    {cap.icon}
                                </div>
                                <div>
                                    <div className="cap-title text-[14px] font-semibold mb-1">{cap.title}</div>
                                    <p className="cap-desc text-[12px] text-[var(--t07-text-secondary)] leading-relaxed">{cap.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
