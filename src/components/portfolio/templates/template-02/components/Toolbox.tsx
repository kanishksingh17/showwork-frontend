import React from 'react';

export const Toolbox: React.FC<{ userData: any }> = ({ userData }) => {
    return (
        <section className="mb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tools card */}
                <div className="bg-white dark:bg-[#181a20] p-8 rounded-3xl border border-gray-200 dark:border-[#2d3039] shadow-sm flex flex-col justify-between">
                    <div className="text-center mb-8">
                        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Toolbox</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Check out my favorite tools and spots around the web.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {(userData?.techStack?.slice(0, 6) || ['react', 'nextjs', 'figma']).map((tech: any) => {
                            const techName = typeof tech === 'string' ? tech : (tech?.name || 'Tool');
                            return (
                                <div key={techName} className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                                    <span className="text-xs font-semibold text-gray-400 uppercase">{techName.substring(0, 3)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Booking card */}
                <div className="bg-white dark:bg-[#181a20] p-8 rounded-3xl border border-gray-200 dark:border-[#2d3039] shadow-sm flex flex-row items-center gap-6 overflow-hidden">
                    <div className="flex-1">
                        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Book a call with me</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">I'd love to chat even if there's no agenda!</p>
                    </div>
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-xs border border-gray-100 dark:border-gray-700 select-none opacity-80 pointer-events-none transform rotate-3 scale-110 origin-top-right">
                        <div className="flex justify-between mb-2 font-medium text-gray-500">
                            <span>October, 2025</span>
                            <span>• 30 min call</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-gray-400">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
                            <span>8</span><span className="bg-indigo-600 text-white rounded-full">9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
