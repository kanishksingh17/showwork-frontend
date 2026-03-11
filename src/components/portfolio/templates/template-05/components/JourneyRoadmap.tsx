import React from 'react';
import { motion } from 'framer-motion';

export const JourneyRoadmap: React.FC = () => {
    const events = [
        { date: "Current Phase", title: "Distributed Consensus", desc: "Implementing Raft-based consensus for high-availability state machines." },
        { date: "Level 03", title: "Event Sourced Core", desc: "Migration of legacy RDBMS to append-only immutable event stores." },
        { date: "Level 02", title: "Service Mesh Alpha", desc: "Zero-trust network implementation with mTLS and automated sidecar injection." },
        { date: "Level 01", title: "Foundational API", desc: "Stateless microservices baseline with centralized monitoring." }
    ];

    return (
        <section id="evolution" className="py-32 border-b border-[var(--t05-line)] bg-[var(--t05-paper)] overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-[0.03] schematic-grid" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-4 mb-20 max-w-2xl">
                    <span className="text-[var(--t05-accent)] font-mono text-xs tracking-[0.2em] uppercase">
                        [ System Evolution ]
                    </span>
                    <h2 className="text-[var(--t05-ink)] text-3xl font-light leading-tight">
                        A trajectory focused on <br />
                        <span className="font-medium italic">fault-tolerant scalability.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative aspect-square border border-[var(--t05-line)] bg-white/50 rounded-sm p-8 group">
                        <div className="absolute inset-0 z-0 opacity-[0.03] schematic-grid" />
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <div className="flex flex-col gap-6 w-full max-w-[280px]">
                                {[100, 75, 50, 25].map((w, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${w}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, duration: 1 }}
                                        className="h-12 border border-[var(--t05-line)] bg-white flex items-center px-4 relative shadow-sm"
                                    >
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${i === 0 ? 'bg-[var(--t05-accent)]' : 'bg-[var(--t05-line)]'}`} />
                                        <span className="font-mono text-[10px] text-[var(--t05-ink)]/40 uppercase tracking-widest">LAYER_0{4 - i}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Decorative line */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-dashed border-t border-[var(--t05-line)] rotate-45 pointer-events-none opacity-50" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        {events.map((event, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="relative pl-12 border-l border-[var(--t05-line)] group"
                            >
                                <div className={`absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full border-2 border-white transition-colors duration-300 ${idx === 0 ? 'bg-[var(--t05-accent)]' : 'bg-[var(--t05-line)] group-hover:bg-[var(--t05-accent)]/40'}`} />
                                <div className="flex flex-col gap-2">
                                    <span className="font-mono text-[10px] text-[var(--t05-accent)] uppercase tracking-wider font-bold">
                                        [ {event.date} ]
                                    </span>
                                    <h4 className="text-[var(--t05-ink)] text-xl font-light">
                                        {event.title}
                                    </h4>
                                    <p className="text-[var(--t05-ink)]/60 text-sm font-light leading-relaxed">
                                        {event.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
