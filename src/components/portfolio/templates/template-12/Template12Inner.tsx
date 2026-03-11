import React, { useEffect } from 'react';
import './template-12.css';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';

export const Template12Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects }) => {
    useEffect(() => {
        // Add Google Fonts
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Add Material Icons
        const icons = document.createElement('link');
        icons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        icons.rel = 'stylesheet';
        document.head.appendChild(icons);

        return () => {
            document.head.removeChild(link);
            document.head.removeChild(icons);
        };
    }, []);

    const name = userData?.name || 'Alex Chain';
    const title = userData?.title || 'Blockchain Architect';
    const email = userData?.email || 'consult@chain-architect.io';
    const avatar = userData?.avatar || userData?.profileImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuApZ6nlmOAFsHY1bsWVBiuAMLvfMFKaxq-kkq1-n6eGtXdahJLsYta1ucEmSu0ayiNQPV2K75Sgbx-_n80D-ayJ5zMzB0FdRpZgglFt3QNtHMZD9DG5oLHRzEhRe36G9Qn1wwb-pVtdEvmypsgRRoryJZ_3F3WD_yiSujPOtatTGzqwf1fICKe3an0Uc9-LqNWxcJnGY4THC_pResJj4vioIeB8nAJFPx_UVZbs8CeMQoLZ4498H83UDIjEs6mnsltTfaVxVsydh2lr';
    const bio = userData?.bio || 'Architecting the decentralized future with security-first engineering. Specializing in Solidity, Rust, and Zero-Knowledge Proofs.';

    const displayedProjects = projects?.length > 0 ? projects.slice(0, 3) : [
        { title: 'DeFi Protocol Audit', description: 'Comprehensive security audit for a major lending protocol.', tech: ['Solidity', 'Foundry'] },
        { title: 'Cross-Chain Bridge', description: 'Architected a secure bridge between EVM and Solana.', tech: ['Rust', 'Anchor'] },
        { title: 'zk-SNARK Privacy Layer', description: 'Implemented zero-knowledge proofs for transactional privacy.', tech: ['Circom', 'SnarkJS'] }
    ];

    return (
        <div className="template-12-wrapper relative bg-[#F8F9FA] dark:bg-[#0D0E12] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 min-h-screen overflow-hidden">
            {/* Nav */}
            <nav className="sticky top-0 w-full z-50 bg-[#F8F9FA]/90 dark:bg-[#0D0E12]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border-2 border-[#F7931A]/20">
                                <img alt="Profile" className="w-full h-full object-cover" src={avatar} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-lg leading-tight dark:text-white">{name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{title}</span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <div className="flex items-center gap-6 mr-4">
                                <a href="#about" className="text-sm font-medium text-gray-500 hover:text-[#F7931A] transition-colors uppercase tracking-wider">About</a>
                                <a href="#work" className="text-sm font-medium text-gray-500 hover:text-[#F7931A] transition-colors uppercase tracking-wider">Audits</a>
                                <a href="#expertise" className="text-sm font-medium text-gray-500 hover:text-[#F7931A] transition-colors uppercase tracking-wider">Stack</a>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Email: {email}</span>
                            <button className="bg-[#1A1B23] text-white dark:bg-white dark:text-black px-6 py-2.5 rounded-full font-medium text-sm hover:scale-105 transition-transform duration-200">
                                Let's Talk
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-[#F7931A] rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-20 right-40 w-64 h-64 bg-[#FFD700] rounded-full blur-[100px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7931A]/10 border border-[#F7931A]/20 text-[#F7931A] text-sm font-medium mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-pulse"></span>
                            Available for Smart Contract Audits
                        </div>
                        <h1 className="font-display font-bold text-6xl md:text-8xl tracking-tight mb-8 leading-[1.1] dark:text-white">
                            Code. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931A] to-[#FFD700]">Consensus.</span> <br />
                            Cryptography.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed">
                            {bio}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <button className="group bg-[#F7931A] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium text-lg flex items-center gap-3 transition-all duration-300 shadow-lg shadow-[#F7931A]/25">
                                Start a Consultation
                                <span className="material-icons group-hover:translate-x-1 transition-transform bg-white/20 rounded-full p-1 text-sm">arrow_outward</span>
                            </button>
                            <a className="px-8 py-4 rounded-full font-medium text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" href="#work">
                                View Audits
                            </a>
                        </div>
                    </div>
                </div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] hidden lg:block bitcoin-glow opacity-90 pointer-events-none">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-radial from-[#F7931A]/30 to-transparent blur-3xl"></div>
                        <img alt="Abstract 3D Bitcoin Art" className="w-full h-full object-contain mix-blend-lighten opacity-80 mask-image-gradient" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc8Ue8JA0QBLI52FOCUbBorG4RRC8Xm3pIh4gR9f9sfBqQvk1EwsZCGVsS4DbpXVB07YYU9X4LPqoQVXe_V9EtxYt077K3KRln4qOQnq0-lUACdnBL7zkE1taRcmbdbUqiadbHjDKIPH83uTYaAw9cGlbFNe5_zZ4jaXSQPC0Y-ywRpFYPEyZp3Lizf2asGbNL2yAyCDQIbgqI8hnA-luSZ3lRy1mIr-SGIVa7ovD1RuTY416AX0WrzUarNqSto5gfEmrWXch02o4W" />
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className="bg-[#16171D] border-y border-gray-800 py-6 overflow-hidden">
                <div className="scrolling-text-container">
                    <div className="scrolling-text text-gray-400 font-display text-xl uppercase tracking-widest flex items-center gap-12">
                        <span><span className="text-[#F7931A]">*</span> 8+ Years Experience</span>
                        <span><span className="text-[#F7931A]">*</span> $500M+ TVL Secured</span>
                        <span><span className="text-[#F7931A]">*</span> 40+ Smart Contracts Deployed</span>
                        <span><span className="text-[#F7931A]">*</span> Zero Critical Vulnerabilities</span>
                        <span><span className="text-[#F7931A]">*</span> 8+ Years Experience</span>
                        <span><span className="text-[#F7931A]">*</span> $500M+ TVL Secured</span>
                        <span><span className="text-[#F7931A]">*</span> 40+ Smart Contracts Deployed</span>
                        <span><span className="text-[#F7931A]">*</span> Zero Critical Vulnerabilities</span>
                    </div>
                </div>
            </div>

            {/* About */}
            <section id="about" className="bg-[#0D0E12] text-white py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <div>
                            <div className="flex items-center gap-2 text-[#F7931A] font-medium mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F7931A]"></span>
                                About My Approach
                            </div>
                            <h2 className="font-display font-bold text-5xl leading-tight mb-8">
                                Bring <span className="bg-[#F7931A]/20 text-[#F7931A] px-2 rounded-lg inline-block transform -rotate-1">Trustless</span> Logic<br />
                                To The Global Economy
                            </h2>
                            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-colors">
                                Become a Client
                                <span className="material-icons text-sm">arrow_forward</span>
                            </button>
                        </div>
                        <div>
                            <p className="font-mono text-lg text-gray-400 leading-relaxed">
                                &gt; Hello, I'm {name.split(' ')[0]}. <br /><br />
                                &gt; I don't just write code; I engineer digital scarcity and programmable value. My work bridges the gap between theoretical cryptography and production-grade DeFi protocols. <br /><br />
                                &gt; From optimizing gas costs by 40% to architecting cross-chain bridges, I ensure your protocol is robust, scalable, and immutable.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#F7931A] p-8 rounded-3xl relative overflow-hidden group min-h-[240px] flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                            <h3 className="font-display font-bold text-6xl text-white relative z-10">98<span className="text-4xl text-white/80">%</span></h3>
                            <div className="relative z-10">
                                <div className="w-full bg-black/20 h-1.5 rounded-full mb-4 overflow-hidden">
                                    <div className="bg-white h-full w-[98%]"></div>
                                </div>
                                <p className="text-white/90 font-medium">Audit Score Average</p>
                                <p className="text-white/70 text-sm">Across all deployments</p>
                            </div>
                        </div>
                        <div className="bg-[#16171D] border border-gray-800 p-8 rounded-3xl relative overflow-hidden group min-h-[240px] flex flex-col justify-between hover:border-[#F7931A]/50 transition-colors duration-300">
                            <h3 className="font-display font-bold text-6xl text-white">12+</h3>
                            <div className="flex items-end justify-between">
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-[#16171D]"></div>
                                    <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-[#16171D]"></div>
                                    <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-[#16171D] flex items-center justify-center text-xs font-bold">+9</div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-300 font-medium">Protocols Launched</p>
                                    <p className="text-gray-500 text-sm">Mainnet Success</p>
                                </div>
                            </div>
                            <svg className="absolute bottom-0 left-0 w-full h-24 opacity-20 text-[#F7931A] fill-current" preserveAspectRatio="none" viewBox="0 0 100 40">
                                <path d="M0 40 L0 30 Q 20 10 40 25 T 80 20 L 100 5 L 100 40 Z"></path>
                            </svg>
                        </div>
                        <div className="bg-white text-black p-8 rounded-3xl relative overflow-hidden group min-h-[240px] flex flex-col justify-between">
                            <h3 className="font-display font-bold text-6xl">24/7</h3>
                            <div className="flex items-end justify-between">
                                <span className="material-icons text-5xl text-gray-200 group-hover:text-[#F7931A] transition-colors duration-300">security</span>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">Node Monitoring</p>
                                    <p className="text-gray-500 text-sm">Uptime Guarantee</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise */}
            <section id="expertise-services" className="py-24 bg-[#16171D] text-white border-t border-gray-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <div className="flex items-center justify-center gap-2 text-[#F7931A] font-medium mb-4">
                        <span className="material-icons text-sm">layers</span>
                        My Services
                    </div>
                    <h2 className="font-display font-bold text-4xl mb-4 text-white">Blockchain Expertise</h2>
                    <p className="text-gray-400">Enterprise-grade solutions for the decentralized web.</p>
                </div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    {[
                        { num: '/01', title: 'Smart Contract Auditing & Security', desc: 'Comprehensive line-by-line analysis to prevent re-entrancy, overflow, and logic errors.', tags: ['Slither Analysis', 'Mythril Testing'] },
                        { num: '/02', title: 'DeFi Protocol Architecture', desc: 'Designing AMMs, lending protocols, and yield aggregators from whitepaper to mainnet.', tags: ['Tokenomics', 'Liquidity Pools'] },
                        { num: '/03', title: 'Zero-Knowledge Proof Implementation', desc: 'Implementing privacy-preserving features using zk-SNARKs and zk-STARKs.', tags: ['Circom', 'Privacy Layer'] }
                    ].map((svc, i) => (
                        <div key={i} className="group relative p-8 rounded-2xl bg-[#0D0E12] border border-gray-800 hover:border-[#F7931A]/50 transition-all duration-300">
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                <div className="font-display font-bold text-3xl text-gray-600 group-hover:text-[#F7931A] transition-colors">{svc.num}</div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2 text-white">{svc.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{svc.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {svc.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700 flex items-center gap-1">
                                                <span className="w-1 h-1 bg-green-500 rounded-full"></span> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button className="md:opacity-0 group-hover:opacity-100 transition-opacity bg-[#F7931A] text-white p-3 rounded-full shadow-lg shadow-[#F7931A]/20">
                                    <span className="material-icons">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center mt-12">
                        <button className="bg-[#F7931A] hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 transition-all shadow-lg shadow-[#F7931A]/25">
                            Discuss Your Project
                        </button>
                    </div>
                </div>
            </section>

            {/* Projects / Audits Section */}
            <section id="work" className="py-24 bg-white dark:bg-[#08090a] border-t border-gray-100 dark:border-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 text-[#F7931A] font-medium mb-4">
                                <span className="material-icons text-sm">verified</span>
                                Recent Audits & Deployments
                            </div>
                            <h2 className="font-display font-bold text-4xl dark:text-white">Validated Infrastructure</h2>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 font-mono text-sm">
                            Total Value Secured: $500M+
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedProjects.map((project, idx) => (
                            <div key={idx} className="group relative bg-[#F8F9FA] dark:bg-[#111218] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:border-[#F7931A]/30 transition-all duration-300">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-icons text-6xl">code</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-[#F7931A] font-mono text-xs mb-4">PROJECT_{String(idx + 1).padStart(2, '0')}</div>
                                    <h3 className="font-display font-bold text-xl mb-4 text-gray-900 dark:text-white">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex gap-2">
                                            {(project.tech || ['Solidity', 'Foundry']).slice(0, 2).map((t: string) => (
                                                <span key={t} className="px-2 py-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded text-[10px] font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="material-icons text-gray-400 group-hover:text-[#F7931A] transition-colors">open_in_new</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section id="expertise" className="py-24 bg-[#F8F9FA] dark:bg-[#0D0E12]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 text-[#F7931A] font-medium mb-4">
                            <span className="material-icons text-sm">code</span>
                            Tech Stack
                        </div>
                        <h2 className="font-display font-bold text-4xl mb-4 dark:text-white">Engineering Toolkit</h2>
                        <p className="text-gray-500 dark:text-gray-400">A comprehensive suite for delivering excellence.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2 dark:text-white">
                                <span className="material-icons text-[#F7931A]">smart_toy</span> Smart Contract Languages
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Solidity (EVM)', val: '98%' },
                                    { label: 'Rust (Solana/Near)', val: '85%' },
                                    { label: 'Vyper', val: '90%' }
                                ].map(skill => (
                                    <div key={skill.label} className="relative">
                                        <div className="flex justify-between mb-2 text-sm font-medium dark:text-gray-200">
                                            <span>{skill.label}</span>
                                            <span>{skill.val}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                                            <div className="bg-[#F7931A] h-2 rounded-full" style={{ width: skill.val }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2 dark:text-white">
                                <span className="material-icons text-[#F7931A]">dns</span> Blockchain Infrastructure
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Hardhat / Foundry', val: '95%' },
                                    { label: 'The Graph (Indexing)', val: '90%' },
                                    { label: 'Web3.js / Ethers.js', val: '96%' }
                                ].map(skill => (
                                    <div key={skill.label} className="relative">
                                        <div className="flex justify-between mb-2 text-sm font-medium dark:text-gray-200">
                                            <span>{skill.label}</span>
                                            <span>{skill.val}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                                            <div className="bg-[#F7931A] h-2 rounded-full" style={{ width: skill.val }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-[#16171D]/50 border-y border-gray-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 text-[#F7931A] font-medium mb-4">
                            <span className="material-icons text-sm">verified</span>
                            Testimonials & Trust
                        </div>
                        <h2 className="font-display font-bold text-4xl mb-4 text-white">Consensus from Leaders</h2>
                        <p className="text-gray-400">Trusted by founders building the decentralized web.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Sarah Wu', role: 'Founder, DeFi Pulse', quote: "Alex's audit saved our protocol from a critical re-entrancy vulnerability just weeks before mainnet launch. His attention to detail is unmatched in the Web3 space." },
                            { name: 'Marcus Chen', role: 'CTO, ZK-Shield', quote: "We needed a custom ZK-rollup implementation for our privacy layer. Alex delivered a gas-optimized solution that exceeded our theoretical benchmarks." },
                            { name: 'Elena V.', role: 'Lead Dev, EtherBridge', quote: "Finding a Solidity engineer who truly understands economic attack vectors is rare. Alex brings both engineering prowess and financial security insight." }
                        ].map((t, i) => (
                            <div key={i} className="testimonial-card bg-[#1C1E26] p-8 rounded-2xl border border-gray-800 hover:border-[#F7931A]/30 transition-all duration-300 group">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="material-icons text-4xl text-gray-700 quote-icon transition-colors duration-300">format_quote</span>
                                    <span className="material-icons text-xl text-[#F7931A] bitcoin-glow">currency_bitcoin</span>
                                </div>
                                <p className="text-gray-300 mb-8 leading-relaxed italic">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{t.name}</h4>
                                        <p className="text-[#F7931A] text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Handshake */}
            <section className="py-24 bg-[#0D0E12] text-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h3 className="font-display font-bold text-3xl mb-2">Initiate Protocol Handshake</h3>
                            <p className="text-gray-400 mb-8">Secure communication channel established.</p>
                            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Project Name</label>
                                    <input className="w-full bg-[#16171D] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#F7931A] focus:border-transparent outline-none transition-all placeholder-gray-600" placeholder="Enter project identifier" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Protocol Type</label>
                                    <select className="w-full bg-[#16171D] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#F7931A] focus:border-transparent outline-none transition-all appearance-none cursor-pointer">
                                        <option>DeFi (AMM/Lending)</option>
                                        <option>NFT / Metaverse</option>
                                        <option>DAO Infrastructure</option>
                                        <option>Layer 2 Solution</option>
                                        <option>Security Audit</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Message Payload</label>
                                    <textarea className="w-full bg-[#16171D] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#F7931A] focus:border-transparent outline-none transition-all placeholder-gray-600" placeholder="Describe your requirements..." rows={4} defaultValue={""} />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                    <span className="material-icons text-sm">lock</span>
                                    End-to-end encryption enabled
                                </div>
                            </form>
                        </div>
                        <div className="bg-[#16171D] border border-gray-800 rounded-3xl p-10 lg:p-14 flex flex-col justify-center h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7931A]/10 rounded-full blur-[80px] pointer-events-none"></div>
                            <div className="relative z-10">
                                <span className="inline-block py-1 px-3 rounded bg-[#F7931A]/20 text-[#F7931A] text-xs font-bold tracking-wider mb-6">READY FOR DEPLOYMENT</span>
                                <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6 leading-tight">Connect for <br /><span className="text-white">Audit & Dev</span></h2>
                                <p className="text-gray-400 text-lg mb-10 max-w-md">Priority access for enterprise clients and high-value protocols. Let's secure your smart contracts before mainnet.</p>
                                <button className="w-full bg-[#F7931A] hover:bg-orange-600 text-white font-bold text-xl py-5 rounded-xl shadow-[0_0_20px_rgba(247,147,26,0.4)] hover:shadow-[0_0_30px_rgba(247,147,26,0.6)] transition-all duration-300 flex justify-center items-center gap-3 group">
                                    <span>Submit Hash</span>
                                    <span className="material-icons group-hover:translate-x-1 transition-transform">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#16171D] border-t border-gray-800 py-12 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#F7931A] rounded-lg flex items-center justify-center text-white font-bold">A</div>
                            <span className="font-display font-bold text-white text-lg">{name}</span>
                        </div>
                        <div className="flex gap-4">
                            <a className="text-gray-400 hover:text-[#F7931A] transition-colors" href="#">
                                <span className="sr-only">GitHub</span>
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                            </a>
                            <a className="text-gray-400 hover:text-[#F7931A] transition-colors" href="#">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 gap-4">
                        <div className="flex flex-col md:flex-row gap-6 items-center text-sm text-gray-500">
                            <span>© {new Date().getFullYear()} {name}. All rights reserved on-chain.</span>
                            <a className="hover:text-[#F7931A] transition-colors" href="#">Privacy Policy</a>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded bg-green-900/20 border border-green-500/30 text-green-400 text-xs font-medium">
                            <span className="material-icons text-sm">enhanced_encryption</span>
                            Secured by Cryptography
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
