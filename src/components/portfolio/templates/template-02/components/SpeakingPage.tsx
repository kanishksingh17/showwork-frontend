import React from 'react';
import { PlayCircle, Presentation, MapPin, Video, ArrowRight, Palette, Zap } from 'lucide-react';

export const SpeakingPage: React.FC<{ userData: any }> = () => {
    const pastTalks = [
        {
            event: "React Summit 2024",
            duration: "45 min",
            title: "Server Components: From Zero to Hero",
            description: "A comprehensive guide to understanding and implementing React Server Components in production. We cover the mental model shift, data fetching strategies, and common pitfalls to avoid.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDo9blbiDNbAKH-KJOUwYas6kpSXRHmEZOoZOZ_JTkQ6M-79Lx-_-PlzvSCLncDJeR3BsbJkYpdqbSubM-udoQIsR_ANNporgcFAzMobfkdH-cG4t0Hfp6YkThSUPppvEaDaaefACjnIg7MF2b9OZqbwAKsr3NaDOi95KJzGpudQZPw19YO0Z1wmaB8q4qKw-LrfUedShjdqW7gECZVqAb3BuJ3b73mbsvX8ETbjLbA-gP3ISJMswsZw4gvNHYguzRa5CnjevxHK3dJ"
        },
        {
            event: "Frontend Love 2023",
            duration: "30 min",
            title: "Designing for Developers",
            description: "Bridging the gap between design and engineering. How to create design systems that developers actually want to use, and how to improve communication between teams.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANZHDdtL2N8TRRXgb0AXg8HIfR2Nsw-hjN_c7ICYkoojE4r5QGjMGO6_aHZJon7o3rEritbdmcpQZp6iYsS6_gQWV6Fi0L8wJ9vH_7Aaeabkj5Sh9tObUbSbMT2XdNwae-TSWjLoLbHa8rRi7GYHshxD4udbG2pbuJO_gmJnFomrvt22unZiZ3riOAafhenAwQxLkiZXR_CVJD00idCVxd9eIDOqD_wxAaDNN5A2MIH8n85Huac2AyZXXMZ1-QrlWicJ8UWOszSww-"
        }
    ];

    const upcomingEvents = [
        {
            tag: "Confirmed",
            tagColor: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
            date: "Oct 24-25, 2025",
            location: "San Francisco, CA",
            locationIcon: <MapPin size={16} />,
            title: "Next.js Conf 2025",
            description: "Exploring the future of React Server Components and what it means for frontend architecture at scale."
        },
        {
            tag: "Remote",
            tagColor: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
            date: "Nov 12, 2025",
            location: "Online Workshop",
            locationIcon: <Video size={16} />,
            title: "Advanced Tailwind CSS Patterns",
            description: "A deep dive into creating maintainable, scalable design systems using utility classes and configuration."
        },
        {
            tag: "Tentative",
            tagColor: "bg-gray-100 dark:bg-gray-800 text-gray-500",
            date: "Dec 05, 2025",
            location: "London, UK",
            locationIcon: <MapPin size={16} />,
            title: "React Advanced London",
            description: "Discussing state management patterns in large-scale applications and performance optimization techniques.",
            isTentative: true
        }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section */}
            <section className="flex flex-col items-start mb-24 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white">
                    Speaking & Workshops
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    I love sharing my knowledge and experiences with the developer community. Whether it's a conference talk, a meetup, or a workshop, I'm always eager to connect and learn together.
                </p>
                <div className="flex gap-4">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-xl transition-colors shadow-lg">
                        Request to Speak
                    </button>
                    <button className="bg-white dark:bg-[#181a20] border border-gray-200 dark:border-[#2d3039] hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2.5 px-6 rounded-xl transition-colors shadow-sm">
                        View Press Kit
                    </button>
                </div>
            </section>

            {/* Upcoming events */}
            <section className="mb-32">
                <div className="text-center mb-12">
                    <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">Calendar</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">Upcoming Events</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event, idx) => (
                        <div key={idx} className={`bg-white dark:bg-[#181a20] p-6 rounded-3xl border border-gray-100 dark:border-[#2d3039] shadow-sm flex flex-col h-full relative group hover:border-indigo-600/50 transition-colors ${event.isTentative ? 'opacity-70' : ''}`}>
                            <div className={`absolute top-6 right-6 ${event.tagColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                                {event.tag}
                            </div>
                            <div className="mb-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium block mb-1">{event.date}</span>
                                <span className="flex items-center text-xs text-gray-400 gap-1 uppercase font-bold tracking-wider">
                                    {event.locationIcon} {event.location}
                                </span>
                            </div>
                            <h3 className="font-bold text-xl mb-3 group-hover:text-indigo-600 transition-colors text-gray-900 dark:text-white">{event.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                                {event.description}
                            </p>
                            <div className="pt-4 border-t border-gray-100 dark:border-[#2d3039] mt-auto">
                                {event.isTentative ? (
                                    <span className="text-sm font-semibold flex items-center gap-2 text-gray-400 cursor-not-allowed">
                                        Coming Soon
                                    </span>
                                ) : (
                                    <a className="text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all text-indigo-600 dark:text-indigo-400" href="#">
                                        {event.tag === 'Remote' ? 'Register Now' : 'Event Details'} <ArrowRight size={16} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Speaking topics */}
            <section className="mb-32">
                <div className="text-center mb-12">
                    <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">Expertise</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">Topics I Speak About</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-[#181a20] p-5 rounded-2xl border border-gray-100 dark:border-[#2d3039] shadow-sm flex items-center justify-center flex-col gap-3 hover:scale-105 transition-transform duration-300 cursor-default">
                        <i className="fa-brands fa-react text-4xl text-blue-400"></i>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">React & Next.js</span>
                    </div>
                    <div className="bg-white dark:bg-[#181a20] p-5 rounded-2xl border border-gray-100 dark:border-[#2d3039] shadow-sm flex items-center justify-center flex-col gap-3 hover:scale-105 transition-transform duration-300 cursor-default">
                        <Palette className="text-4xl text-purple-500" size={40} />
                        <span className="font-semibold text-gray-700 dark:text-gray-200">UI/UX Design</span>
                    </div>
                    <div className="bg-white dark:bg-[#181a20] p-5 rounded-2xl border border-gray-100 dark:border-[#2d3039] shadow-sm flex items-center justify-center flex-col gap-3 hover:scale-105 transition-transform duration-300 cursor-default">
                        <Zap className="text-4xl text-green-500" size={40} />
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Web Performance</span>
                    </div>
                    <div className="bg-white dark:bg-[#181a20] p-5 rounded-2xl border border-gray-100 dark:border-[#2d3039] shadow-sm flex items-center justify-center flex-col gap-3 hover:scale-105 transition-transform duration-300 cursor-default">
                        <i className="fa-brands fa-css3-alt text-4xl text-sky-500"></i>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">CSS Architecture</span>
                    </div>
                </div>
            </section>

            {/* Archive section */}
            <section className="mb-32">
                <div className="text-center mb-12">
                    <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">Archive</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">Past Talks & Recordings</h2>
                </div>
                <div className="flex flex-col gap-8">
                    {pastTalks.map((talk, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#181a20] rounded-3xl border border-gray-100 dark:border-[#2d3039] shadow-sm overflow-hidden flex flex-col md:flex-row group hover:border-indigo-600/30 transition-colors">
                            <div className="md:w-2/5 relative bg-gray-100 dark:bg-gray-800 min-h-[240px] overflow-hidden">
                                <img alt="Talk Thumbnail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={talk.image} />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                                        <PlayCircle className="text-white" size={32} />
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-3/5 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{talk.event}</span>
                                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500">{talk.duration}</span>
                                    </div>
                                    <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{talk.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                        {talk.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-auto">
                                    <button className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity shadow-md">
                                        <PlayCircle size={18} /> Watch Recording
                                    </button>
                                    <button className="flex items-center gap-2 bg-transparent border border-gray-300 dark:border-gray-600 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200">
                                        <Presentation size={18} /> View Slides
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
