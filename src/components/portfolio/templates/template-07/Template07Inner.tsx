import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'lucide-react';
import './template-07.css';
import { HeroDevOps } from './components/HeroDevOps';
import { PhilosophyDevOps } from './components/PhilosophyDevOps';
import { PipelineDevOps } from './components/PipelineDevOps';
import { CloudDiagramDevOps } from './components/CloudDiagramDevOps';
import { ObservabilityDevOps } from './components/ObservabilityDevOps';
import { SREDevOps } from './components/SREDevOps';
import { CostOptimizationDevOps } from './components/CostOptimizationDevOps';
import { ToolingDevOps } from './components/ToolingDevOps';
import { ProjectsDevOps } from './components/ProjectsDevOps';
import { ContactDevOps } from './components/ContactDevOps';
import { EditableBlock } from '../../editor/EditableBlock';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';

export const Template07Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects, sections }) => {
    const envCanvasRef = useRef<HTMLCanvasElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        // Environment Canvas (Bokeh)
        const canvas = envCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: any[] = [];
        let w: number, h: number;
        let animationFrameId: number;

        const init = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < 80; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 60 + 20,
                    opacity: Math.random() * 0.08 + 0.01,
                    hue: Math.random() < 0.3 ? 220 : (Math.random() < 0.5 ? 270 : 35),
                    drift: (Math.random() - 0.5) * 0.15,
                    dy: (Math.random() - 0.5) * 0.05
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#050507';
            ctx.fillRect(0, 0, w, h);

            // Floor glow
            const floorGrad = ctx.createRadialGradient(w / 2, h, 0, w / 2, h, w * 0.6);
            floorGrad.addColorStop(0, 'rgba(180,100,0,0.12)');
            floorGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = floorGrad;
            ctx.fillRect(0, 0, w, h);

            // Ceiling blue halo
            const topGrad = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, w * 0.5);
            topGrad.addColorStop(0, 'rgba(30,80,220,0.1)');
            topGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = topGrad;
            ctx.fillRect(0, 0, w, h);

            particles.forEach(p => {
                p.x += p.drift;
                p.y += p.dy;
                if (p.x > w + p.r) p.x = -p.r;
                if (p.x < -p.r) p.x = w + p.r;
                if (p.y > h + p.r) p.y = -p.r;
                if (p.y < -p.r) p.y = h + p.r;

                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
                grad.addColorStop(0, `hsla(${p.hue},80%,60%,${p.opacity})`);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', init);
        init();
        draw();

        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isHovering || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Optional: Clamp to boundary if needed, but opacity-0 on mouseLeave usually suffices
            if (cursorRef.current) {
                cursorRef.current.style.left = `${x}px`;
                cursorRef.current.style.top = `${y}px`;
                cursorRef.current.style.opacity = '1';
            }
            if (ringRef.current) {
                setTimeout(() => {
                    if (ringRef.current) {
                        ringRef.current.style.left = `${x}px`;
                        ringRef.current.style.top = `${y}px`;
                        ringRef.current.style.opacity = '1';
                    }
                }, 80);
            }
        };

        if (isHovering) {
            window.addEventListener('mousemove', onMouseMove);
        } else {
            if (cursorRef.current) cursorRef.current.style.opacity = '0';
            if (ringRef.current) ringRef.current.style.opacity = '0';
        }

        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [isHovering]);

    useEffect(() => {
        // Scroll spy for nav
        const handleScroll = () => {
            const sections = ['hero', 'philosophy', 'cicd', 'cloud', 'observability', 'sre', 'cost', 'tooling'];
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // Custom offset for earlier trigger
                    if (rect.top <= 300 && rect.bottom >= 300) {
                        setActiveSection(section);
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={containerRef}
            className="template-07 selection:bg-[var(--t07-purple-bright)] selection:text-white cursor-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Custom Cursor */}
            <div ref={cursorRef} className="absolute w-3 h-3 bg-[var(--t07-purple-bright)] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-[width,height,background,opacity] duration-300 opacity-0" />
            <div ref={ringRef} className="absolute w-9 h-9 border border-[var(--t07-purple-bright)]/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[transform,width,height,opacity] duration-[180ms] opacity-0" />

            <canvas ref={envCanvasRef} id="env-canvas" className="absolute inset-0 z-0 pointer-events-none" />

            {/* Nav */}
            <nav className="sticky top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-6 lg:px-12 border-b border-white/5 bg-[var(--t07-bg-void)]/80 backdrop-blur-md">
                <div className="nav-logo font-mono text-[13px] font-medium text-[var(--t07-text-secondary)] tracking-wider flex items-center gap-2 mr-6 shrink-0">
                    <Terminal size={14} className="text-[var(--t07-purple-bright)]" /> {userData?.name?.toLowerCase().replace(/\s/g, '.') || 'alex.mercer'}
                </div>
                <ul className="hidden lg:flex items-center gap-4 lg:gap-6 list-none flex-1 justify-center">
                    {[
                        { id: 'hero', label: 'Home' },
                        { id: 'philosophy', label: 'Philosophy' },
                        { id: 'cicd', label: 'CI/CD' },
                        { id: 'cloud', label: 'Cloud' },
                        { id: 'observability', label: 'Observability' },
                        { id: 'sre', label: 'Reliability (SRE)' },
                        { id: 'cost', label: 'Cost' },
                        { id: 'tooling', label: 'Tooling' },
                        { id: 'projects', label: 'Inventory' }
                    ].map(item => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`text-[13px] tracking-wide transition-colors ${activeSection === item.id ? 'text-white' : 'text-white/50 hover:text-white'}`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <a href="#contact" className="nav-cta border border-white/20 text-white px-5 py-2 rounded-lg text-[13px] hover:border-[var(--t07-purple-bright)] hover:bg-[var(--t07-purple-bright)]/10 transition-all whitespace-nowrap ml-6">
                    Open to Advisory
                </a>
            </nav>

            {/* Content */}
            <main className="relative z-10">
                <EditableBlock id="about">
                    <HeroDevOps userData={userData} sections={sections} />
                </EditableBlock>
                <EditableBlock id="about">
                    <PhilosophyDevOps />
                </EditableBlock>
                <EditableBlock id="resume">
                    <PipelineDevOps />
                </EditableBlock>
                <EditableBlock id="resume">
                    <CloudDiagramDevOps />
                </EditableBlock>
                <EditableBlock id="resume">
                    <ObservabilityDevOps />
                </EditableBlock>
                <EditableBlock id="resume">
                    <SREDevOps />
                </EditableBlock>
                <EditableBlock id="resume">
                    <CostOptimizationDevOps />
                </EditableBlock>
                <EditableBlock id="skills">
                    <ToolingDevOps />
                </EditableBlock>
                <EditableBlock id="projects">
                    <ProjectsDevOps projects={projects} />
                </EditableBlock>
                <EditableBlock id="contact">
                    <ContactDevOps userData={userData} />
                </EditableBlock>
            </main>
        </div>
    );
};
