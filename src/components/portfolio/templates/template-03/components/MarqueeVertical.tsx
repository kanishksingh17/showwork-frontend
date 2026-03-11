"use client";
import { cn } from "@/lib/utils";
import { Marquee } from "./Marquee";

// LinkedIn-style post data fallback
const defaultPosts = [
    {
        id: "1",
        img: "/avatar.png",
        name: "Raj Singh",
        headline: "Full Stack Developer · Building in Public",
        body: "Just shipped v1.2 of my open-source dashboard template 🚀 450+ forks and counting. The community support has been incredible. Thanks everyone! 🙏\n\n#OpenSource #React #BuildInPublic",
        time: "2d",
        likes: 248,
        comments: 34,
        reposts: 12,
    },
    {
        id: "2",
        img: "/avatar.png",
        name: "Raj Singh",
        headline: "Full Stack Developer · Building in Public",
        body: "Hot take: you don't need microservices until you're at 10M+ users. A well-structured monolith with clean modules will serve you better 90% of the time.\n\nBuild boring, scale later. 🔧",
        time: "5d",
        likes: 1034,
        comments: 128,
        reposts: 89,
    },
    {
        id: "3",
        img: "/avatar.png",
        name: "Raj Singh",
        headline: "Full Stack Developer · Building in Public",
        body: "Month 6 of my SaaS: ₹47,000 MRR, 312 users, 4% churn. Still feels surreal.\n\nStarted with just a Next.js template and a Supabase free tier. Keep shipping. 🇮🇳\n\n#indiehacker",
        time: "1w",
        likes: 2891,
        comments: 312,
        reposts: 201,
    },
    {
        id: "4",
        img: "/avatar.png",
        name: "Raj Singh",
        headline: "Full Stack Developer · Building in Public",
        body: "Switched all my projects from npm → pnpm last week.\n\n✅ Install times cut in half\n✅ Disk usage down 70%\n✅ Workspace support out of the box\n\nWhy did I wait so long? ⚡️",
        time: "2w",
        likes: 567,
        comments: 89,
        reposts: 43,
    },
    {
        id: "5",
        img: "/avatar.png",
        name: "Raj Singh",
        headline: "Full Stack Developer · Building in Public",
        body: "My go-to stack for building MVPs fast:\n\n→ Next.js (App Router)\n→ Supabase (DB + Auth)\n→ Tailwind CSS\n→ Vercel (Deploy)\n\nIdea to live product in a weekend. No excuses. 🛠️\n\n#buildinpublic",
        time: "3w",
        likes: 1456,
        comments: 204,
        reposts: 178,
    },
    {
        id: "6",
        img: "/avatar.png",
        name: "Raj Singh",
        headline: "Full Stack Developer · Building in Public",
        body: "Debugging a memory leak in Go at 2am.\n\nThe fix? A single missing `defer` statement.\n\nTwo hours I'll never get back. But hey, learned something. That's the job. 💀\n\n#golang #devlife",
        time: "1mo",
        likes: 743,
        comments: 56,
        reposts: 34,
    }
];

// LinkedIn SVG icon
const LinkedInIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-[#0A66C2]"
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

// Like icon
const LikeIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0A66C2]">
        <path d="M19.46 11l-3.204-3.204A2 2 0 0115.841 7H15v-.5A3.5 3.5 0 0011.5 3h-.5a.5.5 0 00-.5.5V4c0 2.032-.55 3.779-1.5 4.81V18a4 4 0 004 4h4.288a3 3 0 002.909-2.272l1.164-5.093A3 3 0 0019.46 11zM6 18a1 1 0 01-2 0V9a1 1 0 012 0v9z" />
    </svg>
);

const ReviewCard = ({
    img,
    name,
    headline,
    body,
    time,
    likes,
    comments,
    reposts,
}: {
    img: string;
    name: string;
    headline: string;
    body: string;
    time: string;
    likes: number;
    comments: number;
    reposts: number;
}) => {
    const truncatedBody = body.length > 180 ? body.slice(0, 180) + "..." : body;

    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mb-4",
                "border-gray-200 bg-white hover:shadow-md transition-shadow duration-200",
                "dark:border-gray-700 dark:bg-zinc-900 dark:hover:bg-zinc-800",
            )}
        >
            <div className="absolute top-3 right-3">
                <LinkedInIcon />
            </div>

            <div className="flex flex-row items-start gap-2 mb-3 pr-6">
                <img
                    src={img}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover flex-shrink-0 border border-gray-200 dark:border-zinc-700"
                />
                <div className="flex flex-col min-w-0">
                    <figcaption className="text-sm font-semibold dark:text-white leading-tight">
                        {name}
                    </figcaption>
                    <p className="text-xs text-[#666] dark:text-zinc-400 leading-tight truncate max-w-[140px]">
                        {headline}
                    </p>
                    <p className="text-xs text-[#999] dark:text-zinc-500 mt-0.5 flex items-center gap-1">
                        {time} · <span>🌐</span>
                    </p>
                </div>
            </div>

            <blockquote className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line mb-3">
                {truncatedBody}
                {body.length > 180 && (
                    <span className="text-[#0A66C2] font-medium"> ...more</span>
                )}
            </blockquote>

            <div className="flex items-center justify-between text-xs text-[#666] dark:text-gray-400 pb-2 border-b border-gray-100 dark:border-zinc-800">
                <span className="flex items-center gap-1">
                    <LikeIcon />
                    {likes.toLocaleString()}
                </span>
                <span>{comments} comments · {reposts} reposts</span>
            </div>

            <div className="flex items-center justify-around mt-2 -mx-1">
                {[
                    { icon: "👍", label: "Like" },
                    { icon: "💬", label: "Comment" },
                    { icon: "🔁", label: "Repost" },
                    { icon: "➤", label: "Send" },
                ].map((action) => (
                    <button
                        key={action.label}
                        className="flex items-center gap-1 text-xs text-[#666] dark:text-gray-400 hover:text-[#0A66C2] hover:bg-blue-50 dark:hover:bg-white/5 px-2 py-1 rounded-md transition-colors duration-150"
                    >
                        <span>{action.icon}</span>
                        <span className="hidden sm:inline font-medium">{action.label}</span>
                    </button>
                ))}
            </div>
        </figure>
    );
};

export function MarqueeVertical({ posts = [] }: { posts?: any[] }) {
    const displayPosts = posts.length > 0 ? posts.map((p) => ({
        ...p,
        img: p.img || p.avatar || "/avatar.png",
        likes: p.likes || 10,
        comments: p.comments || 2,
        reposts: p.reposts || 1,
        time: p.time || "2d"
    })) : defaultPosts;

    const firstRow = displayPosts.slice(0, Math.ceil(displayPosts.length / 3));
    const secondRow = displayPosts.slice(Math.ceil(displayPosts.length / 3), Math.ceil(displayPosts.length / 3 * 2));
    const thirdRow = displayPosts.slice(Math.ceil(displayPosts.length / 3 * 2));

    return (
        <div className="relative hidden lg:flex h-[600px] w-full flex-row items-center justify-center overflow-hidden gap-4 mt-8">
            <Marquee pauseOnHover vertical className="[--duration:30s] [--gap:1rem]">
                {firstRow.map((post, idx) => (
                    <ReviewCard key={idx} {...post} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="[--duration:30s] [--gap:1rem]">
                {secondRow.map((post, idx) => (
                    <ReviewCard key={idx} {...post} />
                ))}
            </Marquee>
            <Marquee pauseOnHover vertical className="[--duration:30s] [--gap:1rem]">
                {thirdRow.map((post, idx) => (
                    <ReviewCard key={idx} {...post} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white dark:from-zinc-950"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white dark:from-zinc-950"></div>
        </div>
    );
}
