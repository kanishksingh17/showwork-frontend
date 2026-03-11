import React from 'react';

export const Projects: React.FC = () => {
    return (
        <section id="projects" className="py-[120px] px-12 bg-[#080B10] border-t border-white/5 relative">
            <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
                <div>
                    <div className="font-mono text-[10px] tracking-[4px] uppercase text-[#F5720A] mb-4">// 03 — SYSTEMS</div>
                    <h2 className="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[3px] text-white leading-[0.95]">
                        PRODUCTION<br />PIPELINES
                    </h2>
                </div>
                <div className="font-['Bebas_Neue'] text-[120px] text-white/5 tracking-[-4px] leading-none select-none hidden md:block">
                    03
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Featured project */}
                <div className="bg-[#111620] border border-white/5 relative cursor-none transition-all duration-400 group hover:border-[#F5720A]/35 hover:-translate-y-1 hover:shadow-[0_4px_32px_rgba(0,0,0,0.6),0_0_40px_rgba(245,114,10,0.1)] md:col-span-2 fade-up">
                    <div className="h-[200px] md:h-[260px] relative overflow-hidden bg-[#0D1117] flex items-center justify-center">
                        <svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                            <rect width="600" height="260" fill="#0D1117" />
                            <defs>
                                <pattern id="g1" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(245,114,10,0.08)" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="600" height="260" fill="url(#g1)" />
                            {/* Throughput bars */}
                            <rect x="40" y="180" width="20" height="60" fill="rgba(245,114,10,0.3)" rx="2" />
                            <rect x="70" y="120" width="20" height="120" fill="rgba(245,114,10,0.5)" rx="2" />
                            <rect x="100" y="90" width="20" height="150" fill="rgba(245,114,10,0.7)" rx="2" />
                            <rect x="130" y="60" width="20" height="180" fill="#F5720A" rx="2" />
                            <rect x="160" y="75" width="20" height="165" fill="rgba(245,114,10,0.7)" rx="2" />
                            <rect x="190" y="55" width="20" height="185" fill="#F5720A" rx="2" />
                            <rect x="220" y="40" width="20" height="200" fill="rgba(245,114,10,0.9)" rx="2" />
                            {/* Latency line */}
                            <polyline points="40,200 70,150 100,120 130,95 160,110 190,85 220,70 260,80 300,60 340,90 380,75 420,65 460,80 500,58 540,65"
                                fill="none" stroke="#00D4FF" strokeWidth="2" />
                            <circle cx="540" cy="65" r="5" fill="#00D4FF" />
                            {/* Labels */}
                            <text x="40" y="30" fontFamily="DM Mono" fontSize="10" fill="rgba(245,114,10,0.8)" letterSpacing="2">THROUGHPUT · EVENTS/SEC</text>
                            <text x="400" y="30" fontFamily="DM Mono" fontSize="10" fill="#00D4FF" letterSpacing="2">── P99 LATENCY</text>
                        </svg>
                    </div>
                    <div className="p-7">
                        <div className="font-mono text-[9px] tracking-[3px] uppercase text-[#F5720A] mb-3">// STREAM PROCESSING · FINTECH</div>
                        <div className="font-['Manrope'] text-[18px] font-bold text-white mb-3 tracking-[-0.3px]">Real-Time Trading Event Pipeline</div>
                        <div className="text-[13px] text-white/40 leading-[1.7] mb-5">End-to-end Kafka → Flink → Delta Lake pipeline processing 2.4M trading events per second with sub-10ms P99 latency. Replaced a batch system with 4-hour lag.</div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Apache Flink</span>
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Kafka</span>
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Delta Lake</span>
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Kubernetes</span>
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Scala</span>
                        </div>
                        <a href="#" className="font-mono text-[11px] tracking-[2px] uppercase text-[#F5720A] no-underline inline-flex items-center gap-2 transition-[gap] duration-200 hover:gap-3.5">CASE STUDY →</a>
                    </div>
                </div>

                {/* Project 2 */}
                <div className="bg-[#111620] border border-white/5 relative cursor-none transition-all duration-400 group hover:border-[#F5720A]/35 hover:-translate-y-1 hover:shadow-[0_4px_32px_rgba(0,0,0,0.6),0_0_40px_rgba(245,114,10,0.1)] fade-up">
                    <div className="h-[200px] relative overflow-hidden bg-[#0D1117] flex items-center justify-center">
                        <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                            <rect width="300" height="200" fill="#0D1117" />
                            <defs>
                                <pattern id="g2" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="300" height="200" fill="url(#g2)" />
                            <circle cx="150" cy="40" r="14" fill="rgba(0,212,255,0.2)" stroke="#00D4FF" strokeWidth="1" />
                            <text x="150" y="44" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill="#00D4FF">RAW</text>
                            <circle cx="80" cy="110" r="12" fill="rgba(245,114,10,0.2)" stroke="#F5720A" strokeWidth="1" />
                            <text x="80" y="114" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill="#F5720A">STAGE</text>
                            <circle cx="220" cy="110" r="12" fill="rgba(245,114,10,0.2)" stroke="#F5720A" strokeWidth="1" />
                            <text x="220" y="114" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill="#F5720A">ENRICH</text>
                            <circle cx="150" cy="175" r="14" fill="rgba(0,255,136,0.2)" stroke="#00FF88" strokeWidth="1" />
                            <text x="150" y="179" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill="#00FF88">GOLD</text>
                            <line x1="144" y1="54" x2="90" y2="98" stroke="rgba(245,114,10,0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
                            <line x1="156" y1="54" x2="210" y2="98" stroke="rgba(245,114,10,0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
                            <line x1="90" y1="122" x2="140" y2="161" stroke="rgba(0,255,136,0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
                            <line x1="210" y1="122" x2="160" y2="161" stroke="rgba(0,255,136,0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
                        </svg>
                    </div>
                    <div className="p-7">
                        <div className="font-mono text-[9px] tracking-[3px] uppercase text-[#F5720A] mb-3">// ELT · LAKEHOUSE</div>
                        <div className="font-['Manrope'] text-[18px] font-bold text-white mb-3 tracking-[-0.3px]">Petabyte-Scale Lakehouse Migration</div>
                        <div className="text-[13px] text-white/40 leading-[1.7] mb-5">Migrated 8PB from legacy Hadoop to Delta Lake medallion architecture. 60% cost reduction, 10× query performance improvement.</div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Delta Lake</span>
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">dbt</span>
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Databricks</span>
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Airflow</span>
                        </div>
                        <a href="#" className="font-mono text-[11px] tracking-[2px] uppercase text-[#F5720A] no-underline inline-flex items-center gap-2 transition-[gap] duration-200 hover:gap-3.5">VIEW PROJECT →</a>
                    </div>
                </div>

                {/* Project 3 */}
                <div className="bg-[#111620] border border-white/5 relative cursor-none transition-all duration-400 group hover:border-[#F5720A]/35 hover:-translate-y-1 hover:shadow-[0_4px_32px_rgba(0,0,0,0.6),0_0_40px_rgba(245,114,10,0.1)] fade-up md:col-start-3 md:-mt-[135px]">
                    <div className="h-[200px] relative overflow-hidden bg-[#0D1117] flex items-center justify-center">
                        <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                            <rect width="300" height="200" fill="#0D1117" />
                            {/* Uptime gauge style */}
                            <circle cx="150" cy="120" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                            <circle cx="150" cy="120" r="70" fill="none" stroke="#00FF88" strokeWidth="12"
                                strokeDasharray="390" strokeDashoffset="10" strokeLinecap="round"
                                transform="rotate(-210 150 120)" />
                            <text x="150" y="105" textAnchor="middle" fontFamily="Bebas Neue" fontSize="32" fill="white" letterSpacing="1">99.97</text>
                            <text x="150" y="128" textAnchor="middle" fontFamily="DM Mono" fontSize="11" fill="rgba(0,255,136,0.8)">% UPTIME</text>
                            <text x="150" y="148" textAnchor="middle" fontFamily="DM Mono" fontSize="9" fill="rgba(255,255,255,0.3)">847 DAYS STABLE</text>
                            <text x="150" y="25" textAnchor="middle" fontFamily="DM Mono" fontSize="10" fill="rgba(255,255,255,0.4)" letterSpacing="2">RELIABILITY SLO</text>
                        </svg>
                    </div>
                    <div className="p-7">
                        <div className="font-mono text-[9px] tracking-[3px] uppercase text-[#F5720A] mb-3">// OBSERVABILITY · SRE</div>
                        <div className="font-['Manrope'] text-[18px] font-bold text-white mb-3 tracking-[-0.3px]">Pipeline Observability Platform</div>
                        <div className="text-[13px] text-white/40 leading-[1.7] mb-5">Custom observability layer with data quality SLOs, anomaly detection, and automated remediation. 847 days without a critical data incident.</div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Prometheus</span>
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Grafana</span>
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Great Expectations</span>
                            <span className="font-mono text-[10px] tracking-[1px] py-1 px-2.5 bg-white/5 border border-white/5 text-white/40">Python</span>
                        </div>
                        <a href="#" className="font-mono text-[11px] tracking-[2px] uppercase text-[#F5720A] no-underline inline-flex items-center gap-2 transition-[gap] duration-200 hover:gap-3.5">VIEW PROJECT →</a>
                    </div>
                </div>

            </div>
        </section>
    );
};
