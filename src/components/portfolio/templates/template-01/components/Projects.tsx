import React from 'react';
import { Code, ExternalLink, Play } from 'lucide-react';

export const Projects: React.FC<{ projects: any[]; onViewArchive: () => void }> = ({ projects, onViewArchive }) => {
    const displayProjects = projects.length > 0 ? projects.slice(0, 2).map(p => ({
        ...p,
        name: p.title || p.name || "Untitled Project",
        image: p.imageUrl || p.image || p.thumbnail || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
        description: p.description || p.summary || "Description coming soon..."
    })) : [
        {
            name: "RapidShop",
            description: "Ecommerce platform built with Vue.js, Tailwind, Vuex",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200",
            liveUrl: "https://google.com"
        },
        {
            name: "Harvest",
            description: "Image color generator built with React and Canvas",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
            liveUrl: "https://google.com"
        }
    ];

    return (
        <section id="projects" className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <div className="mb-10 flex items-center gap-3">
                <Code size={20} className="text-gray-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Main Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayProjects.map((project, idx) => (
                    <div
                        key={idx}
                        onClick={project.liveUrl ? undefined : onViewArchive}
                        className={`bg-gray-50 dark:bg-gray-800/50 rounded-3xl overflow-hidden group shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all duration-500 ${!project.liveUrl && 'cursor-pointer'}`}
                    >
                        <div className="relative bg-gray-200 dark:bg-gray-700 aspect-[16/10] overflow-hidden">
                            <img
                                alt={project.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                src={project.image || project.thumbnail || "/placeholder-project.png"}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/0 group-hover:bg-gray-900/20 transition-all duration-300 backdrop-blur-0 group-hover:backdrop-blur-[2px]">
                                <button className="bg-white/90 dark:bg-black/50 p-4 rounded-full backdrop-blur-md shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <Play size={24} className="text-gray-900 dark:text-white fill-current translate-x-0.5" />
                                </button>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-gray-900 dark:text-white text-xl tracking-tight uppercase">{project.name}</h3>
                                <a
                                    href={project.liveUrl || project.url || "#"}
                                    className="text-[10px] uppercase font-extrabold border-2 border-gray-200 dark:border-gray-700 px-4 py-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 hover:border-transparent transition-all duration-300 tracking-widest"
                                >
                                    View live
                                </a>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic">
                                {project.description}
                            </p>

                            <div className="mt-6 flex gap-2">
                                <div className="h-1 w-8 bg-indigo-500 rounded-full"></div>
                                <div className="h-1 w-2 bg-gray-200 dark:bg-gray-700 rounded-full transition-all group-hover:w-16 duration-700"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={onViewArchive}
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group"
                >
                    View all projects <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
};
