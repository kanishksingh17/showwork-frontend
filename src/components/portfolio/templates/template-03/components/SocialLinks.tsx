import { CustomIcon } from './CustomIcon';
import { cn } from '@/lib/utils';

export default function SocialLinks({ className, user }: { className?: string, user?: any }) {
    const displayEmail = user?.email;

    const links = [
        ...(user?.socials?.github ? [{ name: 'Github', icon: 'github', href: user.socials.github, external: true }] : []),
        ...(user?.socials?.twitter ? [{ name: 'Twitter', icon: 'x', href: user.socials.twitter, external: true }] : []),
        ...(user?.socials?.linkedin ? [{ name: 'Linkedin', icon: 'linkedin', href: user.socials.linkedin, external: true }] : []),
        ...(user?.socialLinks?.github ? [{ name: 'Github', icon: 'github', href: user.socialLinks.github, external: true }] : []),
        ...(user?.socialLinks?.twitter ? [{ name: 'Twitter', icon: 'x', href: user.socialLinks.twitter, external: true }] : []),
        ...(user?.socialLinks?.linkedin ? [{ name: 'Linkedin', icon: 'linkedin', href: user.socialLinks.linkedin, external: true }] : []),
    ];

    // Deduplicate links by name
    let uniqueLinks = Array.from(new Map(links.map(item => [item.name, item])).values());

    // Fallback for Raj Singh if no links provided
    if (uniqueLinks.length === 0) {
        uniqueLinks = [
            { name: 'Github', icon: 'github', href: 'https://github.com', external: true },
            { name: 'X', icon: 'x', href: 'https://twitter.com', external: true },
            { name: 'Linkedin', icon: 'linkedin', href: 'https://linkedin.com', external: true },
        ];
    }

    return (
        <div className={cn("mt-6 flex items-center gap-4", className)}>
            {uniqueLinks.map((link: any) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Follow on ${link.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                    <CustomIcon name={link.icon} size={20} />
                    <span className="sr-only">{link.name}</span>
                </a>
            ))}
            {displayEmail && (
                <a
                    href={`mailto:${displayEmail}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label='Email'
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <CustomIcon name='email' />
                    <span className="sr-only">Email</span>
                </a>
            )}
        </div>
    )
}
