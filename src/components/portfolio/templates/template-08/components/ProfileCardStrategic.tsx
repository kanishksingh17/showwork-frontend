import React from 'react';

interface Metric {
    label: string;
    value: string;
    trend?: string;
}

interface ProfileCardProps {
    userData: any;
    metrics: Metric[];
}

export const ProfileCardStrategic: React.FC<ProfileCardProps> = ({ userData, metrics }) => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white border border-black/5 shadow-soft p-8 md:p-12 animate-fade-in group">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
                {/* Left Side: Profile Image */}
                <div className="relative">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-black/5 shadow-sm transition-transform duration-700 group-hover:scale-[1.02]">
                        <img
                            src={userData?.avatar || userData?.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'}
                            alt={userData?.name}
                            className="w-full h-full object-cover grayscale brightness-110"
                        />
                    </div>
                </div>

                {/* Right Side: Information */}
                <div className="flex-1 space-y-6">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-2 block">
                            {userData?.title || 'Senior Reliability Engineer'}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-primary">
                            {userData?.name}
                        </h2>
                    </div>

                    <p className="text-lg text-muted font-light leading-relaxed max-w-xl italic">
                        {userData?.bio || 'Strategic leader in high-availability systems, focusing on engineering resilience and operational integrity for enterprise infrastructure.'}
                    </p>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-6 border-y border-black/5">
                        {metrics.map((metric, idx) => (
                            <div key={idx} className="space-y-1">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-muted">{metric.label}</span>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-black text-primary">{metric.value}</span>
                                    {metric.trend && <span className="text-[10px] text-accent font-bold mb-1">{metric.trend}</span>}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center md:justify-start gap-8 pt-2">
                        {userData?.socials?.github && (
                            <a href={userData.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                                <span className="material-symbols-outlined text-xl">code</span>
                            </a>
                        )}
                        {userData?.socials?.linkedin && (
                            <a href={userData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </a>
                        )}
                        {userData?.email && (
                            <a href={`mailto:${userData.email}`} className="text-muted hover:text-accent transition-colors">
                                <span className="material-symbols-outlined text-xl">mail</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
