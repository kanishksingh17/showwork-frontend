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
import { EditableBlock } from '../../editor/EditableBlock';

export const Template01Inner: React.FC<PortfolioTemplateProps> = ({ userData = {} as any, projects = [], sections = [] }) => {
    const [currentView, setCurrentView] = React.useState<'home' | 'experience' | 'blog' | 'contact' | 'projects'>('home');

    // Section configurations
    const heroSection = sections.find(s => s.id?.toLowerCase() === 'hero' || s.id?.toLowerCase() === 'about');
    const featuredProjectsSection = sections.find(s => s.id?.toLowerCase() === 'featured_projects');
    const socialBlocksSection = sections.find(s => s.id?.toLowerCase() === 'social_blocks');
    const experienceSection = sections.find(s => s.id?.toLowerCase() === 'experience' || s.id?.toLowerCase() === 'resume');
    const projectsListSection = sections.find(s => s.id?.toLowerCase() === 'projects');
    const testimonialsSection = sections.find(s => s.id?.toLowerCase() === 'testimonials');
    const footerSection = sections.find(s => s.id?.toLowerCase() === 'footer');

    // Filter projects for showcasing
    const showcasedProjectsList = projects.filter(p => p.showcase || p.isFeatured || p.is_featured);
    const mainProjectsList = showcasedProjectsList.length > 0 ? showcasedProjectsList : projects;

    // Visibility toggles
    const showHero = heroSection?.isVisible ?? true;
    const showFeaturedProjects = featuredProjectsSection?.isVisible ?? true;
    const showSocialBlocks = socialBlocksSection?.isVisible ?? true;
    const showExperience = experienceSection?.isVisible ?? true;
    const showProjectsList = projectsListSection?.isVisible ?? true;
    const showTestimonials = testimonialsSection?.isVisible ?? true;
    const showFooter = footerSection?.isVisible ?? true;

    const handleNavigate = (view: 'home' | 'experience' | 'blog' | 'contact' | 'projects') => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <div className="bg-[#7E9CC8] dark:bg-[#111827] min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
            <div className="max-w-4xl mx-auto bg-white dark:bg-[#1F2937] rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 min-h-[90vh] flex flex-col">
                <Header 
                    userData={userData} 
                    currentView={currentView} 
                    onNavigate={handleNavigate} 
                    logo={heroSection?.customData?.logo}
                />

                <main className="px-8 py-12 md:px-16 md:py-16 flex-grow">
                    {currentView === 'home' && (
                        <div className="space-y-20">
                            {showHero && (
                                <EditableBlock id={heroSection?.id || "hero"}>
                                    <Hero 
                                        userData={userData} 
                                        customData={heroSection?.customData} 
                                    />
                                </EditableBlock>
                            )}

                            {showFeaturedProjects && (
                                <EditableBlock id={featuredProjectsSection?.id || "featured_projects"}>
                                    <FeaturedProjects 
                                        projects={(featuredProjectsSection?.customData?.manualProjects?.length > 0) ? featuredProjectsSection.customData.manualProjects : showcasedProjectsList} 
                                    />
                                </EditableBlock>
                            )}

                            {showSocialBlocks && (
                                <EditableBlock id={socialBlocksSection?.id || "social_blocks"}>
                                    <SocialBlocks 
                                        userData={userData} 
                                        customData={socialBlocksSection?.customData} 
                                    />
                                </EditableBlock>
                            )}

                            {showExperience && (
                                <EditableBlock id={experienceSection?.id || "experience"}>
                                    <Experience 
                                        userData={userData} 
                                        customData={experienceSection?.customData} 
                                        onViewDetailed={() => handleNavigate('experience')} 
                                    />
                                </EditableBlock>
                            )}

                            {showProjectsList && (
                                <EditableBlock id={projectsListSection?.id || "projects"}>
                                    <Projects 
                                        projects={(projectsListSection?.customData?.manualProjects?.length > 0) ? projectsListSection.customData.manualProjects : (projectsListSection?.customData?.projectItems || mainProjectsList)} 
                                        onViewArchive={() => handleNavigate('projects')} 
                                    />
                                </EditableBlock>
                            )}

                            {showTestimonials && (
                                <EditableBlock id={testimonialsSection?.id || "testimonials"}>
                                    <Testimonials 
                                        userData={userData} 
                                        customData={testimonialsSection?.customData}
                                    />
                                </EditableBlock>
                            )}
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

                {showFooter && (
                    <EditableBlock id="footer">
                        <footer className="py-8 text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700">
                            <p>© {new Date().getFullYear()} {userData?.name || 'Developer'}. All rights reserved.</p>
                        </footer>
                    </EditableBlock>
                )}
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
