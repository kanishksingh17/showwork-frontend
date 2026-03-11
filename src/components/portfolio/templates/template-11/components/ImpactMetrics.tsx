import React from 'react';

export const ImpactMetrics: React.FC = () => {
    return (
        <div className="md:col-span-12 lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 bento-fade-in delay-200">
            <div className="dashboard-panel p-4 flex items-center space-x-4">
                <div className="bg-[--datacmd-primary] bg-opacity-20 p-2 rounded">
                    <span className="material-symbols-outlined text-[--datacmd-primary]">database</span>
                </div>
                <div>
                    <div className="text-xs text-gray-500 font-mono">STACK</div>
                    <div className="text-sm font-bold text-white">dbt + Snowflake + Airflow</div>
                </div>
            </div>

            <div className="dashboard-panel p-4 flex items-center space-x-4">
                <div className="bg-[--datacmd-secondary] bg-opacity-20 p-2 rounded">
                    <span className="material-symbols-outlined text-[--datacmd-secondary]">monitoring</span>
                </div>
                <div>
                    <div className="text-xs text-gray-500 font-mono">KPIs TRACKED</div>
                    <div className="text-sm font-bold text-white">250+ Metrics Built</div>
                </div>
            </div>

            <div className="dashboard-panel p-4 flex items-center space-x-4">
                <div className="bg-[--datacmd-accent-cyan] bg-opacity-20 p-2 rounded">
                    <span className="material-symbols-outlined text-[--datacmd-accent-cyan]">payments</span>
                </div>
                <div>
                    <div className="text-xs text-gray-500 font-mono">IMPACT</div>
                    <div className="text-sm font-bold text-white">$2.5M Identified Rev</div>
                </div>
            </div>

            <div className="dashboard-panel p-4 flex items-center space-x-4">
                <div className="bg-purple-500 bg-opacity-20 p-2 rounded">
                    <span className="material-symbols-outlined text-purple-400">precision_manufacturing</span>
                </div>
                <div>
                    <div className="text-xs text-gray-500 font-mono">AUTOMATION</div>
                    <div className="text-sm font-bold text-white">85% Workload Reduction</div>
                </div>
            </div>
        </div>
    );
};
