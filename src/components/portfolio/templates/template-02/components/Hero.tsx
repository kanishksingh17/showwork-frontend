import React from 'react';

export const Hero: React.FC<{ userData: any, nameToDisplay: string, customData?: any }> = ({ userData, nameToDisplay, customData }) => {
    const avatarUrl = userData?.avatar || userData?.profilePic || '/generated/braydon_smile_5_v2_1771991358144.png';
    const headline = customData?.headline || userData?.heroHeadline || `Hey, I'm ${nameToDisplay.split(' ')[0]}! Welcome to my corner of the internet!`;
    const bio = customData?.bio || userData?.bio || "I'm a front-end developer with a love for design and a knack for tinkering. This site is intentionally over-engineered and serves as my playground for experimenting with new ideas and seeing what sticks!";

    // Photo stack images (using the ones from the HTML or fallbacks)
    const stackImages = [
        '/generated/braydon_portrait_1_1771991150632.png',
        '/generated/braydon_speaking_2_1771991179057.png',
        '/generated/braydon_coding_3_1771991236698.png',
        '/generated/braydon_outdoor_4_1771991290995.png',
        '/generated/braydon_smile_5_v2_1771991358144.png'
    ];

    return (
        <section className="flex flex-col items-center text-center mb-24">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-[#181a20] shadow-lg mb-8">
                <img alt={`${nameToDisplay} Avatar`} className="w-full h-full object-cover" src={avatarUrl} />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight text-gray-900 dark:text-white">
                {headline.includes('Welcome') ? (
                    <>
                        Hey, I'm {nameToDisplay.split(' ')[0]}! <br className="hidden md:block" />
                        Welcome to my corner of <br className="hidden md:block" />
                        the internet!
                    </>
                ) : headline}
            </h1>

            {/* Bio */}
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed">
                {bio}
            </p>

            {/* Photo Stack */}
            <div className="relative w-full h-72 md:h-96 flex justify-center items-end overflow-hidden md:overflow-visible mb-12 px-4">
                <div className="absolute w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-[#181a20] transform -translate-x-48 md:-translate-x-64 -rotate-12 hover:z-50 hover:scale-105 transition-all duration-300 bg-gray-100 mb-4 md:mb-8">
                    <img alt="Portrait" className="w-full h-full object-cover" src={stackImages[0]} />
                </div>
                <div className="absolute w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-[#181a20] transform -translate-x-24 md:-translate-x-32 -rotate-6 z-10 hover:z-50 hover:scale-105 transition-all duration-300 bg-gray-100 mb-2 md:mb-4">
                    <img alt="Speaking" className="w-full h-full object-cover" src={stackImages[1]} />
                </div>
                <div className="absolute w-44 h-56 md:w-52 md:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#181a20] transform z-20 hover:scale-105 transition-all duration-300 bg-gray-100">
                    <img alt="Coding" className="w-full h-full object-cover" src={stackImages[2]} />
                </div>
                <div className="absolute w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-[#181a20] transform translate-x-24 md:translate-x-32 rotate-6 z-10 hover:z-50 hover:scale-105 transition-all duration-300 bg-gray-100 mb-2 md:mb-4">
                    <img alt="Event" className="w-full h-full object-cover" src={stackImages[3]} />
                </div>
                <div className="absolute w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-[#181a20] transform translate-x-48 md:translate-x-64 rotate-12 hover:z-50 hover:scale-105 transition-all duration-300 bg-gray-100 mb-4 md:mb-8">
                    <img alt="Outdoor" className="w-full h-full object-cover" src={stackImages[4]} />
                </div>
            </div>
        </section>
    );
};
