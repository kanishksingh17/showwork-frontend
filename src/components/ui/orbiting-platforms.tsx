"use client";

import * as React from "react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { RedditIcon, LinkedInIcon, InstagramIcon, XIcon } from "@/components/BrandIcons";

export function OrbitingPlatforms() {
  // radii for 4 distinct rings (px)
  // Two orbits (inner / outer)
  const rInner = 140;
  const rOuter = 240;

  return (
    <div className="relative flex h-[560px] w-full flex-col items-center justify-center overflow-hidden">
      {/* Center Text */}
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-6xl font-bold leading-none text-transparent dark:from-white dark:to-gray-500">
        ShowWork
      </span>

      {/* Visual orbit rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/15" style={{ width: rInner * 2, height: rInner * 2 }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10" style={{ width: rOuter * 2, height: rOuter * 2 }} />

      {/* Inner orbit: LinkedIn (top), Instagram (bottom) - 180° apart, opposite directions */}
      <OrbitingCircles className="size-[48px] border-none bg-transparent" duration={21} delay={0} radius={rInner} startAngleDeg={-90}>
        <LinkedInIcon className="w-12 h-12 text-blue-700" />
      </OrbitingCircles>
      <OrbitingCircles className="size-[48px] border-none bg-transparent" duration={23} delay={0} radius={rInner} startAngleDeg={90} reverse>
        <InstagramIcon className="w-12 h-12 text-pink-500" />
      </OrbitingCircles>

      {/* Outer orbit: X (top-right), Reddit (bottom-left) - 180° apart, offset 45° from inner, opposite directions */}
      <OrbitingCircles className="size-[56px] border-none bg-transparent" radius={rOuter} duration={27} delay={0} startAngleDeg={45} reverse>
        <XIcon className="w-14 h-14" />
      </OrbitingCircles>
      <OrbitingCircles className="size-[56px] border-none bg-transparent" radius={rOuter} duration={31} delay={0} startAngleDeg={225}>
        <RedditIcon className="w-14 h-14 text-orange-500" />
      </OrbitingCircles>
    </div>
  );
}

export default OrbitingPlatforms;
