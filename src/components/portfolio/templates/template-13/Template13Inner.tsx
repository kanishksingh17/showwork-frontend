import React, { useEffect } from 'react';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';

export const Template13Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects }) => {
    useEffect(() => {
        // Add Google Fonts
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Add Material Icons
        const icons = document.createElement('link');
        icons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined';
        icons.rel = 'stylesheet';
        document.head.appendChild(icons);

        return () => {
            document.head.removeChild(link);
            document.head.removeChild(icons);
        };
    }, []);

    const name = userData?.name || 'Nyra';
    const avatar = userData?.avatar || userData?.profileImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk91kj1XgGawihTjPTOBxWR4kUGY3mnbJxOi5ludmI1GfDv4gHHnKILZUloJXdvfAn0KgmoebfwUgaizit1MSjYgzPm_SN_q_Nf-uv233UXl1Mr8Qinv0nypslUGuvlPJWF-m0JVYfnbeQjTwj4L2OE0lrEkLb-Jnk-WyPD-99l8hb_R6Iq-59at84Dloonv5NqEMt457yuHFBJYiOLAzFy2sk9ilPU2O2D-bTM739I1pKHAlqVANqx_j2YPIgW3cDqRLmgVjnkc4';
    const bio = userData?.bio || 'I create intelligent solutions with AI, machine learning, and data science to drive the future forward.';
    const email = userData?.email || 'contact@nyra-mlops.ai';
    const socialLinks = userData?.socialLinks || {};

    const skills = (userData?.skills && userData.skills.length > 0) ? userData.skills : ['Python', 'PyTorch', 'Kubernetes', 'Docker', 'MLflow', 'Ray', 'CUDA', 'AWS', 'TensorFlow', 'Apache Spark'];

    const getSkillIcon = (skill: string) => {
        const lowerSkill = skill.toLowerCase();
        const iconMap: Record<string, string> = {
            python: 'python/python-original.svg',
            pytorch: 'pytorch/pytorch-original.svg',
            tensorflow: 'tensorflow/tensorflow-original.svg',
            kubernetes: 'kubernetes/kubernetes-plain.svg',
            docker: 'docker/docker-original.svg',
            aws: 'amazonwebservices/amazonwebservices-original-wordmark.svg',
            gcp: 'googlecloud/googlecloud-original.svg',
            azure: 'azure/azure-original.svg',
            spark: 'apachespark/apachespark-original.svg',
            postgres: 'postgresql/postgresql-original.svg',
            sql: 'postgresql/postgresql-original.svg',
            redis: 'redis/redis-original.svg',
            git: 'git/git-original.svg',
            mongodb: 'mongodb/mongodb-original.svg',
            react: 'react/react-original.svg',
            nodejs: 'nodejs/nodejs-original.svg',
            typescript: 'typescript/typescript-original.svg',
            pandas: 'pandas/pandas-original.svg',
            numpy: 'numpy/numpy-original.svg',
            scikitlearn: 'sklearn/sklearn-original.svg',
            linux: 'linux/linux-original.svg',
            github: 'github/github-original.svg',
            mlflow: 'python/python-original.svg', // Fallback for MLOps tools
            kubeflow: 'kubernetes/kubernetes-plain.svg',
            dvc: 'git/git-original.svg',
            airflow: 'python/python-original.svg',
            prometheus: 'linux/linux-original.svg',
            grafana: 'linux/linux-original.svg',
        };

        const slug = Object.keys(iconMap).find(key => lowerSkill.includes(key));
        if (slug) {
            return `https://raw.githubusercontent.com/devicons/devicon/master/icons/${iconMap[slug]}`;
        }
        return null;
    };

    const experience = userData?.experience || [
        { title: 'Senior MLOps Engineer', company: 'TechSolutions AI', period: '2021 - Present', description: 'Architected and deployed production-grade ML pipelines using Kubernetes and Kubeflow.' },
        { title: 'Data Scientist', company: 'DataFlow Systems', period: '2019 - 2021', description: 'Developed predictive models for customer churn and revenue forecasting.' }
    ];

    const displayedProjects = projects?.length > 0 ? projects.slice(0, 4) : [
        { title: 'Automated Training Pipelines', description: 'End-to-end orchestration of model training workflows, ensuring reproducibility and efficiency at scale.', icon: 'model_training' },
        { title: 'CI/CD for ML', description: 'Seamless integration and delivery pipelines tailored for machine learning artifacts and code.', icon: 'integration_instructions' },
        { title: 'Real-Time Inference', description: 'High-performance serving infrastructure designed for low-latency predictions in production environments.', icon: 'bolt' },
        { title: 'Monitoring & Drift Detection', description: 'Proactive surveillance of model performance and data quality to maintain system integrity.', icon: 'troubleshoot' }
    ];

    return (
        <div className="bg-white dark:bg-[#121212] text-[#1A1A1A] dark:text-gray-100 font-sans antialiased selection:bg-[#FFD147] selection:text-[#1A1A1A]">
            {/* Nav */}
            <nav className="sticky top-0 w-full bg-[#FFD147] py-4 px-8 flex justify-between items-center text-[#1A1A1A] z-50 shadow-sm">
                <div className="flex items-center gap-12">
                    <a href="#" className="flex items-center gap-2 font-['Space_Grotesk'] font-bold text-xl tracking-tight">
                        <svg className="text-[#1A1A1A]" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                        </svg>
                        {name}
                    </a>
                    <div className="hidden md:flex gap-8 text-sm font-medium">
                        <a className="hover:opacity-75 transition-opacity" href="#about">About</a>
                        <a className="hover:opacity-75 transition-opacity" href="#expertise">Expertise</a>
                        <a className="hover:opacity-75 transition-opacity" href="#experience">Experience</a>
                        <a className="hover:opacity-75 transition-opacity" href="#contact">Contact</a>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => window.location.href = '#contact'} className="bg-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-[#1A1A1A]">Let's Connect</button>
                    <button className="bg-white p-2.5 rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-[#1A1A1A] flex items-center justify-center">
                        <span className="material-icons-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="about" className="bg-[#FFD147] pt-16 pb-32 px-6 md:px-12 lg:px-24 rounded-b-[3rem] relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-7">
                        <h1 className="font-['Space_Grotesk'] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-[#1A1A1A] mb-8">
                            Empowering Innovation <br />
                            Through AI & Data <br />
                            Science
                        </h1>
                    </div>
                    <div className="lg:col-span-5 flex flex-col justify-start lg:pt-4">
                        <p className="text-[#1A1A1A]/80 text-lg leading-relaxed mb-8 max-w-md">
                            {bio}
                        </p>
                        <button onClick={() => window.location.href = '#expertise'} className="bg-white text-[#1A1A1A] px-8 py-3.5 rounded-xl font-bold self-start hover:shadow-xl transition-all transform hover:-translate-y-1 inline-flex items-center gap-2">
                            Explore Portfolio
                        </button>
                    </div>
                </div>
                <div className="mt-16 relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                    <img alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={avatar} />
                </div>
            </section>

            {/* Tech Stack Section (Replacing Logoipsum) */}
            <div className="bg-white dark:bg-[#121212] py-20 border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-center justify-center mb-10 text-center">
                        <span className="text-[#6B46C1] font-semibold tracking-wider uppercase text-xs mb-3 block">Technology Stack</span>
                        <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-[#1A1A1A] dark:text-white">Engineering Toolkit</h2>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-80">
                        {skills.map((skill: string, idx: number) => {
                            const iconUrl = getSkillIcon(skill);
                            return (
                                <div key={idx} className="flex flex-col items-center gap-3 transition-all transform hover:scale-110 group cursor-default">
                                    <div className="w-16 h-16 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-2xl group-hover:bg-[#FFD147]/10 transition-all border border-transparent group-hover:border-[#FFD147]/20">
                                        <div className="w-10 h-10 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                                            {iconUrl ? (
                                                <img src={iconUrl} alt={skill} className="w-full h-full object-contain" />
                                            ) : (
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg ${idx % 2 === 0 ? 'bg-[#FFD147]' : 'bg-[#6B46C1]'}`}>
                                                    {skill.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <span className="font-['Space_Grotesk'] font-bold text-[10px] md:text-xs tracking-wider text-[#1A1A1A]/60 dark:text-gray-400 group-hover:text-[#6B46C1] uppercase">
                                        {skill}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Capabilities Section */}
            <section id="expertise" className="py-24 px-6 md:px-12 lg:px-24 bg-[#F9FAFB] dark:bg-[#121212]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="text-[#6B46C1] font-semibold tracking-wider uppercase text-sm mb-2 block">Expertise</span>
                            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-[#1A1A1A] dark:text-white">
                                MLOps Capabilities
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md text-lg leading-relaxed">
                            Bridging the gap between data science and production with robust, scalable infrastructure.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                        {displayedProjects.map((project: any, idx: number) => (
                            <div key={idx} className="group bg-white dark:bg-[#1E1E1E] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <div className={`w-12 h-12 ${idx % 2 === 0 ? 'bg-purple-100 dark:bg-purple-900/30 text-[#6B46C1]' : 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <span className="material-icons-outlined text-2xl">{project.icon || 'star'}</span>
                                </div>
                                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#1A1A1A] dark:text-white mb-3">{project.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-[#1A1A1A] dark:bg-black rounded-3xl p-8 md:p-12 lg:p-16 text-white relative overflow-hidden mb-24">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD147] rounded-full blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6B46C1] rounded-full blur-[100px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="h-px w-8 bg-[#FFD147]"></div>
                                <h3 className="text-[#FFD147] font-medium tracking-wide uppercase text-sm">Performance Metrics</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
                                <div className="flex flex-col gap-2 pt-8 md:pt-0 md:pl-0">
                                    <span className="font-['Space_Grotesk'] text-5xl md:text-6xl font-bold text-white tracking-tighter">99.9%</span>
                                    <span className="text-gray-400 text-lg font-medium">System Uptime</span>
                                    <p className="text-gray-500 text-sm mt-2 max-w-xs">Ensuring critical ML services are available when needed most.</p>
                                </div>
                                <div className="flex flex-col gap-2 pt-8 md:pt-0 md:pl-12">
                                    <span className="font-['Space_Grotesk'] text-5xl md:text-6xl font-bold text-white tracking-tighter">120<span className="text-3xl text-[#FFD147] align-baseline ml-1">ms</span></span>
                                    <span className="text-gray-400 text-lg font-medium">Inference Latency</span>
                                    <p className="text-gray-500 text-sm mt-2 max-w-xs">Optimized serving layers for lightning-fast predictions.</p>
                                </div>
                                <div className="flex flex-col gap-2 pt-8 md:pt-0 md:pl-12">
                                    <span className="font-['Space_Grotesk'] text-5xl md:text-6xl font-bold text-white tracking-tighter">20+</span>
                                    <span className="text-gray-400 text-lg font-medium">Deployed Models</span>
                                    <p className="text-gray-500 text-sm mt-2 max-w-xs">Successfully managing a diverse portfolio of production models.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline / Experience Section */}
                    <div id="experience" className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="h-px w-8 bg-[#6B46C1]"></div>
                            <h3 className="text-[#6B46C1] font-medium tracking-wide uppercase text-sm">Professional Timeline</h3>
                        </div>
                        <div className="space-y-12">
                            {experience.map((exp: any, idx: number) => (
                                <div key={idx} className="relative pl-8 md:pl-0">
                                    <div className="md:grid md:grid-cols-12 md:gap-12">
                                        <div className="md:col-span-3 mb-2 md:mb-0">
                                            <span className="text-[#1A1A1A] dark:text-gray-400 font-bold font-['Space_Grotesk']">{exp.period}</span>
                                        </div>
                                        <div className="md:col-span-9 relative">
                                            <div className="absolute -left-10 md:-left-16 top-1.5 w-4 h-4 rounded-full bg-[#FFD147] border-4 border-white dark:border-[#121212] z-10"></div>
                                            {idx !== experience.length - 1 && (
                                                <div className="absolute -left-8 md:-left-[3.7rem] top-4 w-px h-[calc(100%+3rem)] bg-gray-200 dark:bg-gray-800"></div>
                                            )}
                                            <h4 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-1">{exp.title}</h4>
                                            <p className="text-[#6B46C1] font-medium mb-3">{exp.company}</p>
                                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-[#FFD147] font-semibold tracking-wider uppercase text-sm mb-4 block">Get In Touch</span>
                            <h2 className="font-['Space_Grotesk'] text-5xl md:text-6xl font-bold text-[#1A1A1A] dark:text-white mb-8">
                                Ready to scale <br />
                                your AI vision?
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-md">
                                Let's build robust, production-ready machine learning systems together. Drop me a line or find me on socials.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-[#FFD147] transition-colors">
                                        <span className="material-icons-outlined text-xl">email</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email</p>
                                        <p className="text-lg font-bold dark:text-gray-200">{email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-[#FFD147] transition-colors">
                                        <span className="material-icons-outlined text-xl">public</span>
                                    </div>
                                    <div className="flex gap-4">
                                        {Object.entries(socialLinks).map(([platform, url]) => (
                                            <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-[#6B46C1] capitalize transition-colors">
                                                {platform}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#FFD147] p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <form className="relative z-10 space-y-6" onSubmit={e => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Name</label>
                                        <input className="w-full bg-white/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6B46C1] outline-none transition-all placeholder-[#1A1A1A]/30" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Email</label>
                                        <input className="w-full bg-white/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6B46C1] outline-none transition-all placeholder-[#1A1A1A]/30" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Message</label>
                                    <textarea className="w-full bg-white/50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6B46C1] outline-none transition-all placeholder-[#1A1A1A]/30" rows={4} placeholder="Tell me about your project..."></textarea>
                                </div>
                                <button className="w-full bg-[#1A1A1A] text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                                    Send Message
                                    <span className="material-icons-outlined group-hover:translate-x-1 transition-transform">send</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white dark:bg-[#121212] py-12 border-t border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 dark:text-gray-500 text-sm">
                    © {new Date().getFullYear()} {name} MLOps Portfolio. Built with precision and distributed with care.
                </div>
            </footer>
        </div>
    );
};
