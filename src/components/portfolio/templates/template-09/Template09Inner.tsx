import React from 'react';
import './template-09.css';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStrip } from './components/TechStrip';
import { About } from './components/About';
import { Architecture } from './components/Architecture';
import { Projects } from './components/Projects';
import { Metrics } from './components/Metrics';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StatusBar } from './components/StatusBar';
import { EditableBlock } from '../../editor/EditableBlock';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';

export const Template09Inner: React.FC<PortfolioTemplateProps> = ({ userData = {} as any, projects = [], sections = [] }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const heroSection = sections.find(s => s.id === 'about');
    const projectsSection = sections.find(s => s.id === 'projects');
    const skillsSection = sections.find(s => s.id === 'skills');
    const resumeSection = sections.find(s => s.id === 'resume');
    const contactSection = sections.find(s => s.id === 'contact');
    const footerSection = sections.find(s => s.id === 'footer');

    const showHero = heroSection?.isVisible ?? true;
    const showProjects = projectsSection?.isVisible ?? true;
    const showSkills = skillsSection?.isVisible ?? true;
    const showResume = resumeSection?.isVisible ?? true;
    const showContact = contactSection?.isVisible ?? true;
    const showFooter = footerSection?.isVisible ?? true;

    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('visible'), i * 80);
                }
            });
        }, { threshold: 0.1 });

        if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll('.fade-up');
            elements.forEach((el) => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} data-isolate-cursor className="template-09 font-['Manrope'] bg-[#050608] text-white/80 overflow-x-hidden cursor-none selection:bg-[#F5720A] selection:text-black">
            {/* Custom Cursor */}
            <div className="hidden md:block">
                <Cursor />
            </div>

            {/* Grain Overlay and Grid Background */}
            <div className="grain-overlay" />
            <div className="grid-bg" />

            {/* Navigation */}
            <Navbar name={userData?.name} />

            <main>
                {/* Hero Section */}
                {showHero && (
                    <EditableBlock id="about">
                        <Hero name={userData?.name} sections={sections} />
                    </EditableBlock>
                )}

                {/* Tech Strip Marquee */}
                {showSkills && (
                    <EditableBlock id="skills">
                        <TechStrip />
                    </EditableBlock>
                )}

                {/* Sections */}
                {showHero && (
                    <EditableBlock id="about">
                        <About />
                    </EditableBlock>
                )}
                {showResume && (
                    <EditableBlock id="resume">
                        <Architecture sections={sections} />
                    </EditableBlock>
                )}
                {showProjects && (
                    <EditableBlock id="projects">
                        <Projects projects={projectsSection?.customData?.manualProjects || projects} />
                    </EditableBlock>
                )}
                {showResume && (
                    <EditableBlock id="resume">
                        <Metrics />
                    </EditableBlock>
                )}
                {showContact && (
                    <EditableBlock id="contact">
                        <Contact />
                    </EditableBlock>
                )}
            </main>

            {/* Footer */}
            <EditableBlock id="footer">
                <Footer />
            </EditableBlock>

            {/* Status Bar */}
            <StatusBar />
        </div>
    );
};
