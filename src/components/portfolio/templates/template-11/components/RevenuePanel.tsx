import React from 'react';

export const RevenuePanel: React.FC = () => {
    return (
        <div className="md:col-span-4 lg:col-span-3 dashboard-panel bento-fade-in delay-500">
            <div className="panel-header">
                <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Revenue Optimization</span>
                <span className="text-[--datacmd-accent-cyan] text-[10px] font-mono">+12.4%</span>
            </div>

            <div className="p-4 h-full flex flex-col">
                <div className="flex items-end justify-between h-24 gap-1">
                    <div className="w-full bg-[--datacmd-accent-cyan] opacity-10 h-1/4 rounded-t-sm"></div>
                    <div className="w-full bg-[--datacmd-accent-cyan] opacity-20 h-2/4 rounded-t-sm"></div>
                    <div className="w-full bg-[--datacmd-accent-cyan] opacity-30 h-1/3 rounded-t-sm"></div>
                    <div className="w-full bg-[--datacmd-accent-cyan] opacity-50 h-3/4 rounded-t-sm"></div>
                    <div className="w-full bg-[--datacmd-accent-cyan] opacity-70 h-2/3 rounded-t-sm"></div>
                    <div className="w-full bg-[--datacmd-accent-cyan] h-full rounded-t-sm shadow-[0_0_10px_#06B6D4]"></div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="bg-white/5 p-2 rounded border border-white/5">
                        <div className="text-[9px] text-gray-500 font-mono">CAC</div>
                        <div className="text-xs text-white">$42.10</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded border border-white/5">
                        <div className="text-[9px] text-gray-500 font-mono">LTV</div>
                        <div className="text-xs text-white">$890.0</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
