import React from 'react';

interface FooterStrategicProps {
    name?: string;
    socials?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        [key: string]: string | undefined;
    };
}

export const FooterStrategic: React.FC<FooterStrategicProps> = ({ name, socials }) => {
    return (
        <footer className="bg-white text-primary py-24 px-8 md:px-16 border-t border-black/5">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16">
                    <div className="space-y-8">
                        <div className="text-3xl font-black uppercase tracking-tighter">
                            {name}
                        </div>
                        <p className="text-sm text-muted max-w-xs font-medium uppercase tracking-tight">
                            Building resilient systems and engineering operational growth at scale.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
                        <div className="space-y-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Navigation</p>
                            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-wider">
                                <a className="hover:text-accent transition-colors" href="#summary">Summary</a>
                                <a className="hover:text-accent transition-colors" href="#values">Expertise</a>
                                <a className="hover:text-accent transition-colors" href="#metrics">Impact</a>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Connect</p>
                            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-wider">
                                {socials?.github && <a className="hover:text-accent transition-colors" href={socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                                {socials?.linkedin && <a className="hover:text-accent transition-colors" href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                                {socials?.twitter && <a className="hover:text-accent transition-colors" href={socials.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Portfolio Status</p>
                            <div className="text-xs font-mono font-bold text-accent">
                                v3.0.0-PERSONAL
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-24 pt-8 border-t border-black/5 text-[10px] font-bold text-muted uppercase tracking-[0.3em] flex flex-col md:flex-row justify-between gap-4">
                    <span>© {new Date().getFullYear()} {name}. All Rights Reserved.</span>
                    <span className="text-[8px] opacity-50 tracking-normal italic">Engineered with precision. Non-corporate briefing format.</span>
                </div>
            </div>
        </footer>
    );
};
