import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Logos } from './components/Logos';
import { ContactPage } from './components/ContactPage';
import { ProjectsPage } from './components/ProjectsPage';
import { APIPage } from './components/APIPage';
import { CaseStudyPage } from './components/CaseStudyPage';
import { BlogPage } from './components/BlogPage';
import { AboutPage } from './components/AboutPage';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { EditableBlock } from '../../editor/EditableBlock';

export const Template04Inner: React.FC<PortfolioTemplateProps> = ({ userData = {} as any, projects = [], sections = [] }) => {
    const [currentView, setCurrentView] = React.useState('home');

    const handleNavigate = (view: string) => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ── Bind to Redux Sections for real-time editing ───────────────────────
    const heroSection = sections?.find(s => s.id === 'about');
    const projectsSection = sections?.find(s => s.id === 'projects');
    const resumeSection = sections?.find(s => s.id === 'resume');
    const contactSection = sections?.find(s => s.id === 'contact');
    const blogsSection = sections?.find(s => s.id === 'blogs');
    const footerSection = sections?.find(s => s.id === 'footer');

    // Visibility toggles
    const showHero = heroSection?.isVisible ?? true;
    const showProjects = projectsSection?.isVisible ?? true;
    const showStats = resumeSection?.isVisible ?? true;
    const showContact = contactSection?.isVisible ?? true;
    const showBlogs = blogsSection?.isVisible ?? true;
    const showAboutPage = sections?.find(s => s.id === 'about')?.isVisible ?? true; // Re-use about for simplicity for now

    const aboutData = {
        headline: heroSection?.customData?.headline || userData?.professionalHeadline || userData?.headline || "Building Scalable APIs for Modern Products",
        bio: heroSection?.customData?.bio || userData?.professionalBio || userData?.bio || "Harness the power of robust architecture to handle massive scale, uncover efficiency patterns, and generate reliable data streams for your business innovation.",
        tagline: heroSection?.customData?.tagline || userData?.tagline || "Free Consultation • 5-Minute Response Time"
    };

    // Determine if we should show the high-fidelity neon styling (Home, Contact, CaseStudy, Blog, or About)
    const isHighFidelityView = currentView === 'home' || currentView === 'contact' || currentView === 'casestudy' || currentView === 'blog' || currentView === 'about';
    const isCaseStudy = currentView === 'casestudy';

    return (
        <div className={`transition-colors duration-300 relative overflow-x-hidden min-h-[100vh] flex flex-col w-full selection:bg-[#D9FF3F] selection:text-black ${isHighFidelityView ? 'bg-[#F0FDF4] dark:bg-[#0B0C15] text-gray-900 dark:text-white' : 'bg-[#0B0C15] text-white'
            }`}>
            {/* High-Fidelity Exclusive Background System */}
            {isHighFidelityView && (
                <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000">
                    {/* Standard High-Fidelity Mesh (Home/Contact) */}
                    {!isCaseStudy && (
                        <>
                            <div className="absolute inset-0 opacity-80 dark:opacity-0 transition-opacity duration-500"
                                style={{
                                    backgroundImage: 'radial-gradient(at 0% 0%, hsla(115,90%,76%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(190,80%,75%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(258,60%,75%,1) 0, transparent 50%)'
                                }}
                            />
                            <div className="absolute inset-0 opacity-0 dark:opacity-40 transition-opacity duration-500"
                                style={{
                                    backgroundImage: 'radial-gradient(at 0% 0%, hsla(115,50%,15%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(190,50%,15%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(258,50%,20%,1) 0, transparent 50%)'
                                }}
                            />
                        </>
                    )}

                    {/* Case Study Specific Mesh Gradient */}
                    {isCaseStudy && (
                        <div className="absolute inset-0 opacity-80 dark:opacity-60 transition-opacity duration-500"
                            style={{
                                backgroundImage: 'radial-gradient(at 0% 0%, hsla(142, 70%, 15%, 1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(190, 70%, 15%, 1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(220, 70%, 20%, 1) 0, transparent 50%)'
                            }}
                        />
                    )}

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none grid-bg" />

                    {/* Accent Blurs */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[128px] opacity-10 dark:opacity-20" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D9FF3F] rounded-full blur-[128px] opacity-10 dark:opacity-10" />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 flex-grow font-sans">
                <Header userData={userData} onNavigate={handleNavigate} />

                {currentView === 'home' ? (
                    <>
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-8 mb-4 px-2 lg:px-0">
                            {showHero && (
                                <EditableBlock id="about" className="h-full">
                                    <Hero aboutData={aboutData} onNavigate={handleNavigate} />
                                </EditableBlock>
                            )}

                            {showStats && (
                                <EditableBlock id="resume" className="h-full">
                                    <Stats />
                                </EditableBlock>
                            )}
                        </div>
                        <div className="mb-0">
                            {showHero && (
                                <EditableBlock id="about">
                                    <Logos />
                                </EditableBlock>
                            )}
                        </div>
                    </>
                ) : currentView === 'contact' ? (
                    showContact && (
                        <EditableBlock id="contact">
                            <ContactPage />
                        </EditableBlock>
                    )
                ) : currentView === 'projects' ? (
                    showProjects && (
                        <EditableBlock id="projects">
                            <ProjectsPage projects={projects} onBack={() => handleNavigate('home')} />
                        </EditableBlock>
                    )
                ) : currentView === 'casestudy' ? (
                    showProjects && (
                        <EditableBlock id="projects">
                            <CaseStudyPage onBack={() => handleNavigate('home')} />
                        </EditableBlock>
                    )
                ) : currentView === 'blog' ? (
                    showBlogs && (
                        <EditableBlock id="blogs">
                            <BlogPage onBack={() => handleNavigate('home')} />
                        </EditableBlock>
                    )
                ) : currentView === 'about' ? (
                    showAboutPage && (
                        <EditableBlock id="about">
                            <AboutPage onBack={() => handleNavigate('home')} />
                        </EditableBlock>
                    )
                ) : currentView === 'api' ? (
                    showStats && (
                        <EditableBlock id="resume" title="API Status">
                            <APIPage onBack={() => handleNavigate('home')} />
                        </EditableBlock>
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center py-40 animate-in fade-in duration-700">
                        <h2 className="text-3xl font-bold mb-4 opacity-50 uppercase tracking-widest font-display">{currentView} Block Coming Soon</h2>
                        <button
                            onClick={() => setCurrentView('home')}
                            className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform active:scale-95 shadow-2xl font-sans"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');
                
                .font-display { font-family: 'Space Grotesk', sans-serif; }
                .font-sans { font-family: 'Inter', sans-serif; }

                .glass-card {
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    background: rgba(16, 26, 35, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                }
                .glass-panel {
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                }
                .grid-bg {
                    background-size: 50px 50px;
                    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
                }
            `}} />
        </div>
    );
};
