import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps {
    text: string;
    variant?: 'text' | 'image' | 'gradient';
    imageSrc?: string;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({
    text,
    variant = 'text',
    imageSrc,
    className
}) => {
    if (variant === 'image' && imageSrc) {
        return (
            <img
                src={imageSrc}
                alt={text}
                className={cn('h-10 w-auto', className)}
            />
        );
    }

    if (variant === 'gradient') {
        return (
            <h1 className={cn(
                'text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600',
                'bg-clip-text text-transparent',
                className
            )}>
                {text}
            </h1>
        );
    }

    return (
        <h1 className={cn('text-2xl font-bold text-gray-900 dark:text-white', className)}>
            {text}
        </h1>
    );
};
