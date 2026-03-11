import React from 'react';

export const Architecture: React.FC = () => {
    return (
        <section id="architecture" className="py-[120px] px-12 bg-[#050608] overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
                <div>
                    <div className="font-mono text-[10px] tracking-[4px] uppercase text-[#F5720A] mb-4">// 02 — STACK</div>
                    <h2 className="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[3px] text-white leading-[0.95]">
                        PIPELINE<br />ARCHITECTURE
                    </h2>
                </div>
                <div className="font-['Bebas_Neue'] text-[120px] text-white/5 tracking-[-4px] leading-none select-none hidden md:block">
                    02
                </div>
            </div>

            <div className="bg-[#0D1117] border border-white/5 rounded-sm p-6 md:p-12 mt-10 relative overflow-hidden fade-up before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-[#F5720A] before:via-[#00D4FF] before:to-[#00FF88]">
                <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-0 w-full">

                    {/* Ingest Layer */}
                    <div className="flex-1 flex flex-col gap-3 px-4 relative">
                        <div className="font-mono text-[10px] tracking-[3px] uppercase text-[#F5720A] mb-2 pb-2 border-b border-[#F5720A]/35">INGEST</div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">⚡</span> Kafka Topics <span className="ml-auto text-[8px] py-0.5 px-1.5 bg-[rgba(245,114,10,0.15)] border border-[#F5720A]/35 text-[#F5720A] tracking-[1px]">RT</span>
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🔄</span> Debezium CDC
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">📡</span> Kinesis Streams
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🌐</span> REST Webhooks
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">📁</span> S3 File Drop
                        </div>
                    </div>

                    {/* Process Layer */}
                    <div className="flex-1 flex flex-col gap-3 md:px-4 relative before:content-['↓'] md:before:content-['→'] before:absolute before:-top-[20px] before:left-1/2 before:-translate-x-1/2 md:before:-translate-x-0 md:before:-left-[14px] md:before:top-1/2 md:before:-translate-y-1/2 before:text-[#F5720A] before:text-[20px] before:font-mono">
                        <div className="font-mono text-[10px] tracking-[3px] uppercase text-[#F5720A] mb-2 pb-2 border-b border-[#F5720A]/35">PROCESS</div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🔥</span> Spark Streaming <span className="ml-auto text-[8px] py-0.5 px-1.5 bg-[rgba(245,114,10,0.15)] border border-[#F5720A]/35 text-[#F5720A] tracking-[1px]">CORE</span>
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🌊</span> Flink Jobs
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🔀</span> Schema Registry
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">✅</span> Data Contracts
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🔍</span> Quality Gates
                        </div>
                    </div>

                    {/* Store Layer */}
                    <div className="flex-1 flex flex-col gap-3 md:px-4 relative before:content-['↓'] md:before:content-['→'] before:absolute before:-top-[20px] before:left-1/2 before:-translate-x-1/2 md:before:-translate-x-0 md:before:-left-[14px] md:before:top-1/2 md:before:-translate-y-1/2 before:text-[#F5720A] before:text-[20px] before:font-mono">
                        <div className="font-mono text-[10px] tracking-[3px] uppercase text-[#F5720A] mb-2 pb-2 border-b border-[#F5720A]/35">STORE</div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🏔</span> Delta Lake <span className="ml-auto text-[8px] py-0.5 px-1.5 bg-[rgba(245,114,10,0.15)] border border-[#F5720A]/35 text-[#F5720A] tracking-[1px]">RAW</span>
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🥈</span> Silver Layer
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🥇</span> Gold Layer
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">❄</span> Snowflake DW
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🗄</span> PostgreSQL
                        </div>
                    </div>

                    {/* Serve Layer */}
                    <div className="flex-1 flex flex-col gap-3 md:px-4 relative before:content-['↓'] md:before:content-['→'] before:absolute before:-top-[20px] before:left-1/2 before:-translate-x-1/2 md:before:-translate-x-0 md:before:-left-[14px] md:before:top-1/2 md:before:-translate-y-1/2 before:text-[#F5720A] before:text-[20px] before:font-mono">
                        <div className="font-mono text-[10px] tracking-[3px] uppercase text-[#F5720A] mb-2 pb-2 border-b border-[#F5720A]/35">SERVE</div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">📊</span> Looker / Grafana <span className="ml-auto text-[8px] py-0.5 px-1.5 bg-[rgba(245,114,10,0.15)] border border-[#F5720A]/35 text-[#F5720A] tracking-[1px]">BI</span>
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🤖</span> ML Feature Store
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🔌</span> Data APIs
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">📡</span> Prometheus
                        </div>
                        <div className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                            <span className="text-[16px]">🚨</span> PagerDuty Alerts
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
