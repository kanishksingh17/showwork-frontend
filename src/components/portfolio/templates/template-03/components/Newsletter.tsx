import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Mail } from 'lucide-react';

export default function Newsletter() {
    return (
        <form
            action="/subscribe"
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900/50 shadow-sm"
        >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 items-center">
                <Mail className="h-5 w-5 text-zinc-400" />
                <span className="ml-3">Stay up to date</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Get notified when I publish something new, and unsubscribe at any time.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Input
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address"
                    required
                    className="min-w-0 flex-auto"
                />
                <Button type="submit" className="flex-none bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white hover:bg-zinc-800 dark:hover:bg-zinc-200">
                    Join
                </Button>
            </div>
        </form>
    )
}
