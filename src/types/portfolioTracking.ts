export interface PortfolioMetrics {
  totalViews: number;
  uniqueVisitors: number;
  totalDownloads: number;
  totalInteractions: number;
  averageSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  topCountries: CountryData[];
  topDevices: DeviceData[];
  topBrowsers: BrowserData[];
  topOperatingSystems: OSData[];
  trafficSources: TrafficSourceData[];
  lastUpdated: Date;
}

export interface CountryData {
  country: string;
  visitors: number;
  percentage: number;
}

export interface DeviceData {
  device: string;
  visitors: number;
  percentage: number;
}

export interface BrowserData {
  browser: string;
  visitors: number;
  percentage: number;
}

export interface OSData {
  os: string;
  visitors: number;
  percentage: number;
}

export interface TrafficSourceData {
  source: string;
  visitors: number;
  percentage: number;
}

export interface DeviceAnalytics {
  totalDevices: number;
  deviceBreakdown: DeviceBreakdown[];
  browserBreakdown: BrowserBreakdown[];
  osBreakdown: OSBreakdown[];
  screenSizes: ScreenSizeData[];
  lastUpdated: Date;
}

export interface DeviceBreakdown {
  device: string;
  count: number;
  percentage: number;
}

export interface BrowserBreakdown {
  browser: string;
  count: number;
  percentage: number;
}

export interface OSBreakdown {
  os: string;
  count: number;
  percentage: number;
}

export interface ScreenSizeData {
  size: string;
  count: number;
  percentage: number;
}

export interface CVDownload {
  id: string;
  portfolioId: string;
  cvType: string;
  format: string;
  downloadedAt: Date;
  device: string;
  browser: string;
  country: string;
  city: string;
  ipAddress: string;
}

export interface PortfolioView {
  id: string;
  portfolioId: string;
  viewedAt: Date;
  device: string;
  browser: string;
  os: string;
  country: string;
  city: string;
  referrer?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  sessionDuration: number;
  pagesViewed: number;
  ipAddress: string;
}

export interface EngagementEvent {
  id: string;
  type: 'portfolio_view' | 'cv_download' | 'project_interaction' | 'contact_submission' | 'social_media_click';
  portfolioId: string;
  userId?: string;
  properties: {
    [key: string]: any;
    timestamp: Date;
  };
  timestamp: Date;
}

export interface LiveActivity {
  id: string;
  type: string;
  portfolioId: string;
  timestamp: Date;
  location: string;
  device: string;
}

export interface Goal {
  id: string;
  name: string;
  type: 'portfolio_views' | 'cv_downloads' | 'project_interactions' | 'contact_submissions' | 'social_media_clicks';
  target: number;
  current: number;
  deadline: Date;
  status: 'active' | 'completed' | 'paused';
}

export interface GoalProgress {
  goalId: string;
  date: string;
  value: number;
  change: number;
  changePercentage: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: Date;
  type: 'milestone' | 'streak' | 'special';
}

export interface CrossDeviceSession {
  sessionId: string;
  userId?: string;
  devices: DeviceSession[];
  startTime: Date;
  endTime?: Date;
  totalDuration: number;
  totalViews: number;
  totalInteractions: number;
}

export interface DeviceSession {
  deviceId: string;
  deviceType: string;
  browser: string;
  os: string;
  ipAddress: string;
  country: string;
  city: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  views: number;
  interactions: number;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  speedIndex: number;
}

export interface UserJourney {
  sessionId: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  pages: PageView[];
  interactions: Interaction[];
  conversions: Conversion[];
  exitPage?: string;
  exitReason?: string;
}

export interface PageView {
  page: string;
  timestamp: Date;
  duration: number;
  referrer?: string;
  device: string;
  browser: string;
}

export interface Interaction {
  type: string;
  element: string;
  timestamp: Date;
  properties: { [key: string]: any };
}

export interface Conversion {
  type: string;
  timestamp: Date;
  value?: number;
  properties: { [key: string]: any };
}

export interface ABTestResult {
  testId: string;
  testName: string;
  variant: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  confidence: number;
  status: 'running' | 'completed' | 'paused';
  startDate: Date;
  endDate?: Date;
}

export interface CohortAnalysis {
  cohort: string;
  size: number;
  retention: number[];
  engagement: number[];
  conversion: number[];
  revenue: number[];
}

export interface FunnelAnalysis {
  funnelId: string;
  funnelName: string;
  steps: FunnelStep[];
  conversionRate: number;
  dropoffRate: number;
  averageTimeToComplete: number;
}

export interface FunnelStep {
  step: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  dropoffRate: number;
  averageTime: number;
}
