import React from 'react';
import { Briefcase, Code, Rocket, Camera, Headphones, BookOpen, Ruler } from 'lucide-react';

export const AboutStory: React.FC<{ userData: any }> = ({ userData }) => {
    const portraitUrl = '/generated/braydon_portrait_1_1771991150632.png';

    const timeline = [
        {
            date: "2023 - Present",
            title: "Senior Frontend Engineer",
            company: "TechCorp Inc. • Remote",
            description: "Leading the frontend architecture for the core product. Migrated the legacy codebase to Next.js and implemented a new design system.",
            icon: <Briefcase size={24} />
        },
        {
            date: "2021 - 2023",
            title: "Frontend Developer",
            company: "Creative Agency • Austin, TX",
            description: "Worked with a variety of clients to build responsive websites and web applications. Collaborated closely with designers to ensure pixel-perfect implementation.",
            icon: <Code size={24} />
        },
        {
            date: "2019 - 2021",
            title: "Junior Web Developer",
            company: "StartupHub • Remote",
            description: "Started my professional career building landing pages and email templates. Learned the ropes of Git, agile methodology, and team collaboration.",
            icon: <Rocket size={24} />
        }
    ];

    const lifestyle = [
        { title: "Photography", desc: "Capturing moments", icon: <Camera size={24} />, color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
        { title: "Music", desc: "Indie Rock lover", icon: <Headphones size={24} />, color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
        { title: "Reading", desc: "Sci-Fi & Tech", icon: <BookOpen size={24} />, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
        { title: "Running", desc: "Marathon training", icon: <Ruler size={24} />, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" }
    ];

    return (
        <div className="space-y-32 mb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* About Me Section */}
            <section className="mb-20">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
                    About Me
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
                    I'm a developer who builds for the web with a designer's eye. I believe in clean code, user-centric design, and making the internet a little more interesting, one pixel at a time.
                </p>
            </section>

            {/* My Story Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Story</h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            My journey started back in 2015 when I stumbled upon the "Inspect Element" feature in Chrome. I was fascinated by how changing a single line of code could instantly transform what I saw on the screen. That curiosity quickly spiraled into late nights learning HTML, CSS, and eventually JavaScript.
                        </p>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            Over the years, I've had the privilege of working at advertising agencies, a start-up, and a large corporation. My main focus these days is building accessible, inclusive products and digital experiences at <span className="font-semibold text-gray-900 dark:text-white">TechCorp Inc</span> for a variety of clients.
                        </p>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            When I'm not at the computer, I'm usually hanging out with my wife and our two cats, reading a good book, or running. I'm a huge fan of indie rock and I'm always looking for new music recommendations.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            I also love to share what I learn. I write articles on my blog and occasionally speak at tech conferences. I believe that knowledge sharing is the best way to grow as a developer and give back to the community that helped me get started.
                        </p>
                    </div>
                </div>
                <div className="lg:col-span-5">
                    <div className="sticky top-8">
                        <div className="bg-white dark:bg-[#181a20] rounded-3xl p-3 border border-gray-100 dark:border-[#2d3039] shadow-sm transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                                <img alt="Portrait" className="absolute inset-0 w-full h-full object-cover" src={portraitUrl} />
                            </div>
                            <div className="pt-4 pb-2 px-2 text-center">
                                <p className="font-medium text-gray-900 dark:text-white">{userData?.name || 'Braydon Coyer'}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Front-end Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Timeline Section */}
            <section className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">Career</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white">My Timeline</h2>
                </div>
                <div className="relative timeline-line space-y-12 pl-4 md:pl-0">
                    {timeline.map((item, idx) => (
                        <div key={idx} className="relative flex flex-col md:flex-row gap-8 items-start group">
                            <div className="hidden md:block w-32 pt-2 text-right text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                                {item.date}
                            </div>
                            <div className={`absolute left-8 md:left-[9.5rem] w-4 h-4 rounded-full bg-white dark:bg-[#181a20] border-4 ${idx === 0 ? 'border-indigo-600' : 'border-gray-300 dark:border-gray-600'} z-10 top-2.5 group-hover:border-indigo-600 transition-colors`}></div>
                            <div className="flex-1 ml-12 md:ml-12">
                                <span className="md:hidden text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1 block">{item.date}</span>
                                <div className="bg-white dark:bg-[#181a20] p-6 rounded-2xl border border-gray-100 dark:border-[#2d3039] shadow-sm transition-all duration-300 hover:border-indigo-600/30 group-hover:shadow-md">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h3>
                                            <p className="text-sm text-gray-500">{item.company}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lifestyle Section */}
            <section className="mb-32">
                <div className="text-center mb-12">
                    <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">Lifestyle</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white">Things I love</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {lifestyle.map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#181a20] p-6 rounded-3xl border border-gray-100 dark:border-[#2d3039] shadow-sm text-center hover:-translate-y-1 transition-transform duration-300 group">
                            <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                                {item.icon}
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
