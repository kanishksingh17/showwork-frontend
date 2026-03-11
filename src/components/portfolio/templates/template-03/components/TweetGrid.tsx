import { cn } from "@/lib/utils";

const LinkedInIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-[#0A66C2]"
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const LikeIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0A66C2]">
        <path d="M19.46 11l-3.204-3.204A2 2 0 0115.841 7H15v-.5A3.5 3.5 0 0011.5 3h-.5a.5.5 0 00-.5.5V4c0 2.032-.55 3.779-1.5 4.81V18a4 4 0 004 4h4.288a3 3 0 002.909-2.272l1.164-5.093A3 3 0 0019.46 11zM6 18a1 1 0 01-2 0V9a1 1 0 012 0v9z" />
    </svg>
);

const PostCard = ({
    img,
    name,
    headline,
    body,
    time,
    likes,
    comments,
    reposts,
}: any) => {
    const truncatedBody = body.length > 200 ? body.slice(0, 200) + "..." : body;

    return (
        <figure
            className={cn(
                "relative cursor-pointer overflow-hidden rounded-xl border p-4 mb-4 break-inside-avoid",
                "border-zinc-200 bg-white hover:shadow-md transition-shadow duration-200",
                "dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900",
            )}
        >
            <div className="absolute top-3 right-3">
                <LinkedInIcon />
            </div>

            <div className="flex flex-row items-start gap-2 mb-3 pr-6">
                {img ? (
                    <img
                        src={img}
                        alt={name}
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0 border border-zinc-200 dark:border-zinc-700"
                    />
                ) : (
                    <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center text-xs font-bold text-zinc-500">
                        {name[0]}
                    </div>
                )}
                <div className="flex flex-col min-w-0">
                    <figcaption className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                        {name}
                    </figcaption>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight">
                        {headline}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 flex items-center gap-1">
                        {time} · <span>🌐</span>
                    </p>
                </div>
            </div>

            <blockquote className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-line mb-3">
                {truncatedBody}
                {body.length > 200 && (
                    <span className="text-[#0A66C2] font-medium"> ...more</span>
                )}
            </blockquote>

            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center gap-1">
                    <LikeIcon />
                    {likes.toLocaleString()}
                </span>
                <span>{comments} comments · {reposts} reposts</span>
            </div>
        </figure>
    );
};

export const TweetGrid = ({ posts }: { posts: any[] }) => {
    if (!posts || posts.length === 0) return null;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post, idx) => (
                <PostCard key={idx} {...post} />
            ))}
        </div>
    );
};
