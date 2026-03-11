import React from 'react';

export const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-[120px] px-12 bg-[#080B10] border-t border-white/5 relative">
            <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
                <div>
                    <div className="font-mono text-[10px] tracking-[4px] uppercase text-[#F5720A] mb-4">// 05 — CONNECT</div>
                    <h2 className="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[3px] text-white leading-[0.95]">
                        LET'S BUILD<br />SOMETHING
                    </h2>
                </div>
                <div className="font-['Bebas_Neue'] text-[120px] text-white/5 tracking-[-4px] leading-none select-none hidden md:block">
                    05
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                <div className="fade-up">
                    <div className="font-['Bebas_Neue'] text-[clamp(32px,4vw,56px)] tracking-[3px] text-white leading-[0.95] mb-8">
                        NEED A PIPELINE<br />THAT <span className="text-[#F5720A]">NEVER BREAKS?</span>
                    </div>
                    <p className="text-[14px] text-white/40 leading-[1.8] mb-12">
                        Available for contract engagements, full-time roles, and architecture consulting. I work best with teams that care about data quality, reliability, and engineering excellence.
                    </p>
                    <div className="flex flex-col gap-4">
                        <a href="mailto:alex@dataforge.dev" className="flex items-center gap-4 p-4 bg-[#0D1117] border border-white/5 no-underline transition-all duration-200 hover:border-[#F5720A]/35 hover:pl-6">
                            <span className="text-[20px]">✉</span>
                            <div>
                                <div className="font-mono text-[10px] tracking-[2px] uppercase text-white/30">EMAIL</div>
                                <div className="text-[13px] text-white/80 font-medium">alex@dataforge.dev</div>
                            </div>
                        </a>
                        <a href="#" className="flex items-center gap-4 p-4 bg-[#0D1117] border border-white/5 no-underline transition-all duration-200 hover:border-[#F5720A]/35 hover:pl-6">
                            <span className="text-[20px]">💼</span>
                            <div>
                                <div className="font-mono text-[10px] tracking-[2px] uppercase text-white/30">LINKEDIN</div>
                                <div className="text-[13px] text-white/80 font-medium">linkedin.com/in/alexmorgan-data</div>
                            </div>
                        </a>
                        <a href="#" className="flex items-center gap-4 p-4 bg-[#0D1117] border border-white/5 no-underline transition-all duration-200 hover:border-[#F5720A]/35 hover:pl-6">
                            <span className="text-[20px]">🐙</span>
                            <div>
                                <div className="font-mono text-[10px] tracking-[2px] uppercase text-white/30">GITHUB</div>
                                <div className="text-[13px] text-white/80 font-medium">github.com/alexmorgan-pipes</div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="bg-[#0D1117] border border-white/5 p-10 relative fade-up before:content-['GET_IN_TOUCH'] before:absolute before:-top-[1px] before:left-10 before:font-mono before:text-[10px] before:tracking-[3px] before:bg-[#0D1117] before:px-3 before:text-[#F5720A] before:-translate-y-1/2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] tracking-[2px] uppercase text-white/30">NAME</label>
                            <input type="text" className="bg-[#111620] border border-white/5 text-white/80 font-mono text-[13px] px-4 py-3.5 outline-none transition-colors duration-200 focus:border-[#F5720A]/35 hover:cursor-none hover:border-[#F5720A]/35" placeholder="Jane Smith" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] tracking-[2px] uppercase text-white/30">EMAIL</label>
                            <input type="email" className="bg-[#111620] border border-white/5 text-white/80 font-mono text-[13px] px-4 py-3.5 outline-none transition-colors duration-200 focus:border-[#F5720A]/35 hover:cursor-none hover:border-[#F5720A]/35" placeholder="jane@company.com" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="font-mono text-[10px] tracking-[2px] uppercase text-white/30">SUBJECT</label>
                        <input type="text" className="bg-[#111620] border border-white/5 text-white/80 font-mono text-[13px] px-4 py-3.5 outline-none transition-colors duration-200 focus:border-[#F5720A]/35 hover:cursor-none hover:border-[#F5720A]/35" placeholder="Data pipeline architecture consultation" />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="font-mono text-[10px] tracking-[2px] uppercase text-white/30">MESSAGE</label>
                        <textarea className="bg-[#111620] border border-white/5 text-white/80 font-mono text-[13px] px-4 py-3.5 outline-none transition-colors duration-200 resize-none h-[120px] focus:border-[#F5720A]/35 hover:cursor-none hover:border-[#F5720A]/35" placeholder="Describe your data infrastructure challenges..."></textarea>
                    </div>
                    <button className="w-full p-[18px] bg-[#F5720A] border-none font-mono text-[12px] tracking-[3px] uppercase text-black cursor-none relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,114,10,0.25)]">
                        SEND MESSAGE →
                    </button>
                </div>
            </div>
        </section>
    );
};
