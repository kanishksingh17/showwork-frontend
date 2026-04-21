import React, { useState, useEffect } from 'react';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { AsyncyHero } from './components/AsyncyHero';
import { PlatformPillars } from './components/PlatformPillars';
import { LaptopSection } from './components/LaptopSection';
import { JourneyRoadmap } from './components/JourneyRoadmap';
import { CloudPartnerLogos } from './components/CloudPartnerLogos';
import { Philosophy } from './components/Philosophy';
import { ProjectsPage } from './components/ProjectsPage';
import { AboutPage } from './components/AboutPage';
import { APIPage } from './components/APIPage';
import { ContactPage } from './components/ContactPage';
import { EditableBlock } from '../../editor/EditableBlock';
import './template-05.css';

/**
 * Template05Inner - Asyncy (Microservices Architect)
 * 
 * Re-authored for Template 05 after relocation.
 */
export const Template05Inner: React.FC<PortfolioTemplateProps> = ({ userData = {} as any, projects = [], sections = [] }) => {
    const [isReady, setIsReady] = useState(false);
    const [activePage, setActivePage] = useState('home'); // home, about, projects, api, contact

    const heroSection = sections.find(s => s.id === 'about');
    const skillsSection = sections.find(s => s.id === 'skills');
    const resumeSection = sections.find(s => s.id === 'resume');
    const contactSection = sections.find(s => s.id === 'contact');
    const footerSection = sections.find(s => s.id === 'footer');

    const showHero = heroSection?.isVisible ?? true;
    const showSkills = skillsSection?.isVisible ?? true;
    const showResume = resumeSection?.isVisible ?? true;
    const showContact = contactSection?.isVisible ?? true;
    const showFooter = footerSection?.isVisible ?? true;

    useEffect(() => {
        setIsReady(true);
        window.scrollTo(0, 0);
    }, [activePage]);

    return (
        <div className={`template-05 min-h-screen bg-[var(--t05-paper)] transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
            {/* Header */}
            <header className="sticky top-0 z-[100] w-full h-12 bg-white/80 backdrop-blur-xl border-b border-[var(--t05-line)]">
                <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
                    <div className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[var(--t05-ink)]">
                        [{userData?.name?.split(' ')[0] || 'SYSTEM'}]
                    </div>
                    <nav className="flex items-center gap-10">
                        {[
                            { label: 'Home', id: 'home' },
                            { label: 'About', id: 'about' },
                            { label: 'Projects', id: 'projects' },
                            { label: 'System API', id: 'api' },
                            { label: 'Contact', id: 'contact' }
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActivePage(item.id)}
                                className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-all relative py-2 ${activePage === item.id ? 'text-[var(--t05-accent)] font-bold' : 'text-[var(--t05-ink)]/60 hover:text-[var(--t05-accent)]'}`}
                            >
                                {item.label}
                                {activePage === item.id && (
                                    <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--t05-accent)]" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            <main>
                {activePage === 'home' && (
                    <>
                        {showHero && (
                            <EditableBlock id="about">
                                <AsyncyHero customData={heroSection?.customData} />
                            </EditableBlock>
                        )}
                        {showSkills && (
                            <EditableBlock id="skills">
                                <PlatformPillars />
                            </EditableBlock>
                        )}
                        {showHero && (
                            <EditableBlock id="about">
                                <Philosophy />
                            </EditableBlock>
                        )}
                        {showResume && (
                            <EditableBlock id="resume">
                                <LaptopSection />
                            </EditableBlock>
                        )}
                        {showResume && (
                            <EditableBlock id="resume">
                                <JourneyRoadmap />
                            </EditableBlock>
                        )}
                        {showHero && (
                            <EditableBlock id="about">
                                <CloudPartnerLogos />
                            </EditableBlock>
                        )}
                    </>
                )}

                {activePage === 'about' && (
                    <EditableBlock id="about">
                        <AboutPage userData={userData} />
                    </EditableBlock>
                )}
                {activePage === 'projects' && (
                    <EditableBlock id="projects">
                        <ProjectsPage projects={projects} />
                    </EditableBlock>
                )}
                {activePage === 'api' && (
                    <EditableBlock id="resume">
                        <APIPage />
                    </EditableBlock>
                )}
                {activePage === 'contact' && (
                    <EditableBlock id="contact">
                        <ContactPage userData={userData} />
                    </EditableBlock>
                )}
            </main>

            {/* Simple Technical Footer */}
            <EditableBlock id="footer">
                <footer className="py-12 border-t border-[var(--t05-line)] bg-white/40">
                    <div className="max-w-[1400px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col gap-1">
                            <span className="text-[var(--t05-ink)] font-bold font-mono text-[10px] uppercase tracking-widest">Architect.io</span>
                            <span className="text-[var(--t05-ink)]/40 font-mono text-[9px] uppercase tracking-[0.2em]">© 2026 Core Infrastructure Systems</span>
                        </div>
                        <div className="flex gap-10">
                            {['Network', 'Security', 'Compliance'].map(item => (
                                <span key={item} className="text-[var(--t05-ink)]/40 font-mono text-[9px] uppercase tracking-widest hover:text-[var(--t05-accent)] cursor-pointer transition-colors">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </footer>
            </EditableBlock>
        </div>
    );
};
