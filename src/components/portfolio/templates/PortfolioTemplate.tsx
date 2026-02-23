/**
 * PortfolioTemplate.tsx
 *
 * The single portfolio template used by ShowWork.
 * Wrapped with `withPortfolioTemplate` HOC which:
 *   - Fetches /api/portfolio/data on mount
 *   - Shows a preloader animation
 *   - Populates the Redux store with user + projects from the backend
 *
 * To add a new template variant: create a new inner content component
 * and export it wrapped with withPortfolioTemplate. The HOC handles
 * all infrastructure automatically.
 */

import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import {
    AiFillGithub, AiFillLinkedin,
    AiOutlineHome, AiOutlineUser,
    AiOutlineFundProjectionScreen, AiOutlineContacts,
} from 'react-icons/ai';
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { CgFileDocument } from 'react-icons/cg';
import { BsGithub } from 'react-icons/bs';
import { Provider } from 'react-redux';
import { portfolioStore } from '@/store/portfolio';
import { usePortfolioSelector } from '@/store/portfolio/hooks';
import { withPortfolioTemplate, type PortfolioTemplateProps } from './withPortfolioTemplate';
import { getTechIcon } from '@/utils/getTechIcon';

// ─── Navigation items ─────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { label: 'Home', href: '#home', icon: <AiOutlineHome /> },
    { label: 'About', href: '#about', icon: <AiOutlineUser /> },
    { label: 'Skills', href: '#skills', icon: <CgFileDocument /> },
    { label: 'Projects', href: '#projects', icon: <AiOutlineFundProjectionScreen /> },
    { label: 'Resume', href: '#resume', icon: <CgFileDocument /> },
    { label: 'Contact', href: '#contact', icon: <AiOutlineContacts /> },
];

// ─── Sticky navbar with scroll effect + mobile menu ──────────────────────────
const Navbar: React.FC<{ userName: string }> = ({ userName }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY >= 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1b1a2ea9] shadow-lg backdrop-blur-md' : 'bg-transparent'
                }`}
            style={{ padding: '0.3rem 2rem', fontSize: '1.2rem' }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <a href="#home" className="text-white font-bold text-xl tracking-wide">
                    {userName || 'Portfolio'}
                </a>

                {/* Desktop */}
                <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                    {NAV_ITEMS.map(item => (
                        <li key={item.label} className="relative group">
                            <a
                                href={item.href}
                                className="text-white px-4 py-2 block hover:text-purple-400 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 rounded transition-all duration-300 group-hover:w-full" />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-white flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-purple-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-purple-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-purple-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-[#181a27] border-t border-purple-900/40 px-4 py-3">
                    {NAV_ITEMS.map(item => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 text-white py-2 px-3 hover:text-purple-400 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            <span className="text-purple-500">{item.icon}</span> {item.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

// ─── Social icons row ─────────────────────────────────────────────────────────
const SocialIcons: React.FC<{ socials: any; className?: string }> = ({ socials = {}, className = '' }) => {
    const cls = `inline-flex items-center justify-center w-10 h-10 rounded-full
        bg-gray-700/80 text-purple-400 text-xl hover:bg-purple-600 hover:text-white
        hover:shadow-[0_0_12px_#7500fa] transition-all duration-300`;
    return (
        <ul className={`flex gap-3 list-none p-0 m-0 flex-wrap ${className}`}>
            {socials.github && <li><a href={socials.github} target="_blank" rel="noopener noreferrer" className={cls}><AiFillGithub /></a></li>}
            {socials.linkedin && <li><a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={cls}><AiFillLinkedin /></a></li>}
            {socials.twitter && <li><a href={socials.twitter} target="_blank" rel="noopener noreferrer" className={cls}><FaTwitter /></a></li>}
            {socials.instagram && <li><a href={socials.instagram} target="_blank" rel="noopener noreferrer" className={cls}><FaInstagram /></a></li>}
            {socials.leetcode && <li><a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className={cls}><SiLeetcode /></a></li>}
        </ul>
    );
};

// ─── Hero (Home + Introduce Myself) ──────────────────────────────────────────
const HeroSection: React.FC<{ userData: any }> = ({ userData }) => {
    const name = userData.name || 'Your Name';
    const rawTitle = userData.title || 'Software Developer';
    const titles = rawTitle.split(',').map((t: string) => t.trim()).filter(Boolean);
    const avatar = userData.profileImage || userData.avatar;
    const socials = userData.socials || userData.socialLinks || {};

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col justify-center"
            style={{ background: 'linear-gradient(to bottom left,rgba(5,8,40,0.87),rgba(1,4,39,0.925))', paddingTop: 80 }}
        >
            <div className="max-w-7xl mx-auto px-6 w-full">
                {/* Top: greeting + avatar */}
                <div className="grid md:grid-cols-2 gap-12 items-center pb-20">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                            Hi There!{' '}
                            <span className="inline-block" style={{ animation: 'wave 2.1s ease-in-out infinite', transformOrigin: '70% 70%' }}>
                                👋🏻
                            </span>
                        </h1>
                        <h1 className="text-5xl md:text-6xl font-bold text-white uppercase">
                            I'M <strong style={{ color: '#7500fa' }}>{name}</strong>
                        </h1>
                        <div style={{ minHeight: 48, color: '#7500fa', fontSize: '1.8rem', fontWeight: 600 }}>
                            <Typewriter options={{ strings: titles, autoStart: true, loop: true, deleteSpeed: 50 }} />
                        </div>
                        <SocialIcons socials={socials} className="pt-2" />
                        <a href="#about" className="inline-block mt-4 px-8 py-3 rounded-full text-white font-semibold" style={{ background: '#7500fa' }}>
                            Find out more
                        </a>
                    </div>

                    {avatar && (
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(#7500fa,transparent)' }} />
                                <img
                                    src={avatar} alt={name}
                                    className="relative rounded-full w-72 h-72 md:w-80 md:h-80 object-cover"
                                    style={{ border: '3px solid #7500fa', boxShadow: '0 0 30px rgba(117,0,250,0.4)' }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom: Introduce myself */}
                <div id="about" className="grid md:grid-cols-3 gap-12 items-center py-16 border-t border-purple-900/30">
                    <div className="md:col-span-2 space-y-5">
                        <h1 className="text-3xl font-bold text-white uppercase">
                            Let Me <span style={{ color: '#7500fa' }}>Introduce</span> Myself
                        </h1>
                        <div className="text-lg text-gray-300 leading-relaxed space-y-3">
                            {(userData.bio || 'Tell something about yourself.').split('\n').map((p: string, i: number) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative w-48 h-48">
                            <div className="absolute inset-0 rounded-full blur-3xl opacity-20" style={{ background: '#7500fa' }} />
                            <div className="relative w-full h-full border-2 border-purple-500/30 rounded-full flex items-center justify-center">
                                <span className="text-6xl">👨‍💻</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes wave { 0%{transform:rotate(0)} 10%{transform:rotate(14deg)} 20%{transform:rotate(-8deg)} 30%{transform:rotate(14deg)} 40%{transform:rotate(-4deg)} 50%{transform:rotate(10deg)} 60%{transform:rotate(0)} 100%{transform:rotate(0)} }
                ::-webkit-scrollbar{width:7px} ::-webkit-scrollbar-track{background:#2d005c} ::-webkit-scrollbar-thumb{background:rgba(77,1,165,.96);border-radius:12px} ::-webkit-scrollbar-thumb:hover{background:rgb(121,7,250)}
            `}</style>
        </section>
    );
};

// ─── Skills ───────────────────────────────────────────────────────────────────
const MAJOR_TECH = new Set([
    'react', 'angular', 'vue', 'node.js', 'nodejs', 'python', 'java', 'c++', 'c#', 'typescript',
    'javascript', 'html', 'css', 'sql', 'mongodb', 'postgresql', 'mysql', 'aws', 'docker',
    'kubernetes', 'git', 'go', 'rust', 'ruby', 'php', 'swift', 'kotlin', 'spring', 'django',
    'flask', 'express', 'next.js', 'nextjs', 'tailwind', 'graphql', 'html5', 'redis',
    'firebase', 'supabase', 'figma',
]);

const SkillsSection: React.FC<{ userData: any; projects: any[] }> = ({ userData, projects }) => {
    const skillSet = new Set<string>(userData.techStack || []);
    projects.forEach(p => {
        (p.technologies || []).forEach((t: any) => {
            const n = typeof t === 'string' ? t : (t.name || t.label || '');
            if (n && MAJOR_TECH.has(n.toLowerCase())) skillSet.add(n);
        });
    });
    const skills = Array.from(skillSet);
    if (!skills.length) return null;

    return (
        <section id="skills" className="py-20" style={{ background: 'linear-gradient(to bottom left,rgb(5,8,40),rgb(1,4,39))' }}>
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-white text-center mb-2 uppercase">
                    Professional <strong style={{ color: '#7500fa' }}>Skillset</strong>
                </h1>
                <p className="text-center text-gray-400 mb-12">Technologies I work with</p>
                <div className="flex flex-wrap justify-center gap-4">
                    {skills.map(skill => {
                        const iconNode = getTechIcon(skill);
                        return (
                            <div
                                key={skill}
                                className="flex flex-col items-center justify-center p-4 gap-2 rounded cursor-default transition-all duration-300 hover:scale-105"
                                style={{ border: '1.7px solid rgb(89,0,190)', boxShadow: '4px 5px 4px 3px rgba(117,0,250,0.37)', minWidth: 90 }}
                            >
                                <span className="text-4xl text-purple-400">
                                    {iconNode}
                                </span>
                                <span className="text-white text-xs">{skill}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// ─── Projects ─────────────────────────────────────────────────────────────────
const ProjectsSection: React.FC<{ projects: any[] }> = ({ projects }) => {
    if (!projects?.length) return null;
    return (
        <section id="projects" className="py-24" style={{ background: 'linear-gradient(to bottom left,rgb(5,8,40),rgb(1,4,39))' }}>
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-white text-center mb-2 uppercase">
                    My Recent <strong style={{ color: '#7500fa' }}>Works</strong>
                </h1>
                <p className="text-center text-gray-400 mb-12">A few projects I've been working on.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => {
                        const video = project.media?.videos?.[0]?.url;
                        const image = project.media?.images?.[0]?.url || project.imageUrl || project.image;
                        const techs: string[] = (project.technologies || [])
                            .map((t: any) => typeof t === 'string' ? t : (t.name || t.label || ''))
                            .filter(Boolean);
                        return (
                            <div key={project.id}
                                className="flex flex-col overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02]"
                                style={{ background: 'rgba(255,255,255,0.03)', boxShadow: '0 4px 5px 3px rgb(72,0,155)', border: '1px solid rgba(117,0,250,0.2)' }}
                            >
                                <div style={{ height: 200 }} className="overflow-hidden">
                                    {video ? <video src={video} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity p-3 rounded-2xl" />
                                        : image ? <img src={image} alt={project.title || project.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity p-3 rounded-2xl" />
                                            : <div className="w-full h-full flex items-center justify-center bg-purple-900/20"><span className="text-5xl">🚀</span></div>}
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-white font-bold text-lg mb-2">{project.title || project.name}</h3>
                                    {project.description && <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>}
                                    {techs.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {techs.slice(0, 4).map(t => (
                                                <span key={t} className="text-xs px-2 py-0.5 rounded text-purple-300"
                                                    style={{ background: 'rgba(117,0,250,0.15)', border: '1px solid rgba(117,0,250,0.3)' }}>{t}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex gap-3 mt-auto">
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub"
                                                className="flex items-center justify-center w-10 h-10 rounded-full text-lg text-white"
                                                style={{ background: 'rgba(117,0,250,0.2)', border: '1px solid rgba(117,0,250,0.4)' }}>
                                                <BsGithub />
                                            </a>
                                        )}
                                        {(project.liveUrl || project.demoUrl) && (
                                            <a href={project.liveUrl || project.demoUrl} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center px-4 h-10 rounded-full text-sm text-white"
                                                style={{ background: '#7500fa' }}>
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// ─── Resume ───────────────────────────────────────────────────────────────────
const ResumeSection: React.FC<{ userData: any }> = ({ userData }) => {
    const resumeUrl = (userData as any).resumeUrl || null;
    const experience = userData.experience || [];
    const education = userData.education || [];

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <section id="resume" className="py-24" style={{ background: 'linear-gradient(to bottom left,rgb(5,8,40),rgb(1,4,39))' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-3 uppercase">
                        My <strong style={{ color: '#7500fa' }}>Resume</strong>
                    </h1>
                    <p className="text-gray-400 mb-8">My professional and educational background.</p>
                    {resumeUrl ? (
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white hover:opacity-90 transition-all justify-center"
                            style={{ background: '#7500fa' }}>
                            <CgFileDocument /> View Full Resume
                        </a>
                    ) : (
                        <p className="text-gray-500 text-sm">Add a resume URL through the portfolio editor.</p>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-12 text-white">
                    {/* Experience Column */}
                    <div>
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-purple-900/50 pb-4">
                            <span className="p-2 rounded-lg bg-purple-900/30 text-purple-400"><CgFileDocument className="w-5 h-5" /></span>
                            Experience
                        </h2>
                        {experience.length > 0 ? (
                            <div className="space-y-8">
                                {experience.map((exp: any, i: number) => (
                                    <div key={i} className="relative pl-6 border-l-2 border-purple-800/50">
                                        <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1.5 ring-4 ring-indigo-950"></div>
                                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                                        <div className="text-purple-400 font-medium mb-2">{exp.companyName}</div>
                                        <div className="text-sm text-gray-500 mb-3 uppercase tracking-wider font-mono">
                                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No experience added yet.</p>
                        )}
                    </div>

                    {/* Education Column */}
                    <div>
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-purple-900/50 pb-4">
                            <span className="p-2 rounded-lg bg-purple-900/30 text-purple-400"><CgFileDocument className="w-5 h-5" /></span>
                            Education
                        </h2>
                        {education.length > 0 ? (
                            <div className="space-y-8">
                                {education.map((edu: any, i: number) => (
                                    <div key={i} className="relative pl-6 border-l-2 border-purple-800/50">
                                        <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1.5 ring-4 ring-indigo-950"></div>
                                        <h3 className="text-xl font-bold text-white">{edu.degreeName} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h3>
                                        <div className="text-purple-400 font-medium mb-2">{edu.schoolName}</div>
                                        <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No education added yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const ContactSection: React.FC<{ userData: any }> = ({ userData }) => {
    const socials = userData.socials || userData.socialLinks || {};
    const email = userData.email || socials.email;
    return (
        <section id="contact" className="py-24" style={{ background: 'linear-gradient(to bottom left,rgb(5,8,40),rgb(1,4,39))' }}>
            <div className="max-w-3xl mx-auto px-6 text-center">
                <h1 className="text-4xl font-bold text-white mb-3 uppercase">
                    Get In <strong style={{ color: '#7500fa' }}>Touch</strong>
                </h1>
                <p className="text-gray-400 mb-8">I'm always open to new projects, creative ideas, or opportunities.</p>
                {email && (
                    <a href={`mailto:${email}`}
                        className="inline-block px-8 py-3 rounded-full font-semibold text-white mb-10 hover:opacity-90"
                        style={{ background: '#7500fa', boxShadow: '0 0 20px rgba(117,0,250,0.4)' }}>
                        Say Hello
                    </a>
                )}
                <div className="mt-8">
                    <h2 className="text-white text-xl mb-5">FIND ME ON</h2>
                    <div className="flex justify-center"><SocialIcons socials={socials} /></div>
                </div>
            </div>
        </section>
    );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const FooterSection: React.FC<{ userData: any }> = ({ userData }) => {
    const year = new Date().getFullYear();
    const name = userData.name || 'Developer';
    const initials = name.split(' ').map((n: string) => n[0]).join('');
    const socials = userData.socials || userData.socialLinks || {};
    return (
        <footer style={{ background: 'rgb(1,6,36)' }} className="py-4">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-white text-sm">Designed & Developed by <span style={{ color: '#7500fa' }}>{name}</span></span>
                    <span className="text-white text-sm">Copyright © {year} {initials}</span>
                    <SocialIcons socials={socials} />
                </div>
            </div>
        </footer>
    );
};

// ─── Inner layout (receives userData + projects from HOC) ─────────────────────
export const PortfolioTemplateInner: React.FC<PortfolioTemplateProps> = ({ userData, projects }) => {
    const storeUserData = usePortfolioSelector(state => state.portfolio.userData);

    // Merge backend data with Redux store (store wins for real-time editor changes)
    const merged = {
        ...userData,
        ...storeUserData,
        name: storeUserData.name || userData.name,
        bio: storeUserData.bio || userData.bio,
        profileImage: storeUserData.profileImage || userData.profileImage || userData.avatar,
        avatar: storeUserData.profileImage || userData.profileImage || userData.avatar,
        title: storeUserData.title || userData.title,
        socials: (userData as any).socials || storeUserData.socialLinks || {},
        experience: storeUserData.experience || userData.experience || [],
        education: storeUserData.education || userData.education || [],
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom left,rgb(5,8,40),rgb(1,4,39))', fontFamily: "'Inter','Raleway',sans-serif" }}>
            <Navbar userName={merged.name} />
            <HeroSection userData={merged} />
            <SkillsSection userData={merged} projects={projects} />
            <ProjectsSection projects={projects} />
            <ResumeSection userData={merged} />
            <ContactSection userData={merged} />
            <FooterSection userData={merged} />
        </div>
    );
};

PortfolioTemplateInner.displayName = 'PortfolioTemplateInner';

// Wrap the inner layout with the HOC (handles data fetch + preloader)
const PortfolioTemplateWithHOC = withPortfolioTemplate(PortfolioTemplateInner);

/**
 * PortfolioTemplate — the main export.
 * Wraps everything in the Redux Provider so organisms can still
 * read from the store during the portfolio editor session.
 */
export const PortfolioTemplate: React.FC = () => (
    <Provider store={portfolioStore}>
        <PortfolioTemplateWithHOC />
    </Provider>
);
