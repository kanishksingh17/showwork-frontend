import React from 'react';
import { Terminal, Palette, Laptop, ArrowUpRight, Keyboard, MousePointer2, Headphones } from 'lucide-react';

export const ToolboxPage: React.FC<{ userData: any }> = () => {
    const workspaceImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDc5RrXmwM0GwdQtJFpt2PkJY0zG9pJ8fz-OCWI8G7A5qz_h9NsS7a1mV62DQL0ICKTz9WOFJuE3tWf36jKasoaHUt-ppJh5GpMzh-MW59XjjC_AmzwzlVL4vbEabEiv2SorvTSgQCNRkHMSmAH0ac64ZSszwZlh50YgnBGL_OFDgnf0t1k5_ppmCOq4V3S7RyvZHB6-yDOc47a36vx9631gs1lZqAqqewNTF5XHgGI7p_eXKtt9g5Iri6139G6b5JD6SVeCuS5i2GQ";

    const sections = [
        {
            id: "coding",
            title: "Coding & Development",
            icon: <Terminal />,
            color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
            tools: [
                { name: "JavaScript (ES6+)", desc: "The language of the web. I use it for everything from small scripts to full-blown applications.", icon: <i className="fa-brands fa-js text-yellow-400"></i> },
                { name: "React", desc: "My go-to library for building user interfaces. It's flexible, powerful, and has a great ecosystem.", icon: <i className="fa-brands fa-react text-blue-400"></i> },
                { name: "Tailwind CSS", desc: "Utility-first CSS framework that speeds up my styling workflow significantly.", icon: <svg className="w-6 h-6 text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z"></path></svg> },
                { name: "VS Code", desc: "My editor of choice. Packed with extensions that make coding a breeze.", icon: <i className="fa-solid fa-code text-blue-500"></i> },
                { name: "GitHub", desc: "Where I host all my code and collaborate on open source projects.", icon: <i className="fa-brands fa-github text-gray-800 dark:text-white"></i> }
            ]
        },
        {
            id: "design",
            title: "Design & Inspiration",
            icon: <Palette />,
            color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
            tools: [
                { name: "Figma", desc: "The best tool for interface design and prototyping. Collaboration is seamless.", icon: <i className="fa-brands fa-figma text-purple-500"></i> },
                { name: "Dribbble", desc: "My daily source of design inspiration and a place to showcase my visual work.", icon: <i className="fa-brands fa-dribbble text-pink-500"></i> },
                { name: "Contrast", desc: "A simple macOS app for quick access to WCAG color contrast ratios.", icon: <i className="fa-solid fa-circle-half-stroke text-gray-700 dark:text-gray-300"></i> }
            ]
        },
        {
            id: "hardware",
            title: "Hardware & Gear",
            icon: <Laptop />,
            color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
            tools: [
                { name: "MacBook Pro 16\"", desc: "The powerhouse M1 Max. It handles everything I throw at it without breaking a sweat.", icon: <i className="fa-brands fa-apple text-gray-800 dark:text-gray-200"></i> },
                { name: "Keychron Q1", desc: "Custom mechanical keyboard with Gateron Phantom Yellow switches.", icon: <Keyboard size={24} className="text-gray-800 dark:text-gray-200" /> },
                { name: "MX Master 3", desc: "Ergonomic, customizable, and reliable. The best mouse for productivity.", icon: <MousePointer2 size={24} className="text-gray-800 dark:text-gray-200" /> },
                { name: "Sony WH-1000XM4", desc: "Essential for deep work sessions. The noise cancellation is top tier.", icon: <Headphones size={24} className="text-gray-800 dark:text-gray-200" /> }
            ]
        }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
            <section className="flex flex-col items-center text-center mb-24">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight text-gray-900 dark:text-white">
                    My Toolbox.
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                    This is a comprehensive list of the software, hardware, and equipment I use on a daily basis to design, code, and stay productive.
                </p>
            </section>

            {sections.map((section) => (
                <section key={section.id} className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`p-3 rounded-2xl ${section.color}`}>
                            {React.cloneElement(section.icon as React.ReactElement, { size: 24 })}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {section.tools.map((tool, i) => (
                            <div key={i} className="bg-white dark:bg-[#181a20] p-6 rounded-3xl border border-gray-100 dark:border-[#2d3039] shadow-sm hover:shadow-lg transition-all duration-300 group cursor-default">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900/50 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-gray-100 dark:border-transparent">
                                        {tool.icon}
                                    </div>
                                    <ArrowUpRight size={20} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{tool.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed leading-relaxed">{tool.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            <section className="mb-32">
                <div className="text-center mb-12">
                    <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">The Workspace</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">Where the magic happens</h2>
                </div>
                <div className="relative w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group">
                    <img alt="Desk Setup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={workspaceImg} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-medium mb-4">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Current Setup 2025
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">My Minimalist Desk Setup</h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                I believe a clean physical space leads to a clearer mind. My setup is optimized for focus, with just enough personality to keep me inspired.
                            </p>
                            <div className="flex gap-4">
                                <button className="px-6 py-2.5 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm shadow-xl">
                                    View detailed breakdown
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
