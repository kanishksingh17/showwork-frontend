import React from 'react';
import { Moon, Sun } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Blogs', id: 'blogs' },
];

interface NavbarProps {
    currentView: string;
    onNavigate: (view: string) => void;
    isDarkMode: boolean;
    onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, isDarkMode, onToggleTheme }) => {

    return (
        <div className="absolute top-4 px-4 md:px-8 z-50 w-full flex items-center justify-between pointer-events-none">
            {/* Left Spacer for centering */}
            <div className="flex-1 hidden md:block" />

            {/* Centered Nav Links */}
            <nav className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-lg shadow-zinc-200/20 dark:shadow-none pointer-events-auto">
                <div className="flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => onNavigate(link.id)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                                currentView === link.id
                                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 shadow-sm'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Right Corner: Theme Switcher */}
            <div className="flex-1 flex justify-end pointer-events-auto">
                <button 
                    onClick={onToggleTheme}
                    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                    className="p-2 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-lg shadow-zinc-200/20 dark:shadow-none text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                    {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
            </div>
        </div>
    );
};
