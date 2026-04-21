import React from 'react';
import { ExternalLink, Code } from 'lucide-react';

export const ProjectsPage: React.FC<{ userData: any; projects: any[] }> = ({ projects = [] }) => {
    // Filter projects for showcasing
    const showcasedProjects = projects.filter(p => p.showcase || p.isFeatured || p.is_featured);
    const resolvedProjects = (showcasedProjects.length > 0 ? showcasedProjects : projects).map(p => ({
        title: p.title || p.name || "Untitled Project",
        description: p.description || p.summary || "No description provided.",
        tags: p.technologies || p.tech || p.tags || ["Development"],
        image: p.imageUrl || p.image || p.thumbnail || "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
        tagColors: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30",
        liveUrl: p.liveUrl || p.url,
        githubUrl: p.githubUrl
    }));

    // Split into featured and normal for the layout
    const featuredList = resolvedProjects.slice(0, 2).map((p, idx) => ({ ...p, reversed: idx % 2 !== 0 }));
    const normalList = resolvedProjects.slice(2);

    // Fallback for empty state
    const featuredProjects = featuredList.length > 0 ? featuredList : [
        {
            title: "Neo-SaaS Dashboard",
            description: "A modern, dark-mode-first dashboard template designed for SaaS applications. It features real-time data visualization, customizable widgets, and a buttery smooth animation system powered by Framer Motion. Built to be accessible and highly performant.",
            tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc5RrXmwM0GwdQtJFpt2PkJY0zG9pJ8fz-OCWI8G7A5qz_h9NsS7a1mV62DQL0ICKTz9WOFJuE3tWf36jKasoaHUt-ppJh5GpMzh-MW59XjjC_AmzwzlVL4vbEabEiv2SorvTSgQCNRkHMSmAH0ac64ZSszwZlh50YgnBGL_OFDgnf0t1k5_ppmCOq4V3S7RyvZHB6-yDOc47a36vx9631gs1lZqAqqewNTF5XHgGI7p_eXKtt9g5Iri6139G6b5JD6SVeCuS5i2GQ",
            tagColors: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30"
        }
    ];

    const normalProjects = normalList;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
            <section className="flex flex-col items-center text-center mb-24">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight text-gray-900 dark:text-white">
                    Selected Works
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                    I believe in building software that is not only functional but also delightful to use. Here are a few projects where I've put that philosophy into practice, experimenting with new tech stacks and design patterns.
                </p>
            </section>

            <section className="space-y-16">
                {featuredProjects.map((project, idx) => (
                    <article key={idx} className="bg-white dark:bg-[#181a20] rounded-[20px] overflow-hidden border border-gray-100 dark:border-[#2d3039] hover-lift group">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            <div className={`p-8 md:p-12 flex flex-col justify-center ${project.reversed ? 'order-2' : 'order-2 md:order-1'}`}>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className={`px-3 py-1 text-xs font-semibold tracking-wide rounded-full border ${project.tagColors}`}>
                                            {tag.name || tag.label || (typeof tag === 'string' ? tag : 'Tech')}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{project.title}</h2>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-normal">
                                    {project.description}
                                </p>
                                <div className="flex gap-4">
                                    <a className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-90 transition-opacity" href="#">
                                        <ExternalLink size={16} /> Live Demo
                                    </a>
                                    <a className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="#">
                                        <Code size={16} /> Source Code
                                    </a>
                                </div>
                            </div>
                            <div className={`relative bg-gray-50 dark:bg-gray-900/50 h-64 md:h-auto overflow-hidden border-gray-100 dark:border-gray-800 ${project.reversed ? 'order-1' : 'order-1 md:order-2 border-l'}`}>
                                <img alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={project.image} />
                            </div>
                        </div>
                    </article>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {normalProjects.map((project, idx) => (
                        <article key={idx} className="bg-white dark:bg-[#181a20] rounded-[20px] overflow-hidden border border-gray-100 dark:border-[#2d3039] hover-lift flex flex-col group h-full">
                            <div className="relative h-64 bg-gray-50 dark:bg-gray-900/50 overflow-hidden border-b border-gray-100 dark:border-gray-800">
                                <img alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={project.image} />
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className={`px-3 py-1 text-xs font-semibold tracking-wide rounded-full border ${project.tagColors}`}>
                                            {tag.name || tag.label || (typeof tag === 'string' ? tag : 'Tech')}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{project.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed flex-1">
                                    {project.description}
                                </p>
                                <div className="flex gap-3 mt-auto">
                                    <a className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold hover:opacity-90 transition-opacity" href="#">
                                        Live Demo
                                    </a>
                                    <a className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="#">
                                        Source
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};
