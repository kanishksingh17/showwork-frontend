import React from 'react';
import { Hash, ExternalLink } from 'lucide-react';
import { smartTrim, ProjectCardContract } from '../lib';

export function ProjectCard({ project, titleAs }: { project: any, titleAs?: keyof JSX.IntrinsicElements }) {
    let Component = titleAs ?? 'h2';

    // Systematic Trimming (AI output != UI output)
    const displayDescription = smartTrim(project.description, ProjectCardContract);

    return (
        <li className='group relative flex flex-col items-start h-full list-none'>
            <div className="relative flex flex-col justify-between h-full w-full p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all group-hover:scale-[1.03] group-hover:shadow-md group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900/50">
                <div className=''>
                    <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-4'>
                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                            {project.logo ? (
                                <img src={project.logo} alt={`${project.name} logo`} className="h-8 w-8 object-contain" />
                            ) : (
                                <span className="text-xl">🚀</span>
                            )}
                        </div>
                        <Component className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                            {project.name}
                        </Component>
                    </div>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 ml-2">
                        {displayDescription}
                    </p>
                </div>

                <div className="relative z-10 mt-auto pt-4 ml-1">
                    {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-x-2 items-center">
                            {project.tags.map((tag: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center space-x-0.5"
                                >
                                    <Hash className="w-3 h-3 text-zinc-500" />
                                    <span className="text-xs text-zinc-500 tracking-tighter">
                                        {tag.name || tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <a
                    href={project.link?.href || project.liveUrl || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='absolute inset-0 z-20'>
                    <ExternalLink className="absolute top-4 right-4 h-4 w-4 text-zinc-400 group-hover:text-purple-500 transition-colors" />
                </a>
            </div>
        </li>
    );
}
