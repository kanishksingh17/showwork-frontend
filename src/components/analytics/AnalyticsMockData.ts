
export const DEMO_ANALYTICS_DATA = {
  kpis: {
    totalReach: {
      value: "15,840",
      change: "+14.2%",
      trend: "up",
      subtext: "P95 Confidence across 1.2k searches"
    },
    portfolioViews: {
      value: "4,210",
      change: "+8.5%",
      trend: "up",
      subtext: "4m 12s avg. session duration"
    },
    cvDownloads: {
      value: "582",
      change: "+12.1%",
      trend: "up",
      subtext: "Highest conversion on 'Senior_Fe.pdf'"
    },
    conversionRate: {
      value: "18.4%",
      change: "+6.2%",
      trend: "up",
      subtext: "Top 5% of all developers in your stack"
    }
  },
  assets: [
    {
      id: "a1",
      name: "Principal_Frontend_CV_2024",
      type: "Resume",
      views: "1,842",
      viewsChange: "+15%",
      trend: [12, 15, 13, 18, 16, 20, 19],
      interviews: 42,
      convRate: "2.3%",
      status: "OPTIMIZED",
      color: "red"
    },
    {
      id: "a2",
      name: "SaaS Dashboard Case Study",
      type: "Case Study",
      views: "1,120",
      viewsChange: "+8%",
      trend: [8, 9, 7, 10, 11, 12, 10],
      interviews: 18,
      convRate: "1.6%",
      status: "STABLE",
      color: "purple"
    },
    {
      id: "a3",
      name: "Interactive Portfolio Home",
      type: "Portfolio",
      views: "4,210",
      viewsChange: "+22%",
      trend: [2, 5, 8, 12, 10, 15, 18],
      interviews: 86,
      convRate: "2.0%",
      status: "HIGH_TRAFFIC",
      color: "blue"
    }
  ],
  funnel: {
    stages: [
      { name: "Impressions", value: "15.8k", change: "+14%", conversion: null },
      { name: "Views", value: "4.2k", change: null, conversion: "26.5%" },
      { name: "Applied", value: "320", change: null, conversion: "7.6%" },
      { name: "Interview", value: "42", change: "+15%", conversion: "13.1%" }
    ],
    overallConversion: "0.27%"
  },
  regions: [
    { flag: "🇺🇸", city: "San Francisco", jobs: 512, intensity: 90, color: "blue" },
    { flag: "🇬🇧", city: "London", jobs: 184, intensity: 45, color: "gray" },
    { flag: "🇮🇳", city: "Bangalore", jobs: 423, intensity: 75, color: "green" },
    { flag: "🇩🇪", city: "Berlin", jobs: 121, intensity: 30, color: "orange" }
  ],
  insights: {
    alert: "Hiring demand for Frontend Lead roles in NY has spiked 28% this week. Your 'SaaS Dashboard' project is trending among Google/Meta recruiters.",
    period: "Last 30 Days"
  }
};
