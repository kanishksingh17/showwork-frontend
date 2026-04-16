import React from 'react';

export const Architecture: React.FC<{ sections?: any[] }> = ({ sections }) => {
    const section = sections?.find(s => s.variant === 'ArchitecturePipeline' || s.id === 'resume');
    const data = section?.customData || {};

    // Default layers if not in customData
    const defaultLayers = [
        { label: 'INGEST', items: 'Kafka Topics, Debezium CDC, Kinesis Streams, REST Webhooks, S3 File Drop' },
        { label: 'PROCESS', items: 'Spark Streaming, Flink Jobs, Schema Registry, Data Contracts, Quality Gates' },
        { label: 'STORE', items: 'Delta Lake, Silver Layer, Gold Layer, Snowflake DW, PostgreSQL' },
        { label: 'SERVE', items: 'Looker / Grafana, ML Feature Store, Data APIs, Prometheus, PagerDuty Alerts' }
    ];

    const layers = data.layers || defaultLayers;

    return (
        <section id="architecture" className="py-[120px] px-12 bg-[#050608] overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
                <div>
                    <div className="font-mono text-[10px] tracking-[4px] uppercase text-[#F5720A] mb-4">
                        {data.eyebrow || "// 02 — STACK"}
                    </div>
                    <h2 className="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[3px] text-white leading-[0.95]">
                        {data.titleLine1 || "PIPELINE"}<br />{data.titleLine2 || "ARCHITECTURE"}
                    </h2>
                </div>
                <div className="font-['Bebas_Neue'] text-[120px] text-white/5 tracking-[-4px] leading-none select-none hidden md:block">
                    02
                </div>
            </div>

            <div className="bg-[#0D1117] border border-white/5 rounded-sm p-6 md:p-12 mt-10 relative overflow-hidden fade-up before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-[#F5720A] before:via-[#00D4FF] before:to-[#00FF88]">
                <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-0 w-full">
                    {layers.map((layer: any, idx: number) => (
                        <div 
                            key={idx} 
                            className={`flex-1 flex flex-col gap-3 px-4 relative ${
                                idx > 0 ? "before:content-['↓'] md:before:content-['→'] before:absolute before:-top-[20px] before:left-1/2 before:-translate-x-1/2 md:before:-translate-x-0 md:before:-left-[14px] md:before:top-1/2 md:before:-translate-y-1/2 before:text-[#F5720A] before:text-[20px] before:font-mono" : ""
                            }`}
                        >
                            <div className="font-mono text-[10px] tracking-[3px] uppercase text-[#F5720A] mb-2 pb-2 border-b border-[#F5720A]/35">
                                {layer.label}
                            </div>
                            {(typeof layer.items === 'string' ? layer.items.split(',').map(s => s.trim()) : layer.items).map((item: string, i: number) => (
                                <div key={i} className="bg-[#111620] border border-white/5 p-3 flex items-center gap-2.5 font-mono text-[11px] text-white/50 cursor-default transition-all duration-200 hover:border-[#F5720A]/35 hover:text-white hover:bg-[#161D2A] relative">
                                    <span className="text-[14px]">{i === 0 ? '⚡' : '🔄'}</span> {item}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
