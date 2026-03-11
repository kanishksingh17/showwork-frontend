import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#050608] border-t border-white/5 p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-[60px] mb-12">
                <div className="lg:col-span-2">
                    <div className="font-['Bebas_Neue'] text-[28px] tracking-[4px] text-white mb-4">DATAFORGE</div>
                    <p className="text-[12px] text-white/30 leading-[1.7] max-w-[260px]">
                        Building high-throughput, fault-tolerant data pipelines that scale. Available for consulting and full-time opportunities.
                    </p>
                </div>
                <div>
                    <div className="font-mono text-[10px] tracking-[3px] uppercase text-white/30 mb-5">NAV</div>
                    <ul className="list-none flex flex-col gap-3 p-0 m-0">
                        <li><a href="#about" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">ABOUT</a></li>
                        <li><a href="#architecture" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">STACK</a></li>
                        <li><a href="#projects" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">PROJECTS</a></li>
                        <li><a href="#contact" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">CONTACT</a></li>
                    </ul>
                </div>
                <div>
                    <div className="font-mono text-[10px] tracking-[3px] uppercase text-white/30 mb-5">STACK</div>
                    <ul className="list-none flex flex-col gap-3 p-0 m-0">
                        <li><a href="#" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">Kafka</a></li>
                        <li><a href="#" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">Spark</a></li>
                        <li><a href="#" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">Delta Lake</a></li>
                        <li><a href="#" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">Kubernetes</a></li>
                    </ul>
                </div>
                <div>
                    <div className="font-mono text-[10px] tracking-[3px] uppercase text-white/30 mb-5">CONNECT</div>
                    <ul className="list-none flex flex-col gap-3 p-0 m-0">
                        <li><a href="#" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">GitHub</a></li>
                        <li><a href="#" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">LinkedIn</a></li>
                        <li><a href="#" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">Email</a></li>
                        <li><a href="#" className="font-mono text-[12px] text-white/40 no-underline transition-colors duration-200 tracking-[1px] hover:text-[#F5720A]">Resume</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 font-mono text-[10px] text-white/20 tracking-[2px] gap-4">
                <span>© 2026 DATAFORGE · ALEX MORGAN</span>
                <span className="text-white/5 hidden md:block">———————————————</span>
                <span>DESIGNED WITH PRECISION · BUILT TO SCALE</span>
            </div>
        </footer>
    );
};
