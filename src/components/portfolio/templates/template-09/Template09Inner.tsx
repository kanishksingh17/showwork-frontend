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

interface Template09InnerProps {
    userData: any;
}

export const Template09Inner: React.FC<Template09InnerProps> = ({ userData }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

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
                <Hero name={userData?.name} />

                {/* Tech Strip Marquee */}
                <TechStrip />

                {/* Sections */}
                <About />
                <Architecture />
                <Projects />
                <Metrics />
                <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Status Bar */}
            <StatusBar />
        </div>
    );
};
