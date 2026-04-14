import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rss, Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Feed({ username }: { username?: string }) {
    const feedUrl = `https://showwork.in/${username || 'raj'}`
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(feedUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 bg-white dark:bg-zinc-900/50">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 items-center">
                <Rss className="h-5 w-5 text-zinc-400" />
                <span className="ml-3">Follow my portfolio</span>
            </h2>
            <p className="mt-4 ml-1 text-sm text-zinc-600 dark:text-zinc-400">
                Stay updated with my latest writing and projects at:
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-auto">
                    <div
                        className={cn("min-w-0 flex-auto rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 truncate",
                            copied ? 'text-[color:var(--brand-primary)]' : ''
                        )}
                    >
                        {feedUrl}
                    </div>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleCopy}
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-[color:var(--brand-primary)]" />
                        ) : (
                            <Copy className="h-4 w-4 text-zinc-400" />
                        )}
                        <span className="sr-only">
                            {copied ? 'Copied!' : 'Copy'}
                        </span>
                    </Button>
                </div>
                <Button
                    onClick={() => window.open(feedUrl, '_blank')}
                    className="flex-none bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent hover:bg-[color:var(--brand-primary)] dark:hover:bg-[color:var(--brand-primary)] transition-colors hover:text-white dark:hover:text-white"
                >
                    Subscribe
                </Button>
            </div>
        </div>
    )
}
