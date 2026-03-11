import React from 'react';

export const Metrics: React.FC = () => {
    return (
        <section className="section" id="metrics">
            <div className="section-inner">
                <div className="fade-in-up">
                    <div className="section-label">// 03 — Impact</div>
                    <h2 className="section-title">Numbers<br />That Matter</h2>
                </div>

                <div className="metrics-layout">
                    <div className="metrics-big-grid fade-in-up">
                        <div className="metric-block accent-bg">
                            <div className="metric-num">5M<span className="metric-unit">+</span></div>
                            <div className="metric-lbl">Total Downloads</div>
                            <div className="metric-sub">Across all published apps, iOS + Android combined</div>
                        </div>
                        <div className="metric-block">
                            <div className="metric-num">4.8<span className="metric-unit">★</span></div>
                            <div className="metric-lbl">Avg App Store Rating</div>
                            <div className="metric-sub">Weighted average across 12 shipped apps</div>
                        </div>
                        <div className="metric-block">
                            <div className="metric-num">62<span className="metric-unit">%</span></div>
                            <div className="metric-lbl">Crash Rate Reduction</div>
                            <div className="metric-sub">After performance refactor on legacy codebases</div>
                        </div>
                        <div className="metric-block">
                            <div className="metric-num">1.8<span className="metric-unit">s</span></div>
                            <div className="metric-lbl">Avg Cold Start Time</div>
                            <div className="metric-sub">Optimized across 4 flagship production apps</div>
                        </div>
                    </div>

                    <div className="proficiency-col fade-in-up">
                        <div className="prof-item">
                            <div className="prof-header">
                                <span className="prof-name">Flutter / Dart</span>
                                <span className="prof-pct">96%</span>
                            </div>
                            <div className="prof-bar-track">
                                <div className="prof-bar-fill" style={{ width: '96%' }} />
                            </div>
                        </div>
                        <div className="prof-item">
                            <div className="prof-header">
                                <span className="prof-name">Swift / SwiftUI</span>
                                <span className="prof-pct">92%</span>
                            </div>
                            <div className="prof-bar-track">
                                <div className="prof-bar-fill" style={{ width: '92%' }} />
                            </div>
                        </div>
                        <div className="prof-item">
                            <div className="prof-header">
                                <span className="prof-name">Kotlin / Compose</span>
                                <span className="prof-pct">88%</span>
                            </div>
                            <div className="prof-bar-track">
                                <div className="prof-bar-fill" style={{ width: '88%' }} />
                            </div>
                        </div>
                        <div className="prof-item">
                            <div className="prof-header">
                                <span className="prof-name">React Native</span>
                                <span className="prof-pct">85%</span>
                            </div>
                            <div className="prof-bar-track">
                                <div className="prof-bar-fill" style={{ width: '85%' }} />
                            </div>
                        </div>
                        <div className="prof-item">
                            <div className="prof-header">
                                <span className="prof-name">Firebase / Backend</span>
                                <span className="prof-pct">82%</span>
                            </div>
                            <div className="prof-bar-track">
                                <div className="prof-bar-fill" style={{ width: '82%' }} />
                            </div>
                        </div>
                        <div className="prof-item">
                            <div className="prof-header">
                                <span className="prof-name">CI/CD & App Store Deploy</span>
                                <span className="prof-pct">90%</span>
                            </div>
                            <div className="prof-bar-track">
                                <div className="prof-bar-fill" style={{ width: '90%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
