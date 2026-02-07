import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface NavLinkProps {
    to: string;
    children: React.ReactNode;
    isActive?: boolean;
    variant?: 'underline' | 'pill' | 'highlight';
    className?: string;
    onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
    to,
    children,
    isActive,
    variant = 'underline',
    className,
    onClick,
}) => {
    const baseStyles = 'transition-all duration-300 font-medium cursor-pointer flex items-center gap-1';

    const variants = {
        underline: `hover:text-blue-600 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'text-blue-600 after:w-full' : 'text-gray-600 dark:text-gray-300'}`,
        pill: `px-4 py-2 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'}`,
        highlight: `px-4 py-2 rounded-md ${isActive ? 'text-purple-400 font-bold bg-[#1a192d]' : 'text-white hover:text-purple-400'}`,
    };

    const combinedClassName = cn(baseStyles, variants[variant], className);

    // If it's an anchor link (starts with #) or external, use standard a tag
    if (to.startsWith('#') || to.startsWith('http')) {
        return (
            <a href={to} className={combinedClassName} onClick={onClick} target={to.startsWith('http') ? "_blank" : undefined} rel={to.startsWith('http') ? "noopener noreferrer" : undefined}>
                {children}
            </a>
        );
    }

    return (
        <Link
            to={to}
            className={combinedClassName}
            onClick={onClick}
        >
            {children}
        </Link>
    );
};
