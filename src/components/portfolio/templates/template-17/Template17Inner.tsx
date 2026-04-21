import React, { useEffect, useRef } from 'react';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';
import { EditableBlock } from '../../editor/EditableBlock';

export const Template17Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects, sections }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const outRef = useRef<HTMLDivElement>(null);
    const inpRef = useRef<HTMLInputElement>(null);
    const bootRef = useRef<HTMLDivElement>(null);
    const termRef = useRef<HTMLDivElement>(null);
    const psPathRef = useRef<HTMLSpanElement>(null);
    const tbLabelRef = useRef<HTMLSpanElement>(null);
    const [bootPhase, setBootPhase] = React.useState<'booting' | 'done'>('booting');
    const S = useRef<{ cwd: string; hist: string[]; hIdx: number } | null>(null);

    // ── Bind to Redux Sections for real-time editing ───────────────────────
    const heroSection = sections.find(s => s.id === 'about');
    const projectsSection = sections.find(s => s.id === 'projects');
    const skillsSection = sections.find(s => s.id === 'skills');
    const resumeSection = sections.find(s => s.id === 'resume');
    const contactSection = sections.find(s => s.id === 'contact');

    const showHero = heroSection?.isVisible ?? true;
    const showProjects = projectsSection?.isVisible ?? true;
    const showSkills = skillsSection?.isVisible ?? true;
    const showResume = resumeSection?.isVisible ?? true;
    const showContact = contactSection?.isVisible ?? true;

    const aboutData = heroSection?.customData || {};
    const resumeData = resumeSection?.customData || {};
    const skillData = skillsSection?.customData || {};
    const cliData = heroSection?.customData || {};

    // ── derive user info ────────────────────────────────────────────────────
    const name = aboutData.name || userData?.name || 'developer';
    const slug = cliData.userSlug || name.toLowerCase().replace(/\s+/g, '');
    const host = cliData.hostname || 'system';
    
    // Stable refs for boot
    const nameRef = useRef(name);
    const msgRef = useRef(cliData.bootMessage || "Portfolio v1.0");
    React.useEffect(() => { nameRef.current = name; }, [name]);
    React.useEffect(() => { msgRef.current = cliData.bootMessage || "Portfolio v1.0"; }, [cliData.bootMessage]);

    const email = aboutData.email || userData?.email || `${slug}@dev.io`;
    const location = aboutData.location || userData?.location || 'Remote';
    const tagline = aboutData.tagline || userData?.tagline || 'Building tools for developers...';
    const bio = aboutData.bio || tagline || userData?.bio || 'Systems engineer. I write code that talks to hardware.';
    const roleStr = aboutData.headline || userData?.professionalHeadline || userData?.role || userData?.title || 'Systems Engineer';
    const skills: string[] = React.useMemo(() => {
        const profileSkills = (userData?.skills && userData?.skills.length > 0) ? userData.skills : userData?.techStack;
        const raw = (skillData.techSlugs && skillData.techSlugs.length > 0) 
            ? skillData.techSlugs 
            : ((profileSkills && profileSkills.length > 0) ? profileSkills : ['C', 'Rust', 'Go', 'eBPF', 'Linux']);
        return raw.map((s: any) => typeof s === 'string' ? s : (s.name || String(s)));
    }, [skillData.techSlugs, userData?.skills, userData?.techStack]);
    
    // ── derive experience ───────────────────────────────────────────────────
    const experience = React.useMemo(() => 
        (resumeData.experiences || userData?.experience || []).slice(0, 4).map((exp: any) => ({
            period: exp.period || exp.start || exp.date || '?',
            company: exp.company || exp.employer || exp.companyName || '?',
            role: exp.role || exp.title || exp.position || roleStr,
            bullets: exp.description ? [exp.description] : (exp.bullets || []),
        })),
    [resumeData.experiences, userData?.experience, roleStr]);

    // ── derive projects / filesystem ────────────────────────────────────────
    const projectList = React.useMemo(() => 
        (projectsSection?.customData?.manualProjects || projects || []).slice(0, 4).map((p: any) => ({
            name: (p.name || p.title || 'project').toLowerCase().replace(/\s+/g, '-'),
            title: p.title || p.name,
            desc: p.description || p.summary || '',
            tech: Array.isArray(p.tech) ? p.tech.join(', ') : (p.tech || p.tags?.join(', ') || p.category || ''),
            readme: `${p.title || p.name}\n${'═'.repeat(60)}\n\n${p.description || p.summary || ''}\n\nTech: ${Array.isArray(p.tech) ? p.tech.join(', ') : (p.tech || p.tags?.join(', ') || '')}`,
        })),
    [projectsSection?.customData?.manualProjects, projects]);

    // ── CSS ─────────────────────────────────────────────────────────────────
    const css = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');

    .t17 *,.t17 *::before,.t17 *::after { margin:0; padding:0; box-sizing:border-box; }
    .t17 {
      width:100%; 
      height: 100vh;
      background:#0C0C0C; color:#33FF66;
      font-family:'JetBrains Mono','Courier New',monospace;
      font-size:14px; line-height:1.45;
      overflow:hidden; position:relative;
      -webkit-font-smoothing:antialiased;
      display:flex; flex-direction:column;
    }

    /* scanlines */
    .t17::after {
      content:''; position:absolute; inset:0; pointer-events:none; z-index:9999;
      background:repeating-linear-gradient(to bottom,transparent 0px,transparent 1px,rgba(0,0,0,0.055) 1px,rgba(0,0,0,0.055) 2px);
    }
    /* vignette */
    .t17::before {
      content:''; position:absolute; inset:0; pointer-events:none; z-index:9998;
      background:radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,0.35) 100%);
    }

    /* boot */
    .t17-boot { position:absolute; inset:0; background:#0C0C0C; z-index:1000; padding:18px 22px; overflow:hidden; }
    .t17-boot.gone { display:none; }
    .t17-bl { line-height:1.45; opacity:0; transition:opacity 0ms; white-space:pre; }
    .t17-bl.show { opacity:1; }
    .t17-gray-d { color:#5C5C5C; }
    .t17-green-d { color:#20C24C; }
    .t17-ok { color:#33FF66; }
    .t17-white { color:#E2E2E2; }
    .t17-red { color:#CC5555; }

    /* titlebar */
    .t17-titlebar {
      background:#141414; border-bottom:1px solid #1e1e1e;
      padding:6px 12px; display:flex; align-items:center; gap:10px;
      user-select:none; flex-shrink:0;
    }
    .t17-dots { display:flex; gap:7px; }
    .t17-dot { width:11px; height:11px; border-radius:50%; background:#2a2a2a; }
    .t17-tblabel { margin:0 auto; font-size:11px; color:#5C5C5C; letter-spacing:0.3px; }
    .t17-snd {
      font-size:11px; color:#5C5C5C; cursor:pointer;
      border:1px solid #2a2a2a; padding:2px 7px; background:none;
      font-family:inherit; transition:color 0.15s,border-color 0.15s;
    }
    .t17-snd:hover { color:#B8B8B8; border-color:#444; }
    .t17-snd.on { color:#20C24C; border-color:#0F6E2A; }

    /* output */
    .t17-out {
      flex:1; overflow-y:auto; padding:10px 20px 6px; scroll-behavior:smooth;
    }
    .t17-out::-webkit-scrollbar { width:4px; }
    .t17-out::-webkit-scrollbar-track { background:transparent; }
    .t17-out::-webkit-scrollbar-thumb { background:#222; border-radius:2px; }

    .t17-line { white-space:pre-wrap; word-break:break-word; min-height:calc(14px * 1.45); }
    .t17-gap  { min-height:calc(14px * 1.45 * 0.6); }
    .t17-echo { display:flex; }
    .t17-echo-cmd { color:#E2E2E2; }
    .t17-tw { animation:t17twIn 0.06s ease-out both; }
    @keyframes t17twIn { from{opacity:0} to{opacity:1} }

    /* colors */
    .cg  { color:#33FF66; }
    .cgd { color:#20C24C; }
    .cgr { color:#B8B8B8; }
    .csd { color:#5C5C5C; }
    .cb  { color:#5DA9FF; }
    .cy  { color:#D4A843; }
    .cr  { color:#CC5555; }
    .cw  { color:#E2E2E2; }
    .bo  { font-weight:700; }

    /* input row */
    .t17-inp-row {
      display:flex; align-items:center; padding:5px 20px 13px;
      border-top:1px solid #181818; flex-shrink:0;
    }
    .t17-ps { white-space:nowrap; flex-shrink:0; }
    .t17-ps-u { color:#33FF66; }
    .t17-ps-a { color:#5C5C5C; }
    .t17-ps-h { color:#20C24C; }
    .t17-ps-c { color:#5C5C5C; }
    .t17-ps-p { color:#5DA9FF; }
    .t17-ps-s { color:#33FF66; }
    .t17-inp {
      flex:1; background:transparent; border:none; outline:none;
      color:#E2E2E2; font-family:inherit; font-size:14px;
      line-height:1.45; caret-color:#33FF66;
    }
    .t17-inp::selection { background:#0F6E2A; color:#E2E2E2; }
    .t17-cursor {
      display:inline-block; width:8px; height:calc(14px * 1.1);
      background:#33FF66; vertical-align:text-bottom; flex-shrink:0;
      animation:t17cblink 1.25s step-end infinite;
    }
    @keyframes t17cblink { 0%,49%{opacity:1} 50%,100%{opacity:0} }

    @media(max-width:640px) {
      .t17 { font-size:12px; }
      .t17-out { padding:8px 12px 4px; }
      .t17-inp-row { padding:4px 12px 10px; }
    }
    `;

    const hasInitializedOut = useRef(false);

    useEffect(() => {
        const root = rootRef.current;
        const outEl = outRef.current;
        const inpEl = inpRef.current;
        const termEl = termRef.current;
        if (!root || !outEl || !inpEl || !termEl) return;

        // ── html helpers ───────────────────────────────────────────────
        const h = (s: string) => String(s || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // ── state (stable across re-renders) ──────────────────────────────────────────
        if (!S.current) {
            S.current = { cwd: '~', hist: [] as string[], hIdx: 0 };
        }
        const state = S.current;

        // ── context-aware data ──────────────────────────────────────────
        const projNames = projectList.map(p => p.name + '/');
        const FS: Record<string, string[]> = {
            '~': ['projects/', 'docs/', '.config/', 'resume.txt', '.bashrc', '.gitconfig'],
            '~/projects': projNames.length ? projNames : ['example-project/'],
        };
        projectList.forEach(p => {
            FS[`~/projects/${p.name}`] = ['README.md', 'Makefile', 'src/'];
        });
        FS['~/docs'] = ['notes.txt', 'reading-list.txt'];
        FS['~/.config'] = ['nvim/', 'tmux.conf', 'alacritty.yml'];

        const skillsBlock = skills.map(s => `  ${s}`).join('\n');
        const expBlock = experience.length
            ? experience.map(e =>
                `  ${e.period ? `${e.period}  ` : ''}${e.company}  —  ${e.role}${e.bullets?.length ? '\n' + e.bullets.map((b: string) => `    · ${b}`).join('\n') : ''}`
            ).join('\n\n')
            : `  No experience data provided yet.`;

        const FILES: Record<string, string> = {
            '~/.bashrc': `# ~/.bashrc — ${name}\nexport EDITOR=nvim\nexport VISUAL=nvim\nexport TERM=xterm-256color\n\nalias ll='ls -lah --color=auto'\nalias gs='git status'\nalias vim='nvim'\nalias cat='bat --style=plain'\nalias grep='rg'\nalias find='fd'`,
            '~/.gitconfig': `[user]\n    name  = ${name}\n    email = ${email}\n\n[core]\n    editor = nvim\n    pager  = delta\n\n[alias]\n    lg = log --oneline --graph --decorate --all\n    st = status -sb`,
            // @ts-ignore - Ignore bullets type mapping
            '~/resume.txt': `${name.toUpperCase()}\n${'─'.repeat(60)}\n${roleStr}\n${email}  |  ${location}\n\n\nEXPERIENCE\n${'─'.repeat(60)}\n${expBlock}\n\n\nSKILLS\n${'─'.repeat(60)}\n${skillsBlock}`,
            '~/docs/notes.txt': `# working notes\n\n## active\n- exploring new projects\n- writing more tests\n\n## tools i use daily\n  git, tmux, nvim, ripgrep`,
            '~/docs/reading-list.txt': `# reading list\n\n## books\n  Linux Kernel Development — Love      [done]\n  Systems Performance     — Gregg      [in progress]\n\n## blogs\n  lwn.net\n  brendangregg.com\n  jvns.ca`,
        };
        projectList.forEach(p => { FILES[`~/projects/${p.name}/README.md`] = p.readme; });
        if (projectList.length === 0) { FILES['~/projects/example-project/README.md'] = 'Example project — add your projects via the portfolio editor.'; }

        // ── output helpers ─────────────────────────────────────────────
        function emit(html: string, cls = 't17-line t17-tw') {
            if (!outEl) return;
            const d = document.createElement('div');
            d.className = cls;
            d.innerHTML = html;
            outEl.appendChild(d);
            outEl.scrollTop = outEl.scrollHeight;
        }
        function gap() { emit('', 't17-gap'); }
        function buildPS() {
            return `<span class="t17-ps-u">${h(slug)}</span><span class="t17-ps-a">@</span><span class="t17-ps-h">${host}</span><span class="t17-ps-c">:</span><span class="t17-ps-p" id="t17-ps-path">${h(state.cwd)}</span><span class="t17-ps-s">$ </span>`;
        }
        function promptEcho(cmd: string) {
            if (!outEl) return;
            const d = document.createElement('div');
            d.className = 't17-echo';
            d.innerHTML = buildPS() + `<span class="t17-echo-cmd">${h(cmd)}</span>`;
            outEl.appendChild(d);
        }
        function updatePrompt() {
            const pEl = document.getElementById('t17-ps-path');
            if (pEl) pEl.textContent = state.cwd;
            if (tbLabelRef.current)
                tbLabelRef.current.textContent = `${slug}@${host}: ${state.cwd} — bash 5.1.16`;
        }

        // ── path resolution ────────────────────────────────────────────
        function resolvePath(target?: string): string {
            if (!target) return state.cwd;
            if (target === '~') return '~';
            if (target.startsWith('~/')) return target;
            if (target === '..') {
                if (state.cwd === '~') return '~';
                const parts = state.cwd.split('/');
                parts.pop();
                return parts.join('/') || '~';
            }
            if (state.cwd === '~') return '~/' + target;
            return state.cwd + '/' + target;
        }

        // ── commands ───────────────────────────────────────────────────
        const CMD: Record<string, () => string> = {
            help: () => {
                const nav = `<span class="cy">Navigation</span>\n  <span class="cg">ls</span>              <span class="cgr">list directory contents</span>\n  <span class="cg">cd [dir]</span>        <span class="cgr">change directory</span>\n  <span class="cg">pwd</span>             <span class="cgr">print working directory</span>\n  <span class="cg">cat [file]</span>      <span class="cgr">display file contents</span>\n  <span class="cg">clear</span>           <span class="cgr">clear the terminal</span>`;
                
                let port = `<span class="cy">Portfolio</span>`;
                if (showHero) port += `\n  <span class="cg">about</span>           <span class="cgr">who I am</span>\n  <span class="cg">whoami</span>          <span class="cgr">current user info</span>`;
                if (showProjects) port += `\n  <span class="cg">projects</span>        <span class="cgr">browse projects</span>`;
                if (showSkills) port += `\n  <span class="cg">skills</span>          <span class="cgr">technical skills</span>`;
                if (showResume) port += `\n  <span class="cg">experience</span>      <span class="cgr">work history</span>\n  <span class="cg">cat resume.txt</span>  <span class="cgr">full résumé</span>`;
                if (showContact) port += `\n  <span class="cg">contact</span>         <span class="cgr">how to reach me</span>`;

                const sys = `<span class="cy">System</span>\n  <span class="cg">uname -a</span>        <span class="cgr">system info</span>\n  <span class="cg">uptime</span>          <span class="cgr">system uptime</span>\n  <span class="cg">history</span>         <span class="cgr">command history</span>${showContact ? '\n  <span class="cg">sudo hire-me</span>   <span class="cgr">...</span>' : ''}`;

                return `<span class="cw bo">Available commands</span>\n<span class="csd">────────────────────────────────────────────────</span>\n\n${nav}\n\n${port}\n\n${sys}\n\n<span class="csd">↑ / ↓  history   ·   Tab  autocomplete   ·   Ctrl-L  clear</span>`;
            },

            about: () =>
                `<span class="cw bo">${h(name)}</span>\n<span class="csd">────────────────────────────────────────────────</span>\n\n<span class="cgr">${h(bio)}</span>\n\n<span class="csd">Role      :</span> <span class="cw">${h(roleStr)}</span>\n<span class="csd">Location  :</span> <span class="cb">${h(location)}</span>\n<span class="csd">Email     :</span> <span class="cb">${h(email)}</span>`,

            whoami: () =>
                `<span class="cw">${h(slug)}</span>\n<span class="csd">uid=1000(${h(slug)}) gid=1000(${h(slug)}) groups=1000(${h(slug)}),27(sudo),999(docker)</span>`,

            projects: () => {
                if (projectList.length === 0)
                    return `<span class="csd">No projects found. Add them via the portfolio editor.</span>`;
                return projectList.map((p, i) =>
                    `<span class="csd">drwxr-xr-x</span>  <span class="cy bo">${h(p.name)}/</span>\n` +
                    `<span class="csd">           </span>  <span class="cgr">${h(p.desc.slice(0, 80))}</span>\n` +
                    `<span class="csd">           </span>  <span class="cgd">${h(p.tech)}</span>` +
                    (i < projectList.length - 1 ? '\n' : '')
                ).join('\n') + `\n\n<span class="cgd">Explore: cd projects/${projectList[0]?.name} && cat README.md</span>`;
            },

            skills: () => {
                const bars = ['████████████', '██████████░░', '████████░░░░'];
                const levels = ['expert', 'advanced', 'proficient'];
                return `<span class="cw bo">Skills</span>\n<span class="csd">────────────────────────────────────────────────</span>\n\n` +
                    skills.map((s, i) =>
                        `  <span class="cg">${h(s.padEnd(18))}</span>  <span class="cg">${bars[i % 3]}</span> <span class="csd">${levels[i % 3]}</span>`
                    ).join('\n');
            },

            experience: () => {
                if (!experience.length)
                    return `<span class="csd">No experience data yet. Add it via the portfolio editor.</span>`;
                return `<span class="cw bo">Work Experience</span>\n<span class="csd">${'─'.repeat(60)}</span>\n\n` +
                    experience.map(e =>
                        `  <span class="cg">${h(e.period)}</span>  <span class="cw bo">${h(e.company)}</span>  –  <span class="cgr">${h(e.role)}</span>` +
                        (e.bullets?.length ? '\n' + e.bullets.map((b: string) => `  <span class="cgr">  · ${h(b.slice(0, 80))}</span>`).join('\n') : '')
                    ).join('\n\n');
            },

            contact: () =>
                `<span class="cw bo">Contact</span>\n<span class="csd">────────────────────────────────────────────────</span>\n\n  <span class="csd">email     </span>  <span class="cb">${h(email)}</span>\n  <span class="csd">location  </span>  <span class="cgr">${h(location)}</span>\n\n<span class="csd">Prefer email. Response time &lt;24h on weekdays.</span>`,

            'sudo hire-me': () =>
                `<span class="csd">[sudo] password for ${h(slug)}: </span><span class="cw">••••••••</span>\n\n<span class="cg">✓ Authentication successful.</span>\n<span class="cw bo">Executing hire-me with elevated privileges...</span>\n\n  <span class="cg">[PASS]</span> <span class="cgr">Technical skills verified</span>\n  <span class="cg">[PASS]</span> <span class="cgr">Projects reviewed</span>\n  <span class="cg">[PASS]</span> <span class="cgr">Open to conversations</span>\n\n<span class="cw bo">Result: HIRE_APPROVED=1</span>\n\n  1. Email: <span class="cb">${h(email)}</span>\n  2. Subject: <span class="cgr">"hire-me [your company]"</span>`,

            'uname -a': () =>
                `Linux ${host} 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux`,

            uptime: () => {
                const t = new Date().toTimeString().split(' ')[0];
                return ` ${t} up 12 days, 4:22,  1 user,  load average: 0.42, 0.38, 0.34`;
            },

            pwd: () => state.cwd,

            history: () => {
                if (!state.hist.length) return '<span class="csd">(no history)</span>';
                return state.hist.slice(-20).map((c, i) =>
                    `  <span class="csd">${String(i + 1).padStart(4)}</span>  <span class="cgr">${h(c)}</span>`
                ).join('\n');
            },
        };

        // ── command processor ──────────────────────────────────────────
        function run(raw: string) {
            const cmd = raw.trim();
            if (!cmd) return;
            if (state.hist[state.hist.length - 1] !== cmd) state.hist.push(cmd);
            state.hIdx = state.hist.length;
            promptEcho(cmd);
            gap();

            const lo = cmd.toLowerCase();
            const args = cmd.split(/\s+/);
            const base = args[0].toLowerCase();

            if (lo === 'clear' || lo === 'cls') { outEl!.innerHTML = ''; return; }

            // simple commands
            const SIMPLE: Record<string, string> = {
                help: 'help', '?': 'help', man: 'help',
                about: 'about', bio: 'about',
                whoami: 'whoami', id: 'whoami',
                projects: 'projects',
                skills: 'skills',
                experience: 'experience', work: 'experience',
                contact: 'contact', email_: 'contact',
                'sudo hire-me': 'sudo hire-me',
                'uname -a': 'uname -a', uname: 'uname -a',
                uptime: 'uptime',
                pwd: 'pwd',
                history: 'history',
            };
            if (SIMPLE[lo]) {
                const cmdRef = SIMPLE[lo];
                if (cmdRef === 'about' && !showHero) { /* skip */ }
                else if (cmdRef === 'whoami' && !showHero) { /* skip */ }
                else if (cmdRef === 'projects' && !showProjects) { /* skip */ }
                else if (cmdRef === 'skills' && !showSkills) { /* skip */ }
                else if (cmdRef === 'experience' && !showResume) { /* skip */ }
                else if (cmdRef === 'contact' && !showContact) { /* skip */ }
                else if (cmdRef === 'sudo hire-me' && !showContact) { /* skip */ }
                else {
                    emit(CMD[cmdRef]()); gap(); return;
                }
            }

            // ls
            if (base === 'ls') {
                const target = args.find(a => !a.startsWith('-') && a !== 'ls');
                const path = target ? resolvePath(target) : state.cwd;
                const dir = FS[path];
                if (!dir) {
                    emit(`<span class="cr">ls: cannot access '${h(target || state.cwd)}': No such file or directory</span>`);
                } else {
                    emit(dir.map(n =>
                        `<span class="${n.endsWith('/') ? 'cy' : 'cw'}">${h(n)}</span>`
                    ).join('  '));
                }
                gap(); return;
            }

            // cd
            if (base === 'cd') {
                const target = args[1];
                const resolved = resolvePath(target);
                if (FS[resolved] || target === '..') {
                    state.cwd = target === '..' ? resolvePath('..') : resolved;
                    updatePrompt();
                } else {
                    emit(`<span class="cr">bash: cd: ${h(target || '')}: No such file or directory</span>`);
                }
                gap(); return;
            }

            // cat
            if (base === 'cat') {
                const fname = args.slice(1).join(' ').trim();
                if (!fname) { emit(`<span class="csd">^C</span>`); gap(); return; }
                const resolved = resolvePath(fname);
                if (FILES[resolved]) {
                    emit(`<span class="cgr">${h(FILES[resolved])}</span>`);
                } else if (FS[resolved]) {
                    emit(`<span class="cr">cat: ${h(fname)}: Is a directory</span>`);
                } else {
                    emit(`<span class="cr">cat: ${h(fname)}: No such file or directory</span>`);
                }
                gap(); return;
            }

            // echo
            if (base === 'echo') {
                emit(`<span class="cgr">${h(args.slice(1).join(' ').replace(/['"]/g, ''))}</span>`);
                gap(); return;
            }

            // easter eggs
            const EGGS: Record<string, string> = {
                vim: `<span class="cr">E: No file specified. Try: cat resume.txt</span>`,
                nvim: `<span class="cr">E: No file specified. Try: cat resume.txt</span>`,
                nano: `<span class="cr">Error: Portfolio is read-only.</span>`,
                emacs: `<span class="cr">Error: infinite loop in M-x write-resume. Try cat resume.txt</span>`,
                'git log': `<span class="cy">commit a3f9c12</span> <span class="csd">(HEAD -> main)</span>\n<span class="cgr">Author: ${h(name)} <${h(email)}>\n\n    feat(portfolio): terminal interface\n</span>`,
                'git status': `<span class="cgr">On branch main\nnothing to commit, working tree clean</span>`,
                top: `<span class="cgr">top — ${new Date().toTimeString().split(' ')[0]} up 12 days\nTasks: 200 total, 1 running\n%Cpu: 2.1 us, 0.8 sy</span>\n<span class="csd">(press q to quit)</span>`,
                neofetch: `<span class="cg">   .-/+oossssoo+/-.</span>   <span class="cw bo">${h(slug)}@${host}</span>\n<span class="cg">  :+ssssssssssssss+:</span>   <span class="csd">──────────────</span>\n<span class="cg"> -+ssssssssssssssss+-</span>  <span class="cgd">OS:</span> <span class="cgr">Ubuntu 22.04 x86_64</span>\n<span class="cg">.ossssssssssssssssso.</span>  <span class="cgd">Shell:</span> <span class="cgr">bash 5.1.16</span>`,
            };
            if (EGGS[lo]) { emit(EGGS[lo]); gap(); return; }

            emit(`<span class="cw">${h(args[0])}</span>: command not found`);
            gap();
        }

        // ── handlers ───────────────────────────────────────────────────
        const COMPLETIONS = ['help', 'about', 'whoami', 'projects', 'skills', 'experience', 'contact', 'clear', 'ls', 'cd', 'cat'];
        function onKeyDown(e: KeyboardEvent) {
            if (!inpEl) return;
            if (e.key === 'Enter') { const v = inpEl.value; inpEl.value = ''; run(v); return; }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (state.hIdx > 0) {
                    state.hIdx--;
                    inpEl.value = state.hist[state.hIdx];
                    setTimeout(() => { inpEl.selectionStart = inpEl.selectionEnd = inpEl.value.length; }, 0);
                } return;
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (state.hIdx < state.hist.length - 1) {
                    state.hIdx++;
                    inpEl.value = state.hist[state.hIdx];
                } else {
                    state.hIdx = state.hist.length;
                    inpEl.value = '';
                } return;
            }
            if (e.key === 'Tab') {
                e.preventDefault();
                const partial = inpEl.value.toLowerCase();
                if (!partial) return;
                const matches = COMPLETIONS.filter(c => c.startsWith(partial));
                if (matches.length === 1) inpEl.value = matches[0];
                else if (matches.length > 1) {
                    promptEcho(inpEl.value);
                    emit(`<span class="cgr">${matches.join('  ')}</span>`);
                    gap();
                }
            }
            if (e.ctrlKey && e.key === 'c') { e.preventDefault(); promptEcho(inpEl.value + '^C'); inpEl.value = ''; gap(); return; }
            if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) { e.preventDefault(); outEl!.innerHTML = ''; return; }
        }
        const onDocClick = () => { inpEl?.focus(); };
        inpEl.addEventListener('keydown', onKeyDown);
        // Removed root click listener as it's intercepted by EditableBlock in the builder

        return () => {
            inpEl.removeEventListener('keydown', onKeyDown);
        };
    }, [name, slug, host, email, location, bio, roleStr, skills, experience, projectList]);

    // ── Boot Sequence ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (bootPhase === 'done') return;

        const bootEl = bootRef.current;
        if (!bootEl) { setBootPhase('done'); return; }

        bootEl.innerHTML = '';
        const BOOT = [
            { t: `BIOS  v2.3.1 — Systems Inc.`, c: 't17-gray-d', d: 0 },
            { t: `CPU: Intel Core i9-13900K @ 5.80GHz`, c: 't17-gray-d', d: 150 },
            { t: `RAM: 64GiB DDR5-6000`, c: 't17-gray-d', d: 300 },
            { t: `Loading kernel: Linux 5.15.0-91-generic`, c: 't17-gray-d', d: 600 },
            { t: `[    0.319847] PCI: Using configuration type 1`, c: 't17-gray-d', d: 800 },
            { t: `Starting services...`, c: 't17-gray-d', d: 1100 },
            { t: `  [  OK  ] Started Journal Service.`, c: 't17-ok', d: 1300 },
            { t: `  [  OK  ] Reached target Network.`, c: 't17-ok', d: 1500 },
            { t: `  [  OK  ] Started Portfolio Service v1.0.`, c: 't17-ok', d: 1700 },
            { t: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', c: 't17-gray-d', d: 2000 },
            { t: `  ${msgRef.current}`, c: 't17-white', d: 2100 },
            { t: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', c: 't17-gray-d', d: 2200 },
        ];

        let maxD = 0;
        const timers: any[] = [];
        BOOT.forEach(line => {
            const el = document.createElement('div');
            el.className = `t17-bl ${line.c}`;
            el.textContent = line.t;
            bootEl.appendChild(el);
            maxD = Math.max(maxD, line.d);
            timers.push(setTimeout(() => el.classList.add('show'), line.d));
        });

        timers.push(setTimeout(() => {
            setBootPhase('done');
        }, maxD + 400));

        return () => timers.forEach(clearTimeout);
    }, []);

    // ── Mount Terminal ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (bootPhase !== 'done') return;
        
        const outEl = outRef.current;
        const inpEl = inpRef.current;
        if (!outEl || !inpEl) return;

        const h = (s: any) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const emit = (html: string, cls = 't17-line t17-tw') => {
            const d = document.createElement('div');
            d.className = cls;
            d.innerHTML = html;
            outEl.appendChild(d);
            outEl.scrollTop = outEl.scrollHeight;
        };
        const gap = () => emit('', 't17-gap');

        if (!hasInitializedOut.current) {
            hasInitializedOut.current = true;
            outEl.innerHTML = '';
            emit(`<span class="csd">Welcome, ${h(nameRef.current)}.</span>`);
            gap();
            emit(`<span class="cy bo">System ready. Type 'help' and press Enter to see available commands.</span>`);
            gap();
            inpEl.focus();
        }
    }, [bootPhase]);

    return (
        <div className="t17" ref={rootRef}>
            <style>{css}</style>

            {/* boot */}
            {bootPhase === 'booting' && (
                <div className="t17-boot" ref={bootRef} />
            )}

            {/* terminal */}
            <div 
                ref={termRef} 
                onClick={() => inpRef.current?.focus()} 
                style={{ display: bootPhase === 'done' ? 'flex' : 'none', flexDirection: 'column', height: '100%', cursor: 'text' }}
            >
                <EditableBlock id="header" className="t17-titlebar">
                    <div className="t17-dots">
                        <div className="t17-dot" />
                        <div className="t17-dot" />
                        <div className="t17-dot" />
                    </div>
                    <span className="t17-tblabel" ref={tbLabelRef}>
                        {name.toLowerCase().replace(/\s+/g, '').slice(0, 12)}@{host}: ~ — bash 5.1.16
                    </span>
                    <button className="t17-snd" title="Toggle sound">♪ off</button>
                </EditableBlock>

                <div className="flex-1 overflow-hidden relative">
                    <EditableBlock id="about" className="h-full">
                        <div className="t17-out h-full" ref={outRef} />
                    </EditableBlock>
                </div>

                <EditableBlock id="contact" className="t17-inp-row">
                    <span className="t17-ps">
                        <span className="t17-ps-u">{slug.slice(0, 12)}</span>
                        <span className="t17-ps-a">@</span>
                        <span className="t17-ps-h">{host}</span>
                        <span className="t17-ps-c">:</span>
                        <span className="t17-ps-p" ref={psPathRef}>~</span>
                        <span className="t17-ps-s">$ </span>
                    </span>
                    <input
                        ref={inpRef}
                        className="t17-inp"
                        type="text"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        aria-label="terminal input"
                    />
                    <span className="t17-cursor" />
                </EditableBlock>
            </div>
        </div>
    );
};
