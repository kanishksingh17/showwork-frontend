import React, { useEffect } from 'react';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { EditableBlock } from '../../editor/EditableBlock';

export const Template15Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects, sections }) => {
  useEffect(() => {
    // Add Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add Material Icons
    const materialLink = document.createElement('link');
    materialLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined';
    materialLink.rel = 'stylesheet';
    document.head.appendChild(materialLink);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(materialLink);
    };
  }, []);

  // ── Bind to Redux Sections for real-time editing ───────────────────────
  const aboutSection = sections.find(s => s.id === 'about')?.customData || {};
  const resumeSection = sections.find(s => s.id === 'resume')?.customData || {};
  const skillsSection = sections.find(s => s.id === 'skills')?.customData || {};

  const name = aboutSection.name || userData?.name || 'Marcus Wei';
  const firstName = name.split(' ')[0];
  const avatar = userData?.avatar || userData?.profileImage || null;
  const role = aboutSection.headline || userData?.role || 'Application Security Engineer';
  const bio = aboutSection.bio || userData?.tagline || userData?.bio || 'Protecting software and APIs with OWASP Top 10 expertise and Secure SDLC integration.';
  const email = aboutSection.email || userData?.email || 'marcus@security.dev';

  const metricsFromStore = resumeSection.metrics || [];
  const metrics = {
    vulnerabilities: metricsFromStore.find((m: any) => m.label.toLowerCase().includes('vulnerab'))?.value || '400',
    audits: metricsFromStore.find((m: any) => m.label.toLowerCase().includes('audit'))?.value || '60',
    remediation: metricsFromStore.find((m: any) => m.label.toLowerCase().includes('remediation'))?.value || '98',
    critical: metricsFromStore.find((m: any) => m.label.toLowerCase().includes('critical'))?.value || '0'
  };

  const skills = skillsSection.techSlugs || userData?.skills || ['Penetration Testing', 'API Security', 'Cloud Security', 'Secure Code Review', 'Red Teaming', 'DevSecOps'];

  return (
    <div className="template-15-container">
      <style>{`
        :root {
          --white: #FFFFFF;
          --bg: #F8FAFC;
          --bg2: #F1F5F9;
          --surface: #FFFFFF;
          --border: #E5E7EB;
          --border2: #D1D5DB;
          --text: #0F172A;
          --text2: #1E293B;
          --muted: #64748B;
          --muted2: #94A3B8;
          --green: #22C55E;
          --green-d: #16A34A;
          --green-glow: rgba(34,197,94,0.22);
          --green-glow2: rgba(34,197,94,0.10);
          --green-pale: rgba(34,197,94,0.06);
          --green-border: rgba(34,197,94,0.28);
          --shadow-sm: 0 1px 3px rgba(15,23,42,0.05), 0 1px 2px rgba(15,23,42,0.04);
          --shadow: 0 4px 16px rgba(15,23,42,0.06), 0 2px 6px rgba(15,23,42,0.04);
          --shadow-lg: 0 16px 48px rgba(15,23,42,0.08), 0 6px 20px rgba(15,23,42,0.05);
          --shadow-green: 0 8px 40px rgba(34,197,94,0.25), 0 2px 12px rgba(34,197,94,0.15);
          --sans: 'DM Sans', system-ui, sans-serif;
          --display: 'Syne', sans-serif;
          --mono: 'DM Mono', monospace;
          --r: 12px;
        }

        .template-15-container {
          background: var(--white);
          color: var(--text);
          font-family: var(--sans);
          font-size: 15px;
          line-height: 1.6;
          overflow-x: hidden;
          position: relative;
        }

        .template-15-container::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,197,94,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        .template-15-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 0 48px;
        }

        .template-15-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .template-15-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--display);
          font-weight: 800;
          font-size: 20px;
          color: var(--text);
          letter-spacing: -0.5px;
          text-decoration: none;
          transition: transform 0.2s ease;
        }
        .template-15-logo:hover { transform: translateY(-1px); }

        .template-15-nav-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1.5px solid rgba(34,197,94,0.4);
          overflow: hidden;
          background: var(--bg2);
          display: flex; align-items: center; justify-content: center;
          box-shadow: var(--shadow-sm);
        }
        .template-15-nav-avatar img { width: 100%; height: 100%; object-fit: cover; }

        .template-15-nav-links { display: flex; gap: 4px; list-style: none; }
        .template-15-nav-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .template-15-nav-links a:hover { color: var(--text); background: var(--bg); }

        .template-15-hero {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 48px;
          display: grid;
          grid-template-columns: 1fr 480px;
          gap: 60px;
          align-items: center;
          z-index: 1;
          min-height: calc(100vh - 64px);
        }

        .template-15-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(15,23,42,0.05);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text2);
          margin-bottom: 24px;
          letter-spacing: 0.2px;
        }

        .eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 6px var(--green);
          animation: eyebrowPulse 2s ease-in-out infinite;
        }

        @keyframes eyebrowPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .template-15-hero-title {
          font-family: var(--display);
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -2px;
          color: var(--text);
          margin-bottom: 24px;
        }

        .highlight {
          position: relative;
          display: inline-block;
        }
        .highlight::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--green), rgba(34,197,94,0.3));
          border-radius: 2px;
        }

        .template-15-hero-subtitle {
          font-size: 17px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 460px;
        }

        .template-15-btn-primary {
          background: var(--text);
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.25s;
          box-shadow: var(--shadow);
          text-decoration: none;
        }
        .template-15-btn-primary:hover { background: #1e293b; transform: translateY(-2px); box-shadow: var(--shadow-lg); }

        .template-15-btn-secondary {
          background: var(--white);
          color: var(--text);
          border: 1px solid var(--border2);
          padding: 13px 26px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.25s;
          text-decoration: none;
        }
        .template-15-btn-secondary:hover { border-color: var(--green-border); color: var(--green-d); background: var(--green-pale); transform: translateY(-1px); }

        /* Mini stats under CTAs */
        .hero-stats {
          display: flex;
          gap: 32px;
          margin-top: 48px;
        }

        .hstat {
          display: flex;
          flex-direction: column;
        }

        .hstat-num {
          font-family: var(--display);
          font-size: 26px;
          font-weight: 800;
          color: var(--text);
          letter-spacing: -1px;
          line-height: 1;
          margin-bottom: 3px;
        }

        .hstat-num em { color: var(--green); font-style: normal; }

        .hstat-lbl {
          font-size: 12px;
          color: var(--muted);
          font-weight: 500;
        }

        .template-15-shield-visual {
          position: relative;
          width: 420px;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .shield-stage {
          position: relative;
          width: 380px;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .glow-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--green-border);
          animation: ringPulse 3s ease-in-out infinite;
        }
        .glow-ring.r1 { width: 340px; height: 340px; opacity: 0.3; animation-delay: 0s; }
        .glow-ring.r2 { width: 280px; height: 280px; opacity: 0.4; animation-delay: 0.5s; }
        .glow-ring.r3 { width: 220px; height: 220px; opacity: 0.5; animation-delay: 1s; }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }

        .shield-glow {
          position: absolute;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0.12) 40%, transparent 70%);
          filter: blur(24px);
          animation: blobPulse 4s ease-in-out infinite;
        }

        @keyframes blobPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .circuit-traces {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .trace {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent);
          height: 1px;
          animation: traceSlide 3s linear infinite;
        }

        .trace:nth-child(1) { width: 80px; top: 80px; left: 20px; animation-delay: 0s; }
        .trace:nth-child(2) { width: 60px; top: 140px; right: 30px; transform: rotate(90deg); animation-delay: 0.8s; }
        .trace:nth-child(3) { width: 100px; bottom: 120px; left: 10px; animation-delay: 1.6s; }
        .trace:nth-child(4) { width: 70px; bottom: 80px; right: 20px; transform: rotate(-30deg); animation-delay: 2.4s; }

        @keyframes traceSlide {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }

        .shield-svg {
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 20px 40px rgba(34,197,94,0.25));
          animation: shieldFloat 6s ease-in-out infinite;
        }

        @keyframes shieldFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .scan-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(34,197,94,0.8), transparent);
          border-radius: 1px;
          animation: scan 3s ease-in-out infinite;
          z-index: 3;
        }

        @keyframes scan {
          0% { top: 25%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 75%; opacity: 0; }
        }

        .status-chip {
          position: absolute;
          background: white;
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 700;
          display: flex; align-items: center; gap: 8px;
          box-shadow: var(--shadow);
          z-index: 10;
          white-space: nowrap;
        }
        .chip-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 8px var(--green); }
        .status-chip.c1 { top: 40px; right: 0; }
        .status-chip.c2 { bottom: 60px; left: 0; }

        .trust-strip {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--bg);
          padding: 32px 0;
          z-index: 10;
          position: relative;
        }

        .trust-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          display: flex;
          align-items: center;
          gap: 48px;
        }

        .trust-label { font-size: 13px; font-weight: 700; color: var(--text); min-width: 140px; }
        .trust-logos { display: flex; flex-wrap: wrap; gap: 10px; }
        .trust-badge {
          background: white; border: 1px solid var(--border); border-radius: 8px;
          padding: 8px 16px; font-size: 12px; font-weight: 700; color: var(--text2);
          display: flex; align-items: center; gap: 6px; transition: all 0.2s;
        }
        .trust-badge:hover { border-color: var(--green-border); transform: translateY(-2px); box-shadow: var(--shadow-sm); }

        .section-padding { padding: 100px 48px; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-eyebrow { font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--green-d); letter-spacing: 1px; margin-bottom: 12px; display: block; }
        .section-title { font-family: var(--display); font-size: 40px; font-weight: 800; letter-spacing: -1px; margin-bottom: 20px; }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .metric-card {
          background: white; border: 1px solid var(--border); border-radius: 16px; padding: 32px;
          text-align: center; box-shadow: var(--shadow-sm); transition: all 0.3s;
        }
        .metric-card:hover { transform: translateY(-4px); border-color: var(--green-border); box-shadow: var(--shadow); }
        .metric-val { font-family: var(--display); font-size: 48px; font-weight: 800; color: var(--green-d); line-height: 1; margin-bottom: 8px; }
        .metric-lbl { font-size: 13px; color: var(--muted); font-weight: 600; }

        .cases-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .case-card {
          background: white; border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
          box-shadow: var(--shadow-sm); transition: all 0.3s;
        }
        .case-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
        .case-preview { height: 180px; padding: 24px; background: #0F172A; position: relative; }
        .case-terminal { font-family: 'DM Mono', monospace; font-size: 11px; color: #94A3B8; line-height: 1.6; }
        .ct-g { color: #22C55E; } .ct-r { color: #EF4444; } .ct-y { color: #F59E0B; }
        .case-body { padding: 24px; }
        .case-title { font-family: var(--display); font-size: 18px; font-weight: 700; margin-bottom: 12px; }
        .case-desc { font-size: 14px; color: var(--muted); margin-bottom: 20px; line-height: 1.6; }
        .case-stats { display: flex; gap: 20px; }
        .case-stat-item { display: flex; flex-direction: column; }
        .case-stat-val { font-family: var(--display); font-size: 16px; font-weight: 800; color: var(--green-d); }
        .case-stat-lbl { font-size: 10px; color: var(--muted2); font-weight: 600; text-transform: uppercase; }

        .cta-box {
          background: #0F172A; border-radius: 24px; padding: 60px;
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .cta-box::after {
          content: ''; position: absolute; top: -50px; right: -50px; width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%);
        }
        .cta-content h2 { font-family: var(--display); font-size: 36px; font-weight: 800; color: white; margin-bottom: 16px; }
        .cta-content p { color: rgba(255,255,255,0.6); max-width: 440px; }

        .footer { padding: 48px; border-top: 1px solid var(--border); background: var(--bg); }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; color: var(--muted); font-size: 13px; }

        @media (max-width: 1024px) {
          .template-15-hero { grid-template-columns: 1fr; text-align: center; }
          .template-15-hero-subtitle { margin: 0 auto 36px; }
          .template-15-shield-visual { margin: 0 auto; width: 100%; max-width: 380px; }
          .metrics-grid { grid-template-columns: 1fr 1fr; }
          .cases-grid { grid-template-columns: 1fr 1fr; }
          .cta-box { flex-direction: column; text-align: center; gap: 32px; }
        }
        @media (max-width: 640px) {
          .metrics-grid { grid-template-columns: 1fr; }
          .cases-grid { grid-template-columns: 1fr; }
          .template-15-nav { padding: 0 20px; }
          .template-15-nav-links { display: none; }
        }
      `}</style>

      {/* NAVIGATION */}
      <nav className="template-15-nav">
        <div className="template-15-nav-inner">
          <a href="#" className="template-15-logo">
            <div className="template-15-nav-avatar">
              {avatar ? <img src={avatar} alt={name} /> : <span style={{ fontSize: '18px' }}>🛡️</span>}
            </div>
            {firstName}
          </a>
          <ul className="template-15-nav-links">
            <li><a href="#expertise">Expertise</a></li>
            <li><a href="#impact">Impact</a></li>
            <li><a href="#cases">Case Studies</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="hidden sm:block">
            <a href={`mailto:${email}`} className="template-15-btn-primary" style={{ padding: '10px 20px', fontSize: '12px' }}>Request Audit ›</a>
          </div>
        </div>
      </nav>

      <section className="template-15-hero">
        <EditableBlock id="about" className="template-15-hero-content">
          <div className="template-15-hero-eyebrow">
            <span className="eyebrow-dot"></span>
            {role}
          </div>
          <h1 className="template-15-hero-title">
            Securing Your<br />
            Applications <span className="highlight">Before</span><br />
            Attackers Do.
          </h1>
          <p className="template-15-hero-subtitle">
            {bio}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#cases" className="template-15-btn-primary">View Security Research ›</a>
            <a href={`mailto:${email}`} className="template-15-btn-secondary">Contact Specialist →</a>
          </div>

          <div className="hero-stats">
            <div className="hstat">
              <span className="hstat-num"><em>{metrics.vulnerabilities}</em>+</span>
              <span className="hstat-lbl">Vulnerabilities found</span>
            </div>
            <div className="hstat">
              <span className="hstat-num"><em>{metrics.audits}</em>+</span>
              <span className="hstat-lbl">Security audits</span>
            </div>
            <div className="hstat">
              <span className="hstat-num"><em>{metrics.remediation}</em>%</span>
              <span className="hstat-lbl">Remediation rate</span>
            </div>
          </div>
        </EditableBlock>

        <div className="template-15-shield-visual">
          <div className="shield-stage">
            <div className="glow-ring r1"></div>
            <div className="glow-ring r2"></div>
            <div className="glow-ring r3"></div>
            <div className="shield-glow"></div>

            <div className="circuit-traces">
              <div className="trace"></div>
              <div className="trace"></div>
              <div className="trace"></div>
              <div className="trace"></div>
            </div>

            <div className="scan-line"></div>

            <svg className="shield-svg" width="220" height="250" viewBox="0 0 200 230" fill="none">
              <defs>
                <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
              <path d="M100 10 L185 45 L185 110 C185 160 145 200 100 220 C55 200 15 160 15 110 L15 45 Z" fill="url(#shieldGrad)" opacity="0.95" />
              <path d="M100 20 L175 52 L175 110 C175 155 140 190 100 208 C60 190 25 155 25 110 L25 52 Z" fill="rgba(255,255,255,0.15)" />
              <rect x="80" y="105" width="40" height="34" rx="5" fill="white" />
              <path d="M85 105 L85 98 C85 86 115 86 115 98 L115 105" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
              <circle cx="100" cy="122" r="5" fill="#16a34a" />
            </svg>

            <div className="status-chip c1">
              <span className="chip-dot"></span>
              System Hardened
            </div>
            <div className="status-chip c2">
              <span className="chip-dot" style={{ background: '#F59E0B', boxShadow: '0 0 8px #F59E0B' }}></span>
              Threat Scanning...
            </div>
            <div className="status-chip c3" style={{ bottom: '40px', right: '10px' }}>
              <span className="chip-dot"></span>
              {metrics.critical} Critical Issues
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="trust-inner">
          <div className="trust-label">Industry Standards &<br /><span>compliance frameworks</span></div>
          <div className="trust-logos">
            {[
              { icon: '🛡️', text: 'OWASP' },
              { icon: '📋', text: 'ISO 27001' },
              { icon: '✅', text: 'SOC 2 TYPE II' },
              { icon: '🏛️', text: 'NIST CSF' },
              { icon: '☁️', text: 'CSA CCM' },
              { icon: '🔐', text: 'OSCP CERTIFIED' },
              { icon: '🌐', text: 'GDPR READY' },
              { icon: '💳', text: 'PCI DSS' }
            ].map(badge => (
              <div key={badge.text} className="trust-badge">
                <span className="tbicon">{badge.icon}</span> {badge.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* METRICS */}
      <section id="impact" className="section-padding" style={{ background: 'var(--bg)' }}>
        <div className="section-header">
          <span className="section-eyebrow">Proven Security impact</span>
          <h2 className="section-title">Measurable Security Outcomes</h2>
        </div>
        <div className="metrics-grid">
          <EditableBlock id="resume" className="metric-card">
            <div className="metric-val">{metrics.vulnerabilities}+</div>
            <div className="metric-lbl">Vulnerabilities Identified</div>
          </EditableBlock>
          <EditableBlock id="resume" className="metric-card">
            <div className="metric-val">{metrics.audits}+</div>
            <div className="metric-lbl">Deep Audits Completed</div>
          </EditableBlock>
          <EditableBlock id="resume" className="metric-card">
            <div className="metric-val">{metrics.remediation}%</div>
            <div className="metric-lbl">Average Remediation Rate</div>
          </EditableBlock>
          <EditableBlock id="resume" className="metric-card">
            <div className="metric-val">{metrics.critical}</div>
            <div className="metric-lbl">Critical Incidents Post-Hardening</div>
          </EditableBlock>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="expertise-section section-padding">
        <div className="section-inner">
          <div className="expertise-layout">
            <EditableBlock id="skills">
              <div className="section-eyebrow">Core expertise</div>
              <h2 className="section-title">Full-spectrum application security</h2>
              <p className="section-sub">From threat modeling at the design phase to post-deployment hardening — every layer of your application, covered.</p>
              <br /><br />
              <a href={`mailto:${email}`} className="template-15-btn-primary" style={{ fontSize: '13px', padding: '12px 22px' }}>View all services →</a>
            </EditableBlock>

            <div className="expertise-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {(skills.length >= 6 ? skills.slice(0, 6).map((s: string) => ({ icon: '🛡️', title: s, desc: `Specialized focus and methodology in ${s} assessment.` })) : [
                { icon: '🎯', title: 'Web App Penetration Testing', desc: 'OWASP-aligned deep-dive assessments for modern web platforms.' },
                { icon: '🔌', title: 'API Security Assessment', desc: 'Hardening REST, GraphQL, and gRPC endpoints against broken authentication.' },
                { icon: '☁️', title: 'Cloud Security Architecture', desc: 'AWS, Azure, and GCP environment reviews — IAM and posture analysis.' },
                { icon: '🔍', title: 'Secure Code Review', desc: 'Manual and automated SAST/DAST analysis across modern tech stacks.' },
                { icon: '🔴', title: 'Red Team Operations', desc: 'Full-scope adversarial simulations to test detection and response capabilities.' },
                { icon: '🏗️', title: 'Secure SDLC Integration', desc: 'Embedding security gates into CI/CD pipelines — shift-left without slowdown.' }
              ]).map((item: any, i: number) => (
                <EditableBlock key={i} id="skills">
                  <div className="exp-card h-full" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '22px', boxShadow: 'var(--shadow-sm)', transition: 'all 0.22s' }}>
                    <div className="exp-icon" style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>{item.icon}</div>
                    <h3 className="exp-title" style={{ fontFamily: 'var(--display)', fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px', lineHeight: 1.3 }}>{item.title}</h3>
                    <p className="exp-desc" style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </EditableBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="cases" className="section-padding" style={{ background: 'var(--bg)' }}>
        <div className="section-header">
          <span className="section-eyebrow">Recent Research & audits</span>
          <h2 className="section-title">Security Case Studies</h2>
        </div>
        <div className="cases-grid">
          {(projects?.length > 0 ? projects.slice(0, 3) : [
            { title: 'Payment API Auth Bypass', description: 'Discovered a method to bypass OAuth2 scopes in a high-volume payment gateway API.', impact: 'Neutralized $2M Risk' },
            { title: 'SaaS Multi-tenancy Audit', description: 'Deep-dive security review into a B2B SaaS platform revealing cross-tenant data exposure.', impact: '98% Remediation' },
            { title: 'Cloud Infrastructure Hardening', description: 'Comprehensive security posture review for a FinTech infrastructure on AWS.', impact: 'Soc 2 Ready' }
          ]).map((project: any, i: number) => (
            <EditableBlock key={i} id="projects">
              <div className="case-card h-full">
                <div className="case-preview">
                  <div className="case-terminal">
                    <div className="ct-r">▶ VULN_DETECTED: {project.title || 'Untitled Research'}</div>
                    <div className="ct-y">▶ SEVERITY: Critical</div>
                    <div>$ run security-audit --target {(project.title || 'untitled').toLowerCase().replace(/ /g, '-')}</div>
                    <div className="ct-g">✓ Remediation_Verified [100%]</div>
                    <div style={{ marginTop: '20px', fontSize: '9px', opacity: 0.5 }}>- Scanning buffer overflows... OK</div>
                    <div style={{ fontSize: '9px', opacity: 0.5 }}>- Checking IAM policies... FIXED</div>
                  </div>
                </div>
                <div className="case-body">
                  <div className="case-title">{project.title || 'Untitled Security Research'}</div>
                  <p className="case-desc">{project.description || 'No description available for this research.'}</p>
                  <div className="case-stats">
                    <div className="case-stat-item">
                      <span className="case-stat-val">{project.impact || 'Verified Impact'}</span>
                      <span className="case-stat-lbl">Outcome</span>
                    </div>
                    <div className="case-stat-item">
                      <span className="case-stat-val">Critical</span>
                      <span className="case-stat-lbl">Severity</span>
                    </div>
                  </div>
                </div>
              </div>
            </EditableBlock>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="cta-box">
          <div className="cta-content">
            <h2>Harden Your Posture Today.</h2>
            <p>Don't wait for a data breach to prioritize security. Get a professional, manual audit of your critical infrastructure.</p>
          </div>
          <a href={`mailto:${email}`} className="template-15-btn-primary" style={{ background: 'var(--green)', boxShadow: '0 8px 30px rgba(34,197,94,0.4)' }}>Request Security Audit ›</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div style={{ fontWeight: 800, color: 'var(--text)' }}>
            {name}<span style={{ color: 'var(--green-d)' }}>.security</span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Legal</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Secure SDLC</a>
          </div>
          <div>© {new Date().getFullYear()} {name}. Built for Scale.</div>
        </div>
      </footer>
    </div>
  );
};
