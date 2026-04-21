import React from 'react';
import { Linkedin, Twitter, Github, Mail, FileText, Download } from 'lucide-react';

export const SocialBlocks: React.FC<{ userData: any; customData?: any }> = ({ userData, customData }) => {
    const socials = userData?.socialLinks || userData?.socials || {};

    const defaultLinks = [
        { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={20} className="text-blue-600 dark:text-blue-400" />, href: socials.linkedin || "#", color: "hover:bg-blue-50 dark:hover:bg-blue-900/20" },
        { id: 'twitter', label: 'Twitter', icon: <Twitter size={20} className="text-sky-500" />, href: socials.twitter || socials.x || "#", color: "hover:bg-sky-50 dark:hover:bg-sky-900/20" },
        { id: 'github', label: 'Github', icon: <Github size={20} className="text-gray-800 dark:text-white" />, href: socials.github || "#", color: "hover:bg-gray-100 dark:hover:bg-gray-700" },
        { id: 'email', label: 'Email', icon: <Mail size={20} className="text-red-500" />, href: `mailto:${userData?.email || "#"}`, color: "hover:bg-red-50 dark:hover:bg-red-900/20" }
    ];

    const ctaTitle = customData?.ctaTitle || "Need a printed document?";
    const ctaSubtitle = customData?.ctaSubtitle || "Hover to download resume";
    
    // Mapping customData socials if they exist
    const links = customData?.socials ? customData.socials.map((s: any) => ({
        id: s.platform.toLowerCase(),
        label: s.label || s.platform,
        icon: s.platform.toLowerCase().includes('git') ? <Github size={20} /> : s.platform.toLowerCase().includes('link') ? <Linkedin size={20} /> : <Globe size={20} />,
        href: s.url,
        color: "hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
    })) : defaultLinks;

    return (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
                {links.map((link) => (
                    <a
                        key={link.id}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl transition-all duration-300 group ${link.color} shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-700`}
                    >
                        <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                            {link.icon}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{link.label}</span>
                    </a>
                ))}
            </div>

            <div className="md:col-span-8 flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-8 relative overflow-hidden group hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 shadow-sm">
                <div className="z-10 relative">
                    <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">{ctaTitle}</h3>
                    <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-2">
                        <Download size={14} className="text-indigo-500" />
                        {ctaSubtitle}
                    </p>
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-gray-50/50 dark:from-gray-900/50 to-transparent pointer-events-none"></div>

                <div className="text-gray-100 dark:text-gray-700 absolute -right-6 -bottom-8 transform -rotate-12 group-hover:rotate-0 group-hover:text-indigo-500/10 dark:group-hover:text-indigo-400/10 transition-all duration-700 ease-out pointer-events-none">
                    <FileText size={180} strokeWidth={0.5} />
                </div>

                <button className="relative z-10 p-3 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 shadow-md">
                    <Download size={20} />
                </button>
            </div>
        </section>
    );
};
