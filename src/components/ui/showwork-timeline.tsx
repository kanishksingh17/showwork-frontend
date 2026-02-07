"use client";
import { Timeline } from "@/components/ui/timeline";

export function ShowWorkTimeline() {
  const data = [
    {
      title: "Step 1 — Upload Your Project",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm mb-6">
            Start by uploading your project. ShowWork uses AI to analyze your code, assets, and visuals — preparing it for a portfolio‑ready transformation.
          </p>
          <img
            src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1000&q=80&auto=format&fit=crop"
            alt="project upload"
            className="rounded-lg object-cover w-full h-44"
          />
        </div>
      ),
    },
    {
      title: "Step 2 — Build Your Portfolio",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm mb-6">
            With one click, create a stunning portfolio automatically filled with your projects, visuals, and AI‑generated summaries.
          </p>
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80&auto=format&fit=crop"
            alt="portfolio builder"
            className="rounded-lg object-cover w-full h-44"
          />
        </div>
      ),
    },
    {
      title: "Step 3 — Personalize Your Brand",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm mb-6">
            Customize your personal brand. Choose your tone, color theme, and AI‑generated bio. Your online identity — perfectly unified.
          </p>
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&q=80&auto=format&fit=crop"
            alt="LinkedIn profile page"
            className="rounded-lg object-cover w-full h-44"
          />
        </div>
      ),
    },
    {
      title: "Step 4 — Share Everywhere",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm mb-6">
            Publish to LinkedIn, X, Reddit, and Instagram in one click. Every platform, perfectly formatted.
          </p>
          <img
            src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1000&q=80&auto=format&fit=crop"
            alt="multiple social media platforms"
            className="rounded-lg object-cover w-full h-44"
          />
        </div>
      ),
    },
    {
      title: "Step 5 — See Yourself Grow",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm mb-6">
            View analytics and engagement stats across all your platforms from one dashboard.
          </p>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80&auto=format&fit=crop"
            alt="analytics dashboard with graphs"
            className="rounded-lg object-cover w-full h-44"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <Timeline data={data} />
    </div>
  );
}

export default ShowWorkTimeline;


