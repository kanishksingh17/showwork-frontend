import React from 'react';
import { motion } from 'framer-motion';

export const AsyncyHero: React.FC<{ customData?: any }> = ({ customData }) => {
    const headline = customData?.headline || "Designing distributed systems with deterministic boundaries.";
    const bio = customData?.bio || "Building resilient, event-driven infrastructure that scales with business complexity, not just traffic.";
    return (
        <section id="hero" className="relative min-h-screen pt-6 pb-20 lg:pt-8 lg:pb-32 border-b border-[var(--t05-line)] overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-[0.03] schematic-grid" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left: Content */}
                    <div className="lg:col-span-5 flex flex-col gap-8 lg:pr-12">
                        <div className="flex flex-col gap-4">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[var(--t05-accent)] font-mono text-xs tracking-[0.2em] uppercase"
                            >
                                [ System Architecture ]
                            </motion.span>

                            <h1 className="text-[var(--t05-ink)] text-4xl lg:text-5xl font-light leading-[1.15] tracking-tight">
                                {headline}
                            </h1>

                            <p className="text-[var(--t05-ink)]/60 text-lg font-light max-w-md leading-relaxed mt-4">
                                {bio}
                            </p>
                        </div>

                        <div className="flex flex-col gap-6 mt-8 pl-4 border-l border-[var(--t05-line)]">
                            <div className="flex flex-col gap-1">
                                <span className="text-[var(--t05-ink)]/40 font-mono text-[10px] uppercase tracking-wider">Current Focus</span>
                                <span className="text-[var(--t05-ink)] text-sm font-medium">Event Sourcing & CQRS Patterns</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[var(--t05-ink)]/40 font-mono text-[10px] uppercase tracking-wider">Tech Stack</span>
                                <span className="text-[var(--t05-ink)] text-sm font-medium">Go, Kafka, Kubernetes, gRPC</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 mt-10">
                            <button
                                className="bg-[var(--t05-accent)] text-white font-mono text-[11px] uppercase tracking-[0.16em] px-8 py-3 rounded-sm border border-[var(--t05-accent)] hover:bg-[var(--t05-ink)] hover:border-[var(--t05-ink)] transition-all shadow-sm"
                            >
                                View Systems
                            </button>
                            <button
                                className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--t05-ink)] hover:text-[var(--t05-accent)] transition-colors"
                            >
                                [ START_CONVERSATION ]
                            </button>
                        </div>
                    </div>

                    {/* Right: Schematic Visualization */}
                    <div className="lg:col-span-7 relative w-full aspect-[4/3] lg:aspect-auto lg:h-[600px] border border-[var(--t05-line)] bg-white/50 rounded-sm p-8 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 z-0 opacity-[0.03] schematic-grid" />
                        <div className="relative z-10 w-full h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start w-3/4 mx-auto">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 border border-[var(--t05-ink)]/20 rounded-full flex items-center justify-center bg-white shadow-sm">
                                        <span className="material-symbols-outlined text-[var(--t05-ink)]/60 text-xl">cloud_queue</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-[var(--t05-ink)]/50">Gateway</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="px-2 py-1 border border-[var(--t05-accent)]/30 bg-[var(--t05-accent)]/5 rounded text-xs font-mono text-[var(--t05-accent)] font-medium">
                                        [ SLA: 99.97% ]
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 border border-[var(--t05-ink)]/20 rounded-full flex items-center justify-center bg-white shadow-sm">
                                        <span className="material-symbols-outlined text-[var(--t05-ink)]/60 text-xl">api</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-[var(--t05-ink)]/50">Service Mesh</span>
                                </div>
                            </div>

                            <div className="absolute inset-0 pointer-events-none">
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <path d="M25 20 L25 40 L50 50 L75 40 L75 20" fill="none" stroke="var(--t05-line)" strokeWidth="0.5" />
                                    <path d="M50 50 L50 80" fill="none" stroke="var(--t05-line)" strokeWidth="0.5" />
                                </svg>
                            </div>

                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                <div className="relative w-32 h-32 border border-[var(--t05-ink)]/10 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm z-20 shadow-sm">
                                    <div className="text-center">
                                        <span className="material-symbols-outlined text-[var(--t05-accent)] text-4xl mb-1">hub</span>
                                        <p className="font-mono text-[10px] text-[var(--t05-ink)] uppercase tracking-[0.2em] font-bold">Core</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-around items-end w-full mt-auto pt-10 border-t border-dashed border-[var(--t05-line)]">
                                <div className="flex flex-col items-center gap-3">
                                    <span className="material-symbols-outlined text-[var(--t05-ink)]/40">database</span>
                                    <span className="font-mono text-[10px] text-[var(--t05-ink)]/50">Read Model</span>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <span className="material-symbols-outlined text-[var(--t05-ink)]/40">storage</span>
                                    <span className="font-mono text-[10px] text-[var(--t05-ink)]/50">Event Store</span>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <span className="material-symbols-outlined text-[var(--t05-ink)]/40">analytics</span>
                                    <span className="font-mono text-[10px] text-[var(--t05-ink)]/50">Analytics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
