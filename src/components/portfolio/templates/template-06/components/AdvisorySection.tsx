import React from 'react';
import { motion } from 'framer-motion';

const Engagement = ({ name, detail, delay }: any) => (
    <div className="py-6 border-t border-[var(--t06-line)] flex justify-between items-center last:border-b r-up" style={{ transitionDelay: `${delay}ms` }}>
        <span className="font-sans text-[14px] font-medium text-[var(--t06-ink)]">{name}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--t06-mid)]">{detail}</span>
    </div>
);

export const AdvisorySection: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <section id="engage" className="py-32 bg-white">
            <div className="max-w-[1360px] mx-auto px-14">
                <span className="t06-meta-label r-left mb-6 block">09 Advisory & Engagement</span>
                <div className="t06-rule" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mt-16">
                    <div className="r-up">
                        <h2 className="font-serif text-[clamp(32px,3.8vw,52px)] font-normal leading-[1.15] text-[var(--t06-ink)] mb-8">
                            Serious infrastructure <br /> problems deserve <br />
                            <span className="italic text-[var(--t06-accent)]">serious architecture.</span>
                        </h2>
                        <p className="text-[14px] text-[var(--t06-ink-3)] leading-relaxed mb-10 max-w-[480px]">
                            I work with a small number of organizations per year on systems that require deep engagement. Engagements typically begin with a scoped architecture review.
                        </p>

                        <div className="flex flex-col">
                            <Engagement name="Architecture Review" detail="2–4 weeks" delay={100} />
                            <Engagement name="System Design Advisory" detail="Ongoing retainer" delay={200} />
                            <Engagement name="Migration Architecture" detail="Project-scoped" delay={300} />
                            <Engagement name="Board / CTO Advisory" detail="By arrangement" delay={400} />
                        </div>
                    </div>

                    <div className="r-right">
                        <div className="p-12 border border-[var(--t06-line)] bg-[#f7f6f4]">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full min-h-[400px] flex flex-col items-center justify-center text-center py-20"
                                >
                                    <div className="w-16 h-16 rounded-full border border-[var(--t06-accent)] flex items-center justify-center mb-8">
                                        <svg className="w-8 h-8 text-[var(--t06-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="font-serif text-[24px] mb-4 text-[var(--t06-ink)]">Inquiry Received</h3>
                                    <p className="text-[14px] text-[var(--t06-mid)] max-w-[280px]">
                                        Your request has been prioritized. I will respond via secure channel within 48 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {["Organization", "Contact", "The Problem", "Email"].map((label, idx) => (
                                        <div key={idx}>
                                            <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--t06-mid)] block mb-2">{label}</label>
                                            <input
                                                required
                                                type={label === "Email" ? "email" : "text"}
                                                className="w-full bg-transparent border-b border-[var(--t06-line)] py-2 text-[14px] outline-none focus:border-[var(--t06-accent)] transition-colors placeholder:text-[var(--t06-mid)]/40"
                                                placeholder={`Your ${label.toLowerCase()}`}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="submit"
                                        className="w-full bg-[var(--t06-accent)] text-white font-mono text-[11px] uppercase tracking-[0.16em] py-4 hover:bg-[var(--t06-ink)] transition-colors"
                                    >
                                        Request Architecture Conversation
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
