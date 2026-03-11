import React from 'react';
import { motion } from 'framer-motion';

export const SkillsGrid: React.FC<{ userData: any }> = ({ userData }) => {
    const pillars = [
        {
            title: "Cloud Infrastructure",
            role: "AWS / Azure / GCP",
            desc: "Architecting highly available and scalable multi-region cloud environments."
        },
        {
            title: "DevOps & IaC",
            role: "Terraform / Kubernetes / CI-CD",
            desc: "Automating infrastructure deployment and container orchestration at scale."
        },
        {
            title: "Security & Compliance",
            role: "IAM / Networking / Encryption",
            desc: "Implementing zero-trust architecture and rigorous cloud security standards."
        },
        {
            title: "System Design",
            role: "Distributed Systems / Microservices",
            desc: "Bridging complex logic with resilient, performant product architecture."
        }
    ];

    return (
        <section id="skills" className="pt-24 pb-32 border-b border-white/10">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-12">
                    <div className="pt-1">
                        <span className="text-[11px] font-normal tracking-[0.18em] uppercase text-white/35">Competencies</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 rounded overflow-hidden bg-white/[0.02]">
                        {pillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                                className={`p-12 lg:p-16 flex flex-col items-center text-center gap-6 border-white/10 ${idx % 2 === 0 ? 'md:border-r' : ''} ${idx < 2 ? 'border-b' : ''} hover:bg-white/[0.03] transition-colors duration-500`}
                            >
                                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center relative group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#6EE7F7] via-[#B56EF7] to-[#F7A26E] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                                    <div className="w-12 h-16 bg-white/5 rounded-t-full mt-4" />
                                </div>
                                <div>
                                    <div className="font-display text-[18px] lg:text-[22px] font-bold uppercase tracking-[0.08em] text-white leading-tight">
                                        {pillar.title}
                                    </div>
                                    <div className="text-[11px] font-mono tracking-[0.12em] text-[#B56EF7] uppercase mt-2">
                                        {pillar.role}
                                    </div>
                                </div>
                                <p className="text-[13px] text-white/45 leading-relaxed max-w-[280px]">
                                    {pillar.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
