import React from 'react';

export const FooterMarquee: React.FC = () => {
    return (
        <div className="w-full bg-[--datacmd-surface-dark] border-t border-[--datacmd-border-muted] py-2.5 overflow-hidden">
            <div className="whitespace-nowrap flex animate-marquee">
                <div className="flex items-center font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.3em] uppercase">
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>99.9% Data Accuracy</span>
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>$2M Revenue Optimized</span>
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>15+ KPI Dashboards</span>
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>SQL Expert</span>
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Python Analytics</span>
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>dbt Modeling</span>
                </div>
                <div className="flex items-center font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.3em] uppercase">
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>99.9% Data Accuracy</span>
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>$2M Revenue Optimized</span>
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>15+ KPI Dashboards</span>
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>SQL Expert</span>
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Python Analytics</span>
                    <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>dbt Modeling</span>
                </div>
            </div>
        </div>
    );
};
