import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileText, Calendar } from 'lucide-react';

export const ContactDevOps: React.FC<{ userData: any }> = ({ userData }) => {
    return (
        <section id="contact" className="min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="card contact-card w-full max-w-3xl p-12 lg:p-16 text-center"
            >
                <div className="availability-badge inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-8 text-[12px] text-green-300">
                    <span className="avail-dot w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Available for advisory engagements — Q3 2025
                </div>

                <h2 className="contact-h2 text-[clamp(36px,5vw,52px)] font-extrabold tracking-tight mb-4">Infrastructure problems<br />worth solving.</h2>
                <p className="contact-sub font-serif italic text-[22px] text-[var(--t07-purple-edge)] mb-6">Let's talk architecture, not tooling.</p>
                <p className="contact-body text-[14px] text-[var(--t07-text-secondary)] leading-[1.7] max-w-[520px] mx-auto mb-10">
                    I take on a limited number of advisory engagements per year — infrastructure audits, platform architecture reviews, and SRE program design.
                </p>

                <div className="contact-actions flex flex-wrap gap-4 justify-center">
                    <a href={`mailto:${userData?.email || 'alex@mercer.engineering'}`} className="btn-primary min-w-[200px] text-center">
                        {userData?.email || 'alex@mercer.engineering'} →
                    </a>
                    <a href="#" className="btn-ghost min-w-[200px] text-center">Download CV</a>
                </div>

                <div className="contact-links flex flex-wrap gap-6 justify-center mt-12">
                    {[
                        { label: "GitHub", href: userData?.github, icon: <Github size={12} /> },
                        { label: "LinkedIn", href: userData?.linkedin, icon: <Linkedin size={12} /> },
                        { label: "Resume PDF", href: "#", icon: <FileText size={12} /> },
                        { label: "Cal.com", href: "#", icon: <Calendar size={12} /> }
                    ].map((link, i) => (
                        <a key={i} href={link.href || '#'} className="contact-link font-mono text-[12px] text-[var(--t07-text-muted)] hover:text-[var(--t07-purple-bright)] transition-colors flex items-center gap-2">
                            {link.icon} {link.label}
                        </a>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
