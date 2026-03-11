import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { SocialBlocks } from './components/SocialBlocks';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { ExperiencePage } from './components/ExperiencePage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { ProjectsPage } from './components/ProjectsPage';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';

export const Template01Inner: React.FC<PortfolioTemplateProps> = ({ userData = {} as any, projects = [] }) => {
    const [currentView, setCurrentView] = React.useState<'home' | 'experience' | 'blog' | 'contact' | 'projects'>('home');

    const handleNavigate = (view: 'home' | 'experience' | 'blog' | 'contact' | 'projects') => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <div className="bg-[#7E9CC8] dark:bg-[#111827] min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
            <div className="max-w-4xl mx-auto bg-white dark:bg-[#1F2937] rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 min-h-[90vh] flex flex-col">
                <Header userData={userData} currentView={currentView} onNavigate={handleNavigate} />

                <main className="px-8 py-12 md:px-16 md:py-16 flex-grow">
                    {currentView === 'home' && (
                        <div className="space-y-20">
                            <Hero userData={userData} />
                            <FeaturedProjects projects={projects} onNavigate={() => handleNavigate('projects')} />
                            <SocialBlocks userData={userData} />
                            <Experience userData={userData} onViewDetailed={() => handleNavigate('experience')} />
                            <Projects projects={projects} onViewArchive={() => handleNavigate('projects')} />
                            <Testimonials userData={userData} />
                        </div>
                    )}

                    {currentView === 'experience' && (
                        <ExperiencePage userData={userData} projects={projects} />
                    )}

                    {currentView === 'blog' && (
                        <BlogPage userData={userData} />
                    )}

                    {currentView === 'contact' && (
                        <ContactPage userData={userData} />
                    )}

                    {currentView === 'projects' && (
                        <ProjectsPage userData={userData} projects={projects} />
                    )}
                </main>

                <footer className="py-8 text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700">
                    <p>© {new Date().getFullYear()} {userData?.name || 'Developer'}. All rights reserved.</p>
                </footer>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </div>
    );
};
