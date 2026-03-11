import React, { useEffect, useRef } from 'react';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';

export const Template16Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects }) => {
    const radialRef = useRef<SVGGElement>(null);
    const heroSectionRef = useRef<HTMLElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    const displayName = userData?.name || 'Research Engineer';
    void displayName; // referenced via userData fallbacks below
    const role = userData?.role || 'ML Research Engineer';
    const bio =
        userData?.tagline ||
        userData?.bio ||
        'ML research engineer focused on reproducing, scaling, and deploying state-of-the-art models. Founded on rigorous empiricism, led by measurable results.';
    const email = userData?.email || 'research@ml.dev';
    const location = userData?.location || 'Bengaluru, IN';

    const papersReproduced = userData?.metadata?.papersReproduced || '12';
    const modelsDeployed = userData?.metadata?.modelsDeployed || '4';
    const reproductionAccuracy = userData?.metadata?.reproductionAccuracy || '95';
    const conferenceSubmissions = userData?.metadata?.conferenceSubmissions || '3';

    const skills: string[] = userData?.skills || ['PyTorch', 'TensorFlow', 'JAX', 'Hugging Face', 'CUDA'];

    const stackIcons: Record<string, string> = {
        PyTorch: '🔥', TensorFlow: '🌊', JAX: '⚡', 'Hugging Face': '🤗', CUDA: '🖥️',
        Python: '🐍', NumPy: '🔢', Scikit: '📊', MLflow: '📈', WandB: '🏃',
    };

    useEffect(() => {
        // Load Archivo font
        const link = document.createElement('link');
        link.href =
            'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;900&family=Archivo+Narrow:wght@400;500&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        return () => {
            try { document.head.removeChild(link); } catch { }
        };
    }, []);

    // ── Radial builder ──────────────────────────────────────────────────────────
    function buildRadial(
        g: SVGGElement,
        cx: number,
        cy: number,
        count: number,
        minR: number,
        maxR: number,
        accentEvery: number,
        accentColor: string
    ) {
        if (!g) return;
        g.innerHTML = '';
        const spokes: any[] = [];

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
            const len = minR + Math.random() * (maxR - minR);
            const x2 = cx + Math.cos(angle) * len;
            const y2 = cy + Math.sin(angle) * len;
            const isAccent = i % accentEvery === 0;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', String(cx)); line.setAttribute('y1', String(cy));
            line.setAttribute('x2', String(x2)); line.setAttribute('y2', String(y2));
            line.setAttribute('stroke', isAccent ? accentColor : '#C0C0BB');
            line.setAttribute('stroke-width', isAccent ? '0.9' : '0.5');
            line.style.strokeDasharray = String(len);
            line.style.strokeDashoffset = String(len);
            line.style.opacity = String(0.5 + Math.random() * 0.5);
            line.style.transition = `stroke-dashoffset ${0.4 + Math.random() * 0.3}s cubic-bezier(0.4,0,0.2,1)`;
            g.appendChild(line);

            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('cx', String(x2)); dot.setAttribute('cy', String(y2)); dot.setAttribute('r', '1.6');
            dot.setAttribute('fill', isAccent ? accentColor : '#BBBBB5');
            dot.style.opacity = '0';
            dot.style.transition = 'opacity 0.3s ease';
            g.appendChild(dot);

            spokes.push({ line, dot, cx, cy, x2, y2, len, isAccent, accentColor });
        }

        const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center.setAttribute('cx', String(cx)); center.setAttribute('cy', String(cy));
        center.setAttribute('r', '3'); center.setAttribute('fill', accentColor);
        center.style.opacity = '0';
        center.style.transition = 'opacity 0.5s';
        g.appendChild(center);

        return { spokes, center };
    }

    function animateRadial(data: any, baseDelay = 0) {
        if (!data?.spokes) return;
        setTimeout(() => { data.center.style.opacity = '1'; }, baseDelay);
        data.spokes.forEach(({ line, dot }: any, i: number) => {
            const delay = baseDelay + (i / data.spokes.length) * 1400 + Math.random() * 200;
            setTimeout(() => {
                line.style.strokeDashoffset = '0';
                setTimeout(() => { dot.style.opacity = '1'; }, 300);
            }, delay);
        });
    }

    function addBeadPulse(data: any, g: SVGGElement) {
        if (!data?.spokes || !g) return;
        data.spokes.forEach(({ cx, cy, x2, y2, isAccent, accentColor }: any, i: number) => {
            const bead = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bead.setAttribute('r', isAccent ? '2.5' : '1.8');
            bead.setAttribute('fill', isAccent ? accentColor : '#BBBBB5');
            bead.style.opacity = '0';
            g.appendChild(bead);

            const period = 2000 + Math.random() * 3000;

            function animBead() {
                const start = performance.now();
                const dur = 800 + Math.random() * 400;
                function step(now: number) {
                    const t = Math.min((now - start) / dur, 1);
                    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                    const fadeT = t < 0.1 ? t / 0.1 : t > 0.85 ? (1 - t) / 0.15 : 1;
                    bead.setAttribute('cx', String(cx + (x2 - cx) * ease));
                    bead.setAttribute('cy', String(cy + (y2 - cy) * ease));
                    bead.style.opacity = String(fadeT * (isAccent ? 0.9 : 0.5));
                    if (t < 1) requestAnimationFrame(step);
                    else { bead.style.opacity = '0'; setTimeout(animBead, period); }
                }
                requestAnimationFrame(step);
            }

            setTimeout(animBead, 2000 + i * 40);
        });
    }

    useEffect(() => {
        // Clear any prior spokes so Strict Mode double-run is clean
        if (radialRef.current) radialRef.current.innerHTML = '';

        const timer = setTimeout(() => {
            if (!radialRef.current) return;
            const d = buildRadial(radialRef.current, 640, 360, 120, 80, 340, 7, '#5B8DB8');
            animateRadial(d, 300);
            const beadTimer = setTimeout(() => {
                if (radialRef.current) addBeadPulse(d, radialRef.current);
            }, 2000);
            return () => clearTimeout(beadTimer);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    // ── Mouse parallax on hero radial ──────────────────────────────────────────
    useEffect(() => {
        const hero = heroSectionRef.current;
        const g = radialRef.current;
        if (!hero || !g) return;

        let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
        let rafId = 0;

        const onMove = (e: MouseEvent) => {
            const r = hero.getBoundingClientRect();
            mouseX = ((e.clientX - r.left) / r.width - 0.5) * 18;
            mouseY = ((e.clientY - r.top) / r.height - 0.5) * 10;
        };
        const onLeave = () => { mouseX = 0; mouseY = 0; };

        const lerp = () => {
            curX += (mouseX - curX) * 0.06;
            curY += (mouseY - curY) * 0.06;
            g.style.transform = `translate(${curX}px,${curY}px)`;
            rafId = requestAnimationFrame(lerp);
        };

        hero.addEventListener('mousemove', onMove);
        hero.addEventListener('mouseleave', onLeave);
        rafId = requestAnimationFrame(lerp);

        return () => {
            hero.removeEventListener('mousemove', onMove);
            hero.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // ── Scroll reveal observer ──────────────────────────────────────────────────
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('t16-visible'); observer.unobserve(e.target); } }),
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        document.querySelectorAll('.t16-reveal').forEach((el) => observer.observe(el));

        // Count-up for metrics
        const countObs = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    const el = e.target as HTMLElement;
                    const target = parseInt(el.dataset.target || '0', 10);
                    const suffix = el.dataset.suffix || '';
                    const start = performance.now();
                    const dur = 900;
                    el.classList.add('t16-popped');
                    function step(now: number) {
                        const t = Math.min((now - start) / dur, 1);
                        const ease = 1 - Math.pow(1 - t, 3);
                        el.textContent = Math.round(ease * target) + suffix;
                        if (t < 1) requestAnimationFrame(step);
                        else el.textContent = target + suffix;
                    }
                    requestAnimationFrame(step);
                    countObs.unobserve(el);
                }
            }),
            { threshold: 0.5 }
        );
        document.querySelectorAll('[data-target]').forEach((el) => countObs.observe(el));

        // Value section rotation
        const valObs = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.target.classList.toggle('t16-in-view', e.isIntersecting)),
            { threshold: 0.25 }
        );
        document.querySelectorAll('.t16-value-section').forEach((s) => valObs.observe(s));

        // Contact radial
        const contactEl = document.getElementById('t16-contact');
        const contactG = document.getElementById('t16-contact-radial-g') as unknown as SVGGElement | null;
        let contactAnimated = false;
        const contactObs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !contactAnimated && contactG) {
                contactAnimated = true;
                const d = buildRadial(contactG, 640, 360, 90, 80, 320, 6, '#4ECDB4');
                animateRadial(d, 200);
                setTimeout(() => { if (contactG) addBeadPulse(d, contactG); }, 2200);
            }
        }, { threshold: 0.3 });
        if (contactEl) contactObs.observe(contactEl);

        return () => { observer.disconnect(); countObs.disconnect(); valObs.disconnect(); contactObs.disconnect(); };
    }, []);

    // ── Starburst builder (pure SVG inline) ────────────────────────────────────
    function buildStarburst(
        cx: number, cy: number, count: number, minR: number, maxR: number,
        accentEvery: number, accentColor: string, id: string
    ): React.ReactElement {
        const lines: React.ReactElement[] = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
            const len = minR + (Math.sin(i * 2.4) * 0.5 + 0.5) * (maxR - minR);
            const x2 = cx + Math.cos(angle) * len;
            const y2 = cy + Math.sin(angle) * len;
            const isAccent = i % accentEvery === 0;
            lines.push(
                <line key={i} x1={cx} y1={cy} x2={x2} y2={y2}
                    stroke={isAccent ? accentColor : '#C0C0BB'}
                    strokeWidth={isAccent ? 0.9 : 0.5}
                    opacity={0.5 + (Math.sin(i) * 0.5 + 0.5) * 0.5}
                />
            );
            lines.push(
                <circle key={`d${i}`} cx={x2} cy={y2} r={1.6}
                    fill={isAccent ? accentColor : '#BBBBB5'} opacity={0.8}
                />
            );
        }
        lines.push(<circle key="c" cx={cx} cy={cy} r={3} fill={accentColor} />);
        return (
            <g id={id} style={{ transformOrigin: `${cx}px ${cy}px` }}>
                {lines}
            </g>
        );
    }

    const dispProjects = (projects && projects.length > 0 ? projects : [
        { title: 'Transformer Reproduction', description: 'WMT-14 En→De translation with reproduced Multi-Head Attention. Matched original BLEU score within 0.3 points.', tags: ['NLP', 'TRANSFORMERS'], year: 'ACL 2023', metric: 'BLEU 27.4', code: '#\n# Transformer Reproduction\nclass MultiHeadAttn(nn.Module):\n  d_model = 512\n  n_heads  = 8\n  dropout  = 0.1\n\n# Dataset: WMT-14 En→De\nBLEU: 27.4  F1: 0.891' },
        { title: 'DDPM Diffusion Model', description: 'Full UNet + Attention DDPM Implementation over 1000 diffusion steps achieving FID 3.17 on CIFAR-10 benchmark.', tags: ['GENERATIVE', 'DIFFUSION'], year: '2024', metric: 'FID 3.17', code: '# DDPM Implementation\ndef forward_diffusion(x0, t):\n  return sqrt_alpha * x0\n       + sqrt_one_minus * ε\n\narch: UNet + Attention\nsteps: 1000  FID: 3.17' },
        { title: 'RLHF Pipeline (LLaMA)', description: 'Full SFT → Reward Model → PPO pipeline built on LLaMA-7B. Achieved 67% human preference win rate over baseline.', tags: ['ALIGNMENT', 'RLHF'], year: '2024', metric: '94.2% ACC', code: '# RLHF Pipeline\nSFT → Reward Model → PPO\n\nbase: LLaMA-7B\nreward_acc: 94.2%\nwin_rate:   +18.6%\nhuman_pref: ↑ 67%' },
    ]).slice(0, 3);

    const s16css = `
    .t16 { background:#EDECEA; color:#1A1A1A; font-family:'Archivo',sans-serif; font-size:14px; overflow-x:hidden; position:relative; }

    /* Sticky navbar — replaces the four corner chrome elements */
    .t16-navbar {
      position:sticky; top:0; z-index:1000;
      display:flex; align-items:center; justify-content:space-between;
      padding:10px 18px;
      background:rgba(237,236,234,0.88); backdrop-filter:blur(10px);
      border-bottom:1px solid #C8C7C3;
      height:48px;
    }
    .t16-navbar-left  { display:flex; align-items:center; gap:14px; }
    .t16-navbar-right { display:flex; align-items:center; gap:14px; }
    .t16-spin { font-size:20px; font-weight:900; line-height:1; animation:t16spin 20s linear infinite; transform-origin:center; pointer-events:none; display:block; }
    @keyframes t16spin { to { transform:rotate(360deg); } }
    .t16-clock { font-size:10px; font-family:'Archivo Narrow',sans-serif; color:#7A7A7A; letter-spacing:0.5px; }
    .t16-pill { display:inline-flex; align-items:center; gap:6px; background:#2D2D2D; color:#F0EFEB; padding:6px 13px; border-radius:4px; font-size:10px; font-family:'Archivo Narrow',sans-serif; letter-spacing:1px; text-transform:uppercase; cursor:pointer; transition:opacity 0.2s; border:none; font-weight:500; text-decoration:none; }
    .t16-pill:hover { opacity:0.8; }

    /* Sections */
    .t16-section { position:relative; width:100%; min-height:100vh; display:flex; flex-direction:column; justify-content:center; overflow:hidden; }

    /* Hero */
    #t16-hero { background:#EDECEA; padding:0; }
    .t16-hero-title { position:absolute; top:40%; left:32px; transform:translateY(-50%); font-size:clamp(28px,3.5vw,48px); font-weight:900; line-height:1.15; letter-spacing:-0.5px; max-width:320px; animation:t16fadeInL 1s ease both; }
    .t16-hero-loc { position:absolute; top:40%; right:32px; transform:translateY(-50%); text-align:right; font-size:clamp(24px,3vw,40px); font-weight:900; line-height:1.15; letter-spacing:-0.5px; animation:t16fadeInR 1s ease both; }
    @keyframes t16fadeInL { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes t16fadeInR { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }

    /* Nav nodes — prominent pills that don't overlap the title text */
    .t16-nav-node {
      position:absolute; pointer-events:all;
      display:inline-flex; align-items:center;
      font-size:10px; font-family:'Archivo Narrow',sans-serif;
      letter-spacing:1.5px; text-transform:uppercase;
      color:#5B8DB8; text-decoration:none; cursor:pointer;
      padding:5px 10px; white-space:nowrap;
      transform:translate(-50%,-50%);
      transition:color 0.2s, letter-spacing 0.25s, background 0.2s;
      user-select:none; background:rgba(237,236,234,0.82);
      backdrop-filter:blur(4px);
      border:1px solid rgba(91,141,184,0.25);
      border-radius:3px;
      font-weight:600;
    }
    .t16-nav-node::before { content:'['; margin-right:3px; opacity:0.55; transition:opacity 0.2s; }
    .t16-nav-node::after  { content:']'; margin-left:3px;  opacity:0.55; transition:opacity 0.2s; }
    .t16-nav-node:hover { color:#1A1A1A; letter-spacing:2.5px; background:rgba(237,236,234,0.98); }
    .t16-nav-node:hover::before, .t16-nav-node:hover::after { opacity:1; color:#5B8DB8; }
    .t16-nav-nodes { position:absolute; inset:0; pointer-events:none; }

    /* About */
    #t16-about { min-height:auto; background:#EDECEA; display:block; }
    .t16-about-upper { padding:80px 32px 48px; display:grid; grid-template-columns:200px 1fr; align-items:start; gap:32px; }
    .t16-section-index { font-size:11px; font-family:'Archivo Narrow',sans-serif; color:#5B8DB8; letter-spacing:1px; text-transform:uppercase; padding-top:4px; }
    .t16-about-label { font-size:11px; font-family:'Archivo Narrow',sans-serif; color:#5B8DB8; letter-spacing:1px; text-transform:uppercase; margin-bottom:12px; }
    .t16-about-text { font-size:clamp(16px,2vw,24px); font-weight:700; line-height:1.4; max-width:760px; }
    .t16-works-label-row { padding:0 32px 12px; display:grid; grid-template-columns:200px 1fr; align-items:center; }
    .t16-works-label { grid-column:2; font-size:11px; font-family:'Archivo Narrow',sans-serif; letter-spacing:1px; text-transform:uppercase; color:#5B8DB8; }

    /* Project grid */
    .t16-project-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid #C8C7C3; }
    .t16-project-card { position:relative; background:#E2E1DD; border-right:1px solid #C8C7C3; min-height:320px; display:flex; flex-direction:column; overflow:hidden; cursor:pointer; transition:background 0.25s, transform 0.25s; }
    .t16-project-card:last-child { border-right:none; }
    .t16-project-card:hover { background:#D8D7D3; transform:translateY(-4px); }
    .t16-card-meta { padding:12px 16px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #C8C7C3; }
    .t16-card-tag { font-size:10px; font-family:'Archivo Narrow',sans-serif; letter-spacing:1px; text-transform:uppercase; color:#1A1A1A; }
    .t16-card-year { font-size:10px; font-family:'Archivo Narrow',sans-serif; color:#7A7A7A; letter-spacing:0.5px; }
    .t16-card-preview { flex:1; display:flex; align-items:center; justify-content:center; padding:20px; }
    .t16-preview-dark { background:#12141A; border-radius:0; padding:16px; width:100%; font-family:'Courier New',monospace; font-size:10px; line-height:1.8; color:#aaa; }
    .t16-kw{color:#569cd6} .t16-fn{color:#4ec9b0} .t16-str{color:#ce9178} .t16-cmt{color:#608b4e} .t16-num{color:#b5cea8}
    .t16-metric-line { margin-top:10px; color:#4ec9b0; font-size:16px; font-weight:bold; font-family:'Archivo',sans-serif; }
    .t16-view-more { border-top:1px solid #C8C7C3; background:#E2E1DD; padding:10px 32px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; transition:background 0.2s; }
    .t16-view-more:hover { background:#C8C7C3; }
    .t16-view-more span { font-size:10px; font-family:'Archivo Narrow',sans-serif; letter-spacing:1px; text-transform:uppercase; color:#7A7A7A; }
    .t16-view-more .t16-vmr { color:#1A1A1A; }

    /* Statement */
    #t16-statement { background:#EDECEA; padding:80px 32px; min-height:100vh; display:flex; flex-direction:column; justify-content:space-between; }
    .t16-statement-text { font-size:clamp(28px,4.5vw,64px); font-weight:900; line-height:1.1; letter-spacing:-1px; max-width:1200px; }
    .t16-dim { color:#7A7A7A; }
    .t16-stat-block { display:flex; flex-direction:column; align-items:center; padding-bottom:60px; }
    .t16-stat-num { font-size:clamp(80px,14vw,180px); font-weight:900; line-height:0.9; letter-spacing:-4px; color:#1A1A1A; transition:none; }
    .t16-stat-label { font-size:14px; font-family:'Archivo Narrow',sans-serif; color:#7A7A7A; letter-spacing:1px; text-transform:uppercase; margin-top:8px; }

    /* Value sections */
    .t16-value-section { background:#EDECEA; min-height:100vh; display:grid; grid-template-columns:260px 1fr 300px; grid-template-rows:auto 1fr auto; align-items:center; padding:60px 32px; position:relative; gap:0 32px; transition:background 0.3s; }
    .t16-value-section:hover { background:#E8E7E3; }
    .t16-value-index { grid-column:1; grid-row:1; font-size:11px; font-family:'Archivo Narrow',sans-serif; color:#5B8DB8; letter-spacing:1px; text-transform:uppercase; align-self:start; }
    .t16-value-title { grid-column:1; grid-row:2; font-size:clamp(40px,5vw,68px); font-weight:900; line-height:1.0; letter-spacing:-2px; align-self:center; }
    .t16-value-desc { grid-column:3; grid-row:1 / 4; font-size:clamp(15px,1.6vw,20px); font-weight:600; line-height:1.6; color:#7A7A7A; text-align:right; align-self:center; }
    .t16-value-bullets { grid-column:1; grid-row:3; align-self:end; padding-bottom:8px; }
    .t16-value-bullet { display:flex; align-items:flex-start; gap:10px; font-size:12px; font-family:'Archivo Narrow',sans-serif; color:#7A7A7A; letter-spacing:0.3px; margin-bottom:8px; line-height:1.5; }
    .t16-bullet-dot { width:5px; height:5px; border-radius:50%; background:#5B8DB8; flex-shrink:0; margin-top:6px; }
    .t16-starburst-center { grid-column:2; grid-row:1 / 4; display:flex; align-items:center; justify-content:center; pointer-events:none; position:relative; }
    .t16-value-stats { grid-column:3; grid-row:3; display:flex; flex-direction:column; gap:10px; align-self:end; padding-bottom:8px; }
    .t16-stat-chip { background:#E2E1DD; border:1px solid #C8C7C3; border-radius:4px; padding:10px 14px; text-align:right; }
    .t16-stat-chip-num { font-size:22px; font-weight:900; letter-spacing:-1px; color:#1A1A1A; display:block; }
    .t16-stat-chip-lbl { font-size:10px; font-family:'Archivo Narrow',sans-serif; color:#7A7A7A; letter-spacing:0.5px; text-transform:uppercase; }

    /* Starburst animation */
    .t16-sb1 { animation:t16slowSpin 28s linear infinite; transform-origin:170px 170px; animation-play-state:paused; }
    .t16-sb2 { animation:t16slowSpinR 22s linear infinite; transform-origin:170px 170px; animation-play-state:paused; }
    .t16-sb3 { animation:t16slowSpin 34s linear infinite; transform-origin:170px 170px; animation-play-state:paused; }
    @keyframes t16slowSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes t16slowSpinR { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
    .t16-value-section.t16-in-view .t16-sb1,
    .t16-value-section.t16-in-view .t16-sb2,
    .t16-value-section.t16-in-view .t16-sb3 { animation-play-state:running; }

    /* Metrics */
    #t16-metrics { background:#EDECEA; min-height:100vh; padding:80px 32px; display:flex; flex-direction:column; justify-content:space-between; }
    .t16-metrics-statement { font-size:clamp(24px,3.5vw,52px); font-weight:900; line-height:1.15; letter-spacing:-1px; max-width:1100px; }
    .t16-metrics-row { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid #C8C7C3; margin-top:40px; }
    .t16-metric-cell { padding:32px 24px; border-right:1px solid #C8C7C3; }
    .t16-metric-cell:last-child { border-right:none; }
    .t16-metric-big { font-size:clamp(48px,6vw,84px); font-weight:900; letter-spacing:-3px; line-height:0.9; margin-bottom:10px; }
    .t16-metric-caption { font-size:12px; font-family:'Archivo Narrow',sans-serif; color:#7A7A7A; letter-spacing:0.5px; line-height:1.5; }
    @keyframes t16metricPop { 0%{transform:scale(0.85);opacity:0} 60%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
    .t16-popped { animation:t16metricPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }

    /* Stack */
    #t16-stack { background:#EDECEA; min-height:60vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:80px 32px; text-align:center; }
    .t16-stack-heading { font-size:clamp(24px,3vw,40px); font-weight:900; line-height:1.3; letter-spacing:-0.5px; margin-bottom:60px; }
    .t16-stack-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:1px; border:1px solid #C8C7C3; background:#C8C7C3; width:100%; max-width:900px; }
    .t16-stack-cell { background:#EDECEA; padding:28px 16px; display:flex; flex-direction:column; align-items:center; gap:10px; cursor:default; transition:background 0.2s, transform 0.2s; }
    .t16-stack-cell:hover { background:#D8D7D3; transform:translateY(-3px); }
    .t16-stack-icon { font-size:28px; line-height:1; }
    .t16-stack-name { font-size:10px; font-family:'Archivo Narrow',sans-serif; letter-spacing:1px; text-transform:uppercase; color:#7A7A7A; }

    /* Contact */
    #t16-contact { background:#EDECEA; min-height:100vh; display:flex; align-items:center; justify-content:center; position:relative; padding:60px 32px; }
    .t16-contact-side-l { position:absolute; left:32px; bottom:50%; transform:translateY(50%); font-size:clamp(20px,2.5vw,32px); font-weight:900; color:#1A1A1A; cursor:pointer; }
    .t16-contact-side-r { position:absolute; right:32px; bottom:50%; transform:translateY(50%); font-size:clamp(20px,2.5vw,32px); font-weight:900; color:#7A7A7A; cursor:pointer; }
    .t16-contact-card { background:#1C1C1C; color:white; width:280px; padding:28px 24px; position:relative; z-index:2; cursor:pointer; transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s; }
    .t16-contact-card:hover { transform:scale(1.03) translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,0.25); }
    .t16-contact-card-title { font-size:18px; font-weight:900; line-height:1.2; margin-bottom:20px; }
    .t16-contact-card-sub { font-size:9px; font-family:'Archivo Narrow',sans-serif; letter-spacing:1px; text-transform:uppercase; color:#888; margin-bottom:16px; }
    .t16-contact-card-btn { display:flex; align-items:center; justify-content:space-between; background:#5B8DB8; padding:10px 14px; font-size:9px; font-family:'Archivo Narrow',sans-serif; letter-spacing:1px; text-transform:uppercase; cursor:pointer; transition:opacity 0.2s; text-decoration:none; color:white; }
    .t16-contact-card-btn:hover { opacity:0.85; }
    .t16-contact-starburst { margin:16px 0; display:flex; align-items:center; justify-content:center; }
    .t16-contact-bottom { position:absolute; bottom:24px; left:50%; transform:translateX(-50%); font-size:10px; font-family:'Archivo Narrow',sans-serif; letter-spacing:1px; text-transform:uppercase; color:#7A7A7A; }

    /* Reveals */
    .t16-reveal { opacity:0; transform:translateY(28px); transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
    .t16-reveal.t16-visible { opacity:1; transform:translateY(0); }
    .t16-d1 { transition-delay:0.1s; }
    .t16-d2 { transition-delay:0.2s; }
    .t16-d3 { transition-delay:0.32s; }
    .t16-d4 { transition-delay:0.46s; }

    /* Menu overlay — scoped inside the .t16 container */
    @keyframes t16fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    .t16-menu-overlay {
      position:absolute;
      left:0; right:0;
      height:100vh;
      /* top is set via JS to match current scroll offset */
      background:rgba(28,28,28,0.97); z-index:2000;
      display:flex; flex-direction:column;
      align-items:center; justify-content:center; gap:24px;
      animation:t16fadeUp 0.3s ease both;
    }

    /* Responsive */
    @media(max-width:1024px){
      .t16-project-grid { grid-template-columns:1fr 1fr; }
      .t16-metrics-row { grid-template-columns:1fr 1fr; }
      .t16-value-section { grid-template-columns:1fr; }
      .t16-stack-grid { grid-template-columns:repeat(3,1fr); }
    }
    @media(max-width:640px){
      .t16-project-grid { grid-template-columns:1fr; }
      .t16-metrics-row { grid-template-columns:1fr 1fr; }
    }
  `;

    function handleMenu() {
        const existing = document.getElementById('t16-menu-overlay');
        if (existing) { existing.remove(); return; }
        const overlay = document.createElement('div');
        overlay.id = 't16-menu-overlay';
        overlay.className = 't16-menu-overlay';
        // Position the overlay over the current viewport, not the whole document
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        overlay.style.top = scrollTop + 'px';
        const sections = [
            ['#t16-hero', 'Overview'], ['#t16-about', 'Research'],
            ['#t16-statement', 'Statement'], ['#t16-metrics', 'Metrics'],
            ['#t16-stack', 'Stack'], ['#t16-contact', 'Contact'],
        ];
        sections.forEach(([href, label]) => {
            const a = document.createElement('a');
            a.href = href; a.textContent = label;
            a.style.cssText = 'color:#F0EFEB;font-family:Archivo,sans-serif;font-size:clamp(16px,2.5vw,28px);font-weight:900;letter-spacing:-1px;text-decoration:none;opacity:0.5;transition:opacity 0.2s,transform 0.2s;cursor:pointer;';
            a.addEventListener('mouseenter', () => { a.style.opacity = '1'; a.style.transform = 'translateX(12px)'; });
            a.addEventListener('mouseleave', () => { a.style.opacity = '0.5'; a.style.transform = 'translateX(0)'; });
            a.addEventListener('click', () => overlay.remove());
            overlay.appendChild(a);
        });
        const close = document.createElement('button');
        close.textContent = '✕ CLOSE';
        close.style.cssText = 'position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:transparent;color:#7A7A7A;border:none;font-size:11px;letter-spacing:2px;cursor:pointer;font-family:Archivo Narrow,sans-serif;';
        close.onclick = () => overlay.remove();
        overlay.appendChild(close);
        // Append to the .t16 wrapper, not body, so it stays inside the preview container
        const container = wrapRef.current || document.body;
        container.appendChild(overlay);
    }

    // ── Cursor blink CSS ──
    const blinkCss = `@keyframes t16blink { 0%,100%{opacity:1} 50%{opacity:0} } .t16-cursor { display:inline-block; width:6px; height:12px; background:#4ec9b0; margin-left:2px; vertical-align:middle; animation:t16blink 1s step-end infinite; }`;

    return (
        <div className="t16" ref={wrapRef}>
            <style>{s16css + blinkCss}</style>

            {/* ── STICKY NAVBAR ── */}
            <nav className="t16-navbar">
                <div className="t16-navbar-left">
                    <span className="t16-spin" title="ML Research Portfolio">✳</span>
                    <button className="t16-pill" onClick={handleMenu}>MENU</button>
                </div>
                <div className="t16-navbar-right">
                    <span className="t16-clock" id="t16-clock">
                        {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} (GMT+5:30)
                    </span>
                    <a href={`mailto:${email}`} className="t16-pill" style={{ textDecoration: 'none' }}>↳ GET IN TOUCH</a>
                </div>
            </nav>

            {/* ══ SECTION 1 — HERO ══ */}
            <section className="t16-section" id="t16-hero" style={{ minHeight: 'calc(100vh - 48px)' }}>
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
                    <g ref={radialRef}></g>
                </svg>

                <div className="t16-nav-nodes">
                    {([
                        { label: 'PAPERS', href: '#t16-about', x: 50, y: 22 },
                        { label: 'OVERVIEW', href: '#t16-about', x: 33, y: 33 },
                        { label: 'MODELS', href: '#t16-statement', x: 67, y: 33 },
                        { label: 'DATASETS', href: '#t16-stack', x: 33, y: 67 },
                        { label: 'RESULTS', href: '#t16-contact', x: 67, y: 67 },
                        { label: 'EXPERIMENTS', href: '#t16-metrics', x: 50, y: 76 },
                    ] as { label: string; href: string; x: number; y: number }[]).map((n) => (
                        <a key={n.label} className="t16-nav-node" href={n.href}
                            style={{ left: `${n.x}%`, top: `${n.y}%` }}
                            onClick={(e) => { e.preventDefault(); document.querySelector(n.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            <span>{n.label}</span>
                        </a>
                    ))}
                </div>

                <div className="t16-hero-title t16-reveal t16-d1">
                    Research-Driven<br />Machine Learning<br />Systems
                </div>
                <div className="t16-hero-loc t16-reveal t16-d2">
                    {location} /<br />Ready to Work
                </div>
            </section>

            {/* ══ SECTION 2 — ABOUT + PROJECT GRID ══ */}
            <section id="t16-about" style={{ background: '#EDECEA', display: 'block' }}>
                <div className="t16-about-upper">
                    <div className="t16-section-index t16-reveal">[ 1 ]</div>
                    <div>
                        <div className="t16-about-label t16-reveal t16-d1">ABOUT</div>
                        <p className="t16-about-text t16-reveal t16-d2">{bio}</p>
                    </div>
                </div>

                <div className="t16-works-label-row">
                    <div />
                    <div className="t16-works-label">[RECENT RESEARCH]</div>
                </div>

                <div className="t16-project-grid">
                    {dispProjects.map((p: any, i: number) => (
                        <div key={i} className={`t16-project-card t16-reveal t16-d${i + 1}`}>
                            <div className="t16-card-meta">
                                <span className="t16-card-tag">{(p.tags || ['ML', 'RESEARCH']).join(' · ')}</span>
                                <span className="t16-card-year">{p.year || '2024'}</span>
                                <span style={{ fontSize: '12px', color: '#7A7A7A' }}>↳</span>
                            </div>
                            <div className="t16-card-preview">
                                <div className="t16-preview-dark">
                                    <span className="t16-cmt"># {p.title || 'Research Project'}</span><br />
                                    <span className="t16-kw">model</span> = <span className="t16-str">"{role}"</span><br />
                                    <span className="t16-cmt">{'# ' + (p.description || '').slice(0, 60) + '...'}</span><br />
                                    <br />
                                    status: <span className="t16-fn">REPRODUCED</span><br />
                                    year: <span className="t16-num">{p.year || '2024'}</span><span className="t16-cursor"></span>
                                    <div className="t16-metric-line">{p.metric || '✓ Verified'}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="t16-view-more">
                    <span>↳</span>
                    <span className="t16-vmr">VIEW MORE RESEARCH</span>
                </div>
            </section>

            {/* ══ SECTION 3 — BIG STATEMENT ══ */}
            <section id="t16-statement" className="t16-section" style={{ padding: '80px 32px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p className="t16-statement-text t16-reveal">
                    I reproduce landmark ML papers and scale
                    them to production. Rigorous benchmarking,
                    clean ablations, and reproducible code.{' '}
                    <span className="t16-dim">Research without deployment
                        is just theory. Theory without rigor
                        isn't research at all.</span>
                </p>

                <div className="t16-stat-block t16-reveal t16-d2">
                    <div className="t16-stat-num" data-target={papersReproduced}>0</div>
                    <div className="t16-stat-label">Papers Reproduced</div>
                </div>
            </section>

            {/* ══ SECTION 4 — RIGOR ══ */}
            <section className="t16-value-section t16-section" id="t16-val-rigor">
                <div className="t16-value-index t16-reveal">[2]</div>
                <div className="t16-value-title t16-reveal t16-d1">Rigor</div>

                <div className="t16-starburst-center">
                    <svg width="380" height="380" viewBox="0 0 340 340" style={{ transition: 'transform 0.3s ease' }}>
                        {buildStarburst(170, 170, 56, 45, 152, 8, '#5B8DB8', 't16-sb1-inner')}
                    </svg>
                </div>

                <div className="t16-value-desc t16-reveal t16-d2">
                    Every experiment is fully reproducible.<br />
                    Every claim survives ablation.<br /><br />
                    No cherry-picked results.<br />
                    No undisclosed hyperparameter tuning.<br />
                    Science means showing your work.
                </div>

                <div className="t16-value-bullets t16-reveal t16-d3">
                    {['Seed-locked experiment configs committed to version control', 'Ablation tables for every architectural choice', 'Full training curves and validation loss reported', 'Statistical significance tested across 5 random seeds'].map((b, i) => (
                        <div key={i} className="t16-value-bullet">
                            <span className="t16-bullet-dot" />
                            <span>{b}</span>
                        </div>
                    ))}
                </div>

                <div className="t16-value-stats t16-reveal t16-d4">
                    <div className="t16-stat-chip"><span className="t16-stat-chip-num">100%</span><span className="t16-stat-chip-lbl">Experiments reproducible</span></div>
                    <div className="t16-stat-chip"><span className="t16-stat-chip-num">5×</span><span className="t16-stat-chip-lbl">Avg seeds per run</span></div>
                </div>
            </section>

            {/* ══ SECTION 5 — EFFICIENCY ══ */}
            <section className="t16-value-section t16-section" id="t16-val-efficiency">
                <div className="t16-value-index t16-reveal">[3]</div>
                <div className="t16-value-title t16-reveal t16-d1">Efficiency</div>

                <div className="t16-starburst-center">
                    <svg width="380" height="380" viewBox="0 0 340 340">
                        {buildStarburst(170, 170, 72, 45, 152, 6, '#4ECDB4', 't16-sb2-inner')}
                    </svg>
                </div>

                <div className="t16-value-desc t16-reveal t16-d2">
                    More intelligence per FLOP.<br />
                    Smaller footprint, faster inference,<br />
                    lower serving cost.<br /><br />
                    Architecture choices made with<br />
                    compute budgets in mind — not just<br />
                    benchmark leaderboards.
                </div>

                <div className="t16-value-bullets t16-reveal t16-d3">
                    {['Mixed-precision training (BF16/FP16) as default', 'Flash Attention & gradient checkpointing on all transformers', 'Knowledge distillation to compress deployed models', 'FLOP-normalized benchmarking against baselines'].map((b, i) => (
                        <div key={i} className="t16-value-bullet">
                            <span className="t16-bullet-dot" />
                            <span>{b}</span>
                        </div>
                    ))}
                </div>

                <div className="t16-value-stats t16-reveal t16-d4">
                    <div className="t16-stat-chip"><span className="t16-stat-chip-num">40%</span><span className="t16-stat-chip-lbl">Avg inference speedup</span></div>
                    <div className="t16-stat-chip"><span className="t16-stat-chip-num">3×</span><span className="t16-stat-chip-lbl">Smaller vs original paper</span></div>
                </div>
            </section>

            {/* ══ SECTION 6 — DEPLOYMENT ══ */}
            <section className="t16-value-section t16-section" id="t16-val-deployment">
                <div className="t16-value-index t16-reveal">[4]</div>
                <div className="t16-value-title t16-reveal t16-d1">Deployment</div>

                <div className="t16-starburst-center">
                    <svg width="380" height="380" viewBox="0 0 340 340">
                        {buildStarburst(170, 170, 64, 45, 152, 7, '#5B8DB8', 't16-sb3-inner')}
                    </svg>
                </div>

                <div className="t16-value-desc t16-reveal t16-d2">
                    A model that lives in a notebook<br />
                    helps no one in production.<br /><br />
                    Every research project is built<br />
                    with the end-state in mind — latency<br />
                    budgets, serving infrastructure,<br />
                    and observable rollouts.
                </div>

                <div className="t16-value-bullets t16-reveal t16-d3">
                    {['ONNX / TorchScript export for all production models', 'Triton Inference Server configs bundled with each repo', 'A/B testing harness with statistical power analysis', 'Monitoring dashboards: drift detection + latency p99'].map((b, i) => (
                        <div key={i} className="t16-value-bullet">
                            <span className="t16-bullet-dot" />
                            <span>{b}</span>
                        </div>
                    ))}
                </div>

                <div className="t16-value-stats t16-reveal t16-d4">
                    <div className="t16-stat-chip"><span className="t16-stat-chip-num">{modelsDeployed}</span><span className="t16-stat-chip-lbl">Models in production</span></div>
                    <div className="t16-stat-chip"><span className="t16-stat-chip-num">&lt;80ms</span><span className="t16-stat-chip-lbl">p99 inference latency</span></div>
                </div>
            </section>

            {/* ══ SECTION 7 — METRICS ══ */}
            <section id="t16-metrics" className="t16-section" style={{ background: '#EDECEA', padding: '80px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p className="t16-metrics-statement t16-reveal">
                    {papersReproduced} papers reproduced with verified accuracy.
                    {modelsDeployed} models deployed to production. {reproductionAccuracy}% best-in-class
                    reproduction fidelity. <span className="t16-dim">{conferenceSubmissions} conference
                        submissions accepted. Research spanning foundational models,
                        diffusion systems, and alignment.</span>
                </p>

                <div className="t16-metrics-row">
                    {[
                        { target: papersReproduced, label: 'Papers\nReproduced', delay: 't16-d1' },
                        { target: modelsDeployed, label: 'Models\nDeployed', delay: 't16-d2' },
                        { target: reproductionAccuracy, suffix: '%', label: 'Best Accuracy\nReproduction', delay: 't16-d3' },
                        { target: conferenceSubmissions, label: 'Conference\nSubmissions', delay: 't16-d4' },
                    ].map((m, i) => (
                        <div key={i} className={`t16-metric-cell t16-reveal ${m.delay}`}>
                            <div className="t16-metric-big" data-target={m.target} data-suffix={m.suffix || ''}>0{m.suffix || ''}</div>
                            <div className="t16-metric-caption">{m.label.split('\n').map((l, j) => <React.Fragment key={j}>{l}{j === 0 && <br />}</React.Fragment>)}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ SECTION 8 — STACK ══ */}
            <section id="t16-stack" className="t16-section">
                <h2 className="t16-stack-heading t16-reveal">
                    The frameworks<br />that make it real.
                </h2>

                <div className="t16-stack-grid">
                    {(skills.length >= 5 ? skills.slice(0, 5) : ['PyTorch', 'TensorFlow', 'JAX', 'Hugging Face', 'CUDA']).map((s: string, i: number) => (
                        <div key={i} className="t16-stack-cell">
                            <div className="t16-stack-icon">{stackIcons[s] || '🔬'}</div>
                            <div className="t16-stack-name">{s}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ SECTION 9 — CONTACT ══ */}
            <section id="t16-contact" className="t16-section">
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4, pointerEvents: 'none' }} viewBox="0 0 1280 720">
                    <g id="t16-contact-radial-g"></g>
                </svg>

                <div className="t16-nav-nodes">
                    {([
                        { label: 'OVERVIEW', href: '#t16-hero', x: 28, y: 22, color: '#4ECDB4' },
                        { label: 'PAPERS', href: '#t16-about', x: 50, y: 16, color: undefined },
                        { label: 'MODELS', href: '#t16-statement', x: 74, y: 22, color: undefined },
                        { label: 'DATASETS', href: '#t16-stack', x: 28, y: 90, color: undefined },
                        { label: 'RESULTS', href: '#t16-metrics', x: 74, y: 90, color: undefined },
                    ] as { label: string; href: string; x: number; y: number; color?: string }[]).map((n) => (
                        <a key={n.label} className="t16-nav-node" href={n.href}
                            style={{ left: `${n.x}%`, top: `${n.y}%`, color: n.color }}
                            onClick={(e) => { e.preventDefault(); document.querySelector(n.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            <span>{n.label}</span>
                        </a>
                    ))}
                </div>

                <div className="t16-contact-side-l" onClick={() => document.getElementById('t16-about')?.scrollIntoView({ behavior: 'smooth' })}>Read next</div>
                <div className="t16-contact-side-r" onClick={() => document.getElementById('t16-hero')?.scrollIntoView({ behavior: 'smooth' })}>Back ↵</div>

                <div className="t16-contact-card">
                    <div className="t16-contact-card-title">
                        Have a research<br />problem?<br />Let's solve it.
                    </div>

                    <div className="t16-contact-starburst">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            {buildStarburst(50, 50, 28, 12, 44, 6, '#4ECDB4', 't16-sb-mini')}
                        </svg>
                    </div>

                    <div className="t16-contact-card-sub">TIME TO BUILD SOMETHING RIGOROUS.</div>
                    <a href={`mailto:${email}`} className="t16-contact-card-btn">
                        <span>↳</span>
                        <span>START A PROJECT</span>
                    </a>
                </div>

                <div className="t16-contact-bottom">OR EXPLORE ANOTHER TOPIC</div>
            </section>
        </div>
    );
};
