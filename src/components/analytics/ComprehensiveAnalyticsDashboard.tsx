

import { useState } from 'react';
import {
  LayoutDashboard,
  BarChart2,
  FolderOpen,
  Briefcase,
  Mail,
  Settings,
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  Sparkles,
  Link,
  Globe,
  Filter,
  Map,
  Eye,
  MousePointerClick,
  UserCheck,
  ArrowRight
} from 'lucide-react';


export function ComprehensiveAnalyticsDashboard({ portfolioId }: { portfolioId: string }) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  return (

    <div className="flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark font-sans text-text-primary-light dark:text-text-primary-dark">
      {/* Header */}
      <header className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-border-light/50 dark:border-border-dark/50 z-10">
        <div className="flex flex-col">

          <h1 className="text-xl font-bold font-display text-gray-900 dark:text-white flex items-center gap-2">
            Analytics
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
            Last updated: Just now
          </span>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-border-light dark:border-border-dark">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-all duration-200 ${timeRange === '7d'
                ? 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white'
                : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              7D
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-all duration-200 ${timeRange === '30d'
                ? 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white'
                : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              30D
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-all duration-200 ${timeRange === '90d'
                ? 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white'
                : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              90D
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}


      <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Total Reach */}
          <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
            <div className="flex justify-between items-start mb-1 h-5">
              <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">Total Reach</p>
              <span className="text-xs font-bold text-success flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                12.4%
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white tracking-tight">12,450</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">P95 Confidence</span>
                <span className="text-[10px] text-text-secondary-light">800 searches monitored</span>
              </div>
              <div className="h-6 w-full text-primary-DEFAULT">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 20">
                  <path d="M0 18 L 10 16 L 20 17 L 30 14 L 40 15 L 50 10 L 60 12 L 70 8 L 80 9 L 90 5 L 100 6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Portfolio Views */}
          <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
            <div className="flex justify-between items-start mb-1 h-5">
              <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">Portfolio Views</p>
              <span className="text-xs font-bold text-success flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                5.2%
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white tracking-tight">2,840</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Avg. Session</span>
                <span className="text-[10px] text-text-secondary-light">3m 45s (+18% Stickiness)</span>
              </div>
              <div className="h-6 w-full text-secondary-DEFAULT">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 20">
                  <path d="M0 15 L 15 14 L 30 16 L 45 10 L 60 11 L 75 4 L 90 6 L 100 5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* CV Downloads */}
          <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
            <div className="flex justify-between items-start mb-1 h-5">
              <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">CV Downloads</p>
              <span className="text-xs font-bold text-danger flex items-center gap-0.5">
                <TrendingDown className="w-3.5 h-3.5" />
                2.1%
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white tracking-tight">342</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-danger">Action required</span>
                <span className="text-[10px] text-text-secondary-light">"Frontend_V2.pdf" degrading</span>
              </div>
              <div className="h-6 w-full text-warning">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 20">
                  <path d="M0 5 L 20 8 L 40 10 L 60 14 L 80 15 L 100 18" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
            <div className="flex justify-between items-start mb-1 h-5">
              <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">Conversion Rate</p>
              <span className="text-xs font-bold text-success flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                8.4%
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white tracking-tight">14.2%</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-teal-600">Top Performer</span>
                <span className="text-[10px] text-text-secondary-light">85th Percentile globally</span>
              </div>
              <div className="h-6 w-full text-success">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 20">
                  <path d="M0 18 L 20 15 L 40 12 L 60 10 L 80 5 L 100 2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Performance Table */}
        <section className="bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg text-gray-900 dark:text-white font-display">Asset Performance Granularity</h2>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Multi-dimensional comparison of conversion assets</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-text-secondary-light hover:text-gray-900 dark:hover:text-white transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <button className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-text-secondary-light hover:text-gray-900 dark:hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/50 dark:bg-gray-800/30 text-[10px] uppercase text-text-secondary-light dark:text-text-secondary-dark font-bold tracking-widest border-b border-border-light dark:border-border-dark">
                <tr>
                  <th className="px-6 py-4">Asset Identification</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Volume (Views)</th>
                  <th className="px-6 py-4">Historical Trend</th>
                  <th className="px-6 py-4">Interviews</th>
                  <th className="px-6 py-4">Conv. Rate</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                <tr className="transition-colors duration-150 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Senior_Frontend_CV_v4</div>
                        <div className="text-[10px] text-text-secondary-light">Updated 2 days ago</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary-light">Resume</td>
                  <td className="px-6 py-4 font-semibold">1,204 <span className="text-[10px] text-success ml-1">+12%</span></td>
                  <td className="px-6 py-4">
                    <svg className="w-24 h-6 text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 20">
                      <path d="M0 15 Q 10 12, 20 18 T 40 10 T 60 14 T 80 5 T 100 12" strokeLinecap="round"></path>
                    </svg>
                  </td>
                  <td className="px-6 py-4 font-semibold">152</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-success font-bold">12.5%</span>
                      <div className="w-12 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-green-100 dark:bg-green-900/30 text-success text-[10px] font-bold px-2 py-1 rounded">OPTIMIZED</span>
                  </td>
                </tr>
                <tr className="transition-colors duration-150 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-secondary-DEFAULT">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">SaaS Dashboard Case</div>
                        <div className="text-[10px] text-text-secondary-light">Updated 15 days ago</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary-light">Case Study</td>
                  <td className="px-6 py-4 font-semibold">856 <span className="text-[10px] text-text-secondary-light ml-1">0%</span></td>
                  <td className="px-6 py-4">
                    <svg className="w-24 h-6 text-primary-DEFAULT" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 20">
                      <path d="M0 10 Q 20 10, 40 10 T 60 10 T 100 10" strokeLinecap="round"></path>
                    </svg>
                  </td>
                  <td className="px-6 py-4 font-semibold">70</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-primary-DEFAULT font-bold">8.2%</span>
                      <div className="w-12 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-DEFAULT rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-primary-DEFAULT text-[10px] font-bold px-2 py-1 rounded">STABLE</span>
                  </td>
                </tr>
                <tr className="transition-colors duration-150 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Link className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Personal Website Home</div>
                        <div className="text-[10px] text-text-secondary-light">Updated 1 month ago</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary-light">Portfolio</td>
                  <td className="px-6 py-4 font-semibold">2,100 <span className="text-[10px] text-danger ml-1">-5%</span></td>
                  <td className="px-6 py-4">
                    <svg className="w-24 h-6 text-danger" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 20">
                      <path d="M0 5 Q 10 8, 20 10 T 40 12 T 60 15 T 80 18 T 100 20" strokeLinecap="round"></path>
                    </svg>
                  </td>
                  <td className="px-6 py-4 font-semibold">86</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-warning font-bold">4.1%</span>
                      <div className="w-12 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-warning rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-red-100 dark:bg-red-900/30 text-danger text-[10px] font-bold px-2 py-1 rounded">DEGRADING</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
          {/* Funnel Diagnostics */}
          <div className="lg:col-span-2 bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white font-display">Funnel Diagnostics</h2>
                <p className="text-xs text-text-secondary-light">Conversion efficiency between search and offer</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary-50 dark:bg-primary-900/20 text-primary-DEFAULT text-[10px] font-bold px-2 py-1 rounded">
                  Overall Conversion: 0.2%
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              {/* Stage 1: Impressions */}
              <div className="flex-1 w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-border-light dark:border-border-dark relative group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Impressions</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">12.4k</div>
                <div className="text-[10px] text-success font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12% vs last period
                </div>
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center">
                <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 rotate-90 md:rotate-0" />
                <span className="text-[10px] font-bold text-danger bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded mt-1">-72%</span>
              </div>

              {/* Stage 2: Views */}
              <div className="flex-1 w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-border-light dark:border-border-dark relative group hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                    <MousePointerClick className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Views</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">3,472</div>
                <div className="text-[10px] text-text-secondary-light font-medium">
                  28.0% Conversion
                </div>
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center">
                <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 rotate-90 md:rotate-0" />
                <span className="text-[10px] font-bold text-danger bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded mt-1">-94%</span>
              </div>

              {/* Stage 3: Applications */}
              <div className="flex-1 w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-border-light dark:border-border-dark relative group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Applied</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">210</div>
                <div className="text-[10px] text-text-secondary-light font-medium">
                  6.0% Conversion
                </div>
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center">
                <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 rotate-90 md:rotate-0" />
                <span className="text-[10px] font-bold text-danger bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded mt-1">-88%</span>
              </div>

              {/* Stage 4: Interviews */}
              <div className="flex-1 w-full bg-green-50/50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800 relative group transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Interview</span>
                </div>
                <div className="text-2xl font-bold text-green-900 dark:text-white mb-1">25</div>
                <div className="text-[10px] text-green-600 dark:text-green-400 font-bold">
                  11.9% Conversion
                </div>
              </div>
            </div>
          </div>

          {/* Recruiter Intensity */}
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white font-display">Recruiter Intensity</h2>
              <Map className="w-5 h-5 text-text-secondary-light cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors" />
            </div>
            <div className="space-y-5 flex-1">
              <div className="group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-sm font-bold dark:text-gray-200">San Francisco</span>
                  </div>
                  <span className="text-sm font-bold text-primary-DEFAULT">482 <span className="text-[10px] font-normal text-text-secondary-light uppercase tracking-wider ml-1">Jobs</span></span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary-DEFAULT h-full w-[85%] transition-all group-hover:bg-primary-DEFAULT/80"></div>
                </div>
              </div>
              <div className="group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇬🇧</span>
                    <span className="text-sm font-bold secondary-text">London</span>
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">156 <span className="text-[10px] font-normal text-text-secondary-light uppercase tracking-wider ml-1">Jobs</span></span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gray-400 h-full w-[40%] transition-all group-hover:bg-gray-500"></div>
                </div>
              </div>
              <div className="group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-sm font-bold secondary-text">Bangalore</span>
                  </div>
                  <span className="text-sm font-bold text-success">312 <span className="text-[10px] font-normal text-text-secondary-light uppercase tracking-wider ml-1">Jobs</span></span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-success h-full w-[65%] transition-all group-hover:bg-success/80"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-[18px] h-[18px] text-indigo-600 dark:text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">AI Strategist Alert</span>
              </div>
              <p className="text-[11px] text-indigo-900 dark:text-indigo-200 font-medium leading-relaxed">
                Hiring demand for <span className="font-bold underline decoration-indigo-300">Frontend Engineers</span> in SF has increased by <span className="text-success font-bold">22%</span> since last month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
