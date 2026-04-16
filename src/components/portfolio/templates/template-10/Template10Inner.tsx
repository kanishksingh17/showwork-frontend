import React, { useEffect, useRef } from 'react';
import './template-10.css';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { Apps } from './components/Apps';
import { Metrics } from './components/Metrics';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { EditableBlock } from '../../editor/EditableBlock';

export const Template10Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects, sections }) => {
    const defaultData = {
        personalInfo: {
            fullName: 'Marcus Chen',
            role: 'Senior Mobile Engineer',
            bio: 'I engineer cross-platform mobile applications that users actually keep.'
        }
    };

    const portfolioData = userData || defaultData;
    const name = portfolioData.personalInfo?.fullName || 'Marcus Chen';
    const mobileHeroData = sections.find(s => s.variant === 'HeroMobile' || s.id === 'about')?.customData || {};

    // Intersection Observer for fade-in animations
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = {
            root: null, // Note: We don't set root to containerRef.current because the scaling mechanism in Preview wrapper messes with intersection if root is constrained. Window is better.
            rootMargin: '0px',
            threshold: 0.15
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Optional: Unobserve after animating in if we only want it to happen once
                    // observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll('.fade-in-up');
            elements.forEach(el => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="template-10" ref={containerRef}>
            <div className="page-frame">
                <EditableBlock id="about">
                    <Hero name={name} mobileData={mobileHeroData} />
                </EditableBlock>
                <EditableBlock id="skills">
                    <TechStack />
                </EditableBlock>
                <EditableBlock id="projects">
                    <Apps />
                </EditableBlock>
                <EditableBlock id="resume">
                    <Metrics />
                </EditableBlock>
                <EditableBlock id="resume">
                    <Process />
                </EditableBlock>
                <EditableBlock id="about">
                    <Testimonials />
                </EditableBlock>
                <EditableBlock id="contact">
                    <Contact />
                </EditableBlock>
            </div>
            <EditableBlock id="footer">
                <Footer name={name} />
            </EditableBlock>
        </div>
    );
};

export default Template10Inner;
