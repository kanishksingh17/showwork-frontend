import React from 'react';
import { motion } from 'framer-motion';

export const ProjectCards: React.FC<{ projects: any[] }> = ({ projects }) => {
    const displayProjects = projects?.length > 0 ? projects : [
        { title: 'Alpha Cloud Platform', description: 'Next-gen cloud management dashboard with real-time scaling.', category: 'Cloud Arch', tech: ['Terraform', 'Go', 'AWS'] },
        { title: 'Secure Vault', description: 'Zero-trust architecture for enterprise data encryption.', category: 'Security', tech: ['Vault', 'Docker', 'GCP'] }
    ];

    return (
        <section id="portfolio" className="pt-10 pb-24 border-b border-white/10">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex flex-col gap-2">
                    {displayProjects.map((project, idx) => (
                        <motion.article
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="bg-[#111] rounded-2xl overflow-hidden border border-white/10 group"
                        >
                            <div className="w-full h-[clamp(320px,35vw,480px)] bg-zinc-900 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black group-hover:scale-105 transition-transform duration-700" />
                                {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60" />}
                                <div className="absolute inset-0 flex items-center justify-center p-12">
                                    {/* Mock visuals based on spec */}
                                    {idx % 2 === 0 ? (
                                        <div className="w-[180px] h-[360px] bg-black rounded-[24px] border-2 border-white/10 shadow-2xl overflow-hidden p-3 rotate-[-15deg]">
                                            <div className="w-full h-full bg-zinc-950 rounded-lg flex flex-col items-center justify-center gap-2">
                                                <div className="font-mono text-[13px] text-white">{project.title}</div>
                                                <div className="w-10 h-0.5 bg-[#4ade80]" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-[400px] aspect-[16/10] bg-[#0d0d1a] rounded-[10px] border border-white/10 shadow-3xl overflow-hidden flex flex-col">
                                            <div className="h-8 bg-[#111122] border-b border-white/5 flex items-center px-3 gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                                                <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                                                <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
                                            </div>
                                            <div className="flex-1 flex items-center justify-center font-mono text-[10px] text-white/30">
                                                [ {project.title} / DASHBOARD ]
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-6 lg:px-8 lg:py-8 grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-8">
                                <div>
                                    <h3 className="font-display text-[22px] lg:text-[32px] font-bold uppercase tracking-[0.04em] text-white leading-tight mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-[13px] text-white/55 leading-relaxed max-w-[380px]">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    <span className="h-7 px-3 bg-white/5 border border-white/10 rounded-full text-[11px] text-white/55 flex items-center tracking-wide">{project.category}</span>
                                    {project.tech?.map((t: string, tid: number) => (
                                        <span key={tid} className="h-7 px-3 bg-white/5 border border-white/10 rounded-full text-[11px] text-white/55 flex items-center tracking-wide">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};
