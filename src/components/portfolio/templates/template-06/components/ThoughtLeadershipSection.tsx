import React from 'react';

const WritingItem = ({ date, title, excerpt, tag, delay }: any) => (
    <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_180px] gap-12 py-10 border-t border-[var(--t06-line)] last:border-b group hover:bg-[var(--t06-accent-light)] px-14 -mx-14 transition-colors r-up" style={{ transitionDelay: `${delay}ms` }}>
        <div className="font-mono text-[10px] tracking-widest text-[var(--t06-mid)] pt-1">{date}</div>
        <div>
            <h3 className="font-serif text-[clamp(17px,1.8vw,22px)] font-medium text-[var(--t06-ink)] mb-2 group-hover:text-[var(--t06-accent)] transition-colors">{title}</h3>
            <p className="text-[13px] text-[var(--t06-mid)] leading-relaxed italic">{excerpt}</p>
        </div>
        <div className="flex justify-end items-start pt-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--t06-accent)] border border-[var(--t06-accent-mid)] px-2.5 py-1">{tag}</span>
        </div>
    </div>
);

export const ThoughtLeadershipSection: React.FC = () => {
    return (
        <section id="writing" className="py-32 bg-[#f7f6f4] border-b border-[var(--t06-line)]">
            <div className="max-w-[1360px] mx-auto px-14">
                <span className="t06-meta-label r-left mb-6 block">08 Architecture Thinking</span>
                <div className="t06-rule mb-16" />

                <div className="flex flex-col">
                    <WritingItem
                        date="Jan 2025"
                        title="Why Your Multi-Region Architecture Will Fail at 3x Traffic"
                        excerpt="Assumptions that invalidate most active-passive designs when load exceeds architectural expectations."
                        tag="Distributed Systems"
                        delay={100}
                    />
                    <WritingItem
                        date="Oct 2024"
                        title="Cost Governance Is Not FinOps — It Is Architecture"
                        excerpt="Financial waste in cloud infrastructure is almost always an architectural decision made badly, not a budget problem."
                        tag="Cost Architecture"
                        delay={200}
                    />
                    <WritingItem
                        date="Jul 2024"
                        title="The Database Decision You Will Regret in 18 Months"
                        excerpt="A framework for evaluating data layer tradeoffs before write-path decisions lock you into a scaling ceiling."
                        tag="Data Architecture"
                        delay={300}
                    />
                </div>
            </div>
        </section>
    );
};
