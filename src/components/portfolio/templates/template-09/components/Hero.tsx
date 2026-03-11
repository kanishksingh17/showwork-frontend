import React from 'react';

interface HeroProps {
    name?: string;
}

export const Hero: React.FC<HeroProps> = ({ name = 'ALEX MORGAN' }) => {
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    return (
        <section id="hero">
            <div className="hero-ambient"></div>
            <div className="hero-ambient-2"></div>

            <div className="hero-left">
                <div className="hero-eyebrow">Senior Data Engineer · ETL Architect</div>
                <h1 className="hero-name">{firstName} <span className="accent">{lastName}</span></h1>
                <div className="hero-title">PIPELINE ENGINEER</div>
                <p className="hero-desc">
                    I architect <strong>high-throughput data pipelines</strong> that move billions of events per day — from raw ingestion to analytics-ready. Specializing in real-time stream processing, fault-tolerant ETL systems, and observable data infrastructure at scale.
                </p>
                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-number">12<span style={{ fontSize: '24px', color: 'var(--white-30)' }}>PB</span></div>
                        <div className="stat-label">Data Processed</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">99<span style={{ fontSize: '24px', color: 'var(--orange-core)' }}>%</span></div>
                        <div className="stat-label">Pipeline Uptime</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">8<span style={{ fontSize: '24px', color: 'var(--white-30)' }}>ms</span></div>
                        <div className="stat-label">P99 Latency</div>
                    </div>
                </div>
                <div className="hero-actions">
                    <a href="#projects" className="btn-primary">VIEW SYSTEMS ▸</a>
                    <a href="#contact" className="btn-ghost">⟶ START A PROJECT</a>
                </div>
            </div>

            <div className="hero-right">
                <div className="pipeline-canvas">

                    {/* Metric Badges */}
                    <div className="metric-badge badge-throughput">
                        <div className="metric-key">THROUGHPUT</div>
                        <div className="metric-val">2.4M/s</div>
                    </div>
                    <div className="metric-badge badge-latency">
                        <div className="metric-key">STREAM LAG</div>
                        <div className="metric-val">0 ms</div>
                    </div>
                    <div className="metric-badge badge-uptime">
                        <div className="metric-key">UPTIME</div>
                        <div className="metric-val">99.97%</div>
                    </div>

                    {/* Orbit Rings */}
                    <div className="orbit-ring ring-1"></div>
                    <div className="orbit-ring ring-2"></div>
                    <div className="orbit-ring ring-3"></div>

                    {/* SVG pipes connecting nodes */}
                    <svg className="pipeline-svg" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="pipeOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#F5720A" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#FF8C2A" stopOpacity="0.3" />
                            </linearGradient>
                            <linearGradient id="pipeCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.2" />
                            </linearGradient>
                            <linearGradient id="pipeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00FF88" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#00FF88" stopOpacity="0.2" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                            {/* Paths for particle animation */}
                            <path id="pathKafka" d="M250,50 L250,165" fill="none" />
                            <path id="pathPostgres" d="M55,165 L170,220" fill="none" />
                            <path id="pathS3" d="M390,165 L315,220" fill="none" />
                            <path id="pathLake" d="M250,290 L130,360" fill="none" />
                            <path id="pathAnalytics" d="M250,290 L370,360" fill="none" />
                            <path id="pathMonitor" d="M250,290 L250,400" fill="none" />
                        </defs>

                        {/* Pipes */}
                        <path d="M250,88 C250,88 250,175 250,185" stroke="url(#pipeOrange)" strokeWidth="2" fill="none" strokeDasharray="4,4">
                            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="0.8s" repeatCount="indefinite" />
                        </path>
                        <path d="M90,185 C150,185 190,220 210,230" stroke="url(#pipeCyan)" strokeWidth="1.5" fill="none" strokeDasharray="4,4">
                            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.1s" repeatCount="indefinite" />
                        </path>
                        <path d="M405,185 C360,185 310,215 295,230" stroke="url(#pipeGreen)" strokeWidth="1.5" fill="none" strokeDasharray="4,4">
                            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.3s" repeatCount="indefinite" />
                        </path>
                        <path d="M215,285 C180,320 145,345 130,360" stroke="url(#pipeCyan)" strokeWidth="2" fill="none" strokeDasharray="4,4">
                            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="0.9s" repeatCount="indefinite" />
                        </path>
                        <path d="M285,285 C330,325 355,345 375,360" stroke="url(#pipeGreen)" strokeWidth="2" fill="none" strokeDasharray="4,4">
                            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.0s" repeatCount="indefinite" />
                        </path>
                        <path d="M250,290 L250,405" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeDasharray="4,4">
                            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.4s" repeatCount="indefinite" />
                        </path>

                        {/* Flowing particles */}
                        <circle r="4" fill="#F5720A" filter="url(#glow)">
                            <animateMotion dur="1.5s" repeatCount="indefinite" path="M250,88 C250,88 250,175 250,185" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <circle r="3" fill="#00D4FF" filter="url(#glow)">
                            <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M90,185 C150,185 190,220 210,230" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                        </circle>
                        <circle r="3" fill="#00FF88" filter="url(#glow)">
                            <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.3s" path="M405,185 C360,185 310,215 295,230" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" begin="0.3s" />
                        </circle>
                        <circle r="3.5" fill="#00D4FF" filter="url(#glow)">
                            <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.1s" path="M215,285 C180,320 145,345 130,360" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite" begin="0.1s" />
                        </circle>
                        <circle r="3.5" fill="#00FF88" filter="url(#glow)">
                            <animateMotion dur="1.9s" repeatCount="indefinite" begin="0.6s" path="M285,285 C330,325 355,345 375,360" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="1.9s" repeatCount="indefinite" begin="0.6s" />
                        </circle>
                        <circle r="2.5" fill="rgba(255,255,255,0.5)" filter="url(#glow)">
                            <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.9s" path="M250,290 L250,405" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin="0.9s" />
                        </circle>

                        {/* Cross-brace structural lines */}
                        <line x1="90" y1="185" x2="405" y2="185" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                        <line x1="130" y1="405" x2="375" y2="405" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    </svg>

                    {/* Top source: Kafka */}
                    <div className="data-node node-kafka" style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)' }}>
                        <div className="node-icon">⚡</div>
                        <div className="data-node-label">Kafka</div>
                    </div>

                    {/* Left: Postgres */}
                    <div className="data-node node-postgres" style={{ position: 'absolute', top: '145px', left: '16px' }}>
                        <div className="node-icon">🗄</div>
                        <div className="data-node-label">Postgres</div>
                    </div>

                    {/* Right: S3 */}
                    <div className="data-node node-s3" style={{ position: 'absolute', top: '145px', right: '16px' }}>
                        <div className="node-icon">☁</div>
                        <div className="data-node-label">S3 / GCS</div>
                    </div>

                    {/* Center: Spark Core */}
                    <div className="spark-core">
                        <div className="core-hex">
                            <div className="core-label">
                                <span>⚡</span>
                                SPARK<br />CORE
                            </div>
                        </div>
                    </div>

                    {/* Bottom left: Data Lake */}
                    <div className="data-node node-lake" style={{ position: 'absolute', bottom: '118px', left: '16px', width: '88px' }}>
                        <div className="node-icon">🏔</div>
                        <div className="data-node-label">Data Lake</div>
                    </div>

                    {/* Bottom right: Analytics */}
                    <div className="data-node node-analytics" style={{ position: 'absolute', bottom: '118px', right: '16px', width: '88px' }}>
                        <div className="node-icon">📊</div>
                        <div className="data-node-label">Analytics</div>
                    </div>

                    {/* Bottom center: Monitoring */}
                    <div className="data-node node-monitor" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                        <div className="node-icon">📡</div>
                        <div className="data-node-label">Observe</div>
                    </div>

                </div>{/* /pipeline-canvas */}
            </div>{/* /hero-right */}

            <div className="scroll-hint">
                <div className="scroll-line"></div>
                SCROLL
            </div>
        </section>
    );
};
