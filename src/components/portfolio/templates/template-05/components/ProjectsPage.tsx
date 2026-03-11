import React from 'react';
import { motion } from 'framer-motion';

export const ProjectsPage: React.FC<{ projects: any[] }> = ({ projects }) => {
    return (
        <section id="projects" className="relative min-h-screen pt-12 pb-32 bg-[var(--t05-paper)]">
            <div className="absolute inset-0 z-0 opacity-[0.02] schematic-grid" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-4 mb-16">
                    <span className="text-[var(--t05-accent)] font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                        [ REPO_O2: DEPLOYED_SYSTEMS ]
                    </span>
                    <h2 className="text-[var(--t05-ink)] text-5xl font-light">Service Inventory.</h2>
                    <p className="text-[var(--t05-ink)]/50 font-mono text-xs uppercase tracking-widest max-w-md">
                        Documentation of high-consequence infrastructure and distributed service implementations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {projects && projects.length > 0 ? projects.map((project, i) => (
                        <motion.div
                            key={project.id || i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col border border-[var(--t05-line)] bg-white/40 hover:border-[var(--t05-accent)] transition-all overflow-hidden"
                        >
                            {/* Project Header */}
                            <div className="p-6 border-b border-[var(--t05-line)] flex justify-between items-start bg-white/60">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[var(--t05-accent)] font-mono text-[9px] uppercase tracking-widest font-bold">System {i + 1}</span>
                                    <h3 className="text-[var(--t05-ink)] text-xl font-medium tracking-tight group-hover:text-[var(--t05-accent)] transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                                <div className="px-2 py-1 border border-[var(--t05-accent)]/20 bg-[var(--t05-accent)]/5 text-[9px] font-mono text-[var(--t05-accent)] uppercase">
                                    [ STABLE ]
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="p-8 flex flex-col gap-6 flex-grow">
                                <p className="text-[var(--t05-ink)]/60 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-[var(--t05-line)]">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[var(--t05-ink)]/30 font-mono text-[8px] uppercase tracking-wider">Interface</span>
                                        <span className="text-[var(--t05-ink)] text-[10px] font-mono">gRPC / Protobuf</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[var(--t05-ink)]/30 font-mono text-[8px] uppercase tracking-wider">Metrics</span>
                                        <span className="text-[var(--t05-accent)] text-[10px] font-mono">99.99% Uptime</span>
                                    </div>
                                </div>
                            </div>

                            {/* Project Footer */}
                            <div className="px-6 py-4 bg-[var(--t05-paper)] border-t border-[var(--t05-line)] flex items-center justify-between">
                                <div className="flex gap-2">
                                    {project.tech_stack?.slice(0, 3).map((tech: string, idx: number) => (
                                        <span key={idx} className="text-[8px] font-mono text-[var(--t05-ink)]/40 uppercase">
                                            #{tech}
                                        </span>
                                    ))}
                                </div>
                                <button className="text-[var(--t05-ink)] hover:text-[var(--t05-accent)] transition-colors">
                                    <span className="material-symbols-outlined text-lg">arrow_outward</span>
                                </button>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="col-span-full py-20 border border-[var(--t05-line)] flex flex-col items-center justify-center opacity-40">
                            <span className="material-symbols-outlined text-4xl mb-4">folder_off</span>
                            <p className="font-mono text-xs uppercase tracking-widest">[ NO_SERVICES_LOADED ]</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
