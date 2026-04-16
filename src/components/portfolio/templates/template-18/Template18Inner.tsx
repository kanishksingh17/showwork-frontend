import React, { useEffect, useRef, useState } from 'react';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { EditableBlock } from '../../editor/EditableBlock';

export const Template18Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects, sections }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [timeStr, setTimeStr] = useState('—');

    // ── Bind to Redux Sections for real-time editing ───────────────────────
    const aboutSection = sections?.find(s => s.id === 'about')?.customData || {};
    const resumeSection = sections?.find(s => s.id === 'resume')?.customData || {};
    const skillsSection = sections?.find(s => s.id === 'skills')?.customData || {};
    const osHeroData = sections?.find(s => s.variant === 'HeroOS' || s.id === 'about')?.customData || {};

    // ── derive user info ────────────────────────────────────────────────────
    const name = osHeroData.name || aboutSection.name || userData?.name || 'Kanishk Mehta';
    const email = userData?.email || 'kanishk@example.dev';
    const location = osHeroData.location || aboutSection.location || userData?.location || 'Bengaluru, India';
    const bioStr = osHeroData.bio || aboutSection.bio || userData?.bio || 'Principal Systems Engineer';
    const role = osHeroData.headline || aboutSection.headline || userData?.title || 'Principal Systems Engineer';
    const github = userData?.socialLinks?.github || 'github.com/kanishkmehta';
    const linkedin = userData?.socialLinks?.linkedin || 'linkedin.com/in/kanishkmehta';

    const skills = skillsSection.techSlugs || userData?.skills || ['C', 'eBPF / XDP', 'Rust', 'Linux Kernel', 'Distributed Systems'];
    const expList = resumeSection.experiences || userData?.experience || [
        { period: '2023 – Present', company: 'Razorpay', title: 'Principal Systems Engineer', description: 'Zero-copy payment pipeline, eBPF observability' }
    ];
    const projList = (projects || []).slice(0, 4);
    if (projList.length === 0) {
        projList.push({ name: 'example', title: 'Linux Patch', description: 'Sample kernel patch', tech: 'C, Kernel' });
    }

    const css = `
/* ╔══════════════════════════════════════════════════════╗
   ║  DESIGN TOKEN SYSTEM                                 ║
   ╚══════════════════════════════════════════════════════╝ */
.t18 {
  --desk:     #D8D4CC;
  --win:      #F7F5F2;
  --win2:     #EFECE8;
  --win3:     #E8E4DE;
  --border:   rgba(0,0,0,0.09);
  --border2:  rgba(0,0,0,0.05);
  --sh-a:     0 1px 2px rgba(0,0,0,0.06);
  --sh-k:     0 8px 28px rgba(0,0,0,0.14);
  --sh-c:     0 30px 80px rgba(0,0,0,0.18);
  --sh:       var(--sh-a), var(--sh-k), var(--sh-c);
  --sh-sm:    var(--sh-a), 0 4px 14px rgba(0,0,0,0.10);
  --t1:       #111110;
  --t2:       #48484A;
  --t3:       #8C8C8E;
  --accent:   #0066CC;
  --accent-l: rgba(0,102,204,0.09);
  --red:      #FF5F57;
  --yel:      #FFBD2E;
  --grn:      #28CA41;
  --tl-off:   #C4C2BE;
  --radius:   13px;
  --ease:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --f:        -apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif;
  --fmono:    'SF Mono', 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  width: 100%; height: 100vh; overflow: hidden; background: var(--desk);
  font-family: var(--f); font-size: 13px; line-height: 1.5; color: var(--t1);
  -webkit-font-smoothing: antialiased; user-select: none; position: relative;
}

.t18 *, .t18 *::before, .t18 *::after { margin:0; padding:0; box-sizing:border-box; }

.t18-bg {
  position:absolute; inset:0; z-index:0; pointer-events:none;
  background:
    radial-gradient(ellipse 120% 80% at 60% 30%, rgba(255,255,255,0.12) 0%, transparent 60%),
    radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.06) 0%, transparent 50%);
}

/* MENUBAR */
.mb {
  position:absolute; top:0; left:0; right:0; height:26px; z-index:9000;
  background: rgba(236,232,226,0.85); backdrop-filter: blur(18px) saturate(1.5);
  border-bottom: 1px solid rgba(0,0,0,0.12); display:flex; align-items:center;
}
.mb-apple { padding:0 14px; font-size:15px; height:26px; display:flex; align-items:center; cursor:default; transition:background 0.1s; }
.mb-apple:hover { background:rgba(0,0,0,0.07); }
.mb-item { padding:0 9px; height:26px; display:flex; align-items:center; font-size:13px; font-weight:400; cursor:default; border-radius:4px; letter-spacing:-0.1px; }
.mb-item:hover { background:rgba(0,0,0,0.07); }
.mb-item.bold { font-weight:600; }
.mb-spacer { flex:1; }
.mb-time { padding:0 12px; font-size:12px; font-weight:400; letter-spacing:-0.1px; }

/* DESKTOP */
.desk { position:absolute; inset:26px 0 70px 0; z-index:1; overflow:hidden; }

/* ICONS */
.shelf { position:absolute; top:16px; right:16px; display:flex; flex-direction:column; gap:4px; align-items:center; }
.di { display:flex; flex-direction:column; align-items:center; gap:4px; padding:7px 8px 6px; border-radius:7px; cursor:default; width:72px; transition:background 0.1s; }
.di:hover { background:rgba(255,255,255,0.35); }
.di.selected { background:rgba(0,102,204,0.14); }
.di:active { transform:scale(0.96); }
.di-face { width:46px; height:46px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:25px; box-shadow:0 1px 3px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.55); flex-shrink:0; position:relative; }
.di-face::before { content:''; position:absolute; inset:1px; bottom:50%; border-radius:10px 10px 0 0; background:linear-gradient(to bottom, rgba(255,255,255,0.35), transparent); pointer-events:none; }
.di-label { font-size:11px; font-weight:400; text-align:center; line-height:1.25; text-shadow:0 1px 2px rgba(255,255,255,0.7); }
.di.selected .di-label { color:var(--accent); font-weight:500; }
.ic-a { background:linear-gradient(145deg,#E4DFD6,#C8C3B8); }
.ic-p { background:linear-gradient(145deg,#4E9DE8,#2B7ACC); }
.ic-e { background:linear-gradient(145deg,#E8855A,#C45C2A); }
.ic-s { background:linear-gradient(145deg,#5EC97A,#2FAA50); }
.ic-c { background:linear-gradient(145deg,#9B7EE0,#7050C0); }

/* DOCK */
.dock { position:absolute; bottom:8px; left:50%; transform:translateX(-50%); z-index:9000; display:flex; align-items:flex-end; gap:6px; padding:7px 12px 6px; background:rgba(240,236,230,0.68); backdrop-filter:blur(22px) saturate(1.8); border:1px solid rgba(255,255,255,0.7); border-bottom-color:rgba(0,0,0,0.08); border-radius:17px; box-shadow:0 6px 28px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.6); }
.dk-item { display:flex; flex-direction:column; align-items:center; gap:2px; position:relative; cursor:default; }
.dk-item:hover .dk-face { transform:translateY(-7px) scale(1.14); }
.dk-item:active .dk-face { transform:translateY(-3px) scale(1.06); }
.dk-face { width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:25px; box-shadow:0 2px 8px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.45); transition:transform 0.14s var(--ease); position:relative; }
.dk-face::before { content:''; position:absolute; inset:1px; bottom:50%; border-radius:11px 11px 0 0; background:linear-gradient(to bottom, rgba(255,255,255,0.28), transparent); pointer-events:none; }
.dk-dot { width:4px; height:4px; border-radius:50%; background:rgba(0,0,0,0.35); opacity:0; transition:opacity 0.15s; }
.dk-item.open .dk-dot { opacity:1; }
.dk-tip { position:absolute; bottom:calc(100% + 10px); left:50%; transform:translateX(-50%); background:rgba(28,28,26,0.86); color:#fff; font-size:11px; font-weight:500; padding:3px 9px; border-radius:5px; white-space:nowrap; opacity:0; pointer-events:none; transition:opacity 0.1s; letter-spacing:0; }
.dk-item:hover .dk-tip { opacity:1; }

/* WINDOW */
.win { position:absolute; background:var(--win); border-radius:var(--radius); border:1px solid rgba(0,0,0,0.13); border-top-color:rgba(0,0,0,0.08); box-shadow:var(--sh); display:flex; flex-direction:column; overflow:hidden; min-width:320px; min-height:180px; transform-origin:center top; }
.win.anim-in { animation:winIn 0.16s cubic-bezier(0.25,0.46,0.45,0.94) both; }
@keyframes winIn { from{opacity:0; transform:scale(0.955) translateY(5px);} to{opacity:1; transform:scale(1) translateY(0);} }
.win.inactive { box-shadow:var(--sh-sm); }
.win.inactive .wbar { background:var(--win2); }
.win.inactive .tl-red,.win.inactive .tl-yel,.win.inactive .tl-grn { background:var(--tl-off); border-color:rgba(0,0,0,0.07); }
.win.inactive .wbar-title { color:var(--t3); }

.wbar { height:36px; background:var(--win); border-bottom:1px solid var(--border); display:flex; align-items:center; padding:0 11px; flex-shrink:0; cursor:move; position:relative; transition:background 0.15s; }
.tl-grp { display:flex; gap:7px; align-items:center; z-index:1; }
.tl { width:12px; height:12px; border-radius:50%; cursor:default; flex-shrink:0; transition:filter 0.1s; }
.tl:hover { filter:brightness(1.1); }
.tl-red { background:var(--red); border:0.5px solid rgba(179,50,40,0.3); }
.tl-yel { background:var(--yel); border:0.5px solid rgba(153,100,0,0.2); }
.tl-grn { background:var(--grn); border:0.5px solid rgba(0,130,40,0.25); }
.wbar:hover .tl-red::after { content:'×'; }
.wbar:hover .tl-yel::after { content:'−'; }
.wbar:hover .tl-grn::after { content:'+'; }
.tl::after { font-size:9px; font-weight:700; line-height:12px; display:block; text-align:center; color:rgba(0,0,0,0.45); font-family:var(--f); }
.wbar-title { position:absolute; left:0; right:0; text-align:center; font-size:13px; font-weight:500; color:var(--t2); pointer-events:none; }
.wbody { flex:1; overflow:hidden; display:flex; flex-direction:column; }
.wresize { position:absolute; bottom:0; right:0; width:16px; height:16px; cursor:se-resize; z-index:10; }
.wresize::after { content:''; position:absolute; bottom:4px; right:4px; width:9px; height:9px; background:linear-gradient(135deg,transparent 29%,var(--t3) 29%,var(--t3) 42%,transparent 42%), linear-gradient(135deg,transparent 57%,var(--t3) 57%,var(--t3) 70%,transparent 70%), linear-gradient(135deg,transparent 85%,var(--t3) 85%,var(--t3) 98%,transparent 98%); opacity:0.35; }
.wscroll { overflow-y:auto; overflow-x:hidden; flex:1; scrollbar-width:thin; scrollbar-color:rgba(0,0,0,0.18) transparent; }
.wscroll::-webkit-scrollbar { width:5px; }
.wscroll::-webkit-scrollbar-track { background:transparent; }
.wscroll::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.18); border-radius:3px; }

/* ABOUT */
.abt-in { padding:22px 22px 24px; display:flex; flex-direction:column; gap:18px; }
.ahd { display:flex; gap:14px; align-items:flex-start; }
.a-av { width:54px; height:54px; border-radius:14px; flex-shrink:0; background:linear-gradient(145deg,#9BBCDC,#6895C0); display:flex; align-items:center; justify-content:center; font-size:27px; box-shadow:0 2px 10px rgba(0,0,0,0.14); position:relative; }
.a-av::before { content:''; position:absolute; inset:1px; bottom:50%; border-radius:13px 13px 0 0; background:linear-gradient(to bottom,rgba(255,255,255,0.3),transparent); pointer-events:none; }
.a-n { font-size:18px; font-weight:700; letter-spacing:-0.4px; line-height:1.15; }
.a-r { font-size:13px; color:var(--t2); margin-top:2px; }
.a-l { font-size:11px; color:var(--t3); margin-top:3px; }
.a-div { height:1px; background:var(--border); }
.a-bio { font-size:13px; line-height:1.68; color:var(--t2); white-space:pre-wrap; }
.a-bio strong { color:var(--t1); font-weight:600; }
.si { background:var(--win2); border:1px solid var(--border); border-radius:9px; overflow:hidden; }
.si-h { padding:8px 13px; border-bottom:1px solid var(--border); font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.55px; color:var(--t3); }
.sir { display:grid; grid-template-columns:auto 1fr; padding:6px 13px; border-bottom:1px solid var(--border2); column-gap:14px; align-items:baseline; }
.sir:last-child { border-bottom:none; }
.sir-k { font-size:11px; color:var(--t3); white-space:nowrap; }
.sir-v { font-size:12px; font-weight:500; }
.a-tg { display:flex; flex-wrap:wrap; gap:5px; }
.atag { background:var(--win2); border:1px solid var(--border); border-radius:4px; padding:3px 8px; font-size:11px; font-weight:500; color:var(--t2); }
.atag.hi { background:var(--accent-l); color:var(--accent); border-color:rgba(0,102,204,0.14); }

/* PROJECTS */
.p-lay { display:flex; flex:1; overflow:hidden; }
.p-sb { width:176px; flex-shrink:0; background:var(--win2); border-right:1px solid var(--border); overflow-y:auto; padding:8px 0; }
.ps-t { padding:4px 13px 3px; font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.55px; color:var(--t3); }
.psi { display:flex; align-items:center; gap:7px; padding:5px 11px; margin:0 5px; border-radius:5px; cursor:default; font-size:13px; transition:background 0.08s; }
.psi:hover { background:rgba(0,0,0,0.05); }
.psi.active { background:var(--accent); color:#fff; }
.psi.active .psic { color:rgba(255,255,255,0.8); }
.psic { font-size:14px; color:var(--t3); flex-shrink:0; }
.p-mn { flex:1; overflow-y:auto; padding:18px 20px 20px; display:flex; flex-direction:column; gap:14px; }
.pj-n { font-size:16px; font-weight:700; letter-spacing:-0.35px; }
.pj-s { font-size:12px; color:var(--t3); margin-top:2px; }
.pj-b { display:flex; flex-wrap:wrap; gap:4px; margin-top:6px; }
.pbdg { padding:2px 7px; border-radius:4px; font-size:11px; font-weight:600; background:var(--win2); color:var(--t2); border:1px solid var(--border); }
.slbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.55px; color:var(--t3); margin-bottom:7px; }
.pj-sum { font-size:13px; line-height:1.65; color:var(--t2); }

/* EXPERIENCE */
.e-in { padding:20px 24px 24px; display:flex; flex-direction:column; gap:16px; }
.e-t { font-size:16px; font-weight:700; letter-spacing:-0.35px; }
.e-m { font-size:11px; color:var(--t3); margin-top:2px; }
.tl { display:flex; flex-direction:column; position:relative; }
.tl::before { content:''; position:absolute; left:4px; top:7px; bottom:0; width:1px; background:var(--border); }
.tli { display:flex; gap:16px; padding-bottom:22px; position:relative; }
.tli-d { width:9px; height:9px; border-radius:50%; border:1.5px solid var(--t3); background:var(--win); flex-shrink:0; margin-top:4px; z-index:1; }
.tli:first-child .tli-d { border-color:var(--accent); background:var(--accent); }
.tli-b { flex:1; }
.tli-p { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.45px; color:var(--accent); margin-bottom:2px; }
.tli-c { font-size:14px; font-weight:700; letter-spacing:-0.3px; }
.tli-r { font-size:12px; color:var(--t2); font-weight:500; margin-bottom:7px; }
.tli-l { font-size:12px; color:var(--t2); line-height:1.55; white-space:pre-wrap; }

/* SKILLS */
.sk-in { padding:16px 18px 20px; display:flex; flex-direction:column; gap:14px; }
.sk-gt { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.55px; color:var(--t3); padding-bottom:4px; border-bottom:1px solid var(--border); }
.sk-g { display:grid; grid-template-columns:1fr 1fr; gap:5px; margin-top:6px; }
.sk-i { background:var(--win2); border:1px solid var(--border); border-radius:8px; padding:9px 11px; display:flex; flex-direction:column; gap:5px; }
.sk-n { font-size:12px; font-weight:600; color:var(--t1); }
.sk-b { height:2px; background:var(--border); border-radius:1px; overflow:hidden; }
.sk-f { height:100%; border-radius:1px; background:var(--accent); }

/* CONTACT */
.c-in { padding:20px; display:flex; flex-direction:column; gap:13px; }
.ct-l { font-size:14px; font-weight:700; }
.ct-s { font-size:13px; color:var(--t2); line-height:1.55; }
.ct-lst { background:var(--win2); border:1px solid var(--border); border-radius:9px; overflow:hidden; display:flex; flex-direction:column; }
.ctr { display:flex; align-items:center; gap:10px; padding:10px 13px; background:var(--win); border-bottom:1px solid var(--border2); transition:background 0.08s; cursor:pointer;}
.ctr:hover { background:var(--accent-l); }
.ctri { font-size:15px; width:20px; text-align:center; }
.ctrl { font-size:11.5px; font-weight:600; color:var(--t2); width:68px; }
.ctrv { flex:1; font-size:12.5px; font-weight:500; color:var(--accent); }
.ct-n { font-size:11px; color:var(--t3); line-height:1.5; }
.ct-b { align-self:flex-start; background:var(--accent); color:#fff; border:none; border-radius:7px; padding:9px 16px; font-size:13px; font-weight:600; cursor:pointer; }
    `;

    // ── window manager state ───────────────────────────────────────────────
    let topZ = 100;
    const WIN_DEF: Record<string, { x: number, y: number, w: number, h: number, open?: boolean }> = {
        about: { x: 30, y: 40, w: 410, h: 494, open: true },
        projects: { x: 140, y: 70, w: 650, h: 510, open: true },
        experience: { x: 90, y: 110, w: 420, h: 490 },
        skills: { x: 280, y: 80, w: 386, h: 468 },
        contact: { x: 350, y: 150, w: 330, h: 334 },
    };

    // refs to DOM elements to bypass React state arrays for fast dragging
    const winRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [openSet, setOpenSet] = useState<Set<string>>(new Set(['about', 'projects']));
    const [activeWin, setActiveWin] = useState<string>('projects');
    const [selProjIdx, setSelProjIdx] = useState(0);

    const bringFront = (id: string) => {
        const w = winRefs.current[id];
        if (w) {
            topZ++;
            w.style.zIndex = String(topZ);
            setActiveWin(id);
        }
    };

    const openWin = (id: string) => {
        setOpenSet(prev => {
            const next = new Set(prev);
            if (!next.has(id)) {
                next.add(id);
                const wEl = winRefs.current[id];
                if (wEl) {
                    const cascade = next.size * 20;
                    wEl.style.left = (WIN_DEF[id].x + cascade) + 'px';
                    wEl.style.top = (WIN_DEF[id].y + cascade * 0.5) + 'px';
                    wEl.style.width = WIN_DEF[id].w + 'px';
                    wEl.style.height = WIN_DEF[id].h + 'px';
                    wEl.classList.remove('anim-in');
                    void wEl.offsetWidth;
                    wEl.classList.add('anim-in');
                }
            }
            return next;
        });
        setTimeout(() => bringFront(id), 10);
    };

    const closeWin = (id: string) => {
        const wEl = winRefs.current[id];
        if (wEl) {
            wEl.style.transition = 'opacity 0.12s ease, transform 0.12s ease';
            wEl.style.opacity = '0';
            wEl.style.transform = 'scale(0.96) translateY(4px)';
            setTimeout(() => {
                setOpenSet(prev => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
                wEl.style.opacity = '';
                wEl.style.transform = '';
                wEl.style.transition = '';
            }, 130);
        } else {
            setOpenSet(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }
    };

    const miniWin = (id: string) => {
        const wEl = winRefs.current[id];
        if (wEl) {
            wEl.style.transition = 'opacity 0.14s ease, transform 0.14s ease';
            wEl.style.opacity = '0';
            wEl.style.transform = 'scale(0.88) translateY(18px)';
            setTimeout(() => {
                setOpenSet(prev => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
                wEl.style.opacity = '';
                wEl.style.transform = '';
                wEl.style.transition = '';
            }, 150);
        }
    };

    // ── hook up dragging ───────────────────────────────────────────────────
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        let dragState: any = null;
        let rsState: any = null;

        const onDown = (e: MouseEvent) => {
            // resize
            const rw = (e.target as HTMLElement).closest('.wresize');
            if (rw) {
                const id = rw.id.replace('wr-', '');
                const win = winRefs.current[id];
                if (win) {
                    bringFront(id);
                    rsState = {
                        win,
                        sx: e.clientX, sy: e.clientY,
                        sw: win.offsetWidth, sh: win.offsetHeight
                    };
                    document.body.style.cursor = 'se-resize';
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
            }

            // drag
            const bar = (e.target as HTMLElement).closest('.wbar');
            if (bar && !(e.target as HTMLElement).closest('.tl-grp')) {
                const id = bar.id.replace('wbar-', '');
                const win = winRefs.current[id];
                if (win) {
                    bringFront(id);
                    dragState = {
                        win,
                        ox: e.clientX - parseInt(win.style.left || '0', 10),
                        oy: e.clientY - parseInt(win.style.top || '0', 10)
                    };
                    document.body.style.cursor = 'move';
                    e.preventDefault();
                }
            }
        };

        const onMove = (e: MouseEvent) => {
            if (dragState) {
                const maxX = root.clientWidth - 80;
                const maxY = root.clientHeight - 30;
                dragState.win.style.left = Math.min(maxX, Math.max(-200, e.clientX - dragState.ox)) + 'px';
                dragState.win.style.top = Math.min(maxY, Math.max(0, e.clientY - dragState.oy)) + 'px';
            }
            if (rsState) {
                rsState.win.style.width = Math.max(300, rsState.sw + e.clientX - rsState.sx) + 'px';
                rsState.win.style.height = Math.max(180, rsState.sh + e.clientY - rsState.sy) + 'px';
            }
        };

        const onUp = () => {
            dragState = null;
            rsState = null;
            document.body.style.cursor = '';
        };

        document.addEventListener('mousedown', onDown);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);

        // clock
        const tick = () => {
            const n = new Date();
            const D = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][n.getDay()];
            const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][n.getMonth()];
            const h = String(n.getHours()).padStart(2, '0');
            const m = String(n.getMinutes()).padStart(2, '0');
            setTimeStr(`${D} ${M} ${n.getDate()}  ${h}:${m}`);
        };
        tick();
        const iv = setInterval(tick, 20000);

        // init positions
        setTimeout(() => {
            ['about', 'projects'].forEach(id => {
                const w = winRefs.current[id];
                if (w) {
                    w.style.left = WIN_DEF[id].x + 'px';
                    w.style.top = WIN_DEF[id].y + 'px';
                    w.style.width = WIN_DEF[id].w + 'px';
                    w.style.height = WIN_DEF[id].h + 'px';
                }
            });
            bringFront('projects');
        }, 50);

        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            clearInterval(iv);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const appTitle = activeWin ? (activeWin.charAt(0).toUpperCase() + activeWin.slice(1)) : 'Portfolio';

    return (
        <div className="t18" ref={rootRef} onClick={(e) => {
            if (!(e.target as HTMLElement).closest('.win') && !(e.target as HTMLElement).closest('.di') && !(e.target as HTMLElement).closest('.dk-item')) {
                setActiveWin('');
            }
        }}>
            <style>{css}</style>
            <div className="t18-bg" />

            {/* Menubar */}
            <div className="mb">
                <div className="mb-apple">⌘</div>
                <div className="mb-item bold">{appTitle}</div>
                <div className="mb-item">File</div>
                <div className="mb-item">View</div>
                <div className="mb-item">Help</div>
                <div className="mb-spacer" />
                <div className="mb-time">{timeStr}</div>
            </div>

            {/* Desktop Icons */}
            <div className="desk">
                <div className="shelf">
                    {['about', 'projects', 'experience', 'skills', 'contact'].map((id, i) => {
                        const icons = ['📄', '🗂', '📋', '🔧', '✉️'];
                        const cls = ['ic-a', 'ic-p', 'ic-e', 'ic-s', 'ic-c'];
                        const labels = ['About.txt', 'Projects', 'Experience', 'Skills', 'Contact'];
                        return (
                            <div key={id} className={`di ${activeWin === id ? 'selected' : ''}`} onDoubleClick={() => openWin(id)} onClick={(e) => { e.stopPropagation(); setActiveWin(id); }}>
                                <div className={`di-face ${cls[i]}`}>{icons[i]}</div>
                                <div className="di-label">{labels[i]}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Window: About */}
                {openSet.has('about') && (
                    <div className={`win ${activeWin !== 'about' ? 'inactive' : ''}`} id="win-about" ref={el => winRefs.current.about = el} onMouseDown={() => bringFront('about')}>
                        <div className="wbar" id="wbar-about">
                            <div className="tl-grp">
                                <div className="tl tl-red" onClick={() => closeWin('about')} />
                                <div className="tl tl-yel" onClick={() => miniWin('about')} />
                                <div className="tl tl-grn" />
                            </div>
                            <div className="wbar-title">About.txt</div>
                        </div>
                        <div className="wbody wscroll">
                            <EditableBlock id="about" className="abt-in">
                                <div className="ahd">
                                    <div className="a-av">🧑💻</div>
                                    <div>
                                        <div className="a-n">{name}</div>
                                        <div className="a-r">{role}</div>
                                        <div className="a-l">📍 {location}</div>
                                    </div>
                                </div>
                                <div className="a-div" />
                                <div className="a-bio">{bioStr}</div>
                                <div className="si">
                                    <div className="si-h">System Information</div>
                                    <div className="sir"><div className="sir-k">Current Role</div><div className="sir-v">{role}</div></div>
                                    <div className="sir"><div className="sir-k">Location</div><div className="sir-v">{location}</div></div>
                                    <div className="sir"><div className="sir-k">Email</div><div className="sir-v">{email}</div></div>
                                </div>
                                <div className="a-tg">
                                    {skills.slice(0, 5).map((s: string) => <span key={s} className="atag hi">{s}</span>)}
                                </div>
                            </EditableBlock>
                        </div>
                        <div className="wresize" id="wr-about" />
                    </div>
                )}

                {/* Window: Projects */}
                {openSet.has('projects') && (
                    <div className={`win ${activeWin !== 'projects' ? 'inactive' : ''}`} id="win-projects" ref={el => winRefs.current.projects = el} onMouseDown={() => bringFront('projects')}>
                        <div className="wbar" id="wbar-projects">
                            <div className="tl-grp">
                                <div className="tl tl-red" onClick={() => closeWin('projects')} />
                                <div className="tl tl-yel" onClick={() => miniWin('projects')} />
                                <div className="tl tl-grn" />
                            </div>
                            <div className="wbar-title">Projects</div>
                        </div>
                        <div className="wbody" style={{ flexDirection: 'row' }}>
                            <div className="p-sb">
                                <div className="ps-t">Projects</div>
                                {projList.map((p, i) => (
                                    <div key={i} className={`psi ${selProjIdx === i ? 'active' : ''}`} onClick={() => setSelProjIdx(i)}>
                                        <span className="psic">🗂</span> {p.name || `Project ${i + 1}`}
                                    </div>
                                ))}
                            </div>
                            <EditableBlock id="projects" className="p-mn">
                                {projList[selProjIdx] && (() => {
                                    const p = projList[selProjIdx];
                                    const tArr = Array.isArray(p.tech) ? p.tech : (p.tech || '').split(',').map((t: string) => t.trim()).filter(Boolean);
                                    return (
                                        <div>
                                            <div className="pj-n">{p.title || p.name}</div>
                                            <div className="pj-s">{p.category || 'Engineering'}</div>
                                            <div className="pj-b">
                                                {tArr.map((t: string) => <span key={t} className="pbdg">{t}</span>)}
                                            </div>
                                            <div style={{ marginTop: 12 }}>
                                                <div className="slbl">Description</div>
                                                <div className="pj-sum">{p.description || p.summary || 'No description provided.'}</div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </EditableBlock>
                        </div>
                        <div className="wresize" id="wr-projects" />
                    </div>
                )}

                {/* Window: Experience */}
                {openSet.has('experience') && (
                    <div className={`win ${activeWin !== 'experience' ? 'inactive' : ''}`} id="win-experience" ref={el => winRefs.current.experience = el} onMouseDown={() => bringFront('experience')}>
                        <div className="wbar" id="wbar-experience">
                            <div className="tl-grp">
                                <div className="tl tl-red" onClick={() => closeWin('experience')} />
                                <div className="tl tl-yel" onClick={() => miniWin('experience')} />
                                <div className="tl tl-grn" />
                            </div>
                            <div className="wbar-title">Experience</div>
                        </div>
                        <div className="wbody wscroll">
                            <EditableBlock id="resume" className="e-in">
                                <div>
                                    <div className="e-t">Work History</div>
                                    <div className="e-m">{name} · {role}</div>
                                </div>
                                <div className="tl">
                                    {expList.map((exp: any, i: number) => (
                                        <div key={i} className="tli">
                                            <div className="tli-d" />
                                            <div className="tli-b">
                                                <div className="tli-p">{String(exp.period || exp.date || 'Present')}</div>
                                                <div className="tli-c">{String(exp.company || exp.employer)}</div>
                                                <div className="tli-r">{String(exp.role || exp.position)}</div>
                                                <div className="tli-l">{String(exp.description || (exp.bullets && exp.bullets.join('\n')) || '')}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </EditableBlock>
                        </div>
                        <div className="wresize" id="wr-experience" />
                    </div>
                )}

                {/* Window: Skills */}
                {openSet.has('skills') && (
                    <div className={`win ${activeWin !== 'skills' ? 'inactive' : ''}`} id="win-skills" ref={el => winRefs.current.skills = el} onMouseDown={() => bringFront('skills')}>
                        <div className="wbar" id="wbar-skills">
                            <div className="tl-grp">
                                <div className="tl tl-red" onClick={() => closeWin('skills')} />
                                <div className="tl tl-yel" onClick={() => miniWin('skills')} />
                                <div className="tl tl-grn" />
                            </div>
                            <div className="wbar-title">Skills</div>
                        </div>
                        <div className="wbody wscroll">
                            <EditableBlock id="skills" className="sk-in">
                                <div className="sk-gt">Technical Skills</div>
                                <div className="sk-g">
                                    {skills.map((s: any, i: number) => (
                                        <div key={i} className="sk-i">
                                            <div className="sk-n">{String(s || '')}</div>
                                            <div className="sk-b"><div className="sk-f" style={{ width: `${Math.min(100, 95 - (i * 5))}%` }} /></div>
                                        </div>
                                    ))}
                                </div>
                            </EditableBlock>
                        </div>
                        <div className="wresize" id="wr-skills" />
                    </div>
                )}

                {/* Window: Contact */}
                {openSet.has('contact') && (
                    <div className={`win ${activeWin !== 'contact' ? 'inactive' : ''}`} id="win-contact" ref={el => winRefs.current.contact = el} onMouseDown={() => bringFront('contact')}>
                        <div className="wbar" id="wbar-contact">
                            <div className="tl-grp">
                                <div className="tl tl-red" onClick={() => closeWin('contact')} />
                                <div className="tl tl-yel" onClick={() => miniWin('contact')} />
                                <div className="tl tl-grn" />
                            </div>
                            <div className="wbar-title">Contact</div>
                        </div>
                        <div className="wbody wscroll">
                            <EditableBlock id="about" className="c-in">
                                <div className="ct-l">Get in touch.</div>
                                <div className="ct-s">Open to conversations regarding new opportunities.</div>
                                <div className="ct-lst">
                                    <div className="ctr">
                                        <div className="ctri">✉️</div>
                                        <div className="ctrl">Email</div>
                                        <div className="ctrv">{String(email || '')}</div>
                                    </div>
                                    <div className="ctr">
                                        <div className="ctri">⌥</div>
                                        <div className="ctrl">GitHub</div>
                                        <div className="ctrv">{String(github || '')}</div>
                                    </div>
                                    <div className="ctr">
                                        <div className="ctri">👤</div>
                                        <div className="ctrl">LinkedIn</div>
                                        <div className="ctrv">{String(linkedin || '')}</div>
                                    </div>
                                </div>
                                <div className="ct-n">Response time &lt;24h on weekdays.</div>
                                <button className="ct-b" onClick={() => window.open(`mailto:${email}`)}>Send message →</button>
                            </EditableBlock>
                        </div>
                        <div className="wresize" id="wr-contact" />
                    </div>
                )}
            </div>

            {/* Dock */}
            <div className="dock">
                {['about', 'projects', 'experience', 'skills', 'contact'].map((id, i) => {
                    const icons = ['📄', '🗂', '📋', '🔧', '✉️'];
                    const cls = ['ic-a', 'ic-p', 'ic-e', 'ic-s', 'ic-c'];
                    const labels = ['About', 'Projects', 'Experience', 'Skills', 'Contact'];
                    return (
                        <div key={id} className={`dk-item ${openSet.has(id) ? 'open' : ''}`} onClick={() => openWin(id)}>
                            <div className={`dk-face ${cls[i]}`}>{icons[i]}</div>
                            <div className="dk-tip">{labels[i]}</div>
                            <div className="dk-dot" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
