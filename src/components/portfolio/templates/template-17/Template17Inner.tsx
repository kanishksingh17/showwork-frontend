import React, { useEffect, useRef } from 'react';
import type { PortfolioTemplateProps } from '../withPortfolioTemplate';

export const Template17Inner: React.FC<PortfolioTemplateProps> = ({ userData, projects }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const outRef = useRef<HTMLDivElement>(null);
    const inpRef = useRef<HTMLInputElement>(null);
    const bootRef = useRef<HTMLDivElement>(null);
    const termRef = useRef<HTMLDivElement>(null);
    const psPathRef = useRef<HTMLSpanElement>(null);
    const tbLabelRef = useRef<HTMLSpanElement>(null);

    // ── derive user info ────────────────────────────────────────────────────
    const name = userData?.name || 'developer';
    const slug = name.toLowerCase().replace(/\s+/g, '');
    const host = 'system';
    const email = userData?.email || `${slug}@dev.io`;
    const location = userData?.location || 'Remote';
    const bio = userData?.tagline || userData?.bio || 'Systems engineer. I write code that talks to hardware.';
    const roleStr = userData?.role || userData?.title || 'Systems Engineer';
    const skills: string[] = userData?.skills || ['C', 'Rust', 'Go', 'eBPF', 'Linux'];
    const github = userData?.socials?.github || userData?.socialLinks?.github || `github.com/${slug}`;
    const linkedin = userData?.socials?.linkedin || userData?.socialLinks?.linkedin || `linkedin.com/in/${slug}`;

    // ── derive experience ───────────────────────────────────────────────────
    const experience: { period: string; company: string; role: string; bullets: string[] }[] =
        (userData?.experience || []).slice(0, 4).map((exp: any) => ({
            period: exp.period || exp.duration || exp.date || '?',
            company: exp.company || exp.employer || '?',
            role: exp.role || exp.position || roleStr,
            bullets: exp.description
                ? [exp.description]
                : (exp.bullets || []),
        }));

    // ── derive projects / filesystem ────────────────────────────────────────
    const projectList = (projects || []).slice(0, 4).map((p: any) => ({
        name: (p.title || p.name || 'project').toLowerCase().replace(/\s+/g, '-'),
        title: p.title || p.name,
        desc: p.description || p.summary || '',
        tech: Array.isArray(p.tech) ? p.tech.join(', ') : (p.tech || p.category || ''),
        readme: `${p.title || p.name}\n${'═'.repeat(60)}\n\n${p.description || p.summary || ''}\n\nTech: ${Array.isArray(p.tech) ? p.tech.join(', ') : (p.tech || '')}`,
    }));

    // ── CSS ─────────────────────────────────────────────────────────────────
    const css = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');

    .t17 *,.t17 *::before,.t17 *::after { margin:0; padding:0; box-sizing:border-box; }
    .t17 {
      width:100%; height:100vh;
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

    useEffect(() => {
        const root = rootRef.current;
        const outEl = outRef.current;
        const inpEl = inpRef.current;
        const bootEl = bootRef.current;
        const termEl = termRef.current;
        if (!root || !outEl || !inpEl || !bootEl || !termEl) return;

        // ── state ──────────────────────────────────────────────────────
        const S = { cwd: '~', hist: [] as string[], hIdx: 0 };

        // ── filesystem ─────────────────────────────────────────────────
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

        // ── file contents ──────────────────────────────────────────────
        const skillsBlock = skills.map(s => `  ${s}`).join('\n');
        const expBlock = experience.length
            ? experience.map(e =>
                `  ${e.period ? `${e.period}  ` : ''}${e.company}  —  ${e.role}${e.bullets?.length ? '\n' + e.bullets.map((b: string) => `    · ${b}`).join('\n') : ''}`
            ).join('\n\n')
            : `  No experience data provided yet.`;

        const FILES: Record<string, string> = {
            '~/.bashrc': `# ~/.bashrc — ${name}\nexport EDITOR=nvim\nexport VISUAL=nvim\nexport TERM=xterm-256color\n\nalias ll='ls -lah --color=auto'\nalias gs='git status'\nalias vim='nvim'\nalias cat='bat --style=plain'\nalias grep='rg'\nalias find='fd'`,
            '~/.gitconfig': `[user]\n    name  = ${name}\n    email = ${email}\n\n[core]\n    editor = nvim\n    pager  = delta\n\n[alias]\n    lg = log --oneline --graph --decorate --all\n    st = status -sb`,
            '~/resume.txt': `${name.toUpperCase()}\n${'─'.repeat(60)}\n${roleStr}\n${email}  |  ${location}\n\n\nEXPERIENCE\n${'─'.repeat(60)}\n${expBlock}\n\n\nSKILLS\n${'─'.repeat(60)}\n${skillsBlock}`,
            '~/docs/notes.txt': `# working notes\n\n## active\n- exploring new projects\n- writing more tests\n\n## tools i use daily\n  git, tmux, nvim, ripgrep`,
            '~/docs/reading-list.txt': `# reading list\n\n## books\n  Linux Kernel Development — Love      [done]\n  Systems Performance     — Gregg      [in progress]\n\n## blogs\n  lwn.net\n  brendangregg.com\n  jvns.ca`,
        };

        // add project READMEs
        projectList.forEach(p => {
            FILES[`~/projects/${p.name}/README.md`] = p.readme;
        });
        if (projectList.length === 0) {
            FILES['~/projects/example-project/README.md'] = 'Example project — add your projects via the portfolio editor.';
        }

        // ── html helpers ───────────────────────────────────────────────
        const h = (s: string) => String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // ── output helpers ─────────────────────────────────────────────
        function emit(html: string, cls = 't17-line t17-tw') {
            const d = document.createElement('div');
            d.className = cls;
            d.innerHTML = html;
            outEl!.appendChild(d);
            outEl!.scrollTop = outEl!.scrollHeight;
        }
        function gap() { emit('', 't17-gap'); }
        function buildPS() {
            return `<span class="t17-ps-u">${h(slug)}</span><span class="t17-ps-a">@</span><span class="t17-ps-h">${host}</span><span class="t17-ps-c">:</span><span class="t17-ps-p" id="t17-ps-path">${h(S.cwd)}</span><span class="t17-ps-s">$ </span>`;
        }
        function promptEcho(cmd: string) {
            const d = document.createElement('div');
            d.className = 't17-echo';
            d.innerHTML = buildPS() + `<span class="t17-echo-cmd">${h(cmd)}</span>`;
            outEl!.appendChild(d);
        }
        function updatePrompt() {
            const pEl = document.getElementById('t17-ps-path');
            if (pEl) pEl.textContent = S.cwd;
            if (tbLabelRef.current)
                tbLabelRef.current.textContent = `${slug}@${host}: ${S.cwd} — bash 5.1.16`;
        }

        // ── path resolution ────────────────────────────────────────────
        function resolvePath(target?: string): string {
            if (!target) return S.cwd;
            if (target === '~') return '~';
            if (target.startsWith('~/')) return target;
            if (target === '..') {
                if (S.cwd === '~') return '~';
                const parts = S.cwd.split('/');
                parts.pop();
                return parts.join('/') || '~';
            }
            if (S.cwd === '~') return '~/' + target;
            return S.cwd + '/' + target;
        }

        // ── commands ───────────────────────────────────────────────────
        const CMD: Record<string, () => string> = {
            help: () =>
                `<span class="cw bo">Available commands</span>
<span class="csd">────────────────────────────────────────────────</span>

  <span class="cy">Navigation</span>
  <span class="cg">ls</span>              <span class="cgr">list directory contents</span>
  <span class="cg">cd</span> <span class="cb">[dir]</span>        <span class="cgr">change directory</span>
  <span class="cg">pwd</span>             <span class="cgr">print working directory</span>
  <span class="cg">cat</span> <span class="cb">[file]</span>      <span class="cgr">display file contents</span>
  <span class="cg">clear</span>           <span class="cgr">clear the terminal</span>

  <span class="cy">Portfolio</span>
  <span class="cg">about</span>           <span class="cgr">who I am</span>
  <span class="cg">whoami</span>          <span class="cgr">current user info</span>
  <span class="cg">projects</span>        <span class="cgr">browse projects</span>
  <span class="cg">skills</span>          <span class="cgr">technical skills</span>
  <span class="cg">experience</span>      <span class="cgr">work history</span>
  <span class="cg">contact</span>         <span class="cgr">how to reach me</span>
  <span class="cg">cat resume.txt</span>  <span class="cgr">full résumé</span>

  <span class="cy">System</span>
  <span class="cg">uname -a</span>        <span class="cgr">system info</span>
  <span class="cg">uptime</span>          <span class="cgr">system uptime</span>
  <span class="cg">history</span>         <span class="cgr">command history</span>
  <span class="cg">sudo hire-me</span>   <span class="cgr">...</span>

<span class="csd">↑ / ↓  history   ·   Tab  autocomplete   ·   Ctrl-L  clear</span>`,

            about: () =>
                `<span class="cw bo">${h(name)}</span>
<span class="csd">────────────────────────────────────────────────</span>

<span class="cgr">${h(bio)}</span>

<span class="csd">Role      :</span> <span class="cw">${h(roleStr)}</span>
<span class="csd">Location  :</span> <span class="cb">${h(location)}</span>
<span class="csd">Email     :</span> <span class="cb">${h(email)}</span>
<span class="csd">GitHub    :</span> <span class="cb">${h(github)}</span>`,

            whoami: () =>
                `<span class="cw">${h(slug)}</span>
<span class="csd">uid=1000(${h(slug)}) gid=1000(${h(slug)}) groups=1000(${h(slug)}),27(sudo),999(docker)</span>`,

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
                `<span class="cw bo">Contact</span>
<span class="csd">────────────────────────────────────────────────</span>

  <span class="csd">email     </span>  <span class="cb">${h(email)}</span>
  <span class="csd">github    </span>  <span class="cb">${h(github)}</span>
  <span class="csd">linkedin  </span>  <span class="cb">${h(linkedin)}</span>
  <span class="csd">location  </span>  <span class="cgr">${h(location)}</span>

<span class="csd">Prefer email. Response time &lt;24h on weekdays.</span>`,

            'sudo hire-me': () =>
                `<span class="csd">[sudo] password for ${h(slug)}: </span><span class="cw">••••••••</span>

<span class="cg">✓ Authentication successful.</span>
<span class="cw bo">Executing hire-me with elevated privileges...</span>

  <span class="cg">[PASS]</span> <span class="cgr">Technical skills verified</span>
  <span class="cg">[PASS]</span> <span class="cgr">Projects reviewed</span>
  <span class="cg">[PASS]</span> <span class="cgr">Open to conversations</span>

<span class="cw bo">Result: HIRE_APPROVED=1</span>

  1. Email: <span class="cb">${h(email)}</span>
  2. Subject: <span class="cgr">"hire-me [your company]"</span>`,

            'uname -a': () =>
                `Linux ${host} 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux`,

            uptime: () => {
                const t = new Date().toTimeString().split(' ')[0];
                return ` ${t} up 12 days, 4:22,  1 user,  load average: 0.42, 0.38, 0.34`;
            },

            pwd: () => S.cwd,

            history: () => {
                if (!S.hist.length) return '<span class="csd">(no history)</span>';
                return S.hist.slice(-20).map((c, i) =>
                    `  <span class="csd">${String(i + 1).padStart(4)}</span>  <span class="cgr">${h(c)}</span>`
                ).join('\n');
            },
        };

        // ── command processor ──────────────────────────────────────────
        function run(raw: string) {
            const cmd = raw.trim();
            if (!cmd) return;
            if (S.hist[S.hist.length - 1] !== cmd) S.hist.push(cmd);
            S.hIdx = S.hist.length;
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
            if (SIMPLE[lo]) { emit(CMD[SIMPLE[lo]]()); gap(); return; }

            // ls
            if (base === 'ls') {
                const flags = args.filter(a => a.startsWith('-')).join('');
                const target = args.find(a => !a.startsWith('-') && a !== 'ls');
                const path = target ? resolvePath(target) : S.cwd;
                const dir = FS[path];
                if (!dir) {
                    emit(`<span class="cr">ls: cannot access '${h(target || S.cwd)}': No such file or directory</span>`);
                } else if (flags.includes('l')) {
                    emit(`<span class="csd">total ${dir.length * 4}</span>`);
                    dir.forEach(n => {
                        const isD = n.endsWith('/');
                        emit(`<span class="csd">${isD ? 'drwxr-xr-x' : '-rw-r--r--'}  1  ${h(slug)}  4096  Jan  1  2024  </span><span class="${isD ? 'cy' : 'cw'}">${h(n)}</span>`);
                    });
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
                    S.cwd = target === '..' ? resolvePath('..') : resolved;
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

            // sudo catch-all
            if (base === 'sudo' && lo !== 'sudo hire-me') {
                emit(`<span class="cr">sudo: ${h(args[1] || 'command')}: command not found</span>`);
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

            emit(`<span class="cw">${h(args[0])}: command not found</span>\n<span class="csd">Type 'help' to see available commands.</span>`);
            gap();
        }

        // ── input handling ─────────────────────────────────────────────
        const COMPLETIONS = [
            'help', 'about', 'whoami', 'projects', 'skills', 'experience', 'contact',
            'clear', 'pwd', 'ls', 'ls -la', 'cd', 'cd projects', 'cd ..', 'cd ~',
            'cat', 'cat resume.txt', 'cat .bashrc', 'cat .gitconfig',
            'sudo hire-me', 'uname -a', 'uptime', 'history',
            'git log', 'git status', 'neofetch', 'top', 'vim', 'nvim',
        ];

        function onKeyDown(e: KeyboardEvent) {
            if (!inpEl) return;
            if (e.key === 'Enter') {
                const v = inpEl.value; inpEl.value = '';
                run(v); S.hIdx = S.hist.length; return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (S.hIdx > 0) { S.hIdx--; inpEl.value = S.hist[S.hIdx]; setTimeout(() => { inpEl.selectionStart = inpEl.selectionEnd = inpEl.value.length; }, 0); } return;
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (S.hIdx < S.hist.length - 1) { S.hIdx++; inpEl.value = S.hist[S.hIdx]; } else { S.hIdx = S.hist.length; inpEl.value = ''; } return;
            }
            if (e.key === 'Tab') {
                e.preventDefault();
                const partial = inpEl.value.toLowerCase();
                if (!partial) return;
                const matches = COMPLETIONS.filter(c => c.toLowerCase().startsWith(partial));
                if (matches.length === 1) { inpEl.value = matches[0]; }
                else if (matches.length > 1) { promptEcho(inpEl.value); emit(`<span class="cgr">${matches.join('  ')}</span>`); gap(); }
                return;
            }
            if (e.ctrlKey && e.key === 'c') { e.preventDefault(); promptEcho(inpEl.value + '^C'); inpEl.value = ''; gap(); return; }
            if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) { e.preventDefault(); outEl!.innerHTML = ''; return; }
            if (e.ctrlKey && e.key === 'u') { e.preventDefault(); inpEl.value = ''; return; }
        }
        inpEl.addEventListener('keydown', onKeyDown);

        const onDocClick = () => inpEl?.focus();
        root.addEventListener('click', onDocClick);

        // ── boot sequence ──────────────────────────────────────────────
        const BOOT = [
            { t: `BIOS  v2.3.1 — ${name} Systems Inc.`, c: 't17-gray-d', d: 0 },
            { t: `CPU: Intel Core i9-13900K @ 5.80GHz`, c: 't17-gray-d', d: 90 },
            { t: `RAM: 64GiB DDR5-6000`, c: 't17-gray-d', d: 160 },
            { t: '', c: 't17-gray-d', d: 220 },
            { t: `Loading kernel: Linux 5.15.0-91-generic`, c: 't17-gray-d', d: 300 },
            { t: `[    0.000000] Booting Linux on physical CPU 0x0`, c: 't17-gray-d', d: 380 },
            { t: `[    0.319847] PCI: Using configuration type 1`, c: 't17-gray-d', d: 450 },
            { t: `[    0.841203] NET: Registered PF_INET6 protocol`, c: 't17-gray-d', d: 520 },
            { t: `[    1.337821] systemd v249 running in system mode.`, c: 't17-gray-d', d: 590 },
            { t: '', c: 't17-gray-d', d: 650 },
            { t: `Starting services...`, c: 't17-gray-d', d: 720 },
            { t: `  [  OK  ] Started Journal Service.`, c: 't17-ok', d: 800 },
            { t: `  [  OK  ] Reached target Network.`, c: 't17-ok', d: 870 },
            { t: `  [  OK  ] Started Portfolio Service v1.0.`, c: 't17-ok', d: 940 },
            { t: '', c: 't17-gray-d', d: 1010 },
            { t: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', c: 't17-gray-d', d: 1080 },
            { t: `  Portfolio v1.0`, c: 't17-white', d: 1130 },
            { t: `  Kernel 5.15.0 on x86_64 (tty1)`, c: 't17-gray-d', d: 1180 },
            { t: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', c: 't17-gray-d', d: 1230 },
            { t: '', c: 't17-gray-d', d: 1280 },
        ];

        let last = 0;
        BOOT.forEach(item => {
            const el = document.createElement('div');
            el.className = `t17-bl ${item.c}`;
            el.textContent = item.t;
            bootEl.appendChild(el);
            last = Math.max(last, item.d);
            setTimeout(() => el.classList.add('show'), item.d);
        });

        const bootTimer = setTimeout(() => {
            bootEl.classList.add('gone');
            termEl.style.display = 'flex';
            emit(
                `<span class="cgr">Last login: ${new Date().toDateString()} from 127.0.0.1</span>\n` +
                `<span class="csd">Welcome, ${h(name)}.</span>`
            );
            gap();
            emit(`<span class="cgr">Type </span><span class="cg">help</span><span class="cgr"> to see available commands.</span>`);
            gap();
            inpEl.focus();
        }, last + 280);

        return () => {
            clearTimeout(bootTimer);
            inpEl.removeEventListener('keydown', onKeyDown);
            root.removeEventListener('click', onDocClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="t17" ref={rootRef}>
            <style>{css}</style>

            {/* boot */}
            <div className="t17-boot" ref={bootRef} />

            {/* terminal */}
            <div ref={termRef} style={{ display: 'none', flexDirection: 'column', height: '100%' }}>
                <div className="t17-titlebar">
                    <div className="t17-dots">
                        <div className="t17-dot" />
                        <div className="t17-dot" />
                        <div className="t17-dot" />
                    </div>
                    <span className="t17-tblabel" ref={tbLabelRef}>
                        {name.toLowerCase().replace(/\s+/g, '').slice(0, 12)}@{host}: ~ — bash 5.1.16
                    </span>
                    <button className="t17-snd" title="Toggle sound">♪ off</button>
                </div>

                <div className="t17-out" ref={outRef} />

                <div className="t17-inp-row">
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
                </div>
            </div>
        </div>
    );
};
