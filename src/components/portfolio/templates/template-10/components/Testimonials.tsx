import React from 'react';

export const Testimonials: React.FC = () => {
    return (
        <section className="section" id="testimonials">
            <div className="section-inner">
                <div className="fade-in-up">
                    <div className="section-label">// 05 — Client Reviews</div>
                    <h2 className="section-title">Word on the<br />Street</h2>
                </div>

                <div className="testi-grid fade-in-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="testi-card">
                        <div className="testi-quote">"</div>
                        <div className="testi-text">Marcus single-handedly rescued our React Native build. We were struggling with massive memory leaks and crashed on old devices. He dropped our crash rate to zero and bumped our App Store rating from 3.2 to 4.8 in 3 months.</div>
                        <div className="testi-author">
                            <div className="testi-avatar">S</div>
                            <div>
                                <div className="testi-name">Sarah Jenkins</div>
                                <div className="testi-role">Director of Mobile, FitTech</div>
                            </div>
                        </div>
                    </div>

                    <div className="testi-card">
                        <div className="testi-quote">"</div>
                        <div className="testi-text">His deep understanding of both iOS and Android natively means he writes Flutter code that actually feels native. The animations are butter smooth, and he handled the complicated CoreBluetooth integrations perfectly.</div>
                        <div className="testi-author">
                            <div className="testi-avatar">D</div>
                            <div>
                                <div className="testi-name">David Chen</div>
                                <div className="testi-role">CTO, NearMe Discovery</div>
                            </div>
                        </div>
                    </div>

                    <div className="testi-card">
                        <div className="testi-quote">"</div>
                        <div className="testi-text">We brought Marcus in when we needed our MVP launched on iOS in 6 weeks. Not only did we hit the deadline, but the Swift codebase he handed over was immaculate—fully documented and beautifully architected.</div>
                        <div className="testi-author">
                            <div className="testi-avatar">M</div>
                            <div>
                                <div className="testi-name">Michael Ross</div>
                                <div className="testi-role">Founder, Vault Finance</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
