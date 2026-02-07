import React from 'react';
import { SimpleFolioSectionTitle } from '../atoms/SimpleFolioSectionTitle';
import { SimpleFolioButton } from '../atoms/SimpleFolioButton';

interface SimpleFolioContactProps {
    ctaText?: string;
    email?: string;
}

export const SimpleFolioContact: React.FC<SimpleFolioContactProps> = ({
    ctaText = "Would you like to work with me? Awesome!",
    email = "email@example.com"
}) => {
    return (
        <section id="contact" className="bg-white text-[#272341] py-32 text-center"
            style={{
                backgroundImage: 'linear-gradient(135deg, #02aab0 0%, #00cdac 100%)',
                color: 'white',
                clipPath: 'polygon(0 15vh, 100% 0, 100% 100%, 0 100%)',
                paddingBottom: '12rem',
                marginTop: '-10rem' // Overlap previous section
            }}
        >
            <div className="container mx-auto px-8 lg:px-24 pt-32">
                <SimpleFolioSectionTitle dark={false} className="mb-16">Contact</SimpleFolioSectionTitle>
                <div className="mb-12">
                    <p className="text-[2.4rem] mb-12 font-normal">
                        {ctaText}
                    </p>
                    <SimpleFolioButton variant="resume" href={`mailto:${email}`}>
                        Let's Talk
                    </SimpleFolioButton>
                </div>
            </div>
        </section>
    );
};
