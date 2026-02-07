import React from 'react';

interface SimpleFolioButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'hero' | 'resume' | 'default';
    className?: string;
    href?: string;
    target?: string;
    rel?: string;
}

export const SimpleFolioButton: React.FC<SimpleFolioButtonProps> = ({
    children,
    variant = 'default',
    className = '',
    href,
    ...props
}) => {
    const baseStyles = "inline-block relative px-6 py-3 font-bold text-lg transition-all duration-600 ease-custom z-10 no-underline";

    // Custom gradient border imitation using pseudo-elements logic via Tailwind classes
    // The original SCSS uses border-image which is tricky in Tailwind. 
    // We'll use a specific style for 'hero' that closely mimics it.

    const heroStyles = `
    border-2 border-transparent 
    bg-clip-text text-transparent bg-gradient-to-br from-[#02aab0] to-[#00cdac]
    relative
    after:content-[''] after:block after:absolute after:w-0 after:h-full after:left-0 after:bottom-0 after:-z-10 
    after:transition-all after:duration-300 after:ease-custom
    after:bg-gradient-to-br after:from-[#02aab0] after:to-[#00cdac]
    hover:text-white hover:after:w-full hover:border-[#02aab0]
    border-image-slice-1
  `;
    // Note: border-image in tailwind arbitrary values or style tag might be needed for exact match, 
    // but let's try a standard border with gradient text first.
    // Actually, to get the gradient border *and* text, we might need a wrapper or style prop.

    // Alternative for Hero: Use data uri or simpler border color for now, 
    // as partial gradient borders are complex. 
    // Let's stick to the SCSS logic: border-style: solid; border-image: linear-gradient(...)

    const resumeStyles = "text-white border-2 border-white hover:text-[#00cdac] hover:bg-white";

    if (href) {
        return (
            <a
                href={href}
                className={`${baseStyles} ${variant === 'hero' ? 'simplefolio-btn-hero' : ''} ${variant === 'resume' ? resumeStyles : ''} ${className}`}
                {...(props as any)}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            className={`${baseStyles} ${variant === 'hero' ? 'simplefolio-btn-hero' : ''} ${variant === 'resume' ? resumeStyles : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
