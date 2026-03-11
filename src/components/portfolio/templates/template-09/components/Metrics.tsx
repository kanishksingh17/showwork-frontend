import React from 'react';

export const Metrics: React.FC = () => {
    return (
        <section id="metrics" className="py-[120px] px-12 bg-[#050608] border-t border-white/5 relative">
            <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
                <div>
                    <div className="font-mono text-[10px] tracking-[4px] uppercase text-[#F5720A] mb-4">// 04 — PERFORMANCE</div>
                    <h2 className="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[3px] text-white leading-[0.95]">
                        SYSTEM<br />METRICS
                    </h2>
                </div>
                <div className="font-['Bebas_Neue'] text-[120px] text-white/5 tracking-[-4px] leading-none select-none hidden md:block">
                    04
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 mb-16 fade-up">
                <div className="bg-[#0D1117] px-8 py-10 relative overflow-hidden border-b-2 border-transparent transition-colors duration-300 hover:border-[#F5720A] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-white/5">
                    <div className="font-mono text-[11px] tracking-[2px] uppercase text-white/30 mb-2">EVENTS PROCESSED</div>
                    <div className="font-['Bebas_Neue'] text-[56px] tracking-[-2px] leading-none mb-2 text-[#F5720A]">2.4<span className="font-mono text-[16px] text-[#F5720A]">M/s</span></div>
                    <div className="text-[12px] text-white/20 leading-[1.6]">Peak sustained throughput across all live production pipelines</div>
                </div>
                <div className="bg-[#0D1117] px-8 py-10 relative overflow-hidden border-b-2 border-transparent transition-colors duration-300 hover:border-[#F5720A] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-white/5">
                    <div className="font-mono text-[11px] tracking-[2px] uppercase text-white/30 mb-2">P99 LATENCY</div>
                    <div className="font-['Bebas_Neue'] text-[56px] tracking-[-2px] leading-none mb-2 text-[#00D4FF]">8<span className="font-mono text-[16px] text-[#F5720A]">ms</span></div>
                    <div className="text-[12px] text-white/20 leading-[1.6]">End-to-end stream processing, source to sink, measured weekly</div>
                </div>
                <div className="bg-[#0D1117] px-8 py-10 relative overflow-hidden border-b-2 border-transparent transition-colors duration-300 hover:border-[#F5720A] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-white/5">
                    <div className="font-mono text-[11px] tracking-[2px] uppercase text-white/30 mb-2">PIPELINE UPTIME</div>
                    <div className="font-['Bebas_Neue'] text-[56px] tracking-[-2px] leading-none mb-2 text-[#00FF88]">99.97<span className="font-mono text-[16px] text-[#F5720A]">%</span></div>
                    <div className="text-[12px] text-white/20 leading-[1.6]">Across all critical pipelines over a 3-year rolling average</div>
                </div>
                <div className="bg-[#0D1117] px-8 py-10 relative overflow-hidden border-b-2 border-transparent transition-colors duration-300 hover:border-[#F5720A] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-white/5">
                    <div className="font-mono text-[11px] tracking-[2px] uppercase text-white/30 mb-2">DATA FRESHNESS</div>
                    <div className="font-['Bebas_Neue'] text-[56px] tracking-[-2px] leading-none mb-2 text-white">{'<'} 30<span className="font-mono text-[16px] text-[#F5720A]">s</span></div>
                    <div className="text-[12px] text-white/20 leading-[1.6]">Time from source event to analytics-ready gold layer tables</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-up">
                <div className="bg-[#0D1117] border border-white/5 p-7">
                    <div className="flex justify-between items-center mb-5">
                        <div className="font-mono text-[11px] tracking-[2px] uppercase text-white/50">WEEKLY THROUGHPUT</div>
                        <div className="text-right">
                            <div className="font-['Bebas_Neue'] text-[24px] text-[#00FF88]">2.4M</div>
                            <div className="font-mono text-[10px] text-[#00FF88]">↑ 12% vs last week</div>
                        </div>
                    </div>
                    <svg viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
                        <defs>
                            <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F5720A" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#F5720A" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <polyline points="0,60 40,45 80,50 120,30 160,35 200,20 240,25 280,10 320,18 360,8 400,12"
                            fill="none" stroke="#F5720A" strokeWidth="2" />
                        <polygon points="0,60 40,45 80,50 120,30 160,35 200,20 240,25 280,10 320,18 360,8 400,12 400,80 0,80"
                            fill="url(#fillGrad)" />
                    </svg>
                </div>
                <div className="bg-[#0D1117] border border-white/5 p-7">
                    <div className="flex justify-between items-center mb-5">
                        <div className="font-mono text-[11px] tracking-[2px] uppercase text-white/50">DATA QUALITY SCORE</div>
                        <div className="text-right">
                            <div className="font-['Bebas_Neue'] text-[24px] text-[#00D4FF]">99.4%</div>
                            <div className="font-mono text-[10px] text-[#00D4FF]">↑ 0.2% this month</div>
                        </div>
                    </div>
                    <svg viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
                        <defs>
                            <linearGradient id="fillGrad2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <polyline points="0,40 40,38 80,42 120,35 160,20 200,18 240,22 280,15 320,12 360,10 400,8"
                            fill="none" stroke="#00D4FF" strokeWidth="2" />
                        <polygon points="0,40 40,38 80,42 120,35 160,20 200,18 240,22 280,15 320,12 360,10 400,8 400,80 0,80"
                            fill="url(#fillGrad2)" />
                    </svg>
                </div>
            </div>
        </section>
    );
};
