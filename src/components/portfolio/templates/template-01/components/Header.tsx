import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
    userData: any;
    currentView: 'home' | 'experience' | 'blog' | 'contact' | 'projects';
    onNavigate: (view: 'home' | 'experience' | 'blog' | 'contact' | 'projects') => void;
}

export const Header: React.FC<HeaderProps> = ({ userData, currentView, onNavigate }) => {
    const firstLetter = (userData?.name || 'M').charAt(0).toUpperCase();

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="flex justify-center items-center py-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                <button
                    onClick={() => onNavigate('experience')}
                    className={`${currentView === 'experience' ? 'text-gray-900 dark:text-white font-bold' : 'hover:text-gray-900 dark:hover:text-white'} transition-colors uppercase tracking-widest text-[10px]`}
                >
                    Experience
                </button>
                <button
                    onClick={() => onNavigate('projects')}
                    className={`${currentView === 'projects' ? 'text-gray-900 dark:text-white font-bold' : 'hover:text-gray-900 dark:hover:text-white'} transition-colors uppercase tracking-widest text-[10px]`}
                >
                    Projects
                </button>
                <button
                    onClick={() => onNavigate('home')}
                    className="text-2xl font-black text-gray-900 dark:text-white mx-6 hover:scale-110 transition-transform"
                >
                    {firstLetter}
                </button>
                <button
                    onClick={() => onNavigate('contact')}
                    className={`${currentView === 'contact' ? 'text-gray-900 dark:text-white font-bold' : 'hover:text-gray-900 dark:hover:text-white'} transition-colors uppercase tracking-widest text-[10px]`}
                >
                    Contact
                </button>
                <button
                    onClick={() => onNavigate('blog')}
                    className={`${currentView === 'blog' ? 'text-gray-900 dark:text-white font-bold' : 'hover:text-gray-900 dark:hover:text-white'} transition-colors uppercase tracking-widest text-[10px]`}
                >
                    Blog
                </button>
                <button
                    onClick={toggleTheme}
                    className="ml-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    <Sun className="hidden dark:block text-gray-400" size={18} />
                    <Moon className="block dark:hidden text-gray-500" size={18} />
                </button>
            </div>
        </nav>
    );
};
