/**
 * Custom React Query hooks for Analytics data fetching
 * Implements smart caching, conditional fetching, and automatic polling
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { analyticsService } from '@/services/analyticsService';
import { portfolioTrackingService } from '@/services/portfolioTrackingService';
import { socialMediaService } from '@/services/socialMediaService';

// Type definitions
export interface DateRange {
  start: Date;
  end: Date;
}

// Portfolio Metrics Hook (from analytics service)
export const usePortfolioMetrics = (
  dateRange: DateRange,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['portfolioMetrics', dateRange.start.toISOString(), dateRange.end.toISOString()],
    queryFn: () => analyticsService.getPortfolioMetrics(dateRange),
    staleTime: 60_000, // 1 minute
    enabled,
    refetchInterval: 60_000, // Auto-refresh every minute
  });
};

// Real-time Analytics Hook (faster refresh for live data)
export const useRealTimeAnalytics = (
  portfolioId: string = 'default',
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['realtimeAnalytics', portfolioId],
    queryFn: () => portfolioTrackingService.getRealTimeAnalytics(portfolioId),
    staleTime: 30_000, // 30 seconds (shorter for real-time data)
    enabled,
    refetchInterval: 30_000, // Auto-refresh every 30 seconds
  });
};

// Goals Tracking Hook
export const useGoalTracking = (
  portfolioId: string = 'default',
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['portfolioGoals', portfolioId],
    queryFn: () => portfolioTrackingService.getGoalTracking(portfolioId),
    staleTime: 60_000, // 1 minute
    enabled,
    refetchInterval: 60_000, // Auto-refresh every minute
  });
};

// Portfolio Metrics (from portfolio tracking service)
export const usePortfolioTrackingMetrics = (
  portfolioId: string = 'default',
  dateRange: DateRange,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['portfolioTracking', portfolioId, dateRange.start.toISOString(), dateRange.end.toISOString()],
    queryFn: () => portfolioTrackingService.getPortfolioMetrics(portfolioId, dateRange),
    staleTime: 60_000, // 1 minute
    enabled,
    refetchInterval: 60_000,
  });
};

// Social Media Metrics Hook (less frequent updates)
export const useSocialMediaMetrics = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['socialMediaMetrics'],
    queryFn: () => socialMediaService.getAllSocialMediaMetrics(),
    staleTime: 120_000, // 2 minutes (less frequent)
    enabled,
    refetchInterval: 120_000, // Auto-refresh every 2 minutes
  });
};

// Social Media Chart Data Hook
export const useSocialMediaChartData = (
  viewType: 'day' | 'month' | 'year',
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['socialMediaChart', viewType],
    queryFn: async () => {
      // TODO: Replace with actual service method when available
      // For now, return empty array
      return [] as Array<{
        date: string;
        engagement: number;
        reach: number;
        followers: number;
      }>;
    },
    staleTime: 120_000, // 2 minutes
    enabled,
  });
};

// Project Analytics Hook
export const useProjectAnalytics = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['projectAnalytics'],
    queryFn: async () => {
      // TODO: Implement actual API call when available
      // For now, return mock structure
      return {
        analytics: [] as Array<{
          id: string;
          name: string;
          views: number;
          likes: number;
          shares: number;
          downloads: number;
          viewsChange: number;
          likesChange: number;
          sharesChange: number;
          downloadsChange: number;
          lastUpdated: string;
        }>,
        stats: {
          totalViews: 0,
          totalProjects: 0,
          totalLikes: 0,
          totalFollowers: 0,
          viewsChange: 0,
          projectsChange: 0,
          likesChange: 0,
          followersChange: 0,
        },
      };
    },
    staleTime: 60_000, // 1 minute
    enabled,
    refetchInterval: 60_000,
  });
};



