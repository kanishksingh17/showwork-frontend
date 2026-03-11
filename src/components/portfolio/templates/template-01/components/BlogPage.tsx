import React from 'react';
import { Search, ArrowRight, Send, Brain, Zap, MessageSquare, Code } from 'lucide-react';

export const BlogPage: React.FC<{ userData: any }> = ({ userData }) => {
    const blogs = userData?.blogs || [
        {
            date: "Oct 24, 2023",
            category: "Architecture",
            title: "The Case for Vertical Slicing in React Applications",
            excerpt: "Moving away from layer-based architecture towards feature-based organization. How vertical slicing improves maintainability and aligns code structure with business capabilities.",
            readTime: "8 min read"
        },
        {
            date: "Sep 12, 2023",
            category: "Performance",
            title: "Optimizing Core Web Vitals on Heavy Content Sites",
            excerpt: "A deep dive into LCP and CLS optimization techniques. We explore image lazy loading strategies, font subsetting, and critical CSS extraction to achieve a 95+ score.",
            readTime: "12 min read"
        },
        {
            date: "Aug 05, 2023",
            category: "Consulting",
            title: "Communicating Technical Debt to Stakeholders",
            excerpt: "Technical debt is often invisible until it breaks something. This guide outlines a framework for translating refactoring needs into business value metrics.",
            readTime: "6 min read"
        },
        {
            date: "Jul 18, 2023",
            category: "TypeScript",
            title: "Advanced Pattern Matching in TypeScript 5.0",
            excerpt: "Exploring new const type parameters and decorators. How to leverage the latest TS features to write more expressive, type-safe code that catches errors at compile time.",
            readTime: "10 min read"
        }
    ];

    const topics = [
        { name: "React Ecosystem", count: 12 },
        { name: "Backend & API", count: 8 },
        { name: "Consulting", count: 5 },
        { name: "TypeScript", count: 7 },
        { name: "System Design", count: 4 }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="md:col-span-8 space-y-12">
                    <header className="mb-10">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Blog & Insights</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium italic">Thoughts on software architecture, frontend development, and consulting.</p>
                    </header>

                    <div className="space-y-12">
                        {blogs.map((blog: any, idx: number) => (
                            <React.Fragment key={idx}>
                                <article className="group cursor-pointer">
                                    <div className="flex items-center gap-3 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-widest">
                                        <span>{blog.date}</span>
                                        <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                                        <span className="text-blue-600 dark:text-blue-400">{blog.category}</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight leading-tight">
                                        {blog.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 font-medium">
                                        {blog.excerpt}
                                    </p>
                                    <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white group-hover:translate-x-2 transition-transform duration-300">
                                        Read article <ArrowRight size={14} className="ml-2" />
                                    </div>
                                </article>
                                {idx < blogs.length - 1 && <hr className="border-gray-50 dark:border-gray-800/50" />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="pt-12 flex justify-center">
                        <button className="px-8 py-3 rounded-full border-2 border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 hover:border-transparent transition-all duration-300 shadow-sm">
                            Load more articles
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="md:col-span-4 space-y-8">
                    {/* Search */}
                    <div className="bg-gray-50 dark:bg-gray-800/30 p-8 rounded-3xl border border-gray-100/50 dark:border-gray-700/50 shadow-inner">
                        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">Search</h3>
                        <div className="relative group">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <Search size={16} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </span>
                            <input
                                className="w-full pl-12 pr-4 py-3 text-sm font-medium text-gray-900 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none dark:text-white dark:placeholder-gray-600"
                                placeholder="Search articles..."
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Topics */}
                    <div className="bg-gray-50 dark:bg-gray-800/30 p-8 rounded-3xl border border-gray-100/50 dark:border-gray-700/50 shadow-inner">
                        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">Topics</h3>
                        <ul className="space-y-4">
                            {topics.map((topic, i) => (
                                <li key={i}>
                                    <a className="flex items-center justify-between text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group" href="#">
                                        <span>{topic.name}</span>
                                        <span className="bg-white dark:bg-gray-800 text-gray-400 py-1 px-3 rounded-full text-[10px] border border-gray-100 dark:border-gray-700 group-hover:border-blue-500/30 group-hover:text-blue-600 transition-all duration-300">
                                            {topic.count}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="bg-gray-900 dark:bg-blue-600 p-8 rounded-[2rem] text-white relative overflow-hidden group shadow-xl">
                        <div className="relative z-10">
                            <h3 className="font-black text-xl mb-3 tracking-tight">Weekly Insights</h3>
                            <p className="text-[11px] font-medium text-gray-400 dark:text-blue-100 mb-6 leading-relaxed opacity-80 uppercase tracking-wider">
                                Curated list of architecture patterns for senior developers.
                            </p>
                            <div className="flex flex-col gap-3">
                                <input
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white/20 transition-all font-medium"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                                <button className="w-full bg-white text-gray-900 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 group/btn">
                                    Subscribe <Send size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/20 dark:bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
