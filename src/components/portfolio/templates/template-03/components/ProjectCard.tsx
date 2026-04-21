import React from 'react';
import { ExternalLink, Code, Globe, Database, Terminal, Cpu } from 'lucide-react';
import { smartTrim } from '../lib';
import type { ContentContract } from '../lib';

const ProjectCardContract: ContentContract = {
    maxWords: 15, // Enforce one-line feel
};

// Helper to get a high-res favicon from a URL
const getFaviconUrl = (url?: string) => {
    if (!url) return null;
    try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
        // Avoid repetitive GitHub logos - prioritized tech-specific icons look better for repos
        if (domain.includes('github.com')) return null; 
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch (e) {
        return null;
    }
};

// Helper to get a tech icon if no custom logo provided
const getTechIcon = (tags: string[], title: string = "") => {
    const combined = (tags.join(' ') + ' ' + title).toLowerCase();
    
    // Title-based detection (high impact)
    if (combined.includes('chrome') || combined.includes('extension')) return <Globe className="w-6 h-6 text-blue-400" />;
    if (combined.includes('chat') || combined.includes('float')) return <Globe className="w-6 h-6 text-cyan-400" />;
    if (combined.includes('brain') || combined.includes('cerebro') || combined.includes('ai') || combined.includes('ml')) return <Cpu className="w-6 h-6 text-purple-400" />;
    
    // Tag-based fallbacks
    if (combined.includes('react') || combined.includes('frontend')) return <Globe className="w-6 h-6 text-blue-500" />;
    if (combined.includes('node') || combined.includes('backend') || combined.includes('go')) return <Terminal className="w-6 h-6 text-green-500" />;
    if (combined.includes('database') || combined.includes('sql') || combined.includes('mongo')) return <Database className="w-6 h-6 text-amber-500" />;
    
    return <Code className="w-6 h-6 text-zinc-400" />;
};

export function ProjectCard({ project, titleAs }: { project: any, titleAs?: keyof JSX.IntrinsicElements }) {
    let Component = titleAs ?? 'h2';
    const displayDescription = smartTrim(project.description || project.description_short || "", ProjectCardContract);
    const tags = project.tags || (project.technologies?.map((t: any) => t.name || t)) || [];
    const projectName = project.name || project.title || "";
    
    // Icon Logic Priority: Custom Logo > Live URL Favicon > Tech/Title Icon
    const projectUrl = project.link?.href || project.liveUrl || project.githubUrl;
    const faviconUrl = getFaviconUrl(projectUrl);

    return (
        <li className='group relative flex flex-col items-start h-full list-none'>
            <div className="relative flex flex-col justify-between h-full w-full p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Header Row: Icon and Link */}
                <div className="flex justify-between items-start w-full mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 overflow-hidden shadow-inner p-2">
                        {project.logo || project.imageUrl ? (
                            <img src={project.logo || project.imageUrl} alt={projectName} className="h-8 w-8 object-contain" />
                        ) : faviconUrl ? (
                            <img src={faviconUrl} alt={projectName} className="h-7 w-7 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                        ) : (
                            getTechIcon(tags, projectName)
                        )}
                    </div>
                    <a
                        href={project.link?.href || project.githubUrl || project.liveUrl || '#'}
                        target='_blank'
                        rel='noopener noreferrer'
                        className="p-2 rounded-lg text-zinc-400 hover:text-[color:var(--brand-primary)] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                    >
                        <ExternalLink className="h-5 w-5" />
                    </a>
                </div>

                {/* Content Segment */}
                <div className="mb-4">
                    <Component className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 leading-tight">
                        {project.name || project.title}
                    </Component>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                        {displayDescription}
                    </p>
                </div>

                {/* Tags Segment */}
                <div className="mt-auto">
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {tags.slice(0, 3).map((tag: any, index: number) => (
                                <span
                                    key={index}
                                    className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-tighter"
                                >
                                    #{tag.name || tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Full cover link for accessibility/ease */}
                <a
                    href={project.link?.href || project.githubUrl || project.liveUrl || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='absolute inset-0 z-10 opacity-0'
                >
                    {project.name}
                </a>
            </div>
        </li>
    );
}
