import React from 'react';
import { BookOpen, Star, GitFork, ArrowRight, ExternalLink } from 'lucide-react';
import { smartTrim } from '../lib';
import type { ContentContract } from '../lib';

const ProjectCardContract: ContentContract = {
    maxWords: 15,
};

export function GithubProjectCard({ project, titleAs }: { project: any, titleAs?: keyof JSX.IntrinsicElements }) {
    let Component = titleAs ?? 'h2';
    const displayDescription = smartTrim(project.description || project.description_short || "", ProjectCardContract);

    return (
        <li className='group relative flex flex-col items-start h-full list-none'>
            <div className="relative flex flex-col justify-between h-full w-full p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Header Row */}
                <div className="flex justify-between items-start w-full mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                        <BookOpen size={20} />
                    </div>
                    <a
                        href={project.link?.href || project.githubUrl || '#'}
                        target='_blank'
                        rel='noopener noreferrer'
                        className="p-2 rounded-lg text-zinc-400 hover:text-[color:var(--brand-primary)] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <Component className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
                        {project.name}
                    </Component>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                        {displayDescription}
                    </p>
                </div>

                {/* Stats & Link */}
                <div className="mt-auto flex items-center justify-between pt-4">
                    <div className='flex flex-row items-center gap-4 text-xs font-bold text-zinc-500'>
                        {(project.gitStars > 0 || project.stargazers_count > 0) && (
                            <div className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
                                <Star size={14} className="fill-current" />
                                {project.gitStars || project.stargazers_count}
                            </div>
                        )}
                        {(project.gitForks > 0 || project.forks_count > 0) && (
                            <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                <GitFork size={14} />
                                {project.gitForks || project.forks_count}
                            </div>
                        )}
                        {project.language && (
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-[color:var(--brand-primary)]" />
                                {project.language}
                            </div>
                        )}
                    </div>
                    <ArrowRight size={16} className="text-zinc-300 group-hover:text-[color:var(--brand-primary)] group-hover:translate-x-1 transition-all" />
                </div>
                
                {/* accessibility link */}
                <a
                    href={project.link?.href || project.githubUrl || '#'}
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
