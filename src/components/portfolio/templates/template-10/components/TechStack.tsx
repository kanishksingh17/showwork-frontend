import React from 'react';
import { SiFlutter, SiSwift, SiKotlin, SiReact, SiFirebase, SiGraphql } from 'react-icons/si';

export const TechStack: React.FC = () => {
    return (
        <section className="section" id="stack">
            <div className="section-inner">
                <div className="fade-in-up">
                    <div className="section-label">// 01 — Tech Stack</div>
                    <h2 className="section-title">Engineering<br />Toolbox</h2>
                    <p className="section-sub">Every tool chosen for a reason. Every decision backed by performance benchmarks and production experience.</p>
                </div>

                <div className="stack-grid fade-in-up grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="stack-card">
                        <div className="stack-icon"><SiFlutter color="#02569B" /></div>
                        <div className="stack-name">Flutter</div>
                        <div className="stack-type">Cross-Platform</div>
                    </div>
                    <div className="stack-card">
                        <div className="stack-icon"><SiSwift color="#F05138" /></div>
                        <div className="stack-name">Swift / SwiftUI</div>
                        <div className="stack-type">iOS Native</div>
                    </div>
                    <div className="stack-card">
                        <div className="stack-icon"><SiKotlin color="#7F52FF" /></div>
                        <div className="stack-name">Kotlin</div>
                        <div className="stack-type">Android Native</div>
                    </div>
                    <div className="stack-card">
                        <div className="stack-icon"><SiReact color="#61DAFB" /></div>
                        <div className="stack-name">React Native</div>
                        <div className="stack-type">Cross-Platform</div>
                    </div>
                    <div className="stack-card">
                        <div className="stack-icon"><SiFirebase color="#FFCA28" /></div>
                        <div className="stack-name">Firebase</div>
                        <div className="stack-type">Backend</div>
                    </div>
                    <div className="stack-card">
                        <div className="stack-icon"><SiGraphql color="#E10098" /></div>
                        <div className="stack-name">REST / GraphQL</div>
                        <div className="stack-type">APIs</div>
                    </div>
                </div>

                <div className="stack-tags fade-in-up">
                    <span className="stack-tag"><span className="dot" />Xcode</span>
                    <span className="stack-tag"><span className="dot" />Android Studio</span>
                    <span className="stack-tag"><span className="dot" />Fastlane CI/CD</span>
                    <span className="stack-tag"><span className="dot" />TestFlight</span>
                    <span className="stack-tag"><span className="dot" />App Store Connect</span>
                    <span className="stack-tag"><span className="dot" />Google Play Console</span>
                    <span className="stack-tag"><span className="dot" />Mixpanel</span>
                    <span className="stack-tag"><span className="dot" />Sentry</span>
                    <span className="stack-tag"><span className="dot" />Figma Handoff</span>
                    <span className="stack-tag"><span className="dot" />SQLite / Realm</span>
                    <span className="stack-tag"><span className="dot" />Push Notifications</span>
                    <span className="stack-tag"><span className="dot" />In-App Purchases</span>
                </div>
            </div>
        </section>
    );
};
