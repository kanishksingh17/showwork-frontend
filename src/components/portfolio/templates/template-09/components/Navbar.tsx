import React, { useState, useEffect } from 'react';

interface NavbarProps {
    name?: string;
    sections?: { id: string; label: string }[];
}

export const Navbar: React.FC<NavbarProps> = ({ name = 'ALEX MORGAN' }) => {
    const [activeSection, setActiveSection] = useState<string>('');

    const defaultSections = [
        { id: 'about', label: 'ABOUT' },
        { id: 'architecture', label: 'STACK' },
        { id: 'projects', label: 'PROJECTS' },
        { id: 'metrics', label: 'METRICS' },
        { id: 'contact', label: 'CONTACT' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let current = '';

            sections.forEach((sec) => {
                const top = (sec as HTMLElement).offsetTop - 100;
                if (window.scrollY >= top) {
                    current = sec.id;
                }
            });

            if (current !== activeSection) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-12 bg-[#050608]/90 backdrop-blur-xl border-b border-white/8 z-50">
            <a href="#" className="flex items-center gap-2.5 no-underline">
                <div className="w-8 h-8 bg-[#F5720A] flex items-center justify-center font-mono text-[10px] text-black font-medium" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', animation: 'hexSpin 8s linear infinite' }}>
                    DF
                </div>
                <span className="font-['Bebas_Neue'] text-xl tracking-[0.15em] text-white">
                    DATAFORGE
                </span>
            </a>

            <ul className="flex items-center gap-10 list-none m-0 p-0 hidden md:flex">
                {defaultSections.map((sec) => (
                    <li key={sec.id}>
                        <a
                            href={`#${sec.id}`}
                            onClick={(e) => handleScrollTo(e, sec.id)}
                            className={`font-mono text-[11px] tracking-[0.2em] uppercase transition-colors relative pb-1 ${activeSection === sec.id ? 'text-white' : 'text-white/50 hover:text-white'
                                }`}
                        >
                            {sec.label}
                            {/* Active/Hover underline */}
                            <span className={`absolute bottom-[-10px] left-0 h-[1px] bg-[#F5720A] transition-all duration-300 ${activeSection === sec.id ? 'w-full' : 'w-0'}`} />
                        </a>
                    </li>
                ))}
            </ul>

            <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#F5720A] border border-[#F5720A]/35 px-6 py-2.5 bg-transparent no-underline transition-all duration-250 cursor-none hover:bg-[#F5720A] hover:text-black hover:shadow-[0_0_40px_rgba(245,114,10,0.25)]"
            >
                HIRE ME →
            </a>
        </nav>
    );
};
