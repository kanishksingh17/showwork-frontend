import React from 'react';
import { Server, Share2, Mail, Star } from 'lucide-react';

export const Hero: React.FC<{ aboutData: any; onNavigate: (view: string) => void }> = ({ aboutData, onNavigate }) => {
    const { headline, bio, tagline } = aboutData;

    // Logic to keep the gradient style for the last few words
    const words = headline.split(' ');
    const mainHeadline = words.length > 2 ? words.slice(0, -2).join(' ') + ' ' : headline + ' ';
    const gradientHeadline = words.length > 2 ? words.slice(-2).join(' ') : '';

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/20 text-gray-800 dark:text-gray-200">
                    <Server size={14} className="mr-2" /> Backend Engineering
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/20 text-gray-800 dark:text-gray-200">
                    <Share2 size={14} className="mr-2" /> System Design
                </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white">
                {mainHeadline}
                {gradientHeadline && (
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                        {gradientHeadline}
                    </span>
                )}
            </h1>

            <p className="text-lg text-gray-900/80 dark:text-gray-300 max-w-lg leading-relaxed font-sans">
                {bio}
            </p>

            <div className="glass-panel bg-white/30 dark:bg-slate-800/30 p-2 pl-3 rounded-full flex flex-col sm:flex-row gap-2 max-w-lg items-center relative shadow-lg group">
                <div className="hidden sm:flex items-center justify-center pl-3 text-gray-500">
                    <Mail size={20} />
                </div>
                <input
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 h-12 rounded-full px-4 sm:px-0"
                    placeholder="project@company.com"
                    type="email"
                />
                <button
                    onClick={() => onNavigate('contact')}
                    className="bg-[#D9FF3F] text-black font-bold whitespace-nowrap px-8 h-12 rounded-full hover:bg-[#c2ef30] transition-colors shadow-md w-full sm:w-auto active:scale-95"
                >
                    Connect Now!
                </button>
                <div className="absolute -top-8 left-4 text-xs font-semibold text-gray-900/60 dark:text-gray-300 font-sans">
                    {tagline}
                </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                        <img
                            key={i}
                            alt={`User ${i}`}
                            className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                        +2k
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center text-yellow-500 text-sm">
                        <Star size={14} fill="currentColor" />
                        <span className="font-bold text-gray-900 dark:text-white ml-1">5.0/5</span>
                    </div>
                    <span className="text-xs text-gray-900/60 dark:text-gray-400 font-medium font-sans">From 56+ tech leaders</span>
                </div>
            </div>
        </div>
    );
};
