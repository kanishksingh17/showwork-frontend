import React from 'react';
import { motion } from 'framer-motion';

const caseStudies = [
    {
        title: "ShowWork: Resume & Portfolio Engine",
        impact: "Scaling high-fidelity portfolio generation for 100k+ concurrent users.",
        problem: "Existing portfolio builders were either too generic or lacked the deep technical positioning required for senior engineers. Generation was slow and not fault-tolerant.",
        design: "Implemented a multi-tier distributed architecture using Node.js microservices and a shared state store (Redis).",
        decisions: [
            "Event-driven generation using RabbitMQ for asynchronous heavy lifting.",
            "PostgreSQL with row-level security for robust data isolation.",
            "Stateless API design for horizontal scaling across Kubernetes nodes."
        ],
        strategy: "Auto-scaling groups based on queue depth and CPU metrics. Multi-region database replication for lower latency.",
        metrics: ["99.9% Uptime", "< 2s Generation Time", "10k+ API req/sec"]
    },
    {
        title: "Scalable API Backend System",
        impact: "Orchestrating complex data flow across 50+ interconnected microservices.",
        problem: "A monolithic legacy system was causing deployment bottlenecks and frequent cascading failures due to tight coupling.",
        design: " transitioned to a hexagonal architecture with a gRPC-based service mesh (Istio) for secure and efficient inter-service communication.",
        decisions: [
            "Circuit breakers (Hystrix) to prevent failure propagation.",
            "Centralized configuration management with HashiCorp Consul.",
            "API Gateway (Kong) for centralized auth and rate limiting."
        ],
        strategy: "Blue/Green deployment strategy to ensure zero-downtime updates. Distributed tracing with Jaeger for bottleneck identification.",
        metrics: ["40% Reduced Latency", "Zero Deployment Errors", "50+ Independent Services"]
    }
];

export const CaseStudies: React.FC = () => {
    return (
        <section id="case-studies" className="py-12 space-y-24">
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-widest">Case Studies</h3>
                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">System Architecture Deep Dives</h2>
            </div>

            <div className="space-y-32">
                {caseStudies.map((study, index) => (
                    <motion.div
                        key={study.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
                    >
                        {/* Left side: Technical Details */}
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <h4 className="text-3xl font-bold text-white tracking-tight leading-tight">{study.title}</h4>
                                <p className="text-blue-400 font-medium text-lg leading-relaxed">{study.impact}</p>
                            </div>

                            <div className="space-y-8 text-slate-400">
                                <div className="space-y-3">
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">The Problem</span>
                                    <p className="leading-relaxed">{study.problem}</p>
                                </div>

                                <div className="space-y-3">
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Design & Decisions</span>
                                    <ul className="space-y-2 list-disc list-inside marker:text-blue-500/50">
                                        {study.decisions.map(d => <li key={d}>{d}</li>)}
                                    </ul>
                                </div>

                                <div className="space-y-3">
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Scalability Strategy</span>
                                    <p className="leading-relaxed">{study.strategy}</p>
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="pt-6 flex flex-wrap gap-8">
                                {study.metrics.map(m => (
                                    <div key={m} className="flex flex-col gap-1">
                                        <span className="text-2xl font-bold text-white">{m.split(' ')[0]}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                                            {m.split(' ').slice(1).join(' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right side: Abstract Architecture Visual */}
                        <div className="relative aspect-[4/3] bg-slate-800/20 border border-slate-700/30 rounded-3xl overflow-hidden flex items-center justify-center group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                            <svg viewBox="0 0 400 300" className="w-full h-full p-12">
                                {/* Modern Abstract Technical Diagram (Placeholders for real diagrams) */}
                                <rect x="50" y="50" width="80" height="40" rx="4" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2" />
                                <rect x="50" y="130" width="80" height="40" rx="4" fill="none" stroke="#3b82f6" strokeWidth="1" />
                                <rect x="50" y="210" width="80" height="40" rx="4" fill="none" stroke="#3b82f6" strokeWidth="1" />

                                <circle cx="250" cy="150" r="40" fill="none" stroke="#3b82f6" strokeWidth="1" />
                                <circle cx="250" cy="150" r="30" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" strokeDasharray="2 2" />

                                <path d="M130 70 L 210 150" stroke="#3b82f6" strokeWidth="0.5" opacity="0.4" />
                                <path d="M130 150 L 210 150" stroke="#3b82f6" strokeWidth="0.5" opacity="0.4" />
                                <path d="M130 230 L 210 150" stroke="#3b82f6" strokeWidth="0.5" opacity="0.4" />

                                <rect x="300" y="130" width="60" height="40" rx="2" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1" />
                                <path d="M290 150 L 300 150" stroke="#3b82f6" strokeWidth="0.5" />
                            </svg>

                            <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700/50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                                Architecture Diagram v2.4
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
