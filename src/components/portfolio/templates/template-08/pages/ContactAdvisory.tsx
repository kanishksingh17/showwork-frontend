import React from 'react';

export const ContactAdvisory: React.FC = () => {
    return (
        <div className="space-y-32 animate-fade-in">
            {/* Headline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-9">
                    <div className="mb-12 flex items-center gap-6">
                        <div className="w-16 hero-line"></div>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">A10 // Production Advisory Portal</span>
                    </div>
                    <h1 className="text-[8vw] lg:text-[8rem] font-black monolith-text uppercase">
                        CONTACT<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>ADVISORY</span>
                    </h1>
                </div>
                <div className="lg:col-span-3 pb-6">
                    <p className="text-lg leading-relaxed text-muted font-light italic">
                        Strategic infrastructure leadership and high-consequence system advising. Let's engineer the next phase of your production growth.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/5 border border-black/5">
                {/* Advisory Services */}
                <div className="bg-white p-12 md:p-24 space-y-16">
                    <h3 className="text-4xl font-black uppercase tracking-tighter">Advisory Scope</h3>
                    <div className="space-y-12">
                        {[
                            { title: 'Reliability Audit', desc: 'Comprehensive deep-dive into system SLIs/SLOs and architectural failure modes.' },
                            { title: 'Scaling Strategy', desc: 'Predictive modeling and orchestration design for high-growth workloads.' },
                            { title: 'Incident Retrospectives', desc: 'Expert mediation of blameless post-mortems and remediation roadmaps.' }
                        ].map((service, idx) => (
                            <div key={idx} className="space-y-4 group">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-primary group-hover:text-accent transition-colors">{service.title}</h4>
                                <p className="text-xs text-muted font-light leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Interface */}
                <div className="bg-soft-gray p-12 md:p-24 flex flex-col justify-between">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Primary Channel</span>
                            <a href="mailto:engineer@strategic.org" className="text-3xl md:text-5xl font-black tracking-tighter hover:text-accent transition-colors block">
                                EMAIL@STRATEGIC.ORG
                            </a>
                        </div>
                        <div className="flex flex-col gap-6 pt-12">
                            <a href="#" className="flex justify-between items-center group border-b border-black/5 pb-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">LinkedIn Profile</span>
                                <span className="material-symbols-outlined text-xl group-hover:text-accent group-hover:translate-x-1 transition-all">north_east</span>
                            </a>
                            <a href="#" className="flex justify-between items-center group border-b border-black/5 pb-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">GitHub Repository</span>
                                <span className="material-symbols-outlined text-xl group-hover:text-accent group-hover:translate-x-1 transition-all">north_east</span>
                            </a>
                        </div>
                    </div>
                    <div className="pt-16">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-8">Ready for Production?</p>
                        <button className="w-full bg-black text-white p-8 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all">
                            Initialize Advisory Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
