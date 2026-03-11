import React from 'react';

export const AboutStats: React.FC<{ userData: any, projects: any[] }> = ({ userData, projects }) => {
    return (
        <section id="about" className="py-24 border-b border-white/10">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-12">
                    <div className="pt-1">
                        <span className="text-[11px] font-normal tracking-[0.18em] uppercase text-white/35">About Me</span>
                    </div>
                    <div>
                        <p className="font-display text-[36px] lg:text-[56px] font-bold leading-[1.1] uppercase tracking-[0.02em] text-white max-w-[900px]">
                            I am
                            <span className="inline-block w-[clamp(28px,3.5vw,44px)] h-[clamp(28px,3.5vw,44px)] rounded-full bg-[conic-gradient(from_0deg,#6EE7F7,#B56EF7,#F7A26E,#6EE7F7)] align-middle mx-2 relative top-[-2px]" />
                            a cloud architect expertise in cutting-edge
                            <span className="inline-block w-[clamp(28px,3.5vw,44px)] h-[clamp(28px,3.5vw,44px)] rounded-lg bg-[conic-gradient(from_90deg,#F7A26E,#F76EE7,#B56EF7,#F7A26E)] align-middle mx-2 relative top-[-2px]" />
                            technologies and distributed systems.
                        </p>

                        <p className="mt-8 text-[15px] text-white/55 leading-relaxed max-w-[700px]">
                            {userData?.bio || "Architecting highly available, scalable, and secure cloud environments. Specializing in multi-region deployments, IaC, and Kubernetes orchestration."}
                        </p>

                        <div className="mt-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 rounded overflow-hidden">
                                <div className="p-14 lg:p-12 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10">
                                    <span className="font-display text-[64px] lg:text-[96px] font-light leading-none text-white tracking-tight">{projects?.length || 10}</span>
                                    <span className="mt-3 text-[11px] font-normal tracking-[0.18em] uppercase text-white/55">Deployed Products</span>
                                </div>
                                <div className="p-14 lg:p-12 flex flex-col items-center justify-center text-center">
                                    <span className="font-display text-[64px] lg:text-[96px] font-light leading-none text-white tracking-tight">{userData?.experience?.length || 5}+</span>
                                    <span className="mt-3 text-[11px] font-normal tracking-[0.18em] uppercase text-white/55">Years Expertise</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
