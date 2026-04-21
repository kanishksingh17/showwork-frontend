import React from 'react';
import { Briefcase, Code, Database, Globe, Layers, Zap, ArrowUpRight } from 'lucide-react';

export const Experience: React.FC<{ userData: any; customData?: any; onViewDetailed: () => void }> = ({ userData, customData, onViewDetailed }) => {
    const rawExp = customData?.experiences || userData?.experience || [];
    const experience = rawExp.map((e: any) => ({
        period: e.period || (e.start && e.end ? `${e.start} - ${e.end}` : e.date) || "Present",
        role: e.role || e.title || "Developer",
        company: e.company || e.companyName || "Company",
        description: e.description || ""
    }));

    const bio = customData?.bio || userData?.bio || "Bringing seasoned expertise in development, I am dedicated to delivering exceptional solutions through the adept use of cutting-edge technologies.";
    const techHeadlineLine1 = customData?.techHeadlineLine1 || "I can work with a wide range of tools";
    const techHeadlineLine2 = customData?.techHeadlineLine2 || "from frontend to backend";
    const techStackListLine1 = customData?.techStackListLine1 || "React, Next.js, Node.js, GraphQL, PostgreSQL,";
    const techStackListLine2 = customData?.techStackListLine2 || "TypeScript, Tailwind, Prisma, Vue.js and more.";

    return (
        <section id="experience" className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="mb-10 flex items-center gap-3">
                <Briefcase size={20} className="text-gray-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Experience</h2>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/30 rounded-3xl p-8 md:p-12 mb-16 border border-gray-100/50 dark:border-gray-700/50 shadow-inner">
                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed max-w-3xl text-lg font-medium">
                    {bio}
                </p>
                <button
                    onClick={onViewDetailed}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors mb-10 group"
                >
                    Read case studies <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center shadow-sm border border-gray-100 dark:border-gray-700 group hover:border-indigo-500/30 transition-colors duration-500">
                    <div className="mb-8 md:mb-0 text-center md:text-left">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3 leading-tight">
                            {techHeadlineLine1}<br className="hidden md:block" /> {techHeadlineLine2}
                        </h3>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] font-bold leading-relaxed">
                            {techStackListLine1}<br className="hidden md:block" />
                            {techStackListLine2}
                        </p>
                    </div>
                    <div className="flex gap-4 md:gap-6 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                        <Code size={32} className="text-gray-600 dark:text-gray-100" />
                        <Database size={32} className="text-gray-600 dark:text-gray-100" />
                        <Zap size={32} className="text-gray-600 dark:text-gray-100" />
                        <Globe size={32} className="text-gray-600 dark:text-gray-100" />
                        <Layers size={32} className="text-gray-600 dark:text-gray-100" />
                    </div>
                </div>
            </div>

            <div className="space-y-0 relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-[7px] md:left-[25%] top-4 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-800"></div>

                {experience.map((item: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12 group last:mb-0">
                        <div className="md:col-span-3 pt-1 pl-6 md:pl-0 text-left md:text-right">
                            <span className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest block bg-white dark:bg-[#1f2937] md:bg-transparent relative z-10 inline-block pr-2">
                                {item.period || item.date}
                            </span>
                        </div>
                        <div className="md:col-span-9 pl-10 md:pl-12 relative pb-4">
                            {/* Dot */}
                            <div className={`absolute -left-[5px] top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#1f2937] z-20 transition-all duration-300 group-hover:scale-125 ${idx === 0 ? 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'bg-gray-300 dark:bg-gray-600'}`}></div>

                            <h3 className="font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 text-lg">
                                {item.role} <span className="text-gray-400 font-normal mx-1">at</span> {item.company}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
