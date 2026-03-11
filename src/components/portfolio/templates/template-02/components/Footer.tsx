import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

export const Footer: React.FC<{ userData: any }> = ({ userData }) => {
    const socials = userData?.socialLinks || userData?.socials || {};

    return (
        <footer className="border-t border-gray-200 dark:border-[#2d3039] pt-16 pb-12 text-left">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-1">
                    <div className="w-10 h-10 bg-[#181a20] dark:bg-white rounded-xl flex items-center justify-center border border-gray-200 dark:border-[#2d3039] shadow-sm mb-6 overflow-hidden p-1">
                        <img src="/favicon.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                        I'm {userData?.name || 'Braydon'} - a developer and designer. Thanks for checking out my site!
                    </p>
                    <p className="text-xs text-gray-400">© {new Date().getFullYear()} {userData?.name || 'Braydon'}</p>
                </div>
                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">General</h4>
                        <ul className="space-y-3 text-gray-500 dark:text-gray-400">
                            <li><a className="hover:text-indigo-600 transition-colors" href="#">Home</a></li>
                            <li><a className="hover:text-indigo-600 transition-colors" href="#about">About</a></li>
                            <li><a className="hover:text-indigo-600 transition-colors" href="#projects">Projects</a></li>
                            <li><a className="hover:text-indigo-600 transition-colors" href="#blog">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Specifics</h4>
                        <ul className="space-y-3 text-gray-500 dark:text-gray-400">
                            <li><a className="hover:text-indigo-600 transition-colors" href="#toolbox">Toolbox</a></li>
                            <li><a className="hover:text-indigo-600 transition-colors" href="#speaking">Speaking</a></li>
                            <li><a className="hover:text-indigo-600 transition-colors" href="#">Products</a></li>
                            <li><a className="hover:text-indigo-600 transition-colors" href="#">Community Wall</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Extra</h4>
                        <ul className="space-y-3 text-gray-500 dark:text-gray-400">
                            <li><a className="hover:text-indigo-600 transition-colors" href="#">Changelog</a></li>
                            <li><a className="hover:text-indigo-600 transition-colors" href="#">Connections</a></li>
                            <li><a className="hover:text-indigo-600 transition-colors" href="#">Links</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="flex bg-[#2d2d2d] dark:bg-[#181a20] rounded-full px-4 py-2 border border-transparent shadow-lg gap-4 items-center">
                    <a href={socials.twitter || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Twitter size={18} strokeWidth={1.5} />
                    </a>
                    <a href={socials.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Linkedin size={18} strokeWidth={1.5} />
                    </a>
                    <a href={socials.github || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={18} strokeWidth={1.5} />
                    </a>
                </div>
            </div>
        </footer>
    );
};
