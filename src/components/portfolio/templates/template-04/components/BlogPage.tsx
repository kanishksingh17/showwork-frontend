import React from 'react';
import {
    Search,
    ArrowLeft,
    ArrowRight,
    Clock,
    Calendar,
    ChevronDown,
    Terminal,
    Cpu,
    Cloud,
    Database
} from 'lucide-react';

interface BlogCardProps {
    post: {
        title: string;
        excerpt: string;
        date: string;
        readTime: string;
        category: string;
        icon: React.ReactNode;
        iconBg: string;
        featured?: boolean;
    }
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <div className={`glass-card rounded-[24px] p-6 group hover:border-[#D9FF3F]/40 hover:bg-[#161A23]/90 transition-all duration-500 flex flex-col h-full ${post.featured ? 'lg:col-span-2 lg:flex-row gap-8' : ''}`}>
            {post.featured ? (
                <div className="lg:w-2/5 h-64 lg:h-full rounded-2xl overflow-hidden relative bg-[#0B0C15] border border-white/10 flex items-center justify-center group-hover:border-[#D9FF3F]/20 transition-colors">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className={`w-20 h-20 rounded-3xl ${post.iconBg} flex items-center justify-center text-white shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                        {React.cloneElement(post.icon as React.ReactElement, { size: 40 })}
                    </div>
                </div>
            ) : (
                <div className="w-full h-48 rounded-2xl mb-6 relative bg-[#0B0C15] border border-white/10 flex items-center justify-center group-hover:border-[#D9FF3F]/20 transition-colors overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <div className={`w-14 h-14 rounded-2xl ${post.iconBg} flex items-center justify-center text-white shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                        {React.cloneElement(post.icon as React.ReactElement, { size: 28 })}
                    </div>
                </div>
            )}

            <div className={`flex flex-col flex-grow ${post.featured ? 'lg:w-3/5' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#D9FF3F]/10 border border-[#D9FF3F]/20 text-[#D9FF3F] uppercase tracking-widest font-display">
                        {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-bold uppercase tracking-tighter font-sans">
                        <Clock size={12} />
                        {post.readTime}
                    </div>
                </div>

                <h3 className={`${post.featured ? 'text-2xl lg:text-3xl' : 'text-xl'} font-bold text-white mb-4 group-hover:text-[#D9FF3F] transition-colors font-display leading-tight`}>
                    {post.title}
                </h3>

                <p className="text-gray-900/80 dark:text-gray-400 text-sm mb-6 line-clamp-3 font-sans leading-relaxed">
                    {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-900/60 dark:text-gray-500 text-[11px] font-bold font-sans">
                        <Calendar size={14} />
                        {post.date}
                    </div>
                    <button className="flex items-center gap-2 text-[#D9FF3F] text-sm font-bold opacity-0 group-hover:opacity-100 transition-all font-display">
                        Read More
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export const BlogPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const categories = ["All Posts", "Architecture", "DevOps", "Web Eng", "AI / ML", "Security"];
    const [activeCategory, setActiveCategory] = React.useState("All Posts");

    const posts = [
        {
            title: "Scaling Event-Driven Systems with Go and NATs",
            excerpt: "How we handled 100k concurrent connections by implementing a decentralized message bus with zero message loss in production.",
            date: "Nov 24, 2023",
            readTime: "8 MIN READ",
            category: "Architecture",
            icon: <Terminal />,
            iconBg: "bg-indigo-600 shadow-indigo-500/20",
            featured: true
        },
        {
            title: "Effective Postgres Indexing for Scale",
            excerpt: "A deep dive into B-Tree, GIN, and GiST indexes to optimize complex search queries in high-volume applications.",
            date: "Nov 12, 2023",
            readTime: "12 MIN READ",
            category: "Web Eng",
            icon: <Database />,
            iconBg: "bg-emerald-600 shadow-emerald-500/20"
        },
        {
            title: "Infrastructure as Code: The Pulumi Way",
            excerpt: "Moving beyond YAML. Why using TypeScript for infrastructure definitions improved our deployment reliability by 60%.",
            date: "Oct 28, 2023",
            readTime: "6 MIN READ",
            category: "DevOps",
            icon: <Cloud />,
            iconBg: "bg-blue-600 shadow-blue-500/20"
        },
        {
            title: "Optimizing Llama 3 Inference on Edge",
            excerpt: "Techniques for model quantization and KV cache optimization to run large language models on consumer-grade hardware.",
            date: "Oct 15, 2023",
            readTime: "15 MIN READ",
            category: "AI / ML",
            icon: <Cpu />,
            iconBg: "bg-purple-600 shadow-purple-500/20"
        },
        {
            title: "Real-time Monitoring at Edge Locations",
            excerpt: "Implementing Prometheus and Grafana for distributed edge nodes with flaky network connectivity.",
            date: "Sep 30, 2023",
            readTime: "10 MIN READ",
            category: "DevOps",
            icon: <Activity size={24} />,
            iconBg: "bg-orange-600 shadow-orange-500/20"
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
                <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[160px] opacity-10" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#D9FF3F] rounded-full blur-[160px] opacity-5" />
                <div className="absolute inset-0 grid-bg opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-4">
                <header className="mb-12 pt-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#D9FF3F]/10 border border-[#D9FF3F]/20 text-[#D9FF3F] uppercase tracking-widest font-display">Engineering Journal</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F] animate-pulse"></span>
                                    <span className="text-xs font-mono text-gray-400">Updates: Weekly</span>
                                </div>
                            </div>
                            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 font-display">
                                Writing & <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9FF3F] to-emerald-400">Experiments</span>
                            </h1>
                            <p className="text-gray-900/70 dark:text-gray-400 text-lg max-w-2xl font-sans">
                                Deep dives into distributed systems, performance tuning, and scaling AI infrastructure.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 min-w-[320px]">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="w-full bg-[#161A23] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FF3F]/50 focus:ring-1 focus:ring-[#D9FF3F]/50 transition-all font-sans"
                                />
                            </div>
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat
                                            ? 'bg-[#D9FF3F] text-black shadow-lg shadow-[#D9FF3F]/20'
                                            : 'bg-white/5 text-gray-500 hover:text-white border border-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {posts.map((post, idx) => (
                        <BlogCard key={idx} post={post} />
                    ))}
                </div>

                <div className="flex items-center justify-center pt-8 border-t border-white/5">
                    <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3 font-display">
                        Load More Articles
                        <ChevronDown size={20} className="text-[#D9FF3F]" />
                    </button>
                </div>
            </div>
        </section>
    );
};

const Activity = ({ size }: { size: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);
