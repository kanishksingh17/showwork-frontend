import React from 'react';
import { usePortfolioSelector } from '@/store/portfolio/hooks';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface AboutOrganismProps {
    variant?: 'Hero01' | 'Hero02' | 'HeroMain';
    showImage?: boolean;
    showCTA?: boolean;
    className?: string;
}

export const AboutOrganism: React.FC<AboutOrganismProps> = ({
    variant = 'Hero01',
    showImage = true,
    showCTA = true,
    className,
}) => {
    const userData = usePortfolioSelector(state => state.portfolio.userData);

    // Variant: HeroMain (Replicating portfolio-main Home + Home2)
    if (variant === 'HeroMain') {
        return (
            <section className="min-h-screen flex flex-col pt-10 pb-16 bg-gradient-to-b from-[#1b1a2ea9] to-[#121123] text-white" id="about">
                <div className="container mx-auto px-4 flex-grow flex flex-col justify-center">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight flex items-center gap-4">
                                Hi There! <span className="animate-wave inline-block origin-[70%_70%] text-5xl">👋🏻</span>
                            </h1>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                I'M <strong className="text-purple-500">{userData.name ? userData.name.toUpperCase() : 'FULL STACK DEVELOPER'}</strong>
                            </h1>
                            <div className="text-3xl text-purple-400 font-mono h-12 flex items-center">
                                {/* Simple typewriter effect placeholder */}
                                <span className="border-r-2 border-purple-400 pr-2 animate-pulse">Full Stack Developer</span>
                            </div>

                            {showCTA && (
                                <div className="flex gap-4 pt-8">
                                    <Button size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 text-white border-none">
                                        Contact Me
                                    </Button>
                                </div>
                            )}
                        </div>
                        {showImage && (
                            <div className="flex justify-center">
                                <img
                                    src={userData.profileImage || "https://raw.githubusercontent.com/soumyajit4419/Portfolio/master/src/Assets/home-main.svg"}
                                    alt="home pic"
                                    className="max-w-md w-full filter drop-shadow-xl"
                                    style={{ maxHeight: '450px' }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* "LET ME INTRODUCE MYSELF" Section (Home2.js equivalent) */}
                <div className="container mx-auto px-4 mt-32">
                    <div className="grid md:grid-cols-3 gap-12 items-center">
                        <div className="md:col-span-2 space-y-6">
                            <h1 className="text-3xl font-bold uppercase">Let Me <span className="text-purple-500">Introduce</span> Myself</h1>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                I fell in love with programming and I have at least learnt something, I think… 🤷‍♂️
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                I am fluent in classics like
                                <i className="text-purple-500 not-italic"> C++, Javascript and Python. </i>
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                My field of Interest's are building new
                                <i className="text-purple-500 not-italic"> Web Technologies and Products </i>
                                and also in areas related to <i className="text-purple-500 not-italic"> Blockchain.</i>
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Whenever possible, I also apply my passion for developing products with <span className="text-purple-500">Node.js</span> and
                                <i className="text-purple-500 not-italic"> Modern Javascript Library and Frameworks</i>  like
                                <i className="text-purple-500 not-italic"> React.js and Next.js</i>
                            </p>
                        </div>
                        <div className="flex justify-center">
                            {/* Avatar/Tilt image placeholder */}
                            <div className="relative w-64 h-64">
                                <div className="absolute inset-0 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
                                <div className="relative w-full h-full bg-transparent border-2 border-purple-500/30 rounded-full flex items-center justify-center p-4">
                                    <span className="text-8xl">👨‍💻</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (variant === 'Hero01') {
        return (
            <section className={`container mx-auto py-20 ${className || ''}`} id="about">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                            {userData.name || 'Your Name'}
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400">
                            {userData.title || 'Your Title'}
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {userData.bio || 'Your bio goes here. Share your story, experience, and what makes you unique.'}
                        </p>
                        {showCTA && (
                            <div className="flex gap-4">
                                <Button size="lg" className="gap-2">
                                    <Mail className="w-4 h-4" />
                                    Contact Me
                                </Button>
                                <Button size="lg" variant="outline" className="gap-2">
                                    <Download className="w-4 h-4" />
                                    Download CV
                                </Button>
                            </div>
                        )}
                    </div>
                    {showImage && (
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-30" />
                                <img
                                    src={userData.profileImage || 'https://via.placeholder.com/400'}
                                    alt={userData.name}
                                    className="relative rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-white dark:border-gray-800 shadow-2xl"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }

    if (variant === 'Hero02') {
        return (
            <section className={`bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20 ${className || ''}`} id="about">
                <div className="container mx-auto text-center space-y-8">
                    {showImage && (
                        <img
                            src={userData.profileImage || 'https://via.placeholder.com/200'}
                            alt={userData.name}
                            className="rounded-full w-32 h-32 mx-auto object-cover border-4 border-white shadow-xl"
                        />
                    )}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {userData.name || 'Your Name'}
                        </h1>
                        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
                            {userData.title || 'Your Title'}
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            {userData.bio || 'Your bio goes here.'}
                        </p>
                    </div>
                    {showCTA && (
                        <div className="flex gap-4 justify-center">
                            <Button size="lg">Get In Touch</Button>
                            <Button size="lg" variant="outline">View Work</Button>
                        </div>
                    )}
                </div>
            </section>
        );
    }

    return null;
};
