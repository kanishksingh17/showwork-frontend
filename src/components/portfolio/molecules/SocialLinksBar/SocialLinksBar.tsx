import React from 'react';
import { SocialIcon } from '../../atoms/SocialIcon/SocialIcon';

export interface SocialLink {
    platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'website';
    url: string;
}

export interface SocialLinksBarProps {
    links: SocialLink[];
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outline' | 'solid' | 'ghost';
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

export const SocialLinksBar: React.FC<SocialLinksBarProps> = ({
    links,
    size = 'md',
    variant = 'outline',
    orientation = 'horizontal',
    className,
}) => {
    return (
        <div className={`${orientation === 'horizontal' ? 'flex gap-3' : 'flex flex-col gap-3'} ${className || ''}`}>
            {links.map((link) => (
                <SocialIcon
                    key={link.platform}
                    platform={link.platform}
                    href={link.url}
                    size={size}
                    variant={variant}
                />
            ))}
        </div>
    );
};
