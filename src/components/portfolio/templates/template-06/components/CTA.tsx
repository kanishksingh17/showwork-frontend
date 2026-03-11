import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CTA: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="py-16 border-b border-white/10 relative overflow-hidden"
        >
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex items-center justify-between">
                    <span className="font-display text-[56px] lg:text-[96px] font-black uppercase tracking-tight text-white">
                        LETS TALK
                    </span>
                    <motion.a
                        href="mailto:hello@clouddevs.pro"
                        whileHover={{ scale: 1.1, rotate: -15 }}
                        className="w-[clamp(56px,6vw,80px)] h-[clamp(56px,6vw,80px)] border-[1.5px] border-white/20 rounded-full flex items-center justify-center group"
                    >
                        <svg viewBox="0 0 24 24" className="w-[40%] h-[40%] stroke-white fill-none" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};
