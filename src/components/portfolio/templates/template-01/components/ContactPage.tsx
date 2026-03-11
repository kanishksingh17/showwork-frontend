import React from 'react';
import { Mail, Send, Calendar, FileText, Download, Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC<{ userData: any }> = ({ userData }) => {
    return (
        <div>
            {/* Page Header */}
            <section className="space-y-4 mb-12">
                <div className="flex items-center gap-2 mb-2">
                    <Mail className="text-blue-600 dark:text-blue-400" size={18} />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">Get in touch</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                    Contact & Inquiry
                </h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed font-medium">
                    Available for freelance consulting, frontend architecture reviews, and full-stack development projects. Let's discuss how I can help your team.
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                {/* Contact Form */}
                <div className="lg:col-span-2 space-y-8">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500" htmlFor="name">Name</label>
                                <input
                                    className="block w-full rounded-xl border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white shadow-sm focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 sm:text-sm py-4 px-5 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 font-medium"
                                    id="name"
                                    name="name"
                                    placeholder="Jane Doe"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500" htmlFor="email">Email</label>
                                <input
                                    className="block w-full rounded-xl border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white shadow-sm focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 sm:text-sm py-4 px-5 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 font-medium"
                                    id="email"
                                    name="email"
                                    placeholder="jane@company.com"
                                    type="email"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500" htmlFor="subject">Subject</label>
                            <select
                                className="block w-full rounded-xl border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white shadow-sm focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 sm:text-sm py-4 px-5 outline-none transition-all font-medium appearance-none"
                                id="subject"
                                name="subject"
                            >
                                <option>Project Inquiry</option>
                                <option>Consulting Request</option>
                                <option>Frontend Architecture Review</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500" htmlFor="message">Message</label>
                            <textarea
                                className="block w-full rounded-xl border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white shadow-sm focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 sm:text-sm py-4 px-5 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 font-medium resize-none"
                                id="message"
                                name="message"
                                placeholder="Tell me about your project, timeline, and goals..."
                                rows={6}
                            ></textarea>
                        </div>
                        <button className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border border-transparent text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg text-white bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 group" type="submit">
                            Send Message
                            <Send className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={14} />
                        </button>
                    </form>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-12">
                    {/* Quick Connect */}
                    <div>
                        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-2">
                            Quick Connect
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'LinkedIn', icon: <Linkedin size={20} />, color: 'hover:text-[#0A66C2]' },
                                { name: 'Twitter', icon: <Twitter size={20} />, color: 'hover:text-[#1DA1F2]' },
                                { name: 'Github', icon: <Github size={20} />, color: 'hover:text-black dark:hover:text-white' },
                                { name: 'Email', icon: <Mail size={20} />, color: 'hover:text-red-500' }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800/30 border border-gray-100/50 dark:border-gray-700/50 rounded-2xl hover:shadow-xl hover:border-blue-500/20 transition-all group"
                                    href="#"
                                >
                                    <div className={`text-gray-400 ${social.color} transition-colors mb-3`}>
                                        {social.icon}
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Scheduling */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 flex items-center gap-2">
                            Scheduling
                        </h3>
                        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100/30 dark:border-blue-900/20">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                Prefer a direct conversation? Book a 30-minute discovery call directly on my calendar.
                            </p>
                            <a className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group" href="#">
                                View Availability <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Resume CTA */}
                    <div className="pt-4">
                        <a className="flex items-center justify-between w-full px-5 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-200 rounded-xl border border-gray-100 dark:border-gray-700 transition-all group shadow-sm hover:shadow-md" href="#">
                            <div className="flex items-center gap-3">
                                <span className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border border-gray-100 dark:border-gray-600">
                                    <FileText className="text-gray-400" size={16} />
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Download Resume</span>
                            </div>
                            <Download className="text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white transition-colors" size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
