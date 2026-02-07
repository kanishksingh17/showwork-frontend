import React from 'react';

interface SimpleFolioSectionTitleProps {
    children: React.ReactNode;
    className?: string;
    dark?: boolean;
}

export const SimpleFolioSectionTitle: React.FC<SimpleFolioSectionTitleProps> = ({
    children,
    className = '',
    dark = true
}) => {
    return (
        <h2 className={`text-[4rem] font-bold mb-16 uppercase ${dark ? 'text-[#272341]' : 'text-white'} ${className}`}>
            {children}
        </h2>
    );
};
