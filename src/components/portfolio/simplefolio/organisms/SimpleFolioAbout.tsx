import React from 'react';
import { SimpleFolioSectionTitle } from '../atoms/SimpleFolioSectionTitle';
import { SimpleFolioButton } from '../atoms/SimpleFolioButton';

interface SimpleFolioAboutProps {
    bio: string;
    profileImage: string;
    resumeUrl?: string;
}

export const SimpleFolioAbout: React.FC<SimpleFolioAboutProps> = ({ bio, profileImage, resumeUrl }) => {
    return (
        <section id="about" className="bg-[#02aab0] text-white py-32 clip-path-about">
            <div className="container mx-auto px-8 lg:px-24">
                <SimpleFolioSectionTitle dark={false} className="mb-24">About me</SimpleFolioSectionTitle>
                <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-center">

                    {/* Image */}
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <div className="rounded shadow-lg overflow-hidden max-w-[300px]">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-auto block"
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="md:w-1/2 text-left">
                        <div className="text-[1.6rem] mb-6 leading-relaxed">
                            <p className="mb-4">
                                {bio}
                            </p>
                            <p className="mb-8">
                                Experienced in designing scalable backend systems, ensuring security, and optimizing performance for high-traffic applications.
                            </p>
                        </div>
                        {resumeUrl && (
                            <span className="flex mt-8">
                                <SimpleFolioButton variant="resume" href={resumeUrl} target="_blank">
                                    View Resume
                                </SimpleFolioButton>
                            </span>
                        )}
                    </div>

                </div>
            </div>
            {/* Note: clip-path logic needs css class or style */}
            <style>{`
        .clip-path-about {
           /* Since this is a solid color section, the original template uses specific styling. The background is #02aab0 which is primary color. */
           /* The clip path is actually not evident in simplefolio for About section, it's just a solid block. */
        }
      `}</style>
        </section>
    );
};
