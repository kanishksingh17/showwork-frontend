import React from 'react';
import { Container } from './components/Container';
import SocialLinks from './components/SocialLinks';
import GitHubSnake from './components/GitHubSnake';
import { ProjectCard } from './components/ProjectCard';
import { GithubProjectCard } from './components/GithubProjectCard';
import { BlogCard } from './components/BlogCard';
import Career from './components/Career';
import Education from './components/Education';
import Feed from './components/Feed';
import { MarqueeVertical } from './components/MarqueeVertical';
import IconCloud from './components/IconCloud';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { ChevronRight } from 'lucide-react';
import { CustomIcon } from './components/CustomIcon';
import { Navbar } from './components/Navbar';

export const Template03Inner: React.FC<PortfolioTemplateProps> = ({ userData = {} as any, projects = [] }) => {

    const activityHeadLine = "What I've been thinking about.";
    const activityIntro = "Sharing my daily thoughts and milestones.";

    // Tech icons for IconCloud
    const techIcons = [
        "typescript", "javascript", "react", "nextdotjs", "nodedotjs",
        "go", "postgresql", "supabase", "docker", "git", "github",
        "vercel", "tailwindcss", "prisma", "redis", "nginx", "linux", "visualstudiocode"
    ];

    // Mock projects matching the design image/original template
    const mockProjects = [
        {
            name: 'CalmBreath',
            description: 'A minimal mindfulness app focused on breathing techniques and stress reduction.',
            link: { href: 'https://calmbreath.io', label: 'CalmBreath' },
            logo: '/images/icon/breathe-app-icon.png',
            tags: ['App', 'iOS']
        },
        {
            name: 'AI Tool Directory',
            description: 'A curated list of the best AI-powered tools on the market.',
            link: { href: 'https://aitools.directory', label: 'AI Tool Directory' },
            logo: '/images/icon/aibesttools.png',
            tags: ['AI', 'Directory']
        },
        {
            name: 'Startup Navigator',
            description: 'Your comprehensive guide to startup directories and resources.',
            link: { href: 'https://startupnavigator.com', label: 'Startup Navigator' },
            logo: '/images/icon/bestdirectories.png',
            tags: ['Resources', 'Startup']
        },
        {
            name: 'SEO Explore',
            description: 'Explore all the best SEO tools in one place.',
            link: { href: 'https://seoexplore.com', label: 'SEO Explore' },
            logo: '/images/icon/domainscore.png',
            tags: ['SEO']
        },
        {
            name: 'GitHub Visualizer',
            description: 'Turn your GitHub metrics into beautiful visual reports.',
            link: { href: 'https://githubvisualizer.io', label: 'GitHub Visualizer' },
            logo: '/images/icon/github-cards.png',
            tags: ['Visual Cards', 'GitHub Metrics']
        }
    ];

    const displayProjects = projects.length > 0 ? projects : mockProjects;

    // Open source projects fallback
    const mockGithubProjects = [
        {
            name: 'FullStack Starter',
            description: 'An open-source, database-free boilerplate for modern web apps.',
            githubUrl: 'https://github.com/raj-dev/fullstack-starter',
            isGithubRepo: true
        },
        {
            name: 'Theme Generator',
            description: 'A CLI tool for generating color palettes and themes for various frameworks.',
            githubUrl: 'https://github.com/raj-dev/theme-gen',
            isGithubRepo: true
        },
        {
            name: 'React Dashboard Template',
            description: 'A high-performance admin dashboard template built with React and Tailwind CSS.',
            githubUrl: 'https://github.com/raj-dev/react-dash',
            isGithubRepo: true
        }
    ];

    const displayGithubProjects = projects.filter((p: any) => p.isGithubRepo || p.githubUrl).length > 0
        ? projects.filter((p: any) => p.isGithubRepo || p.githubUrl)
        : mockGithubProjects;

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative">
            <Navbar />
            <Container className="pt-6 pb-12">
                {/* Personal Greeting */}
                <div className="mb-4 flex flex-row items-center gap-4 text-left w-full">
                    <div className="flex-none">
                        <img
                            src="/avatar.png"
                            alt={userData?.name || 'Developer'}
                            className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm object-cover"
                        />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100">
                        Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">{userData?.name || 'Raj Singh'}</span> 👋
                    </h2>
                </div>

                {/* Hero Content Section */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl mb-20 px-4 sm:px-0">
                    {/* Left: Headline & Bio */}
                    <div className="flex-1 text-left min-w-0">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-100 mb-8 leading-[1.1]">
                            Full-Stack Developer from India, building scalable web experiences.
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mb-10 leading-relaxed">
                            Building high-performance and open-source software loved by millions. I specialize in building full-stack platforms that scale and sharing my journey with the world.
                        </p>
                        <div className="flex items-center gap-6">
                            <SocialLinks user={userData} />
                            <a
                                href={`mailto:${userData?.email || 'contact@rajsingh.dev'}`}
                                className="group flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors"
                            >
                                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/40">
                                    <CustomIcon name="email" size={20} />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right: Icon Cloud */}
                    <div className="relative flex items-center justify-center overflow-hidden w-full md:w-1/2 ml-auto max-w-xl">
                        <IconCloud iconSlugs={techIcons} />
                    </div>
                </div>

                {/* GitHub Snake */}
                <div className="w-full max-w-4xl mt-12 mb-10 px-2 opacity-80">
                    <GitHubSnake />
                    <div className="mt-4 h-1 w-48 bg-emerald-400/50 rounded-full" />
                </div>

                {/* projects */}
                <div className="mx-auto flex flex-col gap-6 my-4 py-8">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl opacity-90">
                        What I've done and what I'm doing.
                    </h2>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                        I've worked on a variety of projects, from simple websites to complex web applications. And many of them are open-source. They are listed below.
                    </p>
                    <ul
                        role="list"
                        className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
                    >
                        {displayProjects.map((project: any, idx: number) => (
                            <ProjectCard key={idx} project={project} titleAs='h3' />
                        ))}
                    </ul>
                </div>

                {/* github / open source projects */}
                <div className="mx-auto flex flex-col gap-6 my-4 py-8 border-t border-zinc-100 dark:border-zinc-800/50">
                    <h2 className="flex flex-row items-center justify-start gap-3 text-xl font-semibold tracking-tight md:text-3xl opacity-80 mb-4">
                        <CustomIcon name='github' size={28} />
                        Open Source
                    </h2>
                    <ul
                        role="list"
                        className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
                    >
                        {displayGithubProjects.map((project: any, idx: number) => (
                            <GithubProjectCard key={idx} project={project} titleAs='h3' />
                        ))}
                    </ul>
                </div>

                {/* blogs / thoughts */}
                <div className="mx-auto flex flex-col gap-6 py-8 my-8 border-t border-zinc-100 dark:border-zinc-800/50">
                    <h2 className="text-3xl font-semibold tracking-tight md:text-5xl opacity-80">
                        What I've thinking about.
                    </h2>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mb-8">
                        I'm always thinking about AI, programming and life.
                    </p>
                </div>

                <div className="mx-auto grid grid-cols-1 gap-y-20 lg:grid-cols-2 pb-16">
                    {/* left column - blogs */}
                    <div className="flex flex-col gap-16">
                        {(userData?.blogs || []).length > 0 ? (
                            (userData?.blogs || []).slice(0, 4).map((blog: any, idx: number) => (
                                <BlogCard key={idx} blog={blog} titleAs='h3' />
                            ))
                        ) : (
                            <p className="text-sm text-zinc-500 italic">No blog posts yet.</p>
                        )}
                        <a href="#" className="flex flex-row items-center text-sm text-purple-600 dark:text-purple-400 hover:underline capitalize font-semibold">
                            Read more blogs
                            <ChevronRight className="ml-1 h-4 w-4 stroke-current" />
                        </a>
                    </div>

                    {/* right column - career/education/feed */}
                    <div className="space-y-10 lg:pl-16 xl:pl-24">
                        <Career items={userData?.experience || []} />
                        <Education items={userData?.education || []} />
                        <Feed username={userData?.name || "User"} />
                    </div>
                </div>

                {/* Activity / Social section */}
                <div className="mx-auto flex flex-col gap-6 my-4 py-8 border-t border-zinc-100 dark:border-zinc-800/50">
                    <h2 className="text-3xl font-semibold tracking-tight md:text-5xl opacity-80">
                        {activityHeadLine}
                    </h2>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mb-2">
                        {activityIntro}
                    </p>
                    <MarqueeVertical posts={userData?.posts || []} />
                </div>
            </Container>

            <footer className="mt-32 py-12 border-t border-zinc-100 dark:border-zinc-800/50">
                <Container>
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row text-sm text-zinc-500">
                        <p>© {new Date().getFullYear()} {userData?.name || 'Developer'}. All rights reserved.</p>
                        <SocialLinks user={userData || {}} className="mt-0 space-x-4" />
                    </div>
                </Container>
            </footer>
        </div>
    );
};
