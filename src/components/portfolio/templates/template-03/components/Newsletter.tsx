import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

interface ContactProps {
    contactEmail?: string;
    socials?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    };
    name?: string;
}

export default function Newsletter({ contactEmail, socials, name }: ContactProps) {
    const email = contactEmail || "";
    const displayName = name ? name.split(' ')[0] : "me";

    const socialLinks = [
        { icon: Github, href: socials?.github, label: "GitHub" },
        { icon: Linkedin, href: socials?.linkedin, label: "LinkedIn" },
        { icon: Twitter, href: socials?.twitter, label: "Twitter" },
    ].filter(s => s.href && s.href !== "linked");

    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900/50 shadow-sm">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 items-center">
                <Mail className="h-5 w-5 text-zinc-400" />
                <span className="ml-3">Get in touch</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Want to collaborate or just say hi? Reach out to {displayName} anytime.
            </p>

            {/* Email */}
            {email && (
                <a
                    href={`mailto:${email}`}
                    className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 
                               border border-zinc-100 dark:border-zinc-700/50 
                               hover:border-[color:var(--brand-primary)] hover:bg-blue-50/50 dark:hover:bg-blue-950/20
                               transition-all duration-200 group"
                >
                    <Mail className="w-4 h-4 text-zinc-400 group-hover:text-[color:var(--brand-primary)] transition-colors" />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-[color:var(--brand-primary)] transition-colors">
                        {email}
                    </span>
                </a>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
                <div className="mt-4 flex gap-3">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium
                                       text-zinc-500 dark:text-zinc-400 
                                       bg-zinc-50 dark:bg-zinc-800/50 
                                       border border-zinc-100 dark:border-zinc-700/50
                                       hover:text-[color:var(--brand-primary)] hover:border-[color:var(--brand-primary)]
                                       transition-all duration-200"
                            title={social.label}
                        >
                            <social.icon className="w-3.5 h-3.5" />
                            {social.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}
