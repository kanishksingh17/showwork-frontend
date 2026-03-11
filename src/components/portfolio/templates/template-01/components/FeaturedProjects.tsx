import React from 'react';
import { Pin, ArrowLeft, ArrowRight } from 'lucide-react';

export const FeaturedProjects: React.FC<{ projects: any[] }> = ({ projects }) => {
    // Take first 4 or use placeholders
    const featured = projects.length >= 4 ? projects.slice(0, 4) : [
        { name: "Ecommerce", image: "file:///C:/Users/Kanishk%20singh/.gemini/antigravity/brain/e147c22d-cb8a-468a-8721-232fa188cc6d/blog_blue_fluid_v3_premium_1771994675977.png" },
        { name: "Web animated series", image: "file:///C:/Users/Kanishk%20singh/.gemini/antigravity/brain/e147c22d-cb8a-468a-8721-232fa188cc6d/blog_wooden_blocks_v3_premium_1771992291883.png" },
        { name: "Color generators", image: "file:///C:/Users/Kanishk%20singh/.gemini/antigravity/brain/e147c22d-cb8a-468a-8721-232fa188cc6d/blog_purple_ring_v3_premium_1771992320062.png" },
        { name: "Image editor tool", image: "file:///C:/Users/Kanishk%20singh/.gemini/antigravity/brain/e147c22d-cb8a-468a-8721-232fa188cc6d/media__1771994731995.png" }
    ];

    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-widest">
                    <Pin size={14} className="text-gray-400" /> Featured projects
                </h2>
                <div className="flex space-x-2">
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-300 transition-colors">
                        <ArrowLeft size={16} />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors">
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featured.map((project, idx) => (
                    <div key={idx} className="group cursor-pointer">
                        <div className="aspect-[4/3] bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 mb-2 shadow-sm transition-all duration-300 group-hover:shadow-md">
                            <img
                                alt={project.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                src={project.image || project.thumbnail || "/placeholder-project.png"}
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase truncate pr-2">
                            {project.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
