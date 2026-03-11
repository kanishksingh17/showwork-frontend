import React from 'react';

export const Community: React.FC<{ userData: any }> = () => {
    const avatarUrl = '/generated/braydon_speaking_2_1771991179057.png';
    const connectionAvatars = [
        '/generated/braydon_portrait_1_1771991150632.png',
        '/generated/braydon_speaking_2_1771991179057.png',
        '/generated/braydon_coding_3_1771991236698.png'
    ];

    return (
        <section id="projects" className="mb-32">
            <div className="text-center mb-16">
                <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">My Site</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white leading-tight">My site is a playful sandbox.<br />Explore, experiment, && say hello</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Changelog Card */}
                <div className="bg-white dark:bg-[#181a20] rounded-[32px] p-8 border border-gray-100 dark:border-[#2d3039] shadow-sm flex flex-col min-h-[400px] relative overflow-hidden group">
                    <div className="flex-1 relative">
                        {/* Timeline UI */}
                        <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-gray-100 dark:bg-gray-800 transform -translate-x-1/2 z-0"></div>

                        <div className="relative z-10 space-y-8">
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-[#1f2229] p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2d3039] text-[10px] w-[140px] transform -rotate-1 group-hover:rotate-0 transition-transform">
                                    <p className="text-gray-400 mb-1">October 20, 2025</p>
                                    <p className="font-bold text-gray-700 dark:text-gray-300">Listen to Select Artic...</p>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <div className="bg-white dark:bg-[#1f2229] p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2d3039] text-[10px] w-[140px] transform rotate-2 group-hover:rotate-0 transition-transform">
                                    <p className="text-gray-400 mb-1">April 18, 2025</p>
                                    <p className="font-bold text-gray-700 dark:text-gray-300">Nominated for Site of ...</p>
                                </div>
                            </div>

                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-[#1f2229] p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2d3039] text-[10px] w-[140px] transform -rotate-2 group-hover:rotate-0 transition-transform">
                                    <p className="text-gray-400 mb-1">April 3, 2025</p>
                                    <p className="font-bold text-gray-700 dark:text-gray-300">Blogfolio V5 is Now L...</p>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <div className="bg-white dark:bg-[#1f2229] p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-[#2d3039] text-[10px] w-[140px] transform rotate-1 group-hover:rotate-0 transition-transform">
                                    <p className="text-gray-400 mb-1">March 22, 2025</p>
                                    <p className="font-bold text-gray-700 dark:text-gray-300">New ways to connect ...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">Changelog</h3>
                        <p className="text-gray-500 text-sm mt-1">Here's what's new on my site</p>
                    </div>
                </div>

                {/* Speaking Card */}
                <div className="bg-white dark:bg-[#181a20] rounded-[32px] p-8 border border-gray-100 dark:border-[#2d3039] shadow-sm flex flex-col items-center justify-between min-h-[400px] relative overflow-hidden group">
                    <div className="flex-1 flex flex-col items-center justify-center w-full relative">
                        {/* Concentric Avatars */}
                        <div className="relative mb-12 flex items-center justify-center w-full">
                            <div className="absolute w-44 h-44 border border-gray-200 dark:border-gray-800 rounded-full opacity-40"></div>
                            <div className="absolute w-60 h-60 border border-gray-200 dark:border-gray-800 rounded-full opacity-20"></div>

                            <div className="relative flex items-center justify-center gap-2">
                                <div className="w-14 h-14 rounded-full border-2 border-white dark:border-[#181a20] shadow-md overflow-hidden opacity-60 transform scale-90 translate-x-4">
                                    <img src={connectionAvatars[0]} alt="Speaker Small" className="w-full h-full object-cover grayscale" />
                                </div>
                                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-[#181a20] shadow-xl overflow-hidden z-10 transform transition-transform group-hover:scale-105 duration-500">
                                    <img src={avatarUrl} alt="Speaker Large" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-14 h-14 rounded-full border-2 border-white dark:border-[#181a20] shadow-md overflow-hidden opacity-60 transform scale-90 -translate-x-4">
                                    <img src={connectionAvatars[2]} alt="Speaker Small" className="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                        </div>

                        {/* Audio Waveform UI */}
                        <div className="bg-gray-50 dark:bg-[#1f2229] px-4 py-2 rounded-2xl flex items-center gap-1 shadow-inner border border-gray-100 dark:border-[#2d3039]">
                            {[3, 5, 2, 6, 8, 4, 7, 3, 5, 2, 6, 4].map((h, i) => (
                                <div key={i} className="w-[3px] bg-gray-400 dark:bg-gray-600 rounded-full transition-all duration-300 group-hover:bg-indigo-500" style={{ height: `${h * 2}px` }}></div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full text-center md:text-left">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">Speaking</h3>
                        <p className="text-gray-500 text-sm mt-1">Talks, podcasts, tutorials and more</p>
                    </div>
                </div>

                {/* Community Wall Card */}
                <div className="bg-white dark:bg-[#181a20] rounded-[32px] p-8 border border-gray-100 dark:border-[#2d3039] shadow-sm flex flex-col min-h-[400px] relative overflow-hidden group">
                    <div className="flex-1 relative flex items-center justify-center">
                        {/* Background Dots */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        {/* Polaroid Cards */}
                        <div className="relative">
                            <div className="absolute w-44 h-52 bg-white dark:bg-[#1f2229] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2d3039] p-3 transform -rotate-12 -translate-x-12 -translate-y-4 group-hover:-rotate-6 transition-transform">
                                <div className="w-full h-32 rounded-lg bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 mb-3"></div>
                                <div className="space-y-2">
                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                                    <div className="h-1.5 w-3/4 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                </div>
                            </div>

                            <div className="absolute w-48 h-56 bg-white dark:bg-[#1f2229] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#2d3039] p-4 transform rotate-6 translate-x-12 translate-y-4 group-hover:rotate-3 transition-transform z-10">
                                <div className="w-full h-36 rounded-lg bg-gradient-to-br from-pink-300 via-orange-200 to-yellow-200 mb-4"></div>
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                                    <div className="h-2 w-1/2 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 relative z-20">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white">Community Wall</h3>
                        <p className="text-gray-500 text-sm mt-1">Let everyone know you were here</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
