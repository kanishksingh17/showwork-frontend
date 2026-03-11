import React from 'react';
import { motion } from 'framer-motion';

const PillarBlock = ({ color, delay = 0 }: { color: string, delay?: number }) => (
    <div className="isometric-container w-full h-[120px] mb-10 flex items-center justify-center">
        <div className="isometric-view scale-75">
            <motion.div
                initial={{ transform: 'translateZ(-100px)', opacity: 0 }}
                whileInView={{ transform: 'translateZ(0px)', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay }}
                className="base-plate w-24 h-24 absolute -translate-x-12 -translate-y-12"
            />
            <motion.div
                initial={{ transform: 'translateZ(100px)', opacity: 0 }}
                whileInView={{ transform: 'translateZ(10px)', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: delay + 0.3 }}
                className="block-isometric -translate-x-5 -translate-y-5"
                style={{ backgroundColor: color }}
            >
                <div className="face face-top" />
                <div className="face face-front" />
                <div className="face face-right" />
            </motion.div>
        </div>
    </div>
);

export const PlatformPillars: React.FC = () => {
    const pillars = [
        {
            title: "Deterministic Execution",
            icon: "hub",
            desc: "Isolated execution contexts with guaranteed state consistency across distributed clusters."
        },
        {
            title: "Event Streaming",
            icon: "settings_input_component",
            desc: "High-throughput event sourcing with zero-loss durability and ordered delivery semantics."
        },
        {
            title: "Boundary Isolation",
            icon: "grid_view",
            desc: "Strict domain boundaries enforced by gRPC contracts and automated schema versioning."
        }
    ];

    return (
        <section id="patterns" className="py-24 border-b border-[var(--t05-line)] bg-white/30 overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-[0.02] schematic-grid" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-4 mb-20 max-w-2xl">
                    <span className="text-[var(--t05-accent)] font-mono text-xs tracking-[0.2em] uppercase">
                        [ Core Patterns ]
                    </span>
                    <h2 className="text-[var(--t05-ink)] text-3xl font-light leading-tight">
                        Infrastructure structured for <br />
                        <span className="font-medium italic">operational predictability.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {pillars.map((pillar, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col gap-6 p-8 border border-[var(--t05-line)] bg-white rounded-sm hover:border-[var(--t05-accent)]/30 transition-all group shadow-sm"
                        >
                            <div className="w-12 h-12 border border-[var(--t05-line)] bg-[var(--t05-paper)] flex items-center justify-center rounded-sm group-hover:bg-[var(--t05-accent)]/5 group-hover:border-[var(--t05-accent)]/20 transition-all">
                                <span className="material-symbols-outlined text-[var(--t05-ink)]/60 text-xl group-hover:text-[var(--t05-accent)]">
                                    {pillar.icon}
                                </span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[var(--t05-ink)] text-lg font-medium leading-tight">
                                    {pillar.title}
                                </h3>
                                <p className="text-[var(--t05-ink)]/60 text-sm leading-relaxed font-light">
                                    {pillar.desc}
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-dashed border-[var(--t05-line)]">
                                <span className="font-mono text-[10px] text-[var(--t05-accent)] uppercase tracking-wider">
                                    [ Specification_0{idx + 1} ]
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
