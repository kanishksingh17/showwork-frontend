export interface PlatformAdapter {
  publish(token: string, payload: PublishPayload): Promise<PublishResult>;
  getMetrics(token: string, postId: string): Promise<MetricsResult>;
}

export interface PublishPayload {
  message: string;
  mediaUrls?: string[];
  metadata?: Record<string, unknown>;
}

export interface PublishResult {
  success: boolean;
  postId?: string;
  url?: string;
  error?: string;
  platformResponse?: unknown;
}

export interface MetricsResult {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  clicks?: number;
  impressions?: number;
  engagement?: number;
}