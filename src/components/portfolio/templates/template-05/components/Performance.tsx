import React from 'react';
import { motion } from 'framer-motion';

const patterns = [
    {
        title: "Circuit Breaker",
        description: "Prevents a network or service failure from cascading to other services by monitoring for failures and wrapping problematic calls.",
        tag: "Resilience"
    },
    {
        title: "Retry Logic",
        description: "Enables an application to handle temporary failures when it tries to connect to a service or network resource with exponential backoff.",
        tag: "Stability"
    },
    {
        title: "Health Checks",
        description: "Endpoints that allow an external system to verify if a service instance is healthy and ready to receive traffic.",
        tag: "Observability"
    },
    {
        title: "Blue/Green Deployment",
        description: "A technique that reduces downtime and risk by running two identical production environments, only one of which serves live traffic.",
        tag: "Deployment"
    }
];

export const Performance: React.FC = () => {
    return (
        <section id="performance" className="py-12">
            <div className="bg-slate-800/20 border border-slate-700/30 rounded-[2.5rem] p-8 lg:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Legend / Intro */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-widest">Performance & Resilience</h3>
                            <h2 className="text-4xl font-bold text-white tracking-tight leading-tight">Zero-Trust Architecture</h2>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Applying production-grade patterns to ensure mission-critical systems remain performant
                            under load and resilient during hardware or network degradation.
                        </p>
                        <div className="pt-4">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                99.99% Availability Commitment
                            </div>
                        </div>
                    </div>

                    {/* Pattern Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {patterns.map((pattern, index) => (
                            <motion.div
                                key={pattern.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all space-y-3"
                            >
                                <div className="text-[10px] font-bold uppercase tracking-widest text-blue-500/80">
                                    {pattern.tag}
                                </div>
                                <h4 className="text-lg font-bold text-white">{pattern.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {pattern.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
