import React from 'react';
import { ExternalLink, Code } from 'lucide-react';

export const ProjectsPage: React.FC<{ userData: any }> = () => {
    const featuredProjects = [
        {
            title: "Neo-SaaS Dashboard",
            description: "A modern, dark-mode-first dashboard template designed for SaaS applications. It features real-time data visualization, customizable widgets, and a buttery smooth animation system powered by Framer Motion. Built to be accessible and highly performant.",
            tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc5RrXmwM0GwdQtJFpt2PkJY0zG9pJ8fz-OCWI8G7A5qz_h9NsS7a1mV62DQL0ICKTz9WOFJuE3tWf36jKasoaHUt-ppJh5GpMzh-MW59XjjC_AmzwzlVL4vbEabEiv2SorvTSgQCNRkHMSmAH0ac64ZSszwZlh50YgnBGL_OFDgnf0t1k5_ppmCOq4V3S7RyvZHB6-yDOc47a36vx9631gs1lZqAqqewNTF5XHgGI7p_eXKtt9g5Iri6139G6b5JD6SVeCuS5i2GQ",
            tagColors: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30"
        },
        {
            title: "DevConf 2025",
            description: "The official companion app for the largest regional developer conference. Attendees could build schedules, chat with speakers, and participate in live Q&A sessions. Handled 5k+ concurrent users flawlessly.",
            tags: ["Vue 3", "Supabase", "TypeScript"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDo9blbiDNbAKH-KJOUwYas6kpSXRHmEZOoZOZ_JTkQ6M-79Lx-_-PlzvSCLncDJeR3BsbJkYpdqbSubM-udoQIsR_ANNporgcFAzMobfkdH-cG4t0Hfp6YkThSUPppvEaDaaefACjnIg7MF2b9OZqbwAKsr3NaDOi95KJzGpudQZPw19YO0Z1wmaB8q4qKw-LrfUedShjdqW7gECZVqAb3BuJ3b73mbsvX8ETbjLbA-gP3ISJMswsZw4gvNHYguzRa5CnjevxHK3dJ",
            tagColors: "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/30",
            reversed: true
        }
    ];

    const normalProjects = [
        {
            title: "Prisma Syntax",
            description: "A lightweight browser extension that automatically detects and highlights code blocks on any webpage with your custom theme. Designed for developers who read documentation all day.",
            tags: ["JavaScript", "Prism.js"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCtQTDpyg-720rQxsqbdCZyDU-QjRAob2Ztz7gqu0XrAKFuYrQBrS9s0Td-t4oUj1fCFcMW7R1U927MVEBWg8eFlwePG2wzzN7st_aVneilAxM1qRsQWKzDADs_yshxy0Vg7yWZRapgvMtxyejFHOe4LnMfng7M_kRpOW-lQ3TOHEnL9VI1Z0f6To0L4uxkP_5lFplai-9-rdr97vsF_ZCLNswyy22Ux8QEgga5JSdEs7KpgpRtgYosSQOXP1g2SFa0-OO54AuH_Ft",
            tagColors: "bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-900/30"
        },
        {
            title: "Fluid UI Kit",
            description: "An open-source React component library focusing on fluid typography and spacing. It solves the issue of responsive scaling by using clamped values.",
            tags: ["React", "Storybook"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ06KlpDJTouo5WRdRwEFtJ_o9Ggofr9f9JrZ8CKybZfXyCL_Z5kwHpkKtfbXmKh6MOeHH9OJh70aEutMKNiQ0sECx7DXzOkHhc9w0r_UkPAIGS8kKCsS70lMh9J7CPwvHrISYvz_FNUyzS56-gt1538HVqAlr4EkTLsvcbLJMY6HbqEgcyJIxaBQHzX1DP7DqAaH2eZg8q7kkbxeNi-S9CzczskAUhgHLasY7ZXJnoy0G4u5TDXtmroYWPUnR61CE9fywCVPwbynV",
            tagColors: "bg-pink-50 text-pink-700 border-pink-100 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-900/30"
        },
        {
            title: "Network Graph",
            description: "An interactive data visualization tool to explore relationships between tech communities. Uses force-directed graphs for layout.",
            tags: ["D3.js", "GraphQL"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNny2JXQ-HC5grj7wXeaio_BU56nVcyFMBiqBuEhbKEc5JO05gjmnXrWNfw64RPJ-uiU7qfi3n42BBFj2QzSIn7AgZaCi3dS2YeJxflkvxPQXt4hw-xCrUsc3tM9zhfogGDDGcxsrZo59qSJzAFW0kFLORhvN6nqje1ORkLbCnhPbr8eMAol_zKJsyLDJKN_2CJMOxNh4JzIM4AhWiZKxNU-FljokJJF-BFiXo5J0WbqIrtHZpeyW1P1CAc-ixGPg2pSr77N_TIgUF",
            tagColors: "bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/30"
        },
        {
            title: "Sonic Waves",
            description: "A browser-based audio visualizer that reacts to microphone input. Created as an experiment to learn low-level audio processing in the browser.",
            tags: ["Web Audio API", "Canvas"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkTQgU192N6MjXfCH3QO2cZyS3QZe5rmbTNN_oEHXVwCuROaekUN7o4WLMCs7MtuFyBAUfxweFbC7P20IIMEQ9EevTyF1_e1kOgV1sBJANYwd8E4z-7QT-Zwe9tOpvDTR8J329sOfKM-bT7w5eOhc-tnmtjesYkdn3olJCDCuf9c4a5HJV8LiuMBN76mPTC0dVk2QRcSznVo_Nxsr5jdJejgLaSvNJAcChtYla8USSvU3_VOwSqsSjNaZGhACuX9h72_RgcWsPsSfI",
            tagColors: "bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-900/30"
        }
    ];

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
                                            {tag}
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
                                            {tag}
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
