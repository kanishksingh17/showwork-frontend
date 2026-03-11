import React from 'react';

export const HeroStrategic: React.FC = () => {
    return (
        <section id="summary" className="relative min-h-[85vh] flex items-center px-8 md:px-16 overflow-hidden">
            <div className="absolute inset-0 grid-accent -z-10"></div>
            <div className="max-w-[1600px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-9">
                        <div className="mb-12 flex items-center gap-6">
                            <div className="w-16 hero-line"></div>
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">Operational Integrity at Scale</span>
                        </div>
                        <h1 className="text-[14vw] lg:text-[13rem] font-black monolith-text uppercase">
                            RESILIENT<br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>GROWTH</span>
                        </h1>
                    </div>
                    <div className="lg:col-span-3 pb-6">
                        <div className="space-y-8">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-4">The Challenge</p>
                                <p className="text-lg leading-relaxed text-muted font-light italic">
                                    Complexity scales faster than manual oversight. Traditional ops are the bottleneck of modern innovation.
                                </p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-4">The Strategic Shift</p>
                                <p className="text-lg leading-relaxed font-medium">
                                    We treat reliability as a product feature, engineering resilience directly into the core infrastructure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
