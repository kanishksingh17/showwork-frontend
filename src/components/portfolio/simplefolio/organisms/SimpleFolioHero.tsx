import React from 'react';
import { SimpleFolioButton } from '../atoms/SimpleFolioButton';

interface SimpleFolioHeroProps {
    name: string;
    title: string;
}

export const SimpleFolioHero: React.FC<SimpleFolioHeroProps> = ({ name, title }) => {
    return (
        <section id="hero" className="min-h-screen flex items-center bg-white px-8 lg:px-24">
            <div className="container mx-auto">
                <h1 className="text-[4rem] sm:text-[5.6rem] font-bold text-[#272341] mb-8 leading-[1.1]">
                    Hi, my name is <span className="text-[#02aab0]">{name}</span>
                    <br />
                    I'm the {title}.
                </h1>
                <p className="text-[2.4rem] font-bold text-[#272341] mb-12">
                    <SimpleFolioButton variant="hero" href="#about">
                        Know more
                    </SimpleFolioButton>
                </p>
            </div>
        </section>
    );
};
