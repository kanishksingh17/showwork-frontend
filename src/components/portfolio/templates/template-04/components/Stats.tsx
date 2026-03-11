import React from 'react';
import { TrendingUp } from 'lucide-react';

export const Stats: React.FC = () => {
    return (
        <div className="relative h-[480px] w-full hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000">
            {/* Visual Panel 1 (Main Architecture) */}
            <div className="absolute top-0 right-0 w-[450px] h-[380px] bg-[#1E293B] rounded-[2.5rem] shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-700 z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />

                {/* Internal UI Design */}
                <div className="relative p-8 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <div className="w-2 h-2 rounded-full bg-yellow-400" />
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                        <div className="text-[10px] font-mono text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded">
                            SYSTEM_ACTIVE :: 12ms
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="h-0.5 w-3/4 bg-blue-400/20 rounded" />
                        <div className="h-0.5 w-1/2 bg-blue-400/20 rounded" />

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="glass-panel p-4 rounded-xl border-blue-500/20 bg-blue-500/5">
                                <div className="text-[10px] text-gray-900/60 dark:text-gray-400 mb-1 font-bold font-display uppercase tracking-widest">TRAFFIC</div>
                                <div className="text-xl font-bold font-mono text-white">15.4 GB</div>
                            </div>
                            <div className="glass-panel p-4 rounded-xl border-purple-500/20 bg-purple-500/5">
                                <div className="text-[10px] text-gray-900/60 dark:text-gray-400 mb-1 font-bold font-display uppercase tracking-widest">HEALTH</div>
                                <div className="text-xl font-bold font-mono text-green-400">99.8%</div>
                            </div>
                        </div>

                        {/* Animated Code snippet */}
                        <div className="mt-6 relative h-28 bg-black/40 rounded-xl p-4 font-mono text-[10px] text-blue-300/80 overflow-hidden">
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
                                {`cluster.nodes().map(node => {
    return engine.deploy({
        service: "api-gateway",
        replicas: 12,
        region: "us-east-1"
    });
});`}
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#1E293B] to-transparent" />
                        </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between text-[10px] font-bold tracking-widest text-gray-900/50 dark:text-gray-500 uppercase font-display">
                        <span>Architecture Matrix</span>
                        <div className="flex items-center gap-2 text-green-400">
                            <div className="w-1 h-1 rounded-full bg-green-400 animate-ping" />
                            SECURE
                        </div>
                    </div>
                </div>
            </div>

            {/* Integration Panel */}
            <div className="absolute top-20 left-0 glass-panel bg-white/20 dark:bg-slate-800/40 p-6 rounded-[2rem] w-72 transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 z-20">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white font-display">Integration</h3>
                <p className="text-xs text-gray-900/80 dark:text-gray-300 mb-4 leading-relaxed font-sans font-medium">
                    Seamlessly connecting PostgreSQL, Redis, and message queues with minimal latency.
                </p>
                <div className="flex -space-x-2 overflow-hidden py-2">
                    {[
                        "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
                        "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg",
                        "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
                        "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                    ].map((src, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-full bg-white p-2 flex items-center justify-center shadow-sm border border-gray-100 ring-2 ring-white dark:ring-slate-800">
                            <img alt="Tech logo" className="w-full h-full object-contain" src={src} />
                        </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-[#D9FF3F] flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-slate-800">
                        <span className="font-bold text-xs text-black">+8</span>
                    </div>
                </div>
            </div>

            {/* Uptime Panel */}
            <div className="absolute bottom-20 right-8 glass-panel bg-white/60 dark:bg-slate-800/60 p-6 rounded-[2rem] w-72 shadow-xl z-30 backdrop-blur-xl">
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white font-display">System Uptime</h3>
                <p className="text-xs text-gray-900/60 dark:text-gray-400 mb-6 font-bold font-sans uppercase tracking-tight">Real-time availability monitoring</p>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">99.9%</span>
                    <span className="text-green-600 dark:text-green-400 text-sm font-semibold flex items-center">
                        <TrendingUp size={14} className="mr-1" /> 0.4%
                    </span>
                </div>
                <div className="flex items-end justify-between h-16 gap-2">
                    {[40, 70, 50, 90, 60, 80, 45].map((height, i) => (
                        <div
                            key={i}
                            className={`w-full bg-blue-500 rounded-t-sm transition-all duration-1000 delay-${i * 100}`}
                            style={{ height: `${height}%`, opacity: height < 90 ? 0.8 : 1 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
