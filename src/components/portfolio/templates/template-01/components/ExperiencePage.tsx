import { History, FolderOpen, Brain, CheckCircle, TrendingUp, ShoppingCart, Bolt, Download, ArrowRight, ExternalLink } from 'lucide-react';

export const ExperiencePage: React.FC<{ userData: any; projects: any[] }> = ({ userData, projects }) => {
    const caseStudies = [
        {
            title: "RapidShop E-commerce",
            category: "Frontend Architecture",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFHFlh4FCQxcgcN0qdygon1uCpI4IG4a3U-v2WUWalUoFPXnzIe2Ov6uEcYNh2vQR8rp4a4yQo9SPVyMEAy39RxE8Y6VY7PFGQT6MvnCB25Fwzvj66eMO2dR-tsnnP5dJnotwA94H8XNuSD4eYzloqGJaLxBJN5PJUz1aCQnJXpa_Ym37-QhWvu_H33d-f97j1im4OUee0D4TR-wKxqZ_3PM_NdtOUHgGuJwwka1YpOIObGry0dmPWB-Exu2zH1pzWT6TWF0O01Iq7",
            challenge: "The client, a rapidly growing retail brand, was suffering from a legacy monolith that had slow load times (4s+) and a checkout abandonment rate of over 65%.",
            solution: "I architected a headless solution using Vue.js for the frontend and Shopify for the backend. We implemented a progressive web app (PWA) strategy to improve mobile performance.",
            results: [
                { icon: <TrendingUp size={18} className="text-green-500" />, text: "Reduced page load time by 60% (down to 1.2s)." },
                { icon: <ShoppingCart size={18} className="text-green-500" />, text: "Checkout conversion rate improved by 25% in the first month." }
            ],
            techs: ["Vue.js 3", "Tailwind CSS", "Shopify Storefront API", "Netlify"],
            testimonial: {
                quote: "Milton didn't just code the site; he understood our business needs. The speed improvement directly correlated to our best quarter ever.",
                author: "Sarah Jenkins",
                role: "CTO, RapidShop",
                initials: "SJ"
            }
        },
        {
            title: "Harvest Color Tool",
            category: "SaaS Product",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMhlZwCjXhlvoBbygoNqcg7TBwWqDKB5KpLM_SrSqKnVCPZKJ806h-xHuzp7E4jIMNx3hdHsUpEC3-4arCB7vFM0LaMR0_8BmZxPmll1TwGuJu__8kgC4hMv3cGtRdehWrGzrnz4fiL-yBbiKjYLqAD0EczbMwZ_m2FlC__w7Tk-qcETuRDI3xjyh10T73VRJVtZFTZdu3L2LEIiwJ82HcQpqimwLqVPJFHfOwWresGGgyDzEiB8veu4IDQdT93MDMOxkK7SAxVJI5",
            challenge: "Designers often struggle to extract consistent color palettes from mood board images. Existing tools were either too complex or lacked export options for modern web formats.",
            solution: "Built a React-based application leveraging the Canvas API to analyze pixel data directly in the browser. I implemented a clustering algorithm (K-means) to identify dominant colors.",
            results: [
                { icon: <Bolt size={18} className="text-green-500" />, text: "Zero server-side processing for images, ensuring 100% user privacy." },
                { icon: <Download size={18} className="text-green-500" />, text: "One-click export to Tailwind CSS, CSS Variables, and JSON." }
            ],
            techs: ["React", "TypeScript", "Canvas API", "Color.js"],
            testimonial: {
                quote: "This tool saved our design team hours of manual work. The export feature alone is worth a subscription.",
                author: "David Ross",
                role: "Product Designer",
                initials: "DR"
            }
        }
    ];

    const detailedExperience = userData?.experience || [
        {
            period: "Nov 2023 - Present",
            type: "Full-time · Remote",
            role: "Frontend Developer",
            company: "Edynamics Log",
            description: "Lead frontend developer for a logistics management platform. Responsible for modernizing the legacy UI and implementing new tracking features for enterprise clients.",
            achievements: [
                "Spearheaded the migration of the core dashboard from jQuery to Vue.js 3, improving maintainability.",
                "Integrated Google Maps Platform API for real-time fleet tracking, handling 500+ active vehicles.",
                "Implemented automated testing using Cypress, increasing code coverage to 65% in critical flows."
            ],
            techs: ["Vue.js", "TypeScript", "Google Maps API"]
        }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Page Header */}
            <section className="space-y-4 mb-20">
                <div className="flex items-center gap-2 mb-2">
                    <History className="text-blue-600 dark:text-blue-400" size={18} />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">Career History</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                    Experience & Case Studies
                </h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed font-medium">
                    A deep dive into my professional journey, highlighting key roles, specific achievements, and detailed breakdowns of select projects where I solved complex problems.
                </p>
            </section>

            {/* Case Studies */}
            <section className="space-y-16 mb-20">
                <div className="flex items-center gap-2 mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
                    <FolderOpen className="text-gray-400" size={20} />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Selected Case Studies</h2>
                </div>

                {caseStudies.map((study, idx) => (
                    <article key={idx} className="group">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-xl hover:border-blue-500/10">
                            {/* Hero Image Section */}
                            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
                                <img
                                    alt={study.title}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                                    src={study.image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-8 md:p-12">
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                        <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">{study.title}</h3>
                                        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                                            {study.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Grid */}
                            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 flex items-center gap-2">
                                            <Brain size={16} /> The Challenge
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                            {study.challenge}
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 flex items-center gap-2">
                                            <CheckCircle size={16} /> The Solution
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                            {study.solution}
                                        </p>
                                        <ul className="mt-6 space-y-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {study.results.map((result, rIdx) => (
                                                <li key={rIdx} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-transparent hover:border-green-500/10 transition-colors">
                                                    <span className="mt-0.5">{result.icon}</span>
                                                    <span>{result.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div>
                                        <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {study.techs.map((tech: any, tIdx) => (
                                                <span key={tIdx} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors hover:border-blue-500/30">
                                                    {tech.name || tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-3xl relative border border-blue-100/30 dark:border-blue-900/20">
                                        <p className="text-sm italic font-medium text-gray-700 dark:text-gray-300 relative z-10 leading-relaxed">
                                            "{study.testimonial.quote}"
                                        </p>
                                        <div className="mt-6 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[10px] font-bold text-blue-600 dark:text-blue-400">
                                                {study.testimonial.initials}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">{study.testimonial.author}</p>
                                                <p className="text-[9px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-tight">{study.testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <a className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors group" href="#">
                                        View Live Project <ExternalLink size={16} className="group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            {/* Detailed Work Experience */}
            <section id="detailed-experience">
                <div className="flex items-center justify-between mb-10 border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="flex items-center gap-2">
                        <History className="text-gray-400" size={20} />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Detailed Work Experience</h2>
                    </div>
                    <button className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline flex items-center gap-2">
                        Download Resume <Download size={14} />
                    </button>
                </div>

                <div className="space-y-16 relative pl-2 md:pl-0">
                    {detailedExperience.map((job: any, jIdx: number) => (
                        <div key={jIdx} className="grid grid-cols-1 md:grid-cols-12 gap-8 group">
                            <div className="md:col-span-3 pt-1">
                                <span className="text-[10px] font-extrabold text-gray-900 dark:text-white uppercase tracking-[0.2em] block">{job.period}</span>
                                <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-2 block">{job.type}</span>
                            </div>
                            <div className={`md:col-span-9 pb-12 border-l-2 border-gray-50 dark:border-gray-800/50 pl-8 relative last:pb-0 last:border-0`}>
                                <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-[#1F2937] shadow-sm transition-all duration-300 group-hover:scale-125 ${jIdx === 0 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>

                                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                                    {job.role}
                                </h3>
                                <h4 className="text-lg text-gray-500 dark:text-gray-400 mb-6 font-bold uppercase tracking-widest">{job.company}</h4>

                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg font-medium">
                                    {job.description}
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {(job.achievements || []).map((achievement: string, aIdx: number) => (
                                        <li key={aIdx} className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-start gap-3">
                                            <ArrowRight size={16} className="text-gray-300 dark:text-gray-600 mt-0.5 flex-shrink-0" />
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2">
                                    {(job.techs || []).map((tech: any, tIdx: number) => (
                                        <span key={tIdx} className="px-2.5 py-1 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-lg text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                            {tech.name || tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
