import React from 'react';
import {
    Search,
    ChevronDown,
    LayoutGrid,
    ChevronLeft,
    ChevronRight,
    Share2,
    Code,
    Clock,
    Zap,
    Cloud,
    Send,
    Image as ImageIcon,
    Cpu,
    Database
} from 'lucide-react';

interface APICardProps {
    api: {
        name: string;
        provider: string;
        description: string;
        category: string;
        version: string;
        status: string;
        icon: React.ReactNode;
        gradient?: string;
        isBuilt?: boolean;
    }
}

const APICard: React.FC<APICardProps> = ({ api }) => {
    return (
        <div className="glass-card rounded-[16px] p-6 group hover:border-[#D9FF3F]/30 hover:bg-[#161A23]/90 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${api.gradient || 'bg-[#161A23] border border-white/10'}`}>
                    {api.icon}
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold border ${api.status === 'Production'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : api.isBuilt
                        ? 'bg-[#D9FF3F]/10 text-[#D9FF3F] border-[#D9FF3F]/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                    {api.status}
                </span>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#D9FF3F] transition-colors">{api.name}</h3>
                <p className="text-xs text-gray-900/60 dark:text-gray-500 mb-2 font-sans">by {api.provider}</p>
                <p className="text-sm text-gray-900/80 dark:text-gray-400 line-clamp-2 font-sans">{api.description}</p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-gray-900/60 dark:text-gray-500 tracking-wider font-sans">{api.category}</span>
                <span className="text-xs text-gray-900/60 dark:text-gray-400 font-mono">{api.version}</span>
            </div>
        </div>
    );
};

export const APIPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const apis = [
        {
            name: "Stripe Connect",
            provider: "Stripe Inc.",
            description: "Implemented custom split payments and managed account onboarding flows for marketplace.",
            category: "Payments",
            version: "v2023-10",
            status: "Production",
            gradient: "bg-gradient-to-br from-indigo-500 to-purple-600",
            icon: <span className="font-bold text-xl">S</span>
        },
        {
            name: "OpenAI API",
            provider: "OpenAI",
            description: "Fine-tuned GPT-4o models for specialized legal document summarization pipeline.",
            category: "AI / ML",
            version: "v1.3.0",
            status: "Production",
            gradient: "bg-black border border-white/10",
            icon: <Cpu size={24} />
        },
        {
            name: "Supabase",
            provider: "Supabase Inc.",
            description: "Real-time database subscription hooks and Row Level Security implementation.",
            category: "Backend",
            version: "v2.33",
            status: "Integrated",
            gradient: "bg-emerald-500",
            icon: <Database size={24} />
        },
        {
            name: "AWS S3",
            provider: "Amazon Web Services",
            description: "Implemented presigned URLs for secure direct-to-bucket uploads for large media assets.",
            category: "Storage",
            version: "Rest API",
            status: "Production",
            gradient: "bg-orange-500",
            icon: <Cloud size={24} />
        },
        {
            name: "Internal Log Stream",
            provider: "DevIpsum",
            description: "Custom high-throughput logging API built with Go for centralized error tracking.",
            category: "Internal",
            version: "v1.0.0",
            status: "Built",
            isBuilt: true,
            gradient: "bg-[#D9FF3F] text-black",
            icon: <Zap size={24} />
        },
        {
            name: "Resend",
            provider: "Resend",
            description: "Transactional email infrastructure with React-based email templates.",
            category: "Email",
            version: "v2.0.0",
            status: "Integrated",
            gradient: "bg-blue-600",
            icon: <Send size={24} />
        },
        {
            name: "Cloudinary",
            provider: "Cloudinary Ltd.",
            description: "On-the-fly image optimization and transformation API integration for gallery view.",
            category: "Media",
            version: "v1.24",
            status: "Production",
            gradient: "bg-pink-600",
            icon: <ImageIcon size={24} />
        },
        {
            name: "Vercel API",
            provider: "Vercel Inc.",
            description: "Programmatic deployment triggering and environment variable management.",
            category: "DevOps",
            version: "v9.0",
            status: "Integrated",
            gradient: "bg-white text-black",
            icon: <span className="font-bold text-xl">V</span>
        },
    ];

    return (
        <section className="relative py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <button
                onClick={onBack}
                className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Back to Dashboard
            </button>

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[160px] opacity-10" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#D9FF3F] rounded-full blur-[160px] opacity-5" />
                <div className="absolute inset-0 grid-bg opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-4">
                <header className="mb-12 pt-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
                                    API Experience
                                </h1>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D9FF3F]/10 border border-[#D9FF3F]/20 text-[#D9FF3F] uppercase tracking-wide">
                                    Total: 27 APIs
                                </span>
                            </div>
                            <p className="text-gray-900/80 dark:text-gray-400 text-lg font-sans">Integrated, built, and deployed across production systems.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {[
                            { label: "Integrated", value: "27 APIs", icon: <Share2 />, color: "text-blue-400", bg: "bg-blue-500/10" },
                            { label: "Built From Scratch", value: "6 APIs", icon: <Code />, color: "text-[#D9FF3F]", bg: "bg-[#D9FF3F]/10" },
                            { label: "Uptime Maintained", value: "99.98%", icon: <Clock />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                            { label: "Avg Latency", value: "200ms", icon: <Zap />, color: "text-purple-400", bg: "bg-purple-500/10" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#161A23] border border-white/5 rounded-xl p-4 flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color}`}>
                                    {React.cloneElement(stat.icon as React.ReactElement, { size: 20 })}
                                </div>
                                <div>
                                    <div className="text-2xl font-bold font-sans text-white">{stat.value}</div>
                                    <div className="text-xs text-gray-900/60 dark:text-gray-500 uppercase font-bold tracking-wider font-display">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-grow">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <Search size={20} />
                            </span>
                            <input
                                className="w-full bg-[#161A23] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FF3F]/50 focus:ring-1 focus:ring-[#D9FF3F]/50 transition-all"
                                placeholder="Search API by name or provider..."
                                type="text"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="relative">
                                <select className="appearance-none bg-[#161A23] border border-white/10 rounded-lg py-3 pl-4 pr-10 text-sm text-gray-300 focus:outline-none focus:border-[#D9FF3F]/50 cursor-pointer min-w-[160px]">
                                    <option>Filter by Type</option>
                                    <option>Payments</option>
                                    <option>AI / ML</option>
                                    <option>Infrastructure</option>
                                    <option>Authentication</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            </div>
                            <div className="relative">
                                <select className="appearance-none bg-[#161A23] border border-white/10 rounded-lg py-3 pl-4 pr-10 text-sm text-gray-300 focus:outline-none focus:border-[#D9FF3F]/50 cursor-pointer min-w-[160px]">
                                    <option>All Status</option>
                                    <option>Production</option>
                                    <option>Integrated</option>
                                    <option>Built</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            </div>
                            <button className="bg-[#161A23] border border-white/10 rounded-lg p-3 text-gray-400 hover:text-white hover:border-white/30 transition-colors">
                                <LayoutGrid size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {apis.map((api, idx) => (
                        <APICard key={idx} api={api} />
                    ))}
                </div>

                <div className="flex items-center justify-end gap-2 text-sm">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-[#161A23] text-gray-400 hover:text-white hover:border-white/30 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-[#161A23] text-white font-medium hover:border-[#D9FF3F]/30 transition-colors">
                        1
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-transparent bg-[#D9FF3F] text-black font-bold">
                        2
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-[#161A23] text-white font-medium hover:border-[#D9FF3F]/30 transition-colors">
                        3
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-[#161A23] text-white font-medium hover:border-[#D9FF3F]/30 transition-colors">
                        4
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-[#161A23] text-gray-400 hover:text-white hover:border-white/30 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};
