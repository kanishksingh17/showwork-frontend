import React from 'react';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { AboutStory } from './components/AboutStory';
import { Blog } from './components/Blog';
import { BlogPage } from './components/BlogPage';
import { SpeakingPage } from './components/SpeakingPage';
import { ToolboxPage } from './components/ToolboxPage';
import { ProjectsPage } from './components/ProjectsPage';
import { Community } from './components/Community';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

export const Template02Inner: React.FC<PortfolioTemplateProps> = ({ userData }) => {
    const [currentView, setCurrentView] = React.useState<'home' | 'about' | 'blog' | 'speaking' | 'toolbox' | 'projects'>('home');
    const nameToDisplay = userData?.name || 'Braydon';

    const handleNavigate = (view: 'home' | 'about' | 'blog' | 'speaking' | 'toolbox' | 'projects') => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <div className="bg-[#F3F4F6] dark:bg-[#0f1115] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 min-h-screen relative">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-8">
                <Header userData={userData} onNavigate={handleNavigate} />

                <main className="min-h-[60vh]">
                    {currentView === 'home' && (
                        <div className="animate-in fade-in duration-700">
                            <Hero userData={userData} nameToDisplay={nameToDisplay} />
                            <About
                                userData={userData}
                                onLearnMore={() => handleNavigate('about')}
                                onViewToolbox={() => handleNavigate('toolbox')}
                            />
                            <Blog userData={userData} onViewAll={() => handleNavigate('blog')} />
                            <Community userData={userData} />
                            <Newsletter />
                        </div>
                    )}
                    {currentView === 'about' && <AboutStory userData={userData} />}
                    {currentView === 'blog' && <BlogPage userData={userData} />}
                    {currentView === 'speaking' && <SpeakingPage userData={userData} />}
                    {currentView === 'toolbox' && <ToolboxPage userData={userData} />}
                    {currentView === 'projects' && <ProjectsPage userData={userData} />}
                </main>

                <Footer userData={userData} />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
                .dark ::-webkit-scrollbar-thumb {
                    background-color: #4b5563;
                }
                .rotate-n-4 { transform: rotate(-4deg); }
                .rotate-p-4 { transform: rotate(4deg); }
                .rotate-n-2 { transform: rotate(-2deg); }
                .rotate-p-2 { transform: rotate(2deg); }
                .timeline-line::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 2rem;
                    width: 2px;
                    background: #E5E7EB;
                    z-index: 0;
                }
                .dark .timeline-line::before {
                    background: #2d3039;
                }
                .hover-lift {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-lift:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            ` }} />
        </div>
    );
};
