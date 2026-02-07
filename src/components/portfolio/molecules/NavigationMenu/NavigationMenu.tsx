import React from 'react';
import { NavLink } from '../../atoms/NavLink/NavLink';

export interface MenuItem {
    label: string;
    to: string;
    icon?: React.ReactNode;
}

export interface NavigationMenuProps {
    items: MenuItem[];
    activeItem?: string;
    variant?: 'underline' | 'pill' | 'highlight';
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
    items,
    activeItem,
    variant = 'underline',
    orientation = 'horizontal',
    className,
}) => {
    return (
        <nav className={`${orientation === 'horizontal' ? 'flex gap-6' : 'flex flex-col gap-4'} ${className || ''}`}>
            {items.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    isActive={activeItem === item.to}
                    variant={variant}
                    className="flex items-center gap-1"
                >
                    {item.icon && <span className="mb-0.5">{item.icon}</span>}
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
};
