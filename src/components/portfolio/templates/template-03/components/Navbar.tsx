import React from 'react';
import { Moon, Sun } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blogs', href: '#blogs' },
];

export const Navbar: React.FC = () => {
    return (
        <div className="sticky top-6 px-4 md:px-8 z-50 w-full flex items-center justify-between pointer-events-none">
            {/* Left Spacer for centering */}
            <div className="flex-1 hidden md:block" />

            {/* Centered Nav Links */}
            <nav className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-lg shadow-zinc-200/20 dark:shadow-none pointer-events-auto">
                <div className="flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </nav>

            {/* Right Corner: Theme Switcher */}
            <div className="flex-1 flex justify-end pointer-events-auto">
                <button className="p-2.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-lg shadow-zinc-200/20 dark:shadow-none text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    <Sun className="w-4 h-4 dark:hidden" />
                    <Moon className="w-4 h-4 hidden dark:block" />
                </button>
            </div>
        </div>
    );
};
