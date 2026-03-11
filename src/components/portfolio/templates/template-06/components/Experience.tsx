import React from 'react';

export const Experience: React.FC<{ userData: any }> = ({ userData }) => {
    const experiences = userData?.experience?.length > 0 ? userData.experience : [
        { company: 'Cloud Solutions Inc', role: 'Chief Cloud Architect', description: 'Led multi-region infrastructure strategy.' },
        { company: 'DevOps Global', role: 'DevOps Engineer', description: 'Automated CI/CD for over 50+ microservices.' }
    ];

    return (
        <section id="experience" className="py-24 border-b border-white/10">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-12">
                    <div className="pt-1">
                        <span className="text-[11px] font-normal tracking-[0.18em] uppercase text-white/35">Experience</span>
                    </div>
                    <div className="flex flex-col">
                        {experiences.map((exp: any, idx: number) => (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-[64px_1fr_1fr] items-start gap-8 py-10 border-b border-white/10 last:border-0">
                                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                                    <div className={`w-10 h-10 bg-[conic-gradient(from_0deg,#6EE7F7,#B56EF7,#F7A26E,#6EF7A2,#6EE7F7)] opacity-85 ${idx % 2 === 0 ? 'rounded-lg rotate-45 scale-75' : 'rounded-full'}`} />
                                </div>
                                <h3 className="font-display text-[22px] lg:text-[32px] font-bold uppercase tracking-[0.04em] leading-tight text-white">
                                    {exp.role}<br />
                                    <span className="text-white/30 text-[0.6em] tracking-widest">{exp.company}</span>
                                </h3>
                                <p className="text-[15px] text-white/55 leading-relaxed max-w-[440px]">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
