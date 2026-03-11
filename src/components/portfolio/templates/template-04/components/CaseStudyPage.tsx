import React from 'react';
import {
    AlertCircle,
    CheckCircle2,
    Network,
    Cpu,
    Database,
    Settings,
    TrendingDown,
    DollarSign,
    ArrowRight,
    ArrowLeft,
    Box,
    Cloud,
    Activity
} from 'lucide-react';

interface CaseStudyPageProps {
    onBack: () => void;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ onBack }) => {
    return (
        <section className="relative py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <button
                onClick={onBack}
                className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all group"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[160px] opacity-10" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[160px] opacity-5" />
                <div className="absolute inset-0 grid-bg opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-4">
                <header className="mb-12 pt-16">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#D9FF3F]/10 border border-[#D9FF3F]/20 text-[#D9FF3F] uppercase tracking-widest">Case Study</span>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-mono text-gray-400">Status: Deployed & Stable</span>
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl font-display">
                        ShowWork Engine: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9FF3F] to-emerald-400">Scaling AI Infrastructure</span>
                    </h1>
                    <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium">
                            <Box size={18} className="text-cyan-400" /> Go
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium">
                            <Database size={18} className="text-emerald-400" /> Supabase
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D9FF3F]/10 border border-[#D9FF3F]/20 text-sm font-bold text-[#D9FF3F]">
                            <Activity size={18} /> 99.9% Uptime
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-6">
                    {/* The Challenge */}
                    <div className="col-span-12 lg:col-span-5 glass-card rounded-3xl p-8 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6">
                                <AlertCircle size={24} />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 text-white font-display">The Challenge</h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed text-lg font-sans">
                                <p>The legacy ShowWork infrastructure struggled with unpredictable AI inference spikes, leading to frequent service timeouts and high operational costs.</p>
                                <p>We needed a robust, event-driven architecture that could scale workers horizontally while maintaining a strict 99.9% uptime for enterprise clients.</p>
                                <ul className="space-y-3 pt-4">
                                    {[
                                        "Reduce API response latency under 200ms",
                                        "Orchestrate 10k+ concurrent worker nodes",
                                        "Seamless Supabase real-time sync integration"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className="text-[#D9FF3F] mt-1" />
                                            <span className="text-white/90">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {['JD', 'SK', 'ML'].map((initials, i) => (
                                        <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0B0C15] flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-purple-500' : 'bg-orange-500'
                                            }`}>{initials}</div>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500 font-medium italic font-sans">"A massive undertaking in distributed systems."</span>
                            </div>
                        </div>
                    </div>

                    {/* Architecture Visualization */}
                    <div className="col-span-12 lg:col-span-7 glass-card rounded-3xl p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-white font-display">
                                <Network className="text-[#D9FF3F]" size={20} />
                                System Architecture
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-gray-500 tracking-wider">v4.2-PROD</span>
                            </div>
                        </div>

                        <div className="flex-grow flex flex-col items-center justify-center relative py-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-2xl relative">
                                {/* Left Column: Ingress */}
                                <div className="flex flex-col gap-6 items-center">
                                    <div className="architecture-node w-32 p-4 rounded-xl text-center shadow-[0_0_20px_rgba(217,255,63,0.15)] bg-white/5 border-white/10">
                                        <div className="text-[10px] text-[#D9FF3F] font-bold mb-1 uppercase tracking-widest">Ingress</div>
                                        <span className="text-xs font-mono text-white">API Gateway</span>
                                    </div>
                                    <div className="h-12 w-px bg-gradient-to-b from-[#D9FF3F] to-transparent" />
                                    <div className="architecture-node w-32 p-4 rounded-xl text-center bg-white/5 border-white/10">
                                        <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-widest">Auth</div>
                                        <span className="text-xs font-mono text-white">JWT Handler</span>
                                    </div>
                                </div>

                                {/* Middle Column: Core */}
                                <div className="flex flex-col gap-6 items-center relative">
                                    <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border border-[#D9FF3F]/10 rounded-3xl bg-[#D9FF3F]/5 z-0"></div>
                                    <div className="relative z-10 architecture-node w-40 p-6 rounded-2xl text-center border-[#D9FF3F]/30 bg-[#161A23] shadow-2xl">
                                        <Cpu size={32} className="text-[#D9FF3F] mx-auto mb-3" />
                                        <div className="text-xs font-bold text-white uppercase tracking-tighter">ShowWork Engine</div>
                                        <div className="text-[9px] text-emerald-400 font-mono mt-1">Written in Go</div>
                                    </div>
                                    <div className="h-16 flex items-center relative w-full">
                                        <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-white/10"></div>
                                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0B0C15] px-2 text-[8px] text-gray-500 font-mono tracking-widest">GRPC</span>
                                    </div>
                                    <div className="architecture-node w-32 p-4 rounded-xl text-center bg-white/5 border-white/10">
                                        <div className="text-[10px] text-blue-400 font-bold mb-1 uppercase tracking-widest">Data</div>
                                        <span className="text-xs font-mono text-white">Supabase PG</span>
                                    </div>
                                </div>

                                {/* Right Column: Workers */}
                                <div className="flex flex-col gap-4 items-center">
                                    <div className="grid grid-cols-2 gap-2">
                                        {[1, 2, 3, 4].map(w => (
                                            <div key={w} className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center border transition-all ${w === 2 ? 'border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10'
                                                }`}>
                                                <Settings size={14} className={w === 2 ? 'text-emerald-400 animate-spin-slow' : 'text-gray-500'} />
                                                <span className={`text-[8px] mt-2 font-mono ${w === 2 ? 'text-emerald-400' : 'text-gray-500'}`}>W_0{w}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-[10px] text-gray-500 mt-2 font-mono uppercase tracking-widest font-bold">Worker Pool</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="flex gap-8">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Requests/Sec</span>
                                    <span className="text-sm font-mono text-[#D9FF3F]">2,481</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Nodes</span>
                                    <span className="text-sm font-mono text-[#D9FF3F]">42</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-[#D9FF3F]"></div>
                                </div>
                                <span className="text-[10px] text-gray-500 font-mono font-bold tracking-tighter">Load: 72%</span>
                            </div>
                        </div>
                    </div>

                    {/* Key Outcomes */}
                    <div className="col-span-12 lg:col-span-4 glass-card rounded-3xl p-8 border-l-4 border-l-[#D9FF3F]">
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-white font-display">
                            <Activity className="text-[#D9FF3F]" size={20} />
                            Key Outcomes
                        </h3>
                        <div className="space-y-8">
                            <div className="group">
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-bold text-[#D9FF3F]">28%</span>
                                    <TrendingDown size={24} className="text-emerald-400 mb-1" />
                                </div>
                                <p className="text-sm text-gray-400">Latency Reduction</p>
                                <p className="text-[11px] text-gray-600 mt-1 font-medium">Baseline: 280ms → Post-launch: 201ms</p>
                            </div>
                            <div className="group">
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-bold text-white">1M+</span>
                                    <span className="text-[10px] font-bold text-blue-400 mb-2 px-2 py-0.5 rounded bg-blue-400/10 uppercase tracking-widest">Peak</span>
                                </div>
                                <p className="text-sm text-gray-400">Requests Handled</p>
                                <p className="text-[11px] text-gray-600 mt-1 font-medium">Stress tested during Q4 high-load period</p>
                            </div>
                            <div className="group">
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-bold text-white">40%</span>
                                    <DollarSign size={20} className="text-[#D9FF3F] mb-1.5" />
                                </div>
                                <p className="text-sm text-gray-900/70 dark:text-gray-400 font-sans">Cost Efficiency</p>
                                <p className="text-[11px] text-gray-900/50 dark:text-gray-600 mt-1 font-medium font-sans">Saved via intelligent Go routine orchestration</p>
                            </div>
                        </div>
                    </div>

                    {/* Built With */}
                    <div className="col-span-12 lg:col-span-4 glass-card rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-6 text-white font-display">Built With</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Runtime", value: "Go 1.21", icon: <Cpu size={14} /> },
                                { label: "Database", value: "Postgres", icon: <Database size={14} /> },
                                { label: "Realtime", value: "Supabase", icon: <Activity size={14} /> },
                                { label: "Compute", value: "Lambda", icon: <Cloud size={14} /> },
                            ].map((tech, i) => (
                                <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="text-[#D9FF3F] mb-2 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                                        {tech.icon}
                                        {tech.label}
                                    </div>
                                    <div className="text-lg font-bold text-white">{tech.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="col-span-12 lg:col-span-4 bg-[#D9FF3F] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-black/10 rounded-full blur-3xl group-hover:bg-black/20 transition-all pointer-events-none"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-black mb-4 font-display leading-tight">Interested in the details?</h3>
                            <p className="text-black/70 mb-8 font-medium">I've written a detailed technical whitepaper on this architecture and its Go-based orchestration layer.</p>
                        </div>
                        <div className="relative z-10">
                            <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl">
                                Read Whitepaper
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-24 flex items-center justify-between border-t border-white/5 pt-12">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Previous Case Study</span>
                        <button className="text-xl font-bold text-white hover:text-[#D9FF3F] transition-colors flex items-center gap-2 group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Fintech API Design
                        </button>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Next Case Study</span>
                        <button className="text-xl font-bold text-white hover:text-[#D9FF3F] transition-colors flex items-center gap-2 group">
                            Real-time CRM Engine
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
                .architecture-node {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .architecture-node:hover {
                    box-shadow: 0 0 30px rgba(217, 255, 63, 0.1);
                    transform: translateY(-2px);
                    border-color: rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.05);
                }
                .glow-green {
                    box-shadow: 0 0 20px rgba(217, 255, 63, 0.15);
                }
            `}} />
        </section>
    );
};
