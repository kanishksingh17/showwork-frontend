import React from 'react';

export const Apps: React.FC = () => {
    return (
        <section className="section" id="apps" style={{ background: 'white', borderRadius: '20px', margin: '0 0 24px' }}>
            <div className="section-inner">
                <div className="fade-in-up">
                    <div className="section-label">// 02 — Featured Apps</div>
                    <h2 className="section-title">Production<br />Shipped</h2>
                    <p className="section-sub">Apps that live on real devices, scale to millions, and consistently earn top App Store rankings.</p>
                </div>

                <div className="apps-grid">
                    {/* Featured app */}
                    <div className="app-card featured fade-in-up">
                        <div className="app-card-visual app-gradient-1">
                            {/* Phone mockups via SVG */}
                            <svg className="phone-svg left" style={{ '--r': '-10deg', position: 'absolute', left: '15%' } as React.CSSProperties} viewBox="0 0 110 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="106" height="216" rx="18" ry="18" fill="#111" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                                <rect x="8" y="14" width="94" height="192" rx="12" ry="12" fill="#0A0A0F" />
                                {/* Screen content */}
                                <rect x="14" y="22" width="82" height="12" rx="3" fill="rgba(245,114,10,0.8)" />
                                <rect x="14" y="40" width="50" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
                                <rect x="14" y="52" width="60" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
                                {/* Graph bars */}
                                <rect x="14" y="110" width="10" height="50" rx="2" fill="rgba(245,114,10,0.4)" />
                                <rect x="28" y="95" width="10" height="65" rx="2" fill="rgba(245,114,10,0.6)" />
                                <rect x="42" y="80" width="10" height="80" rx="2" fill="rgba(245,114,10,0.8)" />
                                <rect x="56" y="70" width="10" height="90" rx="2" fill="rgba(245,114,10,1)" />
                                <rect x="70" y="85" width="10" height="75" rx="2" fill="rgba(245,114,10,0.7)" />
                                <rect x="84" y="75" width="10" height="85" rx="2" fill="rgba(245,114,10,0.9)" />
                                {/* Bottom nav */}
                                <rect x="14" y="175" width="82" height="24" rx="6" fill="rgba(255,255,255,0.06)" />
                                <circle cx="33" cy="187" r="4" fill="rgba(245,114,10,0.8)" />
                                <circle cx="55" cy="187" r="4" fill="rgba(255,255,255,0.3)" />
                                <circle cx="77" cy="187" r="4" fill="rgba(255,255,255,0.3)" />
                            </svg>

                            <svg className="phone-svg right" style={{ '--r': '10deg', position: 'absolute', right: '15%' } as React.CSSProperties} viewBox="0 0 110 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="106" height="216" rx="18" ry="18" fill="#111" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                                <rect x="8" y="14" width="94" height="192" rx="12" ry="12" fill="#0A0A0F" />
                                <rect x="14" y="22" width="82" height="12" rx="3" fill="rgba(100,200,100,0.7)" />
                                <rect x="14" y="42" width="82" height="40" rx="6" fill="rgba(255,255,255,0.04)" />
                                <circle cx="55" cy="62" r="16" fill="rgba(245,114,10,0.15)" stroke="rgba(245,114,10,0.6)" strokeWidth="1" />
                                <text x="47" y="67" fontFamily="sans-serif" fontSize="12" fill="rgba(245,114,10,0.9)">4.9★</text>
                                <rect x="14" y="96" width="82" height="6" rx="3" fill="rgba(245,114,10,0.7)" />
                                <rect x="14" y="108" width="60" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
                                <rect x="14" y="124" width="82" height="36" rx="6" fill="rgba(255,255,255,0.04)" />
                                <rect x="20" y="130" width="40" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
                                <rect x="20" y="140" width="30" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
                                <rect x="14" y="175" width="82" height="24" rx="6" fill="rgba(255,255,255,0.06)" />
                            </svg>
                        </div>
                        <div className="app-card-info">
                            <div className="app-tag">// iOS + Android · Flutter</div>
                            <div className="app-name">TrackFlow — AI Fitness Coach</div>
                            <div className="app-desc">Cross-platform fitness app with real-time workout analytics, personalized AI coaching, and social challenges. Built with Flutter + Firebase. Zero-frame-drop animations on mid-range hardware.</div>
                            <div className="app-chips">
                                <span className="app-chip">Flutter</span>
                                <span className="app-chip">Firebase ML</span>
                                <span className="app-chip">HealthKit</span>
                                <span className="app-chip">RevenueCat</span>
                                <span className="app-chip">Riverpod</span>
                            </div>
                            <div className="app-metrics-row">
                                <div className="app-metric">
                                    <div className="app-metric-val">2.1M</div>
                                    <div className="app-metric-lbl">Downloads</div>
                                </div>
                                <div className="app-metric">
                                    <div className="app-metric-val">4.9 ★</div>
                                    <div className="app-metric-lbl">App Store</div>
                                </div>
                                <div className="app-metric">
                                    <div className="app-metric-val">68%</div>
                                    <div className="app-metric-lbl">Day-30 Retention</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* App 2 */}
                    <div className="app-card fade-in-up">
                        <div className="app-card-visual app-gradient-2">
                            <svg className="phone-svg center" style={{ '--r': '0deg' } as React.CSSProperties} viewBox="0 0 110 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="106" height="216" rx="18" fill="#111" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                                <rect x="8" y="14" width="94" height="192" rx="12" fill="#0D1B2A" />
                                {/* Map-like UI */}
                                <rect x="14" y="20" width="82" height="50" rx="6" fill="rgba(0,150,200,0.15)" />
                                <circle cx="55" cy="45" r="8" fill="rgba(245,114,10,0.9)" />
                                <circle cx="55" cy="45" r="16" fill="rgba(245,114,10,0.15)" />
                                <rect x="14" y="80" width="82" height="10" rx="5" fill="rgba(245,114,10,0.5)" />
                                <rect x="14" y="96" width="55" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
                                <rect x="14" y="112" width="40" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
                                <rect x="14" y="130" width="82" height="50" rx="8" fill="rgba(255,255,255,0.04)" />
                                <rect x="20" y="138" width="30" height="4" rx="2" fill="rgba(245,114,10,0.6)" />
                                <rect x="20" y="148" width="55" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
                                <rect x="20" y="158" width="40" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
                                <rect x="14" y="188" width="82" height="10" rx="5" fill="rgba(245,114,10,0.8)" />
                            </svg>
                        </div>
                        <div className="app-card-info">
                            <div className="app-tag">// iOS Native · Swift</div>
                            <div className="app-name">NearMe — Local Discovery</div>
                            <div className="app-desc">Location-aware app with offline-first architecture and sub-100ms map rendering. Featured by Apple in Travel category.</div>
                            <div className="app-chips">
                                <span className="app-chip">SwiftUI</span>
                                <span className="app-chip">MapKit</span>
                                <span className="app-chip">CoreLocation</span>
                                <span className="app-chip">Realm</span>
                            </div>
                            <div className="app-metrics-row">
                                <div className="app-metric">
                                    <div className="app-metric-val">840K</div>
                                    <div className="app-metric-lbl">Downloads</div>
                                </div>
                                <div className="app-metric">
                                    <div className="app-metric-val">4.8 ★</div>
                                    <div className="app-metric-lbl">App Store</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* App 3 */}
                    <div className="app-card fade-in-up">
                        <div className="app-card-visual app-gradient-3">
                            <svg className="phone-svg center" style={{ '--r': '0deg' } as React.CSSProperties} viewBox="0 0 110 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="106" height="216" rx="18" fill="#111" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                                <rect x="8" y="14" width="94" height="192" rx="12" fill="#1A0A12" />
                                {/* Finance UI */}
                                <rect x="14" y="20" width="82" height="60" rx="8" fill="rgba(245,114,10,0.1)" stroke="rgba(245,114,10,0.2)" strokeWidth="0.5" />
                                <text x="20" y="42" fontFamily="sans-serif" fontSize="9" fill="rgba(255,255,255,0.4)">BALANCE</text>
                                <text x="20" y="58" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="rgba(255,255,255,0.9)">$24,850</text>
                                {/* Line chart */}
                                <polyline points="14,140 28,125 42,130 56,105 70,115 84,95 96,100" fill="none" stroke="rgba(245,114,10,0.8)" strokeWidth="2" />
                                <polygon points="14,140 28,125 42,130 56,105 70,115 84,95 96,100 96,155 14,155" fill="rgba(245,114,10,0.08)" />
                                <rect x="14" y="166" width="82" height="10" rx="5" fill="rgba(245,114,10,0.7)" />
                                <rect x="14" y="182" width="55" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
                            </svg>
                        </div>
                        <div className="app-card-info">
                            <div className="app-tag">// Android + iOS · React Native</div>
                            <div className="app-name">Vault — Personal Finance</div>
                            <div className="app-desc">End-to-end encrypted finance tracker with biometric auth, real-time bank sync, and zero-crash production record over 18 months.</div>
                            <div className="app-chips">
                                <span className="app-chip">React Native</span>
                                <span className="app-chip">Plaid API</span>
                                <span className="app-chip">Biometrics</span>
                                <span className="app-chip">Keychain</span>
                            </div>
                            <div className="app-metrics-row">
                                <div className="app-metric">
                                    <div className="app-metric-val">0</div>
                                    <div className="app-metric-lbl">Crashes / Month</div>
                                </div>
                                <div className="app-metric">
                                    <div className="app-metric-val">4.8 ★</div>
                                    <div className="app-metric-lbl">Play Store</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
