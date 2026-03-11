import React from 'react';
import {
    Briefcase,
    GraduationCap,
    Heart,
    Terminal,
    Globe,
    Code,
    Cpu,
    ArrowLeft,
    Monitor,
    Coffee
} from 'lucide-react';

export const AboutPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const experiences = [
        {
            company: "ShowWork AI",
            role: "Senior Infrastructure Engineer",
            period: "2022 - Present",
            description: "Architecting decentralized worker pools and Go-based orchestration layers. Reduced inference latency by 28% through custom GRPC protocol implementation."
        },
        {
            company: "CloudScale Systems",
            role: "Distributed Systems Engineer",
            period: "2020 - 2022",
            description: "Built multi-region Kubernetes clusters and automated CI/CD pipelines for high-traffic financial APIs."
        },
        {
            company: "NextGen Software",
            role: "Full Stack Developer",
            period: "2018 - 2020",
            description: "Developed reactive dashboard systems using React and Node.js. Optimized Postgres queries for real-time data streaming."
        }
    ];

    return (
        <section className="relative py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <button
                onClick={onBack}
                className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all group font-sans"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[160px] opacity-10" />
                <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[160px] opacity-5" />
                <div className="absolute inset-0 grid-bg opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-4">
                <header className="mb-16 pt-16">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#D9FF3F]/10 border border-[#D9FF3F]/20 text-[#D9FF3F] uppercase tracking-widest font-display">Technical Persona</span>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-mono text-gray-400">Loc: San Francisco, CA</span>
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 font-display">
                        About <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9FF3F] to-emerald-400">The Architect</span>
                    </h1>
                    <p className="text-gray-900/70 dark:text-gray-400 text-lg max-w-2xl font-sans leading-relaxed">
                        I'm a distributed systems engineer obsessed with performance, scalability, and clean abstractions. I believe in building infrastructure that feels invisible.
                    </p>
                </header>

                <div className="grid grid-cols-12 gap-6">
                    {/* Career Timeline */}
                    <div className="col-span-12 lg:col-span-8 glass-card rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-white font-display">
                            <Briefcase className="text-[#D9FF3F]" size={20} />
                            Career Timeline
                        </h3>
                        <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                            {experiences.map((exp, idx) => (
                                <div key={idx} className="relative pl-10 group">
                                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#161A23] border border-white/10 flex items-center justify-center z-10 group-hover:border-[#D9FF3F]/40 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-[#D9FF3F] transition-colors" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                        <h4 className="text-lg font-bold text-white font-display uppercase tracking-widest">{exp.role}</h4>
                                        <span className="text-xs font-mono text-[#D9FF3F] uppercase tracking-widest">{exp.period}</span>
                                    </div>
                                    <div className="text-sm font-bold text-emerald-400 mb-3 font-sans">{exp.company}</div>
                                    <p className="text-gray-900/80 dark:text-gray-400 text-sm leading-relaxed font-sans max-w-2xl">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Behind the Scenes Bento */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-[#D9FF3F] rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative min-h-[240px]">
                            <div className="absolute -right-8 -bottom-8 text-black/5 group-hover:scale-110 transition-transform duration-700">
                                <Monitor size={160} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-black font-display mb-4">The Setup</h3>
                                <p className="text-black/70 text-sm font-medium font-sans mb-4">
                                    4k OLED, M3 Max, and a very precise mechanical keyboard.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 relative z-10">
                                <span className="px-3 py-1 bg-black/10 border border-black/10 rounded-full text-[10px] font-bold text-black uppercase tracking-widest">Dark Mode Only</span>
                            </div>
                        </div>

                        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 className="text-xl font-bold text-white font-display mb-6">Technical Philosophy</h3>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Stateless by Default", icon: <Terminal size={14} /> },
                                        { title: "Observability First", icon: <Cpu size={14} /> },
                                        { title: "Zero Trust Network", icon: <Globe size={14} /> },
                                        { title: "Aggressive Optimization", icon: <Coffee size={14} /> }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm text-gray-900/80 dark:text-gray-400 font-sans hover:text-[#D9FF3F] transition-colors cursor-default group">
                                            <span className="text-[#D9FF3F] opacity-50 group-hover:opacity-100">{item.icon}</span>
                                            {item.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="text-[10px] text-gray-900/50 dark:text-gray-500 font-bold uppercase tracking-widest">Open Source Contributor</div>
                                <div className="flex -space-x-1.5">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-[#161A23] border border-[#0B0C15] flex items-center justify-center overflow-hidden">
                                            <div className={`w-full h-full ${i === 1 ? 'bg-indigo-500' : i === 2 ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Education & Core Values */}
                    <div className="col-span-12 lg:col-span-4 glass-card rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white font-display">
                            <GraduationCap className="text-[#D9FF3F]" size={20} />
                            Foundation
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <div className="text-sm font-bold text-white font-display">M.S. Computer Science</div>
                                <div className="text-xs text-gray-900/60 dark:text-gray-500 font-mono mb-2 uppercase tracking-tight">Stanford University / 2018</div>
                                <p className="text-xs text-gray-900/80 dark:text-gray-400 font-sans">Specialized in Distributed Systems and Information Security.</p>
                            </div>
                            <div className="pt-6 border-t border-white/5">
                                <div className="text-sm font-bold text-white font-display">B.S. Software Engineering</div>
                                <div className="text-xs text-gray-900/60 dark:text-gray-500 font-mono mb-2 uppercase tracking-tight">MIT / 2016</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-8 glass-card rounded-3xl p-8 flex flex-col lg:flex-row gap-8 items-center">
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white font-display">
                                <Heart className="text-red-500" size={20} />
                                Outside the Terminal
                            </h3>
                            <p className="text-gray-900/80 dark:text-gray-400 text-sm leading-relaxed font-sans mb-6">
                                When I'm not debugging distributed locks, I'm usually exploring long-distance cycling routes or experimenting with modular synthesizers. I find that the same logic used in orchestrating containers often applies to sound design.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["Gravel Cycling", "Modular Synths", "Deep House", "Sci-Fi", "Mechanical Keyboards"].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-900/50 dark:text-gray-500 uppercase tracking-widest">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-48 h-48 rounded-2xl bg-[#0B0C15] border border-white/10 flex items-center justify-center group overflow-hidden relative">
                            <div className="absolute inset-0 grid-bg opacity-30" />
                            <Code className="text-emerald-500 group-hover:scale-110 transition-transform duration-500" size={48} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
