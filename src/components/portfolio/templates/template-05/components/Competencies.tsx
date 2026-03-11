import React from 'react';
import { motion } from 'framer-motion';

const competencyGroups = [
    {
        category: "Distributed Systems",
        skills: ["Microservices", "REST / gRPC", "Event-driven architecture", "Service Mesh"]
    },
    {
        category: "Infrastructure",
        skills: ["Docker", "Kubernetes", "CI/CD Pipelines", "Cloud Deployment (AWS/GCP)"]
    },
    {
        category: "Data & Caching",
        skills: ["PostgreSQL", "Redis", "Supabase", "Consistency Models"]
    },
    {
        category: "Observability",
        skills: ["ELK Stack (Logging)", "Prometheus (Metrics)", "Jaeger (Tracing)", "Health Checks"]
    }
];

export const Competencies: React.FC = () => {
    return (
        <section id="competencies" className="py-12">
            <div className="flex flex-col gap-4 mb-16">
                <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-widest">Capabilities</h3>
                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Technical Domain Mastery</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {competencyGroups.map((group, groupIndex) => (
                    <motion.div
                        key={group.category}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                        className="space-y-6"
                    >
                        <h4 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4">
                            {group.category}
                            <div className="h-[1px] flex-grow bg-slate-800" />
                        </h4>

                        <div className="grid grid-cols-1 gap-4">
                            {group.skills.map((skill, skillIndex) => (
                                <div
                                    key={skill}
                                    className="flex items-center justify-between group"
                                >
                                    <span className="text-lg text-slate-300 font-medium group-hover:text-blue-400 transition-colors">
                                        {skill}
                                    </span>
                                    <div className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
