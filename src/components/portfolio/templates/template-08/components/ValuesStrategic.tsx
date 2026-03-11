import React from 'react';

export const ValuesStrategic: React.FC = () => {
    return (
        <section id="metrics" className="bg-soft-gray py-32 px-8 md:px-16">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black uppercase tracking-tight">System<br />Integrity</h2>
                        <p className="text-muted max-w-xs text-sm leading-relaxed">
                            Rather than raw uptime, we measure the system's ability to self-heal and maintain user trust during peak volatility.
                        </p>
                        <div className="pt-4">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">verified_user</span>
                                Zero Critical Drift detected in Q3
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="bg-white p-12 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-8">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Availability Confidence</span>
                                    <span className="text-2xl font-black">99.99<sup>%</sup></span>
                                </div>
                                <div className="flex items-end gap-1 h-32">
                                    <div className="flex-1 bg-black/10 h-3/4"></div>
                                    <div className="flex-1 bg-black/10 h-4/5"></div>
                                    <div className="flex-1 bg-black/10 h-2/3"></div>
                                    <div className="flex-1 bg-accent h-full"></div>
                                    <div className="flex-1 bg-black/10 h-4/5"></div>
                                    <div className="flex-1 bg-black/10 h-3/4"></div>
                                    <div className="flex-1 bg-black/10 h-5/6"></div>
                                </div>
                                <p className="mt-8 text-xs text-muted font-medium uppercase tracking-tighter">High-Stability Corridor Maintained</p>
                            </div>
                            <div className="bg-white p-12 border border-black/5 shadow-sm hover:shadow-md transition-shadow text-center">
                                <div className="flex justify-between items-start mb-8 text-left">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Autonomous Recovery</span>
                                    <span className="text-2xl font-black">08<small className="text-muted font-light">m</small></span>
                                </div>
                                <div className="relative h-32 flex items-center justify-center">
                                    <div className="absolute inset-0 border-2 border-dashed border-black/5 rounded-full"></div>
                                    <div className="w-24 h-24 border-[6px] border-accent rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-accent text-3xl">bolt</span>
                                    </div>
                                </div>
                                <p className="mt-8 text-xs text-muted font-medium uppercase tracking-tighter text-left">Target Recovery Threshold: &lt;10m</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
