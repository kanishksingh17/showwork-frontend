import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

interface ResumeMinimalProps {
    userData: any;
    projects: any[];
}

export const ResumeMinimal: React.FC<ResumeMinimalProps> = ({ userData, projects }) => {
    return (
        <div className="w-full h-full bg-white text-gray-900 p-12 font-serif leading-relaxed">
            {/* Header */}
            <header className="border-b-2 border-gray-900 pb-6 mb-8">
                <h1 className="text-4xl font-bold tracking-tight uppercase mb-2">{userData.name}</h1>
                <h2 className="text-xl text-gray-600 mb-4 font-sans">{userData.title || 'Software Developer'}</h2>

                <div className="flex flex-wrap gap-4 text-sm font-sans text-gray-600">
                    <div className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{userData.email || 'your.email@example.com'}</span>
                    </div>
                    {userData.socialLinks?.github && (
                        <div className="flex items-center gap-1">
                            <Github className="w-3.5 h-3.5" />
                            <span>github.com/{userData.socialLinks.github}</span>
                        </div>
                    )}
                    {userData.socialLinks?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="w-3.5 h-3.5" />
                            <span>linkedin.com/in/{userData.socialLinks.linkedin}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Summary */}
            <section className="mb-8">
                <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-3 font-sans tracking-wide">Summary</h3>
                <p className="text-sm">
                    {userData.bio || 'Highly motivated developer with a focus on building clean, scalable applications.'}
                </p>
            </section>

            {/* Skills */}
            <section className="mb-8">
                <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-3 font-sans tracking-wide">Skills</h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {(userData.techStack || userData.skills || []).map((skill: any, i: number) => (
                        <span key={i} className="font-medium">
                            • {typeof skill === 'string' ? skill : skill.name}
                        </span>
                    ))}
                </div>
            </section>

            {/* Experience */}
            {userData.experience && userData.experience.length > 0 && (
                <section className="mb-8">
                    <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-3 font-sans tracking-wide">Experience</h3>
                    <div className="space-y-6">
                        {userData.experience.map((exp: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-base">{exp.title}</h4>
                                    <span className="text-xs text-gray-400 font-sans">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-600 mb-2">{exp.companyName}</div>
                                <p className="text-sm text-gray-700">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {userData.education && userData.education.length > 0 && (
                <section className="mb-8">
                    <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-3 font-sans tracking-wide">Education</h3>
                    <div className="space-y-4">
                        {userData.education.map((edu: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-base">{edu.degreeName}</h4>
                                </div>
                                <div className="text-sm font-medium text-gray-600 mb-1">{edu.schoolName}</div>
                                <p className="text-sm text-gray-700">{edu.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            <section className="mb-8">
                <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-3 font-sans tracking-wide">Selected Projects</h3>
                <div className="space-y-6">
                    {projects.slice(0, 3).map((project, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-base">{project.name}</h4>
                                <span className="text-xs text-gray-400 italic">
                                    {project.technologies?.join(', ')}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700">{project.resumeBullet || project.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
