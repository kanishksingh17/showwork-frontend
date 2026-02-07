import { usePortfolioSelector } from '@/store/portfolio/hooks';
import {
    DiJavascript1,
    DiReact,
    DiNodejs,
    DiGit
} from 'react-icons/di';
import {
    SiMui,
    SiGraphql,
    SiSolidity,
    SiRedux,
    SiMongodb,
    SiHtml5,
    SiTypescript,
    SiPython,
    SiDocker,
    SiPostman,
    SiVercel,
    SiNetlify,
    SiHeroku
} from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";

export interface SkillItem {
    name: string;
    icon?: React.ReactNode;
}

export interface SkillsOrganismProps {
    variant?: 'Skills01' | 'Skills02' | 'SkillsMain';
    skills?: SkillItem[];
    className?: string;
}

// Default skills for Full-Stack Developer
const DEFAULT_SKILLS: SkillItem[] = [
    { name: 'HTML5', icon: <SiHtml5 /> },
    { name: 'JavaScript', icon: <DiJavascript1 /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'React', icon: <DiReact /> },
    { name: 'Redux', icon: <SiRedux /> },
    { name: 'Node.js', icon: <DiNodejs /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'GraphQL', icon: <SiGraphql /> },
    { name: 'Git', icon: <DiGit /> },
    { name: 'Docker', icon: <SiDocker /> },
];

export const SkillsOrganism: React.FC<SkillsOrganismProps> = ({
    variant = 'Skills01',
    skills = DEFAULT_SKILLS,
    className,
}) => {
    if (variant === 'Skills01') {
        return (
            <section className={`container mx-auto py-20 ${className || ''}`} id="skills">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Professional <span className="text-blue-600">Skillset</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Technologies I work with
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-lg transition-all group"
                        >
                            <div className="text-6xl text-blue-600 group-hover:scale-110 transition-transform">
                                {skill.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    // SkillsMain - Replicating Techstack and Toolstack from portfolio-main
    if (variant === 'SkillsMain') {
        const techStack = [
            { icon: <SiHtml5 /> },
            { icon: <DiJavascript1 /> },
            { icon: <DiNodejs /> },
            { icon: <DiReact /> },
            { icon: <SiRedux /> },
            { icon: <SiMongodb /> },
            { icon: <SiGraphql /> },
            { icon: <SiSolidity /> },
            { icon: <SiMui /> }, // Material UI
            { icon: <DiGit /> },
        ];

        const toolStack = [
            { icon: <VscVscode /> },
            { icon: <SiPostman /> },
            { icon: <SiVercel /> },
            { icon: <SiNetlify /> },
            // Heroku removed in newer versions usually, but keeping if in source
            { icon: <SiHeroku /> },
        ];

        return (
            <section className={`min-h-screen py-20 bg-gradient-to-b from-[#121123] to-[#1b1a2ea9] text-white ${className || ''}`} id="skills">
                <div className="container mx-auto px-4">

                    {/* Professional Skillset */}
                    <h1 className="text-4xl font-bold text-center mb-12">
                        Professional <span className="text-purple-500">Skillset</span>
                    </h1>

                    <div className="flex flex-wrap justify-center gap-8 mb-20">
                        {techStack.map((tech, index) => (
                            <div key={index} className="w-36 h-36 flex justify-center items-center border border-[#cb5ae588] rounded-md transition-all duration-200 hover:scale-105 hover:border-purple-500 hover:shadow-[0_0_15px_#cb5ae5] bg-opacity-10 backdrop-blur-sm">
                                <div className="text-6xl text-white">
                                    {tech.icon}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tools I Use */}
                    <h1 className="text-4xl font-bold text-center mb-12">
                        <span className="text-purple-500">Tools</span> I use
                    </h1>

                    <div className="flex flex-wrap justify-center gap-8">
                        {toolStack.map((tool, index) => (
                            <div key={index} className="w-36 h-36 flex justify-center items-center border border-[#cb5ae588] rounded-md transition-all duration-200 hover:scale-105 hover:border-purple-500 hover:shadow-[0_0_15px_#cb5ae5] bg-opacity-10 backdrop-blur-sm">
                                <div className="text-6xl text-white">
                                    {tool.icon}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        );
    }

    // Skills02 - List format with progress bars
    return (
        <section className={`bg-gray-50 dark:bg-gray-900 py-20 ${className || ''}`} id="skills">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center">
                    Technical <span className="text-blue-600">Skills</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {skills.map((skill, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="text-2xl text-blue-600">{skill.icon}</div>
                                    <span className="font-medium">{skill.name}</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{ width: `${80 + Math.random() * 20}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
