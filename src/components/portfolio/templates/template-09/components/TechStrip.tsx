import React from 'react';

export const TechStrip: React.FC = () => {
    const techList = [
        "APACHE KAFKA", "APACHE SPARK", "APACHE FLINK", "DBT CORE",
        "AIRFLOW", "DELTA LAKE", "SNOWFLAKE", "DATABRICKS",
        "REDSHIFT", "TERRAFORM", "KUBERNETES", "PROMETHEUS",
        "GRAFANA", "PYTHON", "SCALA"
    ];

    // Double the list for seamless marquee
    const marqueeItems = [...techList, ...techList];

    return (
        <div className="h-12 bg-[#F5720A]/[0.08] border-y border-[#F5720A]/35 flex items-center overflow-hidden relative">
            <div className="flex gap-16 animate-[marqueeScroll_30s_linear_infinite] whitespace-nowrap">
                {marqueeItems.map((tech, index) => (
                    <span key={index} className="font-mono text-[11px] tracking-[3px] uppercase text-white/30 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#F5720A]" />
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
};
