import { LinkedInAdapter } from "./linkedin";
import { TwitterAdapter } from "./twitter";
import { RedditAdapter } from "./reddit";
import { FacebookAdapter } from "./facebook";
import { InstagramAdapter } from "./instagram";
import type { PlatformAdapter } from "./types";

export type {
  PlatformAdapter,
  PublishPayload,
  PublishResult,
  MetricsResult,
} from "./types";

export const platformAdapters: Record<string, PlatformAdapter> = {
  linkedin: new LinkedInAdapter(),
  twitter: new TwitterAdapter(),
  reddit: new RedditAdapter(),
  facebook: new FacebookAdapter(),
  instagram: new InstagramAdapter(),
};

export function getAdapter(platform: string): PlatformAdapter {
  const adapter = platformAdapters[platform];
  if (!adapter) {
    throw new Error(`Unsupported platform: ${platform}`);
  }
  return adapter;
}







