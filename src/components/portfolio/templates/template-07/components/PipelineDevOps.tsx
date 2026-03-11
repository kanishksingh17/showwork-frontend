import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Hammer, TestTube2, ShieldCheck, Rocket, BarChart3, CheckCircle2 } from 'lucide-react';

export const PipelineDevOps: React.FC = () => {
    const [activeStage, setActiveStage] = useState(0);
    const stages = [
        { icon: <GitBranch size={22} />, label: "PR / CODE\nREVIEW" },
        { icon: <Hammer size={22} />, label: "BUILD +\nSCAN" },
        { icon: <TestTube2 size={22} />, label: "TEST SUITE\n+ SAST" },
        { icon: <ShieldCheck size={22} />, label: "POLICY +\nSIGN" },
        { icon: <Rocket size={22} />, label: "CANARY\nDEPLOY" },
        { icon: <BarChart3 size={22} />, label: "OBSERVE +\nPROMOTE" },
        { icon: <CheckCircle2 size={22} />, label: "PROD\nRELEASE" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStage(prev => (prev + 1) % stages.length);
        }, 1200);
        return () => clearInterval(interval);
    }, [stages.length]);

    return (
        <section id="cicd">
            <div className="section-inner w-[min(1100px,95vw)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="reveal section-header mb-14"
                >
                    <span className="section-num font-mono text-[11px] text-[var(--t07-purple-bright)] tracking-widest uppercase mb-3 block">02 / CI/CD & Automation</span>
                    <h2 className="section-h2 text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4">Deploy in minutes.<br />Rollback in seconds.</h2>
                    <p className="section-sub font-serif italic text-[clamp(18px,2vw,24px)] text-[var(--t07-purple-edge)] mb-4">Pipeline architecture that ships trust, not just code.</p>
                    <p className="section-body text-[14px] leading-[1.75] text-[var(--t07-text-secondary)] max-w-[680px]">
                        I architect CI/CD systems as first-class infrastructure: GitOps-native, policy-enforced, and observable end-to-end. Deployment frequency is a metric I actively optimize. Mean time to recovery is an SLO, not an incident retrospective data point.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2">
                        {["ArgoCD", "GitHub Actions", "Tekton", "Helm", "Kustomize", "OPA / Gatekeeper", "Sigstore", "SBOM"].map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pipeline-visual bg-[var(--t07-bg-card)] border border-[var(--t07-border-subtle)] rounded-[18px] p-10 mt-10 overflow-hidden"
                >
                    <div className="font-mono text-[11px] text-[var(--t07-text-muted)] mb-8 tracking-[0.08em] uppercase">DEPLOYMENT PIPELINE — PRODUCTION RELEASE FLOW</div>

                    <div className="pipeline-stages flex flex-nowrap items-center gap-0 overflow-x-auto pb-4 custom-scrollbar">
                        {stages.map((stage, i) => (
                            <React.Fragment key={i}>
                                <div className="pipeline-stage flex flex-col items-center min-w-[110px]">
                                    <div className={`stage-node w-14 h-14 rounded-xl flex items-center justify-center text-xl border transition-all duration-300 ${activeStage === i ? 'bg-[var(--t07-purple-bright)]/25 border-[var(--t07-purple-bright)] shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-[var(--t07-purple-mid)]/15 border-[var(--t07-purple-bright)]/30'}`}>
                                        {stage.icon}
                                    </div>
                                    <div className="stage-label font-mono text-[10px] text-[var(--t07-text-muted)] mt-3 text-center whitespace-pre-wrap leading-tight">
                                        {stage.label}
                                    </div>
                                </div>
                                {i < stages.length - 1 && (
                                    <div className="pipeline-arrow w-10 h-[2px] bg-[var(--t07-purple-bright)]/30 relative flex-shrink-0">
                                        <div className="pipeline-flow absolute inset-0 bg-gradient-to-r from-[var(--t07-purple-mid)] to-[var(--t07-purple-glow)]" style={{ animationDelay: `${i * 0.4}s` }}></div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="cicd-metrics grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                        {[
                            { val: "12×", label: "Deploys / Day" },
                            { val: "3.8m", label: "Avg Pipeline Duration" },
                            { val: "0", label: "Manual Gate Steps" },
                            { val: "45s", label: "Rollback TTR" }
                        ].map((metric, i) => (
                            <div key={i} className="metric-card bg-white/3 border border-[var(--t07-border-subtle)] rounded-lg p-6 text-center">
                                <span className="metric-value font-mono text-3xl font-medium text-[var(--t07-purple-bright)] block">{metric.val}</span>
                                <div className="metric-label text-[11px] text-[var(--t07-text-muted)] mt-1 uppercase tracking-wider">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
