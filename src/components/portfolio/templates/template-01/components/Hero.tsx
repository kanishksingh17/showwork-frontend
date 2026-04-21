import React from 'react';
import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react';

export const Hero: React.FC<{ userData: any; customData?: any }> = ({ userData, customData }) => {
    const avatarUrl = customData?.logo || userData?.avatar || userData?.profilePicture || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop";
    const profession = customData?.profession || customData?.title || userData?.profession || userData?.title || "Professional Javascript Developer";
    const headline = customData?.headline || userData?.professionalHeadline || userData?.headline || "Providing value for Business Growth through code.";
    const name = userData?.name || "Milton Ivan";

    const socialLinks = customData?.socialLinks || [];

    const getIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'github': return <Github className="w-4 h-4" />;
            case 'linkedin': return <Linkedin className="w-4 h-4" />;
            case 'twitter': return <Twitter className="w-4 h-4" />;
            case 'email': return <Mail className="w-4 h-4" />;
            default: return <Globe className="w-4 h-4" />;
        }
    };

    return (
        <section className="text-center space-y-6 animate-in fade-in slide-in-from-top-4 duration-700 pt-12 pb-20">
            <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl group">
                <img
                    alt={name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                    src={avatarUrl}
                />
            </div>
            <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 font-black mb-3">
                    {name} — {profession}
                </p>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
                    {headline.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i < headline.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </h1>
                <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {customData?.bio || userData?.bio || "I design and build high-performance web applications with a focus on user experience and scalable architecture."}
                </p>

                {socialLinks.length > 0 && (
                    <div className="flex items-center justify-center gap-4 pt-6">
                        {socialLinks.map((link: any, idx: number) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
                                title={link.platform}
                            >
                                {getIcon(link.platform)}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
