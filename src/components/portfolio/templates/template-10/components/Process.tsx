import React from 'react';

export const Process: React.FC = () => {
    return (
        <section className="section" id="process">
            <div className="section-inner">
                <div className="fade-in-up">
                    <div className="section-label">// 04 — Methodology</div>
                    <h2 className="section-title">How I Build</h2>
                    <p className="section-sub">A battle-tested process for taking apps from concept to top of the charts with zero technical debt.</p>
                </div>

                <div className="process-steps fade-in-up hidden md:grid">
                    <div className="process-step">
                        <div className="step-num-wrap">
                            <span className="step-num">01</span>
                        </div>
                        <div className="step-title">Architecture Setup</div>
                        <div className="step-desc">Defining state management, networking layers, offline persistence strategies, and initial CI/CD pipelines before the first UI commit.</div>
                    </div>
                    <div className="process-step">
                        <div className="step-num-wrap">
                            <span className="step-num">02</span>
                        </div>
                        <div className="step-title">Core Implementation</div>
                        <div className="step-desc">Building modular, testable components. Integrating complex APIs, camera APIs, CoreBluetooth, and local databases like Realm.</div>
                    </div>
                    <div className="process-step">
                        <div className="step-num-wrap">
                            <span className="step-num">03</span>
                        </div>
                        <div className="step-title">Performance Profiling</div>
                        <div className="step-desc">Using React Native Debugger or Xcode Instruments to hunt down memory leaks, optimize list rendering, and hit locked 60/120fps.</div>
                    </div>
                    <div className="process-step">
                        <div className="step-num-wrap">
                            <span className="step-num">04</span>
                        </div>
                        <div className="step-title">App Store Handoff</div>
                        <div className="step-desc">Handling certificates, provisioning profiles, fastlane deployment, ASO metadata optimization, and TestFlight beta cycles.</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
