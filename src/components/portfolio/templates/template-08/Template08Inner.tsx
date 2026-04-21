import React, { useState } from 'react';
import { HeaderStrategic } from './components/HeaderStrategic';
import { HeroStrategic } from './components/HeroStrategic';
import { FooterStrategic } from './components/FooterStrategic';
import { ProfileCardStrategic } from './components/ProfileCardStrategic';
import { EditableBlock } from '../../editor/EditableBlock';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import './template-08.css';

// Pages
import { AboutPhilosophy } from './pages/AboutPhilosophy';
import { CICDArchitecture } from './pages/CICDArchitecture';
import { CloudInfrastructure } from './pages/CloudInfrastructure';
import { ObservabilityMonitoring } from './pages/ObservabilityMonitoring';
import { ReliabilitySRE } from './pages/ReliabilitySRE';
import { IncidentResponse } from './pages/IncidentResponse';
import { CostOptimization } from './pages/CostOptimization';
import { ToolingEcosystem } from './pages/ToolingEcosystem';
import { CaseStudies } from './pages/CaseStudies';
import { ContactAdvisory } from './pages/ContactAdvisory';

type PageKey = 'about' | 'cicd' | 'cloud' | 'observability' | 'reliability' | 'incidents' | 'cost' | 'tooling' | 'cases' | 'contact';

export const Template08Inner: React.FC<PortfolioTemplateProps> = ({ userData = {} as any, projects = [], sections = [] }) => {
    const [activePage, setActivePage] = useState<PageKey>('about');

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

    const pages: Record<PageKey, { label: string, component: React.FC, sectionId: string }> = {
        about: { label: '01 About', component: AboutPhilosophy, sectionId: 'about' },
        cicd: { label: '02 CI/CD', component: CICDArchitecture, sectionId: 'resume' },
        cloud: { label: '03 Cloud', component: CloudInfrastructure, sectionId: 'resume' },
        observability: { label: '04 Observability', component: ObservabilityMonitoring, sectionId: 'resume' },
        reliability: { label: '05 Reliability', component: ReliabilitySRE, sectionId: 'resume' },
        incidents: { label: '06 Incidents', component: IncidentResponse, sectionId: 'resume' },
        cost: { label: '07 Cost', component: CostOptimization, sectionId: 'resume' },
        tooling: { label: '08 Tooling', component: ToolingEcosystem, sectionId: 'skills' },
        cases: { label: '09 Case Studies', component: CaseStudies, sectionId: 'projects' },
        contact: { label: '10 Advisory', component: ContactAdvisory, sectionId: 'contact' },
    };

    const ActiveComponent = pages[activePage].component;

    // Mock metrics for the ProfileCard
    const profileMetrics = [
        { label: 'System Uptime', value: '99.99%', trend: '+0.004%' },
        { label: 'MTTR Average', value: '08m', trend: '-2.5m' },
        { label: 'Waste Eliminated', value: '$1.2M', trend: 'Annual' }
    ];

    return (
        <div className="template-08 min-h-screen bg-white text-primary font-sans antialiased selection:bg-accent selection:text-white">
            <HeaderStrategic name={userData?.name} />

            <main>
                {showHero && (
                    <>
                        <EditableBlock id="about">
                            <HeroStrategic sections={sections} />
                        </EditableBlock>

                        {/* Profile Introduction Layer */}
                        <EditableBlock id="about">
                            <section className="py-24 px-8 md:px-16 bg-soft-gray border-y border-black/5">
                                <div className="max-w-[1600px] mx-auto">
                                    <ProfileCardStrategic userData={userData} metrics={profileMetrics} sections={sections} />
                                </div>
                            </section>
                        </EditableBlock>
                    </>
                )}

                {/* Control Panel Navigation */}
                <nav className="sticky top-[80px] bg-white border-b border-black/5 z-40 px-8 md:px-16 overflow-x-auto no-scrollbar">
                    <div className="max-w-[1600px] mx-auto flex gap-12 py-6">
                        {(Object.keys(pages) as PageKey[]).map((key) => (
                            <button
                                key={key}
                                onClick={() => setActivePage(key)}
                                className={`text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all pb-2 border-b-2 ${activePage === key
                                        ? 'text-accent border-accent'
                                        : 'text-muted border-transparent hover:text-primary hover:border-black/20'
                                    }`}
                            >
                                {pages[key].label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Dynamic Content Viewport */}
                {((activePage === 'about' && showHero) || 
                  (pages[activePage].sectionId === 'resume' && showResume) ||
                  (pages[activePage].sectionId === 'skills' && showSkills) ||
                  (pages[activePage].sectionId === 'projects' && showProjects) ||
                  (pages[activePage].sectionId === 'contact' && showContact)) && (
                    <EditableBlock id={pages[activePage].sectionId}>
                        <section className="py-24 md:py-40 px-8 md:px-16 min-h-[60rem]">
                            <div className="max-w-[1600px] mx-auto">
                                <ActiveComponent sections={sections} />
                            </div>
                        </section>
                    </EditableBlock>
                )}
            </main>

            <EditableBlock id="footer">
                <FooterStrategic name={userData?.name} socials={userData?.socials} />
            </EditableBlock>
        </div>
    );
};
