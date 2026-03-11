import React from 'react';

export const About: React.FC<{ userData: any; onLearnMore?: () => void; onViewToolbox?: () => void }> = ({ userData, onLearnMore, onViewToolbox }) => {
    const portraitUrl = '/generated/braydon_speaking_2_1771991179057.png';
    const connectionUrl = '/generated/braydon_portrait_1_1771991150632.png';
    const toolIcons = [
        '/generated/tool_abstract_butterfly_final_1771991903196.png',
        '/generated/tool_vscode_1771991837745.png',
        '/generated/tool_abstract_orange_1771991869459.png'
    ];

    return (
        <section id="about" className="mb-32">
            <div className="text-center mb-12">
                <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">About</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">Here's what sets me apart<br />and makes me unique</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Learn more card (Top Left) */}
                <div
                    onClick={onLearnMore}
                    className="bg-white dark:bg-[#181a20] p-8 rounded-3xl border border-gray-200 dark:border-[#2d3039] shadow-sm flex flex-col justify-between relative overflow-hidden group min-h-[320px] cursor-pointer"
                >
                    <div className="relative z-10">
                        <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Learn more about me</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium leading-relaxed">
                            Good evening! <br />
                            I'm {userData?.name?.split(' ')[0] || 'Braydon'}, an experienced <br />
                            front-end developer.
                        </p>
                        <div className="inline-flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                            Read my story →
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-56 h-64 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 transition-transform group-hover:rotate-0 z-0">
                        <img alt="Portrait" className="w-full h-full object-cover" src={portraitUrl} />
                    </div>
                </div>

                {/* Connections card (Top Right) */}
                <div className="bg-white dark:bg-[#181a20] p-8 rounded-3xl border border-gray-200 dark:border-[#2d3039] shadow-sm flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[320px]">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <div className="w-48 h-48 border border-gray-400 rounded-full absolute translate-x-[-80px]"></div>
                        <div className="w-56 h-56 border border-gray-400 rounded-full absolute"></div>
                        <div className="w-48 h-48 border border-gray-300 dark:border-gray-600 rounded-full absolute translate-x-[80px]"></div>
                        <div className="w-72 h-72 border border-gray-300 dark:border-gray-600 rounded-full absolute"></div>
                    </div>
                    <div className="relative z-10 mb-6">
                        <div className="w-24 h-24 rounded-full border-4 border-white dark:border-[#181a20] shadow-xl overflow-hidden mx-auto bg-gray-50">
                            <img alt="Connection" className="w-full h-full object-cover" src={connectionUrl} />
                        </div>
                    </div>
                    <h3 className="font-bold text-xl mb-2 relative z-10 text-gray-900 dark:text-white">Connections</h3>
                    <p className="text-gray-600 dark:text-gray-400 relative z-10 max-w-[240px]">An evolving list of people I've met and those I wish to meet.</p>
                </div>

                {/* Toolbox card (Bottom Left) */}
                <div
                    onClick={onViewToolbox}
                    className="bg-white dark:bg-[#181a20] p-8 rounded-3xl border border-gray-200 dark:border-[#2d3039] shadow-sm flex flex-col justify-between min-h-[320px] cursor-pointer group"
                >
                    <div className="text-center mb-10">
                        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">Toolbox</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Check out my favorite tools and spots around the web.</p>
                    </div>
                    <div className="flex justify-center items-center gap-6 overflow-hidden py-4">
                        {toolIcons.map((icon, idx) => (
                            <div key={idx} className={`w-20 h-20 bg-gray-50 dark:bg-[#1f2229] rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 dark:border-[#2d3039] transform ${idx === 1 ? 'scale-110 z-10' : 'scale-90 opacity-60'} transition-transform hover:scale-125 duration-300`}>
                                <img src={icon} alt={`Tool ${idx}`} className="w-12 h-12 object-contain" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking card (Bottom Right) */}
                <div className="bg-white dark:bg-[#181a20] p-8 rounded-3xl border border-gray-200 dark:border-[#2d3039] shadow-sm flex flex-col md:flex-row items-center gap-8 overflow-hidden min-h-[320px]">
                    <div className="flex-1">
                        <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Book a call with me</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">I'd love to chat even <br className="hidden md:block" /> if there's no agenda!</p>
                    </div>
                    <div className="w-full md:w-auto bg-gray-50 dark:bg-[#1f2229] p-6 rounded-2xl text-[10px] border border-gray-100 dark:border-[#2d3039] shadow-inner select-none transform md:rotate-2 md:scale-105">
                        <div className="flex justify-between mb-4 font-bold text-gray-400 uppercase tracking-tight">
                            <span>October, 2025</span>
                            <span>• 30 min call</span>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-gray-500 font-medium">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => <span key={d} className="text-[8px] text-gray-400">{d}</span>)}
                            {Array.from({ length: 14 }, (_, i) => i + 1).map(n => (
                                <span key={n} className={`flex items-center justify-center w-6 h-6 rounded-lg ${n === 9 ? 'bg-indigo-600 text-white shadow-md' : ''}`}>
                                    {n}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
