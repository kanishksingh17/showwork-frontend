import React from 'react';

export const About: React.FC = () => {
    return (
        <section id="about" className="py-[120px] px-12 bg-[#080B10] border-t border-white/5 relative">
            <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
                <div>
                    <div className="font-mono text-[10px] tracking-[4px] uppercase text-[#F5720A] mb-4">// 01 — PROFILE</div>
                    <h2 className="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[3px] text-white leading-[0.95]">
                        ABOUT<br />THE ENGINEER
                    </h2>
                </div>
                <div className="font-['Bebas_Neue'] text-[120px] text-white/5 tracking-[-4px] leading-none select-none hidden md:block">
                    01
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative fade-up">
                    <div className="bg-black border border-white/5 rounded-sm overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
                        <div className="bg-[#111] py-3 px-4 flex items-center gap-2 border-b border-white/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                            <span className="font-mono text-[11px] text-white/30 tracking-[1px] ml-2">pipeline-profile.sh</span>
                        </div>
                        <div className="p-6 font-mono text-[12px] leading-[2] overflow-x-auto">
                            <div className="flex gap-3"><span className="text-[#F5720A]">▸</span><span className="text-[#00D4FF]">cat engineer.json</span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">&#123;</span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">&nbsp;&nbsp;<span className="text-[#00D4FF]">"name"</span>: <span className="text-[#00FF88]">"Alex Morgan"</span>,</span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">&nbsp;&nbsp;<span className="text-[#00D4FF]">"role"</span>: <span className="text-[#00FF88]">"Senior Data Eng"</span>,</span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">&nbsp;&nbsp;<span className="text-[#00D4FF]">"experience"</span>: <span className="text-[#00FF88]">9</span>,</span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">&nbsp;&nbsp;<span className="text-[#00D4FF]">"specialization"</span>: [</span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#00FF88]">"stream-processing"</span>,</span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#00FF88]">"lakehouse-design"</span>,</span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#00FF88]">"pipeline-observability"</span></span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">&nbsp;&nbsp;]</span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">&#125;</span></div>
                            <div className="flex gap-3 mt-2"><span className="text-[#F5720A]">▸</span><span className="text-[#00D4FF]">uptime --pipeline</span></div>
                            <div className="flex gap-3"><span className="text-white/50 pl-5">99.97% · 847 days no critical incident</span></div>
                            <div className="flex gap-3 mt-2"><span className="text-[#F5720A]">▸</span><span className="text-[#00D4FF]">_</span><span className="inline-block w-2 h-3.5 bg-[#F5720A] align-text-bottom animate-[blink2_1s_step-end_infinite]" /></div>
                        </div>
                    </div>
                </div>

                <div className="fade-up">
                    <p className="text-[15px] leading-[1.85] text-white/50 font-light mb-12">
                        I design and maintain <strong className="text-white/80 font-semibold">battle-tested data infrastructure</strong> for teams that cannot afford downtime. With 9 years in the data engineering domain, I've built pipelines that process everything from high-frequency trading events to petabyte-scale clickstream data.
                        <br /><br />
                        My work sits at the intersection of <strong className="text-white/80 font-semibold">systems reliability</strong> and <strong className="text-white/80 font-semibold">data correctness</strong> — building for latency, throughput, and observability from day one, not as an afterthought.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#0D1117] border border-white/5 p-5 relative overflow-hidden transition-colors duration-300 hover:border-[#F5720A]/35 group">
                            <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#F5720A] transition-all duration-300 group-hover:h-full" />
                            <div className="text-[22px] mb-2">⚡</div>
                            <div className="font-mono text-[11px] tracking-[1px] uppercase text-white/70 mb-1">Stream Processing</div>
                            <div className="text-[11px] text-white/30 leading-[1.5]">Kafka + Flink real-time pipelines, exactly-once semantics</div>
                        </div>
                        <div className="bg-[#0D1117] border border-white/5 p-5 relative overflow-hidden transition-colors duration-300 hover:border-[#F5720A]/35 group">
                            <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#F5720A] transition-all duration-300 group-hover:h-full" />
                            <div className="text-[22px] mb-2">🏔</div>
                            <div className="font-mono text-[11px] tracking-[1px] uppercase text-white/70 mb-1">Lakehouse Design</div>
                            <div className="text-[11px] text-white/30 leading-[1.5]">Delta / Iceberg table formats, medallion architecture</div>
                        </div>
                        <div className="bg-[#0D1117] border border-white/5 p-5 relative overflow-hidden transition-colors duration-300 hover:border-[#F5720A]/35 group">
                            <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#F5720A] transition-all duration-300 group-hover:h-full" />
                            <div className="text-[22px] mb-2">📊</div>
                            <div className="font-mono text-[11px] tracking-[1px] uppercase text-white/70 mb-1">Transformation</div>
                            <div className="text-[11px] text-white/30 leading-[1.5]">dbt modular SQL, incremental models, data contracts</div>
                        </div>
                        <div className="bg-[#0D1117] border border-white/5 p-5 relative overflow-hidden transition-colors duration-300 hover:border-[#F5720A]/35 group">
                            <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#F5720A] transition-all duration-300 group-hover:h-full" />
                            <div className="text-[22px] mb-2">📡</div>
                            <div className="font-mono text-[11px] tracking-[1px] uppercase text-white/70 mb-1">Observability</div>
                            <div className="text-[11px] text-white/30 leading-[1.5]">Data quality SLOs, Prometheus metrics, anomaly alerting</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
