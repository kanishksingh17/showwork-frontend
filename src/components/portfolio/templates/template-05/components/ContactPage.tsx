import React from 'react';


export const ContactPage: React.FC<{ userData: any }> = ({ userData }) => {
    return (
        <section id="contact" className="relative min-h-screen pt-12 pb-32 bg-[var(--t05-paper)] overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-[0.03] schematic-grid" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <span className="text-[var(--t05-accent)] font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-6">
                        [ REQUEST_O4: INITIATE_HANDSHAKE ]
                    </span>
                    <h2 className="text-[var(--t05-ink)] text-6xl font-light mb-8 italic">Let's connect.</h2>
                    <p className="text-[var(--t05-ink)]/50 text-xl font-light max-w-2xl leading-relaxed">
                        Ready to discuss architecture, distributed systems, or high-scale infrastructure?
                        Send a connection intent below to start a formal synchronization.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-px bg-[var(--t05-line)] border border-[var(--t05-line)] shadow-xl">
                    {/* Left: Meta Info */}
                    <div className="lg:col-span-4 bg-white p-12 flex flex-col justify-between">
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-2">
                                <span className="text-[var(--t05-ink)]/30 font-mono text-[9px] uppercase tracking-widest">Network Status</span>
                                <div className="flex items-center gap-2 text-[var(--t05-accent)] text-sm font-mono font-medium">
                                    <span className="w-2 h-2 bg-[var(--t05-accent)] rounded-full animate-pulse" />
                                    [ UPLINK_AVAILABLE ]
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[var(--t05-ink)]/30 font-mono text-[9px] uppercase tracking-widest">Inbound Vector</span>
                                <span className="text-[var(--t05-ink)] text-sm font-mono">{userData?.email || 'hello@architect.io'}</span>
                            </div>
                        </div>

                        <div className="mt-20 pt-10 border-t border-dashed border-[var(--t05-line)]">
                            <p className="text-[var(--t05-ink)]/40 text-[10px] font-mono leading-relaxed uppercase">
                                All communications are treated with architectural integrity. Expect a response within 1-2 standard synchronization cycles.
                            </p>
                        </div>
                    </div>

                    {/* Right: Request Form */}
                    <div className="lg:col-span-8 bg-white p-12">
                        <form className="flex flex-col gap-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-3">
                                    <label className="text-[var(--t05-ink)]/40 font-mono text-[10px] uppercase tracking-wider">Identificator (Name)</label>
                                    <input type="text" className="bg-transparent border-b border-[var(--t05-line)] py-3 focus:outline-none focus:border-[var(--t05-accent)] transition-all font-light text-[var(--t05-ink)]" placeholder="e.g. Satoshi" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[var(--t05-ink)]/40 font-mono text-[10px] uppercase tracking-wider">Return Vector (Email)</label>
                                    <input type="email" className="bg-transparent border-b border-[var(--t05-line)] py-3 focus:outline-none focus:border-[var(--t05-accent)] transition-all font-light text-[var(--t05-ink)]" placeholder="return@host.local" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[var(--t05-ink)]/40 font-mono text-[10px] uppercase tracking-wider">Intent Manifest (Message)</label>
                                <textarea rows={4} className="bg-transparent border-b border-[var(--t05-line)] py-3 focus:outline-none focus:border-[var(--t05-accent)] transition-all font-light text-[var(--t05-ink)] resize-none" placeholder="Describe the system context or engagement scope..." />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <button className="bg-[var(--t05-ink)] text-white font-mono text-[11px] uppercase tracking-[0.2em] px-12 py-4 hover:bg-[var(--t05-accent)] transition-all flex items-center gap-3 group">
                                    [ EXECUTE_HANDSHAKE ]
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">send</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-20 flex justify-center gap-12 text-[var(--t05-ink)]/30 font-mono text-[10px] uppercase tracking-widest">
                    {userData?.socialLinks?.twitter && <span>X.com/{userData.socialLinks.twitter}</span>}
                    {userData?.socialLinks?.github && <span>Github.com/{userData.socialLinks.github}</span>}
                    {userData?.socialLinks?.linkedin && <span>Linkedin.com/in/{userData.socialLinks.linkedin}</span>}
                </div>
            </div>
        </section>
    );
};
