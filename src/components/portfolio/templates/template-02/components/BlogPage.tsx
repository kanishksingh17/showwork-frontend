import React, { useState } from 'react';
import { Search, ArrowRight, Terminal, Zap, Clock } from 'lucide-react';

export const BlogPage: React.FC<{ userData: any }> = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', 'Tutorials', 'Thoughts', 'Career'];

    const featuredPost = {
        title: "The Future of Frontend: Why I'm Betting on Server Components",
        description: "The shift to server components isn't just a trend—it's a fundamental change in how we build for the web. Here's a deep dive into the architecture, the benefits, and the trade-offs we need to consider as we move forward.",
        image: "/generated/blog_blue_fluid_v3_premium_1771994675977.png",
        date: "Oct 24, 2025",
        readTime: "8 min read",
        category: "Featured"
    };

    const articles = [
        {
            title: "The Only Next.js Favicon Guide You'll Need",
            description: "Learn how to properly add a Favicon to your Next.js application. No nonsense. No fluff. Just the implementation details you need.",
            image: "/generated/blog_wooden_blocks_v3_premium_1771992291883.png",
            date: "Sep 12, 2025",
            readTime: "5 min read",
            category: "Tutorials"
        },
        {
            title: "My Evolved Blogfolio in 2025",
            description: "I've been working hard on my website, and I'm pumped to show you what I've been up to this year. From new features to some behind-the-scenes tech magic.",
            image: "/generated/blog_purple_ring_v3_premium_1771992320062.png",
            date: "Aug 05, 2025",
            readTime: "4 min read",
            category: "Thoughts"
        },
        {
            title: "React Patterns for Scalable Architecture",
            description: "Exploring compound components, render props, and hooks to build reusable and maintainable UI libraries for large teams.",
            icon: <Zap className="text-blue-400" size={48} />,
            bg: "bg-blue-50 dark:bg-blue-900/10",
            date: "Jul 22, 2025",
            readTime: "12 min read",
            category: "Tutorials"
        },
        {
            title: "Reflections on Public Speaking",
            description: "Getting on stage is terrifying. Here is what I learned from my first major conference talk and how I prepared for the Q&A session.",
            image: "/generated/braydon_speaking_2_1771991179057.png",
            date: "Jun 15, 2025",
            readTime: "6 min read",
            category: "Career"
        },
        {
            title: "Terminal Productivity Hacks",
            description: "A collection of aliases, functions, and tools that I use daily to speed up my workflow in the terminal.",
            icon: <Terminal className="text-purple-400" size={48} />,
            bg: "bg-purple-50 dark:bg-purple-900/10",
            date: "May 03, 2025",
            readTime: "3 min read",
            category: "Tutorials"
        }
    ];

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || article.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
            <section className="flex flex-col items-center text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">Writing & Experiments</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                    Thoughts on software development, design, and my journey as a developer.
                </p>
            </section>

            {/* Search and Filters */}
            <div className="flex justify-center mb-16">
                <div className="bg-white dark:bg-[#181a20] p-2 rounded-full border border-gray-100 dark:border-[#2d3039] shadow-sm flex flex-col sm:flex-row items-center gap-2 max-w-2xl w-full transition-all focus-within:ring-2 focus-within:ring-indigo-500/20">
                    <div className="relative flex-1 w-full sm:w-auto">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Search size={20} />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 pl-10 pr-4 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400"
                            placeholder="Search articles..."
                        />
                    </div>
                    <div className="flex gap-1 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 no-scrollbar px-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${activeFilter === cat
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Featured Post */}
                <article className="md:col-span-2 group cursor-pointer bg-white dark:bg-[#181a20] rounded-3xl border border-gray-100 dark:border-[#2d3039] overflow-hidden hover-lift flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-gray-50 dark:bg-gray-900/50">
                        <img alt="Featured Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={featuredPost.image} />
                    </div>
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4 text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                            <span className="bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">Featured</span>
                            <span>•</span>
                            <span>{featuredPost.date}</span>
                            <span>•</span>
                            <span>{featuredPost.readTime}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-indigo-600 transition-colors text-gray-900 dark:text-white">{featuredPost.title}</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                            {featuredPost.description}
                        </p>
                        <div className="mt-auto flex items-center text-indigo-600 font-medium group-hover:underline">
                            Read Article <ArrowRight size={16} className="ml-1" />
                        </div>
                    </div>
                </article>

                {/* Normal Articles */}
                {filteredArticles.map((article, i) => (
                    <article key={i} className="group cursor-pointer bg-white dark:bg-[#181a20] rounded-3xl border border-gray-100 dark:border-[#2d3039] overflow-hidden hover-lift flex flex-col h-full">
                        <div className={`h-48 overflow-hidden relative flex items-center justify-center ${article.bg || 'bg-gray-50 dark:bg-gray-900/50'}`}>
                            {article.image ? (
                                <img alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={article.image} />
                            ) : (
                                <div className="transition-transform duration-500 group-hover:scale-110">
                                    {article.icon}
                                </div>
                            )}
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                                <span>{article.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors text-gray-900 dark:text-white leading-tight">{article.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 leading-relaxed">
                                {article.description}
                            </p>
                            <div className="mt-auto flex items-center text-indigo-600 text-xs font-bold group-hover:underline uppercase tracking-widest">
                                Read More <ArrowRight size={14} className="ml-1" />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};
