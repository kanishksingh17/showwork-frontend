import React, { useState } from 'react';
import './template-11.css';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { EditableBlock } from '../../editor/EditableBlock';

const Sidebar: React.FC<{ activeTab?: string; setActiveTab?: (tab: any) => void }> = () => (
    <>
        <div className="dashboard-panel mb-6">
            <div className="panel-header">
                <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Career Throughput</span>
                <span className="material-symbols-outlined text-xs text-[--datacmd-primary]">rocket_launch</span>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
                <div>
                    <div className="text-3xl font-display text-white">50+</div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-tight">Projects Delivered</div>
                </div>
                <div>
                    <div className="text-3xl font-display text-white">100k+</div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-tight">Lines of SQL</div>
                </div>
                <div className="col-span-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-400 font-mono">Completion Rate</span>
                        <span className="text-[10px] text-green-400 font-mono">100%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[--datacmd-primary] to-[--datacmd-accent-cyan] h-full w-full"></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="dashboard-panel">
            <div className="panel-header">
                <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Impact Zones</span>
                <span className="material-symbols-outlined text-xs text-[--datacmd-secondary]">public</span>
            </div>
            <div className="p-5">
                <ul className="space-y-3">
                    <li className="flex items-center justify-between text-xs font-mono">
                        <span className="flex items-center text-gray-300"><span className="w-1.5 h-1.5 bg-[--datacmd-accent-cyan] rounded-full mr-2"></span>North America</span>
                        <span className="text-gray-500">12 Clients</span>
                    </li>
                    <li className="flex items-center justify-between text-xs font-mono">
                        <span className="flex items-center text-gray-300"><span className="w-1.5 h-1.5 bg-[--datacmd-secondary] rounded-full mr-2"></span>Europe (EMEA)</span>
                        <span className="text-gray-500">8 Clients</span>
                    </li>
                    <li className="flex items-center justify-between text-xs font-mono">
                        <span className="flex items-center text-gray-300"><span className="w-1.5 h-1.5 bg-[--datacmd-primary] rounded-full mr-2"></span>APAC Region</span>
                        <span className="text-gray-500">5 Clients</span>
                    </li>
                </ul>
            </div>
        </div>
    </>
);

export const Template11Inner: React.FC<PortfolioTemplateProps> = ({ userData = {} as any, projects = [], sections = [] }) => {
    const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'stack' | 'impact' | 'contact'>('home');

    const heroSection = sections.find(s => s.id === 'about');
    const projectsSection = sections.find(s => s.id === 'projects');
    const skillsSection = sections.find(s => s.id === 'skills');
    const resumeSection = sections.find(s => s.id === 'resume');
    const contactSection = sections.find(s => s.id === 'contact');
    const footerSection = sections.find(s => s.id === 'footer');

    const showHero = heroSection?.isVisible ?? true;
    const showProjects = projectsSection?.isVisible ?? true;
    const showSkills = skillsSection?.isVisible ?? true;
    const showResume = resumeSection?.isVisible ?? true;
    const showContact = contactSection?.isVisible ?? true;
    const showFooter = footerSection?.isVisible ?? true;

    const heroData = sections?.find((s: any) => s.variant === 'HeroDataCommand' || s.id === 'about')?.customData || {};

    return (
        <div className="bg-[--datacmd-bg-dark] text-gray-200 min-h-screen flex flex-col font-body selection:bg-[--datacmd-primary]/30 template-11-wrapper">
            {/* Navbar */}
            <div className="absolute top-6 left-0 right-0 z-50 flex justify-center w-full px-4">
                <nav className="bg-[--datacmd-surface-dark]/80 backdrop-blur-md rounded-full px-6 py-2 border border-[--datacmd-border-muted] shadow-2xl shadow-black/50 transition-all duration-300">
                    <ul className="flex items-center space-x-1 md:space-x-4 text-[10px] md:text-xs font-bold tracking-[0.2em] font-mono uppercase">
                        {showHero && (
                            <li>
                                <button
                                    onClick={() => setActiveTab('home')}
                                    className={`px-3 py-1.5 transition-colors ${activeTab === 'home' ? 'rounded-full text-white bg-[--datacmd-primary]/20 border border-[--datacmd-primary]/30' : 'text-gray-400 hover:text-white'}`}
                                >
                                    HOME
                                </button>
                            </li>
                        )}
                        {showProjects && (
                            <li>
                                <button
                                    onClick={() => setActiveTab('projects')}
                                    className={`px-3 py-1.5 transition-colors ${activeTab === 'projects' ? 'rounded-full text-white bg-[--datacmd-primary]/20 border border-[--datacmd-primary]/30' : 'text-gray-400 hover:text-white'}`}
                                >
                                    PROJECTS
                                </button>
                            </li>
                        )}
                        {showSkills && (
                            <li>
                                <button
                                    onClick={() => setActiveTab('stack')}
                                    className={`px-3 py-1.5 transition-colors ${activeTab === 'stack' ? 'rounded-full text-white bg-[--datacmd-primary]/20 border border-[--datacmd-primary]/30' : 'text-gray-400 hover:text-white'}`}
                                >
                                    STACK
                                </button>
                            </li>
                        )}
                        {showResume && (
                            <li>
                                <button
                                    onClick={() => setActiveTab('impact')}
                                    className={`px-3 py-1.5 transition-colors ${activeTab === 'impact' ? 'rounded-full text-white bg-[--datacmd-primary]/20 border border-[--datacmd-primary]/30' : 'text-gray-400 hover:text-white'}`}
                                >
                                    IMPACT
                                </button>
                            </li>
                        )}
                        {showContact && (
                            <li>
                                <button
                                    onClick={() => setActiveTab('contact')}
                                    className={`px-3 py-1.5 transition-colors ${activeTab === 'contact' ? 'rounded-full text-white bg-[--datacmd-primary]/20 border border-[--datacmd-primary]/30' : 'text-gray-400 hover:text-white'}`}
                                >
                                    CONTACT
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            <main className="relative flex-grow flex flex-col items-center justify-center p-4 md:p-8 pt-24 lg:pt-28 overflow-hidden">
                <div className="absolute inset-0 grid-bg-dots opacity-40 pointer-events-none"></div>

                {/* Blur backgrounds for common views */}
                {(activeTab === 'home' || activeTab === 'stack' || activeTab === 'projects' || activeTab === 'impact') && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl max-h-[800px] bg-[--datacmd-primary]/5 rounded-full blur-[160px] pointer-events-none"></div>
                )}

                {/* View Container */}
                {activeTab === 'home' && (
                    <div className="container mx-auto max-w-7xl h-full grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min lg:grid-rows-[auto_1fr_auto]">

                        {/* System Integrity */}
                        {showResume && (
                            <div className="md:col-span-3 dashboard-panel">
                                <EditableBlock id="resume">
                                    <div className="panel-header">
                                        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">{heroData.integrityLabel || "System Integrity"}</span>
                                        <span className="flex h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]"></span>
                                    </div>
                                    <div className="p-4 flex flex-col justify-center h-full">
                                        <div className="text-3xl font-mono text-white mb-1">{heroData.integrityValue || "99.98%"}</div>
                                        <div className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">Data Pipeline Uptime</div>
                                        <div className="mt-4 flex gap-1 h-8 items-end">
                                            <div className="flex-1 bg-[#22c55e33] h-full"></div>
                                            <div className="flex-1 bg-[#22c55e66] h-3/4"></div>
                                            <div className="flex-1 bg-[#22c55e33] h-full"></div>
                                            <div className="flex-1 bg-[#22c55e99] h-2/3"></div>
                                            <div className="flex-1 bg-[--datacmd-primary]/40 h-5/6"></div>
                                            <div className="flex-1 bg-[#22c55e4d] h-full"></div>
                                        </div>
                                    </div>
                                </EditableBlock>
                            </div>
                        )}

                        {/* Central Hero */}
                        {showHero && (
                            <div className="md:col-span-6 flex flex-col items-center justify-center text-center py-6 px-4">
                                <EditableBlock id="about">
                                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
                                        <span className="text-[10px] font-mono text-[--datacmd-accent-cyan] tracking-widest uppercase">{heroData.tagline || "Central Command v2.4"}</span>
                                    </div>
                                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight text-white pixel-text">
                                        {heroData.headlineLine1 || "DATA."}<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400">{heroData.headlineLine2 || "CLARITY."}</span><br />
                                        {heroData.headlineLine3 || "IMPACT."}
                                    </h1>
                                </EditableBlock>
                            </div>
                        )}

                        {/* Live Pipeline */}
                        {showResume && (
                            <div className="md:col-span-3 dashboard-panel">
                                <EditableBlock id="resume">
                                    <div className="panel-header">
                                        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Live Pipeline</span>
                                        <span className="material-symbols-outlined text-xs text-[--datacmd-primary]">analytics</span>
                                    </div>
                                    <div className="p-3 font-mono text-[10px] leading-tight space-y-1 text-gray-400">
                                        <div className="flex justify-between border-b border-white/5 pb-1">
                                            <span>[STREAM]</span>
                                            <span className="text-emerald-400">SUCCESS</span>
                                        </div>
                                        <div className="pt-1">FETCHING data.events_v2...</div>
                                        <div className="text-gray-600">Transforming schema...</div>
                                        <div className="text-[--datacmd-primary]">Loading to Snowflake...</div>
                                        <div className="flex justify-between pt-2">
                                            <span>LATENCY</span>
                                            <span>42ms</span>
                                        </div>
                                    </div>
                                </EditableBlock>
                            </div>
                        )}

                        {/* SQL Model */}
                        {showResume && (
                            <div className="md:col-span-4 lg:col-span-3 dashboard-panel">
                                <EditableBlock id="resume">
                                    <div className="panel-header">
                                        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">SQL_MODELS.sql</span>
                                        <span className="material-symbols-outlined text-xs text-gray-500">code</span>
                                    </div>
                                    <div className="p-4 font-mono text-xs leading-relaxed text-gray-300">
                                        <p><span className="code-syntax-keyword">SELECT</span> date_trunc(<span className="code-syntax-string">'month'</span>, created_at),</p>
                                        <p className="pl-4"><span className="code-syntax-keyword">DISTINCT</span> user_id) <span className="code-syntax-keyword">AS</span> mau,</p>
                                        <p className="pl-4"><span className="code-syntax-keyword">DISTINCT</span> user_id) <span className="code-syntax-keyword">AS</span> mau,</p>
                                        <p className="pl-4"><span className="code-syntax-func">SUM</span>(order_value) <span className="code-syntax-keyword">AS</span> revenue</p>
                                        <p><span className="code-syntax-keyword">FROM</span> staging.analytics_events</p>
                                        <p><span className="code-syntax-keyword">WHERE</span> status = <span className="code-syntax-string">'completed'</span></p>
                                        <p><span className="code-syntax-keyword">GROUP BY</span> 1</p>
                                        <p><span className="code-syntax-keyword">ORDER BY</span> 1 <span className="code-syntax-keyword">DESC</span>;</p>
                                    </div>
                                </EditableBlock>
                            </div>
                        )}

                        {/* Bio & CTA */}
                        {showHero && (
                            <div className="md:col-span-4 lg:col-span-6 flex flex-col items-center justify-center p-8 space-y-6">
                                <EditableBlock id="about">
                                    <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base font-light text-center leading-relaxed">
                                        {heroData.bio || "Senior Data Analyst & Analytics Engineer building robust infrastructures that turn chaotic data into high-fidelity business intelligence."}
                                    </p>
                                </EditableBlock>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button onClick={() => setActiveTab('projects')} className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-[--datacmd-primary] to-[--datacmd-secondary] font-mono rounded-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                                        EXPLORE REPOS
                                        <span className="ml-2 font-mono text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&gt;_</span>
                                    </button>
                                    <button className="px-8 py-3 font-mono text-sm border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                                        DOWNLOAD CV
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Revenue Optimization */}
                        {showResume && (
                            <div className="md:col-span-4 lg:col-span-3 dashboard-panel">
                                <EditableBlock id="resume">
                                    <div className="panel-header">
                                        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Revenue Optimization</span>
                                        <span className="text-[--datacmd-accent-cyan] text-[10px] font-mono">+12.4%</span>
                                    </div>
                                    <div className="p-4 h-full flex flex-col">
                                        <div className="flex items-end justify-between h-24 gap-1">
                                            <div className="w-full bg-[--datacmd-accent-cyan]/10 h-1/4 rounded-t-sm"></div>
                                            <div className="w-full bg-[--datacmd-accent-cyan]/20 h-2/4 rounded-t-sm"></div>
                                            <div className="w-full bg-[--datacmd-accent-cyan]/30 h-1/3 rounded-t-sm"></div>
                                            <div className="w-full bg-[--datacmd-accent-cyan]/50 h-3/4 rounded-t-sm"></div>
                                            <div className="w-full bg-[--datacmd-accent-cyan]/70 h-2/3 rounded-t-sm"></div>
                                            <div className="w-full bg-[--datacmd-accent-cyan] h-full rounded-t-sm shadow-[0_0_10px_#06B6D4]"></div>
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <div className="bg-white/5 p-2 rounded border border-white/5">
                                                <div className="text-[9px] text-gray-500 font-mono">CAC</div>
                                                <div className="text-xs text-white">$42.10</div>
                                            </div>
                                            <div className="bg-white/5 p-2 rounded border border-white/5">
                                                <div className="text-[9px] text-gray-500 font-mono">LTV</div>
                                                <div className="text-xs text-white">$890.0</div>
                                            </div>
                                        </div>
                                    </div>
                                </EditableBlock>
                            </div>
                        )}

                        {/* Bottom Row Metrics */}
                        <div className="md:col-span-12 lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                            {showSkills && (
                                <EditableBlock id="skills">
                                    <div className="bg-[#05050A] border border-[--datacmd-border-muted] rounded-xl p-4 flex items-center space-x-4">
                                        <div className="bg-[#7C3AED]/20 p-2 rounded">
                                            <span className="material-symbols-outlined text-[#7C3AED]">database</span>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Stack</div>
                                            <div className="text-sm font-bold text-white tracking-widest leading-tight">dbt + Snowflake + Airflow</div>
                                        </div>
                                    </div>
                                </EditableBlock>
                            )}
                            {showResume && (
                                <EditableBlock id="resume">
                                    <div className="bg-[#05050A] border border-[--datacmd-border-muted] rounded-xl p-4 flex items-center space-x-4">
                                        <div className="bg-[#3B82F6]/20 p-2 rounded">
                                            <span className="material-symbols-outlined text-[#3B82F6]">monitoring</span>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">KPIs TRACKED</div>
                                            <div className="text-sm font-bold text-white tracking-widest leading-tight">250+ Metrics Built</div>
                                        </div>
                                    </div>
                                </EditableBlock>
                            )}
                            {showResume && (
                                <EditableBlock id="resume">
                                    <div className="bg-[#05050A] border border-[--datacmd-border-muted] rounded-xl p-4 flex items-center space-x-4">
                                        <div className="bg-[#06B6D4]/20 p-2 rounded">
                                            <span className="material-symbols-outlined text-[#06B6D4]">payments</span>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">IMPACT</div>
                                            <div className="text-sm font-bold text-white tracking-widest leading-tight">$2.5M Identified Rev</div>
                                        </div>
                                    </div>
                                </EditableBlock>
                            )}
                            {showResume && (
                                <EditableBlock id="resume">
                                    <div className="bg-[#05050A] border border-[--datacmd-border-muted] rounded-xl p-4 flex items-center space-x-4">
                                        <div className="bg-[#9333ea]/20 p-2 rounded">
                                            <span className="material-symbols-outlined text-[#c084fc]">precision_manufacturing</span>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">AUTOMATION</div>
                                            <div className="text-sm font-bold text-white tracking-widest leading-tight">85% Workload Reduction</div>
                                        </div>
                                    </div>
                                </EditableBlock>
                            )}
                        </div>

                    </div>
                )}

                {activeTab === 'stack' && (
                    <div className="container mx-auto max-w-7xl h-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-4 sticky top-28">
                            <div className="text-center lg:text-left mb-6">
                                <EditableBlock id="about">
                                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
                                        <span className="text-[10px] font-mono text-[--datacmd-accent-cyan] tracking-widest uppercase">System Architecture v3.0</span>
                                    </div>
                                    <h1 className="font-display text-4xl md:text-5xl text-white pixel-text tracking-wide">
                                        TECHNICAL STACK
                                    </h1>
                                    <p className="text-gray-400 font-mono text-xs mt-2 max-w-2xl">
                                        End-to-end data pipeline schematic. From raw ingestion to high-fidelity visualization.
                                    </p>
                                </EditableBlock>
                            </div>
                            <Sidebar />
                            <div className="mt-8 pt-8 border-t border-[--datacmd-border-muted] grid grid-cols-1 gap-4">
                                <EditableBlock id="skills">
                                    <div className="flex items-center gap-3 px-2">
                                        <span className="material-symbols-outlined text-gray-600">terminal</span>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono text-gray-500 uppercase">CLI Tools</span>
                                            <span className="text-xs text-gray-300 font-mono">Bash, Zsh, Git</span>
                                        </div>
                                    </div>
                                </EditableBlock>
                                <EditableBlock id="skills">
                                    <div className="flex items-center gap-3 px-2">
                                        <span className="material-symbols-outlined text-gray-600">cloud</span>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono text-gray-500 uppercase">Cloud Provider</span>
                                            <span className="text-xs text-gray-300 font-mono">AWS (S3, EC2)</span>
                                        </div>
                                    </div>
                                </EditableBlock>
                                <EditableBlock id="skills">
                                    <div className="flex items-center gap-3 px-2">
                                        <span className="material-symbols-outlined text-gray-600">schedule</span>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono text-gray-500 uppercase">Orchestration</span>
                                            <span className="text-xs text-gray-300 font-mono">Airflow, Prefect</span>
                                        </div>
                                    </div>
                                </EditableBlock>
                                <EditableBlock id="skills">
                                    <div className="flex items-center gap-3 px-2">
                                        <span className="material-symbols-outlined text-gray-600">security</span>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono text-gray-500 uppercase">Governance</span>
                                            <span className="text-xs text-gray-300 font-mono">Monte Carlo</span>
                                        </div>
                                    </div>
                                </EditableBlock>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full">
                                {/* Module 01 */}
                                <div className="flex flex-col gap-4">
                                    <div className="text-center md:text-left mb-2">
                                        <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase block mb-1">Module 01</span>
                                        <h3 className="text-xl font-display text-white">EXTRACTION</h3>
                                    </div>
                                    <div className="dashboard-panel group hover:border-[--datacmd-accent-cyan]/30 transition-colors duration-300">
                                        <div className="panel-header">
                                            <span className="text-[10px] font-mono text-gray-400 uppercase">Fivetran</span>
                                            <span className="material-symbols-outlined text-xs text-[--datacmd-accent-cyan]">cloud_download</span>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center border border-white/10">
                                                    <span className="font-bold text-xs text-blue-400">FV</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                                                        <span>MASTERY</span>
                                                        <span className="text-[--datacmd-accent-cyan]">95%</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[--datacmd-accent-cyan] w-[95%] shadow-[0_0_10px_#06B6D4]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="font-mono text-[10px] text-gray-500">Auto-ingestion pipelines configured.</div>
                                        </div>
                                    </div>
                                    <div className="dashboard-panel group hover:border-[--datacmd-accent-cyan]/30 transition-colors duration-300">
                                        <div className="panel-header">
                                            <span className="text-[10px] font-mono text-gray-400 uppercase">Airbyte</span>
                                            <span className="material-symbols-outlined text-xs text-[--datacmd-accent-cyan]">sync_alt</span>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center border border-white/10">
                                                    <span className="font-bold text-xs text-purple-400">AB</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                                                        <span>MASTERY</span>
                                                        <span className="text-[--datacmd-accent-cyan]">80%</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[--datacmd-accent-cyan] w-[80%] shadow-[0_0_10px_#06B6D4]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="font-mono text-[10px] text-gray-500">Custom connector development.</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Module 02 */}
                                <div className="flex flex-col gap-4">
                                    <div className="text-center md:text-left mb-2">
                                        <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase block mb-1">Module 02</span>
                                        <h3 className="text-xl font-display text-white">STORAGE</h3>
                                    </div>
                                    <div className="dashboard-panel group hover:border-[--datacmd-accent-cyan]/30 transition-colors duration-300 h-full flex flex-col">
                                        <div className="panel-header">
                                            <span className="text-[10px] font-mono text-gray-400 uppercase">Warehousing</span>
                                            <span className="material-symbols-outlined text-xs text-[--datacmd-accent-cyan]">database</span>
                                        </div>
                                        <div className="p-4 flex-grow flex flex-col gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center border border-white/10">
                                                        <span className="material-symbols-outlined text-sm text-blue-300">ac_unit</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-xs font-bold text-gray-200">Snowflake</span>
                                                            <span className="text-[9px] font-mono text-[--datacmd-accent-cyan]">EXPERT</span>
                                                        </div>
                                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-[--datacmd-accent-cyan] w-[98%] shadow-[0_0_8px_#06B6D4]"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="font-mono text-[9px] text-gray-500 pl-11">Zero-copy cloning, Snowpipe, Time travel optimization.</div>
                                            </div>
                                            <div className="h-[1px] bg-white/5 w-full"></div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center border border-white/10">
                                                        <span className="material-symbols-outlined text-sm text-green-300">search</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-xs font-bold text-gray-200">BigQuery</span>
                                                            <span className="text-[9px] font-mono text-[--datacmd-accent-cyan]">ADVANCED</span>
                                                        </div>
                                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-[--datacmd-accent-cyan] w-[85%] shadow-[0_0_8px_#06B6D4]"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="font-mono text-[9px] text-gray-500 pl-11">Partitioning & clustering strategies implemented.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Module 03 */}
                                <div className="flex flex-col gap-4">
                                    <div className="text-center md:text-left mb-2">
                                        <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase block mb-1">Module 03</span>
                                        <h3 className="text-xl font-display text-white">TRANSFORMATION</h3>
                                    </div>
                                    <div className="dashboard-panel group hover:border-[--datacmd-accent-cyan]/30 transition-colors duration-300">
                                        <div className="panel-header">
                                            <span className="text-[10px] font-mono text-gray-400 uppercase">dbt Core</span>
                                            <span className="material-symbols-outlined text-xs text-orange-400">model_training</span>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-2">
                                                <span>MODELING</span>
                                                <span className="text-[--datacmd-accent-cyan]">98%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3 relative">
                                                <div className="absolute inset-0 bg-orange-500/10"></div>
                                                <div className="h-full bg-[--datacmd-accent-cyan] w-[98%] shadow-[0_0_10px_#06B6D4]"></div>
                                            </div>
                                            <div className="p-2 bg-black/40 rounded border border-white/5 font-mono text-[9px] text-gray-400">
                                                <span className="text-purple-400">ref</span>('stg_payments') <span className="text-gray-600">-&gt;</span> <span className="text-green-400">marts_finance</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dashboard-panel group hover:border-[--datacmd-accent-cyan]/30 transition-colors duration-300">
                                        <div className="panel-header">
                                            <span className="text-[10px] font-mono text-gray-400 uppercase">Python</span>
                                            <span className="material-symbols-outlined text-xs text-yellow-300">code</span>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-2">
                                                <span>SCRIPTING</span>
                                                <span className="text-[--datacmd-accent-cyan]">90%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3 relative">
                                                <div className="absolute inset-0 bg-yellow-500/10"></div>
                                                <div className="h-full bg-[--datacmd-accent-cyan] w-[90%] shadow-[0_0_10px_#06B6D4]"></div>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-mono text-gray-400 border border-white/5">Pandas</span>
                                                <span className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-mono text-gray-400 border border-white/5">Airflow</span>
                                                <span className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-mono text-gray-400 border border-white/5">NumPy</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Module 04 */}
                                <div className="flex flex-col gap-4">
                                    <div className="text-center md:text-left mb-2">
                                        <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase block mb-1">Module 04</span>
                                        <h3 className="text-xl font-display text-white">BI / VIZ</h3>
                                    </div>
                                    <div className="dashboard-panel h-full flex flex-col group hover:border-[--datacmd-accent-cyan]/30 transition-colors duration-300">
                                        <div className="panel-header">
                                            <span className="text-[10px] font-mono text-gray-400 uppercase">Visualization</span>
                                            <span className="material-symbols-outlined text-xs text-[--datacmd-accent-cyan]">monitoring</span>
                                        </div>
                                        <div className="p-4 flex-grow flex flex-col justify-between gap-4">
                                            <div className="relative">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center border border-white/10">
                                                        <span className="material-symbols-outlined text-sm text-blue-500">bar_chart</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                                                            <span>Tableau</span>
                                                            <span className="text-[--datacmd-accent-cyan]">92%</span>
                                                        </div>
                                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-[--datacmd-accent-cyan] w-[92%] shadow-[0_0_10px_#06B6D4]"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center border border-white/10">
                                                        <span className="material-symbols-outlined text-sm text-red-400">pie_chart</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                                                            <span>Looker</span>
                                                            <span className="text-[--datacmd-accent-cyan]">85%</span>
                                                        </div>
                                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-[--datacmd-accent-cyan] w-[85%] shadow-[0_0_10px_#06B6D4]"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-auto bg-[--datacmd-accent-cyan]/5 border border-[--datacmd-accent-cyan]/20 p-3 rounded-lg">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] animate-pulse"></span>
                                                    <span className="text-[10px] font-mono text-[--datacmd-accent-cyan] uppercase">Live Output</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-1 h-8 items-end opacity-70">
                                                    <div className="bg-[--datacmd-accent-cyan] h-[40%] rounded-t-sm"></div>
                                                    <div className="bg-[--datacmd-accent-cyan] h-[80%] rounded-t-sm"></div>
                                                    <div className="bg-[--datacmd-accent-cyan] h-[60%] rounded-t-sm"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <>
                        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
                            <div className="w-[90%] h-[70%] relative border border-white/5 rounded-3xl bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-contain filter invert opacity-30">
                                <div className="map-dot top-[30%] left-[25%] animate-pulse-glow"></div>
                                <div className="map-dot top-[35%] left-[28%] animate-pulse-glow" style={{ animationDelay: "0.5s" }}></div>
                                <div className="map-dot top-[45%] left-[50%] animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
                                <div className="map-dot top-[48%] left-[52%] animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
                                <div className="map-dot top-[60%] left-[80%] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>
                                <span className="absolute top-[30%] left-[25%] w-8 h-8 border border-[--datacmd-accent-cyan]/30 rounded-full animate-ping-slow"></span>
                                <span className="absolute top-[45%] left-[50%] w-8 h-8 border border-[--datacmd-accent-cyan]/30 rounded-full animate-ping-slow" style={{ animationDelay: "1s" }}></span>
                            </div>
                        </div>

                        <div className="container mx-auto max-w-7xl h-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-4 sticky top-28">
                                <EditableBlock id="about" className="space-y-2 mb-4">
                                    <div className="inline-flex items-center space-x-2 bg-[--datacmd-accent-cyan]/10 border border-[--datacmd-accent-cyan]/20 rounded-full px-3 py-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] animate-pulse"></span>
                                        <span className="text-[10px] font-mono text-[--datacmd-accent-cyan] tracking-widest uppercase">Global Operations</span>
                                    </div>
                                    <h1 className="font-display text-4xl md:text-5xl text-white">
                                        Ready to<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--datacmd-accent-cyan] to-[--datacmd-secondary]">Deploy Analytics?</span>
                                    </h1>
                                    <p className="text-gray-400 text-sm font-light max-w-md">
                                        Initiate a secure connection to discuss data infrastructure, pipeline optimization, or business intelligence needs.
                                    </p>
                                </EditableBlock>
                                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                                <div className="flex gap-4 mt-6">
                                    <EditableBlock id="contact" className="flex-1">
                                        <a className="w-full dashboard-panel p-4 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer group" href="mailto:hello@example.com">
                                            <span className="material-symbols-outlined text-2xl text-gray-400 group-hover:text-[--datacmd-accent-cyan] mb-2 transition-colors">mail</span>
                                            <span className="text-[10px] font-mono text-gray-500 uppercase">Encrypted Email</span>
                                        </a>
                                    </EditableBlock>
                                    <EditableBlock id="contact" className="flex-1">
                                        <a className="w-full dashboard-panel p-4 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer group" href="#">
                                            <span className="material-symbols-outlined text-2xl text-gray-400 group-hover:text-[--datacmd-primary] mb-2 transition-colors">link</span>
                                            <span className="text-[10px] font-mono text-gray-500 uppercase">LinkedIn Node</span>
                                        </a>
                                    </EditableBlock>
                                </div>
                            </div>

                            <div className="lg:col-span-8">
                                <EditableBlock id="contact">
                                    <div className="dashboard-panel h-full shadow-[0_0_50px_-20px_rgba(124,58,237,0.2)]">
                                        <div className="panel-header bg-[--datacmd-surface-dark]/80">
                                            <div className="flex items-center space-x-2">
                                                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                                                <span className="text-[10px] font-mono tracking-widest text-white uppercase">Transmission Uplink</span>
                                            </div>
                                            <div className="font-mono text-[10px] text-gray-500">SECURE_SSL_V3</div>
                                        </div>
                                        <form className="p-6 md:p-8 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-mono text-[--datacmd-accent-cyan] uppercase tracking-wider ml-1">Identity // Name</label>
                                                    <input className="neon-input placeholder:text-gray-600" placeholder="John Doe" type="text" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-mono text-[--datacmd-accent-cyan] uppercase tracking-wider ml-1">Coordinates // Email</label>
                                                    <input className="neon-input placeholder:text-gray-600" placeholder="john@company.com" type="email" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-mono text-[--datacmd-accent-cyan] uppercase tracking-wider ml-1">Subject // Objective</label>
                                                <select className="neon-input text-gray-400" aria-label="Objective">
                                                    <option>Project Inquiry</option>
                                                    <option>Consultation Request</option>
                                                    <option>Speaking Opportunity</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-mono text-[--datacmd-accent-cyan] uppercase tracking-wider ml-1">Payload // Message</label>
                                                <textarea className="neon-input placeholder:text-gray-600 resize-none" placeholder="Describe your data challenges..." rows={6}></textarea>
                                            </div>
                                            <div className="pt-4 flex items-center justify-between">
                                                <div className="hidden md:flex items-center space-x-2 text-[10px] text-gray-500 font-mono">
                                                    <span className="material-symbols-outlined text-sm">lock</span>
                                                    <span>End-to-end encrypted</span>
                                                </div>
                                                <button className="w-full md:w-auto group relative px-8 py-3 bg-gradient-to-r from-[--datacmd-primary] to-[--datacmd-secondary] rounded text-white font-mono font-bold text-sm tracking-wider hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300 overflow-hidden" type="button">
                                                    <span className="relative z-10 flex items-center justify-center">
                                                        TRANSMIT MESSAGE
                                                        <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">send</span>
                                                    </span>
                                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                                </button>
                                            </div>
                                        </form>
                                        <div className="bg-black/40 border-t border-[--datacmd-border-muted] p-3 font-mono text-[9px] text-gray-500 h-16 overflow-hidden leading-relaxed">
                                            <div className="opacity-50">&gt; Initializing handshake protocol...</div>
                                            <div className="opacity-50">&gt; Listening on port 443...</div>
                                            <div className="text-[--datacmd-accent-cyan] opacity-80 animate-pulse">&gt; Ready for input_</div>
                                        </div>
                                    </div>
                                </EditableBlock>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'projects' && (
                    <div className="container mx-auto max-w-7xl h-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-4 sticky top-28">
                            <div className="text-center lg:text-left mb-6">
                                <EditableBlock id="projects">
                                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
                                        <span className="text-[10px] font-mono text-[--datacmd-primary] tracking-widest uppercase">System Deployments v1.2</span>
                                    </div>
                                    <h1 className="font-display text-4xl md:text-5xl text-white pixel-text tracking-wide">
                                        ARCHIVED PROJECTS
                                    </h1>
                                    <p className="text-gray-400 font-mono text-xs mt-2 max-w-2xl">
                                        Searchable database of past data engineering and analytics deployments.
                                    </p>
                                </EditableBlock>
                            </div>
                            <Sidebar />
                        </div>

                        <div className="lg:col-span-8 flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Project 1 */}
                                <div className="dashboard-panel group hover:border-[--datacmd-primary]/50 transition-colors duration-300">
                                    <div className="panel-header group-hover:bg-[--datacmd-primary]/10 transition-colors">
                                        <span className="text-[10px] font-mono tracking-widest text-[--datacmd-primary] uppercase">P_001</span>
                                        <span className="material-symbols-outlined text-xs text-[--datacmd-primary]">folder_open</span>
                                    </div>
                                    <div className="p-6 flex flex-col h-full gap-4">
                                        <h3 className="text-xl font-display text-white group-hover:text-[--datacmd-primary] transition-colors">Real-time Streaming Engine</h3>
                                        <p className="text-sm font-light text-gray-400 font-mono leading-relaxed line-clamp-3">
                                            Architected a Kafka-to-Snowflake streaming pipeline to reduce data latency from 24h to 45s. Built custom Python producers to format complex JSON logs.
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400 border border-white/5">Kafka</span>
                                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-[--datacmd-accent-cyan] border border-white/5">Snowflake</span>
                                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400 border border-white/5">Python</span>
                                        </div>
                                        <div className="h-[1px] w-full bg-white/10 my-1"></div>
                                        <div className="flex justify-between items-center text-[10px] font-mono">
                                            <span className="text-emerald-400">STATUS: DEPLOYED</span>
                                            <button className="text-gray-500 hover:text-white transition-colors flex items-center gap-1 group-hover:text-[--datacmd-primary]">
                                                INITIATE <span className="material-symbols-outlined text-[10px]">&#xe5c8;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Project 2 */}
                                <div className="dashboard-panel group hover:border-[--datacmd-secondary]/50 transition-colors duration-300">
                                    <div className="panel-header group-hover:bg-[--datacmd-secondary]/10 transition-colors">
                                        <span className="text-[10px] font-mono tracking-widest text-[--datacmd-secondary] uppercase">P_002</span>
                                        <span className="material-symbols-outlined text-xs text-[--datacmd-secondary]">folder_open</span>
                                    </div>
                                    <div className="p-6 flex flex-col h-full gap-4">
                                        <h3 className="text-xl font-display text-white group-hover:text-[--datacmd-secondary] transition-colors">dbt Core Migration</h3>
                                        <p className="text-sm font-light text-gray-400 font-mono leading-relaxed line-clamp-3">
                                            Led the migration of 400+ legacy stored procedures into a version-controlled, tested dbt repository. Improved code review process and data quality.
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-orange-400 border border-white/5">dbt</span>
                                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400 border border-white/5">BigQuery</span>
                                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400 border border-white/5">Git</span>
                                        </div>
                                        <div className="h-[1px] w-full bg-white/10 my-1"></div>
                                        <div className="flex justify-between items-center text-[10px] font-mono">
                                            <span className="text-emerald-400">STATUS: DEPLOYED</span>
                                            <button className="text-gray-500 hover:text-white transition-colors flex items-center gap-1 group-hover:text-[--datacmd-secondary]">
                                                INITIATE <span className="material-symbols-outlined text-[10px]">&#xe5c8;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Project 3 */}
                                <div className="dashboard-panel group hover:border-[--datacmd-accent-cyan]/50 transition-colors duration-300">
                                    <div className="panel-header group-hover:bg-[--datacmd-accent-cyan]/10 transition-colors">
                                        <span className="text-[10px] font-mono tracking-widest text-[--datacmd-accent-cyan] uppercase">P_003</span>
                                        <span className="material-symbols-outlined text-xs text-[--datacmd-accent-cyan]">folder_open</span>
                                    </div>
                                    <div className="p-6 flex flex-col h-full gap-4">
                                        <h3 className="text-xl font-display text-white group-hover:text-[--datacmd-accent-cyan] transition-colors">Executive KPI Dashboard</h3>
                                        <p className="text-sm font-light text-gray-400 font-mono leading-relaxed line-clamp-3">
                                            Designed a centralized Tableau dashboard adopted by C-suite executives, tracking global ARR, churn risk, and regional performance anomalies.
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-blue-400 border border-white/5">Tableau</span>
                                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-[--datacmd-accent-cyan] border border-white/5">SQL</span>
                                            <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400 border border-white/5">Figma</span>
                                        </div>
                                        <div className="h-[1px] w-full bg-white/10 my-1"></div>
                                        <div className="flex justify-between items-center text-[10px] font-mono">
                                            <span className="text-yellow-400">STATUS: IN_PROGRESS</span>
                                            <button className="text-gray-500 hover:text-white transition-colors flex items-center gap-1 group-hover:text-[--datacmd-accent-cyan]">
                                                INITIATE <span className="material-symbols-outlined text-[10px]">&#xe5c8;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'impact' && (
                    <div className="container mx-auto max-w-7xl px-4 lg:grid lg:grid-cols-12 lg:gap-8 z-10 relative">
                        {/* Left Sidebar - Consistent across sections */}
                        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start mb-8 lg:mb-0">
                            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>

                        {/* Right Content Column */}
                        <div className="lg:col-span-8 flex flex-col gap-10">
                            {/* Header Section */}
                            <div className="text-left">
                                <EditableBlock id="about">
                                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
                                        <span className="text-[10px] font-mono text-[#22c55e] tracking-widest uppercase">Performance Metrics v4.1</span>
                                    </div>
                                    <h1 className="font-display text-4xl md:text-6xl text-white pixel-text tracking-wide uppercase">
                                        Measurable Impact
                                    </h1>
                                    <p className="text-gray-400 font-mono text-xs md:text-sm mt-2 max-w-2xl">
                                        Quantifying the engineering value driven across core operational metrics.
                                    </p>
                                </EditableBlock>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Metric 1 */}
                                <div className="dashboard-panel flex flex-col p-6 items-center justify-center text-center gap-2">
                                    <span className="material-symbols-outlined text-3xl text-emerald-400 mb-2">query_stats</span>
                                    <div className="text-4xl font-display text-white">$2.5M+</div>
                                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Revenue Identified</div>
                                </div>

                                {/* Metric 2 */}
                                <div className="dashboard-panel flex flex-col p-6 items-center justify-center text-center gap-2">
                                    <span className="material-symbols-outlined text-3xl text-[--datacmd-primary] mb-2">speed</span>
                                    <div className="text-4xl font-display text-white">85%</div>
                                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Latency Reduction</div>
                                </div>

                                {/* Metric 3 */}
                                <div className="dashboard-panel flex flex-col p-6 items-center justify-center text-center gap-2">
                                    <span className="material-symbols-outlined text-3xl text-[--datacmd-secondary] mb-2">library_add_check</span>
                                    <div className="text-4xl font-display text-white">400+</div>
                                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Models Tested</div>
                                </div>

                                {/* Metric 4 */}
                                <div className="dashboard-panel flex flex-col p-6 items-center justify-center text-center gap-2">
                                    <span className="material-symbols-outlined text-3xl text-[--datacmd-accent-cyan] mb-2">schedule</span>
                                    <div className="text-4xl font-display text-white">120h</div>
                                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Saved Monthly</div>
                                </div>
                            </div>

                            <div className="dashboard-panel p-0 group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -z-10 group-hover:bg-emerald-500/10 transition-colors duration-700"></div>
                                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center p-6 md:p-8">
                                    <div className="xl:col-span-5 flex flex-col gap-4">
                                        <div className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase">Case Study // Optimization</div>
                                        <h3 className="text-2xl font-display text-white">Warehouse Compute Savings</h3>
                                        <p className="text-gray-400 font-light text-sm leading-relaxed">
                                            By auditing query logs and implementing aggressive clustering keys on the largest fact tables, I reduced the monthly Snowflake compute spend by over 30% while simultaneously improving average query return times for BI users.
                                        </p>
                                        <ul className="space-y-2 mt-2">
                                            <li className="flex items-center gap-2 text-xs font-mono text-gray-300">
                                                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                                                Audited 10,000+ daily queries
                                            </li>
                                            <li className="flex items-center gap-2 text-xs font-mono text-gray-300">
                                                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                                                Implemented incremental dbt models
                                            </li>
                                            <li className="flex items-center gap-2 text-xs font-mono text-gray-300">
                                                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                                                $40k/yr projected saving
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="xl:col-span-7 h-48 md:h-64 border border-white/10 rounded-lg bg-black/40 p-4 flex items-end gap-2 px-6">
                                        {/* Bar chart representing cost over time */}
                                        <div className="flex-1 bg-red-500/30 h-[90%] rounded-t border-t-2 border-red-500 flex justify-center pt-2 relative group">
                                            <span className="text-[10px] font-mono text-red-300 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">$8k</span>
                                        </div>
                                        <div className="flex-1 bg-red-400/30 h-[85%] rounded-t border-t-2 border-red-400 flex justify-center pt-2 relative group">
                                            <span className="text-[10px] font-mono text-red-300 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">$7.8k</span>
                                        </div>
                                        <div className="flex-1 bg-[--datacmd-primary]/30 h-[95%] rounded-t border-t-2 border-[--datacmd-primary] flex justify-center pt-2 relative group">
                                            <span className="text-[10px] font-mono text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">$8.4k</span>
                                        </div>
                                        <div className="w-[2px] h-full bg-white/20 border-l border-dashed border-white/20 mx-2 relative">
                                            <div className="absolute top-2 -translate-x-1/2 bg-black/80 px-2 py-1 border border-white/10 text-[8px] font-mono text-emerald-400 whitespace-nowrap rounded">DEPLOYMENT</div>
                                        </div>
                                        <div className="flex-1 bg-emerald-500/30 h-[60%] rounded-t border-t-2 border-emerald-500 flex justify-center pt-2 relative group">
                                            <span className="text-[10px] font-mono text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">$5.2k</span>
                                        </div>
                                        <div className="flex-1 bg-emerald-500/40 h-[55%] rounded-t border-t-2 border-emerald-400 flex justify-center pt-2 relative group">
                                            <span className="text-[10px] font-mono text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">$4.8k</span>
                                        </div>
                                        <div className="flex-1 bg-emerald-500/50 h-[50%] rounded-t border-t-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex justify-center pt-2 relative group">
                                            <span className="text-[10px] font-mono text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">$4.4k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <div className="w-full bg-[--datacmd-surface-dark] border-t border-[--datacmd-border-muted] py-2.5 overflow-hidden">
                <div className="whitespace-nowrap flex animate-marquee">
                    {/* Render different marquee based on active tab to maintain thematic consistency */}
                    {activeTab === 'home' && (
                        <>
                            <div className="flex items-center font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.3em] uppercase">
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>99.9% Data Accuracy</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>$2M Revenue Optimized</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>15+ KPI Dashboards</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>SQL Expert</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Python Analytics</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>dbt Modeling</span>
                            </div>
                            <div className="flex items-center font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.3em] uppercase">
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>99.9% Data Accuracy</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>$2M Revenue Optimized</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>15+ KPI Dashboards</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>SQL Expert</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Python Analytics</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>dbt Modeling</span>
                            </div>
                        </>
                    )}
                    {activeTab === 'stack' && (
                        <>
                            <div className="flex items-center font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.3em] uppercase">
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>System Operational</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>Data Flow Optimized</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Pipeline Healthy</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>Latency &lt; 50ms</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>Schema Validated</span>
                            </div>
                            <div className="flex items-center font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.3em] uppercase">
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>System Operational</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>Data Flow Optimized</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Pipeline Healthy</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>Latency &lt; 50ms</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>Schema Validated</span>
                            </div>
                        </>
                    )}
                    {(activeTab === 'projects' || activeTab === 'impact') && (
                        <>
                            <div className="flex items-center font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.3em] uppercase">
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3"></span>Metrics Delivered</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>Pipelines Shipped</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Models Built</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3"></span>Dashboards Live</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>ROI Verified</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>Systems Scaled</span>
                            </div>
                            <div className="flex items-center font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.3em] uppercase">
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3"></span>Metrics Delivered</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>Pipelines Shipped</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Models Built</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3"></span>Dashboards Live</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>ROI Verified</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>Systems Scaled</span>
                            </div>
                        </>
                    )}
                    {activeTab === 'contact' && (
                        <>
                            <div className="flex items-center font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.3em] uppercase">
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>Open for Work</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Global Availability</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>Remote Capable</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>Secure Comms</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Rapid Response</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>Priority Access</span>
                            </div>
                            <div className="flex items-center font-mono text-[10px] md:text-xs text-gray-500 tracking-[0.3em] uppercase">
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>Open for Work</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Global Availability</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>Remote Capable</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-primary] mr-3"></span>Secure Comms</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-secondary] mr-3"></span>Rapid Response</span>
                                <span className="mx-12 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[--datacmd-accent-cyan] mr-3"></span>Priority Access</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Template11Inner;
