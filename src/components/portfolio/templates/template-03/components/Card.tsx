import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

export function Card<T extends React.ElementType = 'div'>({
    as,
    className,
    children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
    as?: T
    className?: string
}) {
    let Component = as ?? 'div'

    return (
        <Component
            className={clsx(className, 'group relative flex flex-col items-start')}
        >
            {children}
        </Component>
    )
}

Card.Link = function CardLink({
    children,
    href,
    ...props
}: { children: React.ReactNode, href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <>
            <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 transition group-hover:scale-100 sm:-inset-x-6 sm:rounded-2xl group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800/50 " />
            <Link to={href} {...(props as any)}>
                <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                <span className="relative z-10">{children}</span>
            </Link>
        </>
    )
}

Card.Title = function CardTitle<T extends React.ElementType = 'h2'>({
    as,
    href,
    children,
}: {
    as?: T
    href?: string
    children?: React.ReactNode
}) {
    let Component = as ?? 'h2'

    return (
        <Component className="text-base font-semibold tracking-normal text-zinc-900 dark:text-zinc-100">
            {href ? <Card.Link href={href}>{children}</Card.Link> : children}
        </Component>
    )
}

Card.Description = function CardDescription({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {children}
        </p>
    )
}

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
    return (
        <div
            aria-hidden="true"
            className="relative z-10 mt-4 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400"
        >
            {children}
            <ChevronRight className="ml-1 h-4 w-4 stroke-current" />
        </div>
    )
}

Card.Eyebrow = function CardEyebrow<T extends React.ElementType = 'p'>({
    as,
    decorate = false,
    className,
    children,
    ...props
}: {
    as?: T
    decorate?: boolean
    className?: string
    children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'decorate' | 'className' | 'children'>) {
    let Component = as ?? 'p'

    return (
        <Component
            className={clsx(
                className,
                'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
                decorate && 'pl-3.5',
            )}
            {...props}
        >
            {decorate && (
                <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                >
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                </span>
            )}
            {children}
        </Component>
    )
}
