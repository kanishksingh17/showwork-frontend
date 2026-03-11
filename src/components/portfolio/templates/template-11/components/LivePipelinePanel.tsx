import React from 'react';

export const LivePipelinePanel: React.FC = () => {
    return (
        <div className="md:col-span-3 dashboard-panel">
            <div className="panel-header">
                <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Live Pipeline</span>
                <span className="material-symbols-outlined text-xs text-[--datacmd-primary]">analytics</span>
            </div>
            <div className="p-3 font-mono text-[10px] leading-tight space-y-1 text-gray-400">
                <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>[STREAM]</span>
                    <span className="text-emerald-400">SUCCESS</span>
                </div>
                <div className="pt-1">FETCHING data.events_v2...</div>
                <div className="text-gray-600">Transforming schema...</div>
                <div className="text-[--datacmd-primary]">Loading to Snowflake...</div>
                <div className="flex justify-between pt-2">
                    <span>LATENCY</span>
                    <span>42ms</span>
                </div>
            </div>
        </div>
    );
};
