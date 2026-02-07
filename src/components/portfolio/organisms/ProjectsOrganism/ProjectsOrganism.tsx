import React from 'react';
import { usePortfolioSelector } from '@/store/portfolio/hooks';
import { ExternalLink, Github } from 'lucide-react';
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { Button } from '@/components/ui/button';

export interface Project {
    id: string;
    title: string;
    description: string;
    image?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export interface ProjectsOrganismProps {
    variant?: 'Projects01' | 'Projects02' | 'ProjectsMain';
    projects?: Project[];
    className?: string;
}

// Default projects for Full-Stack Developer
const DEFAULT_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product management, cart, and payment integration.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.com',
    },
    {
        id: '2',
        title: 'Real-Time Chat Application',
        description: 'WebSocket-based chat app with real-time messaging, rooms, and user presence indicators.',
        technologies: ['React', 'Socket.io', 'Express', 'Redis'],
        githubUrl: 'https://github.com',
    },
    {
        id: '3',
        title: 'Task Management System',
        description: 'Collaborative task management tool with drag-and-drop, real-time updates, and team collaboration features.',
        technologies: ['React', 'GraphQL', 'PostgreSQL', 'Docker'],
        liveUrl: 'https://demo.com',
    },
];

export const ProjectsOrganism: React.FC<ProjectsOrganismProps> = ({
    variant = 'Projects01',
    projects = DEFAULT_PROJECTS,
    className,
}) => {
    // ProjectsMain - Replicating Projects.js and ProjectCard.js from portfolio-main
    if (variant === 'ProjectsMain') {
        const demoProjects = [
            {
                id: '1',
                title: 'Chatify',
                description: 'Personal Chat Room or Workspace to share resources and hangout with friends build with React.js, Material-UI, and Firebase. Have features which allows user for realtime messaging, image sharing as well as supports reactions on messages.',
                image: 'https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/Projects/chatify.png',
                technologies: ['React', 'Firebase', 'MUI'],
                githubUrl: 'https://github.com/soumyajit4419/Chatify',
                liveUrl: 'https://chatify-49.web.app/',
                isBlog: false
            },
            {
                id: '2',
                title: 'Bits-0f-C0de',
                description: 'My Personal blog page build with Next.js and Tailwind Css which takes the content from makdown files and renders it using Next.js. Supports dark mode and easy to write blogs using markdown.',
                image: 'https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/Projects/blog.png',
                technologies: ['Next.js', 'Tailwind CSS'],
                githubUrl: 'https://github.com/soumyajit4419/Bits-0f-C0de',
                liveUrl: 'https://soumyajit4419.github.io/Bits-0f-C0de/',
                isBlog: true
            },
            {
                id: '3',
                title: 'Editor.io',
                description: 'Online code and markdown editor build with react.js. Online Editor which supports html, css, and js code with instant view of website. Online markdown editor for building README file which supports GFM, Custom Html tags with toolbar and instant preview.Both the editor supports auto save of work using Local Storage',
                image: 'https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/Projects/editor.png',
                technologies: ['React.js', 'Ace Editor'],
                githubUrl: 'https://github.com/soumyajit4419/Editor.io',
                liveUrl: 'https://editor.soumya-jit.tech/',
                isBlog: false
            }
        ];

        const displayProjects = projects === DEFAULT_PROJECTS ? demoProjects : projects;

        return (
            <section className={`min-h-screen py-32 bg-gradient-to-b from-[#1b1a2ea9] to-[#121123] text-white ${className || ''}`} id="projects">
                {/* Particle effect placeholder - in real app would use tsparticles */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/projects-bg.png')] bg-cover bg-center" />

                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl font-bold text-center mb-4">
                        Recent Top <strong className="text-purple-500">Works</strong>
                    </h1>
                    <p className="text-center text-white mb-12">
                        Here are a few projects I've worked on recently.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {displayProjects.map((project) => (
                            <div key={project.id} className="h-full border border-purple-900/50 rounded-lg overflow-hidden bg-[#0d1b2a] shadow-lg hover:shadow-[0_0_20px_#6c63ff4d] transition-shadow duration-300 flex flex-col opacity-90 hover:opacity-100 hover:scale-[1.02]">
                                <img
                                    src={project.image || "https://via.placeholder.com/400x250"}
                                    alt={project.title}
                                    className="w-full h-48 object-cover p-8 rounded-3xl opacity-80 hover:opacity-100 transition-opacity"
                                />
                                <div className="p-6 flex flex-col flex-grow text-center">
                                    <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                                    <p className="text-gray-300 mb-6 text-sm text-justify leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="mt-auto flex justify-center gap-4">
                                        {project.githubUrl && (
                                            <Button className="bg-[#623686] hover:bg-[#6d3e92] text-white font-bold py-2 px-4 rounded flex items-center gap-2" asChild>
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <BsGithub /> GitHub
                                                </a>
                                            </Button>
                                        )}

                                        {project.liveUrl && !project.technologies?.includes('Blog') && (  // Heuristic for isBlog
                                            <Button className="bg-[#623686] hover:bg-[#6d3e92] text-white font-bold py-2 px-4 rounded flex items-center gap-2" asChild>
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <CgWebsite /> Demo
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return null;
};
