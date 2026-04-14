import React from 'react';
import { Container } from './components/Container';
import SocialLinks from './components/SocialLinks';
import GitHubSnake from './components/GitHubSnake';
import { ProjectCard } from './components/ProjectCard';
import { GithubProjectCard } from './components/GithubProjectCard';
import { BlogCard } from './components/BlogCard';
import Career from './components/Career';
import Education from './components/Education';
import Newsletter from './components/Newsletter';
import { MarqueeVertical } from './components/MarqueeVertical';
import IconCloud from './components/IconCloud';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { ChevronRight } from 'lucide-react';
import { CustomIcon } from './components/CustomIcon';
import { Navbar } from './components/Navbar';
import { usePortfolioSelector } from '@/store/portfolio/hooks';
import { EditableBlock } from '../../editor/EditableBlock';
import { EmptySectionCard } from './components/EmptySectionCard';
import { FolderOpen, GitBranch, BookOpen } from 'lucide-react';

export const Template03Inner: React.FC<PortfolioTemplateProps> = ({ userData = {} as any, projects = [] }) => {
    const [currentView, setCurrentView] = React.useState('home');
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const theme = usePortfolioSelector(state => state.portfolio.theme);
    const sections = usePortfolioSelector(state => state.portfolio.sections);

    // Map Redux sections to Template-03 unique features
    const showHero = sections.find(s => s.type === 'about')?.isVisible ?? true;
    const showSkills = sections.find(s => s.type === 'skills')?.isVisible ?? true;
    const showProjects = sections.find(s => s.type === 'projects')?.isVisible ?? true;
    const showResume = sections.find(s => s.type === 'resume')?.isVisible ?? true;
    const showBlogs = sections.find(s => s.type === 'header')?.isVisible ?? true;
    const showActivity = sections.find(s => s.type === 'contact')?.isVisible ?? true;
    const showFooter = sections.find(s => s.type === 'footer')?.isVisible ?? true;

    const handleNavigate = (view: string) => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    const activityHeadLine = "What I've been thinking about.";
    const activityIntro = "Sharing my daily thoughts and milestones.";

    // Tech icons for IconCloud
    const techIcons = [
        "typescript", "javascript", "react", "nextdotjs", "nodedotjs",
        "go", "postgresql", "supabase", "docker", "git", "github",
        "vercel", "tailwindcss", "prisma", "redis", "nginx", "linux", "visualstudiocode"
    ];

    const mockBlogs = [
        {
            title: "Scaling React Applications",
            date: "Mar 16, 2024",
            description: "Deep dive into performance patterns and architectural decisions for large scale frontends.",
            url: "#"
        },
        {
            title: "The Future of AI in DevTools",
            date: "Mar 10, 2024",
            description: "How LLMs are transforming the way we write and debug code in modern IDEs.",
            url: "#"
        }
    ];

    const mockProjects = [
        {
            name: "FluxUI",
            description: "A high-performance design system component library build with Radix UI and Tailwind CSS.",
            link: { href: "#", label: "fluxui.com" },
            logo: "/logos/flux.png",
            tags: ["React", "Tailwind", "Design System"]
        },
        {
            name: "Vortex Data",
            description: "Real-time analytics engine for distributed systems with built-in anomaly detection.",
            link: { href: "#", label: "vortex.io" },
            logo: "/logos/vortex.png",
            tags: ["Go", "Redis", "Analytics"]
        },
        {
            name: "Nexus API",
            description: "Next-generation API gateway for microservices with zero-latency caching.",
            link: { href: "#", label: "nexus-api.com" },
            logo: "/logos/nexus.png",
            tags: ["Node.js", "Kubernetes", "API"]
        }
    ];

    // Mock projects matching the design image/original template
    // Read active block configurations
    const aboutSection = sections.find(s => s.type === 'about');
    const projectsSection = sections.find(s => s.type === 'projects');
    const resumeSection = sections.find(s => s.type === 'resume');
    const footerSection = sections.find(s => s.type === 'footer');

    // Combine social links from userData and customData
    const mappedSocialLinks = {
        ...(userData?.socialLinks || {}),
        ...(userData?.socials || {}),
        ...(aboutSection?.customData?.socialLinks || {})
    };
    const userWithSocials = { ...userData, socialLinks: mappedSocialLinks };

    // Real projects, or fallback to mock in preview mode
    const manualProjects = projectsSection?.customData?.manualProjects || [];
    
    // Deduplicate: If we have manual (synced) projects, they take priority
    // Otherwise use the raw projects prop
    const allProjects = manualProjects.length > 0 ? manualProjects : (projects || []);
    const hasRealProjects = allProjects.length > 0;

    // In editor, don't show mocks; show the "+" (EmptySectionCard)
    // In preview, show mocks to keep it looking "full"
    const isPreviewMode = usePortfolioSelector(state => state.portfolio.isPreviewMode);
    const displayProjects = hasRealProjects ? allProjects : (isPreviewMode ? mockProjects : []);



    const mockGithubProjects = [
        {
            name: "React-Flow-Engine",
            description: "A node-based visual programming interface for React applications.",
            stargazers_count: 1240,
            forks_count: 89,
            language: "TypeScript",
            githubUrl: "#",
            isGithubRepo: true
        },
        {
            name: "Neural-Diff",
            description: "Deep learning based code comparison tool for identifying semantic changes.",
            stargazers_count: 850,
            forks_count: 45,
            language: "Python",
            githubUrl: "#",
            isGithubRepo: true
        }
    ];

    // Read active block configurations
    const skillsSection = sections.find(s => s.type === 'skills');
    
    // Map raw skill names to SimpleIcons slugs
    const slugMap: Record<string, string> = {
        'node': 'nodedotjs',
        'node.js': 'nodedotjs',
        'next.js': 'nextdotjs',
        'nextjs': 'nextdotjs',
        'reactjs': 'react',
        'tailwind': 'tailwindcss',
        'postgresql': 'postgresql',
        'sql': 'postgresql',
        'mongodb': 'mongodb',
        'mongo': 'mongodb',
        'golang': 'go',
        'git': 'git',
        'github': 'github',
        'aws': 'amazonservices',
        'docker': 'docker',
        'kubernetes': 'kubernetes',
        'typescript': 'typescript',
        'javascript': 'javascript',
        'python': 'python',
        'java': 'java',
        'c++': 'cplusplus',
        'c#': 'csharp',
        'ruby': 'ruby',
        'php': 'php',
        'rust': 'rust',
        'swift': 'swift',
        'kotlin': 'kotlin',
        'flutter': 'flutter',
        'firebase': 'firebase',
        'supabase': 'supabase',
        'graphql': 'graphql',
        'apollo': 'apollographql',
        'linux': 'linux',
        'ubuntu': 'ubuntu',
        'figma': 'figma',
        'adobe': 'adobe',
    };

    const userTechSlugs = (userData?.techStack || []).map((t: string) => {
        const lower = t.toLowerCase().trim();
        return slugMap[lower] || lower;
    });

    // Merge strategy: Use only user skills in Editor for clarity, but merge with defaults in Preview for impact
    const combinedSlugs = Array.from(new Set([...userTechSlugs, ...techIcons]));

    const displayTechSlugs = (skillsSection?.customData?.techSlugs && skillsSection.customData.techSlugs.length > 0)
        ? skillsSection.customData.techSlugs
        : isPreviewMode ? combinedSlugs : userTechSlugs;

    const blogsSection = sections.find(s => s.type === 'header');

    // Real github repos, or fallback in preview
    const realGithubProjects = allProjects.filter((p: any) => p.isGithubRepo || p.githubUrl);
    const displayGithubProjects = realGithubProjects.length > 0 ? realGithubProjects : (isPreviewMode ? mockGithubProjects : []);
    const hasAnyGithubProjects = displayGithubProjects.length > 0;



    // We try to use the raw URLs if provided in customData (simplistic approach for now)
    // In a real app we might fetch metadata for them, for now we map them to mock structure
    const customBlogs = blogsSection?.customData?.blogUrls?.map((url: string) => ({
        title: url.split('/').pop()?.replace(/-/g, ' ') || url,
        date: "Recently Added",
        description: "Read the full article here.",
        url: url
    }));

    const hasRealBlogs = (customBlogs && customBlogs.length > 0) || (userData?.blogs || []).length > 0;
    const displayBlogs = hasRealBlogs
        ? (customBlogs && customBlogs.length > 0 ? customBlogs : (userData?.blogs || []).slice(0, 4))
        : (isPreviewMode ? mockBlogs : []);


    const renderBlogsCore = () => (
        <>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl opacity-80">
                What I've thinking about.
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mb-8">
                I'm always thinking about AI, programming and life.
            </p>
            {displayBlogs.length > 0 ? (
                <div className="flex flex-col gap-12 max-w-3xl pb-16">
                    {displayBlogs.map((blog: any, idx: number) => (
                        <BlogCard key={idx} blog={blog} titleAs='h3' />
                    ))}
                    <a href="#" className="flex flex-row items-center text-sm text-[color:var(--brand-primary)] hover:opacity-80 transition-opacity capitalize font-semibold">
                        Read more blogs
                        <ChevronRight className="ml-1 h-4 w-4 stroke-current" />
                    </a>
                </div>
            ) : (
                <EmptySectionCard
                    sectionId="header"
                    icon={<BookOpen className="w-6 h-6" />}
                    title="No blog posts linked"
                    description="Paste URLs of your Medium, Hashnode, or Dev.to articles in the block settings."
                    actionLabel="Add Blog Posts"
                />
            )}
        </>
    );

    const contactSection = sections.find(s => s.type === 'contact');

    const renderAboutCore = () => {
        const customExp = resumeSection?.customData?.experiences;
        const customEdu = resumeSection?.customData?.educations;

        const displayExp = customExp && customExp.length > 0
            ? customExp.map((e: any) => ({ companyName: e.company, title: e.title, startDate: e.start, endDate: e.end }))
            : (userData?.experience || []);

        const displayEdu = customEdu && customEdu.length > 0
            ? customEdu.map((e: any) => ({ schoolName: e.school, degreeName: e.major, startDate: e.start, endDate: e.end }))
            : (userData?.education || []);

        return (
            <div className="flex flex-col gap-8">
                <div className="w-full">
                    <Career items={displayExp} />
                </div>
                <div className="w-full">
                    <Education items={displayEdu} />
                </div>
                <div className="w-full">
                    <Newsletter 
                        contactEmail={contactSection?.customData?.forwardEmail || userData?.email} 
                        socials={userData?.socials}
                        name={userData?.name}
                    />
                </div>
            </div>
        );
    };

    return (
        <div
            className={isDarkMode ? 'dark' : ''}
            style={{
                '--brand-primary': theme.primaryColor || '#10b981',
                '--brand-secondary': theme.secondaryColor || '#6366f1'
            } as React.CSSProperties}
        >
            <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative">
                <Navbar
                    currentView={currentView}
                    onNavigate={handleNavigate}
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                />
                <Container className="pt-16 md:pt-20 pb-12">
                    {currentView === 'home' && (
                        <>
                            {/* Personal Greeting */}
                            <div className="mb-4 flex flex-row items-center gap-4 text-left w-full">
                                <div className="flex-none">
                                    <img
                                        src={userData?.avatarUrl || userData?.profilePicture || "/avatar.png"}
                                        alt={userData?.name || 'Developer'}
                                        className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm object-cover"
                                    />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100">
                                    Hi, I'm <span>{userData?.name || 'Raj Singh'}</span> 👋
                                </h2>
                            </div>

                            {/* Hero Content Section */}
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl mb-20 px-4 sm:px-0">
                                {/* Left: Headline & Bio */}
                                {showHero && (
                                        <EditableBlock 
                                            id="about" 
                                            className="flex-1 text-left min-w-0"
                                        >
                                            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-100 mb-8 leading-[1.1]">
                                                {aboutSection?.customData?.headline || userData?.professionalHeadline || userData?.tagline || "Full-Stack Developer"}
                                            </h1>
                                            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mb-10 leading-relaxed">
                                                {aboutSection?.customData?.bio || userData?.professionalBio || userData?.bio || "Building high-performance software and sharing my journey with the world."}
                                            </p>
                                            <div className="flex items-center gap-6">
                                                <SocialLinks user={userWithSocials} />
                                            </div>
                                        </EditableBlock>
                                )}

                                {/* Right: Icon Cloud */}
                                {showSkills && (
                                    <div className="relative flex flex-col items-center justify-center w-full md:w-1/2 ml-auto max-w-xl">
                                        <EditableBlock id="skills" className="w-full">
                                            <div className="relative flex items-center justify-center overflow-hidden w-full">
                                                <IconCloud iconSlugs={displayTechSlugs} />
                                            </div>
                                        </EditableBlock>
                                    </div>
                                )}
                            </div>

                            {/* GitHub Snake */}
                            {showProjects && (
                                <div className="w-full max-w-4xl mt-12 mb-10 px-2 opacity-80">
                                    <GitHubSnake />
                                    <div className="mt-4 h-1 w-48 bg-[color:var(--brand-primary)] opacity-50 rounded-full" />
                                </div>
                            )}
                        </>
                    )}

                    {/* --- Projects Section --- */}
                    {(currentView === 'home' || currentView === 'projects') && showProjects && (
                        <EditableBlock id="projects">
                            <div className="mx-auto flex flex-col gap-6 my-4 py-8">
                                <h2 className="text-3xl font-bold tracking-tight md:text-5xl opacity-90">
                                    What I've done and what I'm doing.
                                </h2>
                                <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                                    I've worked on a variety of projects, from simple websites to complex web applications. And many of them are open-source. They are listed below.
                                </p>
                                {hasRealProjects ? (
                                    <ul
                                        role="list"
                                        className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
                                    >
                                        {displayProjects.map((project: any, idx: number) => (
                                            <ProjectCard key={idx} project={project} titleAs='h3' />
                                        ))}
                                    </ul>
                                ) : (
                                    <EmptySectionCard
                                        sectionId="projects"
                                        icon={<FolderOpen className="w-6 h-6" />}
                                        title="No projects yet"
                                        description="Add your projects with a live URL, description, and tags. AI will suggest the favicon automatically."
                                        actionLabel="Add Projects"
                                    />
                                )}
                            </div>

                            <div className="mx-auto flex flex-col gap-6 my-4 py-8 border-t border-zinc-100 dark:border-zinc-800/50">
                                <h2 className="flex flex-row items-center justify-start gap-3 text-xl font-semibold tracking-tight md:text-3xl opacity-80 mb-4">
                                    <CustomIcon name='github' size={28} />
                                    Open Source
                                </h2>
                                {displayGithubProjects.length > 0 ? (
                                    <ul
                                        role="list"
                                        className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
                                    >
                                        {displayGithubProjects.map((project: any, idx: number) => (
                                            <GithubProjectCard key={idx} project={project} titleAs='h3' />
                                        ))}
                                    </ul>
                                ) : (
                                    <EmptySectionCard
                                        sectionId="projects"
                                        icon={<GitBranch className="w-6 h-6" />}
                                        title="No GitHub repos linked"
                                        description="Enter your GitHub username in the project settings to auto-import your open source repos."
                                        actionLabel="Connect GitHub"
                                    />
                                )}
                            </div>
                        </EditableBlock>
                    )}

                    {/* --- Home View Grid (Blogs & About Side-by-Side) --- */}
                    {currentView === 'home' && (
                        <div className="mx-auto grid grid-cols-1 gap-y-20 lg:grid-cols-2 pt-16 pb-16 border-t border-zinc-100 dark:border-zinc-800/50">
                            {/* left column - blogs */}
                            {showBlogs && (
                                <div className="lg:pr-8">
                                    <EditableBlock id="header" className="flex flex-col gap-6">
                                        {renderBlogsCore()}
                                    </EditableBlock>
                                </div>
                            )}
                            {!showBlogs && <div />} {/* Maintain grid structure even if hidden */}

                            {/* right column - career/education/newsletter */}
                            {showResume && (
                                <div className="lg:pl-16 xl:pl-24">
                                    <EditableBlock id="resume" className="space-y-10">
                                        {renderAboutCore()}
                                    </EditableBlock>
                                </div>
                            )}
                            {!showResume && <div />}
                        </div>
                    )}

                    {/* --- Standalone Blogs --- */}
                    {currentView === 'blogs' && (
                        <div className="mx-auto flex flex-col gap-6 py-8 mt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                            {renderBlogsCore()}
                        </div>
                    )}

                    {/* --- Standalone About --- */}
                    {currentView === 'about' && (
                        <div className="mx-auto flex flex-col items-center justify-center space-y-10 py-12 max-w-2xl border-t border-zinc-100 dark:border-zinc-800/50">
                            {renderAboutCore()}
                        </div>
                    )}

                    {/* --- Activity / Social Marquee (Moved to Bottom) --- */}
                    {currentView === 'home' && showActivity && (
                        <EditableBlock id="contact" className="mx-auto flex flex-col gap-6 my-4 py-8 border-t border-zinc-100 dark:border-zinc-800/50">
                            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl opacity-80">
                                {activityHeadLine}
                            </h2>
                            <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mb-2">
                                {activityIntro}
                            </p>
                            <MarqueeVertical posts={userData?.posts || []} />
                        </EditableBlock>
                    )}
                </Container>

                {showFooter && (
                    <EditableBlock id="footer">
                        <footer className="mt-32 py-12 border-t border-zinc-100 dark:border-zinc-800/50">
                            <Container>
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                        <a href="#" className="text-[color:var(--brand-primary)] hover:opacity-80 transition-opacity">Home</a>
                                        <a href="#" className="text-[color:var(--brand-primary)] hover:opacity-80 transition-opacity">About</a>
                                        <a href="#" className="text-[color:var(--brand-primary)] hover:opacity-80 transition-opacity">Projects</a>
                                        <a href="#" className="text-[color:var(--brand-primary)] hover:opacity-80 transition-opacity">Blogs</a>
                                        <a href="#" className="text-[color:var(--brand-primary)] hover:opacity-80 transition-opacity">Privacy</a>
                                        <a href="#" className="text-[color:var(--brand-primary)] hover:opacity-80 transition-opacity">Changelog</a>
                                    </div>
                                    <div className="flex flex-col items-center md:items-end justify-between gap-4 text-sm text-zinc-500 w-full md:w-auto">
                                        <p>{footerSection?.customData?.copyright || `© ${new Date().getFullYear()} ${userData?.name || 'Raj Singh'}. All rights reserved.`}</p>
                                        <SocialLinks user={userWithSocials} className="mt-0 space-x-4" />
                                    </div>
                                </div>
                            </Container>
                        </footer>
                    </EditableBlock>
                )}
            </div>
        </div>
    );
};
