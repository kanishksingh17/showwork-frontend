import React from 'react';
import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SocialIconProps {
    platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'website';
    href: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outline' | 'solid' | 'ghost';
    className?: string;
}

const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
    website: Globe,
};

const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

export const SocialIcon: React.FC<SocialIconProps> = ({
    platform,
    href,
    size = 'md',
    variant = 'outline',
    className,
}) => {
    const Icon = iconMap[platform];

    const variantStyles = {
        outline: 'border border-gray-300 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600',
        solid: 'bg-gray-900 text-white hover:bg-blue-600',
        ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'p-2 rounded-full transition-all',
                variantStyles[variant],
                className
            )}
            aria-label={platform}
        >
            <Icon className={sizeMap[size]} />
        </a>
    );
};
