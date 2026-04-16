import React, { useEffect } from 'react';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { EditableBlock } from '../../editor/EditableBlock';

export const Template14Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects, sections }) => {
    useEffect(() => {
        // Add Inter font if not present
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    // Bind to Redux Sections for real-time editing
    const aboutSection = sections?.find(s => s.id === 'about')?.customData || {};
    const resumeSection = sections?.find(s => s.id === 'resume')?.customData || {};
    const skillsSection = sections?.find(s => s.id === 'skills')?.customData || {};

    const name = userData?.name || 'Alex Chen';
    const handle = userData?.username || userData?.name?.toLowerCase().replace(/\s+/g, '') || 'alexchen';
    const avatar = userData?.avatar || userData?.profileImage || 'https://github.com/github.png';
    
    // Bio and Tagline from customData or userData
    const headline = aboutSection.headline || userData?.headline || 'Creative Developer';
    const bio = aboutSection.bio || userData?.bio || 'Open Source Maintainer · Building tools for the developer community since 2015';
    const tagline = aboutSection.tagline || userData?.tagline || bio;
    
    const location = aboutSection.location || userData?.location || 'San Francisco, CA';
    const website = aboutSection.website || userData?.website || userData?.portfolioUrl || 'alexchen.dev';
    const twitter = userData?.twitter || (userData?.socialLinks?.twitter as string) || '@alexchen_oss';
    const company = aboutSection.company || userData?.company || 'OSS Foundation / Independent';

    const skills = skillsSection.techSlugs || userData?.skills || ['JavaScript', 'TypeScript', 'Python', 'Go', 'Java'];
    
    // Metrics from resume section customData
    const followers = resumeSection.metrics?.find((m: any) => m.label.toLowerCase().includes('follower'))?.value || '2.4k';
    const following = resumeSection.metrics?.find((m: any) => m.label.toLowerCase().includes('following'))?.value || '318';
    const stars = resumeSection.metrics?.find((m: any) => m.label.toLowerCase().includes('star'))?.value || '15.2k';

    // GitHub Language Colors (simplified)
    const langColors: Record<string, string> = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#3178c6',
        'Python': '#3572A5',
        'Go': '#00ADD8',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Rust': '#dea584',
        'C++': '#f34b7d',
    };

    const getLangColor = (lang: string) => langColors[lang] || '#8b949e';

    return (
        <div className="template-14-container" style={{
            backgroundColor: '#0D1117',
            color: '#C9D1D9',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
            fontSize: '14px',
            lineHeight: '1.5',
            minHeight: '100vh',
        }}>
            <style>{`
        .template-14-container :root {
          --bg: #0D1117;
          --bg2: #010409;
          --surface: #161B22;
          --surface2: #1C2128;
          --surface3: #21262D;
          --border: #30363D;
          --border2: #21262D;
          --text: #E6EDF3;
          --text2: #C9D1D9;
          --muted: #8B949E;
          --muted2: #6E7681;
          --green: #238636;
          --green-light: #2EA043;
          --green-text: #3FB950;
          --green-subtle: rgba(35,134,54,0.15);
          --green-border: rgba(63,185,80,0.3);
          --blue: #58A6FF;
          --blue-subtle: rgba(88,166,255,0.1);
          --blue-border: rgba(88,166,255,0.25);
          --purple: #A371F7;
          --purple-subtle: rgba(163,113,247,0.1);
          --orange: #E3B341;
          --orange-subtle: rgba(227,179,65,0.1);
          --red: #F85149;
          --red-subtle: rgba(248,81,73,0.1);
          --shadow: 0 0 0 1px var(--border);
        }

        .template-14-container a { color: #58A6FF; text-decoration: none; }
        .template-14-container a:hover { text-decoration: underline; }

        .template-14-topbar {
          background: rgba(22, 27, 34, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(48, 54, 61, 0.5);
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .template-14-topbar-left { display: flex; align-items: center; gap: 40px; }
        .template-14-brand-logo {
          color: #FFFFFF;
          font-size: 20px;
          font-weight: 800;
          display: flex; align-items: center; gap: 12px;
          letter-spacing: -0.5px;
          transition: transform 0.2s ease;
        }
        .template-14-brand-logo:hover { transform: translateY(-1px); }
        .template-14-nav-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(88, 166, 255, 0.5);
          overflow: hidden;
          background: #161B22;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .template-14-nav-avatar img { width: 100%; height: 100%; object-fit: cover; }

        .template-14-topbar-nav { display: flex; gap: 12px; list-style: none; }
        .template-14-topbar-nav a {
          color: #E6EDF3;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s ease;
          letter-spacing: 0.2px;
        }
        .template-14-topbar-nav a:hover { color: #FFFFFF; background: rgba(255, 255, 255, 0.1); text-decoration: none; }

        .template-14-topbar-search {
          background: rgba(1, 4, 9, 0.5);
          border: 1px solid #30363D;
          border-radius: 10px;
          padding: 7px 16px;
          color: #C9D1D9;
          font-size: 13px;
          width: 280px;
          transition: all 0.2s ease;
          outline: none;
        }
        .template-14-topbar-search:focus {
          border-color: #58A6FF;
          background: rgba(1, 4, 9, 0.8);
          box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
        }

        .template-14-layout {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 24px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          align-items: start;
        }

        .template-14-avatar-wrap { position: relative; margin-bottom: 16px; }
        .template-14-avatar {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          border: 2px solid #30363D;
          display: flex; align-items: center; justify-content: center;
          font-size: 100px;
          overflow: hidden;
          background: #161B22;
        }
        .template-14-avatar img { width: 100%; height: 100%; object-fit: cover; }

        .template-14-status-badge {
          position: absolute;
          bottom: 10px; right: 10px;
          background: #161B22;
          border: 1px solid #30363D;
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 11px;
          display: flex; align-items: center; gap: 5px;
          color: #C9D1D9;
        }
        .template-14-status-dot { width: 8px; height: 8px; border-radius: 50%; background: #3FB950; }

        .template-14-profile-name { font-size: 24px; font-weight: 600; color: #E6EDF3; margin-bottom: 4px; letter-spacing: -0.3px; }
        .template-14-profile-handle { font-size: 18px; font-weight: 300; color: #8B949E; margin-bottom: 12px; }
        .template-14-profile-tagline { font-size: 13px; color: #C9D1D9; margin-bottom: 14px; line-height: 1.5; }

        .template-14-btn-green {
          display: block; width: 100%; background: #238636; color: white; border: 1px solid rgba(240,246,252,0.1);
          border-radius: 6px; padding: 8px 16px; font-size: 13px; font-weight: 600; cursor: pointer; text-align: center;
          transition: background 0.15s; margin-bottom: 8px; text-decoration: none;
        }
        .template-14-btn-green:hover { background: #2EA043; text-decoration: none; }

        .template-14-btn-outline {
          display: block; width: 100%; background: #21262D; color: #C9D1D9; border: 1px solid #30363D;
          border-radius: 6px; padding: 8px 16px; font-size: 13px; font-weight: 500; cursor: pointer; text-align: center;
          transition: background 0.15s; margin-bottom: 16px; text-decoration: none;
        }
        .template-14-btn-outline:hover { background: #1C2128; text-decoration: none; }

        .template-14-follow-stats { display: flex; gap: 14px; margin-bottom: 16px; font-size: 13px; color: #8B949E; flex-wrap: wrap; }
        .template-14-follow-stats span strong { color: #C9D1D9; font-weight: 600; }
        .template-14-follow-stats a { color: #C9D1D9; font-weight: 600; }
        .template-14-follow-stats a:hover { color: #58A6FF; text-decoration: underline; }

        .template-14-sidebar-divider { border: none; border-top: 1px solid #30363D; margin: 16px 0; }
        .template-14-sidebar-label { font-size: 12px; font-weight: 600; color: #8B949E; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .template-14-sidebar-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #C9D1D9; margin-bottom: 6px; }

        .template-14-profile-tabs { display: flex; border-bottom: 1px solid #30363D; margin-bottom: 24px; overflow-x: auto; }
        .template-14-tab { padding: 10px 16px; font-size: 14px; color: #8B949E; cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.15s; display: flex; align-items: center; gap: 6px; white-space: nowrap; text-decoration: none; }
        .template-14-tab.active { color: #E6EDF3; border-bottom-color: #E3B341; font-weight: 600; }
        .template-14-tab-count { background: #21262D; color: #8B949E; border-radius: 20px; padding: 1px 7px; font-size: 11px; font-weight: 500; }

        .template-14-hero-bio { background: #161B22; border: 1px solid #30363D; border-radius: 6px; padding: 24px; margin-bottom: 20px; }
        .template-14-hero-title { font-size: 28px; font-weight: 700; color: #E6EDF3; letter-spacing: -0.5px; line-height: 1.25; margin-bottom: 12px; }
        .template-14-hero-cta-row { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .template-14-hero-btn-primary { background: #238636; color: white; border: 1px solid rgba(240,246,252,0.1); border-radius: 6px; padding: 8px 18px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .template-14-hero-btn-secondary { background: transparent; color: #C9D1D9; border: 1px solid #30363D; border-radius: 6px; padding: 8px 18px; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 6px; }

        .template-14-metrics-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
        .template-14-metric-card { background: #161B22; border: 1px solid #30363D; border-radius: 6px; padding: 16px; text-align: center; }
        .template-14-metric-val { font-size: 22px; font-weight: 700; color: #E6EDF3; display: block; margin-bottom: 3px; }
        .template-14-metric-val .accent { color: #3FB950; }

        .template-14-pinned-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
        .template-14-repo-card { background: #161B22; border: 1px solid #30363D; border-radius: 6px; padding: 16px; display: flex; flex-direction: column; gap: 8px; min-height: 130px; }
        .template-14-repo-name { color: #58A6FF; font-size: 13px; font-weight: 600; }

        .template-14-contrib-section { background: #161B22; border: 1px solid #30363D; border-radius: 6px; padding: 20px; margin-bottom: 20px; }
        .template-14-contrib-graph { display: flex; gap: 3px; overflow-x: auto; padding-bottom: 4px; }
        .template-14-contrib-week { display: flex; flex-direction: column; gap: 3px; }
        .template-14-contrib-day { width: 11px; height: 11px; border-radius: 2px; background: #1C2128; border: 1px solid rgba(255,255,255,0.03); }
        .template-14-contrib-day.l1 { background: #161b22; }
        .template-14-contrib-day.l2 { background: #003d6e; }
        .template-14-contrib-day.l3 { background: #005fb8; }
        .template-14-contrib-day.l4 { background: #388bfd; }

        .template-14-activity-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        .template-14-activity-card { background: #161B22; border: 1px solid #30363D; border-radius: 6px; padding: 16px; }

        footer.template-14-footer { border-top: 1px solid #30363D; padding: 24px; text-align: center; font-size: 12px; color: #6E7681; margin-top: 40px; background: #0D1117; }

        @media (max-width: 768px) {
          .template-14-layout { grid-template-columns: 1fr; }
          .template-14-avatar { width: 100px; height: 100px; font-size: 40px; }
          .template-14-metrics-strip { grid-template-columns: 1fr 1fr; }
          .template-14-pinned-grid { grid-template-columns: 1fr; }
          .template-14-activity-grid { grid-template-columns: 1fr; }
        }
      `}</style>

            {/* TOPBAR */}
            <header className="template-14-topbar">
                <div className="template-14-topbar-left">
                    <div className="template-14-brand-logo">
                        <div className="template-14-nav-avatar">
                            {avatar ? <img src={avatar} alt={name} /> : <span className="text-[10px]">🧑💻</span>}
                        </div>
                        {name.split(' ')[0]}
                    </div>
                    <ul className="template-14-topbar-nav hidden lg:flex">
                        <li><a href="#overview">Overview</a></li>
                        <li><a href="#repositories">Repositories</a></li>
                        <li><a href="#activity">Activity</a></li>
                        <li><a href="#community">Community</a></li>
                    </ul>
                </div>
                <div className="flex items-center gap-8">
                    <div className="relative hidden md:block">
                        <input className="template-14-topbar-search" type="text" placeholder="Search repositories..." />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] text-[10px] border border-[#30363D] px-1.5 py-0.5 rounded-md">/</span>
                    </div>
                </div>
            </header>

            {/* MAIN LAYOUT */}
            <div className="template-14-layout">
                {/* SIDEBAR */}
                <aside className="template-14-sidebar">
                    <EditableBlock id="about">
                        <div className="template-14-avatar-wrap">
                            <div className="template-14-avatar">
                                {avatar ? <img src={avatar} alt={name} /> : '🧑💻'}
                            </div>
                            <div className="template-14-status-badge">
                                <span className="template-14-status-dot"></span>
                                Open to collaborate
                            </div>
                        </div>

                        <div className="template-14-profile-name">{name}</div>
                        <div className="template-14-profile-handle">{handle}</div>
                        <div className="template-14-profile-tagline">{bio}</div>
                    </EditableBlock>

                    <button className="template-14-btn-green">♥ Sponsor</button>
                    <button className="template-14-btn-outline">👥 Follow</button>

                    <EditableBlock id="resume">
                        <div className="template-14-follow-stats">
                            <span><a>{followers}</a> followers</span>
                            <span>·</span>
                            <span><a>{following}</a> following</span>
                            <span>·</span>
                            <span>⭐ <strong>{stars}</strong></span>
                        </div>
                    </EditableBlock>

                    <hr className="template-14-sidebar-divider" />

                    <EditableBlock id="about">
                        <div className="template-14-sidebar-section">
                            <div className="template-14-sidebar-item"><span>🏢</span> {company}</div>
                            <div className="template-14-sidebar-item"><span>📍</span> {location}</div>
                            <div className="template-14-sidebar-item"><span>🔗</span> <a href={`https://${website}`}>{website}</a></div>
                            {twitter && <div className="template-14-sidebar-item"><span>𝕏</span> <a href="#">{twitter}</a></div>}
                        </div>
                    </EditableBlock>

                    <hr className="template-14-sidebar-divider" />

                    <EditableBlock id="resume">
                        <div className="template-14-sidebar-section">
                            <div className="template-14-sidebar-label">Achievements</div>
                            <div className="flex gap-2 flex-wrap">
                                <span className="text-xl" title="Arctic Code Vault">🧊</span>
                                <span className="text-xl" title="Pull Shark">🦈</span>
                                <span className="text-xl" title="Starstruck">⭐</span>
                                <span className="text-xl" title="Pair Extraordinaire">👥</span>
                                <span className="text-xl" title="YOLO">🎉</span>
                            </div>
                        </div>
                    </EditableBlock>

                    <hr className="template-14-sidebar-divider" />

                    <EditableBlock id="skills">
                        <div className="template-14-sidebar-section">
                            <div className="template-14-sidebar-label">Primary Languages</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {skills.map((skill: string) => (
                                    <span key={skill} className="flex items-center gap-1.5 px-2.5 py-1 border border-[#30363D] rounded-full text-[11px] bg-[#1C2128]">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLangColor(skill) }}></span>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </EditableBlock>
                </aside>

                {/* MAIN */}
                <main className="template-14-main">
                    {/* TABS */}
                    <nav className="template-14-profile-tabs">
                        <a className="template-14-tab active">📋 Overview</a>
                        <a className="template-14-tab">📁 Repositories <span className="template-14-tab-count">{projects?.length || 0}</span></a>
                        <a className="template-14-tab">📦 Projects</a>
                        <a className="template-14-tab">📦 Packages</a>
                        <a className="template-14-tab">⭐ Stars</a>
                    </nav>

                    {/* HERO BIO */}
                    <EditableBlock id="about" className="template-14-hero-bio">
                        <div className="text-xs text-[#8B949E] mb-1">Hi, I me {name.split(' ')[0]} 👋</div>
                        <h1 className="template-14-hero-title">{headline}</h1>

                        <div className="template-14-hero-cta-row">
                            <button className="template-14-hero-btn-primary">📁 View Repositories</button>
                            <button className="template-14-hero-btn-secondary">♥ Sponsor on GitHub</button>
                            <button className="template-14-hero-btn-secondary">📄 Read My Blog</button>
                        </div>

                        <div className="text-sm leading-relaxed text-[#8B949E] border-t border-[#21262D] pt-4">
                            <p>{tagline}</p>
                        </div>
                    </EditableBlock>

                    {/* METRICS */}
                    <EditableBlock id="resume" className="template-14-metrics-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                        {(resumeSection.metrics || [
                            { label: 'Stars across repos', value: stars },
                            { label: 'Weekly downloads', value: '1.2M' },
                            { label: 'Issues resolved', value: '3k+' },
                            { label: 'Contributors', value: '200+' }
                        ]).slice(0, 4).map((metric: any, idx: number) => (
                            <div key={idx} className="template-14-metric-card">
                                <span className="template-14-metric-val"><span className="accent">{metric.value}</span></span>
                                <span className="text-[11px] text-[#8B949E]">{metric.label}</span>
                            </div>
                        ))}
                    </EditableBlock>

                    {/* PINNED REPOS */}
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-[#E6EDF3]">📌 Pinned Repositories</h2>
                        <a className="text-xs">Customize pins</a>
                    </div>
                    <div className="template-14-pinned-grid">
                        {(projects?.length > 0 ? projects : [
                            { title: 'vite-plugin-bundle', description: 'Zero-config Vite plugin for optimized bundle splitting.', stars: '4.2k', tech: 'TypeScript' },
                            { title: 'fetcher', description: 'A tiny, typed HTTP client for the browser and Node.js.', stars: '3.8k', tech: 'TypeScript' },
                            { title: 'schema-forge', description: 'Runtime schema validation with TypeScript inference.', stars: '5.1k', tech: 'TypeScript' },
                            { title: 'clide', description: 'Ergonomic CLI framework for Node.js with help generation.', stars: '1.9k', tech: 'JavaScript' }
                        ]).slice(0, 4).map((project: any, i: number) => (
                            <EditableBlock key={i} id="projects">
                                <div className="template-14-repo-card h-full">
                                    <div className="flex items-center gap-2">
                                        <span className="material-icons-outlined text-[#8B949E]" style={{ fontSize: '14px' }}>inventory_2</span>
                                        <span className="template-14-repo-name truncate">{project.title}</span>
                                    </div>
                                    <p className="text-xs text-[#8B949E] line-clamp-2 flex-grow">{project.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-[#8B949E] mt-auto">
                                        <span className="flex items-center gap-1">
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getLangColor(project.tech || 'TypeScript') }}></span>
                                            {project.tech || 'TypeScript'}
                                        </span>
                                        <span className="flex items-center gap-1">⭐ {project.stars || '0'}</span>
                                    </div>
                                </div>
                            </EditableBlock>
                        ))}
                    </div>

                    {/* CONTRIBUTION GRAPH */}
                    <EditableBlock id="resume" className="template-14-contrib-section">
                        <div className="flex justify-between items-center mb-4 text-sm text-[#C9D1D9]">
                            <span><span className="font-semibold">2,847 contributions</span> in the last year</span>
                            <a className="text-xs">Contribution settings</a>
                        </div>
                        <div className="template-14-contrib-graph">
                            {Array.from({ length: 52 }).map((_, w) => (
                                <div key={w} className="template-14-contrib-week">
                                    {Array.from({ length: 7 }).map((_, d) => {
                                        const r = Math.random();
                                        let lvl = '';
                                        if (r > 0.3) lvl = 'l1';
                                        if (r > 0.5) lvl = 'l2';
                                        if (r > 0.7) lvl = 'l3';
                                        if (r > 0.85) lvl = 'l4';
                                        return <div key={d} className={`template-14-contrib-day ${lvl}`} />;
                                    })}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end items-center gap-1 mt-2 text-[11px] text-[#8B949E]">
                            Less
                            <div className="template-14-contrib-day" />
                            <div className="template-14-contrib-day l1" />
                            <div className="template-14-contrib-day l2" />
                            <div className="template-14-contrib-day l3" />
                            <div className="template-14-contrib-day l4" />
                            More
                        </div>
                    </EditableBlock>

                    {/* ACTIVITY GRID */}
                    <div className="template-14-activity-grid">
                        <div className="template-14-activity-card">
                            <div className="text-xs font-semibold text-[#E6EDF3] mb-3 flex items-center gap-2">
                                <span className="text-red-500 text-lg">●</span> Recent Issues
                            </div>
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-2 text-xs border-b border-[#21262D] pb-3 last:border-0 last:pb-0">
                                        <span className="text-green-500">🟢</span>
                                        <div>
                                            <div className="text-[#C9D1D9] font-medium">Issue #{100 + i} Support requested</div>
                                            <div className="text-[#6E7681] text-[11px]">opened 2 days ago</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="template-14-activity-card">
                            <div className="text-xs font-semibold text-[#E6EDF3] mb-3 flex items-center gap-2">
                                <span className="text-purple-500 text-lg">◆</span> Pull Requests
                            </div>
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-2 text-xs border-b border-[#21262D] pb-3 last:border-0 last:pb-0">
                                        <span className="text-purple-500">🟣</span>
                                        <div>
                                            <div className="text-[#C9D1D9] font-medium">PR #{200 + i} Optimized memory usage</div>
                                            <div className="text-[#6E7681] text-[11px]">merged yesterday</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="template-14-footer">
                <div className="mb-3 space-x-4">
                    <a className="hover:text-[#58A6FF] transition-colors">Privacy</a>
                    <a className="hover:text-[#58A6FF] transition-colors">Legal</a>
                    <a className="hover:text-[#58A6FF] transition-colors">Contact</a>
                    <a className="hover:text-[#58A6FF] transition-colors">Docs</a>
                </div>
                <div className="font-medium">Built with <span className="text-red-500">❤️</span> by {name} · Open Source Ecosystem</div>
                <div className="mt-1 opacity-50">© {new Date().getFullYear()} · Professional Developer Portfolio</div>
            </footer>
        </div>
    );
};
