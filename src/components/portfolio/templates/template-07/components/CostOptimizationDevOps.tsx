import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown } from 'lucide-react';

export const CostOptimizationDevOps: React.FC<{ data?: any }> = ({ data }) => {
    const costData = {
        num: data?.num || "06 / Cost Efficiency",
        h2: data?.h2 || "Cloud bills are\nan engineering output.",
        sub: data?.sub || "Not a finance department problem.",
        body: data?.body || "FinOps is embedded in the infrastructure development cycle. I've reduced cloud spend on three separate platforms by 30–60% without degrading SLOs.",
        savings: data?.savings || [
            { saving: "↓ 47%", title: "Compute Rightsizing", desc: "Automated rightsizing via AWS Compute Optimizer + Karpenter bin-packing." },
            { saving: "↓ 63%", title: "Storage Tiering Automation", desc: "Intelligent S3 lifecycle policies based on access patterns." },
            { saving: "↓ 38%", title: "Data Transfer Optimization", desc: "Eliminated cross-AZ traffic. CDN cache hit rates from 61% → 94%." },
            { saving: "$0", title: "Zombie Resource Elimination", desc: "Automated detection for unattached EBS and idle LBs." }
        ]
    };

    return (
        <section id="cost">
            <div className="section-inner w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="reveal section-header mb-14"
                >
                    <span className="section-num font-mono text-[11px] text-[var(--t07-purple-bright)] tracking-widest uppercase mb-3 block">{costData.num}</span>
                    <h2 className="section-h2 text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4" dangerouslySetInnerHTML={{ __html: costData.h2.replace(/\n/g, '<br />') }} />
                    <p className="section-sub font-serif italic text-[clamp(18px,2vw,24px)] text-[var(--t07-purple-edge)] mb-4">{costData.sub}</p>
                    <p className="section-body text-[14px] leading-[1.75] text-[var(--t07-text-secondary)] max-w-[680px]">
                        {costData.body}
                    </p>
                </motion.div>

                <div className="cost-grid grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {costData.savings.map((card: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="cost-card bg-[var(--t07-bg-card)] border border-[var(--t07-border-subtle)] rounded-[18px] p-8 hover:border-[var(--t07-border-glow)] transition-all group"
                        >
                            <div className="cost-saving font-mono text-[32px] font-medium text-[var(--t07-purple-bright)] mb-2 group-hover:scale-105 transition-transform origin-left flex items-center gap-2">
                                <TrendingDown size={24} /> {card.saving}
                            </div>
                            <div className="cost-card-title text-[15px] font-bold mb-2.5">{card.title}</div>
                            <p className="cost-card-desc text-[13px] text-[var(--t07-text-secondary)] leading-[1.6]">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
