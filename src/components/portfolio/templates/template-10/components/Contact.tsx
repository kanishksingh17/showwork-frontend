import React from 'react';

export const Contact: React.FC = () => {
    return (
        <section className="section" id="contact">
            <div className="section-inner fade-in-up">
                <div className="contact-block">
                    {/* Background glows */}
                    <div className="hero-bands">
                        <div className="band" style={{ top: '20%', height: '40px', opacity: 0.1, filter: 'blur(10px)' }} />
                        <div className="band" style={{ top: '60%', height: '80px', opacity: 0.05, filter: 'blur(20px)' }} />
                    </div>
                    <div className="hero-glow" />

                    <div className="contact-left">
                        <h2 className="contact-title">Let's build<br />something fast.</h2>
                        <p className="contact-sub">Currently accepting select freelance projects and full-time opportunities. If you're building a mobile app that needs to scale, let's talk.</p>
                    </div>

                    <div className="contact-actions">
                        <div className="contact-email-badge">
                            <div className="contact-email-label">Direct Email</div>
                            <div className="contact-email-val">hello@marcuschen.dev</div>
                        </div>
                        <a href="mailto:hello@marcuschen.dev" className="btn-contact-primary">
                            Send Message
                            <span className="arrow-bg">↗</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
