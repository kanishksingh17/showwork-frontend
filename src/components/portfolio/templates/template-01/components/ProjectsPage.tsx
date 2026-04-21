import React from 'react';
import { FolderOpen, LayoutGrid, ArrowRight } from 'lucide-react';

export const ProjectsPage: React.FC<{ userData: any; projects: any[] }> = ({ projects }) => {
    const [filter, setFilter] = React.useState<'All' | 'Client' | 'Open Source'>('All');

    // Use projects from props or fall back to high-fidelity mock data from reference
    const allProjects = projects?.length > 0 ? projects.map(p => ({
        ...p,
        title: p.title || p.name || "Untitled Project",
        image: p.imageUrl || p.image || p.thumbnail,
        type: p.category?.toLowerCase()?.includes('client') ? 'Client' : 'Open Source',
        techs: p.techs || p.techStack || p.technologies || []
    })) : [
        {
            title: "RapidShop Core",
            subtitle: "E-commerce Platform",
            type: "Client",
            image: "file:///C:/Users/Kanishk%20singh/.gemini/antigravity/brain/e147c22d-cb8a-468a-8721-232fa188cc6d/blog_blue_fluid_v3_premium_1771994675977.png",
            description: "A headless e-commerce architecture migrating a legacy monolith to Vue.js and Shopify. Reduced page load times by 60% and improved checkout conversion significantly.",
            techs: ["Vue.js 3", "Shopify API", "Tailwind"]
        },
        {
            title: "Harvest Colors",
            subtitle: "Design Tool Utility",
            type: "Open Source",
            image: "file:///C:/Users/Kanishk%20singh/.gemini/antigravity/brain/e147c22d-cb8a-468a-8721-232fa188cc6d/blog_wooden_blocks_v3_premium_1771992291883.png",
            description: "Browser-based color extraction tool using Canvas API and K-means clustering. Processes images purely client-side for privacy and offers instant export.",
            techs: ["React", "TypeScript", "Canvas API"]
        },
        {
            title: "Edynamics Log",
            subtitle: "Enterprise Dashboard",
            type: "Client",
            icon: "local_shipping",
            description: "Logistics management platform modernized from jQuery to Vue.js 3. Integrated Google Maps Platform for real-time fleet tracking of 500+ vehicles.",
            techs: ["Vue.js", "Google Maps", "WebSockets"]
        },
        {
            title: "Radix UI Kit",
            subtitle: "Component Library",
            type: "Open Source",
            icon: "widgets",
            description: "A comprehensive, accessible component library built on top of Radix UI primitives. Designed for internal tool consistency across multiple React applications.",
            techs: ["React", "Radix UI", "Storybook"]
        }
    ];

    const filteredProjects = filter === 'All'
        ? allProjects
        : allProjects.filter(p => p.type === filter);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Page Header */}
            <section className="space-y-4 mb-16">
                <div className="flex items-center gap-2 mb-2">
                    <FolderOpen className="text-blue-600 dark:text-blue-400" size={18} />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">Archive</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                    Projects & Solutions
                </h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed font-medium">
                    A collection of technical implementations, open source contributions, and client solutions. Each project represents a specific challenge solved through architectural decision-making.
                </p>
            </section>

            {/* Selection Grid */}
            <section>
                <div className="flex items-center justify-between mb-10 border-b border-gray-100 dark:border-gray-700 pb-5">
                    <div className="flex items-center gap-2">
                        <LayoutGrid className="text-gray-400" size={20} />
                        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight uppercase tracking-widest text-xs">Selected Works</h2>
                    </div>
                    <div className="flex bg-gray-50 dark:bg-gray-800/50 p-1 rounded-xl border border-gray-100 dark:border-gray-700">
                        {['All', 'Client', 'Open Source'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilter(t as any)}
                                className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg transition-all ${filter === t
                                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {filteredProjects.map((project: any, idx) => (
                        <article key={idx} className="bg-white dark:bg-gray-800 border-2 border-transparent hover:border-blue-500/10 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group">
                            <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">{project.title}</h3>
                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-2 uppercase tracking-widest">{project.subtitle}</p>
                                </div>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${project.type === 'Client'
                                    ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30'
                                    : 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30'}`}>
                                    {project.type}
                                </span>
                            </div>

                            <div className="aspect-[16/10] w-full bg-gray-50 dark:bg-gray-900 overflow-hidden relative group-hover:opacity-95 transition-opacity duration-700">
                                {project.image ? (
                                    <img
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-1000"
                                        src={project.image}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                                        <div className="text-6xl text-gray-400">
                                            {project.icon === 'local_shipping' ? '🚚' : '🧱'}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 flex flex-col flex-grow bg-white dark:bg-gray-800">
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 flex-grow font-medium text-sm">
                                    {project.description}
                                </p>
                                <div className="space-y-8 mt-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {project.techs?.map((tech: any, tIdx: number) => (
                                            <span key={tIdx} className="inline-flex items-center px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-gray-50 dark:bg-gray-900/50 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700 hover:border-blue-500/20 transition-colors">
                                                {tech.name || tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <a className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all group/link" href="#">
                                            View Case Study
                                            <ArrowRight size={14} className="transform group-hover/link:translate-x-2 transition-transform duration-300" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};
