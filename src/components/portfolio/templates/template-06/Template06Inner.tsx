import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { HeroPrincipal } from './components/HeroPrincipal';
import { PhilosophySection } from './components/PhilosophySection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { PatternsSection } from './components/PatternsSection';
import { ScalabilitySection } from './components/ScalabilitySection';
import { SecuritySection } from './components/SecuritySection';
import { ToolingSection } from './components/ToolingSection';
import { ThoughtLeadershipSection } from './components/ThoughtLeadershipSection';
import { AdvisorySection } from './components/AdvisorySection';
import './template-06.css';

export const Template06Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects }) => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, .group, .t06-arch-node, input')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        // Intersection Observer for reveals and active section
        const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -50px 0px' };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: [0.1, 0.5, 0.8], rootMargin: '-80px 0px -20% 0px' });

        document.querySelectorAll('section, .r-up, .r-left, .r-right, .t06-rule').forEach(el => revealObserver.observe(el));
        document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            revealObserver.disconnect();
            sectionObserver.disconnect();
        };
    }, []);

    return (
        <div className="template-06 selection:bg-[var(--t06-accent)] selection:text-white cursor-none">
            {/* Architectural Custom Cursor */}
            <div id="t06-cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />
            <div id="t06-cursor-ring" style={{ left: cursorPos.x, top: cursorPos.y, width: isHovering ? 60 : 32, height: isHovering ? 60 : 32 }} />

            {/* Nav */}
            <div className="sticky top-2 z-[100] flex justify-center w-full pointer-events-none">
                <nav className="h-12 bg-white/80 backdrop-blur-xl border border-[var(--t06-line)] transition-all pointer-events-auto shadow-sm">
                    <div className="px-10 h-full flex items-center justify-center gap-8">
                        <div className="flex items-center gap-4 border-r border-[var(--t06-line)] pr-8 h-full">
                            <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[var(--t06-ink)] uppercase">
                                [{userData?.name?.split(' ')[0] || 'ARCHITECT'}]
                            </span>
                        </div>
                        <ul className="flex gap-10 list-none m-0 p-0">
                            {[
                                { label: 'Philosophy', id: 'philosophy' },
                                { label: 'Work', id: 'work' },
                                { label: 'Patterns', id: 'patterns' },
                                { label: 'Systems', id: 'systems' },
                                { label: 'Writing', id: 'writing' }
                            ].map(item => (
                                <li key={item.id} className="flex items-center">
                                    <button
                                        onClick={() => scrollTo(item.id)}
                                        className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-all relative py-1 ${activeSection === item.id ? 'text-[var(--t06-accent)] font-bold' : 'text-[var(--t06-ink-3)]/60 hover:text-[var(--t06-accent)]'}`}
                                    >
                                        {item.label}
                                        {activeSection === item.id && (
                                            <motion.div
                                                layoutId="nav-active-t06"
                                                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--t06-accent)]"
                                            />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>

            <main className="flex flex-col gap-24">
                <HeroPrincipal userData={userData} onScrollTo={scrollTo} />
                <PhilosophySection />
                <CaseStudiesSection projects={projects} />
                <PatternsSection />
                <ScalabilitySection />
                <SecuritySection />
                <ToolingSection />
                <ThoughtLeadershipSection />
                <AdvisorySection />
            </main>

            <footer className="py-10 bg-[#f7f6f4] border-t border-[var(--t06-line)]">
                <div className="max-w-[1360px] mx-auto px-14 flex justify-between items-center">
                    <div className="font-mono text-[10px] tracking-widest text-[var(--t06-mid)]">© 2025 {userData?.name || 'Rustam Mamedov'} — Principal Cloud Architect</div>
                    <div className="flex gap-8">
                        {['LinkedIn', 'GitHub', 'Writing'].map(link => (
                            <button
                                key={link}
                                onClick={link === 'Writing' ? () => scrollTo('writing') : undefined}
                                className="font-mono text-[10px] uppercase tracking-widest text-[var(--t06-mid)] hover:text-[var(--t06-accent)] transition-colors cursor-pointer"
                            >
                                {link}
                            </button>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};
