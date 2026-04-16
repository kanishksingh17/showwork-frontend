import { useState, useEffect } from 'react';
import { apiJson } from '@/lib/apiClient';
import { useNavigate } from 'react-router-dom';
import { UnifiedLayout } from '@/components/UnifiedLayout';
import { Button } from '@/components/ui/button';
import { AIReportView } from '@/components/analytics/AIReportView';
import { ResumeTableView } from '@/components/AssetManagement/ResumeTableView';
import { VersionComparison } from '@/components/AssetManagement/VersionComparison';
import { NewAssetModal } from '@/components/AssetManagement/NewAssetModal';
import { ResumeAnalysisModal } from '@/components/AssetManagement/ResumeAnalysisModal';
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
    Briefcase,
    LayoutGrid,
    Table as TableIcon
} from 'lucide-react';
import type { ManagedPortfolio, ResumeVersion, ProjectTarget } from '@/types/portfolio-management';

export default function PortfolioManagement() {
    const navigate = useNavigate();

    // Mock Data
    const [portfolios, setPortfolios] = useState<ManagedPortfolio[]>([]);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const response = await apiJson('/api/portfolios', { method: 'GET' });
                if (response.success && response.data) {
                    const mapped = response.data.map((p: any) => ({
                        id: p.id,
                        name: (p.job_role ? JSON.parse(p.job_role) : p.template_id) || 'Untitled Portfolio',
                        templateId: p.template_id,
                        templateName: p.template_id.replace(/-/g, ' '),
                        status: p.is_published ? 'active' : 'draft',
                        isPrimary: true, // For now
                        lastModified: new Date(p.updated_at),
                        publishedUrl: p.url,
                        linkedResumes: [],
                        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
                    }));
                    setPortfolios(mapped);
                }
            } catch (error) {
                console.error('Failed to fetch portfolios:', error);
            }
        };
        fetchPortfolios();
    }, []);

    const [resumes, setResumes] = useState<ResumeVersion[]>([
        {
            id: 'resume-1',
            title: 'Senior Frontend Engineer',
            targetRole: 'Senior Frontend Developer',
            industry: 'Tech / SaaS',
            isCurrent: true,
            updatedAt: new Date('2024-02-08'),
            createdAt: new Date('2024-01-15'),
            notes: 'Focused on React and TypeScript performance',
            linkedPortfolioId: '1',
            atsScore: 85,
            targetJobCompany: 'Spotify',
            criticalGaps: ['GraphQL', 'System Design'],
            versionNumber: 'v2.4',
            improvementPercent: 5
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
            linkedPortfolioId: '2',
            atsScore: 72,
            isGeneric: true,
            criticalGaps: ['Figma Prototyping', 'User Research'],
            versionNumber: 'v1.0'
        },
        {
            id: 'resume-3',
            title: 'Linear Application Draft',
            targetRole: 'Product Designer',
            industry: 'Tech / SaaS',
            isCurrent: false,
            updatedAt: new Date('2024-02-09'),
            createdAt: new Date('2024-02-09'),
            notes: 'Tailored for Linear position',
            atsScore: 78,
            targetJobCompany: 'Linear',
            criticalGaps: ['Linear API', 'System Design'],
            versionNumber: 'v1.0'
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

    // New State for Assets Tab and View Mode
    const [activeTab, setActiveTab] = useState<'resumes' | 'portfolios' | 'applications'>('resumes');
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [selectedResume, setSelectedResume] = useState<ResumeVersion | null>(null);

    const handleAssetCreated = (asset: any) => {
        console.log('Asset created:', asset);
        // TODO: Add asset to appropriate list and show success toast
        // For now, just log the creation
    };

    const handleResumeCreated = (newResume: ResumeVersion) => {
        setResumes([newResume, ...resumes]);
        setIsAnalysisModalOpen(false);
        setSelectedResume(null);
        // Show success notification
        console.log('Tailored resume created:', newResume);
    };

    return (
        <UnifiedLayout activePage="portfolio-manage">
            <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#FAFAFA] dark:bg-[#0f172a]">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-8 bg-[#FAFAFA]/80 dark:bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                    <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100 hidden md:block">Asset Management</h1>
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="relative group w-64 max-w-sm">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                <Search className="w-4 h-4" />
                            </span>
                            <input
                                className="w-full rounded-lg border-0 bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 py-2 pl-9 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-900 shadow-sm transition-all"
                                placeholder="Search assets..."
                                type="text"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="text-[10px] text-slate-400 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">⌘K</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-slate-800 shadow-none hover:shadow-sm transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
                        </Button>
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xs ring-2 ring-white dark:ring-slate-900 shadow-sm">
                            JD
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-[1400px] mx-auto space-y-8">

                        {/* Top Stats Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Profile Strength */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <h3 className="font-medium text-slate-900 dark:text-slate-100 text-sm">Profile Strength</h3>
                                    <Info className="w-4 h-4 text-slate-300" />
                                </div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="relative h-16 w-16 flex items-center justify-center">
                                        <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                                            <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                                            <path className="text-blue-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="2.5"></path>
                                        </svg>
                                        <span className="absolute text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">75%</span>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                            <span>Missing skills for 3 roles</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            <span>Experience optimized</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ATS Match */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
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
                                            <p className="text-[11px] font-semibold text-slate-900 dark:text-slate-100">Correction</p>
                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Add "React" for +12% match.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Target Role Creator (Replaces Applications Summary) */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 rounded-xl p-5 shadow-md flex flex-col justify-between relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Briefcase className="w-24 h-24 text-white transform rotate-12" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                                                <Plus className="w-4 h-4 text-white" />
                                            </div>
                                            <h3 className="font-semibold text-white text-sm">Target New Role</h3>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded text-[10px] font-medium text-white/90 backdrop-blur-md">
                                            <Briefcase className="w-3 h-3" />
                                            <span>{targets.length} Active</span>
                                        </div>
                                    </div>

                                    <p className="text-white/90 text-xs mb-4 leading-relaxed max-w-[90%]">
                                        Paste a job description to generate a <span className="font-bold text-white">tailored resume & portfolio</span> in seconds.
                                    </p>

                                    <Button size="sm" className="w-full bg-white text-blue-700 hover:bg-blue-50 border-0 font-semibold shadow-sm transition-all text-xs h-8" onClick={() => navigate('/applications')}>
                                        Start Tailoring
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Assets Section (Primary) */}
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
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
                                    </div>


                                    {/* View Mode Toggle - Only show for Resumes */}
                                    {activeTab === 'resumes' && (
                                        <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                                            <button
                                                onClick={() => setViewMode('cards')}
                                                className={`p-1.5 rounded-md transition-all ${viewMode === 'cards' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'}`}
                                                title="Card View"
                                            >
                                                <LayoutGrid className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setViewMode('table')}
                                                className={`p-1.5 rounded-md transition-all ${viewMode === 'table' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'}`}
                                                title="Table View"
                                            >
                                                <TableIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <Button size="sm" className="h-8 text-xs bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 shadow-sm transition-all border border-transparent" onClick={() => setIsAssetModalOpen(true)}>
                                    <Plus className="w-4 h-4 mr-1.5" /> New Asset
                                </Button>
                            </div>


                            {/* Dynamic Content based on View Mode and Active Tab */}
                            {viewMode === 'table' && activeTab === 'resumes' ? (
                                <ResumeTableView
                                    resumes={resumes}
                                    onAnalyze={(resume) => {
                                        setSelectedResume(resume);
                                        setIsAnalysisModalOpen(true);
                                    }}
                                />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {/* Dynamic Content based on Active Tab */}
                                    {activeTab === 'resumes' ? (
                                        resumes.map(resume => (
                                            <div key={resume.id} className="group relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col justify-between h-full min-h-[180px]">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-12 w-12 flex items-center justify-center">
                                                            {/* ATS Score Circle */}
                                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                                <path
                                                                    className="text-slate-100 dark:text-slate-700"
                                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="3"
                                                                />
                                                                <path
                                                                    className={resume.atsScore && resume.atsScore >= 80 ? "text-emerald-500" : resume.atsScore && resume.atsScore >= 70 ? "text-blue-500" : "text-amber-500"}
                                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeDasharray={`${resume.atsScore || 0}, 100`}
                                                                    strokeLinecap="round"
                                                                    strokeWidth="3"
                                                                />
                                                            </svg>
                                                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                                <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100">{resume.atsScore || 0}</span>
                                                                <span className="text-[6px] font-medium text-slate-400 uppercase">ATS</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm truncate max-w-[120px]">{resume.title}</h4>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">{resume.versionNumber || 'v1.0'}</span>
                                                                <span className="text-[10px] text-slate-400">2d ago</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Job Indicator */}
                                                {resume.targetJobCompany && (
                                                    <div className="mb-2">
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                                                            <span className="w-1 h-1 rounded-full bg-indigo-600"></span>
                                                            {resume.targetJobCompany}
                                                        </span>
                                                    </div>
                                                )}
                                                {resume.isGeneric && (
                                                    <div className="mb-2">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase tracking-tighter">
                                                            Generic
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="space-y-1 mb-2">
                                                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded p-2 border border-slate-100 dark:border-slate-800">
                                                        <div className="flex justify-between items-center mb-0.5">
                                                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Match</span>
                                                            <span className={`text-[10px] font-bold ${resume.isCurrent ? 'text-emerald-600' : 'text-amber-600'}`}>High</span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-700 dark:text-slate-300 truncate">{resume.targetRole}</p>
                                                    </div>
                                                </div>

                                                {/* Critical Gaps */}
                                                {resume.criticalGaps && resume.criticalGaps.length > 0 && (
                                                    <div className="mb-2">
                                                        <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 mb-1 block uppercase tracking-wider">Missing Skills</span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {resume.criticalGaps.slice(0, 2).map((gap, idx) => (
                                                                <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800">
                                                                    {gap}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <div className="flex gap-1">
                                                        <button className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"><FileText className="w-3.5 h-3.5" /></button>
                                                        <button className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedResume(resume);
                                                            setIsAnalysisModalOpen(true);
                                                        }}
                                                        className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                                    >
                                                        Analyze <ArrowUpRight className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        portfolios.map(portfolio => (
                                            <div key={portfolio.id} className="group relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-0 overflow-hidden hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col justify-between h-full min-h-[160px]">
                                                <div className="h-24 bg-slate-100 relative group-hover:h-20 transition-all duration-300">
                                                    <img src={portfolio.thumbnail} alt={portfolio.name} className="w-full h-full object-cover" />
                                                    {portfolio.isPrimary && (
                                                        <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded shadow-sm">
                                                            <Star className="w-3 h-3 fill-current" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-3 flex-1 flex flex-col">
                                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-0.5 truncate">{portfolio.name}</h4>
                                                    <p className="text-[10px] text-slate-500 mb-2 truncate">{portfolio.templateName}</p>

                                                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider font-medium ${portfolio.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                                            {portfolio.status}
                                                        </span>
                                                        <button
                                                            onClick={() => navigate(`/portfolio-builder?id=${portfolio.id}`)}
                                                            className="text-[10px] font-semibold text-blue-600 hover:underline group-hover:opacity-100 opacity-0 transition-opacity"
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}

                                    {/* Add New Card Placeholder */}
                                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group min-h-[160px]" onClick={() => setIsAssetModalOpen(true)}>
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                            <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                                        </div>
                                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-blue-600 transition-colors">Create New Asset</p>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Bottom Section: Version Comparison, Insights & Tasks */}
                        <div className="space-y-8">
                            {/* Version Comparison */}
                            <VersionComparison resumes={resumes} />

                            {/* Insights & Tasks Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Tailoring Insights */}
                                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                                    <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600"><Star className="w-4 h-4" /></div>
                                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Tailoring Insights</h3>
                                        </div>
                                        <AIReportView />
                                    </div>
                                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                        <div className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group flex items-start gap-4">
                                            <div className="mt-0.5 h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                <AlertCircle className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Keywords Missing</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                                                    Your resume is missing <span className="font-medium text-slate-700 dark:text-slate-300">GraphQL</span> and <span className="font-medium text-slate-700 dark:text-slate-300">System Design</span>, which are critical for the Spotify role.
                                                </p>
                                                <button className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400 hover:bg-blue-100 px-2 py-1 rounded transition-colors">
                                                    Auto-Fix
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group flex items-start gap-4">
                                            <div className="mt-0.5 h-8 w-8 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center flex-shrink-0">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Impact Score</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                                                    Quantify your leadership experience. Phrases like "Managed a team" perform 40% worse than "Led 5 engineers".
                                                </p>
                                                <button className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400 hover:bg-amber-100 px-2 py-1 rounded transition-colors">
                                                    Review Phrasing
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Target Focus Roles */}
                                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col h-full">
                                    <div className="px-5 py-3 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800/80 sticky top-0 z-10">
                                        <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-slate-400" />
                                            Target Roles
                                        </h3>
                                        <span className="bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-gray-200 dark:border-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">{targets.length} Active</span>
                                    </div>
                                    <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[300px] custom-scrollbar">
                                        {targets.map(target => (
                                            <div key={target.id} className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group flex items-start gap-3">
                                                <div className="mt-1">
                                                    {target.status === 'interview' ? (
                                                        <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
                                                    ) : (
                                                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{target.position}</h4>
                                                        <span className="text-[10px] text-slate-400">
                                                            {target.deadline ? new Date(target.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'No Deadline'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{target.companyName}</p>

                                                    <div className="flex items-center justify-between">
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${target.priority === 'high' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400' : 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400'}`}>
                                                            {target.priority === 'high' ? 'High Priority' : 'Medium'}
                                                        </span>
                                                        <Button size="sm" variant="ghost" className="h-6 text-[10px] text-slate-400 hover:text-blue-600 p-0 hover:bg-transparent font-medium">
                                                            {target.status === 'interview' ? 'Start Prep ->' : 'Review ->'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* New Asset Modal */}
            <NewAssetModal
                isOpen={isAssetModalOpen}
                onClose={() => setIsAssetModalOpen(false)}
                defaultAssetType={activeTab === 'portfolios' ? 'portfolio' : 'resume'}
                onAssetCreated={handleAssetCreated}
            />

            {/* Resume Analysis Modal */}
            <ResumeAnalysisModal
                isOpen={isAnalysisModalOpen}
                onClose={() => {
                    setIsAnalysisModalOpen(false);
                    setSelectedResume(null);
                }}
                resume={selectedResume}
                applications={[]} // Can be populated from Application Tracker in future
                onResumeCreated={handleResumeCreated}
            />
        </UnifiedLayout>
    );
}
