import React from 'react';

export const CostOptimization: React.FC = () => {
    return (
        <div className="space-y-32 animate-fade-in">
            {/* Headline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-9">
                    <div className="mb-12 flex items-center gap-6">
                        <div className="w-16 hero-line"></div>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">A07 // FinOps & Resource ROI</span>
                    </div>
                    <h1 className="text-[8vw] lg:text-[8rem] font-black monolith-text uppercase">
                        COST<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>OPTIMIZATION</span>
                    </h1>
                </div>
                <div className="lg:col-span-3 pb-6">
                    <p className="text-lg leading-relaxed text-muted font-light italic">
                        Infrastructure is a capital investment. Maximum performance at minimum waste is the signature of superior engineering.
                    </p>
                </div>
            </div>

            {/* Savings Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="space-y-4">
                    <h3 className="text-4xl font-black text-primary">32%</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Annual OpEx Reduction</p>
                    <p className="text-sm text-muted font-light leading-relaxed">Achieved through aggressive right-sizing and spot-instance utilization strategies.</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-4xl font-black text-primary">$1.2M</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Cloud Waste Eliminated</p>
                    <p className="text-sm text-muted font-light leading-relaxed">Automated cleanup protocols for orphaned resources and over-provisioned storage tiers.</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-4xl font-black text-primary">85%</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Resource ROI Efficiency</p>
                    <p className="text-sm text-muted font-light leading-relaxed">Tightening the delta between provisioned capacity and actual workload demand.</p>
                </div>
            </div>

            {/* FinOps Strategy Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/5 border border-black/5">
                <div className="bg-white p-16 space-y-8 group hover:bg-black transition-all duration-700">
                    <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em] block">Strategy 01</span>
                    <h4 className="text-2xl font-black uppercase group-hover:text-white transition-colors">Predictive Right-Sizing</h4>
                    <p className="text-sm text-muted group-hover:text-white/50 font-light leading-relaxed transition-colors">
                        Leveraging machine learning to forecast workload peaks and adjust instance families autonomously, preventing over-provisioning during idle periods.
                    </p>
                    <div className="pt-8 border-t border-black/5 group-hover:border-white/10 flex justify-between items-center group-hover:text-white transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Savings Potential</span>
                        <span className="text-xl font-black">Medium-High</span>
                    </div>
                </div>
                <div className="bg-white p-16 space-y-8 group hover:bg-black transition-all duration-700">
                    <span className="text-accent font-bold uppercase text-[10px] tracking-[0.3em] block">Strategy 02</span>
                    <h4 className="text-2xl font-black uppercase group-hover:text-white transition-colors">Data Tier Lifecycle Management</h4>
                    <p className="text-sm text-muted group-hover:text-white/50 font-light leading-relaxed transition-colors">
                        Architecting automated migration policies for stale data into low-cost glacier storage, reducing active EBS/S3 Standard overhead by 40%+.
                    </p>
                    <div className="pt-8 border-t border-black/5 group-hover:border-white/10 flex justify-between items-center group-hover:text-white transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Savings Potential</span>
                        <span className="text-xl font-black">High</span>
                    </div>
                </div>
            </div>

            {/* Visualization Mockup */}
            <div className="bg-soft-gray p-12 md:p-24 border border-black/5 flex flex-col md:flex-row gap-20 items-center">
                <div className="flex-1 space-y-8 text-center md:text-left">
                    <h3 className="text-4xl font-black uppercase tracking-tighter leading-[0.9]">Visibility Into<br />Infrastructure Burn</h3>
                    <p className="text-sm text-muted font-light leading-relaxed max-w-sm">
                        Real-time attribution mapping that connects every dollar spent directly to the business unit and productive value generated.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="w-12 h-1 hero-line"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted">Aperiodic Auditing Protocol</span>
                    </div>
                </div>
                <div className="w-64 h-64 border-8 border-black/5 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 border-8 border-accent rounded-full border-t-transparent -rotate-45"></div>
                    <div className="text-center">
                        <span className="text-3xl font-black block">$42k</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-muted">Monthly Savinngs</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
