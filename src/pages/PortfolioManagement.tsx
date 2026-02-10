import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedSidebar } from '@/components/UnifiedSidebar';
import { Button } from '@/components/ui/button';
import { AIReportView } from '@/components/analytics/AIReportView';
import {
    Plus,
    Star,
    FileText,
    MoreHorizontal,
    ArrowUpRight,
    Bell,
    Search,
    Info,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import type { ManagedPortfolio, ResumeVersion, ProjectTarget } from '@/types/portfolio-management';


export default function PortfolioManagement() {
    const navigate = useNavigate();

    // Mock Data
    const [portfolios] = useState<ManagedPortfolio[]>([
        {
            id: '1',
            name: 'Senior Frontend Dev Portfolio',
            templateId: 'modern-dark',
            templateName: 'Modern Dark Theme',
            status: 'active',
            isPrimary: true,
            lastModified: new Date('2024-02-08'),
            publishedUrl: 'https://showwork.in/p/senior-dev',
            linkedResumes: ['resume-1'],
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
        },
        {
            id: '2',
            name: 'Freelance Designer Portfolio',
            templateId: 'creative-minimal',
            templateName: 'Creative Minimal',
            status: 'draft',
            isPrimary: false,
            lastModified: new Date('2024-02-05'),
            linkedResumes: ['resume-2'],
            thumbnail: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=2574&auto=format&fit=crop'
        }
    ]);

    const [resumes] = useState<ResumeVersion[]>([
        {
            id: 'resume-1',
            title: 'Senior Frontend Engineer',
            targetRole: 'Senior Frontend Developer',
            industry: 'Tech / SaaS',
            isCurrent: true,
            updatedAt: new Date('2024-02-08'),
            createdAt: new Date('2024-01-15'),
            notes: 'Focused on React and TypeScript performance',
            linkedPortfolioId: '1'
        },
        {
            id: 'resume-2',
            title: 'UI/UX Designer',
            targetRole: 'Product Designer',
            industry: 'Design Agency',
            isCurrent: false,
            updatedAt: new Date('2024-01-20'),
            createdAt: new Date('2023-12-10'),
            notes: 'Emphasizing visual design skills',
            linkedPortfolioId: '2'
        }
    ]);

    const [targets] = useState<ProjectTarget[]>([
        {
            id: '1',
            companyName: 'TechCorp Inc.',
            position: 'Senior Frontend Engineer',
            status: 'interview',
            priority: 'high',
            deadline: new Date('2024-02-15'),
            notes: 'Technical interview scheduled for Tuesday'
        },
        {
            id: '2',
            companyName: 'CreativeStudio',
            position: 'Lead Designer',
            status: 'applied',
            priority: 'medium',
            deadline: new Date('2024-02-20'),
            notes: 'Waiting for portfolio review'
        },
    ]);

    // Unused goals state removed


    // New State for Assets Tab
    const [activeTab, setActiveTab] = useState<'resumes' | 'portfolios' | 'applications'>('resumes');

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#FAFAFA] dark:bg-[#0f172a] font-sans text-slate-900 dark:text-slate-100">
            <UnifiedSidebar currentPage="portfolio-manage" />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#FAFAFA] dark:bg-[#0f172a]">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-8 bg-[#FAFAFA]/80 dark:bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                    <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100 hidden md:block">Asset Management</h1>
                    <div className="flex-1 max-w-md mx-6">
                        <div className="relative group">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                <Search className="w-4 h-4" />
                            </span>
                            <input
                                className="w-full rounded-lg border-0 bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 py-2 pl-9 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-900 shadow-sm transition-all"
                                placeholder="Search tasks, assets..."
                                type="text"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="text-[10px] text-slate-400 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">⌘K</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-slate-800 shadow-none hover:shadow-sm transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                        {/* Left Sidebar - Attention Required */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-full max-h-[calc(100vh-8rem)]">
                                <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800 sticky top-0 z-10">
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                        Attention Required
                                    </h3>
                                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-md">{targets.length} Tasks</span>
                                </div>
                                <div className="p-3 overflow-y-auto space-y-3 custom-scrollbar flex-1 bg-slate-50/50 dark:bg-slate-900/50">
                                    {targets.map(target => (
                                        <div key={target.id} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${target.priority === 'high' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30' : 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30'}`}>
                                                    {target.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                                                </span>
                                                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-1">{target.position}</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{target.companyName}</p>
                                            {target.status === 'interview' && (
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                        <div className="w-3/4 h-full bg-blue-600 rounded-full"></div>
                                                    </div>
                                                    <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400">Prep: 75%</span>
                                                </div>
                                            )}
                                            <Button size="sm" className="w-full h-8 text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 dark:hover:bg-blue-900/30 dark:hover:border-blue-800 dark:hover:text-blue-400 font-medium shadow-sm transition-all">
                                                {target.status === 'interview' ? 'Start Prep' : 'Review Application'}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="lg:col-span-8 space-y-6">

                            {/* Top Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-4 relative z-10">
                                        <h3 className="font-medium text-slate-900 dark:text-slate-100 text-sm">Profile Strength</h3>
                                        <Info className="w-4 h-4 text-slate-300" />
                                    </div>
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="relative h-20 w-20 flex items-center justify-center">
                                            <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                                                <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                                                <path className="text-blue-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="2.5"></path>
                                            </svg>
                                            <span className="absolute text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">75%</span>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                <span>Missing skills for 3 roles</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                <span>Experience optimized</span>
                                            </div>
                                            <button className="text-blue-600 dark:text-blue-400 text-xs font-semibold hover:underline mt-1">View Details</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-medium text-slate-900 dark:text-slate-100 text-sm">Avg ATS Match</h3>
                                        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/50">
                                            <ArrowUpRight className="w-3 h-3" />
                                            <span className="text-[10px] font-bold">+5%</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1.5">
                                                <span className="font-medium text-slate-500 dark:text-slate-400">Overall Score</span>
                                                <span className="font-bold text-slate-900 dark:text-slate-100">85%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-600 w-[85%] rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 flex items-start gap-3 border border-slate-100 dark:border-slate-800">
                                            <div className="mt-0.5"><Star className="w-4 h-4 text-amber-500" /></div>
                                            <div>
                                                <p className="text-[11px] font-semibold text-slate-900 dark:text-slate-100">Suggestion</p>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Adding "React" increases match by ~12%.</p>
                                            </div>
                                            <button className="ml-auto text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Assets Section */}
                            <div>
                                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 w-fit">
                                            <button
                                                onClick={() => setActiveTab('resumes')}
                                                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'resumes' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}
                                            >
                                                Resumes
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('portfolios')}
                                                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'portfolios' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}
                                            >
                                                Portfolios
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('portfolios')}
                                                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'portfolios' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}`}
                                            >
                                                Portfolios
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 text-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 mr-2"
                                                onClick={() => navigate('/applications')}
                                            >
                                                <ArrowUpRight className="w-4 h-4 mr-1.5" /> Open Board
                                            </Button>
                                            <Button size="sm" className="h-8 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 shadow-sm">
                                                <Plus className="w-4 h-4 mr-1.5" /> New Asset
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Dynamic Content based on Active Tab */}
                                        {activeTab === 'resumes' ? (
                                            resumes.map(resume => (
                                                <div key={resume.id} className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col justify-between h-full min-h-[200px]">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                                <FileText className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{resume.title}</h4>
                                                                <div className="flex items-center gap-2 mt-0.5">
                                                                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">V{Math.floor(Math.random() * 4) + 1}</span>
                                                                    <span className="text-[10px] text-slate-400">Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="relative w-10 h-10 flex items-center justify-center">
                                                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                                                <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                                                <path className={`${resume.isCurrent ? 'text-blue-600' : 'text-amber-500'}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${Math.floor(Math.random() * 30) + 60}, 100`} strokeLinecap="round" strokeWidth="3"></path>
                                                            </svg>
                                                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                                <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100">{Math.floor(Math.random() * 20) + 75}</span>
                                                                <span className="text-[8px] font-medium text-slate-400 leading-none">ATS</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 mb-2">
                                                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-100 dark:border-slate-800">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Target Role</span>
                                                                <span className={`text-[10px] font-bold ${resume.isCurrent ? 'text-emerald-600' : 'text-amber-600'}`}>High Match</span>
                                                            </div>
                                                            <p className="text-[11px] text-slate-900 dark:text-slate-100 truncate">{resume.targetRole}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-2 group-hover:translate-y-0">
                                                        <div className="flex gap-1">
                                                            <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"><FileText className="w-4 h-4" /></button>
                                                            <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                                                        </div>
                                                        <button className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                                            Analyze <ArrowUpRight className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            portfolios.map(portfolio => (
                                                <div key={portfolio.id} className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-0 overflow-hidden hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col justify-between h-full min-h-[200px]">
                                                    <div className="h-32 bg-slate-100 relative">
                                                        <img src={portfolio.thumbnail} alt={portfolio.name} className="w-full h-full object-cover" />
                                                        {portfolio.isPrimary && (
                                                            <div className="absolute top-2 right-2 bg-blue-600 text-white p-1.5 rounded shadow-lg">
                                                                <Star className="w-3 h-3 fill-current" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="p-4 flex-1 flex flex-col">
                                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-1">{portfolio.name}</h4>
                                                        <p className="text-xs text-slate-500 mb-3">{portfolio.templateName}</p>

                                                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                                                            <span className={`text-[10px] px-2 py-0.5 rounded border ${portfolio.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                                                {portfolio.status.toUpperCase()}
                                                            </span>
                                                            <button className="text-[10px] font-semibold text-blue-600 hover:underline">View Site</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}

                                        {/* Add New Card Placeholder */}
                                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group min-h-[200px]">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                                            </div>
                                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-blue-600 transition-colors">Create New Asset</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tailoring Insights */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/30 dark:bg-slate-900/30">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600"><Star className="w-4 h-4" /></div>
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Tailoring Insights</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-slate-500">Based on "Tech Lead CV"</span>
                                        <AIReportView />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-700">
                                    <div className="p-5 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 h-6 w-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                <AlertCircle className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">Keywords Missing</h4>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                                                    Your resume is missing <span className="font-medium text-slate-700 dark:text-slate-300">GraphQL</span> and <span className="font-medium text-slate-700 dark:text-slate-300">System Design</span>, which are critical for the Spotify role.
                                                </p>
                                                <button className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400 hover:bg-blue-100 px-2 py-1 rounded transition-colors">
                                                    Auto-Fix
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 h-6 w-6 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center flex-shrink-0">
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">Impact Score</h4>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                                                    Quantify your leadership experience. Phrases like "Managed a team" perform 40% worse than "Led 5 engineers".
                                                </p>
                                                <button className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400 hover:bg-amber-100 px-2 py-1 rounded transition-colors">
                                                    Review Phrasing
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 h-6 w-6 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">Format Check</h4>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                                                    Your document structure is highly readable for ATS parsers. Header hierarchy is excellent.
                                                </p>
                                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                                                    <CheckCircle2 className="w-3 h-3" /> Verified
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
