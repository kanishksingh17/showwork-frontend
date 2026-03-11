import React from 'react';
import { motion } from 'framer-motion';

export const LaptopSection: React.FC = () => {
    return (
        <section id="philosophy" className="py-32 bg-white border-b border-[var(--t05-line)] overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-[0.02] schematic-grid" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex flex-col gap-4 mb-20 max-w-2xl mx-auto">
                        <span className="text-[var(--t05-accent)] font-mono text-xs tracking-[0.2em] uppercase">
                            [ Declarative Orchestration ]
                        </span>
                        <h2 className="text-[var(--t05-ink)] text-4xl lg:text-5xl font-light leading-tight">
                            Infrastructure that <span className="font-medium">describes intent</span>,<br />
                            not just implementation.
                        </h2>
                    </div>

                    <div className="relative group">
                        {/* Terminal Mockup */}
                        <div className="w-[clamp(320px,75vw,1000px)] aspect-[16/10] bg-[var(--t05-ink)] rounded-sm border border-[var(--t05-ink)] shadow-2xl relative overflow-hidden p-8 flex flex-col text-left">
                            <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                </div>
                                <div className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">
                                    deploy_manifest.architect.v4.yaml
                                </div>
                            </div>

                            <div className="font-mono text-[13px] lg:text-[16px] leading-relaxed text-white/80">
                                <span className="text-[var(--t05-accent)]">version</span>: <span className="text-[var(--t05-mid)]">4.2.0-stable</span><br />
                                <span className="text-[var(--t05-accent)]">region</span>: <span className="text-[var(--t05-mid)]">us-east-1</span><br />
                                <br />
                                <span className="text-[var(--t05-accent)]">system</span>:<br />
                                &nbsp;&nbsp;<span className="text-[var(--t05-accent)]">identity</span>: <span className="text-white/60">auth-service-v2</span><br />
                                &nbsp;&nbsp;<span className="text-[var(--t05-accent)]">boundaries</span>:<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-[var(--t05-accent)]">ingress</span>: <span className="text-white/60">8080/tcp</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-[var(--t05-accent)]">egress</span>: <span className="text-white/60">kafka://events.prod</span><br />
                                <br />
                                <span className="text-[var(--t05-accent)]">orchestration</span>:<br />
                                &nbsp;&nbsp;<span className="text-[var(--t05-accent)]">on</span>: <span className="text-[var(--t05-mid)]">CustomerProvisioned</span><br />
                                &nbsp;&nbsp;<span className="text-[var(--t05-accent)]">invoke</span>:<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-white/60">WalletInitiator.provision()</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-white/60">WelcomeSequence.trigger()</span><br />
                                <br />
                                <span className="text-[#6ef7a2]"># System is verifying boundaries...</span><br />
                                <span className="text-white/40">&gt; architect deploy --live</span>
                            </div>
                        </div>

                        {/* Decoration Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 border border-[var(--t05-accent)]/20 rounded-full opacity-20 animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 border border-[var(--t05-accent)]/10 rounded-full opacity-10" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
