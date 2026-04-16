import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Zap, History, Cloud } from 'lucide-react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const ScrambleText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        let timeout = setTimeout(() => {
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplayText(() =>
                    text.split("")
                        .map((_, index) => {
                            if (index < iteration) return text[index];
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <span>{displayText}</span>;
};

export const HeroDevOps: React.FC<{ userData: any; sections?: any[] }> = ({ userData, sections }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Find custom data for this section
    const section = sections?.find(s => s.variant === 'HeroDevOps' || s.id === 'about');
    const data = section?.customData || {};

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'shield': return <ShieldCheck size={14} />;
            case 'zap': return <Zap size={14} />;
            case 'clock': return <History size={14} />;
            case 'cloud': return <Cloud size={14} />;
            default: return <ShieldCheck size={14} />;
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let anim = 0;
        let animationFrameId: number;

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        };

        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            if (!ctx) return;
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            anim += 0.012;

            const cx = w / 2;
            const cy = h / 2;
            const totalLayers = 8;
            const phase = (Math.sin(anim) + 1) / 2;
            const maxSpread = 32;
            const spread = phase * maxSpread;
            const tileW = 130, tileH = 72, tileDepth = 16;

            for (let i = totalLayers - 1; i >= 0; i--) {
                const yOff = (i - totalLayers / 2) * spread;
                const alpha = 0.7 + 0.3 * (i / totalLayers);
                const bright = 80 + i * 15;

                // Top face
                ctx.beginPath();
                ctx.moveTo(cx, cy + yOff - tileH / 2 - tileDepth);
                ctx.lineTo(cx + tileW / 2, cy + yOff - tileDepth);
                ctx.lineTo(cx, cy + yOff + tileH / 2 - tileDepth);
                ctx.lineTo(cx - tileW / 2, cy + yOff - tileDepth);
                ctx.closePath();
                const topGrad = ctx.createLinearGradient(cx, cy + yOff - tileH, cx, cy + yOff);
                topGrad.addColorStop(0, `rgba(${bright * 0.5},${20},${bright},${alpha * 0.9})`);
                topGrad.addColorStop(1, `rgba(${bright * 0.3},${10},${bright * 0.8},${alpha * 0.7})`);
                ctx.fillStyle = topGrad;
                ctx.fill();
                ctx.strokeStyle = `rgba(192,132,252,${alpha * 0.5})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();

                // Right face
                ctx.beginPath();
                ctx.moveTo(cx + tileW / 2, cy + yOff - tileDepth);
                ctx.lineTo(cx + tileW / 2, cy + yOff - tileDepth + tileDepth);
                ctx.lineTo(cx, cy + yOff + tileH / 2);
                ctx.lineTo(cx, cy + yOff + tileH / 2 - tileDepth);
                ctx.closePath();
                ctx.fillStyle = `rgba(60,5,100,${alpha * 0.6})`;
                ctx.fill();
                ctx.strokeStyle = `rgba(168,85,247,${alpha * 0.3})`;
                ctx.stroke();

                // Left face
                ctx.beginPath();
                ctx.moveTo(cx - tileW / 2, cy + yOff - tileDepth);
                ctx.lineTo(cx - tileW / 2, cy + yOff);
                ctx.lineTo(cx, cy + yOff + tileH / 2);
                ctx.lineTo(cx, cy + yOff + tileH / 2 - tileDepth);
                ctx.closePath();
                ctx.fillStyle = `rgba(80,10,130,${alpha * 0.5})`;
                ctx.fill();
                ctx.strokeStyle = `rgba(168,85,247,${alpha * 0.3})`;
                ctx.stroke();

                if (i === totalLayers - 1) {
                    ctx.shadowColor = 'rgba(168,85,247,0.6)';
                    ctx.shadowBlur = 24;
                } else {
                    ctx.shadowBlur = 0;
                }
            }

            ctx.shadowBlur = 0;
            ctx.font = '500 9px JetBrains Mono, monospace';
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.textAlign = 'center';
            const topY = cy - (totalLayers / 2) * spread * phase - tileH / 2 - tileDepth - 20;
            ctx.fillText('INFRASTRUCTURE', cx, topY);

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section id="hero" className="pt-4 pb-12 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="card hero-card w-full max-w-5xl py-12 px-10 lg:py-16 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                <div className="hero-left">
                    <div className="hero-eyebrow flex items-center gap-3 mb-6">
                        <div className="eyebrow-icon w-7 h-7 border border-[var(--t07-purple-mid)] rounded-md flex items-center justify-center text-[var(--t07-purple-bright)]">
                            <Terminal size={14} />
                        </div>
                        <span className="eyebrow-text font-mono text-[11px] text-[var(--t07-text-muted)] tracking-[0.12em] uppercase">
                            {data.eyebrow || "Senior DevOps Engineer"}
                        </span>
                    </div>
                    <h1 className="hero-h1 mb-2">
                        <span className="block"><ScrambleText text={data.headlineLine1 || "Infrastructure"} /></span>
                        <span className="block"><ScrambleText text={data.headlineLine2 || "at Scale."} delay={500} /></span>
                    </h1>
                    <span className="hero-subtitle-serif block mb-5">{data.subtitle || "Built to survive production."}</span>
                    <p className="text-[14px] leading-[1.7] text-[var(--t07-text-secondary)] max-w-[340px] mb-10">
                        {data.bio || userData?.bio || "I design and operate infrastructure that supports millions of requests per day — from GitOps pipelines to multi-cloud architectures."}
                    </p>
                    <div className="flex flex-col gap-3 w-[220px]">
                        <a href="#cicd" className="btn-primary">View CI/CD Architecture →</a>
                        <a href="#contact" className="btn-ghost" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}>Advisory Engagement</a>
                    </div>
                </div>
                <div className="hero-right flex flex-col items-start gap-8">
                    <div className="hero-3d-container w-full aspect-square relative flex items-center justify-center min-h-[400px]">
                        <canvas ref={canvasRef} id="hero-canvas-3d" className="w-full h-full" />
                    </div>
                    <div className="hero-stats grid grid-cols-2 gap-4 w-full">
                        {(data.stats || [
                            { val: "99.97%", label: "Uptime SLO", icon: "shield" },
                            { val: "<4min", label: "Avg Deploy Time", icon: "zap" },
                            { val: "8yrs", label: "Experience", icon: "clock" },
                            { val: "3 CSPs", label: "AWS · GCP · Azure", icon: "cloud" }
                        ]).map((stat: any, i: number) => (
                            <div key={i} className="stat-chip bg-white/5 border border-[var(--t07-border-subtle)] rounded-lg p-4 flex flex-col gap-2 relative overflow-hidden group hover:border-[var(--t07-purple-bright)]/30 transition-colors">
                                <div className="absolute top-2 right-2 text-[var(--t07-purple-bright)] opacity-40 group-hover:opacity-100 transition-opacity">
                                    {getIcon(stat.icon)}
                                </div>
                                <span className="stat-value font-mono text-2xl text-[var(--t07-purple-bright)] block">{stat.val}</span>
                                <span className="stat-label text-[11px] text-[var(--t07-text-muted)] tracking-wider uppercase mt-1">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
