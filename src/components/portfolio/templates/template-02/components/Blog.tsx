import React from 'react';

export const Blog: React.FC<{ userData: any; onViewAll?: () => void }> = ({ onViewAll }) => {
    // Mock blogs to match the reference image exactly
    const blogs = [
        {
            title: "The Only Next.js Favicon Guide You'll Need (Updated 2025)",
            description: "Learn how to properly add a Favicon to your Next.js application. No nonsense. No fluff.",
            image: "/generated/blog_wooden_blocks_v3_premium_1771992291883.png",
            bg: "bg-[#f5f5f5]"
        },
        {
            title: "Introducing Blogfolio v5",
            description: "I've been working hard on my website, and I'm pumped to show you what I've been up to this year. From new features to some behind-the-scenes tech magic, there's a lot to unpack in this 2024 update.",
            image: "/generated/blog_purple_ring_v3_premium_1771992320062.png",
            bg: "bg-[#f8f8fa]"
        },
        {
            title: "My Evolved Blogfolio in 2023",
            description: "The Tailwind Labs team has developed and released an official plugin that adds autocomplete to your VSCode environment, and it only takes a few clicks to enable!",
            image: "/generated/blog_blue_fluid_v3_premium_1771994675977.png",
            bg: "bg-[#f0f4f9]"
        }
    ];

    return (
        <section id="blog" className="mb-32">
            <div className="text-center mb-16">
                <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">Blog</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white leading-tight">I like sharing my experiments<br />&& knowledge with others</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {blogs.map((blog, i) => (
                    <article key={i} className="group cursor-pointer bg-white dark:bg-[#181a20] rounded-[32px] p-6 border border-gray-100 dark:border-[#2d3039] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                        <div className={`rounded-2xl overflow-hidden aspect-[4/3] mb-8 border border-gray-100 dark:border-transparent relative shadow-sm ${blog.bg}`}>
                            <img alt={blog.title} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" src={blog.image} />
                        </div>
                        <div className="flex flex-col flex-1 px-2">
                            <h3 className="font-bold text-xl mb-4 group-hover:text-indigo-600 transition-colors text-gray-900 dark:text-white leading-tight">{blog.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-4">{blog.description}</p>
                        </div>
                    </article>
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    onClick={onViewAll}
                    className="group flex items-center gap-2 bg-white dark:bg-[#181a20] px-8 py-3 rounded-full border border-gray-100 dark:border-[#2d3039] font-bold text-sm shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                    View all articles
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>
        </section>
    );
};
