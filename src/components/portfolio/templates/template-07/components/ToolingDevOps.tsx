import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box,
    Layers,
    Settings,
    Network,
    Cpu,
    Shield,
    Zap,
    BarChart3,
    Database,
    Cloud,
    HardDrive,
    Container,
    Layout,
    Key,
    Lock,
    Eye,
    Search,
    RefreshCw,
    Terminal
} from 'lucide-react';

export const ToolingDevOps: React.FC = () => {
    const [activeCat, setActiveCat] = useState('All');
    const categories = ['All', 'IaC', 'Containers', 'Observability', 'Security', 'CI/CD', 'Data'];

    const tools = [
        { icon: <Layers size={22} />, name: "Terraform", cat: "IaC" },
        { icon: <Box size={22} />, name: "Pulumi", cat: "IaC" },
        { icon: <Settings size={22} />, name: "Ansible", cat: "Security" },
        { icon: <Container size={22} />, name: "Kubernetes", cat: "Containers" },
        { icon: <HardDrive size={22} />, name: "Docker", cat: "Containers" },
        { icon: <RefreshCw size={22} />, name: "ArgoCD", cat: "CI/CD" },
        { icon: <Zap size={22} />, name: "GitHub Actions", cat: "CI/CD" },
        { icon: <Terminal size={22} />, name: "Tekton", cat: "CI/CD" },
        { icon: <BarChart3 size={22} />, name: "Prometheus", cat: "Observability" },
        { icon: <Layout size={22} />, name: "Grafana", cat: "Observability" },
        { icon: <Search size={22} />, name: "Loki", cat: "Observability" },
        { icon: <Eye size={22} />, name: "Jaeger", cat: "Observability" },
        { icon: <Network size={22} />, name: "Istio", cat: "Networking" },
        { icon: <Key size={22} />, name: "Vault", cat: "Security" },
        { icon: <Shield size={22} />, name: "OPA", cat: "Security" },
        { icon: <Lock size={22} />, name: "Falco", cat: "Security" },
        { icon: <Database size={22} />, name: "Kafka", cat: "Data" },
        { icon: <Database size={22} />, name: "PostgreSQL", cat: "Data" },
        { icon: <Database size={22} />, name: "Redis", cat: "Data" },
        { icon: <Cloud size={22} />, name: "AWS / GCP", cat: "Cloud" },
        { icon: <Terminal size={22} />, name: "Go", cat: "Security" },
        { icon: <Cpu size={22} />, name: "Cilium", cat: "Security" },
        { icon: <Container size={22} />, name: "Karpenter", cat: "Containers" }
    ];

    const filteredTools = activeCat === 'All' ? tools : tools.filter(t => t.cat === activeCat);

    return (
        <section id="tooling">
            <div className="section-inner w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="reveal section-header mb-14"
                >
                    <span className="section-num font-mono text-[11px] text-[var(--t07-purple-bright)] tracking-widest uppercase mb-3 block">07 / Tooling Ecosystem</span>
                    <h2 className="section-h2 text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4">Tools are chosen.<br />Not collected.</h2>
                    <p className="section-sub font-serif italic text-[clamp(18px,2vw,24px)] text-[var(--t07-purple-edge)] mb-4">Each tool has a mandate. Overlap is a smell.</p>
                    <p className="section-body text-[14px] leading-[1.75] text-[var(--t07-text-secondary)] max-w-[680px]">
                        My stack is opinionated. Every tool solves a specific class of problem and has a defined boundary with adjacent tooling.
                    </p>
                </motion.div>

                <div className="tooling-categories flex gap-3 flex-wrap mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCat(cat)}
                            className={`cat-pill px-4 py-1.5 rounded-full border text-[12px] transition-all ${activeCat === cat ? 'border-[var(--t07-purple-bright)] text-[var(--t07-purple-bright)] bg-[var(--t07-purple-bright)]/10' : 'border-white/10 text-[var(--t07-text-secondary)] hover:border-[var(--t07-purple-bright)]/50'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div layout className="tooling-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-10">
                    <AnimatePresence mode="popLayout">
                        {filteredTools.map(tool => (
                            <motion.div
                                key={tool.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="tool-chip bg-white/3 border border-[var(--t07-border-subtle)] rounded-xl p-4 text-center hover:border-[var(--t07-border-glow)] hover:bg-[var(--t07-purple-bright)]/5 hover:-translate-y-0.5 transition-all"
                            >
                                <span className="tool-icon text-2xl block mb-2">{tool.icon}</span>
                                <div className="tool-name font-mono text-[11px] text-[var(--t07-text-secondary)]">{tool.name}</div>
                                <div className="tool-category text-[9px] text-[var(--t07-text-muted)] tracking-widest uppercase mt-1">{tool.cat}</div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
