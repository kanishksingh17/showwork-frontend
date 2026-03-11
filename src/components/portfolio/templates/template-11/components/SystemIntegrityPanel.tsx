import React from 'react';

export const SystemIntegrityPanel: React.FC = () => {
    return (
        <div className="md:col-span-3 dashboard-panel">
            <div className="panel-header">
                <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">System Integrity</span>
                <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
            </div>
            <div className="p-4 flex flex-col justify-center h-full">
                <div className="text-3xl font-mono text-white mb-1">99.98%</div>
                <div className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">Data Pipeline Uptime</div>

                <div className="mt-4 flex gap-1 h-8 items-end">
                    <div className="flex-1 bg-green-500/20 h-full"></div>
                    <div className="flex-1 bg-green-500/40 h-3/4"></div>
                    <div className="flex-1 bg-green-500/20 h-full"></div>
                    <div className="flex-1 bg-green-500/60 h-2/3"></div>
                    <div className="flex-1 bg-[--datacmd-primary]/40 h-5/6"></div>
                    <div className="flex-1 bg-green-500/30 h-full"></div>
                </div>
            </div>
        </div>
    );
};
