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
  ArrowRight,
  Info,
  Lock
} from 'lucide-react';
import { DEMO_ANALYTICS_DATA } from './AnalyticsMockData';

export function ComprehensiveAnalyticsDashboard({ portfolioId, isDemo = false }: { portfolioId: string; isDemo?: boolean }) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
  // Use demo data if isDemo is true
  const data = isDemo ? DEMO_ANALYTICS_DATA : DEMO_ANALYTICS_DATA; // Fallback to demo for now since real data isn't wired

  const renderKPICard = (title: string, kpi: any, Icon: any, colorClass: string) => (
    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 relative group overflow-hidden">
      {isDemo && (
        <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Info className="w-3 h-3 text-text-secondary-light" />
        </div>
      )}
      <div className="flex justify-between items-start mb-1 h-5">
        <p className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">{title}</p>
        <span className={`text-xs font-bold flex items-center gap-0.5 ${kpi.trend === 'up' ? 'text-success' : 'text-danger'}`}>
          {kpi.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {kpi.change}
        </span>
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white tracking-tight">{kpi.value}</h3>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{kpi.subtext.split(' ')[0]} {kpi.subtext.split(' ')[1]}</span>
          <span className="text-[10px] text-text-secondary-light">{kpi.subtext.split(' ').slice(2).join(' ')}</span>
        </div>
        <div className={`h-6 w-full ${colorClass}`}>
          <svg className="w-full h-full" fill="none" preserveAspectRatio="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 20">
            <path d={kpi.trend === 'up' 
              ? "M0 18 L 10 16 L 20 17 L 30 14 L 40 15 L 50 10 L 60 12 L 70 8 L 80 9 L 90 5 L 100 6" 
              : "M0 5 L 20 8 L 40 10 L 60 14 L 80 15 L 100 18"} 
              strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark font-sans text-text-primary-light dark:text-text-primary-dark">
      {/* Demo Banner */}
      {isDemo && (
        <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 border-b border-blue-200/50 dark:border-blue-800/50 px-8 py-2 flex items-center justify-between animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-full p-1">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <p className="text-xs font-semibold text-blue-800 dark:text-blue-300">
              <span className="font-bold uppercase tracking-wider mr-2">Demo View:</span> 
              You are viewing showcase analytics. Sign up to track your own real-time performance.
            </p>
          </div>
          <button className="text-[10px] font-bold text-blue-700 dark:text-blue-400 hover:text-blue-900 border border-blue-300 dark:border-blue-700 px-3 py-1 rounded-full transition-all hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            Connect Accounts
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-border-light/50 dark:border-border-dark/50 z-10">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold font-display text-gray-900 dark:text-white flex items-center gap-2">
            Analytics
            {isDemo && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Showcase</span>}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
            Last updated: Just now
          </span>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-border-light dark:border-border-dark">
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-all duration-200 uppercase ${timeRange === r
                  ? 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-md'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {renderKPICard("Total Reach", data.kpis.totalReach, Globe, "text-primary-DEFAULT")}
          {renderKPICard("Portfolio Views", data.kpis.portfolioViews, Eye, "text-secondary-DEFAULT")}
          {renderKPICard("CV Downloads", data.kpis.cvDownloads, Download, "text-warning")}
          {renderKPICard("Conversion Rate", data.kpis.conversionRate, UserCheck, "text-success")}
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
                {data.assets.map((asset: any) => (
                  <tr key={asset.id} className="transition-colors duration-150 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center ${
                          asset.color === 'red' ? 'bg-red-100 text-red-600' :
                          asset.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {asset.type === 'Resume' ? <FileText className="w-4 h-4" /> : 
                           asset.type === 'Case Study' ? <Globe className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{asset.name}</div>
                          <div className="text-[10px] text-text-secondary-light">Updated recently</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary-light">{asset.type}</td>
                    <td className="px-6 py-4 font-semibold">{asset.views} <span className="text-[10px] text-success ml-1">{asset.viewsChange}</span></td>
                    <td className="px-6 py-4">
                      <svg className="w-24 h-6 text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 20">
                        <path d={`M0 15 Q 10 12, 20 18 T 40 ${asset.trend[3]} T 60 14 T 80 5 T 100 12`} strokeLinecap="round"></path>
                      </svg>
                    </td>
                    <td className="px-6 py-4 font-semibold">{asset.interviews}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-success font-bold">{asset.convRate}</span>
                        <div className="w-12 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-success rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                        asset.status === 'OPTIMIZED' ? 'bg-green-100 text-success' :
                        asset.status === 'HIGH_TRAFFIC' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>{asset.status}</span>
                    </td>
                  </tr>
                ))}
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
                  Overall Conversion: {data.funnel.overallConversion}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              {data.funnel.stages.map((stage: any, index: number) => (
                <div key={stage.name} className="flex items-center flex-1 w-full gap-2">
                  <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-border-light dark:border-border-dark relative group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${
                        index === 0 ? 'bg-blue-100 text-blue-600' :
                        index === 1 ? 'bg-purple-100 text-purple-600' :
                        index === 2 ? 'bg-indigo-100 text-indigo-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {index === 0 ? <Eye className="w-4 h-4" /> :
                         index === 1 ? <MousePointerClick className="w-4 h-4" /> :
                         index === 2 ? <FileText className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">{stage.name}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stage.value}</div>
                    {stage.change && (
                      <div className="text-[10px] text-success font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {stage.change} vs last period
                      </div>
                    )}
                    {stage.conversion && (
                      <div className="text-[10px] text-text-secondary-light font-medium">
                        {stage.conversion} Conversion
                      </div>
                    )}
                  </div>
                  {index < data.funnel.stages.length - 1 && (
                    <div className="hidden md:flex flex-col items-center">
                      <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                      <span className="text-[10px] font-bold text-danger bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded mt-1">-{(index === 0 ? 73 : index === 1 ? 92 : 86)}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter Intensity */}
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white font-display">Recruiter Intensity</h2>
              <Map className="w-5 h-5 text-text-secondary-light cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors" />
            </div>
            <div className="space-y-5 flex-1">
              {data.regions.map((region: any) => (
                <div key={region.city} className="group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{region.flag}</span>
                      <span className="text-sm font-bold dark:text-gray-200">{region.city}</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      region.color === 'blue' ? 'text-primary-DEFAULT' :
                      region.color === 'green' ? 'text-success' : 'text-gray-700 dark:text-gray-300'
                    }`}>{region.jobs} <span className="text-[10px] font-normal text-text-secondary-light uppercase tracking-wider ml-1">Jobs</span></span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full transition-all group-hover:opacity-80 ${
                      region.color === 'blue' ? 'bg-primary-DEFAULT' :
                      region.color === 'green' ? 'bg-success' : 'bg-gray-400'
                    }`} style={{ width: `${region.intensity}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-[18px] h-[18px] text-indigo-600 dark:text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">AI Strategist Alert</span>
              </div>
              <p className="text-[11px] text-indigo-900 dark:text-indigo-200 font-medium leading-relaxed">
                {data.insights.alert}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
