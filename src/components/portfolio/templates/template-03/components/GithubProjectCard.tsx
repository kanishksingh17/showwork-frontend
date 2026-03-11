import React from 'react';
import { BookOpen, Star, GitFork, ArrowRight } from 'lucide-react';
import { smartTrim, ProjectCardContract } from '../lib';

export function GithubProjectCard({ project, titleAs }: { project: any, titleAs?: keyof JSX.IntrinsicElements }) {
    let Component = titleAs ?? 'h2';

    // Systematic Trimming (AI output != UI output)
    const displayDescription = smartTrim(project.description, ProjectCardContract);

    return (
        <li className='group relative flex flex-col items-start h-full list-none'>
            <div className="relative flex flex-col justify-between h-full w-full py-5 px-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all group-hover:scale-[1.03] group-hover:shadow-md group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900/50">
                <div className=''>
                    <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-2 text-zinc-900 dark:text-zinc-100'>
                        <BookOpen size={20} className="text-zinc-500" />
                        <Component className="text-sm font-semibold tracking-tight">
                            {project.name}
                        </Component>
                    </div>
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {displayDescription}
                    </p>
                </div>

                <div className="relative z-10 mt-auto pt-4">
                    <div className='flex flex-row items-center gap-2 text-xs font-semibold opacity-80 text-zinc-500'>
                        {project.gitStars > 0 && (
                            <div className="flex items-center gap-1">
                                <Star size={16} />
                                {project.gitStars}
                            </div>
                        )}
                        {project.gitForks > 0 && (
                            <div className="flex items-center gap-1">
                                <GitFork size={16} />
                                {project.gitForks}
                            </div>
                        )}
                    </div>
                </div>
                <a
                    href={project.link?.href || project.githubUrl || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='absolute inset-0 z-20'>
                    <ArrowRight className="absolute bottom-6 right-4 h-4 w-4 text-zinc-400 group-hover:text-purple-500 translation-colors" />
                </a>
            </div>
        </li>
    );
}
