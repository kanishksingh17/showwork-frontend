import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        title: "Requirement Analysis",
        description: "Deep-diving into functional and non-functional requirements. Defining SLAs, peak traffic estimations, and data consistency needs."
    },
    {
        title: "Traffic Estimation",
        description: "Calculating QPS, bandwidth, and storage requirements for the next 12-24 months of growth."
    },
    {
        title: "Service Decomposition",
        description: "Mapping domains to microservices based on single-responsibility and bounded contexts."
    },
    {
        title: "Data Modeling",
        description: "Choosing the right storage engine (SQL vs. NoSQL) and designing schema for performance and scalability."
    },
    {
        title: "Failure Planning",
        description: "Mapping potential system failures and implementing graceful degradation and fallback strategies."
    },
    {
        title: "Observability Setup",
        description: "Configuring the standard TRIAD (Logging, Metrics, Tracing) to ensure day-two operational success."
    },
    {
        title: "Deployment & Automation",
        description: "Standardizing pipelines for zero-downtime releases via Blue/Green or Canary strategies."
    }
];

export const Process: React.FC = () => {
    return (
        <section id="process" className="py-12">
            <div className="flex flex-col gap-4 mb-20 text-center">
                <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-widest">Methodology</h3>
                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">How I Design Systems</h2>
            </div>

            <div className="relative max-w-3xl mx-auto">
                {/* Central Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-800 hidden md:block" />

                <div className="space-y-16">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex items-center gap-8 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Content Panel */}
                            <div className="md:w-1/2 flex flex-col items-start md:items-end px-4 md:px-12 text-left md:text-right">
                                <div className={`space-y-2 ${index % 2 === 0 ? "md:items-end" : "md:items-start"} flex flex-col w-full`}>
                                    <h4 className="text-lg font-bold text-white tracking-tight">{step.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Marker */}
                            <div className="absolute left-0 md:left-1/2 top-1.5 md:-translate-x-1/2 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)] z-20" />
                                <div className="absolute h-6 w-6 rounded-full border border-blue-500/20 animate-ping z-10" />
                            </div>

                            {/* Spacer for alignment */}
                            <div className="md:w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
