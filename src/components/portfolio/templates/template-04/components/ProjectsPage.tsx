import React from 'react';
import { ExternalLink, Github, TrendingUp, CheckCircle } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    description: string;
    category: string;
    categoryColor: string;
    hoverBorder: string;
    hoverText: string;
    isLarge?: boolean;
    footer?: React.ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, category, categoryColor, hoverBorder, hoverText, isLarge, footer }) => {
    return (
        <div className={`glass-card rounded-[24px] p-8 flex flex-col justify-between group transition-all duration-500 overflow-hidden relative shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] ${hoverBorder} ${isLarge ? 'md:col-span-2' : ''}`}>
            <div className="relative z-10">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/10 shadow-[0_0_10px_rgba(217,255,63,0.1)] ${categoryColor}`}>
                    {category}
                </span>
                <h3 className={`${isLarge ? 'text-3xl' : 'text-2xl'} font-bold mb-3 text-white transition-colors ${hoverText}`}>{title}</h3>
                <p className="text-gray-400 line-clamp-2 text-sm leading-relaxed">{description}</p>
            </div>

            {footer && (
                <div className="mt-8 border-t border-white/10 pt-6 relative z-10">
                    {footer}
                </div>
            )}

            {/* Hover Actions */}
            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0 z-20">
                <a href="#" className="p-2 bg-white/5 hover:bg-[#D9FF3F] hover:text-black rounded-lg border border-white/10 transition-all">
                    <Github size={16} />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-[#D9FF3F] hover:text-black rounded-lg border border-white/10 transition-all">
                    <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );
};

export const ProjectsPage: React.FC<{ projects?: any[], onBack: () => void }> = ({ onBack }) => {
    return (
        <section className="relative py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <button
                onClick={onBack}
                className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Back to Dashboard
            </button>
            {/* Isolated Project Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Fixed Mesh Blobs */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#D9FF3F]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

                {/* Complex Gradient Mesh Overlay */}
                <div className="absolute inset-0 opacity-80"
                    style={{
                        background: `
                            radial-gradient(at 0% 0%, rgba(217, 255, 63, 0.15) 0px, transparent 50%),
                            radial-gradient(at 10% 20%, rgba(59, 130, 246, 0.2) 0px, transparent 50%),
                            radial-gradient(at 90% 10%, rgba(147, 51, 234, 0.2) 0px, transparent 50%),
                            radial-gradient(at 80% 100%, rgba(217, 255, 63, 0.1) 0px, transparent 50%),
                            radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.2) 0px, transparent 50%)
                        `,
                        filter: 'blur(60px)'
                    }}
                />

                {/* Technical Grid Overlay */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundSize: '50px 50px',
                        backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-16 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-[#D9FF3F]/20 blur-[80px] -z-10 rounded-full"></div>
                    <span className="inline-block px-4 py-1 rounded-full text-[10px] font-bold bg-[#D9FF3F]/10 border border-[#D9FF3F]/30 text-[#D9FF3F] uppercase tracking-widest mb-4 shadow-[0_0_10px_rgba(217,255,63,0.1)]">
                        Projects
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-white font-display">
                        Systems Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9FF3F] via-emerald-400 to-blue-500">Scale</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
                    {/* Large Project Card */}
                    <ProjectCard
                        isLarge
                        category="API Platform"
                        categoryColor="bg-[#D9FF3F]/10 text-[#D9FF3F]"
                        hoverBorder="hover:border-[#D9FF3F]/30"
                        hoverText="group-hover:text-[#D9FF3F]"
                        title="ShowWork Engine"
                        description="High-performance processing engine for distributed edge networks. Optimized for extreme low-latency telemetry."
                        footer={
                            <div className="flex items-center justify-between">
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Endpoints</p>
                                        <p className="text-lg font-bold text-[#D9FF3F] drop-shadow-[0_0_8px_rgba(217,255,63,0.3)]">42 Endpoints</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Latency</p>
                                        <p className="text-lg font-bold text-white">180ms</p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-mono text-[#D9FF3F] bg-[#D9FF3F]/5 px-3 py-1.5 rounded-lg border border-[#D9FF3F]/20">
                                    Go + Supabase
                                </div>
                            </div>
                        }
                    />

                    {/* Infrastructure Card */}
                    <ProjectCard
                        category="Infrastructure"
                        categoryColor="bg-blue-500/10 text-blue-400"
                        hoverBorder="hover:border-blue-400/30"
                        hoverText="group-hover:text-blue-400"
                        title="Resume Optimization API"
                        description="Automated LLM-driven infrastructure for parsing and scoring enterprise talent data."
                        footer={
                            <div className="flex justify-between items-center text-sm font-bold text-blue-200">
                                <span>28% Faster</span>
                                <TrendingUp size={18} className="text-blue-400" />
                            </div>
                        }
                    />

                    {/* Security Card */}
                    <ProjectCard
                        category="Security"
                        categoryColor="bg-purple-500/10 text-purple-400"
                        hoverBorder="hover:border-purple-400/30"
                        hoverText="group-hover:text-purple-400"
                        title="VaultSync Pro"
                        description="Zero-trust secret management for multi-cloud deployments. Encrypted at rest and transit."
                        footer={
                            <div className="flex items-center justify-between">
                                <div className="text-[10px] font-mono text-gray-400">Rust + AWS</div>
                                <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-3/4 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                </div>
                            </div>
                        }
                    />

                    {/* Analytics Card */}
                    <ProjectCard
                        category="Analytics"
                        categoryColor="bg-emerald-500/10 text-emerald-400"
                        hoverBorder="hover:border-emerald-400/30"
                        hoverText="group-hover:text-emerald-400"
                        title="Metrics Stream"
                        description="Real-time visualization pipeline for million-scale event streams across 4 global regions."
                        footer={
                            <div className="flex gap-1 h-8 items-end">
                                <div className="w-full bg-emerald-500/20 rounded-t h-[40%]"></div>
                                <div className="w-full bg-emerald-500/40 rounded-t h-[70%]"></div>
                                <div className="w-full bg-emerald-500/60 rounded-t h-[50%]"></div>
                                <div className="w-full bg-[#D9FF3F] rounded-t h-[90%] shadow-[0_0_10px_rgba(217,255,63,0.3)]"></div>
                                <div className="w-full bg-emerald-500/30 rounded-t h-[30%]"></div>
                            </div>
                        }
                    />

                    {/* DevOps Card */}
                    <ProjectCard
                        category="DevOps"
                        categoryColor="bg-[#D9FF3F]/10 text-[#D9FF3F]"
                        hoverBorder="hover:border-[#D9FF3F]/30"
                        hoverText="group-hover:text-[#D9FF3F]"
                        title="Terraform Autopilot"
                        description="Automated infrastructure provisioning with built-in cost controls and policy enforcement."
                        footer={
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-[#D9FF3F]">Apply: Success</span>
                                <CheckCircle size={16} className="text-[#D9FF3F]" />
                            </div>
                        }
                    />
                </div>

                {/* Architecture Patterns Footer */}
                <div className="mt-24 pt-12 border-t border-white/5 text-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-10">Trusted Architecture Patterns</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale-0 hover:opacity-80 transition-opacity">
                        <div className="font-bold text-lg tracking-tighter text-blue-300">POSTGRESQL</div>
                        <div className="font-bold text-lg tracking-tighter text-red-400">REDIS</div>
                        <div className="font-bold text-lg tracking-tighter text-blue-500">KUBERNETES</div>
                        <div className="font-bold text-lg tracking-tighter text-blue-400">DOCKER</div>
                        <div className="font-bold text-lg tracking-tighter text-cyan-400">GOLANG</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
