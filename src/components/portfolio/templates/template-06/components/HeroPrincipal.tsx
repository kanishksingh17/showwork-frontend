import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MetricCount = ({ target, label, sub, color = 'var(--t06-ink)' }: { target: number, label: string, sub: string, color?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target]);

    return (
        <div className="border-r border-[var(--t06-line)] p-8 first:pl-0 last:border-0 last:pr-0">
            <div className="t06-metric-num" style={{ color }}>{count}{target > 99 ? '+' : ''}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--t06-mid)] mt-4">{label}</div>
            <div className="text-[12px] text-[var(--t06-mid)] mt-1">{sub}</div>
        </div>
    );
};

export const HeroPrincipal: React.FC<{ userData: any, onScrollTo?: (id: string) => void }> = ({ userData, onScrollTo }) => {
    return (
        <section id="hero" className="relative min-h-[90vh] pt-8 pb-20 border-b border-[var(--t06-line)] overflow-hidden">
            <div className="t06-grid-backdrop opacity-40" />

            <div className="max-w-[1360px] mx-auto px-14 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left: Content */}
                    <div className="lg:col-span-7">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--t06-accent)] mb-4 block"
                        >
                            Principal Cloud Architect
                        </motion.span>

                        <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-medium leading-[1.1] tracking-tight mb-4">
                            Distributed systems <br />
                            designed for <br />
                            <span className="italic text-[var(--t06-accent)]">consequence.</span>
                        </h1>

                        <p className="font-sans text-[clamp(14px,1.5vw,17px)] font-light text-[var(--t06-ink-3)] leading-relaxed max-w-[480px] mb-8">
                            I design cloud architectures that serve as foundations — not features.
                            Scalability, cost governance, and fault tolerance engineered before
                            the first service is deployed.
                        </p>

                        <div className="flex items-center gap-8 mb-10">
                            <button
                                onClick={() => onScrollTo?.('work')}
                                className="bg-[var(--t06-accent)] text-white font-mono text-[10px] uppercase tracking-[0.16em] px-8 py-3 border border-[var(--t06-accent)] hover:bg-[var(--t06-ink)] hover:border-[var(--t06-ink)] transition-all"
                            >
                                View Architecture Work
                            </button>
                            <button
                                onClick={() => onScrollTo?.('engage')}
                                className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--t06-ink-3)] group flex items-center gap-2"
                            >
                                Discuss an Engagement <span className="group-hover:translate-x-2 transition-transform">→</span>
                            </button>
                        </div>

                        {/* Metric Strip */}
                        <div className="grid grid-cols-4 border-t border-[var(--t06-line)]">
                            <MetricCount target={340} label="Services Orchestrated" sub="Across 4 cloud providers" />
                            <MetricCount target={99} label="Aggregate Uptime %" sub="Production average, 3 yr" color="var(--t06-accent)" />
                            <MetricCount target={62} label="Cost Reduction %" sub="Through architecture review" />
                            <MetricCount target={12} label="Enterprise Engagements" sub="Advisory & design" />
                        </div>
                    </div>

                    {/* Right: Architecture Visualization */}
                    <div className="lg:col-span-5 flex justify-center">
                        <svg className="w-full max-w-[440px]" viewBox="0 0 440 480" fill="none">
                            {/* Grid backdrop internal */}
                            {[80, 160, 240, 320, 400].map(y => <line key={y} x1="0" y1={y} x2="440" y2={y} stroke="#e8e8e8" strokeWidth="0.5" />)}
                            {[110, 220, 330].map(x => <line key={x} x1={x} y1="0" x2={x} y2="480" stroke="#e8e8e8" strokeWidth="0.5" />)}

                            {/* Nodes with background for visibility */}
                            <g className="t06-arch-node group" style={{ fill: '#ffffff', stroke: 'var(--t06-line)', strokeWidth: '1' }}>
                                <rect x="160" y="20" width="120" height="40" rx="2" fill="white" stroke="currentColor" />
                                <text x="220" y="45" textAnchor="middle" className="font-mono text-[9px] font-bold tracking-[0.12em] uppercase fill-[var(--t06-ink)] stroke-none">CDN / EDGE</text>
                            </g>

                            <g className="t06-arch-node group" style={{ fill: '#ffffff', stroke: 'var(--t06-line)', strokeWidth: '1' }}>
                                <rect x="145" y="100" width="150" height="40" rx="2" fill="white" stroke="currentColor" />
                                <text x="220" y="125" textAnchor="middle" className="font-mono text-[9px] font-bold tracking-[0.12em] uppercase fill-[var(--t06-ink)] stroke-none">LOAD BALANCER</text>
                            </g>

                            <g className="t06-arch-node group" style={{ fill: '#ffffff', stroke: 'var(--t06-line)', strokeWidth: '1' }}>
                                <rect x="145" y="180" width="150" height="40" rx="2" fill="white" stroke="currentColor" />
                                <text x="220" y="205" textAnchor="middle" className="font-mono text-[9px] font-bold tracking-[0.12em] uppercase fill-[var(--t06-ink)] stroke-none">API GATEWAY</text>
                            </g>

                            {/* Service Layer */}
                            <g className="t06-arch-node group" style={{ fill: '#ffffff', stroke: 'var(--t06-line)', strokeWidth: '1' }}>
                                <rect x="20" y="260" width="100" height="40" rx="2" fill="white" stroke="currentColor" />
                                <text x="70" y="285" textAnchor="middle" className="font-mono text-[9px] font-bold uppercase fill-[var(--t06-ink)] stroke-none">SVC A</text>
                            </g>
                            <g className="t06-arch-node group" style={{ fill: '#ffffff', stroke: 'var(--t06-line)', strokeWidth: '1' }}>
                                <rect x="170" y="260" width="100" height="40" rx="2" fill="white" stroke="currentColor" />
                                <text x="220" y="285" textAnchor="middle" className="font-mono text-[9px] font-bold uppercase fill-[var(--t06-ink)] stroke-none">SVC B</text>
                            </g>
                            <g className="t06-arch-node group" style={{ fill: '#ffffff', stroke: 'var(--t06-line)', strokeWidth: '1' }}>
                                <rect x="320" y="260" width="100" height="40" rx="2" fill="white" stroke="currentColor" />
                                <text x="370" y="285" textAnchor="middle" className="font-mono text-[9px] font-bold uppercase fill-[var(--t06-ink)] stroke-none">SVC C</text>
                            </g>

                            {/* Data Layer */}
                            <g className="t06-arch-node group" style={{ fill: '#ffffff', stroke: 'var(--t06-line)', strokeWidth: '1' }}>
                                <rect x="60" y="360" width="140" height="40" rx="2" fill="white" stroke="currentColor" />
                                <text x="130" y="385" textAnchor="middle" className="font-mono text-[9px] font-bold uppercase fill-[var(--t06-ink)] stroke-none">PRIMARY DB</text>
                            </g>
                            <g className="t06-arch-node group" style={{ fill: '#ffffff', stroke: 'var(--t06-line)', strokeWidth: '1' }}>
                                <rect x="240" y="360" width="140" height="40" rx="2" fill="white" stroke="currentColor" />
                                <text x="310" y="385" textAnchor="middle" className="font-mono text-[9px] font-bold uppercase fill-[var(--t06-ink)] stroke-none">CACHE / REPLICA</text>
                            </g>

                            {/* Static Edges */}
                            <g stroke="#d8d8d8" strokeWidth="1">
                                <line x1="220" y1="60" x2="220" y2="100" />
                                <line x1="220" y1="140" x2="220" y2="180" />
                                <line x1="220" y1="220" x2="70" y2="260" />
                                <line x1="220" y1="220" x2="220" y2="260" />
                                <line x1="220" y1="220" x2="370" y2="260" />
                                <line x1="70" y1="300" x2="130" y2="360" />
                                <line x1="220" y1="300" x2="220" y2="360" />
                                <line x1="370" y1="300" x2="310" y2="360" />
                            </g>

                            {/* Animated Active Edges */}
                            <line x1="220" y1="60" x2="220" y2="100" className="t06-edge-active" />
                            <line x1="220" y1="220" x2="220" y2="260" className="t06-edge-active" style={{ animationDelay: '-0.8s' }} />

                            {/* Pulse Path */}
                            <line x1="220" y1="20" x2="220" y2="450" className="t06-edge-pulse" style={{ animationDelay: '-0.4s' }} />
                        </svg>
                    </div>
                </div>
            </div>
        </section >
    );
};
