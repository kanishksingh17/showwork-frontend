import React from 'react';
import { ChevronLeft, ChevronRight, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
    return (
        <section className="flex items-center justify-center py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="w-full max-w-5xl gradient-border glass-panel bg-white/40 dark:bg-slate-900/40 rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <div className="p-8 lg:p-12 relative z-20">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                            Let’s build infrastructure that scales.
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Schedule a 15-minute architecture deep-dive.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Calendar Section */}
                        <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-800 dark:text-gray-200">November 2023</h3>
                                <div className="flex gap-2">
                                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-extrabold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-widest">
                                <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                <div className="h-10 flex items-center justify-center text-gray-300 dark:text-gray-600 text-sm">30</div>
                                <div className="h-10 flex items-center justify-center text-gray-300 dark:text-gray-600 text-sm">31</div>
                                {[1, 2].map(d => (
                                    <button key={d} className="h-10 flex items-center justify-center rounded-lg hover:bg-[#D9FF3F]/20 dark:hover:bg-[#D9FF3F]/10 text-sm font-medium transition-colors">
                                        {d}
                                    </button>
                                ))}
                                <button className="h-10 flex items-center justify-center rounded-lg bg-[#D9FF3F] text-black font-bold text-sm shadow-sm scale-110">3</button>
                                {[4, 5, 6, 7].map(d => (
                                    <button key={d} className={`h-10 flex items-center justify-center rounded-lg hover:bg-[#D9FF3F]/20 dark:hover:bg-[#D9FF3F]/10 text-sm transition-colors ${d === 6 ? 'font-bold' : 'font-medium'}`}>
                                        {d}
                                    </button>
                                ))}
                                <button className="h-10 flex items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold">8</button>
                                {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(d => (
                                    <button key={d} className={`h-10 flex items-center justify-center rounded-lg hover:bg-[#D9FF3F]/20 dark:hover:bg-[#D9FF3F]/10 text-sm transition-colors ${d === 14 ? 'font-bold' : 'font-medium'}`}>
                                        {d}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10 flex items-center gap-4">
                                <Clock size={18} className="text-gray-400" />
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">10:30 AM — 10:45 AM (EST)</span>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-tight">Email Address</label>
                                <input
                                    className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D9FF3F] focus:border-transparent text-gray-900 dark:text-white transition-all placeholder-gray-400 dark:placeholder-gray-600 outline-none"
                                    placeholder="alex@company.com"
                                    type="email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-tight">Brief Project Description</label>
                                <textarea
                                    className="w-full bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D9FF3F] focus:border-transparent text-gray-900 dark:text-white transition-all resize-none placeholder-gray-400 dark:placeholder-gray-600 outline-none"
                                    placeholder="Tell me about your scaling challenges..."
                                    rows={4}
                                />
                            </div>
                            <button className="w-full bg-[#D9FF3F] text-black font-black text-lg py-4 rounded-xl shadow-[0_10px_30px_rgba(217,255,63,0.3)] hover:shadow-[0_15px_40px_rgba(217,255,63,0.4)] transition-all transform hover:-translate-y-1 active:scale-95">
                                Schedule Call
                            </button>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium font-sans">
                                <ShieldCheck size={14} className="text-[#D9FF3F]" />
                                <span>No sales pitch, just engineering solutions.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Internal styles for gradient border to keep it self-contained */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .gradient-border {
                        position: relative;
                        background-clip: padding-box;
                        border: 1px solid transparent;
                    }
                    .gradient-border::before {
                        content: '';
                        position: absolute;
                        top: 0; right: 0; bottom: 0; left: 0;
                        z-index: -1;
                        margin: -1px;
                        border-radius: inherit;
                        background: linear-gradient(to right, #D9FF3F, #3B82F6, #8B5CF6);
                        opacity: 0.5;
                    }
                `}} />
            </div>
        </section>
    );
};
