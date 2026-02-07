import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type ToneType = "professional" | "casual" | "witty" | "empathetic" | "bold" | "persuasive" | "educational" | "urgent";

interface ToneOption {
    id: ToneType;
    label: string;
    description: string;
    gradient: string;
    Face: React.FC<{ className?: string }>;
}

// Face Components (Simple SVG drawings on gradients)
const FaceProfessional = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full text-slate-800", className)} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 40 L40 40 M60 40 L70 40" /> {/* Eyes */}
        <path d="M35 65 Q50 65 65 65" /> {/* Mouth (Straight) */}
    </svg>
);

const FaceCasual = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full text-slate-800", className)} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 35 Q35 30 40 35 M60 35 Q65 30 70 35" /> {/* Eyes */}
        <path d="M35 60 Q50 75 65 60" /> {/* Mouth (Smile) */}
    </svg>
);

const FaceWitty = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full text-slate-800", className)} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 40 L40 38 M60 35 Q65 30 70 35" /> {/* Wink/Eyebrow */}
        <path d="M35 65 Q50 60 65 65" /> {/* Smirk */}
        <path d="M65 65 L70 60" /> {/* Cheeky line */}
    </svg>
);

const FaceEmpathetic = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full text-slate-800", className)} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 40 Q35 35 40 40 M60 40 Q65 35 70 40" /> {/* Soft Eyes */}
        <path d="M40 65 Q50 70 60 65" /> {/* Small Smile */}
    </svg>
);

const FaceBold = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={cn("w-full h-full text-slate-800", className)} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 35 L45 40 M75 35 L55 40" /> {/* Determined Brows */}
        <circle cx="35" cy="45" r="3" fill="currentColor" />
        <circle cx="65" cy="45" r="3" fill="currentColor" />
        <path d="M35 65 L65 65" /> {/* Firm Mouth */}
    </svg>
);

const TONES: ToneOption[] = [
    { id: "casual", label: "Friendly", description: "Warm and approachable.", gradient: "from-orange-200 to-rose-300", Face: FaceCasual },
    { id: "professional", label: "Professional", description: "Clear and authoritative.", gradient: "from-blue-200 to-indigo-300", Face: FaceProfessional },
    { id: "witty", label: "Witty", description: "Clever and entertaining.", gradient: "from-purple-200 to-fuchsia-300", Face: FaceWitty },
    { id: "empathetic", label: "Empathetic", description: "Caring and understanding.", gradient: "from-teal-200 to-emerald-300", Face: FaceEmpathetic },
    { id: "bold", label: "Bold", description: "Direct and confident.", gradient: "from-red-200 to-orange-300", Face: FaceBold },
    { id: "educational", label: "Educational", description: "Informative and helpful.", gradient: "from-yellow-200 to-amber-300", Face: FaceProfessional }, // Recycle face for now
];

export function ToneSelector({ selected, onSelect }: { selected: ToneType; onSelect: (id: ToneType) => void }) {
    return (
        <div className="w-full">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Select Humanization Tone</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {TONES.map((tone) => {
                    const isSelected = selected === tone.id;
                    return (
                        <motion.button
                            key={tone.id}
                            onClick={() => onSelect(tone.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex flex-col items-center gap-3 relative focus:outline-none"
                        >
                            {/* Face Bubble */}
                            <div className={cn(
                                "w-16 h-16 rounded-full shadow-sm flex items-center justify-center transition-all duration-300 bg-gradient-to-br",
                                tone.gradient,
                                isSelected ? "ring-4 ring-offset-2 ring-blue-500 shadow-md scale-110" : "grayscale-[0.3] hover:grayscale-0 hover:shadow-md"
                            )}>
                                <div className="w-10 h-10 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <tone.Face />
                                </div>
                            </div>

                            {/* Label */}
                            <div className="text-center">
                                <span className={cn(
                                    "block text-sm font-bold transition-colors",
                                    isSelected ? "text-blue-600" : "text-slate-600 group-hover:text-slate-900"
                                )}>
                                    {tone.label}
                                </span>
                                <span className="block text-[10px] text-slate-400 font-medium mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity absolute w-full left-0 top-full pt-1">
                                    {tone.description}
                                </span>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
