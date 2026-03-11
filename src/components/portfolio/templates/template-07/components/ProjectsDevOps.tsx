import React from 'react';
import { motion } from 'framer-motion';
import { Box, FolderOpen } from 'lucide-react';

export const ProjectsDevOps: React.FC<{ projects: any[] }> = ({ projects }) => {
    return (
        <section id="projects">
            <div className="section-inner w-[min(1100px,95vw)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="reveal section-header mb-16"
                >
                    <span className="section-num font-mono text-[11px] text-[var(--t07-purple-bright)] tracking-widest uppercase mb-3 block">08 / Service Inventory</span>
                    <h2 className="section-h2 text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4">Deployed Systems.</h2>
                    <p className="section-sub font-serif italic text-[clamp(18px,2vw,24px)] text-[var(--t07-purple-edge)] mb-4">Engineering artifacts in production.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects && projects.length > 0 ? (
                        projects.map((project, i) => (
                            <motion.div
                                key={project.id || i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-[var(--t07-bg-card)] border border-[var(--t07-border-subtle)] rounded-[18px] p-8 hover:border-[var(--t07-border-glow)] transition-all flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <Box size={20} />
                                    <div className="px-2 py-0.5 border border-[var(--t07-purple-bright)]/20 bg-[var(--t07-purple-bright)]/5 text-[9px] font-mono text-[var(--t07-purple-bright)] uppercase rounded">
                                        [ v{1 + i}.{i} ]
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--t07-purple-glow)] transition-colors">{project.title}</h3>
                                <p className="text-[13px] text-[var(--t07-text-secondary)] leading-relaxed mb-8 flex-grow">
                                    {project.description}
                                </p>
                                <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
                                    {project.tech_stack?.map((tech: string, j: number) => (
                                        <span key={j} className="text-[10px] font-mono text-[var(--t07-text-muted)] uppercase tracking-wider">
                                            #{tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 border border-[var(--t07-border-subtle)] rounded-[18px] flex flex-col items-center justify-center opacity-40">
                            <FolderOpen size={40} className="mb-4" />
                            <p className="font-mono text-xs uppercase tracking-widest">[ NO_SERVICES_LOADED ]</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
