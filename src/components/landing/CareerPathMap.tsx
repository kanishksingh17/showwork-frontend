import React from 'react';
import {
    X,
    CheckCircle2,
    Brain,
    Wand2,
    Rocket,
    TrendingUp,
    Zap,
    ArrowRight,
    Ban,
    ChevronDown
} from 'lucide-react';
import './CareerPathMap.css';
import { cn } from "@/lib/utils";

const CareerPathMap = ({ className }: { className?: string }) => {
    return (
        <div className={cn("career-path-map w-full relative py-20 overflow-hidden font-mono", className)}>
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-mesh opacity-40 dark:opacity-10"></div>
            </div>

            <div className="relative z-10 p-4 flex flex-col items-center">
                {/* Header Badges */}
                <div className="absolute top-0 left-4 md:left-8 border-l-4 border-slate-900 dark:border-slate-100 pl-4">
                    <h1 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">CAREER_OS_CHOICE_MAP</h1>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Decision Tree: The Fork in the Road</p>
                    <div className="flex gap-4 mt-2">
                        <span className="text-[10px] text-red-600 dark:text-red-400 font-bold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>BLOCKED_PATH
                        </span>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>OPEN_SEQUENCE
                        </span>
                    </div>
                </div>

                <div className="absolute top-0 right-4 md:right-8 flex gap-2 md:gap-4 invisible md:visible">
                    <div className="w-12 h-12 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-bold">MAP</div>
                    <div className="w-12 h-12 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-bold">OS</div>
                    <div className="w-12 h-12 border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[10px] text-blue-600 dark:text-blue-400 font-bold">WIN</div>
                </div>

                <div className="relative w-full px-4 md:px-12 flex flex-col items-center mt-12">
                    {/* Central Choice Node */}
                    <div className="relative mb-20 z-20">
                        <div className="px-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] relative opacity-80 hover:opacity-100 transition-opacity">
                            <span className="spec-label block mb-1">CHOOSE_YOUR_PATH</span>
                            <span className="text-sm font-black text-slate-900 dark:text-white">CAREER COMMENCEMENT</span>
                        </div>

                        {/* Connecting Lines SVG */}
                        <svg className="absolute top-full left-1/2 -translate-x-1/2 w-[300px] md:w-[1600px] h-[150px] pointer-events-none opacity-80" viewBox="0 0 1600 150">
                            {/* Left Path (Broken) */}
                            <path className="broken-link" d="M800,0 Q800,60 200,80" fill="none" strokeWidth="3"></path>
                            {/* Right Path (Optimized) */}
                            <path d="M800,0 Q800,60 1400,80" fill="none" stroke="var(--electric-blue)" strokeLinecap="round" strokeWidth="4"></path>
                        </svg>

                        {/* VS Badge */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-30">
                            <div className="fork-vs w-14 h-14 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center font-black italic border-4 border-white dark:border-slate-900">
                                VS
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[600px] w-full max-w-[1900px] mx-auto">
                        {/* Left Column: Traditional Path (Failing) */}
                        <div className="flex flex-col items-center space-y-12 pt-12 relative border-r border-dashed border-slate-200 dark:border-slate-800 pr-0 md:pr-8">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 text-red-500 font-bold text-[10px] tracking-widest uppercase opacity-60 bg-slate-100 dark:bg-slate-900 px-2">
                                ← The Traditional Path (Failing)
                            </div>

                            {/* Step 1: Resume Spray */}
                            <div className="relative flex flex-col items-center dead-node">
                                <div className="p-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 w-44 flex flex-col items-center relative">
                                    <div className="text-red-500 absolute -top-3 -right-3 bg-white dark:bg-slate-800 rounded-full p-1 border-2 border-red-500 font-bold">
                                        <X className="w-4 h-4" />
                                    </div>
                                    <span className="spec-label mb-1">FAILURE_01</span>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">RESUME SPRAY</span>
                                    <div className="mt-2 text-[9px] text-red-600 dark:text-red-400 font-bold uppercase">Low Visibility</div>
                                </div>
                            </div>

                            <div className="w-1 h-12 bg-transparent border-l-2 border-dashed border-red-300 dark:border-red-800"></div>

                            {/* Step 2: Ghosted */}
                            <div className="relative flex flex-col items-center dead-node">
                                <div className="p-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 w-44 flex flex-col items-center relative">
                                    <div className="text-red-500 absolute -top-3 -right-3 bg-white dark:bg-slate-800 rounded-full p-1 border-2 border-red-500 font-bold">
                                        <X className="w-4 h-4" />
                                    </div>
                                    <span className="spec-label mb-1">FAILURE_02</span>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 italic">GHOSTED</span>
                                    <div className="mt-2 text-[9px] text-slate-400 font-mono">ERROR_404_REPLY</div>
                                </div>
                            </div>

                            <div className="w-1 h-12 bg-transparent border-l-2 border-dashed border-red-300 dark:border-red-800"></div>

                            {/* Step 3: Dead End */}
                            <div className="relative flex flex-col items-center">
                                <div className="p-6 bg-red-900/10 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-4 border-red-600 w-52 flex flex-col items-center shadow-2xl rotate-3">
                                    <Ban className="w-10 h-10 mb-2" />
                                    <span className="text-xs font-black tracking-tighter">TOTAL DEAD END</span>
                                    <span className="text-[9px] mt-1 opacity-70">RE-ENTER LOOP?</span>
                                </div>
                                <div className="absolute -bottom-8 flex gap-1">
                                    <div className="w-2 h-2 bg-red-500"></div>
                                    <div className="w-2 h-2 bg-red-500"></div>
                                    <div className="w-2 h-2 bg-red-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: ShowWork Way (Optimized) */}
                        <div className="flex flex-col items-center space-y-12 pt-12 relative pl-0 md:pl-8">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 text-blue-500 font-bold text-[10px] tracking-widest uppercase bg-slate-100 dark:bg-slate-900 px-2">
                                The ShowWork Way (Optimized) →
                            </div>

                            {/* Step 1: Evidence Capture */}
                            <div className="relative flex flex-col items-center group">
                                <div className="p-4 bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-100 shadow-[4px_4px_0px_0px_var(--electric-blue)] w-48 flex flex-col items-center transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--electric-blue)]">
                                    <span className="spec-label mb-1">MODULE_01</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">EVIDENCE CAPTURE</span>
                                    <CheckCircle2 className="text-[var(--electric-blue)] mt-2 w-5 h-5" />
                                </div>
                                <div className="absolute -bottom-8 next-step-indicator">
                                    <ChevronDown className="text-blue-500 w-6 h-6" />
                                </div>
                            </div>

                            <div className="stream-line"></div>

                            {/* Step 2: AI Analysis */}
                            <div className="relative flex flex-col items-center group">
                                <div className="p-5 bg-slate-900 dark:bg-slate-700 text-white w-52 border-b-4 border-[var(--electric-blue)] flex flex-col items-center shadow-xl">
                                    <span className="spec-label text-slate-400 mb-1">AI_ANALYSIS</span>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Brain className="text-[var(--electric-blue)] animate-pulse w-5 h-5" />
                                        <span className="text-[10px] font-bold">OPTIMIZED</span>
                                    </div>
                                    <div className="w-full bg-slate-800 dark:bg-slate-600 h-1 rounded-full overflow-hidden">
                                        <div className="bg-[var(--electric-blue)] h-full w-[95%]"></div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-8 next-step-indicator">
                                    <ChevronDown className="text-blue-500 w-6 h-6" />
                                </div>
                            </div>

                            <div className="stream-line"></div>

                            {/* Step 3: Career Acceleration */}
                            <div className="relative flex flex-col items-center group">
                                <div className="px-6 py-5 bg-blue-50 dark:bg-blue-900/10 border-2 border-[var(--electric-blue)] w-56 flex flex-col items-center shadow-[0_10px_30px_rgba(59,130,246,0.2)] transition-all hover:scale-105">
                                    <Wand2 className="text-blue-600 dark:text-blue-400 w-8 h-8 mb-1" />
                                    <span className="text-xs font-black text-blue-800 dark:text-blue-200 tracking-tight">CAREER ACCELERATION</span>
                                    <div className="flex gap-1 mt-2">
                                        <Rocket className="text-blue-500 w-4 h-4" />
                                        <TrendingUp className="text-blue-500 w-4 h-4" />
                                        <Zap className="text-blue-500 w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 z-30">
                    <div className="motivational-banner bg-white dark:bg-slate-800 px-12 py-5 rounded-full flex flex-col md:flex-row items-center gap-4 transition-all hover:scale-105 cursor-pointer">
                        <Zap className="text-[var(--electric-blue)] w-8 h-8 fill-current" />
                        <div className="flex flex-col text-center md:text-left">
                            <span className="font-sans font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">Choose the ShowWork Way.</span>
                            <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase">Eliminate the broken loops of traditional hiring.</span>
                        </div>
                        <ArrowRight className="text-slate-900 dark:text-white ml-0 md:ml-4 w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerPathMap;
