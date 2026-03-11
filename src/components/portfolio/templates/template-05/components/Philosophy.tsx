import React from 'react';
import { motion } from 'framer-motion';

const philosophies = [
    {
        title: "Modularity First",
        description: "Decomposing complex domains into independent, loosely coupled services to ensure scalability and agility.",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
        )
    },
    {
        title: "Failure is Expected",
        description: "Designing for resilience using circuit breakers, retries, and bulkhead patterns to prevent cascading failures.",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        )
    },
    {
        title: "Observability by Design",
        description: "Embedding metrics, distributed tracing, and centralized logging to maintain system transparency at scale.",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        )
    },
    {
        title: "Performance is Measured",
        description: "Continuous profiling and load testing to ensure P99 latencies meet strict production requirements.",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "Automation is Mandatory",
        description: "Eliminating human error through Infrastructure as Code, CI/CD pipelines, and automated testing.",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        )
    }
];

export const Philosophy: React.FC = () => {
    return (
        <section id="philosophy" className="py-24 border-b border-[var(--t05-line)]">
            <div className="flex flex-col gap-4 mb-20 max-w-2xl">
                <span className="text-[var(--t05-accent)] font-mono text-xs tracking-[0.2em] uppercase">
                    [ Design Philosophy ]
                </span>
                <h2 className="text-[var(--t05-ink)] text-3xl font-light leading-tight">
                    Engineering for <span className="font-medium italic">Scale & Resilience.</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {philosophies.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-8 border border-[var(--t05-line)] bg-white rounded-sm hover:border-[var(--t05-accent)]/30 transition-all group cursor-default shadow-sm"
                    >
                        <div className="w-10 h-10 rounded-sm bg-[var(--t05-paper)] border border-[var(--t05-line)] flex items-center justify-center text-[var(--t05-ink)]/40 mb-6 group-hover:text-[var(--t05-accent)] group-hover:border-[var(--t05-accent)]/20 transition-all">
                            {item.icon}
                        </div>
                        <h4 className="text-[var(--t05-ink)] text-lg font-medium mb-3 tracking-tight">{item.title}</h4>
                        <p className="text-[var(--t05-ink)]/60 leading-relaxed text-sm font-light">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
